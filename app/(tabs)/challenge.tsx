import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { Users, Link, Copy } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

export default function ChallengeScreen() {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');
  const [challengeLink, setChallengeLink] = useState('');

  const generateChallengeLink = () => {
    if (!friendName.trim()) {
      Alert.alert('Missing Information', 'Please enter your friend\'s name');
      return;
    }
    const link = `https://roastbot.app/challenge?name=${encodeURIComponent(friendName)}&ref=${Math.random().toString(36).substring(2, 10)}`;
    setChallengeLink(link);
  };

  const shareChallenge = async () => {
    if (!challengeLink) {
      generateChallengeLink();
      return;
    }
    try {
      const shareMessage = message.trim() 
        ? `${message}\n\nI challenge you to get roasted: ${challengeLink}`
        : `Hey ${friendName}! I challenge you to get roasted by RoastBot! Click the link to accept: ${challengeLink}`;
      await Share.share({
        message: shareMessage,
        title: 'RoastBot Challenge',
      });
    } catch (error) {
      console.error('Error sharing challenge:', error);
    }
  };

  const copyToClipboard = () => {
    if (!challengeLink) {
      generateChallengeLink();
      return;
    }
    // In a real app, this would use Clipboard API
    Alert.alert('Link Copied', 'Challenge link copied to clipboard!');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.iconContainer, { backgroundColor: Colors.secondary.light }]}>
        <Users size={48} color={Colors.primary.default} />
      </View>
      
      <Text style={[styles.title, { color: Colors.text.primary }]}>Challenge a Friend</Text>
      <Text style={[styles.subtitle, { color: Colors.text.tertiary }]}>
        Send a challenge to your friend and see if they can handle the heat!
      </Text>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: Colors.text.primary }]}>Friend's Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: Colors.secondary.light, color: Colors.text.primary }]}
            placeholder="Enter friend's name"
            placeholderTextColor={Colors.neutral.medium}
            value={friendName}
            onChangeText={setFriendName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: Colors.text.primary }]}>Friend's Email (Optional)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: Colors.secondary.light, color: Colors.text.primary }]}
            placeholder="Enter friend's email"
            placeholderTextColor={Colors.neutral.medium}
            value={friendEmail}
            onChangeText={setFriendEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: Colors.text.primary }]}>Custom Message (Optional)</Text>
          <TextInput
            style={[styles.input, styles.messageInput, { backgroundColor: Colors.secondary.light, color: Colors.text.primary }]}
            placeholder="Add a personal message"
            placeholderTextColor={Colors.neutral.medium}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={3}
          />
        </View>
        
        <TouchableOpacity
          style={[styles.generateButton, { backgroundColor: Colors.primary.default }]}
          onPress={generateChallengeLink}
          activeOpacity={0.8}
        >
          <Link size={20} color={Colors.text.primary} />
          <Text style={[styles.generateButtonText, { color: Colors.text.primary }]}>Generate Challenge Link</Text>
        </TouchableOpacity>
        
        {challengeLink ? (
          <View style={[styles.linkContainer, { backgroundColor: Colors.secondary.light }]}>
            <Text style={[styles.linkTitle, { color: Colors.text.primary }]}>Challenge Link Generated:</Text>
            <View style={[styles.linkBox, { backgroundColor: Colors.secondary.default }]}>
              <Text style={[styles.link, { color: Colors.text.secondary }]} numberOfLines={1} ellipsizeMode="middle">
                {challengeLink}
              </Text>
              <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                <Copy size={18} color={Colors.primary.default} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[styles.shareButton, { backgroundColor: Colors.accent.default }]}
              onPress={shareChallenge}
              activeOpacity={0.8}
            >
              <Text style={[styles.shareButtonText, { color: Colors.secondary.dark }]}>Share Challenge</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
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
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    // backgroundColor: Colors.secondary.light, // moved to inline
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    // color: Colors.text.tertiary, // moved to inline
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: '90%',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 8,
  },
  input: {
    // backgroundColor: Colors.secondary.light, // moved to inline
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    // color: Colors.text.primary, // moved to inline
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  generateButton: {
    // backgroundColor: Colors.primary.default, // moved to inline
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  generateButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
  },
  linkContainer: {
    marginTop: 24,
    // backgroundColor: Colors.secondary.light, // moved to inline
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  linkTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 12,
  },
  linkBox: {
    // backgroundColor: Colors.secondary.default, // moved to inline
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    // color: Colors.text.secondary, // moved to inline
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    padding: 6,
  },
  shareButton: {
    // backgroundColor: Colors.accent.default, // moved to inline
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  shareButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.secondary.dark, // moved to inline
  },
});