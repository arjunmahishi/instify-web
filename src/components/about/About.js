import React, { Component } from 'react';
import {Layout, Header, Card, CardText, Icon } from 'react-mdl';

import "./about.css";

class About extends Component{
	render(){
		return(
			<div>
				<Layout fixedHeader>
			        <Header className="header login-header" >
			        	<a href="/"><Icon name="arrow_back" style={{color: "#fff"}}/></a> 
			        	<div className="header-title">Instify - About</div>
			        </Header>
			        <div className="activity">
			        	<Card shadow={3} className="card-about">
						    <CardText className="card-contents">
						        <p>Developer: <a href="https://arjunmahishi.github.io/">Arjun Mahishi</a></p>
					        	<p>
						        	Instify is an application that lets students keep track 
						        	of their attendance, timetable, marks and much more.
					        	</p>
					        	<p>
					        		If you are interested in contributing to this project, write me an email 
					        		at arjun.mahishi@gmail.com
					        	</p>
						    </CardText>
						</Card>
			        </div>
			    </Layout>
			</div>
		);
	}
}

export default About;