import { assign } from "lodash";

const fontFamily = `-apple-system, BlinkMacSystemFont, Helvetica,
                    "Segoe UI", Roboto, Arial, sans-serif, "Apple Color Emoji",
                    "Segoe UI Emoji", "Segoe UI Symbol", "Open Sans", sans-serif`;

const colorScale = [
  '#026fc9',
  '#5b9dfd',
  '#004598'
];

const baseProps = {
  width: 450,
  height: 300,
  padding: 60,
  colorScale
};

const typicalText = {
  fill: '#026FC9',
  fontFamily,
  fontSize: 18,
  fontWeight: 700
};

export default {
  chartPadding: {
    bottom: 30,
    left: 30,
    right: 30,
    top: 70
  },
  headings: {
    main: assign({}, typicalText, {}),
    description: assign({}, typicalText, {
      fill: '#999999',
      fontSize: 12,
      fontWeight: 400
    })
  },
  legend: {
    fontSize: 6,
    fontWeight: 700
  },
  groupLabels: {
    fill: '#f0f0f0',
    fontSize: 12,
    fontFamily: "'Inconsolata', monospace",
    letterSpacing: '0.002em'
  },
  theme: {
    axis: assign(
      {
        style: {
          axis: {
            stroke: '#f0f0f0',
            strokeWidth: 0.5
          },
          axisLabel: {
            fontFamily: 'inherit',
            fontWeight: 700,
            letterSpacing: '0.002em'
          },
          grid: {
            stroke: '#f0f0f0',
            strokeWidth: 0.5
          },
          ticks: {
            size: 5,
            stroke: '#f0f0f0',
            strokeWidth: 0.5
          },
          tickLabels: {
            fill: '#000',
            fontFamily: "'Inconsolata', monospace",
            fontSize: 8,
            letterSpacing: '0.002em'
          }
        }
      }
    ),
    bar: assign(
      {
        style: {
          data: {
            strokeWidth: 0
          }
        }
      },
      baseProps
    ),
    chart: baseProps,
    line: assign(
      {
        style: {
          data: {
            strokeWidth: 2
          }
        }
      },
      baseProps
    ),
    stack: assign(
      {
        colorScale
      },
      baseProps
    )
  }
}
