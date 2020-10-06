import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View, Text } from 'react-native';

import { getProjects } from '../api/EventDataService'

import { connect } from 'react-redux'
import ProjectList from '../components/ProjectList';


const SelectionProjectScreen = props => {

  const [searchText, setSearchText] = useState('');
  const [partner, SetPartner] = useState(props.route.params.partner);
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

    getProjects({ searchText: searchText, hash: props.hash, idPartner:partner.id })
      .then(response => response.json())
      .then((json) => {
        setDatas(json);
        console.log('json---------------------' + json.length);
      })
      .catch((err) => {
        setDatas([]);
        console.log(err);
      });
  }, [searchText]);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: 'Выбор проекта',
    });
  }, [props.navigation]);



  return (
    <View>
      <Input
        placeholder="Текст поиска"
  
        onChangeText={value => setSearchText(value)}
        
        value={searchText}

  
      />

      <ProjectList datas={datas} navigation={props.navigation}  partner = {partner}/>

    </View>
  )

};


const mapStateToProps = state => {
  return {
    hash: state.user.hash,
  }
}


export default connect(mapStateToProps)(SelectionProjectScreen);



