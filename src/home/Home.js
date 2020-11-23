import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Home.css'

class Home extends Component {
  render() {
    console.log("Home component")
    return (
      <div className="home-content">
        <div>Home Page</div>
        <Link to="/minesweeper">
          Minesweeper
        </Link>
      </div>
    )
  }
}

export default Home;