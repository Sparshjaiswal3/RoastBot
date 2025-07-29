import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

type UserInfoFormProps = {
  name: string;
  setName: (name: string) => void;
  interests: string;
  setInterests: (interests: string) => void;
};

export default function UserInfoForm({ name, setName, interests, setInterests }: UserInfoFormProps) {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: Colors.text.primary }]}>Your Name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: Colors.secondary.light, color: Colors.text.primary }]}
          placeholder="Enter your name"
          placeholderTextColor={Colors.neutral.medium}
          value={name}
          onChangeText={setName}
          maxLength={30}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: Colors.text.primary }]}>Your Interests/Hobbies</Text>
        <TextInput
          style={[
            styles.input,
            styles.interestsInput,
            { backgroundColor: Colors.secondary.light, color: Colors.text.primary },
          ]}
          placeholder="Gaming, Reading, Sports, etc."
          placeholderTextColor={Colors.neutral.medium}
          value={interests}
          onChangeText={setInterests}
          multiline
          numberOfLines={3}
          maxLength={100}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
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
  interestsInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});