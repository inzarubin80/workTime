import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryAxis } from "victory-native";
import { Button, Divider, Card, Text } from 'react-native-elements';

import { InputDate } from '../components/InputDate'
import { connect } from 'react-redux'
import { getEvents } from '../api/EventDataService';

import moment from 'moment';

import { groupArrayByKey } from '../utils/data'



const ReportScreen = (props) => {


  const [StartDate, setStartDate] = useState(new Date(moment().startOf('month')));// useState(moment().startOf('month'));
  const [finalDate, setFinalDate] = useState(new Date(moment().endOf('month')));// useState(moment().endOf('month'));
  const [data, setData] = useState([]);

  const reportGoo = () => {
    getEvents(moment(StartDate).format('YYYYMMDDhhmm'), moment(finalDate).format('YYYYMMDDhhmm'), props.hash)
      .then(response => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.log(err);

      });
  }


  const dataPartner = groupArrayByKey(data, (item) => { return item.partner.name }, 'duration');
  dataPartner.sort((a, b) => a.key > b.key ? 1 : -1);


  const dataWorksByWeek = groupArrayByKey(data, (item) => { console.log(item.date); return item.date }, 'duration');
  dataWorksByWeek.sort((a, b) => a.key > b.key ? 1 : -1);




  return (


    <View>

   


        <View style={styles.periodSelection}>
          <View>
            <InputDate date={StartDate} setDate={(value) => { setStartDate(value) }} />
          </View>

        
          <View>
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

  

      <Divider style={{ backgroundColor: '#333333', marginTop: 10 }} />

      <ScrollView >

        <Card.Title>Динамика работ по дням</Card.Title>
        <VictoryChart
          theme={VictoryTheme.material}
        >

          <VictoryAxis
            fixLabelOverlap
            style={{ tickLabels: { padding: 8, fontSize: 8 } }}
          />
          <VictoryAxis dependentAxis />

          <VictoryLine

            style={{
              data: { stroke: "#c43a31" },
              parent: {
                border: "1px solid #ccc",
                textOrientation: "sideways",

                tickLabels: { padding: 16, fontSize: 8 }


              },

              labels: {
                fontSize: 12,
              }
            }}

            data={dataWorksByWeek}

            labels={({ datum }) => datum.value}

            x="key" y="value"

          />
        </VictoryChart>


        <Card.Title>Распределение времени по контрагентам</Card.Title>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={dataPartner} x="key" y="value" />
        </VictoryChart>

        <View style={{ height: 170 }}>
        </View>



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
    justifyContent: 'space-between',
   // paddingLeft: 10,
   // paddingRight: 10
    
   //padding:20
   marginTop:10,
   marginRight:15,
   marginLeft:15
  },

  titleData: {

    fontSize: 18,
    color: '#333333',

  },


  buttonContainer: {
    marginTop: 1,
    justifyContent: 'center',
  
    marginRight:15,
    marginLeft:15,
    marginTop:6

  },

  button: {


    //padding: 15
    //marginTop: 15,

    //alignItems: "center",
    //justifyContent: 'center',

  },

});

const mapStateToProps = state => {
  return {
    hash: state.user.hash,
  }
}

export default connect(mapStateToProps)(ReportScreen);

