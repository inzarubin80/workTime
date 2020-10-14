import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Button, Divider, Card, Text } from 'react-native-elements';

import { InputDate } from '../components/InputDate'
import { connect } from 'react-redux'
import { getEvents } from '../api/EventDataService';

import moment from 'moment';

import {groupArrayByKey} from '../utils/data'



const ReportScreen = (props) => {


  const [StartDate, setStartDate] = useState(new Date(moment().startOf('month')));// useState(moment().startOf('month'));
  const [finalDate, setFinalDate] = useState(new Date(moment().endOf('month')));// useState(moment().endOf('month'));
  const [data, setDate] = useState([]);

  const reportGoo = () => {
    getEvents(moment(StartDate).format('YYYYMMDDhhmm'), moment(finalDate).format('YYYYMMDDhhmm'), props.hash)
      .then(response => response.json())
      .then((json) => {

        const newDataPartner = groupArrayByKey(json, (item)=>{return item.partner.name},  'duration');
        console.log(newDataPartner);
        newDataPartner.sort((a, b) => a.key > b.key ? 1 : -1);
        setDate(newDataPartner);


        const  newWorksByweek = groupArrayByKey(json, (item)=>{return moment(item.Data).startOf('week').format('YY-MM-DD')},  'duration');
        newWorksByweek.sort((a, b) => a.key > b.key ? 1 : -1);
        console.log(newWorksByweek);


      })
      .catch((err) => {
        console.log(err);

      });
  }

  return (


    <View>


      <Card>
        <View style={styles.periodSelection}>

          <View style={styles.periodData}>
            <Text style={styles.titleData}>Начало периода</Text>
            <InputDate date={StartDate} setDate={(value) => { setStartDate(value) }} />
          </View>

          <View style={styles.periodData}>
            <Text style={styles.titleData}>Конец периода</Text>
            <InputDate date={finalDate} setDate={(value) => { setFinalDate(value) }} />
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cформировать"
            style={styles.button}
            onPress={reportGoo}
          />
        </View>
      </Card>

      <Divider style={{ backgroundColor: '#333333', marginTop: 10 }} />

      <ScrollView >


        <Card>
          <Card.Title>Распределение времени по контрагентам</Card.Title>
          <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material} >
              <VictoryBar data={data} x="key" y="value" />
            </VictoryChart>
          </View>
        </Card>

        <Card>
          <Card.Title>Распределение времени по контрагентам</Card.Title>
          <View style={styles.container}>
            <VictoryChart width={350} theme={VictoryTheme.material} >
              <VictoryBar data={data} x="key" y="value" />
            </VictoryChart>
          </View>
        </Card>
    


      </ScrollView>

     

    </View>



  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },



  periodSelection: {
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },

  periodData: {

    flexDirection: 'column',
    // alignItems:'center',

  },

  titleData: {

    fontSize: 18,
    color: '#333333',

  },

  titleChart: {
    textAlign: 'center',
    paddingTop: 5
  },

  buttonContainer: {
    marginTop: 15,

    alignItems: "center",
    justifyContent: 'center',

  },

  button: {

  },

});

const mapStateToProps = state => {
  return {
    hash: state.user.hash,
  }
}

export default connect(mapStateToProps)(ReportScreen);

