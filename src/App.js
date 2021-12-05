import React, { Component } from 'react';
import PhotoContainer from './PhotoContainer';
import './App.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			color: "#252930",
			photos: [],
      seconds: props.seconds
		};
    this.tick = this.tick.bind(this)
	}
	
	async componentDidMount() {
    this.sendRequest()
		this.interval = setInterval(() => this.sendRequest(), 60000);
	}

  tick() {
    if (this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds - 1})
    } else {
      this.setState({seconds: 60})
    }
  }

  async sendRequest() {
    clearTimeout(this.timer);
    this.setState({seconds: 60});
    this.timer = setInterval(this.tick, 1000);
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => {
          console.log("Response", response, response.status);
          if (!response.ok) {
            throw Error("Fetching an image failed, status code: ", response.status);
          }
          return response.json()
        .then(allData => {
          this.setState({photos: allData});
          })
        .catch(err => {
          throw Error(err.message);
          })
        });
  }
	
	render() {
		return (
			<React.Fragment>
				<div className="App">
					<h1>Hello there!</h1>
					<h2>Welcome to the Cat of the Minute!</h2>
					<h2>A website which displays a changing cat picture or GIF every 60 seconds</h2>
          <PhotoContainer photos={this.state.photos} />
          <h2>New cat image in {this.state.seconds} seconds</h2>
				</div>
			</React.Fragment>
		)
	}
}
	
export default App;
