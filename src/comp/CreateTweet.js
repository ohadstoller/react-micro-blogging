import React from 'react';
import MyAppContext from '../context/MyAppContext';
import toxicDetect from '../lib/ToxicDetect';
import loader from '../lib/loader';


class CreateTweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: '',
      lengthError: false,
      buttonOpacity: 1,
      toxicError: false,

    };


  }

  handleTweetChange(event) {
    this.setState(
      { tweet: event.target.value }
    );
    this.maxLengthCheck(event);
    // this.loadTf();
  }

  loadTf() {
    loader.on();
    toxicDetect.loadModel()
      .then(model => {
        toxicDetect
          .classify(this.state.tweet)(model)
          .then(predictions => {
            this.handlePredictResult(toxicDetect.predict(predictions))
            loader.off()
          })
      })
  }

  handlePredictResult(predictions) {
    const result = predictions[6].results[0];
    const [falseProbability, trueProbability] = result.probabilities;
    console.log("false probability is " + falseProbability);
    console.log("true probability is " + trueProbability);

    const isPositiveProbability = trueProbability > 0.5;
    const toxicError = isPositiveProbability ? true : false;
    const buttonOpacity = isPositiveProbability ? 0.5 : 1;

    this.setState({ toxicError, buttonOpacity });
  }

  clearContents = (element) => {
    this.setState({
      tweet: ''
    });
  }

  maxLengthCheck = (object) => {
    if (object.target.value.length > 139) {
      this.setState({
        lengthError: true,
      })
    }
    else {
      this.setState({
        lengthError: false,
      })
    }
  }


  render() {
    const { tweet } = this.state;
    return (
      <MyAppContext.Consumer>
        {({ addTweet, tweets }) => (
          <div>
            <textarea
              value={this.state.tweet}
              className="text-box"
              maxLength="140"
              onInput={this.maxLengthCheck}
              type="text"
              rows="8" cols="100"
              placeholder="What you have in mind..."
              onChange={
                event => this.handleTweetChange(event)
              }
              // onBlur={
              //   event => this.loadTf(event)
              // }
              style={{ backgroundColor: this.state.mainColor }}
            />

            <button
              className="tweet-button shadow"
              style={{ opacity: this.state.buttonColor }}
              disabled={this.state.toxicError}
              onClick={() => {
                addTweet({
                  content: tweet, userName: localStorage.getItem('userName'),
                  date: new Date().toISOString(),
                });

                this.clearContents();
              }}>
              Tweet
            </button>
            {this.state.lengthError && <div className="length-error">
              The tweet can't contain more then 140 chars
            </div>
            }
            {this.state.toxicError && <div className="length-error">
              Please don't use this kind of language!
            </div>
            }
          </div>
        )
        }
      </MyAppContext.Consumer>
    );
  }
}

export default CreateTweet;
