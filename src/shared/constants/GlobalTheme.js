import { assign } from "lodash";

const fontFamily = '-apple-system, BlinkMacSystemFont, Helvetica, "Segoe UI", Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Open Sans", sans-serif';

const typicalText = {
  fill: '#FFFFFF',
  fontFamily,
  fontSize: 20,
  fontWeight: 700
};

export default {
  headings: {
    main: assign({}, typicalText, {}),
    description: assign({}, typicalText, {
      fontSize: 12,
      fontWeight: 400
    })
  },
  chartPadding: {
    bottom: 30,
    left: 30,
    right: 80,
    top: 70
  },
  theme: {
    axis: assign(
      {
        style: {
          axis: {
            stroke: '#FFFFFF',
            strokeWidth: 2
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
            stroke: '#FFFFFF',
            strokeWidth: 2
          },
          tickLabels: {
            fill: '#FFFFFF',
            fontFamily: "'Inconsolata', monospace",
            fontSize: 7,
            letterSpacing: '0.002em'
          }
        }
      }
    )
  }
}
