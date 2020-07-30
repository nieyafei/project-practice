import React, {Component} from "react";
import { apiResp } from '../../global/api'

/* 
https://restapi.amap.com/v3/weather/weatherInfo?key=dc93db223307d0a8c4421ea2fc7dacb2&extensions=all&city=
*/
const headers = new Headers({
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Method': 'POST,GET',
  "Content-Type":'application/json,text/plain,*/*',
  'Access-Control-Allow-Credentials': 'true'
})

const WeekStr = ['','星期一','星期二','星期三','星期四','星期五','星期六','星期日']

export default class Main extends Component{
  state = {
    loading: false,
    data: {}
  }
  componentDidMount(){
    this.getData();
  }
  async getData(){
    const city = await apiResp('https://restapi.amap.com/v3/ip?key=dc93db223307d0a8c4421ea2fc7dacb2');
    let cityCode = city?.adcode || '110000';
    const data = await apiResp(`https://restapi.amap.com/v3/weather/weatherInfo?key=dc93db223307d0a8c4421ea2fc7dacb2&extensions=all&city=${cityCode}`);
    if(data){
      this.setState({
        data
      })
    }
  }
  render(){
    const { data } = this.state;
    const {forecasts} = data;
    return (
      <React.Fragment>
        {
          (forecasts?.length) && forecasts.map((d, key)=> {
            return <div className="weather-section" key={key}>
              {
                d?.casts?.map((m, key2)=> {
                  return (
                    <div className="w-item" key={key2}>
                      <p>{WeekStr[m.week]}<span className="lit">{m.date}</span></p>
                      <p>{m.dayweather}</p>
                      <p>{m.nighttemp} ~ {m.daytemp} ℃</p>
                      {key2 === 0 && <React.Fragment><span className="city">{d.city}</span><span className="temp">{initTemp()?m.daytemp:m.nighttemp} <span className="lit">℃</span></span></React.Fragment>}
                    </div>
                  )
                })
              }
            </div>
          })
        }
      </React.Fragment>
    )
  }
}

function initTemp(){
  let hour = new Date().getHours();
  let flag = true;
  if(hour < 6 || hour >= 18){
    flag = false
  }
  return flag;
}