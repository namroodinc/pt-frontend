import React from "react";
import PropTypes from "prop-types";
import Tooltip from "material-ui/Tooltip";
import moment from "moment";

import { New } from "../Icons/Index";

class Time extends React.Component {
  render() {
    const { dateTime, dateTimeFormat, tooltipFormat } = this.props;
    const format = dateTimeFormat || 'MMM. DD';
    const tooltip = tooltipFormat || 'MM/DD/YYYY HH:MM';

    const date = moment(dateTime).format('MM/DD/YYYY');
    const dateToday = moment().format('MM/DD/YYYY');

    return (
      <Tooltip
        title={moment(dateTime).format(tooltip)}
        placement="top"
      >
        <time>
          {date === dateToday &&
            <New
              style={{
                marginRight: 3
              }}
            />
          }
          {moment(dateTime).format(format)}
        </time>
      </Tooltip>
    )
  }
}

Time.propTypes = {
  dateTime: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  dateTimeFormat: PropTypes.string,
  tooltipFormat: PropTypes.string
};

export default Time;
