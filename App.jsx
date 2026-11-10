import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/Navigation/Stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Orientation from 'react-native-orientation-locker';
import { useEffect } from 'react';




const App = () => {


  useEffect(() => {
    // Lock the entire app to portrait
    Orientation.lockToPortrait();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>  
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
