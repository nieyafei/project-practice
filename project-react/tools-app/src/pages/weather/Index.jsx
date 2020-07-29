import React, {Component} from "react";

/* 
https://restapi.amap.com/v3/weather/weatherInfo?key=dc93db223307d0a8c4421ea2fc7dacb2&extensions=all&city=
*/
const headers = new Headers({
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Method': 'POST,GET',
  "Content-Type":'application/json,text/plain,*/*',
  'Access-Control-Allow-Credentials': 'true'
})
export default class Main extends Component{
  state = {
    loading: false,
    data: {}
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch('https://restapi.amap.com/v3/weather/weatherInfo?key=dc93db223307d0a8c4421ea2fc7dacb2&extensions=all&city=110000').then(res=> {
      if(res?.ok){
        res.json().then(data =>{
          console.log(data)
          this.setState({data})
        })
      }
    })
  }
  render(){
    const { data } = this.state;
    return (
      <React.Fragment>
        <div className="weather-section">
          我是天气预报
        </div>
      </React.Fragment>
    )
  }
}