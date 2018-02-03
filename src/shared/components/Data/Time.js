import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { New } from "../Icons/Index";

class Time extends React.Component {
  render() {
    const { dateTime, dateTimeFormat } = this.props;
    const format = dateTimeFormat || 'MMM. DD';

    const date = moment(dateTime).format('MM/DD/YYYY');
    const dateToday = moment().format('MM/DD/YYYY');

    return (
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
    )
  }
}

Time.propTypes = {
  dateTime: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  dateTimeFormat: PropTypes.string
};

export default Time;
