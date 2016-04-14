const TEXT_MODE = 0;
const DRAW_MODE = 1;

InputWidget = React.createClass({
    propTypes: {
        messageTemplate: React.PropTypes.object,
    },

    getInitialState() {
        return {
            messageValue: "",
            drawingData: null,
            inputMode: DRAW_MODE,
        };
    },

    componentDidMount() {
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps.messageTemplate !== null) {
            console.log(nextProps.messageTemplate);
            this.setState({
                messageValue: nextProps.messageTemplate.text,
                cameraData: nextProps.messageTemplate.image,
            });
        }
    },

    handleSubmit(event) {
        event.preventDefault();

        // insert into database
        var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Messages.insert({
            text: text,
            image: this.state.drawingImg,
            drawing: this.state.drawingData,
            createdAt: new Date(),
        });
    },

    changeMessageInput(event) {
        this.setState({messageValue: event.target.value});
    },

    setTextMode(event) {
        this.setState({inputMode: TEXT_MODE});
    },

    setDrawMode(event) {
        this.setState({inputMode: DRAW_MODE});
    },

    getCameraData(data) {
        this.setState({cameraData: data});
    },

    getDrawingData(canvasData, canvasImg) {
        console.log(canvasImg);
        this.setState({drawingData: canvasData, drawingImg: canvasImg});
    },

    render() {
        let selectedInputWidget = null;

        switch (this.state.inputMode) {
        case TEXT_MODE:
            break;
        case DRAW_MODE:
        break;
        }

//                TODO: reintroduce when we enable text in the future
//                <div className="mode-selector">
//                    <div className={"input-mode-button" + (this.state.inputMode == TEXT_MODE ? " selected-mode-button" : "")}
//                        onClick={this.setTextMode}>Text</div>
//                    <div className={"input-mode-button" + (this.state.inputMode == DRAW_MODE ? " selected-mode-button" : "")}
//                        onClick={this.setDrawMode}>Draw</div>
//                </div>

        const drawingTemplate = this.props.messageTemplate ? this.props.messageTemplate.drawing : null;

        return (
            <form className="new-message" onSubmit={this.handleSubmit} >

                <div className={"draw-input" + (this.state.inputMode == DRAW_MODE ? " selected-mode" : "")}>
                    <DrawingWidget
                        template={drawingTemplate}
                        onFinished={this.getDrawingData}
                        handleSubmit={this.handleSubmit}
                        backgroundImage={this.state.cameraData} />
                </div>


                <div className={"text-input" + (this.state.inputMode == TEXT_MODE ? " selected-mode" : "")}>
                    <div className="text-input-container">
                        <textarea
                            ref="textInput"
                            value={this.state.messageValue}
                            onChange={this.changeMessageInput}
                            placeholder="Type to add a new message" />
                    </div>

                    <div className="text-input-controls">
                        <div className="text-control text-submit" onClick={this.handleSubmit}>SEND</div>
                    </div>
                </div>
            </form>
        );
    }
});
