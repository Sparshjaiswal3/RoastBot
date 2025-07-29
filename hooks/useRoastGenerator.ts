import { useState } from 'react';
import { Platform } from 'react-native';
import { RoastCategory } from '@/components/RoastCategorySelector';

export function useRoastGenerator() {
  const [roastText, setRoastText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);

  const generateRoast = async (
    category: RoastCategory,
    name: string,
    interests: string,
    imageUri?: string
  ) => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          name,
          interests,
          imageUrl: imageUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roast');
      }

      const data = await response.json();
      setRoastText(data.roast);
    } catch (error) {
      console.error('Error generating roast:', error);
      setRoastText('Failed to generate a roast. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const playVoiceRoast = async () => {
    setVoicePlaying(true);
    
    // Simulate voice playback with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setVoicePlaying(false);
    
    if (Platform.OS === 'web') {
      alert('Voice roast would play here! This feature works best on mobile devices.');
    }
  };

  return {
    roastText,
    isGenerating,
    voicePlaying,
    generateRoast,
    playVoiceRoast,
  };
}