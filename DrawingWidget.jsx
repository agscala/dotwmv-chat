TOOL_SMALL = 0;
TOOL_MEDIUM = 1;
TOOL_LARGE = 2;
TOOL_ERASER = 3;

DrawingWidget = React.createClass({
    canvas: null,
    canvasImage: null,

    getInitialState() {
        return {
            currentTool: TOOL_MEDIUM,
        };
    },

    componentDidMount() {
        this.canvas = new fabric.Canvas("draw-input-canvas", {
            isDrawingMode: true,
        });

        const container = this.refs.canvasContainer;
        this.canvas.setDimensions({width: container.clientWidth, height: container.clientHeight});

        this.canvas.freeDrawingBrush.width = 2;
        this.canvas.freeDrawingBrush.color = "rgb(0,0,0)";
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.template !== null && nextProps.template !== this.props.template) {
            this.canvas.loadFromJSON(nextProps.template);
            this.canvas.renderAll();
            this.save();
        }
    },

    save() {
        // Timeout needed otherwise the last stroke doesn't get saved since onMouseEnd
        // triggers before fabric is done adding the stroke to the canvas.
        window.setTimeout(() => {
            this.props.onFinished(this.canvas.toJSON(), this.canvas.toDataURL('png'));
        }, 0);
    },

    clear() {
        this.canvas.clear();
        this.props.onFinished(null);
        this.canvas.renderAll();
    },

    setSmall() {
        this.canvas.freeDrawingBrush.width = 2;
        this.canvas.freeDrawingBrush.color = "rgb(0,0,0)";
        this.setState({currentTool: TOOL_SMALL});
    },

    setMedium() {
        this.canvas.freeDrawingBrush.width = 5;
        this.canvas.freeDrawingBrush.color = "rgb(0,0,0)";
        this.setState({currentTool: TOOL_MEDIUM});
    },

    setLarge() {
        this.canvas.freeDrawingBrush.width = 10;
        this.canvas.freeDrawingBrush.color = "rgb(0,0,0)";
        this.setState({currentTool: TOOL_LARGE});
    },

    setEraser() {
        this.canvas.freeDrawingBrush.width = 20;
        this.canvas.freeDrawingBrush.color = "rgb(255,255,255)";
        this.setState({currentTool: TOOL_ERASER});
    },

    undo() {
        this.canvas.remove(this.canvas._objects[this.canvas._objects.length -1]);
        this.props.onFinished(this.canvas.toJSON(), this.canvas.toDataURL('png'));
    },

    send(event) {
        if (this.canvas._objects.length > 0) {
            this.props.handleSubmit(event);
            this.clear();
            
            $(this.refs.drawSubmit).removeClass("inactive").addClass("inactive");
            window.setTimeout(() => {
                $(this.refs.drawSubmit).removeClass("inactive");
            }, 8000);
        }
    },

    render() {
        return (
            <div>
                <div className="canvas-container" ref="canvasContainer" onTouchEnd={this.save} onMouseUp={this.save}>
                    <canvas id="draw-input-canvas"></canvas>
                </div>
                <div className="drawing-controls">
                    <div
                        className={"draw-control draw-small " + (this.state.currentTool == TOOL_SMALL ? "selected" : "")}
                        onClick={this.setSmall}><i className="icon-circle small"></i></div>
                    <div
                        className={"draw-control draw-medium " + (this.state.currentTool == TOOL_MEDIUM ? "selected" : "")}
                        onClick={this.setMedium}><i className="icon-circle medium"></i></div>
                    <div
                        className={"draw-control draw-large " + (this.state.currentTool == TOOL_LARGE ? "selected" : "")}
                        onClick={this.setLarge}><i className="icon-circle large"></i></div>
                    <div
                        className={"draw-control draw-eraser " + (this.state.currentTool == TOOL_ERASER ? "selected" : "")}
                        onClick={this.setEraser}><i className="icon-circle-empty"></i></div>
                    <div className="draw-control draw-undo" onClick={this.undo}><i className="icon-ccw"></i></div>
                    <div className="draw-control draw-clear" onClick={this.clear}><i className="icon-cancel"></i></div>
                    <div className="draw-control draw-submit" ref="drawSubmit" onClick={this.send}><span className="submit-text"><i className="icon-up-big"></i></span></div>
                </div>
            </div>
        );
    }
});
