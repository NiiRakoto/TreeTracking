import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, Alert, ImageBackground, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as ImageManipulator from 'expo-image-manipulator';
import styles from '../styles/style';

const Ajouter = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const [matricule, setMatricule] = useState('');  
  const [nom, setNom] = useState('');  
  const [prenoms, setPrenoms] = useState('');    
  const [age, setAge] = useState(''); 
  const [fonction, setFonction] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkMatriculeExists = async (matricule) => {
    const storedUsers = await AsyncStorage.getItem('users');
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
    return usersArray.some(user => user.matricule === matricule);
  };

  const nextPage = async () => {
    if (page === 1) {
      if (!matricule || !nom || !prenoms || !age || !fonction || !email || !password) {
        Alert.alert('Oups !', 'Veuillez saisir tous les renseignements');
        return;
      }

      const matriculeExists = await checkMatriculeExists(matricule);
      if (matriculeExists) {
        Alert.alert('Oups !', 'Le matricule existe déjà');
        return;
      }
    } else if (page === 2 && !location) {
      Alert.alert('Oups !', 'Veuillez obtenir votre position actuelle');
      return;
    } else if (page === 3 && !image) {
      Alert.alert('Oups !', 'Veuillez prendre une photo');
      return;
    }
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const getLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLoading(false);
      Alert.alert('Permission refusée', 'La permission d\'accès à la localisation a été refusée');
      return;
    }

    let locationData = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    setLocation(locationData.coords);
    setLoading(false);
  };

  const takePhoto = async () => {
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
      setImage(manipResult.uri);
    }
  };

  const encodeImageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const storeData = async () => {
    if (!matricule || !nom || !prenoms  || !age || !fonction || !email || !password || !location || !image) {
      Alert.alert('Oups !', 'Veuillez saisir toutes les données et prendre une photo');
      return;
    }

    try {
      const imageBase64 = await encodeImageToBase64(image);
      const userData = { matricule, nom, prenoms, age, fonction, email, password, location, image: imageBase64 };

      const storedUsers = await AsyncStorage.getItem('users');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

      usersArray.push(userData);

      await AsyncStorage.setItem('users', JSON.stringify(usersArray));

      setMatricule('');
      setNom('');
      setPrenoms('');
      setAge('');
      setFonction('');
      setEmail('');
      setPassword('');
      setLocation(null);
      setImage(null);
      setLoading(false);
      setPage(1);
      Alert.alert('Succès', 'Données enregistrées avec succès');
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
      Alert.alert('Oups !', 'Échec de l\'enregistrement des données');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground source={require('../assets/4.jpg')} style={styles.backgroundImage}>
          {page === 1 && (
            <View style={styles.content}>
              <Text style={styles.title}>Page 1</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrer votre matricule"
                placeholderTextColor="#aaa"
                value={matricule}
                onChangeText={setMatricule}
                keyboardType="numeric"
              />
              <TextInput 
                style={styles.input} 
                placeholder="Entrer votre nom" 
                placeholderTextColor="#aaa"
                value={nom} 
                onChangeText={setNom} 
              />
              <TextInput
                style={styles.input}
                placeholder="Entrer votre prenoms"
                placeholderTextColor="#aaa"
                value={prenoms}
                onChangeText={setPrenoms}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Entrer l'âge" 
                placeholderTextColor="#aaa"
                value={age} 
                onChangeText={setAge} 
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Entrer votre fonction"
                placeholderTextColor="#aaa"
                value={fonction}
                onChangeText={setFonction}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Adresse email"
                placeholderTextColor="#aaa"
                value={email} 
                onChangeText={setEmail} 
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
              />
              <View style={styles.btnPrecNext}>
                <TouchableOpacity style={[styles.btnPrec, styles.btnGray]}>
                  <Text style={styles.btnTextWhite}></Text>
                  <Text style={styles.btnTextWhite}></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={nextPage}>
                  <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {page === 2 && (
            <View style={styles.content}>
              <Text style={styles.title}>Page 2</Text>
              <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={getLocation}>
                <FontAwesomeIcon name="map" size={20} color="#000" />
                <Text style={styles.btnTextBlack}> Obtenir les coordonnées GPS</Text>
              </TouchableOpacity>
              <Text style={styles.subtitle}></Text>
              {loading && <ActivityIndicator size="large" color="#FFF" />}
              {location && (
                <>
                  <Text style={styles.subtitle}>Coordonnées GPS:</Text>
                  <Text style={styles.subtitle}></Text>
                  <Text style={styles.description}>Latitude : {location.latitude}</Text>
                  <Text style={styles.description}>Longitude : {location.longitude}</Text>
                </>
              )}
              <View style={styles.btnPrecNext}>
                <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={prevPage}>
                  <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={nextPage}>
                  <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {page === 3 && (
            <View style={styles.content}>
              <Text style={styles.title}>Page 3</Text>
              <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={takePhoto}>
                <FontAwesomeIcon name="camera" size={20} color="#000" />
                <Text style={styles.btnTextBlack}> Prendre une photo</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              <View style={styles.btnPrecNext}>
                <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={prevPage}>
                  <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={nextPage}>
                  <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {page === 4 && (  
            <View style={styles.content}>
              <Text style={styles.title}>Confirmation</Text>
              <Text style={styles.description}>{nom} {prenoms} </Text>
              <Text style={styles.description}>Agé de {age} ans</Text>
              <Text style={styles.description}>Portant le matricule n° {matricule}</Text>
              <Text style={styles.description}>Fonction: {fonction}</Text>
              <Text style={styles.description}>Adresse email: {email}</Text>
              <Text style={styles.description}>
                Location: {location ? `${location.latitude}, ${location.longitude}` : 'Position invalide !'}
              </Text>
              {image && <Image source={{ uri: image }} style={styles.image} />}
              <View style={styles.btnPrecNext}>
                <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={prevPage}>
                  <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnNext, styles.btnYellow]} onPress={storeData}>
                  <FontAwesomeIcon name="check" size={20} color="#fff" />
                  <Text style={styles.btnTextWhite}>  Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Ajouter;

