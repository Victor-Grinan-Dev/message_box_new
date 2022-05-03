import React, { Component } from 'react'
import './App.css';

import axios from 'axios';

import Form from './components/Forms';
import View from './components/Views';
import PopUp from './components/PopUp';
import NotesList from './components/NotesList';

const url = 'http://localhost:3010/notes'

export default class App extends Component {

  state = {
    inputData: {
      firstname: '',
      lastname: '',
      phone: '',
      role: '',
      message: '',
    },
    showPopup: false,
    data: [],
  };

  componentDidMount() {
    axios
      .get(url)
      .then((res) => this.setState({ data: res.data }));
  }

  inputHandler = (e) => {
    this.setState({
      inputData: { ...this.state.inputData, [e.target.name]: e.target.value },
    });
  };

  submitHandler = () => {
    axios
      .post('http://localhost:3010/notes', this.state.inputData)
      .then((res) => console.log('res', res))
      .catch((error) => console.log('error', error));

    this.closeHandler();
  };

  closeHandler = () => {
    window.location.reload();
  };

  popUpHandler = (e) => {
    e.preventDefault();
    this.setState({ showPopup: !this.state.showPopup });
  };

  deleteHandler = (id) => {
    console.log("id", id);
    console.log(`url: ${url}/${id}`)
    axios.delete(`${url}/${id}`).then((res) => {
      const notes = this.state.data.filter((item) => item.id !== id)
      this.setState({data: notes});
    })
  }

  render() {
    return (
      <div className="white-bg">
        <h1>App</h1> 
        <div className="blue-bg">
          <Form change={this.inputHandler} submit={this.popUpHandler}/>
          <View {...this.state.inputData}/>
        </div>
        <NotesList data={this.state.data} delete={this.deleteHandler}/>
        {this.state.showPopup && (
          <PopUp
            close={this.closeHandler}
            {...this.state.inputData}
            submit={this.submitHandler}
          />
        )}
      </div>
    )
  }
}

//<NotesList data={this.state.data} />


