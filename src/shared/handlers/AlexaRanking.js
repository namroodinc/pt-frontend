import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import moment from "moment";
import { withStyles } from "material-ui/styles";
import { Link } from "react-router-dom";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

import { Loading } from "../components/Index";
import { DownloadJsonToCsv } from "../components/Controls/Index";

const styles = theme => ({
});

@observer
class AlexaRanking extends React.Component {
  componentWillMount() {
    Actions.updatePublicationList();
  }

  render() {
    if (Store.isLoading()) return <Loading />;

    const getLast7PossibleDaysAlexa = Store.getLast7PossibleDaysAlexa;
    const getAlexaRankingsForLast7Days = Store.getAlexaRankingsForLast7Days;

    return (
      <div
        className="container"
      >

        <div>
          <DownloadJsonToCsv
            fields={['Publication', ...getLast7PossibleDaysAlexa.map((day, i) => moment(day).format('DD MMMM'))]}
            data={getAlexaRankingsForLast7Days.map((publication, i) => {
              const flattenArray = publication.rankings.map((day, i) => {
                return {
                  [moment(getLast7PossibleDaysAlexa[i]).format('DD MMMM')]: day ? day.value : 'N/A'
                }
              });
              return {
                'Publication': publication.name,
                ...Object.assign({}, ...flattenArray)
              }
            })}
          />
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Publication (ordered by Alexa Ranking)
              </TableCell>
              {getLast7PossibleDaysAlexa.map((day, i) =>
                <TableCell
                  key={i}
                  numeric
                >
                  {moment(day).format('DD')} {moment(day).format('MMMM')}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {getAlexaRankingsForLast7Days.map((publication, i) =>
              <TableRow
                key={i}
              >
                <TableCell>
                  <Link
                    style={{
                      color: publication.fill,
                      display: 'block',
                      overflow: 'hidden'
                    }}
                    to={`/publication/${publication.id}`}
                  >
                    {publication.name}
                  </Link>
                </TableCell>
                {publication.rankings.map((day, i) =>
                  <TableCell
                    key={i}
                    numeric
                  >
                    {day !== undefined ?
                      <span>
                        {day.value.toLocaleString()}
                      </span> : <span
                        style={{
                          color: '#F0F0F0'
                        }}
                      >
                        N/A
                      </span>
                    }
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    )
  }
}

AlexaRanking.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AlexaRanking);
