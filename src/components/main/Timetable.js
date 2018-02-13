import React, { Component } from 'react';
import {Card, CardText, Spinner} from 'react-mdl';

class Timestable extends Component{

	getCurrentDay = () => {
		let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
		let n = new Date().getDay();
		if(n > 0 && n < 6){
			return days[n-1];
		}
		return days[4];
	}

	getCurrentTimetable = () => this.props.data[this.getCurrentDay()];

	TimetableData = () => {
		if(this.props.data !== null){
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
				<this.TimetableData />
			</div>
		)
	}
}

export default Timestable;