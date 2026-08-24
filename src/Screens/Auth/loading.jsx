import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAuth } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { getAuthSession } from '../../api/session';

const Loading = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const navigateAfterSplash = async () => {
      try {
        const session = await getAuthSession();
        const firebaseUser = getAuth().currentUser;
        const user = session || (firebaseUser && {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });

        if (isMounted && user) {
          dispatch(setUser(user));
        }

        setTimeout(() => {
          if (isMounted) {
            navigation.replace(user ? 'Home' : 'Login');
          }
        }, 3000);
      } catch (error) {
        if (isMounted) {
          setTimeout(() => navigation.replace('Login'), 3000);
        }
      }
    };

    navigateAfterSplash();

    return () => {
      isMounted = false;
    };
  }, [dispatch, navigation]);

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
        onEnd={() => {}}
        onError={() => {}}
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
