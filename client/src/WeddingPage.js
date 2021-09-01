import React from "react";
import { Button, CardMedia, Grid } from '@material-ui/core';
import { Text, StyleSheet } from 'react-native';
import "./MainPage.css";
import obraz from "./scp.JPG";
import { Redirect } from 'react-router-dom';

  function WeddingPage (props)
  {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/showWedding/" + props.userId)
        .then((res) => res.json())
        .then((data) => setData(data.message));
      }, []);

    //if(!data) return null;
    return (
      <>
        <Text style={styles.names}> 
        {!data ? "" : data.place} {"\n"}
        </Text>
        <Text style={styles.address}> 
        {!data ? "" : data.address} {"\n"}
        </Text>
        <Text style={styles.date}> 
        {!data ? "" : data.time} {"\n"}
        </Text><br/>
        <Grid container justifyContent = "center">
        <img className="imgShow" src={!data ? '' : '/image/' + data.wedding_photo} title="Contemplative Reptile" alt="" style={{ height: 250 }} />
        </Grid>
        <br/>
        <div style={{"width": "60%", "margin": "auto"}}>
        <Text style={styles.baseText}>
        {!data ? "" : data.wedding_description}
        </Text>
        </div>
        </>
    );
    
  }

  const styles = StyleSheet.create({
    names: {
      fontFamily: 'Amatic SC',
      fontSize: 40,
      fontWeight: 'bold'
    },
    address: {
      fontFamily: 'Amatic SC',
      fontSize: 20
    },
    date: {
      fontFamily: 'Amatic SC',
      fontSize: 40,
      fontWeight: 'bold'
    },
    baseText: {
      fontFamily: 'Amatic SC',
      fontSize: 23
    }
  });

export default WeddingPage;
