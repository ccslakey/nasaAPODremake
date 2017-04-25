import React, { Component } from 'react';
import request from 'superagent';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      date: moment().format("YYYY-MM-DD")
    }
  }

  getPhoto(date) {
    console.log(date);
    let that = this
    request.get(`https://api.nasa.gov/planetary/apod?api_key=URko7tr4qNZHCLroMPGer5QJTukM8fXMFwvVR49P&date=${date}`)
    .end(function (error, response) {
      that.setState({
        data: response.body
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={this.state.data.hdurl} className="App-logo" alt="NASA APOD" />
          <h2>{this.state.data.title}</h2>
        </div>
        <p>
          {this.state.date}
          <br/>
          <button onClick={this.decrementDate.bind(this)} >Previous Day</button>
          <button disabled={this.dateIsToday()} onClick={this.incrementDate.bind(this)} >Next Day</button>
        </p>
        <p className="App-intro">
          {this.state.data.explanation}
        </p>

      </div>
    );
  }
}

export default App;
