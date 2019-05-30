import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";
import TextArea from "../../components/TextArea/TextArea.jsx";
import UserService from "./UserService.js";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import "./CadUsuario.css";
import $ from "jquery";
import Mask from "jquery-mask-plugin";

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

const CPF_LENGTH = 11;
const CNPJ_LENGTH = 14;
const TEL_LENGTH = 10;
const CEL_LENGTH = 11;

class CadUsuario extends React.Component {
  constructor() {
    super();

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
      validaDoc: false,
      validaCel: false,
      validaTel: false,
      validaEmail: false
    };

    this.saveUser = this.saveUser.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeCpfCnpj = this.onChangeCpfCnpj.bind(this);
    this.onChangeTelefoneFixo = this.onChangeTelefoneFixo.bind(this);
    this.onChangeTelefoneCelular = this.onChangeTelefoneCelular.bind(this);
    this.cleanFields = this.cleanFields.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  onChangeUserName(event) {
    this.setState({
      name: event.target.value
    });
  }

  onChangeEmail(event) {
    const value = event.target.value;
    this.setState({
      email: event.target.value,
      validaEmail: !value
    });
  }

  onChangeCpfCnpj(event) {
    const value = event.target.value;
    const removedMask = value.replace(/\.|\-/g, "");

    this.setState({
      doc: event.target.value,
      validaDoc: !(this.validCpf(removedMask) || this.validCnpj(removedMask))
    });
  }

  onChangeTelefoneFixo(event) {
    const value = event.target.value;
    this.setState({
      telefoneFixo: event.target.value,
      validaTel: !(
        !!value && value.replace(/\+|\(|\)|\-/g, "").length === TEL_LENGTH
      )
    });
  }

  onChangeTelefoneCelular(event) {
    const value = event.target.value;
    this.setState({
      telefoneCelular: event.target.value,
      validaCel: !(
        !!value &&
        value
          .replace(/\+|\(|\)|\-/g, "")
          .split(" ")
          .join("").length === CEL_LENGTH
      )
    });
  }

  saveUser() {
    const {
      name,
      email,
      doc,
      telefoneFixo,
      telefoneCelular,
      obs,
      validaCel,
      validaDoc
    } = this.state;

    const acoesUsuario = this.handleFormSubmit();

    const saveData = {
      name,
      email,
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs,
      acoesUsuario
    };

    let canSave = true;

    if (!name.trim()) {
      alert('O campo "Nome do usuário" deve ser preenchido!');
      canSave = false;
    } else if (!email.trim()) {
      alert('O campo "E-mail do usuário" deve ser preenchido!');
      canSave = false;
    } else if (validaDoc) {
      alert('O campo "CPF\\CNPJ" deve ser preenchido corretamente!');
      canSave = false;
    } else if (validaCel) {
      alert('O campo "Telefone Celular" deve ser preenchido corretamente!');
      canSave = false;
    } else if (acoesUsuario.length === 0) {
      alert('O campo "Ações que se Propõe" deve ser preenchido!');
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

  handleFormSubmit = () => {
    return Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .map(acao => {
        let value;
        if ("Agasalho") {
          value = 3;
        } else if ("Cursos") {
          value = 4;
        } else if ("Higiene") {
          value = 2;
        } else if ("Refeição") {
          value = 1;
        }
        return value;
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
    this.deselectAll();
    this.setState({
      name: "",
      email: "",
      doc: "",
      telefoneFixo: "",
      telefoneCelular: "",
      obs: ""
    });
  }

  // Obrigado !
  // https://gist.github.com/roneigebert/10d788a07e2ffff88eb0f1931fb7bb49
  validCpf(cpf) {
    if (
      !cpf ||
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  // Obrigado !
  // https://gist.github.com/roneigebert/10d788a07e2ffff88eb0f1931fb7bb49
  validCnpj(cnpj) {
    var cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  validaEmail = text => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.validaEmail = false;
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
      this.validaEmail = true;
    }
  };

  render() {
    const {
      name,
      email,
      doc,
      telefoneFixo,
      telefoneCelular,
      obs,
      validaDoc,
      validaTel,
      validaCel,
      validaEmail
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
              error={validaEmail}
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
              inputRef={ref => {
                Object.assign($.prototype, Mask.prototype);
                $(ref).keydown(function() {
                  try {
                    $(ref).unmask();
                  } catch (e) {}

                  var tamanho = $(ref).val().length;

                  if (tamanho < 11) {
                    $(ref).mask("999.999.999-99");
                  } else {
                    $(ref).mask("99.999.999/9999-99");
                  }
                  var elem = this;
                  setTimeout(function() {
                    elem.selectionStart = elem.selectionEnd = 10000;
                  }, 0);
                  var currentValue = $(this).val();
                  $(this).val("");
                  $(this).val(currentValue);
                });
              }}
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
              labelText="Telefone Fixo ( (00) 0000-0000 ):"
              id="telefoneFixo"
              inputRef={ref => {
                Object.assign($.prototype, Mask.prototype);
                $(ref).keydown(function() {
                  try {
                    $(ref).unmask();
                  } catch (e) {}

                  var tamanho = $(ref).val().length;
                  $(ref).mask("(99)9999-9999");
                  var elem = this;
                  setTimeout(function() {
                    elem.selectionStart = elem.selectionEnd = 10000;
                  }, 0);
                  var currentValue = $(this).val();
                  $(this).val("");
                  $(this).val(currentValue);
                });
              }}
              formControlProps={{
                fullWidth: true
              }}
              error={validaTel}
              inputProps={{
                type: "telefoneFixo",
                value: telefoneFixo,
                onChange: this.onChangeTelefoneFixo
              }}
            />
          </GridItem>
          <GridItem xs={6} sm={6} md={6}>
            <CustomInput
              labelText="Telefone Celular ( (00) 0 0000-0000 ):"
              id="telefoneCelular"
              inputRef={ref => {
                Object.assign($.prototype, Mask.prototype);
                $(ref).keydown(function() {
                  try {
                    $(ref).unmask();
                  } catch (e) {}

                  var tamanho = $(ref).val().length;
                  $(ref).mask("(99) 9 9999-9999");
                  var elem = this;
                  setTimeout(function() {
                    elem.selectionStart = elem.selectionEnd = 10000;
                  }, 0);
                  var currentValue = $(this).val();
                  $(this).val("");
                  $(this).val(currentValue);
                });
              }}
              formControlProps={{
                fullWidth: true
              }}
              error={validaCel}
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
