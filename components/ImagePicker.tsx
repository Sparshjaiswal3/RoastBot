import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform, Alert } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

type ImagePickerProps = {
  onImageSelected: (uri: string) => void;
  selectedImage: string | null;
};

export default function ImagePicker({ onImageSelected, selectedImage }: ImagePickerProps) {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;
  const [loading, setLoading] = useState(false);

  // Request permissions for media library (gallery)
  const requestGalleryPermission = async () => {
    const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your photo library to select images.');
      return false;
    }
    return true;
  };

  // Request permissions for camera
  const requestCameraPermission = async () => {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'We need access to your camera to take photos.');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestGalleryPermission();
      if (!hasPermission) return;

      setLoading(true);
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      setLoading(false);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error picking image:', error);
      Alert.alert('Error', 'There was a problem picking the image.');
    }
  };

  const takePicture = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      setLoading(true);
      const result = await ExpoImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      setLoading(false);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      setLoading(false);
      console.log('Error taking picture:', error);
      Alert.alert('Error', 'There was a problem taking the picture.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.text.primary }]}>Upload a Selfie</Text>
      <Text style={[styles.subtitle, { color: Colors.text.tertiary }]}>Add a photo to get roasted</Text>

      {selectedImage ? (
        <View style={styles.selectedImageContainer}>
          <Image source={{ uri: selectedImage }} style={[styles.selectedImage, { borderColor: Colors.primary.default }]} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: Colors.secondary.light }]} 
              onPress={pickImage}
              activeOpacity={0.8}
            >
              <ImageIcon color={Colors.text.primary} size={24} />
              <Text style={[styles.buttonText, { color: Colors.text.primary }]}>Gallery</Text>
            </TouchableOpacity>
            {Platform.OS !== 'web' && (
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: Colors.primary.default }]} 
                onPress={takePicture}
                activeOpacity={0.8}
              >
                <Camera color={Colors.text.primary} size={24} />
                <Text style={[styles.buttonText, { color: Colors.text.primary }]}>Camera</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary.default} />
          ) : (
            <>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: Colors.secondary.light }]} 
                onPress={pickImage}
                activeOpacity={0.8}
              >
                <ImageIcon color={Colors.text.primary} size={24} />
                <Text style={[styles.buttonText, { color: Colors.text.primary }]}>Gallery</Text>
              </TouchableOpacity>
              {Platform.OS !== 'web' && (
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: Colors.primary.default }]} 
                  onPress={takePicture}
                  activeOpacity={0.8}
                >
                  <Camera color={Colors.text.primary} size={24} />
                  <Text style={[styles.buttonText, { color: Colors.text.primary }]}>Camera</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    // color: Colors.text.tertiary, // moved to inline
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    minWidth: 130,
    gap: 8,
    // backgroundColor: Colors.secondary.light or Colors.primary.default, moved to inline
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
  },
  selectedImageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  selectedImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
    borderWidth: 3,
    // borderColor: Colors.primary.default, // moved to inline
  },
  changeImageButton: {
    // backgroundColor: Colors.secondary.light, // moved to inline if used
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  changeImageText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    // color: Colors.text.primary, // moved to inline if used
  },
});