import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import TextArea from "../../components/TextArea/TextArea.jsx";
import UserService from "./UserService";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import "./CadUsuario.css";
import JqueryMaskPlugin from 'jquery-mask-plugin';
 import $ from 'jquery';

const OPTIONS = ["Agasalho", "Cursos", "Higiene", "Refeição"];

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CadUsuario extends React.Component {
  constructor() {
    super();
    $("#cpfcnpj").keydown(function(){
      try {
          $("#cpfcnpj").unmask();
      } catch (e) {}
  
      var tamanho = $("#cpfcnpj").val().length;
  
      if(tamanho < 11){
          $("#cpfcnpj").mask("999.999.999-99");
      } else {
          $("#cpfcnpj").mask("99.999.999/9999-99");
      }
  
      // ajustando foco
      var elem = this;
      setTimeout(function(){
          // mudo a posição do seletor
          elem.selectionStart = elem.selectionEnd = 10000;
      }, 0);
      // reaplico o valor para mudar o foco
      var currentValue = $(this).val();
      $(this).val('');
      $(this).val(currentValue);
  });
    this.state = {
      name: "",
      email: "",
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs: "",
      checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
      ),
      validaDoc: false
    };

    this.saveUser = this.saveUser.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCpfCnpj = this.onChangeCpfCnpj.bind(this);
    this.onChangeTelefoneFixo = this.onChangeTelefoneFixo.bind(this);
    this.onChangeTelefoneCelular = this.onChangeTelefoneCelular.bind(this);
    this.cleanFields = this.cleanFields.bind(this);
  }

  onChangeUserName(event) {
    this.setState({
      name: event.target.value
    });
  }


  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onChangeCpfCnpj(event) {
    var validaDoc = this.state.validaDoc;
    if (!event.target.value.trim()) {
     validaDoc = !(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})|((\d{3}.\d{3}.\d{3}-\d{2}))$/).test(event.target.value)
    }
    this.setState({
      doc: event.target.value,
      validaDoc: validaDoc
    });
  }


  onChangeTelefoneFixo(event) {
    this.setState({
      telefoneFixo: event.target.value
    });
  }

  onChangeTelefoneCelular(event) {
    this.setState({
      telefoneCelular: event.target.value
    });
  }

  saveUser() {
    const {
      name,
      email,
      doc,
      telefoneFixo,
      telefoneCelular,
      obs
    } = this.state;

    const saveData = {
      name,
      email,
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs
    };

    let canSave = true;

    if (!name.trim()) {
      alert("O campo nome do usuário deve ser preenchido!");
      canSave = false;
    }

    if (canSave) {
      UserService.saveUser(saveData).then(json => {
        if (json) alert(json.message);
        this.cleanFields();
      });
    }
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log(checkbox, "is selected.");
      });
  };

  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  cleanFields() {
    this.setState({
      name: "",
      email: "",
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs: "",
      //checkboxes.deselectAll
    });
  }

  render() {
    const {
      name,
      email,
      doc,
      telefoneFixo,
      telefoneCelular,
      obs,
      disabled,
      validaDoc
    } = this.state;

    return (
      <>
        <GridContainer justify="flex-start" alignItems="center">
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Nome do usuário:"
              id="nmUsuario"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: name,
                onChange: this.onChangeUserName
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="E-mail do usuário:"
              id="emailUsuario"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "email",
                value: email,
                onChange: this.onChangeEmail
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="CPF/CNPJ:"
              id="cpfcnpj"
              formControlProps={{
                fullWidth: true
              }}
              error={validaDoc}
              inputProps={{
                type: "cpf/cnpj",
                value: doc,
                onChange: this.onChangeCpfCnpj
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Telefone Fixo:"
              id="telefoneFixo"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "telefoneFixo",
                value: telefoneFixo,
                onChange: this.onChangeTelefoneFixo
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Telefone Celular:"
              id="telefoneCelular"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "telefoneCelular",
                value: telefoneCelular,
                onChange: this.onChangeTelefoneCelular
              }}
            />
          </GridItem>
          <div className="checkboxes">
            <label>
              <span>Ações que se propõe:</span>
            </label>
            {this.createCheckboxes()}
          </div>
          <GridItem xs={12} sm={12} md={12}>
            <TextArea
              inputProps={{
                value: obs,
                onChange: this.onChangeObservation
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <GridItem xs={12} sm={12} md={12}>
              <Button color="danger" onClick={this.cleanFields}>
                Limpar Dados
              </Button>
              <Button color="success" onClick={this.saveUser}>
                Salvar
              </Button>
            </GridItem>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(styles)(CadUsuario);