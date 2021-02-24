import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../../components/NavBar/NavBar'
import ImagesPage from '../ImagesPage/ImagesPage'
import ImagePage from '../ImagePage/ImagePage'
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import UpdatePage from '../UpdatePage/UpdatePage'
import userService from '../../utils/userService';

//import PuzzleCreatePage from "./Puzzle/PuzzleCreate";
import Room from "../Room/Room";
import GameRoom from "../GameRoom/GameRoom";

//draggable
import tokenService from '../../utils/tokenService';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    }
  }

  handleUpdateName = async () => {
    const user = await userService.index(this.state.user._id);
    this.setState({ user });
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
        <header className='header-footer'><span>R e A L - T i m E &nbsp;&nbsp;&nbsp;  P u Z Z L e S</span></header>
        <NavBar 
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <Switch>
          <Route exact path='/' render={() =>
            <LandingPage
              user={this.state.user}
              handleLogout={this.handleLogout}
            />
          }/>
          <Route exact path='/login' render={({ history }) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
              user={this.state.user}
            />
          }/>
          <Route exact path='/signup' render={({ history }) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
              user={this.state.user}
            />
          }/>

          <Route exact path="/room" component={Room} />
          <Route exact path="/:roomId" component={GameRoom} />
          <Route exact path='/updatename/:id' render={({ history }) => 
            <UpdatePage
              history={history}
              handleUpdateName={this.handleUpdateName}
              user={this.state.user}
            />
          }/>
          <Route exact path='/images' render={() =>
            <ImagesPage />
          }/>
          <Route exact path='/images/:id' render={props => 
            <ImagePage {...props}/>}
          />
        </Switch>
      </div>
    );
  }
}


export default App;
