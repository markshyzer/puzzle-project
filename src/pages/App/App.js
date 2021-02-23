import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../LandingPage/LandingPage';
import NavBar from '../../components/NavBar/NavBar'
import ImagesPage from '../ImagesPage/ImagesPage'
import ImagePage from '../ImagePage/ImagePage'
import Image from '../../components/Image/Image'
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import UpdatePage from '../UpdatePage/UpdatePage'
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    }
  }

  // handleUpdateName = () => {
  //   this.setState({
  //     user: 
  //   })
  // }

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
          <Route exact path='/updatename/:id' render={({ history }) => 
            <UpdatePage
              history={history}
              handleSignupOrLogin={this.handleUpdateName}
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
