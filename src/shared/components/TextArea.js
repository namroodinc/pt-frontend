import React from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { VictoryPie } from "victory";

const styles = theme => ({
  button: {
    float: 'right',
    margin: '5px 0'
  }
});

@observer
class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.review = React.createRef();
    this.state = {
      characterLength: 0,
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({
      characterLength: defaultValue.length
    });
  }

  handleChange = (event) => {
    this.setState({
      characterLength: event.target.value.length
    });
  };

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit({
      description: this.review.current.value
    });
  }

  render() {
    const { characterLimit, classes, defaultValue, label, rows } = this.props;
    const { characterLength, isLoading } = this.state;

    return (
      <div
        className="review__message"
      >
        <div
          className="review__message__textarea"
        >
          <textarea
            defaultValue={defaultValue}
            onChange={this.handleChange}
            placeholder="Add your review"
            ref={this.review}
            rows={rows}
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
                  '#F8BBD0'
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
              disabled={characterLength >= characterLimit || characterLength === 0 || isLoading}
              onClick={this.handleSubmit}
              variant="contained"
            >
              {isLoading ?
                (
                  <span>
                    Submitting {label} ...
                  </span>
                ) : (
                  <span>
                    Submit {label}
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

TextArea.defaultProps = {
  characterLimit: 280,
  defaultValue: '',
  label: '',
  onSubmit: (() => {
    console.log('onSubmit prop missing and required')
  }),
  rows: 4
}

TextArea.propTypes = {
  articleId: PropTypes.string,
  characterLimit: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired
};

export default withStyles(styles)(TextArea);
