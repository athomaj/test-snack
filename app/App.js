import * as React from 'react';
import { Image, View } from 'react-native';
import { useFonts } from 'expo-font/build/FontHooks';
import AppLoading from 'expo-app-loading';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthContainer from './Containers/AuthContainer';
import HomeContainer from './Containers/HomeContainer';
import AccountContainer from './Containers/AccountContainer';
import SearchContactContainer from './Containers/SearchContactContainer';
import OnboardingContainer from './Containers/OnboardingContainer';
import PublishPost1 from './Containers/publish/PublishPost1';
import PublishPost2 from './Containers/publish/PublishPost2';
import PublishPost3 from './Containers/publish/PublishPost3';
import PublishPost4 from './Containers/publish/PublishPost4';
import PostPublished from './Containers/publish/PostPublished';

import SplashScreen from './Components/SplashScreen';
import PublishParentComponent from './Components/PublishParentComponent';
import ChatContainer from './Containers/Chat/ChatContainer';

import { PostDetailComponent } from './Components/PostDetailComponent';

import PendingsContainer from './Containers/PendingsContainer';
import ProfilContainer from './Containers/ProfilContainer';

import { UserProvider, useUserContext } from './context/UserContext';
import { PublishProvider } from './context/PublishContext';

import { colors } from './utils/colors';
import MealContainer from './Containers/MealContainer';

//SIGNUP
import SignUpStep1Container from './Containers/signUp/SignUpStep1Container';
import SignUpStep2Container from './Containers/signUp/SignUpStep2Container';
import SignUpStep3Container from './Containers/signUp/SignUpStep3Container';
import SignUpStep4Container from './Containers/signUp/SignUpStep4Container';
import { SignUpProvider } from './context/SignUpContext';
//Profil
import UpdateProfil from './Containers/CompletProfil/UpdateProfil';
import CompletProfil1 from './Containers/CompletProfil/CompleteProfil1';
import CompletProfil2 from './Containers/CompletProfil/CompleteProfil2';
import CompletProfil3 from './Containers/CompletProfil/CompleteProfil3';
import CompletProfil4 from './Containers/CompletProfil/CompleteProfil4';
import CompletProfil5 from './Containers/CompletProfil/CompleteProfil5';
import ChatDetailsContainer from './Containers/Chat/ChatDetailsContainer';


const RootStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const MainTabSatck = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
const PublishStack = createNativeStackNavigator();
const ActivityStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

const homeIconActive = require('./assets/tabBar/loupeIconActive.png')
const homeIconInactive = require('./assets/tabBar/loupeIcon.png')
const eventIconActive = require('./assets/tabBar/eventIconActive.png')
const eventIconInactive = require('./assets/tabBar/eventIcon.png')
const addIconIconActive = require('./assets/tabBar/addIconActive.png')
const addIconIconInactive = require('./assets/tabBar/addIcon.png')
const messageIconActive = require('./assets/tabBar/messageIconActive.png')
const messageIconInactive = require('./assets/tabBar/messageIcon.png')
const userIconActive = require('./assets/tabBar/userIcon.png')
const userIconInactive = require('./assets/tabBar/userIcon.png')

const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.orange1,
  tabBarInactiveTintColor: colors.darkGreen,
  tabBarLabelStyle: { fontWeight: 'normal', fontSize: 10, paddingBottom: 4}
}


function AuthStackScreen() {
  return (
    <SignUpProvider>
      <LoginStack.Navigator initialRouteName={"Splash"} screenOptions={{ headerTransparent: true }}>
        <LoginStack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="onboarding" component={OnboardingContainer} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="Login" component={AuthContainer} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="SignUpStep1" component={SignUpStep1Container} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="SignUpStep2" component={SignUpStep2Container} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="SignUpStep3" component={SignUpStep3Container} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="SignUpStep4" component={SignUpStep4Container} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="SearchContact" component={SearchContactContainer} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="UpdateProfil1" component={CompletProfil1} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="UpdateProfil2" component={CompletProfil2} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="UpdateProfil3" component={CompletProfil3} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="UpdateProfil4" component={CompletProfil4} options={{ headerShown: false, gestureEnabled: false }} />
        <LoginStack.Screen name="UpdateProfil5" component={CompletProfil5} options={{ headerShown: false, gestureEnabled: false }} />
      </LoginStack.Navigator>
    </SignUpProvider>
  );
}

