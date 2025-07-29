import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRoastGenerator } from '@/hooks/useRoastGenerator';
import ImagePicker from '@/components/ImagePicker';
import UserInfoForm from '@/components/UserInfoForm';
import RoastCategorySelector from '@/components/RoastCategorySelector';
import RoastDisplay from '@/components/RoastDisplay';
import { RoastCategory } from '@/components/RoastCategorySelector';
import { Share } from 'react-native';
import { useSavedRoasts } from '@/context/SavedRoastsContext';

import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [category, setCategory] = useState<RoastCategory>('mild');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pausedIndex, setPausedIndex] = useState<number | null>(null);
  const lastRoastRef = useRef<string>('');

  const handlePlayVoice = async () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    // If new roast, start from beginning
    if (lastRoastRef.current !== roastText) {
      setPausedIndex(null);
      lastRoastRef.current = roastText;
    }

    let startIndex = pausedIndex ?? 0;
    let textToSpeak = roastText.substring(startIndex);

    if (!textToSpeak) return;

    setIsSpeaking(true);

    Speech.speak(textToSpeak, {
      language: 'en',
      pitch: 1.0,
      rate: 1.0,
      onDone: () => {
        setIsSpeaking(false);
        setPausedIndex(null);
      },
      onStopped: () => {
        setIsSpeaking(false);
        // Optionally update pausedIndex here if you want to resume
      },
    });
  };

  const { 
    roastText, 
    isGenerating, 
    generateRoast, 
    playVoiceRoast,
    voicePlaying
  } = useRoastGenerator();

  const { addRoast } = useSavedRoasts();
  const handleGenerateRoast = () => {
    if (!imageUri) {
      Alert.alert('Upload an Image', 'Please upload a selfie to get roasted.');
      return;
    }

    if (!name.trim()) {
      Alert.alert('Enter Your Name', 'Please enter your name to get a personalized roast.');
      return;
    }

    generateRoast(category, name, interests, imageUri);
  };

  const handleSaveRoast = () => {
    if (roastText) {
      addRoast(roastText, name, interests);
      if (Platform.OS === 'web') {
        window.alert('Roast Saved!\nYour roast has been saved to your collection.');
      } else {
        Alert.alert('Roast Saved', 'Your roast has been saved to your collection.');
      }
    }
  };

  const handleShareRoast = async () => {
    if (roastText) {
      try {
        await Share.share({
          message: `Check out this roast I got from RoastBot:\n\n${roastText}\n\nGet roasted yourself at RoastBot!`,
        });
      } catch (error) {
        console.error('Error sharing roast:', error);
      }
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors.primary.default }]}>Get Roasted!</Text>
        <Text style={[styles.subtitle, { color: Colors.text.tertiary }]}>
          Upload a selfie and prepare to be roasted
        </Text>
      </View>

      <View style={styles.formContainer}>
        <ImagePicker
          onImageSelected={setImageUri}
          selectedImage={imageUri}
        />

        <UserInfoForm
          name={name}
          setName={setName}
          interests={interests}
          setInterests={setInterests}
        />

        <RoastCategorySelector
          selectedCategory={category}
          onSelectCategory={setCategory}
        />

        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: Colors.primary.default }]}
          onPress={handleGenerateRoast}
          activeOpacity={0.8}
          disabled={isGenerating}
        >
          <Text style={[styles.generateButtonText, { color: Colors.text.primary }]}>
            {isGenerating ? 'Generating...' : 'Generate Roast'}
          </Text>
        </TouchableOpacity>
      </View>

      {(roastText || isGenerating) && (
        <RoastDisplay
          roastText={roastText}
          isLoading={isGenerating}
          onRegenerate={handleGenerateRoast}
          onSave={handleSaveRoast}
          onShare={handleShareRoast}
          onPlayVoice={handlePlayVoice}
          isSpeaking={isSpeaking}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary, // moved to inline
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    // color: Colors.primary.default, // moved to inline
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    // color: Colors.text.tertiary, // moved to inline
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  generateButton: {
    // backgroundColor: Colors.primary.default, // moved to inline
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  generateButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    // color: Colors.text.primary, // moved to inline
  },
});