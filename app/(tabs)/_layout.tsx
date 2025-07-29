import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';
import { Chrome as Home, User, Settings, Flame } from 'lucide-react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary.default,
        tabBarInactiveTintColor: Colors.neutral.dark,
        tabBarStyle: {
          backgroundColor: Colors.secondary.dark,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: Colors.secondary.dark,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          color: Colors.text.primary,
        },
        headerTintColor: Colors.primary.default,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'RoastBot',
        }}
      />
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarIcon: ({ color, size }) => <Flame size={size} color={color} />,
          headerTitle: 'Challenge a Friend',
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerTitle: 'Saved Roasts',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}