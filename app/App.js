import * as React from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from './Components/SplashScreen';
import AuthContainer from './Containers/AuthContainer';
import HomeContainer from './Containers/HomeContainer';
import MembersContainer from './Containers/MembersContainer';
import ActivityContainer from './Containers/ActivityContainer';
import AccountContainer from './Containers/AccountContainer';
import SearchContactContainer from './Containers/SearchContactContainer';
import { colors } from './utils/colors';
import { UserProvider } from './context/UserContext';
import PublishPost1 from './Containers/publish/PublishPost1';
import PublishPost2 from './Containers/publish/PublishPost2';

const RootStack = createNativeStackNavigator();
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

function AuthStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName={"Splash"} screenOptions={{ headerTransparent: true }}>
      <LoginStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <LoginStack.Screen name="Login" component={AuthContainer} options={{ headerShown: false, gestureEnabled: false }} />
      <LoginStack.Screen name="SearchContact" component={SearchContactContainer} options={{ headerShown: false, gestureEnabled: false }} />
    </LoginStack.Navigator>
  );
}

function MainTabStackScreen({ navigation }) {
  return (
    <MainTabSatck.Navigator initialRouteName={"Home"} screenOptions={{ headerTransparent: true }}>
      <MainTabSatck.Screen name="Home" component={HomeContainer} options={{ ...tabBarOptions, title: 'Explorer', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Members" component={MembersContainer} options={{ ...tabBarOptions, title: 'Membres', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Publish" component={PublishPost1} listeners={{ tabPress: (e) => {e.preventDefault(); navigation.navigate("ModalStack")}}} options={{ ...tabBarOptions, title: 'Publier', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Activity" component={ActivityContainer} options={{ ...tabBarOptions, title: 'Activité', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Account" component={AccountContainer} options={{ ...tabBarOptions, title: 'Profil', tabBarIcon: (props) => (<Image source={props.focused ? userIconActive : userIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
    </MainTabSatck.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="AuthStack"
            component={AuthStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Screen
            name="MainStack"
            component={MainTabStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Group
            screenOptions={{
              presentation: "transparentModal",
              headerShown: false,
            }}
          >
            <RootStack.Screen name="ModalStack" component={PublishPost1}/>
            <RootStack.Screen name="PublishPost2" component={PublishPost2}/>
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}