import React, { Component } from 'react';
import {Card, CardText, Spinner, Icon} from 'react-mdl';

class Timestable extends Component{

	getCurrentDay = () => {
		let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
		let n = new Date().getDay();
		if(n > 0 && n < 6){
			return days[n-1];
		}
		return days[4];
	}

	getCurrentTimetable = () => this.props.data.payload[this.getCurrentDay()];

	validateData = () => {
		return (
			this.props.data.payload !== null 
			&& this.props.data.type === 1
			&& "friday" in this.props.data.payload
		);
	}

	TimetableData = () => {
		console.log("time", this.props.data);
		if(this.validateData()){
			let data = this.getCurrentTimetable();
			return (
				data.map((item, i) => {
					return (
						<Card shadow={0} className="card" key={i}>
						    <CardText className="card-contents">
						        <div className="card-title">{item}</div>
						        <div className="news-body">{"Hour: " + (i+1)}</div>
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
				<div>
					<Icon className="week-nav" name="keyboard_arrow_left" />
					<span className="week">{this.getCurrentDay()}</span>
					<Icon className="week-nav" name="keyboard_arrow_right" />
				</div>
				<this.TimetableData />
			</div>
		)
	}
}

export default Timestable;