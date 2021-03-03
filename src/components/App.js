import React from 'react';
import { bankOne, bankTwo } from './itemPads.js';
import $ from 'jquery'

const banks = [bankOne, bankTwo];

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    playSound() {
        let audio = $('#' + this.props.item.keyTrigger)[0];
        audio.currentTime = 0;
        audio.play();

        this.props.updateDisplay(this.props.item.id);
    }

    handleKeyPress(event) {
        if(event.keyCode == this.props.item.keyCode){
            this.playSound();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        return (
            <button className="drum-pad btn btn-primary" id={this.props.item.id} onClick={this.playSound}>
                <audio id={this.props.item.keyTrigger} className="clip" src={this.props.item.url} />
                {this.props.item.keyTrigger}
            </button>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: '',
            keyIsPressed: false,
            currentBank: 0,
            bankStyle: {
                background: 'linear-gradient(90deg, red 0px, red 40px, black 40px, black 80px)',
                width: '80px',
                padding: '0px',
                color: 'white',
                fontWeight: '700'
            }
        };
        this.changeDisplay = this.changeDisplay.bind(this);
        this.bankSwitch = this.bankSwitch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    changeDisplay(name) {
        this.setState({
            display: name.replace(/-/g, ' ')
        });
    }

    handleKeyPress(event) {
        if(event.keyCode === 32){
            this.bankSwitch();
        }
    }

    bankSwitch() {
        if(this.state.currentBank === 0){
            this.setState({
                display: 'Heater Kit',
                currentBank: 1,
                bankStyle: {
                    background: 'linear-gradient(90deg, black 0px, black 36px, red 36px, red 80px)',
                    width: '80px',
                    padding: '0px',
                    color: 'white',
                    fontWeight: '700'
                }
            });
        }
        else{
            this.setState({
                display: 'Smooth Piano Kit',
                currentBank: 0,
                bankStyle: {
                    background: 'linear-gradient(90deg, red 0px, red 40px, black 40px, black 80px)',
                    width: '80px',
                    padding: '0px',
                    color: 'white',
                    fontWeight: '700'
                }
            });
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="drum-container">
                    { banks[this.state.currentBank].map(item => <DrumPad item={item} updateDisplay={this.changeDisplay}/>) }
                </div>
                <div id="display-container">
                    <p id="display">
                        {this.state.display}
                    </p>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{margin: '0px', fontWeight: '700'}}>Bank Switcher</p>
                        <button id="bank-switcher" onClick={this.bankSwitch} style={this.state.bankStyle}>
                            SPACE
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;