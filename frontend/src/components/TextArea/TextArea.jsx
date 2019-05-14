import React from 'react';
import "./TextArea.css";

class TextArea extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="textarea-container">
                <textarea name="textarea" className="textarea" required pattern="\S+.*"></textarea>
                <div className="textarea-border"></div>
                <label htmlFor="textarea" className="textarea-label"><span>Observações:</span></label>
            </div>
        );
    }
}


export default TextArea;