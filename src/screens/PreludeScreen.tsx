import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useWindowDimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Prelude'>;

type SlideItem = {
  id: string;
  image: any;
  title: string;
  description: string;
  buttonText: string;
};

const backdropField = require('../assets/images/soft_horizon_bg.png');

const whisperValley = require('../assets/images/whisper_valley.png');
const trailGaze = require('../assets/images/trail_gaze.png');
const signalTouch = require('../assets/images/signal_touch.png');
const northPatch = require('../assets/images/north_patch.png');
const storyGlow = require('../assets/images/story_glow.png');
const routeBegin = require('../assets/images/route_begin.png');

export default function PreludeScreen({ navigation }: Props) {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.96)).current;

  const isSmall = height < 760;
  const isVerySmall = height < 690;

  const heroWidth = isVerySmall ? 250 : isSmall ? 278 : 310;
  const heroHeight = isVerySmall ? 205 : isSmall ? 225 : 250;
  const pageTop = isVerySmall ? 4 : 8;
  const titleFont = isVerySmall ? 19 : isSmall ? 20 : 22;
  const titleLine = isVerySmall ? 23 : isSmall ? 24 : 26;
  const descFont = isVerySmall ? 12 : 13;
  const descLine = isVerySmall ? 17 : 18;
  const descWidth = isVerySmall ? 258 : isSmall ? 274 : 290;
  const buttonTop = isVerySmall ? 22 : isSmall ? 28 : 38;

  const slides = useMemo<SlideItem[]>(
    () => [
      {
        id: 'slide_1',
        image: whisperValley,
        title: 'Find Rare Corners of Canada',
        description:
          'Open a collection of remarkable places, quiet landscapes, and lesser-known destinations that bring a different view of Canada.',
        buttonText: 'Next',
      },
      {
        id: 'slide_2',
        image: trailGaze,
        title: 'Places That Spark Curiosity',
        description:
          'From strange natural formations to mysterious landmarks, every place tells a story waiting to be discovered.',
        buttonText: 'Next',
      },
      {
        id: 'slide_3',
        image: signalTouch,
        title: 'Find Something Unexpected',
        description:
          'Let the app surprise you with unusual locations you may never have heard about before.',
        buttonText: 'Next',
      },
      {
        id: 'slide_4',
        image: northPatch,
        title: 'Explore on the Map',
        description:
          'See interesting locations across Canada and discover what makes each one unique.',
        buttonText: 'Next',
      },
      {
        id: 'slide_5',
        image: storyGlow,
        title: 'Learn Curious Facts',
        description:
          'Discover surprising stories and fascinating details about some of the most unusual places in Canada.',
        buttonText: 'Next',
      },
      {
        id: 'slide_6',
        image: routeBegin,
        title: 'Start Exploring',
        description:
          'Save places you like and build your own list of unusual destinations to visit.',
        buttonText: 'Start',
      },
    ],
    [],
  );

  useEffect(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(18);
    imageScaleAnim.setValue(0.96);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 420,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 460,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeIndex, fadeAnim, translateAnim, imageScaleAnim]);

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigation.replace('Orbit');
      return;
    }
    setActiveIndex(prev => prev + 1);
  };

  const handleClose = () => {
    navigation.replace('Orbit');
  };

  const currentSlide = slides[activeIndex];

  return (
    <ImageBackground source={backdropField} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.topBar, { paddingTop: 46 }]}>
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        </View>

        <View style={[styles.page, { width, paddingTop: pageTop }]}>
          <Animated.View
            style={[
              styles.imageWrap,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }, { scale: imageScaleAnim }],
              },
            ]}
          >
            <Image
              source={currentSlide.image}
              style={{ width: heroWidth, height: heroHeight }}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.textWrap,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateAnim }],
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                {
                  fontSize: titleFont,
                  lineHeight: titleLine,
                  marginBottom: isVerySmall ? 8 : 10,
                },
              ]}
            >
              {currentSlide.title}
            </Text>

            <Text
              style={[
                styles.description,
                {
                  fontSize: descFont,
                  lineHeight: descLine,
                  maxWidth: descWidth,
                  minHeight: isVerySmall ? 64 : 72,
                },
              ]}
            >
              {currentSlide.description}
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: translateAnim }],
              marginTop: buttonTop,
            }}
          >
            <Pressable style={styles.ctaButton} onPress={handleNext}>
              <Text style={styles.ctaText}>{currentSlide.buttonText}</Text>
            </Pressable>
          </Animated.View>

          <View style={styles.dotsWrap}>
            {slides.map((item, index) => {
              const active = index === activeIndex;
              return (
                <View
                  key={item.id}
                  style={[
                    styles.dot,
                    active && styles.dotActive,
                  ]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F4EEE3',
  },

  safeArea: {
    flex: 1,
  },

  topBar: {
    paddingHorizontal: 18,
    zIndex: 10,
  },

  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6B0000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? -1 : -2,
  },

  page: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 26,
  },

  imageWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 2,
  },

  textWrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: 0,
    paddingHorizontal: 10,
  },

  title: {
    fontWeight: '700',
    color: '#1C1410',
    textAlign: 'center',
  },

  description: {
    color: '#2F231D',
    textAlign: 'center',
  },

  ctaButton: {
    width: 110,
    height: 32,
    borderRadius: 2,
    backgroundColor: '#4F0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  ctaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  dotsWrap: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(79,0,0,0.24)',
  },

  dotActive: {
    width: 18,
    backgroundColor: '#4F0000',
  },
});