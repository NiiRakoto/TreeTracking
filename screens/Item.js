import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ navigation }) => {
    const [compteurHumain, setCompteurHumain] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        readData();
    }, []);

    const readData = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers !== null) {
                const parsedUsers = JSON.parse(storedUsers);
                setUsers(parsedUsers);
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    const onNext = () => {
        if (compteurHumain === users.length - 1) {
            setCompteurHumain(0);
        } else {
            setCompteurHumain(compteurHumain + 1);
        }
    }

    const onPrev = () => {
        if (compteurHumain === 0) {
            setCompteurHumain(users.length - 1);
        } else {
            setCompteurHumain(compteurHumain - 1);
        }
    }

    const augmenterAge = (index) => {
        // To be implemented if needed
    }

    const Humain = ({ prenoms, nom, age, image }) => {
        return (
            <View style={styles.content}>
                <Text style={styles.infoTitle}>Voici une personne</Text>
                <Text style={styles.infoTitle}>Son nom est {prenoms} {nom}, et qui a {age} ans.</Text>
                {/* Example of age increment functionality */}
                <TouchableOpacity onPress={() => augmenterAge(compteurHumain)}>
                    <Image
                        source={{ uri: image }}
                        style={styles.imageIndex}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ImageBackground source={require('../assets/4.jpg')} style={styles.backgroundImage}>
            <View style={styles.content}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <FontAwesomeIcon name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>

                {/* Render the Humain component with current user data */}
                {users.length > 0 && (
                    <Humain
                        prenoms={users[compteurHumain].prenoms}
                        nom={users[compteurHumain].nom}
                        age={users[compteurHumain].age}
                        image={users[compteurHumain].image}
                    />
                )}

                <View style={styles.btnPrecNext}>
                    <TouchableOpacity style={[styles.btnPrec, styles.btnGreen]} onPress={onPrev}>
                        <FontAwesomeIcon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnNext, styles.btnGreen]} onPress={onNext}>
                        <FontAwesomeIcon name="arrow-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Item;
