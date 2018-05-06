import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { Button, Grid } from "material-ui";

import { dataList } from "../constants/Index";
import { ContentWithSidebar } from "../components/Index";

const styles = theme => ({
  button: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  }
});

class Data extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <ContentWithSidebar>

        <div
          className="data-list"
        >
          <Grid
            container
            spacing={24}
          >
            {dataList.map((data, i) =>
              <Grid
                item
                key={i}
                md={6}
                sm={6}
                xs={12}
              >
                <div
                  className="data-list__item"
                >
                  <div
                    className="data-list__item__banner"
                  >
                    <a
                      href={`/${data.urlSlug}`}
                    >
                      {data.title}
                    </a>
                    {data.linkGroup.length > 0 &&
                      <div
                        className="data-list__item__banner__description"
                      >
                        {data.linkGroup.map((link, i) =>
                          <Button
                            className={classes.button}
                            color="primary"
                            href={`/${link.urlSlug}`}
                            key={i}
                            size="medium"
                            variant="flat"
                          >
                            {link.title}
                          </Button>
                        )}
                      </div>
                    }
                  </div>
                </div>
              </Grid>
            )}
          </Grid>
        </div>

      </ContentWithSidebar>
    )
  }
}

Data.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Data);
