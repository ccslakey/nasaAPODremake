import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      date: moment().format("YYYY-MM-DD"),
      preloaded: [],
      loading: false
    }
  }

  getPhoto(date) {
    console.log(date);
    let that = this;
    this.setState({
      loading: true
    })
    request.get(`https://api.nasa.gov/planetary/apod?api_key=URko7tr4qNZHCLroMPGer5QJTukM8fXMFwvVR49P&date=${date}`)
    .end(function (error, response) {
      that.setState({
        data: response.body,
        loading: false
      });
    })
  }

  incrementDate(e) {
    e.preventDefault();
    let currentDate = moment(this.state.date);
    let tomorrow = moment(currentDate).set('date', currentDate.date() + 1).format('YYYY-MM-DD');
    this.setState({
      date: tomorrow
    });
    this.getPhoto(tomorrow);
  }

  decrementDate(e) {
    e.preventDefault();
    let currentDate = moment(this.state.date);
    let yesterday = moment(currentDate).set('date', currentDate.date() - 1).format('YYYY-MM-DD');
    this.setState({
      date: yesterday
    });
    this.getPhoto(yesterday);
  }


  componentWillMount() {
    this.getPhoto(this.state.date);
  }

  dateIsToday(){
    return this.state.date == moment().format("YYYY-MM-DD") ? true : false;
  }

  mediaObj(){
    if (this.state.data.hdurl) {
      return <img src={this.state.data.hdurl} className="App-logo" alt="NASA APOD" />
    } else {
      return <iframe src={this.state.data.url} height="600" className="App-logo" frameborder="0" allowfullscreen ></iframe>
    }
  }


  render() {
    return (
      <div className="App">
        <div className="photo-header">

          <div className="photo-carousel carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {this.mediaObj()}
            </div>

            <a onClick={this.decrementDate.bind(this)} className="left carousel-control" href="#">
              <span className="glyphicon glyphicon-chevron-left"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a onClick={this.incrementDate.bind(this)} className={"right carousel-control " + (this.dateIsToday() ? 'disabled' : 'enabled')} href="#">
              <span className="glyphicon glyphicon-chevron-right"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>



        </div>
        <div className="body">
          <h2 className="titletext">{this.state.data.title}</h2>
          <p>
            {this.state.date}
          </p>
          <p className="App-intro">
            {this.state.data.explanation}
          </p>
        </div>
      </div>
    );
  }
}

export default App;
