import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Header, Icon, Card, CardText, Spinner } from 'react-mdl';

import './test.css';

class TestPerformance extends Component{

    constructor(props){
        super(props);
        this.state = {
            testData: [],
            dataFetched: false
        }
    }

    componentDidMount(){

        const thisObj = this;

        console.log("Mounted")

        axios.get(`https://hashbird.com/gogrit.in/workspace/srm-api/get_marks.php?regno=${localStorage["user"]}&pass=${localStorage["pass"]}`)
        .then(function (response) {
          thisObj.setState({testData: response.data, dataFetched: true});
          thisObj.cacheData("test-performance", response.data);
          console.log("[d]", thisObj.state);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    cacheData = (type, data) => {
        localStorage[type] = JSON.stringify(data);
    }

    TestData = () => {
		// console.log("univ", this.props.data);
		if(this.state.dataFetched === true){

            if(this.state.testData.subjects.length === 0){
                return(
                    <div>Looks like your marks haven't been uploaded</div>
                )
            }else{
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
		}
		return <Spinner />;
	}

    render(){
		return(
			<div>
				<Layout fixedHeader>
			        <Header className="header login-header" >
			        	<a href="/"><Icon name="arrow_back" style={{color: "#fff"}}/></a> 
			        	<div className="header-title">Instify - Test Performance</div>
			        </Header>
			        <div className="activity">
                        <this.TestData />
			        </div>
			    </Layout>
			</div>
		)
	}
}

export default TestPerformance;