import React from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { VictoryPie } from "victory";

import Actions from "../actions/Actions";
import Store from "../stores/Store";

const styles = theme => ({
  button: {
    float: 'right',
    margin: '5px 0'
  }
});

@observer
class ReviewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.review = React.createRef();
    this.state = {
      characterLength: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      characterLength: event.target.value.length
    });
  };

  handleSubmit() {
    console.log(this.review.current.value);
    Actions.postReview(
      this.props.articleId,
      this.review.current.value
    );
  }

  render() {
    const { characterLimit, classes } = this.props;
    const { characterLength } = this.state;

    return (
      <div
        className="review__message"
      >
        <div
          className="review__message__textarea"
        >
          <textarea
            onChange={this.handleChange}
            placeholder="Add your review"
            ref={this.review}
            rows={4}
          />
        </div>

        <div
          className="review__message__controls"
        >
          <div
            className="review__message__controls__column"
          >
            <div
              className="review__message__controls__column__chart"
            >
              <VictoryPie
                colorScale={[
                  '#AD1457',
                  '#FCE4EC'
                ]}
                data={[
                  {
                    x: 'used',
                    y: characterLength
                  },
                  {
                    x: 'remaining',
                    y: characterLimit - characterLength
                  }
                ]}
                labels={() => null}
                innerRadius={160}
                padding={0}
              />
            </div>
            <span
              className="review__message__controls__column__character-count"
            >
              {characterLimit - characterLength}
            </span>
          </div>

          <div
            className="review__message__controls__column"
          >
            <Button
              className={classes.button}
              color="primary"
              disabled={characterLength >= characterLimit || characterLength === 0}
              onClick={this.handleSubmit}
              size="large"
              variant="outlined"
            >
              {Store.isReviewLoading() ?
                (
                  <span>
                    Submitting ...
                  </span>
                ) : (
                  <span>
                    Submit
                  </span>
                )
              }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

ReviewMessage.defaultProps = {
  characterLimit: 280
}

ReviewMessage.propTypes = {
  articleId: PropTypes.string,
  characterLimit: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewMessage);
