import React from 'react';
import Select from 'react-select';
import './Select.css'; 

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            options: props.options
        };

        this.handleChange = this.handleChange.bind(this);
    };  

    componentDidMount() {
        fetch('http://localhost:3001/rota/', {
            method: "POST", 
            body: JSON.stringify(new Date)
        })
        .then((res) => res.json())
        .then((response) => {
            this.setState({
                options: response.rotas
            });
        }); 
    }

    handleChange = (value) => {
        fetch('http://localhost:3001/rota/', {
            method: "POST", 
            body: JSON.stringify(new Date)
        })
        .then((res) => res.json())
        .then((response) => {
            window.rotas = response.rotas;
            this.setState({
                value: value,
                options: window.rotas
            });
            window.selectedOption = value;
        }); 
    }

    render() {
        return (
            <div className="divSpacing">
                <Select
                    id={'rota'}
                    className="select"
                    value={this.state.value}
                    onChange={this.handleChange}
                    options={this.state.options}
                />
            </div>
        );
    }
};

export default CustomSelect;