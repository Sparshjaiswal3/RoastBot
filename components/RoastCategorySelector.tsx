import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Thermometer, Flame, Skull } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useTheme } from '@/context/ThemeContext';
import { LightColors, DarkColors } from '@/constants/Colors';

export type RoastCategory = 'mild' | 'spicy' | 'savage';

type RoastCategorySelectorProps = {
  selectedCategory: RoastCategory;
  onSelectCategory: (category: RoastCategory) => void;
};

export default function RoastCategorySelector({ 
  selectedCategory, 
  onSelectCategory 
}: RoastCategorySelectorProps) {
  const { theme } = useTheme();
  const Colors = theme === 'dark' ? DarkColors : LightColors;
  const [containerWidth, setContainerWidth] = useState(0);
  const animatedPosition = useSharedValue(
    selectedCategory === 'mild' ? 0 : selectedCategory === 'spicy' ? 1 : 2
  );

  const handleSelectCategory = (category: RoastCategory) => {
    animatedPosition.value = withTiming(
      category === 'mild' ? 0 : category === 'spicy' ? 1 : 2, 
      { duration: 300 }
    );
    onSelectCategory(category);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const optionWidth = containerWidth / 3;
    return {
      width: optionWidth,
      transform: [
        { translateX: animatedPosition.value * optionWidth },
      ],
      backgroundColor: Colors.primary.default, // moved to inline
      borderRadius: 12,
      position: 'absolute',
      height: '100%',
      zIndex: 0,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: Colors.text.primary }]}>Roast Intensity</Text>
      <View
        style={[styles.selectorContainer, { backgroundColor: Colors.secondary.light }]}
        onLayout={onLayout}
      >
        <Animated.View style={animatedBackgroundStyle} />
        <TouchableOpacity
          style={styles.categoryOption}
          onPress={() => handleSelectCategory('mild')}
          activeOpacity={0.7}
        >
          <Thermometer 
            size={24}
            color={selectedCategory === 'mild' ? Colors.text.primary : Colors.neutral.medium}
          />
          <Text
            style={[
              styles.categoryText,
              { color: selectedCategory === 'mild' ? Colors.text.primary : Colors.neutral.medium },
            ]}
          >
            Mild
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryOption}
          onPress={() => handleSelectCategory('spicy')}
          activeOpacity={0.7}
        >
          <Flame 
            size={24}
            color={selectedCategory === 'spicy' ? Colors.text.primary : Colors.neutral.medium}
          />
          <Text
            style={[
              styles.categoryText,
              { color: selectedCategory === 'spicy' ? Colors.text.primary : Colors.neutral.medium },
            ]}
          >
            Spicy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryOption}
          onPress={() => handleSelectCategory('savage')}
          activeOpacity={0.7}
        >
          <Skull 
            size={24}
            color={selectedCategory === 'savage' ? Colors.text.primary : Colors.neutral.medium}
          />
          <Text
            style={[
              styles.categoryText,
              { color: selectedCategory === 'savage' ? Colors.text.primary : Colors.neutral.medium },
            ]}
          >
            Savage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    // color: Colors.text.primary, // moved to inline
    marginBottom: 12,
  },
  selectorContainer: {
    flexDirection: 'row',
    // backgroundColor: Colors.secondary.light, // moved to inline
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    height: 48,
  },
  // animatedBackground moved to inline style
  categoryOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    zIndex: 1,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    // color: Colors.neutral.medium, // moved to inline
  },
  // selectedCategoryText removed, handled inline
});