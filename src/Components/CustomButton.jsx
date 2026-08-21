import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({ title, onPress, buttonStyle, textStyle , icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={["#B58611", "#C59B22", "#D9B53D", "#DDB941"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.signInButton, buttonStyle]}
      >
        {icon}
        <Text style={[styles.signInText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    width: wp('75%'),
    height: hp('6%'),
    borderRadius: 100,
    borderColor: '#F7DA6A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signInText: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: '#141414',
    letterSpacing: 0.3,
  },
});

export default CustomButton;
