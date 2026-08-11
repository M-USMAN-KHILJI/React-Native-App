import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONT_SIZES } from '../Const/Display';
import google from '../assets/google.png';

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.googleContainer}>
        <View>
          <Image source={google} style={styles.google} />
        </View>
        <View>
          <Text style={styles.googleText}>Continue with Google</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  google: {
    width: wp('7%'),
    height: hp('3%'),
    marginLeft: wp('3%'),
  },
  googleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginLeft: wp('6%'),
    marginBottom: hp('20%'),
    borderWidth: wp('0.5%'),
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.inputBackground,
    width: wp('75%'),
    height: hp('6.5%'),
    borderRadius: wp('10%'),
    paddingHorizontal: wp('4%'),
  },
  googleText: {
    color: COLORS.textColor,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
    marginLeft: wp('2.5%'),
  },
});

export default GoogleButton;
