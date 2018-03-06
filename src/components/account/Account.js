import React, { Component } from 'react';
import {Layout, Header, HeaderRow, Navigation, Icon, Textfield } from 'react-mdl';

import Popup from "../utils/Popup";

import "./account.css";

class Account extends Component{

    componentDidMount(){
        if(!("accounts" in localStorage)){
            localStorage['accounts'] = JSON.stringify({});
            this.addUser(localStorage['user'], localStorage['pass'])
        }
    }

    addUser = (regno, pass, name="") => {
        let accounts = JSON.parse(localStorage['accounts'])
        accounts[regno] = {
            regno: regno,
            pass: pass,
            name: name
        }
        localStorage['accounts'] = JSON.stringify(accounts);
    }

    openAddUserForm = () => {
        document.querySelector("#popup-trigger").click()
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
			        	
			        </div>
                    <Popup title="Add a new user" actionName="Add" body={this.AddUserForm} />
			    </Layout>
			</div>
		);
	}
}

export default Account;