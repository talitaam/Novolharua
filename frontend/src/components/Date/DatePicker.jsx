import React from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date (moment(props.selected).format('YYYY-MM-DD'))   
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });

        fetch('http://localhost:3001/rota/', {
            method: "POST", 
            body: JSON.stringify({
                'data': moment(date).format('YYYY-MM-DD')
            })
        })
        .then((res) => res.json())
        .then((response) => {
            window.rotas = response.rotas
        }); 
    }

    render () {
        return <div className="divSpacing">
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholder="Selecione uma data :"
                        className="defaultInput"
                    />
                </div>
    }
};

export default CustomDatePicker;