# React Native Select Awesome - Library for React Native on platform Android and iOS

![View on Github 1](https://github.com/tuantvk/react-native-select-awesome/blob/master/assets/example_1.png)
![View on Github 2](https://github.com/tuantvk/react-native-select-awesome/blob/master/assets/example_2.png)
![View on Github 3](https://github.com/tuantvk/react-native-select-awesome/blob/master/assets/example_3.gif)

# Table of Content

1. [What is React Native Select Awesome?](#1-what-is-react-native-select-awesome)
2. [Getting Started](#2-getting-started)
3. [Props](#3-props)
4. [Example](#4-example)
5. [License](#5-license)

## 1. What is React Native Select Awesome?

React Native Select Awesome ingenious and dynamic front-end framework created by TuanTVK to build cross platform Android & iOS mobile apps using ready to use generic components of React Native.

## 2. Getting Started

### Install

```shell
npm install react-native-select-awesome --save

# or use yarn

yarn add react-native-select-awesome
```

Import
```ES6
import RNSelect from 'react-native-select-awesome';
```
or 
```ES5
var RNSelect = require('react-native-select-awesome');
```

## 3. Props

[Follow Style in React Native](https://facebook.github.io/react-native/docs/style)

| Props  | Description | Default | PropTypes |
| ------------- | ------------- | ------------- | ------------- |
| datas | specify the options the user can select from | `[]` | `array` **isRequired** |
| value  | control the current value  | `""`  | `string` |
| placeholder | change the text displayed when no option is selected | `Select value` | `string` |
| label | customize label for select item | `label` | `string` |
| width | width of input | `100%` | `string` |
| height | height of input | `50` | `number` |
| styleInput | style customize for input | `{}` | `object` |
| styleItem | style customize for item select | `{}` | `object` |
| stylePicker | style customize container picker | `{ height: 250 }` | `object` |
| notFind | change the text displayed when no find value  | `Not Find` | `string` |
| styleNotFind | style customize for text notFind | `{}` | `object` |
| isDisabled | whether the input is disabled | `true` | `bool` |
| selectValue | return value when you use **rightIcon** props and select | `() => { }` | `func` |
| rightIcon | customize component right, it is function return element of you and prop **clearValue** | `null` | `func` |
| clearValue | clear value of select when you use **rightIcon** props and select | | `func` |
| customItem | customize select item use component of you, it is function return prop **(item, onPress)** | `null` | `func` |

## 4. Example

### Ex1: Basic

```js
// At the top of your file
import React, { Component } from 'react';
import { View } from 'react-native';
import RNSelect from 'react-native-select-awesome';

const LANGS = [
  {id: 1, label: 'Java', value: 'java'},
  {id: 2, label: 'JavaScript', value: 'js'},
  {id: 3, label: 'Python', value: 'py'},
  {id: 4, label: 'C', value: 'c'},
  {id: 5, label: 'PHP', value: 'php'},
];

const itemCustom = {color: '#146eff' };

// Later on in your component
export default class RNSelectExample extends Component {
  render() {
    return(
      <View>
        <RNSelect 
          datas={LANGS}
          placeholder="Select lang"
          height={60}
          styleItem={itemCustom}
        />
      </View>
    )
  }
}
```

### Ex2: Custom item

```js
// At the top of your file
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RNSelect from 'react-native-select-awesome';

const PERSONS = [
  {id: 1, name: 'Alexander', value: 'alexander'},
  {id: 2, name: 'Ethan', value: 'ethan'},
  {id: 3, name: 'Daniel', value: 'daniel'},
  {id: 4, name: 'Matthew', value: 'matthew'},
  {id: 5, name: 'Joseph', value: 'joseph'},
];

// Later on in your component
export default class RNSelectExample2 extends Component {
  render() {
    return(
      <View>
        <RNSelect 
          datas={PERSONS}
          placeholder="Select people"
          label="name"
          notFind="Opp... !"
          styleNotFind={{ textAlign: 'center' }}
          customItem={(item, _selectValue) => {
            return (
              <View style={{marginBottom: 10, backgroundColor: '#f00'}}>
                <Text onPress={() => _selectValue(item)}>{item.name}</Text>
              </View>
            )
          }}
        />
      </View>
    )
  }
}
```

## 5. License

MIT Licensed. Copyright (c) TuanTVK 2019.