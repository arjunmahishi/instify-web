import React, { Component } from 'react';
import axios from 'axios';
import SwipeReact from 'swipe-react';
import './App.css';

import { Layout, Header, HeaderRow, HeaderTabs, Tab, Drawer, Content, Icon, Navigation } from 'react-mdl';

import Attendance from './Attendance';
import Timetable from './Timetable';
import Univ from './Univ';

class App extends Component {

  constructor(props){
    super(props)
    this.state = { 
      activeTab: 0,
      ActiveComponent: Attendance,
      activeData: null,
      attendanceData: null,
      univData: null,
      timetableData: null
    };

  }

  componentWillMount(){

    const thisObj = this;

    if("user" in localStorage){

      axios.get(`https://hashbird.com/gogrit.in/workspace/srm-api/get-attd.php?regno=${localStorage["user"]}&pass=${localStorage["pass"]}`)
        .then(function (response) {
          thisObj.setState({attendanceData: response.data, activeData: response.data});
        })
        .catch(function (error) {
          console.log(error);
        });

      axios.get(`https://hashbird.com/gogrit.in/workspace/srm-api/get-ptt.php?regno=${localStorage["user"]}&pass=${localStorage["pass"]}`)
          .then(function (response) {
            thisObj.setState({timetableData: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });

      axios.get('https://hashbird.com/gogrit.in/workspace/srm-api/univ-news.php')
          .then(function (response) {
            thisObj.setState({univData: response.data});
          })
          .catch(function (error) {
            console.log(error);
          });
    }else{
      window.location = "/login";
    }

  }

  handleTabChange = (tabId) => {
    let activeComponent = "", activeData = "";
    switch(tabId){
      case 0: activeComponent = Attendance; activeData = this.state.attendanceData; break;
      case 1: activeComponent = Timetable; activeData =  this.state.timetableData; break;
      case 2: activeComponent = Univ; activeData = this.state.univData; break;
      default: activeComponent = Attendance; activeData = this.state.attendanceData; break;
    }

    this.setState({ActiveComponent: activeComponent, activeData: activeData});
  }

  handleLogout(){
    delete localStorage.user;
    delete localStorage.pass;
    window.location = "/login";
  }

  render() {
    return (
      <div className="App">
        <Layout fixedHeader fixedTabs>
          <Header className="header">
              <HeaderRow title="Instify(beta)">
                 <Navigation>
                    <Icon className="logout-icon" onClick={() => this.handleLogout()} name="exit_to_app" />
                </Navigation>
              </HeaderRow>
              <HeaderTabs className="tabs" ripple activeTab={this.state.activeTab} 
              onChange={(tabId) => this.handleTabChange(tabId)}>
                  <Tab><Icon name="assessment" /></Tab>
                  <Tab><Icon name="schedule" /></Tab>
                  <Tab><Icon name="account_balance" /></Tab>
              </HeaderTabs>
          </Header>
          <Drawer title="Instify">
            <Navigation className="drawer">
              <a href="/about">
                <Icon className="drawer-icon" name="info" />
                <div className="drawer-item">About</div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.instify.android&hl=en">
                <Icon className="drawer-icon" name="android" />
                <div className="drawer-item">Get the android app</div>
              </a>
              <p style={{position: "absolute", bottom: 0}}>Other features coming soon</p>
            </Navigation>
          </Drawer>
          <Content>
              <this.state.ActiveComponent data={this.state.activeData}/>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
