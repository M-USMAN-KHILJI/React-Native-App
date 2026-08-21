import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { wp, hp, COLORS, FONT_SIZES, MaterialCommunityIcons } from '../api/Index';

const ScreenHarder = ({ title = "MULTIPLAYER", subtitle = "HAITIAN CARD LOUNGE", onPress }) => {
  return (
    <View style={styles.harder}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.iconback}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={COLORS.eyeIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.textcon}>
        <Text style={styles.text}>{subtitle}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconback: {
    marginLeft: wp(4),
    marginTop: hp(2),
    borderWidth: wp(0.3),
    width: wp(11),
    height: hp(5),
    borderColor: COLORS.eyeIcon,
    paddingLeft: wp(1),
    paddingTop: hp(0.5),
    borderRadius: wp(20),
  },
  text: {
    color: COLORS.toPlay,
    letterSpacing: wp(0.6),
    marginTop: hp(2),
    textAlign: 'center',
    marginLeft: wp(4),
  },
  title: {
    color: COLORS.eyeIcon,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    marginLeft: wp(4),
  },
  harder: {
    flexDirection: 'row',
  },
  textcon: {},
});

export default ScreenHarder;
