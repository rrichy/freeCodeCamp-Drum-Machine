import React from 'react';
import { bankOne, bankTwo } from './itemPads.js';
import $ from 'jquery'

const banks = [bankOne, bankTwo];

class DrumPad extends React.Component {
    constructor(props) {
        super(props);
        this.playSound = this.playSound.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.activeButton = this.activeButton.bind(this);
    }

    activeButton() {
        if($('.drum-' + this.props.index)[0].className.includes('drum-active')){
            $('.drum-' + this.props.index)[0].className = 'drum-pad drum-' + this.props.index;
        }
        else{
            $('.drum-' + this.props.index)[0].className = 'drum-pad drum-' + this.props.index + ' drum-active';
        }
    }

    playSound() {
        let audio = $('#' + this.props.item.keyTrigger)[0];
        audio.currentTime = 0;
        audio.play();
        this.activeButton();
        setTimeout(() => this.activeButton(), 100);
        this.props.updateDisplay(this.props.item.id);
    }

    handleKeyPress(event) {
        if(event.keyCode === this.props.item.keyCode){
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
            <button className={"drum-pad drum-" + this.props.index} id={this.props.item.id} onClick={this.playSound}>
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
                fontWeight: '700',
                marginBottom: '10px'
            },
            volume: 50
        };
        this.changeDisplay = this.changeDisplay.bind(this);
        this.bankSwitch = this.bankSwitch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
    }

    changeDisplay(name) {
        this.setState({
            display: name.replace(/-/g, ' ')
        });
    }

    changeVolume(event) {
        this.setState({
            volume: event.target.value,
            display: 'Volume: ' + event.target.value
        });
    }

    handleKeyPress(event) {
        if(event.keyCode === 16){
            this.bankSwitch();
        }
        if(event.keyCode === 82){
            const newVolume = this.state.volume >= 95 ? 100 : this.state.volume + 5;
            this.setState({
                volume: newVolume,
                display: 'Volume: ' + newVolume
            });
        }
        if(event.keyCode === 70){
            const newVolume = this.state.volume <= 5 ? 0 : this.state.volume - 5;
            this.setState({
                volume: newVolume,
                display: 'Volume: ' + newVolume
            });
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
                    fontWeight: '700',
                    marginBottom: '10px'
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
                    fontWeight: '700',
                    marginBottom: '10px'
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
        [...document.getElementsByTagName('audio')].forEach(audio => audio.volume = this.state.volume / 100);
        return (
            <div id="drum-machine">
                <div id="drum-container">
                    { banks[this.state.currentBank].map((item, index) => <DrumPad item={item} updateDisplay={this.changeDisplay} index={index} />) }
                </div>
                <div id="display-container">
                    <h3 style={{color: 'white', marginBottom: '20px'}}>Drum Machine</h3>
                    <p id="display">
                        {this.state.display}
                    </p>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <p style={{color: 'white', margin: '0px', fontWeight: '700'}}>Bank Switcher</p>
                        <button id="bank-switcher" onClick={this.bankSwitch} style={this.state.bankStyle}>
                            LSHIFT
                        </button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <p style={{color: 'white', margin: '0px', fontWeight: '700'}}>F - </p>
                        <input type="range" min="0" max="100" onChange={this.changeVolume} value={this.state.volume}></input>
                        <p style={{color: 'white', margin: '0px', fontWeight: '700'}}> + R</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;