import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import DatePicker from "components/Date/DatePicker.jsx";
import Select from "components/Select/Select";
import Map from "components/Map/Map.jsx";

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

class CadDoacao extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			directions:{
				routes: []
			},
			donatorName: '',
			donationDate: new Date(),
			selectedRoute: "",
			routes: []
		};

		this.saveDonation = this.saveDonation.bind(this);

		this.changeData = this.changeData.bind(this);
		this.changeRoute = this.changeRoute.bind(this);
		this.onChangeDonatorName = this.onChangeDonatorName.bind(this);
		this.setDirection = this.setDirection.bind(this);
	}

	componentDidMount() {
		this.findRoutes();
	}

	onChangeDonatorName (event) {
		this.setState({
			donatorName: event.target.value
		})
	}
	
	fecthRoutes() {
		const fetchData = {
			method: "GET"
		};
		return fetch('http://localhost:3001/rota/', fetchData).then((res) => res.json());
	}

	fetchRouteById(id) {
		const fetchData = {
			method: "POST",
			body: JSON.stringify({ routeId: id })
		};
		return fetch('http://localhost:3001/rota/findById', fetchData).then((res) => res.json());
	}

	findRoutes() {
		return this.fecthRoutes()
			.then(json => {
				this.setRoutes(json);
			});
	}

	findRouteById(id) {
		this.fetchRouteById(id).then(this.setDirection);
	}	

	setDirection({rota}) {
		const { google } = window;
		const waypoints = rota.points
							.map((point) => ({location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))}));

        if (!waypoints.length || waypoints.length < 2) {
            alert('Pontos insuficientes para calcular uma rota ! É preciso de no mínimo 2 !');
        } else {
            const waypointsAux = waypoints.slice(0);
			const origin = waypointsAux.shift();
			const destination = waypointsAux.pop();

            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route({
                origin: origin,
                destination: destination,
                waypoints: waypointsAux,
                travelMode: google.maps.TravelMode['WALKING'],
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result
                    });
                } else {
                    alert(`Erro ao buscar rota : ${result}`);
                }
            });
		}
	}

	setRoutes({rotas}) {
		this.setState({
			routes: rotas
		});
	}

	changeRoute(route) {
		this.findRouteById(route.id);
		this.setState({
			selectedRoute: route
		});
	}

	saveDonation() {
		const { donatorName, donationDate, selectedRoute } =  this.state;

		const doacao = {
			doador: donatorName,
			data: donationDate,
			rota: selectedRoute.id
		};
		
		if(!doacao.doador.trim()) {
			this.setState({ donatorName: '' });
			alert("Nome do doador não é válido ! ");
		} else if(!(doacao.data) || (moment(this.state.dataDoacao).isBefore(moment(), 'day')) ) {
			this.setState({ donationDate: "", selectedRoute: '' });
			alert("A data escolhida para a doação não é válida !");
		} else if(!doacao.rota) {
			alert("É preciso que uma rota seja selecionada !");
		} else {
			fetch('http://localhost:3001/doacao/add',
				{
					method: "POST",
					body: JSON.stringify(doacao)
				}
			).then(res => res.json())
			.then(json => {
				alert(json.message);
			}).catch(error => {
				alert("Erro ao enviar cadastro de agendamento");
			});
		}
	};

	changeData(date) {
		let actualDate = moment(date, 'DD/MM/YYYY');

		this.setState({
			donationDate: date 
		});

		this.fecthRoutes(date).then((json) => {
			const { rotas } = json;
			const canAutoSetRoute = rotas.length > 0;

			const selectedRoute = canAutoSetRoute ? rotas[0] : {};
			
			if(!canAutoSetRoute) {
				alert("Não há rotas disponíveis para esta data !");	
			}

			this.setState({
				donationDate: new Date(actualDate),
				routes: rotas,
				selectedRoute: selectedRoute
			});
		});
	}

	render() {
		const { donatorName, donationDate, routes, selectedRoute, directions } = this.state;

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
									inputProps= {{
										value: donatorName,
										onChange: this.onChangeDonatorName
									}}
								/>
							</GridItem>
							<GridItem xs={12} sm={12} md={3}>
								<DatePicker selected={donationDate}
									onChange={this.changeData} />
							</GridItem>
							<GridItem xs={12} sm={12} md={3}>
								<Select options={routes}
									value={selectedRoute}
									onChange={this.changeRoute}
									placeholder={"Selecione :"}
									noOptionsMessage={ "Não há rotas disponíveis !" } />
							</GridItem>
						</GridContainer>
					</GridItem>
					<GridItem xs={12} sm={12} md={12}>
						<Map directions={directions} />
					</GridItem>
					<GridItem xs={4} sm={4} md={4}></GridItem>
					<GridItem xs={4} sm={4} md={4}>
						<Button color="primary" onClick={this.saveDonation}>Cadastrar Doação</Button>
					</GridItem>
					<GridItem xs={4} sm={4} md={4}></GridItem>
				</GridContainer>
			</div>
		);
	};
}

export default (withStyles(styles)(CadDoacao));