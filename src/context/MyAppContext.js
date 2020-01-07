import React from 'react';

const MyAppContext = React.createContext({
  tweets: [],
  addTweet: (tweet) => { }
});
export default MyAppContext;