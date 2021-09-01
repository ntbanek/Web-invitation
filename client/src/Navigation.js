import React from "react";
import { Button, CardMedia, Grid } from '@material-ui/core';
import { Text, StyleSheet } from 'react-native';
import "./MainPage.css";
import { Redirect } from 'react-router-dom';
import MainPage from "./MainPage";
import WeddingPage from "./WeddingPage";
import ReceptionPage from "./ReceptionPage";
import "./MainPage.css";
import styled from 'styled-components';




  const Navigation = ({ match }) => {

    const [data, setData] = React.useState(null);
    const [navigate, setNavigate] = React.useState("INFORMACJE OGÓLNE");

    const StyledButton = styled(Button)`
      margin: 20px;
      margin-bottom: 10px; 
      margin-top: 10px; 
      width:160px; 
      font-size: 20; 
      font-family: 'Amatic SC'; 
      font-weight: bold; 
      padding: 0px;
      background-color: ${!data ? "cornsilk" : LightenDarkenColor(data.bgd_color,-50) } 
    `;

    React.useEffect(() => {
      fetch("/show/" + match.params.userId)
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

    const handleSubmit = (event) => {
        console.log(event);
        setNavigate(event.target.innerText);
        console.log("navigate " + navigate);
    }

    function LightenDarkenColor(col, amt) {
  
      var usePound = false;
    
      if (col[0] === "#") {
          col = col.slice(1);
          usePound = true;
      }
   
      var num = parseInt(col,16);
   
      var r = (num >> 16) + amt;
   
      if (r > 255) r = 255;
      else if  (r < 0) r = 0;
   
      var b = ((num >> 8) & 0x00FF) + amt;
   
      if (b > 255) b = 255;
      else if  (b < 0) b = 0;
   
      var g = (num & 0x0000FF) + amt;
   
      if (g > 255) g = 255;
      else if (g < 0) g = 0;
   
      return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    
  }
    
    return (
      <div className="App" style={{"backgroundColor": !data ? "cornsilk" : data.bgd_color}}>
        <header className="Menu">
        <div id="menu" style= {{ padding: 5 }}>
            <StyledButton id="navigation1" variant="contained" color="primary" onClick={handleSubmit} name="1">
            Informacje ogólne
            </StyledButton>
            <Button id="navigation2" variant="contained" color="primary" style={{ margin: 20, marginBottom: 10, marginTop: 10, width:160, fontSize: 20, fontFamily: 'Amatic SC', fontWeight: "bold",  padding: 0, backgroundColor: !data ? "cornsilk" : LightenDarkenColor(data.bgd_color,-50)   }} onClick={handleSubmit} name="2">
            Ślub
            </Button>
            <Button id="navigation3" variant="contained" color="primary" style={{ margin: 20, marginBottom: 10, marginTop: 10, width:160, fontSize: 20, fontFamily: 'Amatic SC', fontWeight: "bold",  padding: 0, backgroundColor: !data ? "cornsilk" : LightenDarkenColor(data.bgd_color,-50)    }} onClick={handleSubmit} name="3">
            Przyjęcie weselne
            </Button>
        </div>
        </header>
        <div className="App" style={{"height" : "100%", "width" : "100%", "backgroundImage": `url(${!data ? '' : '/image/' + data.bgd_image})`, "backgroundPosition": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}}>
        <br /><br/>
        <div className="Canvas"style={{"padding": "10px", "height" : "100%", "width" : "60%", "margin" :"auto", "backgroundColor": !data ? "cornsilk" : LightenDarkenColor(data.bgd_color,20)+"be"}}>
        {navigate === "INFORMACJE OGÓLNE" && <MainPage userId={match.params.userId} />}
        {navigate === "ŚLUB" && <WeddingPage userId={match.params.userId} />}
        {navigate === "PRZYJĘCIE WESELNE" && <ReceptionPage userId={match.params.userId} />}
        </div>
        <br/>
      </div>
        </div>
        )
    
}

    export default Navigation;

