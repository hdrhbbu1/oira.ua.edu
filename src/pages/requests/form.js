import React from 'react'
import Modal from 'react-modal'
import { Helmet } from 'react-helmet'

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'RGBA(0, 0, 0, .70)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #000',
  },
}

const page = `
  <style type="text/css">
      #ui-datepicker-div * {
          font-size: 12px;
          padding: 0 !important;
      }
      #ui-datepicker-div .ui-datepicker-links {
          display: none;
      }
  </style>
  <form action="https://oirax.ua.edu/secure/oira/projects/request" enctype="multipart/form-data" method="POST">
      <br>
      <br>
      <input type="hidden" name="act" value="create">
      <input type="hidden" name="queue" value="4">
      <input type="hidden" name="origin" value="Information Request Form">
      <div id="apDiv20">
          <ul style="z-index: 0;" class="ui-tabs-nav">
              <li class="ui-tabs-nav-item ui-tabs-selected"><a class="notred" href="#entryTab"><span>Name</span></a>
              </li>
              <li class="ui-tabs-nav-item"><a class="notred" href="#secondTab"><span>Contact Info</span></a>
              </li>
              <li class="ui-tabs-nav-item"><a class="notred" href="#thirdTab"><span>Request</span></a>
              </li>
              <li class="ui-tabs-nav-item"><a class="notred" href="#reviewTab"><span>Review</span></a>
              </li>
          </ul>
          <div id="entryTab" class="ui-tabs-panel" style="min-width: 0px;">
              <div class="tableWrap">
                  <table width="100%" border="0" cellspacing="2" cellpadding="10">
                      <tbody>
                          <tr>
                              <th scope="row"><span id="firstNameS" class="r1">First Name:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="firstName" id="firstName">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row" width="40%"><span id="lastNameS" class="r0">Last Name:</span>
                              </th>
                              <td width="10%"></td>
                              <td width="50%">
                                  <input name="lastName" id="lastName">
                              </td>
                          </tr>
                          <tr>
                              <th width="40%" scope="row"><span id="courtesyS" class="r2">Courtesy Title:</span>
                              </th>
                              <td width="10%"></td>
                              <td width="50%">
                                  <select name="courtesy" id="courtesy">
                                      <option value="0">Select</option>
                                      <option value="Dr.">Dr.</option>
                                      <option value="Mr.">Mr.</option>
                                      <option value="Mrs.">Mrs.</option>
                                      <option value="Ms.">Ms.</option>
                                  </select>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="submitWrapper" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-flow: row wrap;flex-flow: row wrap;margin-bottom: 1em;">
                      <div class="proceedButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="nextTab();">Submit and Continue -&gt;</div>
                  </div>
              </div>
          </div>
          <div id="secondTab" class="ui-tabs-panel ui-tabs-hide">
              <div class="tableWrap">
                  <table width="100%" border="0" cellspacing="2" cellpadding="10">
                      <tbody>
                          <tr>
                              <th scope="row"><span id="positionS" class="r0">Position Title:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="position" id="position">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="collegeS" class="r1">College:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="college" id="college">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><i style="color:#555;font-weight:normal">or</i>&nbsp; <span id="companyS" class="r1">Company:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="company" id="company">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="departmentS" class="r1">Department:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="department" id="department">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="mailingAddressS" class="r2">Mailing Address:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="mailingAddress" id="mailingAddress">
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="cityS" class="r3">City:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="city" id="city">
                              </td>

                          </tr>
                          <tr>
                              <th scope="row"><span id="stateS" class="r4">State:</span>
                              </th>
                              <td></td>
                              <td>
                                  <select name="state" id="state">
                                      <option value="AL">AL</option>
                                      <option value="AK">AK</option>
                                      <option value="AZ">AZ</option>
                                      <option value="AR">AR</option>
                                      <option value="CA">CA</option>
                                      <option value="CO">CO</option>
                                      <option value="CT">CT</option>
                                      <option value="DE">DE</option>
                                      <option value="FL">FL</option>
                                      <option value="GA">GA</option>
                                      <option value="HI">HI</option>
                                      <option value="ID">ID</option>
                                      <option value="IL">IL</option>
                                      <option value="IN">IN</option>
                                      <option value="IA">IA</option>
                                      <option value="KS">KS</option>
                                      <option value="KY">KY</option>
                                      <option value="LA">LA</option>
                                      <option value="ME">ME</option>
                                      <option value="MD">MD</option>
                                      <option value="MA">MA</option>
                                      <option value="MI">MI</option>
                                      <option value="MN">MN</option>
                                      <option value="MS">MS</option>
                                      <option value="MO">MO</option>
                                      <option value="MT">MT</option>
                                      <option value="NE">NE</option>
                                      <option value="NV">NV</option>
                                      <option value="NH">NH</option>
                                      <option value="NJ">NJ</option>
                                      <option value="NM">NM</option>
                                      <option value="NY">NY</option>
                                      <option value="NC">NC</option>
                                      <option value="ND">ND</option>
                                      <option value="OH">OH</option>
                                      <option value="OK">OK</option>
                                      <option value="OR">OR</option>
                                      <option value="PA">PA</option>
                                      <option value="RI">RI</option>
                                      <option value="SC">SC</option>
                                      <option value="SD">SD</option>
                                      <option value="TN">TN</option>
                                      <option value="TX">TX</option>
                                      <option value="UT">UT</option>
                                      <option value="VT">VT</option>
                                      <option value="VA">VA</option>
                                      <option value="WA">WA</option>
                                      <option value="WV">WV</option>
                                      <option value="WI">WI</option>
                                      <option value="WY">WY</option>
                                  </select>
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="zipS" class="r5">Zip:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="zip" id="zip">
                              </td>
                          </tr>

                          <tr>
                              <th scope="row"><span id="telephoneS" class="r6">Telephone Number:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="telephone" id="telephone">
                              </td>
                          </tr>
                          <!--
                          <tr>
                            <th scope="row"><span id="faxS" class="r7">Fax Number:</span></th>
                            <td></td>
                            <td><input name="fax" id="fax" /></td>
                          </tr> -->
                          <tr>
                              <th scope="row"><span id="emailS" class="r8">Email Address:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="email" id="email">
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <div class="submitWrapper" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-flow: row wrap;flex-flow: row wrap;margin-bottom: 1em;">
                      <div class="prevButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="lastTab();">&lt;- Previous Tab</div>
                      <div class="proceedButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="nextTab();">Submit and Continue -&gt;</div>
                  </div>
              </div>
          </div>
          <div id="thirdTab" class="ui-tabs-panel ui-tabs-hide">
              <div class="tableWrap">
                  <table width="100%" border="0" cellspacing="2" cellpadding="10">
                      <tbody>
                          <tr>
                              <th scope="row"><span id="dateNeededS" class="r0">Date Needed:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input name="dateNeeded" id="dateNeeded" class=""> (minimum 10 days) </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="affiliationS" class="r1">Affiliation:</span>
                              </th>
                              <td></td>
                              <td>
                                  <select name="affiliation" id="affiliation">
                                      <option value="0" selected="selected">&nbsp;</option>
                                      <option>UA Student</option>
                                      <option>UA Teaching and Research Faculty</option>
                                      <option>UA Staff or Administrative Faculty</option>
                                      <option>Other College or University</option>
                                      <option>Higher Education Non-Gov. Organization</option>
                                      <option>Media</option>
                                      <option>State or Federal Agency</option>
                                      <option>Other</option>
                                  </select>
                              </td>
                          </tr>
                          <!--
                          <tr>
                            <th scope="row"><span id="reportTypeS" class="r2">Type of Report:</span></th>
                            <td></td>
                            <td><select name="reportType" id="reportType" style="width:250px">
                            <option value="0" selected="selected">&nbsp;</option>
                            <option>Data Request - Faculty/Staff/Student Data</option>
                            <option>General Information - Institutional Research and Assessment</option>
                            <option>General Information - UAOPS</option>
                            <option>Technical Support - Institutional Research and Assessment</option>
                            <option>Technical Support - UAOPS</option>
                            <option>Understanding/Interpreting Assessment Data/Reports</option>
                            <option>Understanding/Interpreting institutional Data/Reports</option>
                            <option>Understanding/Interpreting UAOPS Data/Reports</option>
                            <option>Other</option>
                            </select>
                            </td>
                          </tr>
                          -->
                          <tr>
                              <th scope="row"><span id="descriptionS" class="r3">Description:</span>
                              </th>
                              <td></td>
                              <td>
                                  <textarea name="description" id="description" rows="10" cols="30"></textarea>
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="attachmentsS" class="r7">Attachments:</span>
                              </th>
                              <td></td>
                              <td>
                                  <input type="checkbox" name="attachments" id="attachments" onclick="showAttach();">&nbsp;&nbsp;include attachments
                                  <div id="attachNote" style="display:none;font-size:12px;color:#000000;">(You may upload your files in the next tab.)</div>
                              </td>
                          </tr>
                          <tr>
                              <th scope="row"><span id="usageS" class="r8">Purpose:</span>
                              </th>
                              <td></td>
                              <td>
                                  <textarea name="usage" id="usage" rows="5" cols="30"></textarea>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="submitWrapper" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-flow: row wrap;flex-flow: row wrap;margin-bottom: 1em;">
                      <div class="prevButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="lastTab();">&lt;- Previous Tab</div>
                      <div class="proceedButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="nextTab();">Submit and Continue -&gt;</div>
                  </div>
              </div>
          </div>
          <div id="attachTab" style="display:none;">
              <div class="tableWrap">
                  <table width="100%" border="0" cellspacing="2" cellpadding="10" height="180">
                      <tbody>
                          <tr>
                              <th scope="row" valign="top"><span id="attach1S" class="r0">File attachments:</span>
                              </th>
                              <td></td>
                              <td valign="top">
                                  <div id="attachTD">
                                      <input type="file" name="attach1" id="attach1" onblur="fileChange(this.id);">
                                      <br>
                                  </div>
                                  <br>
                                  <input id="attachMoreButton" type="button" onclick="moreAttach();return false;" value="Attach Another...">
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  <div class="submitWrapper" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-flow: row wrap;flex-flow: row wrap;margin-bottom: 1em;">
                      <div class="prevButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="lastTab();">&lt;- Previous Tab</div>
                      <div class="proceedButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="nextTab();">Submit and Continue -&gt;</div>
                  </div>
              </div>
          </div>
          <div id="reviewTab" class="ui-tabs-panel ui-tabs-hide">
              <div id="allResults"></div>
              <div class="submitWrapper" style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-ms-flex-flow: row wrap;flex-flow: row wrap;margin-bottom: 1em;">
                  <div class="prevButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="lastTab();">&lt;- Previous Tab</div>
                  <div class="proceedButton" style="background: #f4f4f4; cursor: pointer; border: none;display: -webkit-box;display: -ms-flexbox;text-decoration: none; display: flex;padding: 10px 10px 10px 10px;font-size: 14px;line-height: 20px;border-radius: 3px;-webkit-box-flex: 0;-ms-flex: 0 0 auto;flex: 0 0 auto;margin: 0 10px 10px 0;" onclick="$('form').submit();" style="font-weight:bold">Submit Request</div>
              </div>
          </div>
      </div>
  </form>
`

