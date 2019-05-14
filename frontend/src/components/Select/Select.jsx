import React from 'react';
import Select from 'react-select';
import './Select.css'; 

class CustomSelect extends React.Component {
    render() {
        const {value, onChange, options, placeholder, noOptionsMessage} = this.props;

        return (
            <div className="select-container">
                <Select
                    className="select"
                    value={ value }
                    onChange={ onChange }
                    options={ options }
                    placeholder={ placeholder || "Selecione :" }
                    noOptionsMessage={ () => noOptionsMessage }
                />
            </div>
        );
    }
};

export default CustomSelect;