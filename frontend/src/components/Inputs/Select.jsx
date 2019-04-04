import React from 'react';
import Select from 'react-select';
import './Select.css'; 

class CustomSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedOption: null
        };
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {
        const { selectedOption } = this.state;
    
        return (
            <div className="divSpacing">
                <Select
                    className="select"
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.props.options}
                />
            </div>
        );
    }
};

export default CustomSelect;