const scripts = [
  'http://oira.ua.edu/d/sites/all/modules/information_requests/jquery-1.2.6.pack.js?V',
  'http://oira.ua.edu/d/sites/all/modules/information_requests/jquery-ui-personalized-1.5.2.min.js',
  'http://oira.ua.edu/d/sites/all/modules/information_requests/information_requests.js',
]

let loaded = 1

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scripts: scripts.slice(0, loaded),
      modalIsOpen: true,
    }
    this.listenJquery.bind(this)()
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#900'
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  listenJquery() {
    let loadNext = 1
    if (typeof global.jQuery !== 'undefined') loadNext = 2
    if (
      typeof global.jQuery !== 'undefined' &&
      typeof global.jQuery.ui !== 'undefined'
    )
      loadNext = 3

    setTimeout(() => {
      if (loadNext !== loaded) {
        loaded = loadNext
        this.setState({ scripts: scripts.slice(0, loaded) })
      }

      if (loaded !== 3) return this.listenJquery.bind(this)()
    }, 500)
  }
  render() {
    return (
      <div>
        <Helmet>
          <link
            rel="stylesheet"
            href="http://oira.ua.edu/d/sites/all/modules/information_requests/jquery-ui-themeroller.css?V"
            type="text/css"
          />
          {this.state.scripts.map(src => (
            <script key={src} type="text/javascript" src={src} />
          ))}
        </Helmet>
        <h1>New Information Request</h1>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Offices Closed Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            Notice: Offices Closed December 21 to January 2
          </h2>
          <p>
            The University of Alabama is closed during the winter break (Dec. 21
            to Jan. 2). Any requests received during this time period will be
            addressed when we return on Jan 3rd. The response to some requests
            received shortly before the winter break may also be delayed until
            after the break.
          </p>
          <button onClick={this.closeModal}>Close</button>
        </Modal>
        <p
          id="helperBox"
          style={{ opacity: 0.7, fontSize: '0.8em', height: '2em', margin: 0 }}
        />
        <div dangerouslySetInnerHTML={{ __html: page }} />
      </div>
    )
  }
}

export default Page
