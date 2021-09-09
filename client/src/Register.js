import React, { Component } from 'react';
import axios from 'axios';
import "./Register.css";
import { Card } from '@material-ui/core';
import { Text } from 'react-native';

class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        password: '',
        password_repeated: ''
      };
    }
  
    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  
    handleSubmit = e => {
      e.preventDefault();
  
      const { username, password, password_repeated } = this.state;
  
      const userData = {
        username,
        password,
        password_repeated
      };
  
      axios
        .post('/register', userData)
        .then((response) => 
        {
            if(response.data.message === "OK")
            {
              axios
              .get('/addRows', userData)
              .then(() => 
              {}
              )
              .catch(err => {
                console.error(err);
              });
  
              this.props.history.push('/login');
              alert("Zostałeś zarejestrowany! Zaloguj się!");
            }
            else if (response.data.message === "Login")
            {
              alert("Login już istnieje! Wybierz inny!")
            }
            else
            {
                alert("Brak któregoś z parametrów lub różne hasła! Powtórz rejestrację.");
            }
        }
        )
        .catch(err => {
          console.error(err);
        });
    };
  
    render() {
      return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
               <Card style={{"padding": "20px", marginTop: '160px'}}>
               <h4>REJESTRACJA</h4><br/><br/>
              <div className="form-group" id="login">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Wpisz login"
                  onChange={this.handleInputChange}
                />
              </div>
      
              <div  className="form-group" id="password1">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Wpisz hasło"
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-group" id="password2">
                <input
                  type="password"
                  className="form-control"
                  name="password_repeated"
                  placeholder="Powtórz hasło"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div >
                <button className="btn btn-regular"  type="submit">
                  Zarejestruj się
                </button><br/>
                <button className="btn btn-link" onClick={()=>{this.props.history.push('/login')}}>
            Powrót
            </button>
              </div>
              </Card>
            </form>
          </div>
      );
    }
  }
  
  export default Register;