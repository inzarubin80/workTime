import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import PartnerItem from './PartnerItem';

const PartnerList = ({listData}) => {

  console.log('ProductList ' + listData.length);

  const renderPartnerItem = ({item}) => {

    console.log('renderProductItem ' + item.name);

    return (
      <PartnerItem
      name={item.name}  
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={renderPartnerItem}
       // style={{ width: '100%' }}
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

export default PartnerList;
