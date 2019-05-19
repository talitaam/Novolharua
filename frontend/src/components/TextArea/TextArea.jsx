import React from 'react';
import "./TextArea.css";

class TextArea extends React.Component {
    constructor() {
        super();
    }

    render() {
        const { text, onChange } = this.props.inputProps;

        return (
            <div className="textarea-container">
                <textarea name="textarea" className="textarea" onChange={ onChange } required pattern="\S+.*">{ text }</textarea>
                <div className="textarea-border"></div>
                <label htmlFor="textarea" className="textarea-label"><span>Observações:</span></label>
            </div>
        );
    }
}


export default TextArea;