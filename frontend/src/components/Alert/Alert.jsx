import React from 'react';
import './Alert.css'; 

class Alert extends React.Component {
    render() {
        return (
            <div>{this.props.message}</div>
        );
    }
};

export default Alert;