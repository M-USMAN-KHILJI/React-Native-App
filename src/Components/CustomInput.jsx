import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONT_SIZES } from '../Const/Display';

const CustomInput = ({ iconName, placeholder, iconRight ,...props }) => {
  return (
    <View style={styles.inputContainer}>
      {iconName && (
        <FontAwesome
          name={iconName}
          size={hp('2.2px')}
          color={COLORS.personIcon}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeHolderColor}
        fontSize={FONT_SIZES.h6}
        {...props}
      />

            {iconRight && (
        <View style={styles.rightIcon}>
          {iconRight}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.5px'),
    marginLeft: wp('4px'),
    borderWidth: wp('0.5px'),
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.inputBackground,
    height: hp('7px'),
    width: wp('78px'),
    borderRadius: wp('10px'),
    paddingHorizontal: wp('4%'),


  },
  input: {
    flex: 1,
    marginLeft: wp('3px'),
    color: COLORS.textColor,
  },
  icon: {
    marginLeft: wp('2px'),
  },
  rightIcon: {
  marginRight: wp('1px'),
  marginBottom:hp('0.6px'),
},
});

export default CustomInput;