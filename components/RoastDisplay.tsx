import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RefreshCw, Volume2, Share2, Save, Square } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';
import * as Speech from 'expo-speech';

type RoastDisplayProps = {
  roastText: string;
  isLoading: boolean;
  onRegenerate: () => void;
  onSave: () => void;
  onShare: () => void;
  onPlayVoice: () => void | Promise<void>;
  isSpeaking: boolean;
};

export default function RoastDisplay({
  roastText,
  isLoading,
  onRegenerate,
  onSave,
  onShare,
}: RoastDisplayProps) {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;

  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pausedIndex, setPausedIndex] = useState<number | null>(null);
  const [lastRoast, setLastRoast] = useState('');
  const charIndex = useRef(0);
  const typingSpeed = 30;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // Track if a new roast is generated
  useEffect(() => {
    if (roastText && !isLoading) {
      charIndex.current = 0;
      setDisplayedText('');
      setIsComplete(false);
      setPausedIndex(null);
      setLastRoast(roastText);

      const typingInterval = setInterval(() => {
        if (charIndex.current < roastText.length) {
          setDisplayedText(roastText.substring(0, charIndex.current + 1));
          charIndex.current += 1;
        } else {
          clearInterval(typingInterval);
          setIsComplete(true);
        }
      }, typingSpeed);

      opacity.value = withTiming(1, { duration: 500 });
      translateY.value = withTiming(0, { duration: 500 });

      return () => clearInterval(typingInterval);
    }
  }, [roastText, isLoading]);

  // Stop speech if roast changes or component unmounts
  useEffect(() => {
    return () => {
      Speech.stop();
      setIsSpeaking(false);
    };
  }, [roastText]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  // Helper to get the remaining text for resume
  const getRemainingText = () => {
    if (pausedIndex !== null && pausedIndex < roastText.length) {
      return roastText.substring(pausedIndex);
    }
    return roastText;
  };

  // Play or resume voice
  const onPlayVoice = () => {
  // If currently speaking, pressing should stop
  if (isSpeaking) {
    Speech.stop();
    setIsSpeaking(false);
    // setPausedIndex(pausedIndex); // just keep the current pausedIndex
    return;
  }

    // If new roast, always start from beginning
    if (lastRoast !== roastText) {
      setPausedIndex(null);
    }

    let startIndex = pausedIndex ?? 0;
    let textToSpeak = getRemainingText();

    if (!textToSpeak) return;

    setIsSpeaking(true);

    Speech.speak(textToSpeak, {
      language: 'en',
      pitch: 1.4,
      rate: 1.1,
      onDone: () => {
        setIsSpeaking(false);
        setPausedIndex(null);
      },
      onStopped: () => {
        setIsSpeaking(false);
        // Save where we stopped
        //setPausedIndex(startIndex + textToSpeak.length - Speech.speakingText?.length || 0);
      },
    });
  };

  if (!roastText && !isLoading) return null;

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <View style={[styles.roastContainer, { backgroundColor: Colors.secondary.light }]}>
        {isLoading ? (
          <Text style={[styles.loadingText, { color: Colors.text.tertiary }]}>Generating your roast...</Text>
        ) : (
          <Text style={[styles.roastText, { color: Colors.text.primary }]}>{displayedText}</Text>
        )}
      </View>

      {isComplete && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onRegenerate}
            activeOpacity={0.7}
          >
            <RefreshCw size={20} color={Colors.text.primary} />
            <Text style={[styles.actionText, { color: Colors.text.secondary }]}>New</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onPlayVoice}
            activeOpacity={0.7}
          >
            {isSpeaking ? (
              <>
                <Square size={20} color={Colors.text.primary} />
                <Text style={[styles.actionText, { color: Colors.text.secondary }]}>Stop</Text>
              </>
            ) : (
              <>
                <Volume2 size={20} color={Colors.text.primary} />
                <Text style={[styles.actionText, { color: Colors.text.secondary }]}>Voice</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onSave}
            activeOpacity={0.7}
          >
            <Save size={20} color={Colors.text.primary} />
            <Text style={[styles.actionText, { color: Colors.text.secondary }]}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={onShare}
            activeOpacity={0.7}
          >
            <Share2 size={20} color={Colors.text.primary} />
            <Text style={[styles.actionText, { color: Colors.text.secondary }]}>Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  roastContainer: {
    borderRadius: 16,
    padding: 24,
    minHeight: 150,
  },
  roastText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    lineHeight: 28,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 4,
  },
});