function ProfilStackScreen() {
  return (
    <ProfilStack.Navigator initialRouteName={"Account"} screenOptions={{ headerShown: false, headerTransparent: true }}>
      <ProfilStack.Screen name="Account" component={AccountContainer} />
      <ProfilStack.Screen name="Pendings" component={PendingsContainer} />
      <ProfilStack.Screen name="Profil" component={ProfilContainer} />
      <ProfilStack.Screen name="UpdateProfil" component={UpdateProfil} />
      <ProfilStack.Screen name="UpdateProfil2" component={CompletProfil2} options={{ headerShown: false, gestureEnabled: false }} />
      <ProfilStack.Screen name="UpdateProfil3" component={CompletProfil3} options={{ headerShown: false, gestureEnabled: false }} />
      <ProfilStack.Screen name="UpdateProfil4" component={CompletProfil4} options={{ headerShown: false, gestureEnabled: false }} />
      <ProfilStack.Screen name="SignUpStep3" component={ SignUpStep3Container } options={{ headerShown: false, gestureEnabled: false }} />
    </ProfilStack.Navigator>
  );
}

function MainTabStackScreen({ navigation }) {
  const userContext = useUserContext()

  return (
    <MainTabSatck.Navigator initialRouteName={"Home"} screenOptions={{ tabBarStyle: { height: 70},headerTransparent: true, tabBarBackground: (() => (<View style={{backgroundColor: colors.backgroundColor, width: '100%', height: 70}}></View>)) }}>
      <MainTabSatck.Screen name="Home" component={HomeContainer} options={{ ...tabBarOptions, title: 'Explorer', tabBarIcon: (props) => (<Image source={props.focused ? homeIconActive : homeIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Meals" component={MealContainer} options={{ ...tabBarOptions, title: 'Repas', tabBarIcon: (props) => (<Image source={props.focused ? eventIconActive : eventIconInactive} style={{ height: 30, width: 30, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="Publish" component={PublishParentComponent} listeners={{ tabPress: (e) => { e.preventDefault(); navigation.navigate("PublishStack") } }} options={{ ...tabBarOptions, title: '', tabBarIcon: (props) => (<Image source={props.focused ? addIconIconActive : addIconIconInactive} style={{ height: 50, width: 50, resizeMode: 'contain', position: 'absolute', top: 12.5 }}></Image>) }} />
      <MainTabSatck.Screen name="ActivityStack" component={ActivityStackScreen} options={{ ...tabBarOptions, title: 'Activité', tabBarIcon: (props) => (<Image source={props.focused ? messageIconActive : messageIconInactive} style={{ height: 25, width: 25, resizeMode: 'contain' }}></Image>) }} />
      <MainTabSatck.Screen name="AccountStack" component={ProfilStackScreen} options={{ ...tabBarOptions, title: 'Account', tabBarIcon: (props) => (<Image source={userContext.authState.user.avatarUrl ? { uri: userContext.authState.user.avatarUrl } : (props.focused ? userIconActive : userIconInactive)} style={{ height: 25, width: 25, resizeMode: 'cover', borderWidth: 1, borderColor: colors.primaryBlue, borderRadius: 13 }}></Image>) }} />
    </MainTabSatck.Navigator>
  );
}

function PublishStackScreen({ navigation }) {
  return (
    <PublishStack.Navigator initialRouteName={"PublishPost1"} screenOptions={{ headerTransparent: true, headerShown: false }}>
      <PublishStack.Screen name="PublishPost1" component={PublishPost1} />
      <PublishStack.Screen name="PublishPost2" component={PublishPost2} />
      <PublishStack.Screen name="PublishPost3" component={PublishPost3} />
      <PublishStack.Screen name="PublishPost4" component={PublishPost4} />
      <PublishStack.Screen name="PostPublished" component={PostPublished} />
    </PublishStack.Navigator>
  );
}

function ActivityStackScreen({ navigation }) {
  return (
    <ActivityStack.Navigator initialRouteName={"Chat"} screenOptions={{ headerTransparent: true, headerShown: false }}>
      <ActivityStack.Screen name="Chat" component={ChatContainer} />
      <ActivityStack.Screen name="ChatDetails" component={ChatDetailsContainer} />
    </ActivityStack.Navigator>
  );
}

export default function App() {

    const [loadedFonts] = useFonts({
      Inter: require("./assets/fonts/Inter.ttf"),
      Syne: require("./assets/fonts/Syne.ttf")

  });

  if (!loadedFonts) {
      return <AppLoading />;
  }


  return (
    <UserProvider>
      <PublishProvider>
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
                headerShown: false
              }}
            >
              <RootStack.Screen
                name="PublishStack"
                component={PublishStackScreen}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <RootStack.Screen
                name="PostDetail"
                component={PostDetailComponent}
                options={{ headerShown: false, gestureEnabled: false }}
              />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </PublishProvider>
    </UserProvider>
  );
}