import React from 'react';
import Select from 'react-select';
import './Select.css'; 

class CustomSelect extends React.Component {
    render() {
        return (
            <div className="divSpacing">
                <Select
                    className="select"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    options={this.props.options}
                    placeholder={this.props.placeholder}
                    noOptionsMessage={this.props.noOptionsMessage}
                />
            </div>
        );
    }
};

export default CustomSelect;