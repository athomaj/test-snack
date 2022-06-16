import * as React from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './Components/SplashScreen';
import AuthContainer from './Containers/AuthContainer';
import HomeContainer from './Containers/HomeContainer';
import AccountContainer from './Containers/AccountContainer';
import RegisterContainer from './Containers/RegisterContainer';
import { colors } from './utils/colors';
import { UserProvider } from './context/UserContext';

const RootStack = createNativeStackNavigator();
const SplashStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const MainTabSatck = createBottomTabNavigator()

const homeIconActive = require('./assets/tabBar/loupeIcon.png')
const homeIconInactive = require('./assets/tabBar/loupeIcon.png')
const userIconActive = require('./assets/tabBar/userIcon.png')
const userIconInactive = require('./assets/tabBar/userIcon.png')

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.black,
  tabBarLabelStyle: { fontWeight: 'normal', fontSize: 10 }
}

function SplashStackScreen() {
  return (
    <SplashStack.Navigator initialRouteName={"Splash"} screenOptions={{ headerTransparent: true }}>
      <SplashStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </SplashStack.Navigator>
  );
}
function RegisterStackScreen(){
  return (
    <LoginStack.Navigator initialRouteName={"Register"} screenOptions={{ headerTransparent: true }}>
      <LoginStack.Screen name="Register" component={RegisterContainer} options={{ headerShown: false, gestureEnabled: false }} />
    </LoginStack.Navigator>
  )
}
function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName={"Login"} screenOptions={{ headerTransparent: true }}>
      <LoginStack.Screen name="Login" component={AuthContainer} options={{ headerShown: false, gestureEnabled: false }} />
    </LoginStack.Navigator>
  );
}

function MainTabStackScreen() {
  return (
    <MainTabSatck.Navigator initialRouteName={"Home"} screenOptions={{ headerTransparent: true }}>
      <MainTabSatck.Screen name="Home" component={HomeContainer} options={{ ...tabBarOptions, title: 'Accueil', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Account" component={AccountContainer} options={{ ...tabBarOptions, title: 'Accueil', tabBarIcon: (props) => (<Image source={props.focused ? userIconActive : userIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
    </MainTabSatck.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="SplashStack"
            component={SplashStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Screen
            name="RegisterStack"
            component={RegisterStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Screen
            name="AuthStack"
            component={LoginStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Screen
            name="MainStack"
            component={MainTabStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}