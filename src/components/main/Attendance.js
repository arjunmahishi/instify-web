import React, { Component } from 'react';
import { Card, CardText, Spinner } from 'react-mdl';

class Attendance extends Component{

	constructor(props){
		super(props);
		this.state = {
			dataFetched: false
		}
	}

	getColor = (n) => {
		if(n > 89) return "#4caf50";
		if(n < 76) return "#ef3a3a";
		return "#757575";
	}

	AttendanceData = () => {
		if(this.props.data !== null){
			return (
				this.props.data.subjects.map((sub, i) => {
					return (
						<Card shadow={0} className="card" key={i}>
						    <CardText className="card-contents">
						        <div className="card-title">{this.props.data[sub]["sub-desc"]}</div>
						        <div className="card-body" style={{color: this.getColor(this.props.data[sub]["avg-attd"])}}>
							        {this.props.data[sub]["avg-attd"] + "%"}
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
			</div>
		)
	}
}

export default Attendance;