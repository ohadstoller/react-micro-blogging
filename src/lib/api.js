import axios from 'axios';

export function postTweetOnline(tweet) {

    return axios.post("https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet", {
        "tweet": {
            content: tweet.content, userName: tweet.userName,
            date: new Date().toISOString(),
        }
    });
}

export function getOnlineTweets() {
    return (axios.get("https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet")
    )
};


