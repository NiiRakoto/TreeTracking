// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

// Composant d'exemple pour le contenu du Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// Composant d'écran
function HomeScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title="Open Bottom Drawer"
        onPress={toggleModal}
      />
      <Button
        title="Open Left Drawer"
        onPress={() => navigation.openDrawer()}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.drawer}>
          <Text>Bottom Drawer Content</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

// Drawer venant de la gauche
const LeftDrawer = createDrawerNavigator();
function LeftDrawerNavigator() {
  return (
    <LeftDrawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        width: '80%', // Vous pouvez ajuster la largeur
      }}
    >
      <LeftDrawer.Screen name="Home" component={HomeScreen} />
    </LeftDrawer.Navigator>
  );
}

// Conteneur de navigation principal
function App() {
  return (
    <NavigationContainer>
      <LeftDrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  drawer: {
    height: '50%',
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default App;
