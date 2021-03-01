import React from 'react';
import { bankOne, bankTwo } from './itemPads.js';

const KEYS = 'QWEASDZXC'.split('').map(a => a.charCodeAt());
const STYLE_DEFAULT = 
    { 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "3px",
        height: "80px",
        width:  "80px",
        borderRadius: ".6rem",
        backgroundColor: "#4169e1" 
    };
const STYLE_DOWN = //hover
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "3px",
        height: "80px",
        width:  "80px",
        borderRadius: ".6rem",
        backgroundColor: "#6f90f1"
    };

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="drum-pad" id={this.props.item.id} style={this.props.figure}>
                <audio src={this.props.item.url} />
                {this.props.item.keyTrigger}
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyIsPressed: false
        };
        this.keydown = this.keydown.bind(this);
        this.keyup = this.keyup.bind(this);
    }

    keydown(event) {
        if(KEYS.includes(event.keyCode)){
            this.setState({keyIsPressed: !this.state.keyIsPressed});
        }
    }

    keyup(event) {
        if(KEYS.includes(event.keyCode)){
            this.setState({keyIsPressed: !this.state.keyIsPressed});
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
    }

    render() {
        const STYLE = this.state.keyIsPressed ? STYLE_DOWN : STYLE_DEFAULT;
        return (
            <div id="drum-machine">
                <div id="display">
                    { bankOne.map(item => <DrumPad item={item} figure={STYLE} />) }
                </div>
            </div>
        )
    }
}

export default App;