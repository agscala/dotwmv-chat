Message = React.createClass({
    canvas: null,
    canvasImage: null,

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        message: React.PropTypes.object.isRequired
    },

    componentDidMount() {
    },

    handleCopy() {
        this.props.onCopy(this.props.message);
    },

    render() {
        console.log(this.props.message);
        let textColorClass = (this.props.message.image || this.props.message.drawing) ? "white" : "black";
        return (
            <div className='message'>
                <div className='message-content'>
                    <div className={'message-text ' + textColorClass}>{this.props.message.text}</div>
                    <img className='drawing-image' src={this.props.message.image} />
                </div>
                <div className='message-controls'>
                    <div className="copy-button" type="button" value="copy" onClick={this.handleCopy}><i className="icon-down-big"></i></div>
                </div>
            </div>
        );
    }
});
