import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONT_SIZES } from '../Const/Display';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

const AuthHeader = ({ title }) => {
  return (
    <View>
      <View style={styles.imageContainer}>
        <View style={styles.videoWrapper}>
          <Video 
            source={require('../assets/logo_video.mp4')}
            style={styles.logo} 
            repeat={true} 
            resizeMode="cover" 
            muted={true}
            playInBackground={false}
            playWhenInactive={false}
            disableFocus={true}
          />
        </View>
      </View>

      <View style={styles.signInView}>
        <Text style={styles.signIn}>{title}</Text>
      </View>

      {/* <View style={styles.line} /> */}
      <LinearGradient
  colors={[
    'transparent',
    '#F2D067',
    '#FFE38A',
    '#F2D067',
    'transparent',
  ]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.goldLine}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(32),
    height: hp(14),
    borderRadius: wp(17.5),
    backgroundColor: '#2F3336',
    alignSelf: 'center',
    marginTop: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoWrapper: {
    width: wp(23),
    height: hp(10),
    borderRadius: wp(8),
    borderWidth: wp(0.5),
    borderColor: COLORS.logoBorder,
    overflow: 'hidden',
  },
  logo: {
    width: wp(23.2),
    height: hp(10),
  },
  signIn: {
    color: COLORS.textColor,
    fontSize: FONT_SIZES.h1,
    fontWeight: 'bold',
    marginTop: hp(2),
    alignSelf: 'center',
    textAlign: 'center',
  },
  line: {
    width: wp(38),
    height: hp(0.15),
    backgroundColor: COLORS.personIcon,
    marginTop: hp(0.8),
    alignSelf: 'center',
  },
  goldLine: {
  width: wp(38),
  height: hp(0.25),
  alignSelf: 'center',
  marginTop: hp(1),

  shadowColor: '#FFD54F',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 1,
  shadowRadius: 8,

  elevation: 8,
}
});

export default AuthHeader;