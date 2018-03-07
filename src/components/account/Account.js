import React, { Component } from 'react';
import axios from 'axios';
import {Layout, Header, HeaderRow, Navigation, 
        Icon, Textfield, Card, CardText, Snackbar } from 'react-mdl';

import Popup from "../utils/Popup";

import "./account.css";

class Account extends Component{

    constructor(props) {
		super(props);
		this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
		this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
		this.state = { 
            isSnackbarActive: false,
            flag: 0
        };
	}

    componentDidMount(){
        if(!("accounts" in localStorage)){
            localStorage['accounts'] = JSON.stringify({});
            this.addUser(localStorage['user'], localStorage['pass'])
        }
    }

    addUser = (regno, pass, name="") => {
        let accounts = JSON.parse(localStorage['accounts'])
        accounts[regno.toLowerCase()] = {
            regno: regno,
            pass: pass,
            name: name
        }
        localStorage['accounts'] = JSON.stringify(accounts);
    }

    getAccounts = () => JSON.parse(localStorage['accounts']);

    openAddUserForm = () => {
        document.querySelector("#popup-trigger").click()
    }

    handleFormSubmit = () => {

        let thisObj = this;
        let name = document.querySelector("#add-name").value;
        let regno = document.querySelector("#add-regno").value;
        let pass = document.querySelector("#add-pass").value;

        // document.querySelector("#add-name").value = "";
        // document.querySelector("#add-regno").value = "";
        // document.querySelector("#add-pass").value = "";

        if(regno !== "" && pass !== "" && name !== ""){
			axios.get(
				'https://hashbird.com/gogrit.in/workspace/srm-api/get-info.php?' 
				+ 'regno=' + regno +'&pass=' + pass)
		        .then(function (response) {
					if(!response.data.error && !(typeof response.data === "string")){
						thisObj.addUser(regno, pass, name);
                        thisObj.setState({flag: (thisObj.state.flag + 1)})
                        console.log("Good creds", response.data)
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
            document.querySelector("#popup-close").click()
		}else{
			this.setState({toastMessage: "Please enter all the details"});
			this.handleShowSnackbar();
		}
    }

    AddUserForm = () => {
        return(
            <div>
                <Textfield id="add-name" label="Name" floatingLabel />
                <Textfield id="add-regno" label="Regno" floatingLabel />
                <Textfield id="add-pass" type="password" label="password" floatingLabel />
            </div>
        )
    }

    AccountCards = () => {
        let accounts = [];
        for(var regno in this.getAccounts()){
            accounts.push(this.getAccounts()[regno])
        }

        return(
            accounts.map((acc, i) => {
                
                return(
                    <Card shadow={3} className="card-account" key={i}>
                        <CardText className="card-text-account">
                            <h5>{acc.name === "" ? acc.regno.toUpperCase():acc.name}</h5>
                        </CardText>
                    </Card>
                )
            })
        )
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
			        <Header className="header login-header" >
			        	<HeaderRow title={
                        <span>
                            <a href="/"><Icon name="arrow_back" style={{color: "#fff"}}/></a>
                            <span className="account-header">Instify - Accounts</span>
                        </span>
                        }>
                            <Navigation>
                                <Icon name="add" onClick={() => {this.openAddUserForm()}}/>
                            </Navigation>
                        </HeaderRow>
			        </Header>
			        <div className="activity">
			        	<this.AccountCards />
                        <Card shadow={3} className="card-account">
						    <CardText className="card-text-account">
						        <h5>Guest (coming soon)</h5>
						    </CardText>
						</Card>
                        <Card shadow={3} className="card-account" 
                        onClick={() => this.openAddUserForm()}>
						    <CardText className="card-text-account">
						        <h5 style={{color: "#e45d86"}}>Add new user</h5>
						    </CardText>
						</Card>
			        </div>
                    <Popup title="Add a new user" 
                        action={{name: "add", perform: this.handleFormSubmit}} 
                        body={this.AddUserForm} />
                    <Snackbar
                    active={this.state.isSnackbarActive}
                    onTimeout={this.handleTimeoutSnackbar}>{this.state.toastMessage}</Snackbar>
			    </Layout>
			</div>
		);
	}
}

export default Account;