import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { hp, COLORS, FONT_SIZES } from '../../api/Index';

const Collection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Collection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h5,
    fontWeight: '700',
  },
});

export default Collection;
