import React from 'react';
import './Badge.css'; 

class Badge extends React.Component {
    
    
    render() {
        const { maxValue, actualValue } = this.props;

        return (
            <div className="badge">
                <span className="badge-text badge-actual-value">{ actualValue }</span>
                <span className="badge-text badge-separator">/</span>
                <span className="badge-text badge-max-value">{ maxValue }</span>
            </div>
        );
    }
};

export default Badge;