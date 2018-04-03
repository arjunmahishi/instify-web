import React, { Component } from 'react';
import {Card, CardText, Spinner, Icon, Grid, Cell} from 'react-mdl';

class Timestable extends Component{

	constructor(props){
		super(props);
		this.state = {
			day: this.getCurrentDay()
		}
	}

	days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
	timings = ["8:00 - 8:45", "8:50 - 9:40", "9:50 - 10:40", "10:40 - 11:30", 
		"12:20 - 1:10", "1:10 - 2:00", "2:00 - 2:50", "2:50 - 3:40"];

	getCurrentDay = () => {
		let n = new Date().getDay();
		if(n > 0 && n < 6){
			return this.days[n-1];
		}
		return this.days[4];
	}

	scrollDays = (direction) => {
		let i = this.days.indexOf(this.state.day);
		if(direction === "right"){
			if(i+1 < 5) this.setState({day: this.days[i+1]})
			else this.setState({day: this.days[0]})
		}else{
			if(i-1 > -1) this.setState({day: this.days[i-1]})
			else this.setState({day: this.days[4]})
		}
	}

	getCurrentTimetable = () => this.props.data.payload[this.state.day];

	validateData = () => {
		return (
			this.props.data.payload !== null 
			&& this.props.data.type === 1
			&& "friday" in this.props.data.payload
		);
	}

	TimetableData = () => {
		// console.log("time", this.props.data);
		if(this.validateData()){
			let data = this.getCurrentTimetable();
			return (
				data.map((item, i) => {
					return (
						<Card shadow={0} className="card" key={i}>
						    <CardText className="card-contents">
								<div className="news-body">
									<div style={{float: "left"}}>
										{"Hour: " + (i+1)}
									</div>
									<div style={{float: "right"}}>
										{"Timings: " + this.timings[i]}
									</div><br /><br />
								</div>
						        <div className="card-title">{item}</div>
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
				<Grid>
					<Cell col={1} offsetDesktop={4} offsetTablet={2}>
						<Icon onClick={() => this.scrollDays("left")} 
						className="week-nav week-nav-left" name="keyboard_arrow_left" />
					</Cell>
					<Cell col={2} className="week">{this.state.day}</Cell>
					<Cell col={1}>
						<Icon onClick={() => this.scrollDays("right")} 
						className="week-nav week-nav-right" name="keyboard_arrow_right" />
					</Cell>
				</Grid>
				<div className="timetable-list">
					<this.TimetableData />
				</div>
			</div>
		)
	}
}

export default Timestable;