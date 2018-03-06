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

    SwipeReact.config({
      left: () => {
        let newTab = this.whichComponent("right");
        this.setState({
          activeTab: newTab
        });
        this.handleTabChange(newTab);
      },
      right: () => {
        let newTab = this.whichComponent("left");
        this.setState({
          activeTab: newTab
        });
        this.handleTabChange(newTab);
      } 
    });

  }

  componentDidMount(){

    const thisObj = this;

    if("user" in localStorage){

      // Cache first //
      if("univ" in localStorage){
        this.setState({
          attendanceData: this.getCachedData("attendance"), 
          activeData: this.getCachedData("attendance")
        });
        this.setState({timetableData: this.getCachedData("timetable")});
        this.setState({univData: this.getCachedData("univ")});
      }
      ///////////////////

      axios.get(`https://hashbird.com/gogrit.in/workspace/srm-api/get-attd.php?regno=${localStorage["user"]}&pass=${localStorage["pass"]}`)
        .then(function (response) {
          thisObj.setState({attendanceData: response.data, activeData: response.data});
          thisObj.cacheData("attendance", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios.get(`https://hashbird.com/gogrit.in/workspace/srm-api/get-ptt.php?regno=${localStorage["user"]}&pass=${localStorage["pass"]}`)
          .then(function (response) {
            thisObj.setState({timetableData: response.data});
            thisObj.cacheData("timetable", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

      axios.get('https://hashbird.com/gogrit.in/workspace/srm-api/univ-news.php')
          .then(function (response) {
            thisObj.setState({univData: response.data});
            thisObj.cacheData("univ", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

    }else{
      window.location = "/login";
    }

  }

  whichComponent = (side) => {
    let tab = this.state.activeTab;
    if(side === 'left'){
      if(tab > 0) return --tab; 
      return tab=0;
    }else{
      if(tab < 2) return ++tab;
      return tab=2;
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

    this.setState({
      ActiveComponent: activeComponent, 
      activeData: activeData,
      activeTab: tabId
    });
  }

  handleLogout = () => {
    delete localStorage.user;
    delete localStorage.pass;
    window.location = "/login";
  }

  cacheData = (type, data) => {
    localStorage[type] = JSON.stringify(data);
  }

  getCachedData = (type) => JSON.parse(localStorage[type]);

  render() {
    return (
      <div className="App">
        <Layout fixedHeader fixedTabs>
          <Header className="header">
              <HeaderRow title="Instify">
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
              <a href="/test">
                <Icon className="drawer-icon" name="poll" />
                <div className="drawer-item">Test performance</div>
              </a>
              <a href="/about">
                <Icon className="drawer-icon" name="info" />
                <div className="drawer-item">About</div>
              </a>
              <a onClick={() => this.handleLogout()}>
                <Icon className="drawer-icon" name="exit_to_app" />
                <div className="drawer-item">Logout</div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.instify.android&hl=en">
                <Icon className="drawer-icon" name="android" />
                <div className="drawer-item">Get the android app</div>
              </a>
              <p style={{position: "absolute", bottom: 0}}>Other features coming soon</p>
            </Navigation>
          </Drawer>
          <Content {...SwipeReact.events}>
              <this.state.ActiveComponent data={{payload: this.state.activeData, type: this.state.activeTab}}/>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
