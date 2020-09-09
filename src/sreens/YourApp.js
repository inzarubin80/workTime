import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux'


const YourApp = () => {

  const value1 = useSelector(state => state.app.currentDate);
  console.log('value1 ' + value1);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Try editing me! 🎉
      </Text>
    </View>
  );
}

/*
const mapStateToProps = state => {
  return {
    favorites: state.app.favorites
  }
}
*/

//export default connect(mapStateToProps)(YourApp);

export default YourApp;