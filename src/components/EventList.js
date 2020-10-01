import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import EventItem from './EventItem';

const ListEvents = ({ navigation, events }) => {

  const renderProductItem = itemData => {

    return (
      <EventItem

        title={itemData.item.title}
        summary={itemData.item.summary}
        id={itemData.item.id}
        duration={itemData.item.duration}
        onSelectEvent={() => {

          navigation.navigate('EventForm',
            {
              event:itemData.item,
              partner:itemData.item.partner,
              project:itemData.item.project
            }

          )
        }
        }
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={events}
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
