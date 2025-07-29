import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { ChevronRight, Bell, VolumeX, Volume2, Shield, CircleHelp as HelpCircle, LogOut, Moon, Flame } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState(false);

  const handlePremiumPress = () => {
    Alert.alert(
      'Upgrade to Premium',
      'Get unlimited roasts, 10+ voice tones, and exclusive roast packs!',
      [
        { text: 'Not Now', style: 'cancel' },
        { text: 'View Plans', onPress: () => console.log('View premium plans') },
      ]
    );
  };

  const handleVoicePacksPress = () => {
    Alert.alert(
      'Voice Packs',
      'In the full version, you can purchase different voice styles!',
      [{ text: 'OK' }]
    );
  };

  const handleRoastPacksPress = () => {
    Alert.alert(
      'Roast Packs',
      'In the full version, you can purchase themed roast packs like "Bollywood Villain" or "Gamer Rage Mode"!',
      [{ text: 'OK' }]
    );
  };

  const handleHelpPress = () => {
    Alert.alert(
      'Help & Support',
      'Need assistance? Contact us at support@roastbot.app',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Privacy Policy',
      'Your privacy is important to us. We never share your data without permission.',
      [{ text: 'OK' }]
    );
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => console.log('Logged out'), style: 'destructive' },
      ]
    );
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void,
    rightElement?: React.ReactNode,
    isSwitch?: boolean
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingIconContainer}>{icon}</View>
      <View style={styles.settingTextContainer}>
        <Text style={[styles.settingTitle, { color: Colors.text.primary }]}>{title}</Text>
        <Text style={[styles.settingSubtitle, { color: Colors.text.tertiary }]}>{subtitle}</Text>
      </View>
      {rightElement || <ChevronRight size={20} color={Colors.neutral.medium} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.primary.default }]}>Account</Text>
        <View style={[styles.sectionContent, { backgroundColor: Colors.secondary.light }]}>
          <TouchableOpacity style={[styles.premiumButton, { backgroundColor: Colors.primary.dark }]} onPress={handlePremiumPress}>
            <View style={styles.premiumContent}>
              <Text style={[styles.premiumTitle, { color: Colors.text.primary }]}>Upgrade to Premium</Text>
              <Text style={[styles.premiumSubtitle, { color: Colors.primary.light }]}>Unlock all features</Text>
            </View>
            <View style={[styles.premiumBadge, { backgroundColor: Colors.primary.default }]}>
              <Text style={[styles.premiumBadgeText, { color: Colors.text.primary }]}>PRO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.primary.default }]}>Preferences</Text>
        <View style={[styles.sectionContent, { backgroundColor: Colors.secondary.light }]}>
          {renderSettingItem(
            <Bell size={24} color={Colors.primary.default} />,
            'Notifications',
            'Daily roast reminders',
            () => setNotificationsEnabled(!notificationsEnabled),
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.neutral.darker, true: Colors.primary.dark }}
              thumbColor={notificationsEnabled ? Colors.primary.default : Colors.neutral.light}
            />
          )}

          {renderSettingItem(
            <Moon size={24} color={Colors.primary.default} />,
            'Dark Mode',
            'Use dark theme',
            toggleTheme,
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: Colors.neutral.darker, true: Colors.primary.dark }}
              thumbColor={theme === 'dark' ? Colors.primary.default : Colors.neutral.light}
            />,
            true
          )}

          {renderSettingItem(
            soundEnabled ? (
              <Volume2 size={24} color={Colors.primary.default} />
            ) : (
              <VolumeX size={24} color={Colors.primary.default} />
            ),
            'Sound Effects',
            'Play sounds during roasts',
            () => setSoundEnabled(!soundEnabled),
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: Colors.neutral.darker, true: Colors.primary.dark }}
              thumbColor={soundEnabled ? Colors.primary.default : Colors.neutral.light}
            />,
            true
          )}

          {renderSettingItem(
            <Shield size={24} color={Colors.primary.default} />,
            'Privacy Mode',
            'Keep roasts private',
            () => setPrivacyModeEnabled(!privacyModeEnabled),
            <Switch
              value={privacyModeEnabled}
              onValueChange={setPrivacyModeEnabled}
              trackColor={{ false: Colors.neutral.darker, true: Colors.primary.dark }}
              thumbColor={privacyModeEnabled ? Colors.primary.default : Colors.neutral.light}
            />,
            true
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.primary.default }]}>Content Packs</Text>
        <View style={[styles.sectionContent, { backgroundColor: Colors.secondary.light }]}>
          {renderSettingItem(
            <Volume2 size={24} color={Colors.primary.default} />,
            'Voice Packs',
            'Add unique voice styles',
            handleVoicePacksPress
          )}

          {renderSettingItem(
            <Flame size={24} color={Colors.primary.default} />,
            'Roast Packs',
            'Themed roast collections',
            handleRoastPacksPress
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors.primary.default }]}>Support</Text>
        <View style={[styles.sectionContent, { backgroundColor: Colors.secondary.light }]}>
          {renderSettingItem(
            <HelpCircle size={24} color={Colors.primary.default} />,
            'Help & Support',
            'Get assistance',
            handleHelpPress
          )}

          {renderSettingItem(
            <Shield size={24} color={Colors.primary.default} />,
            'Privacy Policy',
            'Read our privacy policy',
            handlePrivacyPress
          )}
        </View>
      </View>

      <TouchableOpacity style={[styles.logoutButton, { backgroundColor: Colors.secondary.light }]} onPress={handleLogoutPress}>
        <LogOut size={20} color={Colors.error.default} />
        <Text style={[styles.logoutText, { color: Colors.error.default }]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.versionText, { color: Colors.text.tertiary }]}>RoastBot v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary, // moved to inline
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    // color: Colors.primary.default, // moved to inline
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  sectionContent: {
    // backgroundColor: Colors.secondary.light, // moved to inline
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.secondary.default, // optional: move to inline if needed
  },
  settingIconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 4,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    // color: Colors.text.tertiary, // moved to inline
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    // backgroundColor: Colors.primary.dark, // moved to inline
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    // color: Colors.primary.light, // moved to inline
  },
  premiumBadge: {
    // backgroundColor: Colors.primary.default, // moved to inline
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  premiumBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    // color: Colors.text.primary, // moved to inline
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.secondary.light, // moved to inline
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 24,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.error.default, // moved to inline
    marginLeft: 12,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    // color: Colors.text.tertiary, // moved to inline
    textAlign: 'center',
  },
});