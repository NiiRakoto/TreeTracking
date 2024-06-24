import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      
      imageIndex: {
        width: 300,
        height: 300,
        borderRadius: 10,
        borderWidth:4,
        borderColor: '#F00'
    },
  
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems:  'center',
          padding: 40,
        },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#FFFFFF',
      textAlign: 'center',
      marginBottom: 20,
    },
    btn: {
      width: '80%',
      paddingVertical: 15,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,

      flexDirection: 'row',
      justifyContent: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 10,
      zIndex: 99,
  },
  icon: {
    margin: 10,
  },
  
    btnTextWhite: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
    btnTextBlack: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
      },
      btnYellow: {
        backgroundColor: '#FFD700',
      },
      btnGreen: {
        backgroundColor: '#080',
      },
    
    btnSecondary: {
      borderColor: '#FFFFFF',
      backgroundColor: 'rgba(200,200,200,0.4)',
      borderWidth: 2,
    },
    btnSecondaryText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },

    //*******************info****************/

    
      alert: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        margin: 100,
        marginTop: 0,
        backgroundColor: '#070',
        borderRadius: 20,
        zIndex: 1000,
      },
      alertRed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 10,
        margin: 80,
        marginTop: 0,
        backgroundColor: '#F00',
        borderRadius: 20,
        zIndex: 1000,
      },
      alertText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      icon: {
        marginBottom: 20,
      },
     
      infoContainer: {
        backgroundColor: 'rgba(190,190,190,0.4)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
      },
      infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff',
      },
      info: {
        fontSize: 14,
        marginBottom: 1,
      },

      //******************Login***************** */

      


      
      //****************** Test Cam ***************** */
      
    
    
    image: {
        width: 200,
        height: 200,
        margin: 10,
        borderRadius: 30,
    },
    
    
    btnPrecNext: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
    btnPrec  : {
      padding: 15,
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    
     btnNext : {
      
      padding: 15,
      borderRadius: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    /************************* MAP************************** */
    containerMap: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      marginTop: 10,
    },
    
    btnMap: {
      paddingVertical: 5,
      margin: 12,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
     


    /*************************** ACCUEIL************************************** */
    
    
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 80,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,0.3)', // Couleur de fond de la barre de navigation
    },
    bottomBarButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    


    /**************************** USERS ***************************************** */
    /** 
   
  
    inputUpdate: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    image: {
      width: 100,
      height: 100,
      margin: 10,
      borderRadius: 8,
    },
    storedDataContainer: {
      marginTop: 20,
      backgroundColor: 'rgba(10,10,50,0.59)',
      padding: 10,
      borderRadius: 32,
      borderColor: '#444',
      borderWidth: 1,
    },
    storedDataTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
    },
    storedData: {
      fontSize: 16,
      color: '#999',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    buttonChild: {
      backgroundColor: 'rgba(0, 0, 150, 0.5)',
      color: '#F00',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },


    */


/******************************AJOUTER********************************** */

  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
  },

  input: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
    padding: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor:'#FFF',
    borderRadius: 50,
    color:'#FFF',
    textAlign: 'center',
  },



  /********************************     USERS    **************************************** */
 
  storedDataContainer: {
    backgroundColor: 'rgba(0, 0, 50, 0.65)',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  storedDataTitle: {
    fontSize: 28,
    color: '#fff',
    marginVertical: 3,
    fontWeight: 'bold',
  },
  storedData: {
    fontSize: 18,
    color: '#fff',
  },
  storedDataSmall: {
    fontSize: 12,
    color: '#ccc',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    top:-50,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  inputUpdate: {
    backgroundColor: '#555',
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonX: {position:'absolute',
    top:10,
    right:10,
  },



  /*******************************Map     **************************** */
  
  
    
    textMap: {
      position: 'absolute',
      top: 10,
      alignSelf: 'center',
      backgroundColor: '#333', // Fond sombre pour le texte d'information
      padding:3,
      color: '#FFF', // Texte blanc
      borderRadius: 35,
    },
    btnMap: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
      backgroundColor: '#F33', // Fond sombre pour le bouton
      paddingVertical: 3,
      paddingHorizontal: 50,
      borderRadius: 35,
    },

  });

  export default styles;