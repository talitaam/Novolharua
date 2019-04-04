import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Maps from "screens/Maps/Maps.jsx";
import DatePicker from "components/Date/DatePicker.jsx";
import Select from "components/Inputs/Select.jsx";

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

let options = [
  { value: 'praca_liberdade', label: 'Praça da Liberdade' }
];

function CadDoacao(props) {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Doador :"
                id="nmDoador"
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <DatePicker />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <Select options={options} />
            </GridItem>
          </GridContainer> 
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Maps />
        </GridItem>
        <Button color="primary">Cadastrar Doação</Button> 
      </GridContainer>
    </div>
  );
}

export default withStyles(styles)(CadDoacao);