// need to bootstrap babel processing, since we'll be
// compiling react code for the tabulations
require('babel-register')({ 
  // these presets should be available from gatsby itself
  presets: ['babel-preset-react', 'babel-preset-es2015', 'babel-preset-stage-2']
});

const { 
    graphql, 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    typeFromAST,
} = require('graphql');

const fs = require('fs');
// const chokidar = require(`chokidar`);
const { tableField } = require('retabulate-graphql/lib/schema/graphqlSchema');

const AllName = (string) => string.charAt(0).toUpperCase() + string.replace(/_/g,'').slice(1);
/*
  Create retabulateRoot node, upon which further schema will be added below
*/
exports.sourceNodes = ({ boundActionCreators }) => {
    const { createNode } = boundActionCreators
    
    createNode({
        id: 'retabulate-root',
        parent: `___SOURCE___`,
        children: [],
        internal: {
            contentDigest: 'retabulate-root-id',
            type: `RetabulateRoot`,
        }
    });
  
    return;
  }
  
/*
  attach retabulate schema to the node created above
*/
exports.setFieldsOnGraphQLNodeType = (
    { type, store, pathPrefix, getNode, cache },
    pluginOptions
  ) => {
    if (type.name!=='RetabulateRoot') return; 

    const tabulations = new GraphQLObjectType({
      name: 'tabulations',
      fields: {
          table: tableField,
      },
    });

    const newFields = {
      tabulations: {
        type: tabulations,
        resolve: (parent, {id}, context) => {

          // set up a getDataset method for retabulate to fetch gatsby datasets
          context.getDataset = (name) => new Promise((resolve, reject) => {
            console.log('checking',name)
            // read non-internal fields
            const schema = store.getState().schema;
            const fields = Object.keys(schema._typeMap[name]._fields).filter(
              k => ['parent','children','internal'].indexOf(k)===-1
            );
  
            // execute
            graphql(schema, `
              query retabulateFetchData {
                all${AllName(name)} {
                  edges {
                    node {
                      id
                      ${fields}
                    }
                  }
                }
              }
            `).then(result => resolve(
              console.log(result) || 
              result.data[`all${AllName(name)}`].edges.map(e => e.node)
            ));
          });

          return {};
        },
      }
    }

    return Promise.resolve(newFields);
}

/*
  onCreatePage doesn't pass a graphql prop, so store it from here
*/
let latestGraphql;
exports.createPages = ({ store, graphql, boundActionCreators }) => {  
  latestGraphql = graphql;
}

/*
  on creation of any page, check for matching .tabulations.js file,
  build and execute its queries, add data to page
*/
exports.onCreatePage = ({page, boundActionCreators}) => {
  const {deletePage, createPage} = boundActionCreators;

  if (page.component.match('.tabulations')) {
    deletePage(page);
    return;
  }

  const tabsPath = page.component.replace(/.js$/, '.tabulations.js');
  if (!fs.existsSync(tabsPath)) return;

  const tablesComponent = require(tabsPath);
  const tableNames = [];
  const fragments = [];

  Object.keys(tablesComponent).forEach(tableName => {
    const comp = tablesComponent[tableName];
    if (typeof(comp)!=='function') return;

    tableNames.push(tableName);

    // render each table with page props
    const tree = comp(page.context);
    // generate fragment
    fragments.push(tree.type.getFragment(Object.assign(
      {}, tree.props, {config: {rootType: 'tabulations'}}
    )));
  })

  if (!tableNames) return;

  // now gather the queries      
  return new Promise((resolve, reject) => {
    latestGraphql(`
      query getRetabulateData {
        retabulateRoot {
          tabulations {
            ${tableNames.map(t => '...'+t+'Fragment').join(' ')}
          }
        }
      }
      ${fragments.join('\n')}
    `).then(data => {
      if (data.errors) {
        console.error(data.errors);
        return;
      }

      const tabulations = data.data.retabulateRoot.tabulations;

      // Remove the old page
      deletePage(page)
      // Add the new page with context
      createPage(Object.assign({}, page, {
        context: Object.assign({}, page.context, {tabulations: JSON.stringify(tabulations)})
      }));

      resolve(true);
    })
  });
}

const singleTabulate = /\.tabulation\.js$/

/*
  build & add appropriate fragment exports to any .tabulation.js page 
*/
exports.preprocessSource = ({ filename, contents }, pluginOptions) => {
  if (singleTabulate.test(filename)) {

    delete require.cache[filename]
    const tablesComponent = require(filename);
    const tableNames = [];
    let fragments = '';
  
    // all retabulations must be top-level named exports
    Object.keys(tablesComponent).forEach(tableName => {
      const comp = tablesComponent[tableName];
      if (typeof(comp)!=='function') return;
  
      tableNames.push(tableName);
  
      // render each table 
      const tree = comp({});

      // generate fragment
      fragments +=  `export const ${tableName}Fragment = graphql\`${
        tree.type.getFragment(Object.assign(
          {}, tree.props, {config: {rootType: 'tabulations'}}
        ))
      }\`\n`
    })

    if (fragments) return `${contents}\n${fragments}`;
  } else return null
}