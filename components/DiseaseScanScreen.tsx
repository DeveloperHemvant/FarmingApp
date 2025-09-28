import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Animated, 
  Easing 
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Theme } from '../themes/theme';
import { makeStyles, TextStyles } from '../themes/styles';

export default function DiseaseScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const cameraRef = useRef(null);
  const scanProgress = useRef(new Animated.Value(0)).current;
  const styles = makeStyles(Theme);
  const textStyles = TextStyles(Theme);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      setIsScanning(true);
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
      
      // Start scanning animation
      Animated.timing(scanProgress, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setIsScanning(false);
        setScanComplete(true);
      });
    }
  };

  const retakePicture = () => {
    setPhoto(null);
    setScanComplete(false);
    scanProgress.setValue(0);
  };

  const confirmPicture = () => {
    // Here you would typically send the photo to your disease detection API
    navigation.navigate('DiseaseResult', { photoUri: photo.uri });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <Camera style={styles.camera} type={cameraType} ref={cameraRef}>
          <View style={styles.cameraOverlay}>
            <View style={styles.scanFrame}>
              {isScanning && (
                <Animated.View 
                  style={[
                    styles.scanLine, 
                    { 
                      transform: [{
                        translateY: scanProgress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 200]
                        })
                      }]
                    }
                  ]} 
                />
              )}
            </View>
            
            {isScanning ? (
              <View style={styles.scanningContainer}>
                <LottieView
                  source={require('../assets/scanning-animation.json')}
                  autoPlay
                  loop
                  style={styles.scanningAnimation}
                />
                <Text style={textStyles.scanningText}>Analyzing plant health...</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            )}
          </View>
        </Camera>
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          
          {scanComplete ? (
            <View style={styles.confirmationOverlay}>
              <View style={styles.confirmationBadge}>
                <Ionicons name="checkmark-circle" size={60} color="green" />
                <Text style={textStyles.confirmationText}>Photo Accepted</Text>
              </View>
              
              <View style={styles.confirmationButtons}>
                <TouchableOpacity style={styles.retakeButton} onPress={retakePicture}>
                  <Text style={textStyles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmPicture}>
                  <Text style={textStyles.buttonText}>Analyze Disease</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.processingOverlay}>
              <LottieView
                source={require('../assets/processing-animation.json')}
                autoPlay
                loop
                style={styles.processingAnimation}
              />
              <Text style={textStyles.processingText}>Processing image...</Text>
            </View>
          )}
        </View>
      )}
      
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.flipButton} 
        onPress={() => {
          setCameraType(
            cameraType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <Ionicons name="camera-reverse" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// Add these styles to your styles file
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'rgba(0, 255, 0, 0.5)',
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(0, 255, 0, 0.8)',
  },
  scanningContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  scanningAnimation: {
    width: 100,
    height: 100,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  confirmationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  confirmationBadge: {
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  retakeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  flipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});