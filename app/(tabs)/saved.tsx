import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { Trash2, Share2 } from 'lucide-react-native';
import { Share } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useSavedRoasts, SavedRoast } from '@/context/SavedRoastsContext';

import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

export default function SavedScreen() {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;
  const { savedRoasts, removeRoast } = useSavedRoasts();

  const handleDeleteRoast = (index: number) => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to delete this roast?');
      if (confirmed) {
        removeRoast(index);
      }
    } else {
      Alert.alert(
        'Delete Roast',
        'Are you sure you want to delete this roast?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            onPress: () => removeRoast(index),
            style: 'destructive',
          },
        ]
      );
    }
  };

  const handleShareRoast = async (roast: string) => {
    try {
      await Share.share({
        message: `Check out this roast I got from RoastBot:\n\n${roast}\n\nGet roasted yourself at RoastBot!`,
      });
    } catch (error) {
      console.error('Error sharing roast:', error);
    }
  };

  const renderRoastItem = ({ item, index }: { item: SavedRoast; index: number }) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 100)}
      exiting={FadeOutLeft}
      style={[styles.roastCard, { backgroundColor: Colors.secondary.light }]}
    >
      <Text style={[styles.roastText, { color: Colors.text.primary }]}>{item.roast}</Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.footerText, { color: Colors.text.tertiary }]}>
          Name: {item.name || 'N/A'} | Interests: {item.interests || 'N/A'}
        </Text>
      </View>
      <View style={[styles.cardActions, { borderTopColor: Colors.secondary.default }]}>
        <TouchableOpacity
          onPress={() => handleShareRoast(item.roast)}
          style={styles.actionButton}
        >
          <Share2 size={20} color={Colors.primary.default} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteRoast(index)}
          style={styles.actionButton}
        >
          <Trash2 size={20} color={Colors.error.default} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors.background.primary }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: Colors.text.primary }]}>Your Saved Roasts</Text>
        <Text style={[styles.headerSubtitle, { color: Colors.text.tertiary }]}>
          {savedRoasts.length} {savedRoasts.length === 1 ? 'roast' : 'roasts'} saved
        </Text>
      </View>

      {savedRoasts.length > 0 ? (
        <FlatList
          data={savedRoasts}
          renderItem={renderRoastItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyTitle, { color: Colors.text.primary }]}>No Saved Roasts</Text>
          <Text style={[styles.emptySubtitle, { color: Colors.text.tertiary }]}>
            Generate and save roasts to see them here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.background.primary, // moved to inline
  },
  headerContainer: {
    padding: 24,
    borderBottomWidth: 1,
    // borderBottomColor: Colors.secondary.light, // moved to inline
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    // color: Colors.text.tertiary, // moved to inline
  },
  listContainer: {
    padding: 16,
  },
  roastCard: {
    // backgroundColor: Colors.secondary.light, // moved to inline
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  roastText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    // borderTopColor: Colors.secondary.default, // moved to inline
    paddingTop: 12,
  },
  actionButton: {
    padding: 8,
    marginLeft: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    // color: Colors.text.tertiary, // moved to inline
    textAlign: 'center',
  },
  cardFooter: {
    marginTop: 8,
    marginBottom: 4,
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    // color: Colors.text.tertiary, // moved to inline
    textAlign: 'right',
  },
});