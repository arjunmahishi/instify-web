import React, { Component } from 'react';
import { Card, CardText, Spinner } from 'react-mdl';

class Univ extends Component{

	UnivData = () => {
		if(this.props.data !== null){
			return (
				this.props.data.newsItems.map((item, i) => {
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

	render(){
		return(
			<div className="activity">
				<this.UnivData />
			</div>
		)
	}
}

export default Univ;