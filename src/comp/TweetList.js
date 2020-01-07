import React from 'react';
import MyAppContext from '../context/MyAppContext';
import '../App.css'

const TweetList = props => {

  return (
    <MyAppContext.Consumer>
      {({ addTweet, tweets }) => (

        <div >
          {tweets.map(tweet => (
            <div className="tweet-box" key={tweet.date}>
              <p className="post-date"> {tweet.date}
              </p>
              <p className="user-name"> {tweet.userName}
              </p>
              <div className="text-area">
                {tweet.content}
              </div>
            </div>
          ))}
        </div>

      )}
    </MyAppContext.Consumer>
  );
};

export default TweetList;
