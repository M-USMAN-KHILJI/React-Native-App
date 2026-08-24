import { useDispatch } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { setUser, clearUser } from '../redux/authSlice';
import { clearAuthSession, saveAuthSession } from './session';

export default function useGoogleSignIn() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const finishSignIn = async (idToken) => {
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(getAuth(), googleCredential);

    const { displayName, email, photoURL, uid } = userCredential.user;
    const user = { name: displayName, email, photoURL, uid };
    await saveAuthSession(user);
    dispatch(setUser(user));

    // Reset the stack instead of navigate() — this wipes out the Login
    // screen from history, so the back button/gesture has nothing to
    // pop back to. The only way "back" to Login works again is onLogout,
    // which resets the stack the other way.
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  const onGooglePress = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      // Always clear the cached account first, so the picker shows every time
      try {
        await GoogleSignin.signOut();
      } catch (_) {
        // ignore if nothing was signed in
      }

      const response = await GoogleSignin.signIn();
      if (response.type !== 'success') {
        return; // user cancelled the picker
      }
      await finishSignIn(response.data.idToken);
    } catch (error) {
      console.log('Google Sign-In error code:', error.code);
      console.log('Google Sign-In error message:', error.message);
      Alert.alert('Google Sign-In Error', `Code: ${error.code}\nMessage: ${error.message}`);
    }
  };

  const onLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await getAuth().signOut();
      await clearAuthSession();
      dispatch(clearUser());

      // Same idea in reverse: reset the stack to Login so Home is
      // wiped from history too.
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return { onGooglePress, onLogout };
}