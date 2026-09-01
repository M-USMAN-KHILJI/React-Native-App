import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { wp, hp, COLORS, FONT_SIZES, MaterialCommunityIcons } from '../api/Index';

const ScreenHarder = ({ title = "MULTIPLAYER", subtitle = "HAITIAN CARD LOUNGE", onPress , iconstyle , textstyle, rightIcon, onRightPress }) => {
  return (
    <View style={[styles.harder]}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={[styles.iconback , iconstyle]}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={COLORS.eyeIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={[styles.textcon, { flex: 1 }]}>
        <Text style={[styles.text , textstyle]}>{subtitle}</Text>
        <Text style={[styles.title , textstyle]}>{title}</Text>
      </View>

      {rightIcon && (
        <TouchableOpacity activeOpacity={0.8} onPress={onRightPress}>
          <View style={[styles.iconback, iconstyle, { marginRight: wp(4), paddingLeft: 0, paddingTop: 0, justifyContent: 'center', alignItems: 'center' , marginTop : hp(2.5) }]}>
            <MaterialCommunityIcons
              name={rightIcon}
              size={25}
              color={COLORS.eyeIcon}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconback: {
    marginLeft: wp(4),
    marginTop: hp(2),
    borderWidth: wp(0.3),
    width: wp(10),
    height: hp(4.5),
    borderColor: COLORS.eyeIcon,
    paddingLeft: wp(1.4),
    paddingTop: hp(0.6),
    borderRadius: wp(20),
  },
  text: {
    color: COLORS.toPlay,
    letterSpacing: wp(0.4),
    marginTop: hp(2),
    // textAlign: 'center',
    marginLeft: wp(4),
  },
  title: {
    color: COLORS.eyeIcon,
    fontSize: FONT_SIZES.h6,
    fontWeight: 'bold',
    marginLeft: wp(4),
  },
  harder: {
    flexDirection: 'row',
  },
  textcon: {},
});

export default ScreenHarder;
