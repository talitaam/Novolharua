import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class CustomDatePicker extends React.Component {
    constructor() {
        super();
        this.state = {
            startDate: new Date()   
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render () {
        return <div className="divSpacing">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione uma data :"
                        className="defaultInput"
                    />
                </div>
    }
};

export default CustomDatePicker;