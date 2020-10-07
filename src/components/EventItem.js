import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ListItem, Icon, Text } from 'react-native-elements'


const EventItem = props => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelectEvent}>
        
          <ListItem bottomDivider>
          {/*
            <Icon name='link' />
          */}
          
            <ListItem.Chevron />

            <ListItem.Content>

             <ListItem.Title> <Text h4>{props.partner.name} ({props.project.name})</Text> </ListItem.Title>
             

              <ListItem.Title><Text h5>{props.title} </Text> </ListItem.Title>
              <ListItem.Subtitle>{props.summary}</ListItem.Subtitle>
             
              <ListItem.Chevron />
             
              <Text>{props.duration} ч. </Text>
           
            </ListItem.Content>
            <ListItem.Chevron />

          </ListItem>

    

      </TouchableOpacity >
    </View >
  );
};

const styles = StyleSheet.create({

});

export default EventItem;
