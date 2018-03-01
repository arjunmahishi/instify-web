import React, { Component } from 'react';
import { Card, CardText, Spinner, List, ListItem, Snackbar } from 'react-mdl';

class Attendance extends Component{

	constructor(props){
		super(props);
		this.state = {
			dataFetched: false,
			openCard: null
		}

		this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
		this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
		this.state = { isSnackbarActive: false };
	}

	componentDidMount(){
		if(!("snackbarShown" in sessionStorage)){
			this.handleShowSnackbar();
			sessionStorage['snackbarShown'] = true;
		}
	}

	getColor = (n) => {
		if(n > 89) return "#4caf50";
		if(n < 76) return "#ef3a3a";
		return "#757575";
	}

	validateData = () => {
		return (
			this.props.data.payload !== null 
			&& this.props.data.type === 0
			&& "subjects" in this.props.data.payload
		);
	}

	getRequired = (sub) => {
		let m = this.props.data.payload[sub]["attd-hrs"];
		let total = this.props.data.payload[sub]["max-hrs"];

		if((m/total)*100 >= 75) return 0;
		let i = 1;
		while(true){
			if(((m+i)/(total+i))*100 >= 75) return i;
			i++;
		}
	}

	getBunkable = (sub) => {
		let m = this.props.data.payload[sub]["attd-hrs"];
		let total = this.props.data.payload[sub]["max-hrs"];

		if((m/total)*100 <= 75) return 0;
		let i = 1;
		while(true){
			if((m/(total+i))*100 === 75) return i;
			if((m/(total+i))*100 < 75) return i-1;
			i++;
		}
	}

	extraInfoHandler = (i) => {
		let cardExtra = document.querySelector(`#card-extra-${i}`);
		if(cardExtra.style.display === "none" || cardExtra.style.display === ""){
			cardExtra.style.display = "block";
		}else{
			cardExtra.style.display = "none";
		}
	}

	handleShowSnackbar() {
		this.setState({ isSnackbarActive: true });
	}

	handleTimeoutSnackbar() {
		this.setState({ isSnackbarActive: false });
	}

	AttendanceData = () => {
		// console.log("attd", this.props.data);
		if(this.validateData()){
			return (
				this.props.data.payload.subjects.map((sub, i) => {
					return (
						<Card onClick={() => this.extraInfoHandler(i)} shadow={0} className="card" key={i}>
						    <CardText style={{
						        	color: this.getColor(this.props.data.payload[sub]["avg-attd"])
						        }} className="card-contents">
						        <div className="card-title">{this.props.data.payload[sub]["sub-desc"]}</div>
						        <div className="card-body" style={{
						        	color: this.getColor(this.props.data.payload[sub]["avg-attd"])
						        }}>
							        {this.props.data.payload[sub]["avg-attd"] + "%"}
						        </div>
						        <div className="card-extra" id={"card-extra-" + i}>
						        	<List>
										<ListItem>Maximum hours: 
											{this.props.data.payload[sub]["max-hrs"]}
										</ListItem>
										<ListItem>Attended hours: 
											{this.props.data.payload[sub]["attd-hrs"]}
										</ListItem>
										<ListItem>Absent hours: 
											{this.props.data.payload[sub]["abs-hrs"]}
										</ListItem>
										<ListItem>OD/ML: 
											{this.props.data.payload[sub]["od-hrs"]}
										</ListItem>
										<ListItem>Minimum hours to attend: 
											{this.getRequired(sub)}
										</ListItem>
										<ListItem>Bunkable hours: 
											{this.getBunkable(sub)}
										</ListItem>
									</List>
						        </div>
						    </CardText>
						</Card>
					)
				})
			)
		}
		return <Spinner />;
	}

	render(){
		return(
			<div className="activity">
				<this.AttendanceData />
				<Snackbar
				active={this.state.isSnackbarActive}
				onTimeout={this.handleTimeoutSnackbar}>Tap on the cards for more info</Snackbar>
			</div>
		)
	}
}

export default Attendance;