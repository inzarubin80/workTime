import React from 'react';
import { ScrollView as ScrollViewRN } from 'react-native';

const ScrollView = ({ children }) => (
  <ScrollViewRN
    scrollEnabled={true}
    showsVerticalScrollIndicator={true}
    keyboardShouldPersistTaps="always"
    keyboardDismissMode='on-drag'
    scrollEventThrottle={50}
    delayPressIn={0}
  >
    {children}
  </ScrollViewRN>
);

export default ScrollView;