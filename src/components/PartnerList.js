import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

import PartnerItem from './PartnerItem';

const ProductList = ({navigation, datas}) => {

  
  const renderProductItem = ({item}) => {
   
   console.log('item' + item.name);

    return (
      <PartnerItem
      
      name={item.name}
        onSelectProject={() => {
          //onPartner('partner', item);
          navigation.navigate('EventForm', {partner:item});
        }
      }

      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={datas}
        keyExtractor={(item, index) => item.id}
        renderItem={renderProductItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {

   // flex: 1,
   // justifyContent: 'center',
    //alignItems: 'center',
    //padding: 15
  }
});

export default ProductList;
