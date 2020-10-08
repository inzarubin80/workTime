import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View, FlatList, Text } from 'react-native';

import { getPartners } from '../api/EventDataService'

import { connect } from 'react-redux'
import PartnerList from '../components/PartnerList';




const SelectionPartnerScreen = props => {

  const [searchText, setSearchText] = useState(props.route.params.searchText);
  const [datas, setDatas] = useState([]);



  const Item = ({ title }) => {

    return (
      <View>
        <Text> {title}</Text>
      </View>
    )
  };

  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );

  React.useEffect(() => {

    getPartners({ searchText: searchText, hash: props.hash })
      .then(response => response.json())
      .then((json) => {
        setDatas(json);
    
      })
      .catch((err) => {
        setDatas([]);
        console.log(err);
      });
  }, [searchText]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'Выбор контрагента',
    });
  }, [props.navigation]);



  return (
    <View>
      <Input
        placeholder="Введите текст"
        // leftIcon={{ type: 'font-awesome', name: 'comment' }}
        // style={styles}
        onChangeText={value => setSearchText(value)}
        value={searchText}
      />

      {(searchText == '') && <Text>Часто используемые</Text>}

      <PartnerList datas={datas} navigation={props.navigation} />

    </View>
  )
};

const mapStateToProps = state => {
  return {
    hash: state.user.hash,
  }
}


export default connect(mapStateToProps)(SelectionPartnerScreen);



