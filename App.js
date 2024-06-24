import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import Info from './screens/Info';
import Item from './screens/Item';
import Ajouter from './screens/Ajouter';
import Users from './screens/Users';
import Maps from './screens/Maps';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Info" component={Info} />
      <HomeStack.Screen name="Item" component={Item} />
      <HomeStack.Screen name="Ajouter" component={Ajouter} />
      <HomeStack.Screen name="Users" component={Users} />
      <HomeStack.Screen name="Maps" component={Maps} />
    </HomeStack.Navigator>
  );
}

const InfoStack = createStackNavigator();
function InfoStackScreen() {
  return (
    <InfoStack.Navigator screenOptions={{ headerShown: false }}>
      <InfoStack.Screen name="Info" component={Item} />
    </InfoStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={Maps} />
    </LoginStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const CustomDrawerContent = (props) => {
  const [imageUri, setImageUri] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const image = await AsyncStorage.getItem('imageUri');
        const buttons = await AsyncStorage.getItem('buttons');
        const storedUsers = await AsyncStorage.getItem('users');
        setImageUri(image);
        setButtons(buttons ? JSON.parse(buttons) : []);
        setUsers(storedUsers ? JSON.parse(storedUsers) : []);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const handleUserPress = (user) => {
    props.navigation.navigate('Maps', { user });
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent} >
      {imageUri && <Image source={{ uri: imageUri }} style={styles.drawerImage} />}
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.drawerButton}
          onPress={() => props.navigation.navigate(button.screen)}
        >
          <Text style={styles.drawerButtonText}>{button.label}</Text>
        </TouchableOpacity>
      ))}
      {users.map((user, index) => (
        <TouchableOpacity key={index} style={styles.userContainer} onPress={() => handleUserPress(user)}>
          {user.image && <Image source={{ uri: user.image }} style={styles.userImage} />}
          <Text style={styles.userName}>{user.nom} {user.prenoms}</Text>
        </TouchableOpacity>
      ))}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const LeftDrawer = createDrawerNavigator();
function LeftDrawerNavigator() {
  return (
    <LeftDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#222',
          width: '80%', // Vous pouvez ajuster la largeur
        },
        drawerActiveTintColor: '#FFF',
        drawerInactiveTintColor: '#bbb',
        headerStyle: {
          backgroundColor: '#222',
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <LeftDrawer.Screen name="TreeTracking" component={HomeTabNavigator} />
    </LeftDrawer.Navigator>
  );
}

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeBar') {
            iconName = 'home';
          } else if (route.name === 'InfoBar') {
            iconName = 'info-circle';
          } else if (route.name === 'MapsBar') {
            iconName = 'sign-in';
          }
          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color, size }) => {
          let labelColor = focused ? 'green' : 'white';
          return (
            <Text style={{ color: labelColor, fontSize: size }}>
              {route.name === 'HomeBar' ? 'Accueil' : (route.name === 'MapsBar' ? 'Maps' : 'A propos')}
            </Text>
          );
        },
        tabBarStyle: {
          backgroundColor: '#151515',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: 'green', // Change la couleur de l'icône lorsque l'onglet est sélectionné
        tabBarInactiveTintColor: 'gray', // Change la couleur de l'icône lorsque l'onglet n'est pas sélectionné
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeBar" component={HomeStackScreen} options={{ title: 'Accueil' }} />
      <Tab.Screen name="MapsBar" component={LoginStackScreen} options={{ title: 'Maps' }} />
      <Tab.Screen name="InfoBar" component={InfoStackScreen} options={{ title: 'A propos' }} />
    </Tab.Navigator>
  );
}

function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground source={require('./assets/1.jpg')} style={styles.backgroundImage}>
      <NavigationContainer>
        <LeftDrawerNavigator />
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#111',
  },
  drawerContent: {
    backgroundColor: '#111',
  },
  drawerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  drawerButton: {
    padding: 10,
    backgroundColor: '#222',
    marginVertical: 5,
    borderRadius: 5,
  },
  drawerButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: '#fff',
  },
});

export default App;
