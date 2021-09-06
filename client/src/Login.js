import React, { Component } from 'react';
import axios from 'axios';
import "./Login.css";
import { Text } from 'react-native';
import { Card } from '@material-ui/core';




class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: '',
        password: '',
        userId: ''
      };
    }
    
    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  
    handleSubmit = e => {
      e.preventDefault();
  
      const { username, password } = this.state;
  
      const userData = {
        username,
        password
      };
  
      axios
        .post('/login', userData)
        .then((response) => {
            console.log(response.data.message)

            if(response.data.message === "OK")
            {
                
                this.setState({
                    userId: response.data.client_id,
                });

                localStorage.setItem('userId', this.state.userId);
                this.props.history.push('/form/' + this.state.userId);
            }
            else
            {
                alert("Zły login lub hasło!");
            }
        })
        .catch(err => {
          console.error(err);
        });
    };

  
    render() {
      return (
        <div className="App" style={{"height": "100%"}}>
            <form onSubmit={this.handleSubmit} className="">
            <br/><br/><br/><br/><br/><br/>
               <Card style={{"padding": "20px"}}>
              <Text>LOGOWANIE</Text>
              <br/><br/>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Login"
                  onChange={this.handleInputChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleInputChange} 
                />
              </div>
              <br />
              <div>
                <button className="btn btn-success" type="submit">
                  Zaloguj się
                </button>
              </div>
              <button className="btn btn-link" onClick={()=>{this.props.history.push('/register')}}>
            Rejestracja
            </button>
              </Card>
            </form>
          </div>
      );
    }
  }
  
  export default Login;

