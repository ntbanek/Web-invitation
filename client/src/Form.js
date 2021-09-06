import React, { Component } from 'react';
import axios from 'axios';
import "./Form.css";
import { Text, StyleSheet } from 'react-native';
import { Redirect } from 'react-router-dom';
import { Card } from '@material-ui/core';
import styled from 'styled-components';

class Form extends Component {
  constructor(props) {
    super(props);

    this.hiddenFileInput1 = React.createRef();
    this.hiddenFileInput2 = React.createRef();
    this.hiddenFileInput3 = React.createRef();
    this.hiddenFileInput4 = React.createRef();
  
    this.state = {
      name1: '',
      name2: '',
      date: '',
      bgd_color: '',
      bgd_image: '',
      bgd_image_src: '',
      photo: '',
      photo_src: '',
      description: '',
      place: '',
      address: '',
      time: '',
      wedding_photo: '',
      wedding_photo_src: '',
      wedding_description: '',
      reception_place: '',
      reception_address: '',
      reception_photo: '',
      reception_photo_src: '',
      reception_description: '',
      userId : props.match.params.userId,
    };

  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInputFileChange = e=> {

    this.setState({
      [e.target.name + "_src"]: e.target.files[0],
      loaded: 0,
    })
    this.setState({
      [e.target.name]: this.state.userId + "_" + e.target.name,
      loaded: 0,
    })
  }

  handleSubmit_first = e => {
    e.preventDefault();

    const { name1, name2, date, bgd_color, bgd_image, photo, description, userId } = this.state;

    const generalData = {
      name1,
      name2,
      date,
      bgd_color,
      bgd_image,
      photo,
      description,
      userId
    };
    console.log(generalData);
    axios
      .post('/sendForm', generalData)
      .then(() => console.log('Added data'))
      .catch(err => {
        console.error(err);
      });

      if(this.state.photo_src)
      {
        const photoFile = new FormData() 
        photoFile.append('file', this.state.photo_src)

        axios
        .post('/upload/' + this.state.userId + '/photo', photoFile, { })
        .then(res => { // then print response status
      }).catch(err => {
        console.error(err);
      });
      }

      if(this.state.bgd_image_src)
      {
      const bgdImageFile = new FormData() 
      bgdImageFile.append('file', this.state.bgd_image_src)

      axios
      .post('/upload/' + this.state.userId + '/bgd_image', bgdImageFile, { })
      .then(res => { // then print response status
 
    }).catch(err => {
      console.error(err);
    });
      }

};





  handleSubmit_second = e => {
    e.preventDefault();

    const { place, address, time, wedding_photo, wedding_description, userId } = this.state;

    const weddingData = {
      place,
      address,
      time,
      wedding_photo,
      wedding_description,
      userId
    };

    axios
      .post('/sendFormWedding', weddingData)
      .then(() => console.log('Added data'))
      .catch(err => {
        console.error("error" + err);
      });

      if(this.state.wedding_photo_src)
      {
        const weddingPhotoFile = new FormData() 
        weddingPhotoFile.append('file', this.state.wedding_photo_src)

        axios
        .post('/upload/' + this.state.userId + '/wedding_photo', weddingPhotoFile, { })
        .then(res => { // then print response status
  
      }).catch(err => {
        console.error(err);
      });
      }
  };

  handleSubmit_third = e => {
    e.preventDefault();

    const { reception_place, reception_address, reception_photo, reception_description, userId } = this.state;

    const generalData = {
      reception_place,
      reception_address,
      reception_photo,
      reception_description,
      userId
    };

    axios
      .post('/sendFormReception', generalData)
      .then(() => console.log('Added data'))
      .catch(err => {
        console.error(err);
      });

      if(this.state.reception_photo_src)
      {
        const receptionPhotoFile = new FormData() 
        receptionPhotoFile.append('file', this.state.reception_photo_src)

        axios
        .post('/upload/' + this.state.userId + '/reception_photo', receptionPhotoFile, { })
        .then(res => { // then print response status
   
      }).catch(err => {
        console.error(err);
      });
      }
  };

  componentDidMount() {
 
    const api = axios.create({
        headers: { Pragma: 'no-cache' },
      });



    api
    .get('/show/' +  this.state.userId)
    .then((response) => {
        this.setState ({
            name1: response.data.message.name1,
            name2: response.data.message.name2,
            date: response.data.message.date,
            bgd_color: response.data.message.bgd_color,
            bgd_image: response.data.message.bgd_image,
            photo: response.data.message.photo,
            description: response.data.message.description,
        });
  
       // console.log("name1 " + this.state.name1_old);
     

      })
      .catch(err => {
        console.error(err);
      });

      api
      .get('/showWedding/' +  this.state.userId)
      .then((response) => {
          this.setState ({
              place: response.data.message.place,
              address: response.data.message.address,
              time: response.data.message.time,
              wedding_photo: response.data.message.wedding_photo,
              wedding_description: response.data.message.wedding_description
          });

    
        })
        .catch(err => {
          console.error(err);
        });
        console.log("user id: " + localStorage.getItem('userId'));

    api
    .get('/showReception/' +  this.state.userId)
    .then((response) => {
        this.setState ({
            reception_place: response.data.message.reception_place,
            reception_address: response.data.message.reception_address,
            reception_photo: response.data.message.reception_photo,
            reception_description: response.data.message.reception_description
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  
    // Programatically click the hidden file input element
    // when the Button component is clicked
    handleClick1 = event => {
      this.hiddenFileInput1.current.click();
    };
    handleClick2 = event => {
      this.hiddenFileInput2.current.click();
    };
    handleClick3 = event => {
      this.hiddenFileInput3.current.click();
    };
    handleClick4 = event => {
      this.hiddenFileInput4.current.click();
    };

    openInNewTab(url) {
      var win = window.open(url, '_blank');
      win.focus();
    }
  
  render() {
    if( localStorage.getItem('userId') === this.state.userId)
    {
    return (
      <div style={{"backgroundImage": `url('/image/background.jpg')`, "backgroundPosition": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}}>
        <br/>
        <div className="container" style={{'backgroundColor': '#FFFFFFE3', 'width': '85%', 'margin': 'auto'}}>
          <div className="nav_form">
        <Text style={styles.date}>
            Link dla gości: http://{window.location.href.split('/')[2]}/page/{this.state.userId}
        </Text><br /><br/>
        <button style={{"margin-right": 10}} onClick={()=>{this.openInNewTab('/page/' + this.state.userId)}}>
        Przejdź do mojej strony
        </button>
        <button onClick={()=>{
          localStorage.setItem('userId','');
          this.props.history.push('/login');
          }}>
        Wyloguj
        </button><br/>
        </div>
        
          <form className="form_save" onSubmit={this.handleSubmit_first} style={{"textAlign": "center"}}>
          <Card style={{"padding": "10px"}}>
          <Text>
            Informacje ogólne
        </Text>
        <Text>
            Imię i nazwisko Panny Młodej
        </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name1"
                placeholder="Imię i nazwisko"
                defaultValue = {this.state.name1}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <Text>
            Imię i nazwisko Panna Młodego
        </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="name2"
                placeholder="Imię i nazwisko"
                defaultValue = {this.state.name2}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <Text>
            Data ślubu
        </Text>
            <div className="form-group">
              <input
                type="date"
                className="form-control"
                name="date"
                placeholder="Data"
                defaultValue = {this.state.date}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <Text>
            Kolor tła zaproszenia
        </Text>
            <div className="form-group">
              <input
                type="color"
                className="form-control"
                name="bgd_color"
                placeholder="Kolor tła"
                defaultValue = {this.state.bgd_color}
                onChange={this.handleInputChange}
              />
            </div>
            <Text>
            Wybrany kolor tła:
            </Text>
            <div style={{width: 64, height: 32, backgroundColor:this.state.bgd_color}}>
            <Text>
            {this.state.bgd_color_old}
            </Text>  
            </div>
            <br />
            <Text>
            Obraz w tle zaproszenia:
            </Text>
            <button onClick={this.handleClick1} className="form-control">
            Wybierz plik
            </button>
          <input
                type="file"
                className="form-control-file"
                name="bgd_image"
                placeholder="Obraz tła"
                defaultValue = {this.state.bgd_image}
                onChange={this.handleInputFileChange}
                ref={this.hiddenFileInput1}
                style={{"display": 'none'}}
              />
            {this.state.bgd_image &&
            <img src={'/image/' + this.state.bgd_image} alt="" height="110" max-width="200" /> 
            }
            {this.state.bgd_image_src &&
            <img src={URL.createObjectURL(this.state.bgd_image_src)} alt="" height="110" max-width="200"/> }
            <br />
            <button onClick={this.handleClick2} className="form-control">
            Wybierz plik
            </button>
          <input
                type="file"
                className="form-control-file"
                name="photo"
                placeholder="Zdjęcie"
                defaultValue = {this.state.photo}
                onChange={this.handleInputFileChange}
                ref={this.hiddenFileInput2}
                style={{"display": 'none'}}
              />
            {this.state.photo && 
            <img src={'/image/' + this.state.photo} alt="" height="110" max-width="200"/>
             }
            {this.state.photo_src &&
            <img src={URL.createObjectURL(this.state.photo_src)} alt="" height="110" max-width="200" /> }
            <br />
            <Text>
            Dodatkowe informacje
        </Text>
            <div className="form-group">
              <textarea
                row="4"
                className="form-control"
                name="description"
                placeholder="Dodatkowe informacje"
                defaultValue = {this.state.description}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div >
              <button className="btn btn-success" type="submit">
                Zapisz dane
              </button>
            </div>
            </Card>
            </form>
            <form className="form_save" onSubmit={this.handleSubmit_second}>
            <Card style={{"padding": "10px"}}>
            <Text>
            Ślub
        </Text>
        <Text>
          Miejsce zaślubin
            </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="place"
                placeholder="Miejsce ślubu"
                defaultValue = {this.state.place}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <Text>
          Adres miejsca zaślubin
            </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Adres"
                defaultValue = {this.state.address}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="time"
                className="form-control"
                name="time"
                placeholder="Godzina rozpoczęcia uroczystości"
                defaultValue = {this.state.time}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <button onClick={this.handleClick3} className="form-control">
            Wybierz plik
            </button>
          <input
                type="file"
                className="form-control-file"
                name="wedding_photo"
                placeholder="Zdjęcie miejsca zaślubin"
                defaultValue = {this.state.wedding_photo}
                onChange={this.handleInputFileChange}
                ref={this.hiddenFileInput3}
                style={{"display": 'none'}}
              />
            {this.state.wedding_photo &&
            <img src={'/image/' + this.state.wedding_photo} alt="" height="110" max-width="200"/> 
    }
                {this.state.wedding_photo_src &&
            <img src={URL.createObjectURL(this.state.wedding_photo_src)} alt="" height="110" max-width="200" /> }
            <br />
            <Text>
            Dodatkowe informacje
        </Text>
            <div className="form-group">
              <textarea
                className="form-control"
                name="wedding_description"
                placeholder="Dodatkowe informacje"
                defaultValue = {this.state.wedding_description}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div >
              <button className="btn btn-success" type="submit">
                Zapisz dane
              </button>
            </div>
            </Card>
            </form>
            <form className="form_save" onSubmit={this.handleSubmit_third}>
            <Card style={{"padding": "10px"}}>
            <Text>
            Przyjęcie weselne
        </Text>
        <Text>
            Miejsce wesela
        </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="reception_place"
                placeholder="Miejsce wesela"
                defaultValue = {this.state.reception_place}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <Text>
            Adres miejsca wesela
        </Text>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="reception_address"
                placeholder="Adres"
                defaultValue = {this.state.reception_address}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <button onClick={this.handleClick4} className="form-control">
            Wybierz plik
            </button>
          <input
                type="file"
                className="form-control-file"
                name="reception_photo"
                placeholder="Zdjęcie miejsca wesela"
                defaultValue = {this.state.reception_photo}
                onChange={this.handleInputFileChange}
                ref={this.hiddenFileInput4}
                style={{"display": 'none'}}
              />
            {this.state.reception_photo && 
            <img src={'/image/' + this.state.reception_photo} alt="" height="110" max-width="200"/> }
            {this.state.reception_photo_src &&
            <img src={URL.createObjectURL(this.state.reception_photo_src)} alt="" height="110" max-width="200"/> }
            <br />
            <Text>
            Dodatkowe informacje
        </Text>
            <div className="form-group">
              <textarea
                className="form-control"
                name="reception_description"
                placeholder="Dodatkowe informacje"
                defaultValue = {this.state.reception_description}
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div>
              <button className="btn btn-success" type="submit">
                Zapisz dane
              </button>
            </div>
            </Card>
            </form>
        <br />

        </div>
        <br/>
      </div>
      
    );
  }
  else
    {
      return <Redirect to='/login'/>
    }
}


}

const styles = StyleSheet.create({
  names: {
    fontFamily: 'Amatic SC',
    fontSize: 50,
    fontWeight: 'bold'
  },
  date: {
    fontFamily: 'Amatic SC',
    fontSize: 30
  },
  baseText: {
    fontFamily: 'Amatic SC',
    fontSize: 23
  }
});


export default Form;