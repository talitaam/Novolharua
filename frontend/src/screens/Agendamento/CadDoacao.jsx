import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import DatePicker from "components/Date/DatePicker.jsx";
import Select from "components/Inputs/Select";
import Map from "components/Maps/Map.jsx";

import $ from "jquery";
import moment from "moment";

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

const mapsPlaces = [
	{
		id: 'praca_liberdade',
		defaultBounds: {
			north: -19.929512,
			south: -19.933168,
			east: -43.933712,
			west: -43.940968
		},
		defaultUrl: "https://i.ibb.co/xmL7qjT/Rota-Pra-a-da-Liberdade.jpg",
		defaultZoom: 17.3,
		defaultCenter: { lat: -19.93134, lng: -43.93734 }
	},
	{
		id: "praca_savassi",
		defaultZoom: 17.3,
		defaultBounds: {
			north: -19.936686,
			south: -19.939718,
			east: -43.933951,
			west: -43.939428
		},
		defaultCenter: { lat: -19.938202, lng: -43.9366895 },
		defaultUrl: "https://i.ibb.co/FgRtynK/Rota-Praca-Savassi.jpg"
	},
	{
		id: "area_hospitalar",
		defaultZoom: 17.3,
		defaultBounds: {
			north: -19.922602,
			south: -19.926201,
			east: -43.923093,
			west: -43.929062
		},
		defaultCenter: { lat: -19.9244015, lng: -43.9260775 },
		defaultUrl: "https://i.ibb.co/F4GzSn5/Rota-Area-Hospitalar.jpg"
	}
];

class CadDoacao extends React.Component {
	constructor() {
		super();
		this.message = "Doação agendada com sucesso!";

		this.state = {
			nomeDoador: {},
			dataDoacao: new Date(),
			rota: "",
			rotas: [],
			image: '',
			map: []
		};

		this.cadastrarDoacao = this.cadastrarDoacao.bind(this);
		this.buscarRotas = this.buscarRotas.bind(this);
		this.changeData = this.changeData.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.renderMap = this.renderMap.bind(this);
	}

	componentDidMount() {
		this.buscarRotas();
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
					map: rotas.filter(map => map.id === rotas[0].id )
				});
			});
	}

	cadastrarDoacao() {
		const doacao = {
			doador: $('#nmDoador').val(),
			data: this.state.dataDoacao,
			rota: this.state.rota.id
		};
		let canSave = true;

		if(!doacao.doador.trim()) {
			$('#nmDoador').val('');
			alert("Nome do doador não é válido ! ");
			canSave = false;
		} else if(!(doacao.data) || (moment(this.state.dataDoacao).isBefore(moment(), 'day')) ) {
			this.setState({
				dataDoacao: "",
				rota: ''
			});
			alert("A data escolhida para a doação não é válida !");
			canSave = false;
		} else if(!doacao.rota ) {
			alert("É preciso que uma rota seja selecionada !");
			canSave = false;
		}

		if(canSave) {
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
				alert("Erro ao enviar cadastro de agendamento");
			});
		}
	};

	changeData(date) {
		let actualDate = moment(date, 'DD/MM/YYYY');

		this.fetchRotas(date).then((json) => {
			const rotas = json.rotas;
			const canAutoSetRoute = rotas.length > 0;

			let rota,
				maps;

			if (canAutoSetRoute) {
				rota = rotas[0];
				maps = mapsPlaces.filter(map => map.id === rotas[0].value);
			} else {
				rota = "";
				maps = [];
				alert("Não há rotas disponíveis para esta data !");	
			}

			this.setState({
				dataDoacao: new Date(actualDate),
				rotas: json.rotas,
				rota: rota,
				map: maps
			});
		});
	}

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
		return (
			<div>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<GridContainer>
							<GridItem xs={12} sm={12} md={6}>
								<CustomInput
									labelText="Doador :"
									id="nmDoador"
									inputProps={this.state.nomeDoador}
									formControlProps={{
										fullWidth: true
									}}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={3}>
								<DatePicker selected={this.state.dataDoacao}
									onChange={this.changeData} />
							</GridItem>
							<GridItem xs={12} sm={12} md={3}>
								<Select options={this.state.rotas}
									value={this.state.rota}
									onChange={this.changeRoute}
									placeholder={"Selecione :"}
									noOptionsMessage={() => "Não há rotas disponíveis !"} />
							</GridItem>
						</GridContainer>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
						{this.state.map.map((mapObject, index) => this.renderMap(mapObject, index))}
					</GridItem>
					<GridItem xs={4} sm={4} md={4}></GridItem>
					<GridItem xs={4} sm={4} md={4}>
						<Button color="primary" onClick={this.cadastrarDoacao} children={{}}>Cadastrar Doação</Button>
					</GridItem>
					<GridItem xs={4} sm={4} md={4}></GridItem>
				</GridContainer>
			</div>
		);
	};
}

export default (withStyles(styles)(CadDoacao));