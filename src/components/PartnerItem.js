import { Card, ListItem, Button, Icon } from 'react-native-elements'


import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

//import DefaultText from './DefaultText';

const PartnerItem = props => {
  return (
    <View>
      <TouchableOpacity onPress= {props.onSelectProject}
      >
                                               
        <Card>
          <Card.Title>{props.name}</Card.Title>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default PartnerItem;
