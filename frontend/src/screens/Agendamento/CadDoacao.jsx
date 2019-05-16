import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import DatePicker from "components/Date/DatePicker.jsx";
import Select from "components/Select/Select";
import Map from "components/Map/Map.jsx";

import DirectionsHelper from "components/Map/DirectionsHelper";

import moment from "moment";

import DoacoesService from "./DoacoesService";
import RotasService from "../Rotas/RotasService";

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
		RotasService.findAvaiableRoutesByDate(moment().format('DD/MM/YYYY')).then(json => {
			this.setRoutes(json);
		});
	}

	onChangeDonatorName (event) {
		this.setState({
			donatorName: event.target.value
		})
	}

	setDirection({rota}) {
		const { google } = window;

		if(rota && rota.points) {
			const waypoints = rota.points
							.map((point) => ({location: new google.maps.LatLng(parseFloat(point.lat), parseFloat(point.lng))}));
			DirectionsHelper.getRouteAPI(waypoints, result => this.setState({ directions: result }) );
		}
	}

	setRoutes({rotas}) {
		this.setState({
			routes: rotas
		});
	}

	changeRoute(route) {
		RotasService.findRouteById(route.id).then(this.setDirection);
		this.setState({
			selectedRoute: route
		});
	}

	saveDonation() {
		const { donatorName, donationDate, selectedRoute } =  this.state;		
		
		if(!donatorName.trim()) {
			this.setState({ 
				donatorName: '' 
			});
			alert("Nome do doador não é válido ! ");
		} else if((!donationDate) || (moment(donationDate).isBefore(moment(), 'day')) ) {
			this.setState({ 
				donationDate: "", 
				selectedRoute: '' 
			});
			alert("A data escolhida para a doação não é válida !");
		} else if(!selectedRoute  && !selectedRoute.length) {
			alert("É preciso que uma rota seja selecionada !");
		} else {
			DoacoesService.saveDonation({
				donatorName: donatorName,
				donationDate: donationDate,
				selectedRoute: selectedRoute
			}).then((response) => {
				this.setState({
					directions:{
						routes: []
					},
					donatorName: '',
					donationDate: new Date(),
					selectedRoute: "",
					routes: []
				});		
			});
		}
	};

	changeData(date) {
		let actualDate = moment(date, 'DD/MM/YYYY');

		this.setState({
			donationDate: date 
		});
		
		RotasService.findAvaiableRoutesByDate(actualDate.format('DD/MM/YYYY')).then((json) => {
			const { rotas } = json;
			const canAutoSetRoute = rotas.length > 0;

			const selectedRoute = canAutoSetRoute ? rotas[0] : {};
			
			if(!canAutoSetRoute) {
				alert("Não há rotas disponíveis para esta data !");	
				this.setState({
					directions:{
						routes: []
					},
					donationDate: new Date(),
					selectedRoute: "",
					routes: []
				});
				
			} else {
				this.setState({
					donationDate: new Date(actualDate),
					routes: rotas,
					selectedRoute: selectedRoute
				});
				
				RotasService.findRouteById(rotas[0].id).then(this.setDirection);
			}
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