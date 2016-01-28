Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {
    Meteor.startup(function () {
        ReactDOM.render(<App />, document.getElementById("content"));
    });
}
