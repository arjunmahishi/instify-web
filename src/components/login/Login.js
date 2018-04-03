import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Header, Textfield, Button, Snackbar } from 'react-mdl';

import './login.css';

class Login extends Component{

	constructor(props) {
		super(props);
		this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
		this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
		this.state = { isSnackbarActive: false };
		this.HOST_NAME = "https://fnplus.xyz/srm-api";
	}

	componentWillMount(){
		if("user" in localStorage){
			window.location = "/";
		}
	}

	login = () => {
		let regno = document.querySelector("#regno").value;
		let pass = document.querySelector("#pass").value;
		let thisObj = this;
		if(regno !== "" && pass !== ""){
			axios.get(`${this.HOST_NAME}/get-info.php?regno=${regno}&pass=${pass}`)
		        .then(function (response) {
					if(!response.data.error && !(typeof response.data === "string")){
						localStorage['user'] = regno;
						localStorage['pass'] = pass;
						window.location = "/";
					}else{
						console.log("Wrong credentials");
						thisObj.setState({toastMessage: "Wrong credentials"});
						thisObj.handleShowSnackbar();
					}
		        })
		        .catch(function (error) {
					console.log(error);
					this.setState({toastMessage: error});
					this.handleShowSnackbar();
		        });
		}else{
			this.setState({toastMessage: "Please enter your credentials"});
			this.handleShowSnackbar();
		}
	}

	handleKeyPress = (key) => {
		if(key === "Enter") this.login();
	}

	handleShowSnackbar() {
		this.setState({ isSnackbarActive: true });
	}

	handleTimeoutSnackbar() {
		this.setState({ isSnackbarActive: false });
	}

	render(){
		return(
			<div>
				<Layout fixedHeader>
			        <Header className="header login-header" title={"Instify - Login"}></Header>
			        <div className="activity login">
			        	<Textfield onKeyPress={(keyPressed) => this.handleKeyPress(keyPressed.key)} 
			        	id="regno" label="Regno" floatingLabel style={{width: '300px'}}/><br />
			        	<Textfield onKeyPress={(keyPressed) => this.handleKeyPress(keyPressed.key)} 
			        	id="pass" type="password" label="Password" floatingLabel 
			        	style={{width: '300px'}}/><br />
			        	<Button onClick={this.login} raised accent ripple>Login</Button>
			        </div>
			        <div>
						<Snackbar
						active={this.state.isSnackbarActive}
						onTimeout={this.handleTimeoutSnackbar}>{this.state.toastMessage}</Snackbar>
					</div>
			    </Layout>
			</div>
		)
	}
}

export default Login;