import React from 'react';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userNameDisplay: '',
        };
    }

    handleNameChange(event) {
        this.setState({
            userName: event.target.value
        });
    }

    save() {
        console.log("saving");
        localStorage.setItem('userName', this.state.userName)
        this.setState({
            userNameDisplay: this.state.userName
        })

    }

    clearContents = (element) => {
        this.setState({
            userName: ''
        });
    }

    componentDidMount() {
        this.setState({
            userNameDisplay: localStorage.getItem('userName')
        })
    }

    render() {
        return (
            <div>
                <div className="profile-header">
                    Profile
                </div>

                <div className="user-name-placer">
                    {this.state.userNameDisplay}
                </div>

                <textarea
                    className="user-name-text-area"
                    value={this.state.userName}
                    type="text"
                    placeholder="type your user name.."
                    onChange={event => this.handleNameChange(event)}
                    rows="2" cols="50"
                />

                <button
                    className="save-button"
                    onClick={
                        () => { this.save() }
                    }
                > Save
                </button>

            </div >

        )
    }
}

export default ProfilePage;



