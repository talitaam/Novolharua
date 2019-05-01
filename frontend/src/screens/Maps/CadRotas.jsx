import React from "react";

import Direction from "components/Direction/Direction.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Select from "components/Select/Select.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput";

const modesOfTraveling = [
  {
    label: "Driving",
    value: "DRIVING"
  },
  {
    label: "Walking",
    value: "WALKING"
  },
  {
    label: "Bicycling",
    value: "BICYCLING"
  },
  {
    label: "Transit",
    value: "TRANSIT"
  }
];

const CadRotas = () => (
  <div>
    <GridContainer justify="center" alignItems="baseline">
      <GridItem xs={12} sm={12} md={8}>
        <CustomInput
          labelText="Nome da rota:"
          id="float"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Número de pessoas atendidas:"
          id="float"
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Select
          options={modesOfTraveling}
          value={modesOfTraveling[0]}
          onChange={() => {}}
          placeholder={"Selecione :"}
          noOptionsMessage={"Não há rotas disponíveis !"}
        />
        <Button color="danger">Limpar Marcadores</Button>
        <Button color="success">Salvar</Button>
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Direction />
      </GridItem>
    </GridContainer>
  </div>
);

export default CadRotas;

        this.cadastrarRota = this.cadastrarRota.bind(this);
        this.buscarRotas = this.buscarRotas.bind(this);
        this.changeRoute = this.changeRoute.bind(this);
        this.renderMap = this.renderMap.bind(this);
    }

    componentDidMount() {
        // this.buscarRotas();
    }

    fetchRotas(date) {
        date = date || moment();

        return fetch('http://localhost:3001/rota/', {
            method: "POST",
            body: JSON.stringify({ 'data': moment(date).format('YYYY-MM-DD') })
        }).then((res) => res.json());
    }

    buscarRotas() {
        this.fetchRotas()
            .then(json => {
                const rotas = Object.values(json.rotas);
                this.setState({
                    rotas: rotas,
                    rota: rotas.length > 0 ? rotas[0] : "",
                    map: rotas.filter(map => map.id === rotas[0].id)
                });
            });
    }

    cadastrarRota() {
        const doacao = {
            rota: this.state.rota.id
        };
        let canSave = true;

        if (!doacao.rota) {
            alert("É preciso que uma rota seja selecionada!");
            canSave = false;
        }

        if (canSave) {
            fetch('http://localhost:3001/doacao/add',
                {
                    method: "POST",
                    body: JSON.stringify(doacao)
                }
            ).then(res => res.json())
                .then(json => {
                    console.log(json);
                    alert(json.message);
                }).catch(error => {
                    alert("Erro ao enviar cadastro de rota");
                });
        }
    };

    changeRoute(rota) {
        const maps = mapsPlaces.filter(map => map.id === rota.value);
        this.setState({
            map: maps,
            rota: rota
        });
    }

    renderMap(mapData) {
        return (
            <Map
                key={mapData.id}
                defaultBounds={mapData.defaultBounds}
                defaultUrl={mapData.defaultUrl}
                defaultZoom={mapData.defaultZoom}
                defaultCenter={mapData.defaultCenter}
            />
        );
    }

    render() {
        const modesOfTraveling = [
            {
                label: "Driving",
                value: "DRIVING"
            },
            {
                label: "Walking",
                value: "WALKING"
            },
            {
                label: "Bicycling",
                value: "BICYCLING"
            },
            {
                label: "Transit",
                value: "TRANSIT"
            }
        ];
        
        return (
            <div>
    <GridContainer justify="center" alignItems="baseline">
      <GridItem xs={12} sm={12} md={8}>
        <CustomInput
          labelText="Nome da rota:"
          id="float"
          formControlProps={{
            fullWidth: true
          }}
        />
        <CustomInput
          labelText="Número de pessoas atendidas:"
          id="float"
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Select
          options={modesOfTraveling}
          value={modesOfTraveling[0]}
          onChange={() => {}}
          placeholder={"Selecione :"}
          noOptionsMessage={"Não há rotas disponíveis !"}
        />
        <Button color="danger">Limpar Marcadores</Button>
        <Button color="success">Salvar</Button>
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Direction />
      </GridItem>
    </GridContainer>
  </div>
        );
    }
}


export default (withStyles(styles)(CadRotas));
