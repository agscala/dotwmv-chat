// App component - represents the whole app
App = React.createClass({
    mixins: [ReactMeteorData],

    getInitialState() {
        return {selectedMessage: null}
    },

    getMeteorData() {
        return {
            messages: Messages.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },

    renderMessages() {
        return this.data.messages.map((message) => {
            return <Message
                        key={message._id}
                        message={message}
                        onCopy={this.setMessageTemplate} />;
        });
    },

    setMessageTemplate(message) {
        this.setState({selectedMessage: message});
    },

    componentDidMount() {
    },

    render() {
        return (
            <div className="container">
                <div id="messages-list">
                    {this.renderMessages()}
                </div>

                <InputWidget messageTemplate={this.state.selectedMessage} />
            </div>
        );
    }
});
