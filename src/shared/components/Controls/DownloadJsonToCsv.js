import React from "react";
import PropTypes from "prop-types";
import { Parser } from "json2csv";

class DownloadJsonToCsv extends React.Component {
  render() {
    const { data, fields } = this.props;

    const opts = {
      fields
    };
    const parser = new Parser(opts);
    const csv = parser.parse(data);

    console.log(csv);

    return (
      <div>
        Button to go here
      </div>
    )
  }
}

DownloadJsonToCsv.propTypes = {
  data: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired
};

export default DownloadJsonToCsv;
