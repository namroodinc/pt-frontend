import { assign } from "lodash";

export default {
  axis: assign(
    {
      style: {
        axis: {
          stroke: '#000000',
          strokeWidth: 1
        },
        axisLabel: {
          fontFamily: 'inherit',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.002em'
        },
        grid: {
          stroke: '#CACACA',
          strokeDasharray: '2, 7',
          strokeWidth: 0.5
        },
        ticks: {
          size: 4,
          stroke: '#000000',
          strokeWidth: 1
        },
        tickLabels: {
          fill: '#000000',
          fontFamily: "'Inconsolata', monospace",
          fontSize: 7,
          letterSpacing: '0.002em'
        }
      }
    }
  )//,
  // line: assign(
  //   {
  //     style: {
  //
  //     }
  //   }
  // )
}
