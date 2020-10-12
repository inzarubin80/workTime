import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Button, Divider, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { InputDate } from '../components/InputDate'

const data = [
  { quarter: 'Gazprom', earnings: 13000 },
  { quarter: 'Aple', earnings: 16500 },
  { quarter: '1c', earnings: 14250 },
  { quarter: 'Ford', earnings: 19000 }
];


const ReportScreen = () => {

  return (
    <View>


      <Card>
        <View style={styles.periodSelection}>

          <View style={styles.periodData}>
            <Text style={styles.titleData}>Начало периода</Text>
            <InputDate date={new Date()} setDate={() => { }} />




          </View>

          <View style={styles.periodData}>

            <Text style={styles.titleData}>Конец периода</Text>
            <InputDate date={new Date()} setDate={() => { }} />
          </View>




        </View>


        <View style={styles.buttonContainer}>
          <Button
            title="Cформировать"
            style={styles.button}
          />
        </View>
      </Card>





      <Divider style={{ backgroundColor: '#333333', marginTop: 10 }} />

      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>
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

  buttonContainer: {
    marginTop: 15,

    alignItems: "center",
    justifyContent: 'center',

  },

  button: {

  },

});


export default ReportScreen;