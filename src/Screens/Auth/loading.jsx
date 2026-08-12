import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Loading = () => {
  const navigation = useNavigation();


  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f2846" />
      <Video
        source={require('../../assets/logo_video.mp4')}
        style={styles.video}
        resizeMode="cover"
        repeat={false}
        muted={true}
        paused={false}
        onEnd={() => navigation.replace('Login')}
        onError={() => navigation.replace('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2846',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: wp(100),
    height: hp(30),
  },
});

export default Loading;
