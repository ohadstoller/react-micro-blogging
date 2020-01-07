import React from 'react'
import CreateTweet from '../comp/CreateTweet';
import MyAppContext from "../context/MyAppContext";
import TweetList from '../comp/TweetList';
import { postTweetOnline } from "../lib/api";
import { getOnlineTweets } from "../lib/api";


export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            addTweet: this.handleOnSubmit.bind(this),
            loading: true
        };
    };



    handleOnSubmit(tweet) {
        postTweetOnline(tweet).then(response => {
            const tweet = response;
            this.setState({
                tweet: tweet,
                loading: false
            });
        });
    };





    createDefaultUser() {
        if (localStorage.getItem('userName') == null) {
            localStorage.setItem('userName', 'Random User')
        };
    }

    sendGetApiRequest() {
        getOnlineTweets().then(response => {
            this.setState(
                {
                    tweets: response.data.tweets
                }
            );
        });
    };

    componentDidMount() {
        document.title = `Micro-Blogging`;
        this.createDefaultUser();
        this.sendGetApiRequest();
        setInterval(() => {
            this.sendGetApiRequest();
        }, 3000);

    }

    render() {
        return (
            <div>
                <MyAppContext.Provider
                    value={this.state}>
                    <div
                        className="post-box">
                        <CreateTweet />
                    </div>
                    <div
                        className="feed">
                        <TweetList />
                    </div>
                </MyAppContext.Provider>
            </div>
        )
    }
}
