import React from 'react';


class BotaoRosa extends React.Component {
    constructor() {
        this.state = {
            text= "Talita"
        };
    }

    render() {
        return(
            <button>{this.state.text}</button>
        );
    }
}

export default BotaoRosa;