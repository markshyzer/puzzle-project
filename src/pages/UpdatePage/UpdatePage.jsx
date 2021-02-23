import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class UpdatePage extends Component {
  state = {
    name: this.props.user.name,
    id: this.props.user._id
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await userService.update(this.state);
      this.props.handleUpdateName();
      this.props.history.push('/');
    } catch (err) {
      alert('Invalid Credentials!');
    }
  }

  render() {
    return (
      <div className="LoginPage">
        <form className="form-horizontal" onSubmit={this.handleUpdate} >
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" placeholder="username" value={this.state.name} name="name" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Submit</button>&nbsp;&nbsp;&nbsp;
              <Link to='/'>Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UpdatePage;
