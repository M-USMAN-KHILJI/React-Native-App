import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loading from '../Screens/Auth/loading'
import Login from '../Screens/Auth/Login'
import SignUp from '../Screens/Auth/Signup'
import ForgotPassword from '../Screens/Auth/ForgotPassword'
import ResetPassword from '../Screens/Auth/ResetPassword'
import NewPassword from '../Screens/Auth/NewPassword'
import Home from '../Screens/Main/Home'

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Loading">
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

export default StackNavigation