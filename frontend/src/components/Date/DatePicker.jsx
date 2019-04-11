import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class CustomDatePicker extends React.Component { 
    render () {
        return <div className="divSpacing">
                    <DatePicker
                        selected={this.props.selected}
                        onChange={this.props.onChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholder="Selecione uma data :"
                        className="defaultInput"
                        disabledKeyboardNavigation
                    />
                </div>
    }
};

export default CustomDatePicker;