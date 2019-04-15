import React from 'react';
import './Alert.css'; 

class Alert extends React.Component {
    render() {
        return (
            <div id="Veronica">{this.props.message}</div>
        );
    }
};

export default Alert;