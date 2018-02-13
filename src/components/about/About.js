import React, { Component } from 'react';
import {Layout, Header} from 'react-mdl';

class About extends Component{
	render(){
		return(
			<div>
				<Layout fixedHeader>
			        <Header className="header login-header" title={"Instify - About"}></Header>
			        <div className="activity login">
			        </div>
			    </Layout>
			</div>
		);
	}
}

export default About;