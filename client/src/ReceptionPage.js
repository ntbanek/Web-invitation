import React from "react";
import { Grid } from '@material-ui/core';
import { Text, StyleSheet } from 'react-native';
import "./MainPage.css";


  function ReceptionPage(props){

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/showReception/" + props.userId)
        .then((res) => res.json())
        .then((data) => setData(data.message));
      }, []);

    //if(!data) return null;
    return (
      <>
        <Text style={styles.names}> 
        {!data ? "" : data.reception_place} {"\n"}
        </Text>
        <Text style={styles.address}> 
        {!data ? "" : data.reception_address} {"\n"}
        </Text><br/>
        <Grid container justifyContent = "center">
        <img className="imgShow" src={!data ? '' : '/image/' + data.reception_photo} title="Contemplative Reptile" alt="" style={{ height: 250 }} />
        </Grid><br/><br/>
        <div style={{"width": "60%", "margin": "auto"}}>
        <Text style={styles.baseText}>
        {!data ? "" : data.reception_description}
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
      fontSize: 35,
      fontWeight: 'bold'
    },
    baseText: {
      fontFamily: 'Amatic SC',
      fontSize: 23
    }
  });
export default ReceptionPage;
