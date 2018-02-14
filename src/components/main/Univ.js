import React, { Component } from 'react';
import { Card, CardText, Spinner } from 'react-mdl';

class Univ extends Component{

	UnivData = () => {
		console.log("univ", this.props.data);
		if(this.validateData()){
			return (
				this.props.data.payload.newsItems.map((item, i) => {
					return (
						<Card shadow={0} className="card" key={i}>
						    <CardText className="card-contents">
						        <div className="news-title"><a href={item.link}>{item.title}</a></div>
						        <div className="news-body">{item.snip}</div>
						    </CardText>
						</Card>
					)
				})
			)
		}
		return <Spinner />;
	}

	validateData = () => {
		return (
			this.props.data.payload !== null 
			&& this.props.data.type === 2
			&& "newsItems" in this.props.data.payload
		);
	}

	render(){
		return(
			<div className="activity">
				<this.UnivData />
			</div>
		)
	}
}

export default Univ;