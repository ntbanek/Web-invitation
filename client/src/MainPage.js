import React from "react";
import { Button, CardMedia, Grid } from '@material-ui/core';
import { Text, StyleSheet } from 'react-native';
import "./MainPage.css";
import obraz from "./scp.JPG";


const MainPage = (props) => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/show/" + props.userId)
        .then((res) => res.json())
        .then((data) => setData(data.message));
  
    }, []);

    //if(!data) return null;
    return (
      <>
        <Text style={styles.names}> 
        {!data ? "" : data.name1} 
        </Text>
        <Text style={styles.names}> 
        {!data ? "" : ' & '} 
        </Text>
        <Text style={styles.names}> 
        {!data ? "" : data.name2} {"\n"}
        </Text>
        <Text style={styles.date}> 
        {!data ? "" : (!data.date ? "" : data.date.split("-")[2] + "-" + data.date.split("-")[1] + "-" + data.date.split("-")[0])} {"\n"}
        </Text><br/>
        <Grid container justifyContent = "center">
        <img className="imgShow" src={!data ? '' : '/image/' + data.photo} title="Contemplative Reptile" alt="" style={{ height: 250, opacity: 1 }} />
        </Grid><br />
        <div style={{"width": "60%", "margin": "auto"}}>
        <Text style={styles.baseText}>
        {!data ? "" : data.description}
        </Text>
        </div>
      </>
    );
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

export default MainPage;

