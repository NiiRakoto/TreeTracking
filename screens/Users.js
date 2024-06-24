import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, Alert, FlatList, Modal, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/style';
import { ImageBackground } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as ImageManipulator from 'expo-image-manipulator';

const Users = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedMatricule, setEditedMatricule] = useState('');
  const [editedNom, setEditedNom] = useState('');
  const [editedPrenoms, setEditedPrenoms] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedFonction, setEditedFonction] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [editedLocation, setEditedLocation] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [step, setStep] = useState(1);

  const confirmDelete = (matriculeToDelete) => {
    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: () => deleteData(matriculeToDelete),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };


  const getLocation = async (setter) => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLoading(false);
      Alert.alert('Permission refusée', 'La permission d\'accès à la localisation a été refusée');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    setter(location.coords);
    setLoading(false);
  };

  const takePhoto = async (setter) => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'La permission d\'accès à l\'appareil photo a été refusée');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 600 } }],
        { compress: 0.6, format: ImageManipulator.SaveFormat.JPEG }
      );
      setter(manipResult.uri);
    }
  };

  const readData = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers !== null) {
        setUsers(JSON.parse(storedUsers));
      } else {
        Alert.alert('Oups !', 'Aucun données');
      }
    } catch (e) {
      Alert.alert('Oups !', 'Accès a la base de donneée interdit');
    }
  };

  const deleteData = async (matriculeToDelete) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
      const updatedUsers = usersArray.filter(user => user.matricule !== matriculeToDelete);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      Alert.alert('Effacé !', 'Utilisateur effacé avec succes');
    } catch (e) {
      Alert.alert('Oups !', 'Interdiction de suppression');
    }
  };

  const editData = (user) => {
    setSelectedUser(user);
    setEditedMatricule(user.matricule);
    setEditedNom(user.nom);
    setEditedPrenoms(user.prenoms);
    setEditedAge(user.age);
    setEditedFonction(user.fonction);
    setEditedEmail(user.email);
    setEditedPassword(user.password);
    setEditedLocation(user.location);
    setEditedImage(user.image);
    setStep(1);
    setIsModalVisible(true);
  };

  const updateData = async () => {
    if (!editedMatricule || !editedNom || !editedPrenoms || !editedAge || !editedFonction || !editedEmail || !editedPassword || !editedLocation || !editedImage) {
      Alert.alert('Oups !', 'Veuillez completer tous les champs');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      let usersArray = storedUsers ? JSON.parse(storedUsers) : [];

      // Check for duplicate matricule
      const duplicateUser = usersArray.find(user => user.matricule === editedMatricule && user.matricule !== selectedUser.matricule);
      if (duplicateUser) {
        Alert.alert('Oups !', 'Le matricule existe déjà');
        return;
      }

      usersArray = usersArray.map(user =>
        user.matricule === selectedUser.matricule
          ? { ...user, matricule: editedMatricule, nom: editedNom, prenoms: editedPrenoms, age: editedAge, fonction: editedFonction, email: editedEmail, password: editedPassword, location: editedLocation, image: editedImage }
          : user
      );

      await AsyncStorage.setItem('users', JSON.stringify(usersArray));
      setUsers(usersArray);
      setIsModalVisible(false);
      Alert.alert('Success', 'Utilisateur modifié');
    } catch (e) {
      Alert.alert('Oups !', 'Interdiction de la modification');
    }
  };

  readData();

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TextInput style={styles.inputUpdate} placeholder="Matricule" value={editedMatricule} onChangeText={setEditedMatricule} keyboardType="numeric" />
            <TextInput style={styles.inputUpdate} placeholder="Nom" value={editedNom} onChangeText={setEditedNom} />
            <TextInput style={styles.inputUpdate} placeholder="Prenoms" value={editedPrenoms} onChangeText={setEditedPrenoms} />
            <TextInput style={styles.inputUpdate} placeholder="Age" value={editedAge} onChangeText={setEditedAge} keyboardType="numeric" />
            <TextInput style={styles.inputUpdate} placeholder="Fonction" value={editedFonction} onChangeText={setEditedFonction} />
            <TextInput style={styles.inputUpdate} placeholder="Email" value={editedEmail} onChangeText={setEditedEmail} />
            <TextInput style={styles.inputUpdate} placeholder="Mot de passe" value={editedPassword} onChangeText={setEditedPassword} />

            <View style={styles.btnPrecNext}>
              <TouchableOpacity style={[styles.btnPrec, styles.btnGray]} onPress={() => setIsModalVisible(false)}>

              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={() => setStep(2)}>
                <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        );
      case 2:
        return (
          <>

            <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={() => getLocation(setEditedLocation)}>
              <FontAwesomeIcon name="map" size={20} color="#000" />
              <Text style={styles.btnTextBlack}> Obtenir la localisation</Text>
            </TouchableOpacity>


            {loading && <ActivityIndicator size="large" color="#fff" />}
            {editedLocation && (
              <>
                <Text style={styles.description}></Text>

                <Text style={styles.description}>Latitude: {editedLocation.latitude}</Text>
                <Text style={styles.description}>Longitude: {editedLocation.longitude}</Text>
              </>
            )}
            <View style={styles.btnPrecNext}>
              <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={() => setStep(1)}>
                <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={() => setStep(3)}>
                <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={() => takePhoto(setEditedImage)}>
              <FontAwesomeIcon name="camera" size={20} color="#000" />
              <Text style={styles.btnTextBlack}>  Prendre une photo</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#fff" />}
            {editedImage && <Image source={{ uri: editedImage }} style={styles.image} />}



            <View>
              <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={() => setStep(2)}>
                <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={updateData}>
                <FontAwesomeIcon name="check" size={20} color="#fff" />
                <Text style={styles.btnTextWhite}>  Enregistrer</Text>
              </TouchableOpacity>
            </View>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('../assets/4.jpg')} style={styles.backgroundImage}>
      <Text style={styles.title}>Les données enregistrées</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.matricule}
        renderItem={({ item }) => (
          <View style={styles.storedDataContainer}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.storedDataTitle}>{item.nom} {item.prenoms}</Text>
            <Text style={styles.storedData}>Agé de {item.age} ans</Text>
            <Text style={styles.storedData}>Fonction: {item.fonction}</Text>
            <Text style={styles.storedData}>Numéro matricule: {item.matricule}</Text>
            <Text style={styles.storedData}>Email: {item.email}</Text>
            {item.location && (
              <>
                <Text style={styles.storedDataSmall}>Latitude : {item.location.latitude}</Text>
                <Text style={styles.storedDataSmall}>Longitude : {item.location.longitude}</Text>
              </>
            )}
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.buttonGroup} onPress={() => editData(item)}>
                <FontAwesomeIcon name="edit" size={34} color="#69F" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonGroup} onPress={() => confirmDelete(item.matricule)}>
                <FontAwesomeIcon name="remove" size={34} color="#f11" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonGroup} onPress={() => navigation.navigate('Maps', { user: item })}>
                <FontAwesomeIcon name="map-marker" size={34} color="#080" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modifier</Text>
            {renderStepContent()}

            <Text style={styles.storedData}>               </Text>
            <View style={styles.buttonX}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <FontAwesomeIcon name="remove" size={34} color="#f11" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Users;
