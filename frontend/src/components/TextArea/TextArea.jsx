import React from 'react';
import "./TextArea.css";

class TextArea extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <label htmlFor="textarea" className="textarea-label" > Observação: </label>
                <div className="textarea-border">
                    <textarea name="textarea" className="textarea"></textarea>
                </div>
            </div>
        );
    }
}


export default TextArea;