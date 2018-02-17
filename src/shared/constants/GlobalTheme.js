import { assign } from "lodash";

const fontFamily = '-apple-system, BlinkMacSystemFont, Helvetica, "Segoe UI", Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Open Sans", sans-serif';

const typicalText = {
  fill: '#000000',
  fontFamily,
  fontSize: 20,
  fontWeight: 700
};

export default {
  headings: {
    main: assign({}, typicalText, {}),
    description: assign({}, typicalText, {
      color: '#CDCDCD',
      fontSize: 12,
      fontWeight: 400
    })
  },
  chartPadding: {
    bottom: 30,
    left: 30,
    right: 30,
    top: 70
  },
  theme: {
    axis: assign(
      {
        style: {
          axis: {
            stroke: '#000000',
            strokeWidth: 3
          },
          axisLabel: {
            fontFamily: 'inherit',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.002em'
          },
          grid: {
            stroke: '#000000',
            strokeWidth: 0.5
          },
          ticks: {
            size: 3,
            stroke: '#000000',
            strokeWidth: 4
          },
          tickLabels: {
            fill: '#000000',
            fontFamily: "'Inconsolata', monospace",
            fontSize: 7,
            letterSpacing: '0.002em'
          }
        }
      }
    )
  }
}
