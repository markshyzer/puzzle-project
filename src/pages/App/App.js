import './App.css';
import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import GamePage from '../GamePage/GamePage';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../utils/userService';
//import PuzzleCreatePage from "./Puzzle/PuzzleCreate";
import Room from "../Room/Room";
import ChatRoom from "../ChatRoom/ChatRoom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    }
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  render() {
    return (
      <div className="App">
        <header className='header-footer'>P U Z Z L E S &nbsp;&nbsp;&nbsp;  P R O J E C T</header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          }/>
          <Route exact path="/room" component={Room} />
          <Route exact path="/:roomId" component={ChatRoom} />
        </Switch>
      </div>
    );
  }
}


export default App;
