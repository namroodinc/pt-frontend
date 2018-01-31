import React from "react";
import { observer } from 'mobx-react';
import PropTypes from "prop-types";
import { Grid, Paper } from "material-ui";

import Actions from "../actions/Actions";
import Store from "../stores/Store";
import { Loading } from "../components/Index";
import { Line } from "../components/Charts/Index";

@observer
class Publication extends React.Component {
  componentWillMount() {
    Actions.getEntry(this.props.match.params.entryId);
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const {
      circulationHistroy,
      name
    } = Store.retrieveEntry();

    const historyLength = circulationHistroy.length > 0;
    const historyMapped = circulationHistroy.map(data => {
      return {
        x: new Date(data.year, 0, 31),
        y: data.value
      }
    }).sort((a, b) => a.x - b.x);
    const firstYear = historyLength ? historyMapped[0].x : 0;
    const lastYear = historyLength ? historyMapped[historyMapped.length - 1].x : 0;
    const xAxisDomain = {
      x: [
        firstYear,
        lastYear
      ]
    };
    const maxValue = historyLength ? historyMapped.reduce((max, p) => p.y > max ? p.y : max, historyMapped[0].y) : 0;
    const yAxisDomain = {
      y: [
        0,
        maxValue
      ]
    };

    return (
      <div>

        <div
          className="container"
        >

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={12}
            >
              <Paper>
                <h2>
                  {name}
                </h2>
              </Paper>
            </Grid>

          </Grid>

          <Grid
            container
            spacing={24}
          >

            <Grid
              item
              xs={12}
            >
              <Paper>

                <Line
                  data={historyMapped}
                  title={`Newspaper Circulations ${firstYear.getFullYear()}-${lastYear.getFullYear()}`}
                  xAxisDomain={xAxisDomain}
                  yAxisDomain={yAxisDomain}
                  tableRowLimit={10}
                />

              </Paper>
            </Grid>

          </Grid>

        </div>

      </div>
    )
  }
}

Publication.propTypes = {
  match: PropTypes.object
};

export default Publication;
