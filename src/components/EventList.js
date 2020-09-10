import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import EventItem from './EventItem';

const ListEvents = ({navigation, listData}) => {

  const renderProductItem = itemData => {
    return (
      <EventItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        destination={itemData.item.destination}
    
        onSelectMeal={() => {
             
          navigation.navigate('ProductScreen',
          {
            prodId: itemData.item.id
          }
        
          );
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderProductItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default ListEvents;
