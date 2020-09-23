import React from 'react';

const SelectItemCustom = ({ customItem, item, onPress }) => (
  <React.Fragment>
    {customItem(item, onPress)}
  </React.Fragment>
);

export default SelectItemCustom;