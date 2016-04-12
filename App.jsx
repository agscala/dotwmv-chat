// App component - represents the whole app
App = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {selectedMessage: null}
    },

    getMeteorData() {
        return {
            messages: Messages.find({}, {sort: {createdAt: -1}, limit:20}).fetch()
        };
    },

    renderMessages() {
        return this.data.messages.reverse().map((message) => {
            return <Message
                        key={message._id}
                        message={message}
                        onCopy={this.setMessageTemplate} />;
        });
    },

    setMessageTemplate(message) {
        this.setState({selectedMessage: message});
    },
    
    scrollToBottom() {
        this.refs.messagesList.scrollTop = this.refs.messagesList.scrollHeight;
    },

    componentDidMount() {
        this.scrollToBottom();
    },
    
    componentDidUpdate() {
        this.scrollToBottom();
    },

    render() {
        return (
            <div className="container">
                <div id="messages-list" ref="messagesList">
                    {this.renderMessages()}
                </div>

                <InputWidget messageTemplate={this.state.selectedMessage} />
            </div>
        );
    }
});
