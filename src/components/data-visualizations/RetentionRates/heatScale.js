const d3Color = require('d3-color')

const baseRed = d3Color.rgb(255, 0, 0)
const baseGreen = d3Color.rgb(0, 255, 135)

const makeHeatScale = range => n => {
  if (n === 0) return 'rgb(255,255,255)'
  const hsl = d3Color.hsl(n < 0 ? baseRed : baseGreen)
  const mult = Math.min(0.9, Math.abs(n) / Math.abs(range[n < 0 ? 0 : 1]))
  hsl.l = 0.75
  hsl.s = 0.9
  const scaled = hsl.rgb()
  return `rgba(${Math.round(scaled.r)}, ${Math.round(scaled.g)}, ${Math.round(
    scaled.b
  )}, ${mult})`
}

export default makeHeatScale
