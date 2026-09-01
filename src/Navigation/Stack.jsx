import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loading from '../Screens/Auth/loading'
import Login from '../Screens/Auth/Login'
import SignUp from '../Screens/Auth/Signup'
import ForgotPassword from '../Screens/Auth/ForgotPassword'
import ResetPassword from '../Screens/Auth/ResetPassword'
import NewPassword from '../Screens/Auth/NewPassword'
import Home from '../Screens/Main/Home'
import Shop from '../Screens/Main/Shop'
import Multiplayer from '../Screens/Main/Multiplayer'
import PublicMatch from '../Screens/Main/publicMatch'
import PrivateMatch from '../Screens/Main/privateMatch'
import CreateMatch from '../Screens/Main/createMatch'
import Challenges from '../Screens/Main/Challenges'
import EnergyPacks from '../Screens/Main/energyPacks'
import Notifaction from '../Screens/Main/Notifaction'
import Tormament from '../Screens/Main/Tormament'
import TournamentDetial from '../Screens/Main/TournamentDetial'



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
        <Stack.Screen name="Shop" component={Shop} />
        <Stack.Screen name="Multiplayer" component={Multiplayer} />
        <Stack.Screen name="PublicMatch" component={PublicMatch} />
        <Stack.Screen name="PrivateMatch" component={PrivateMatch} />
        <Stack.Screen name="CreateMatch" component={CreateMatch} />
        <Stack.Screen name="Challenges" component={Challenges} />
        <Stack.Screen name="EnergyPacks" component={EnergyPacks} />
        <Stack.Screen name="Notifaction" component={Notifaction} />
        <Stack.Screen name="Tormament" component={Tormament} />
        <Stack.Screen name="TournamentDetial" component={TournamentDetial} />
        
    </Stack.Navigator>
  )
}

export default StackNavigation