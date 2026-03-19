import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Share,
  Animated,
  Easing,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { sparkQuiz, type QuizQuestion, type QuizLevel } from '../data/sparkQuiz.data';

const introIllustration = require('../assets/images/quiz_intro_scene.png');
const successIllustration = require('../assets/images/quiz_level_done.png');
const failIllustration = require('../assets/images/quiz_game_over.png');

const STORAGE_LEVEL_KEY = 'pulse_current_level_v1';

type ScreenMode = 'intro' | 'play' | 'level_done' | 'game_over';

export default function PulseScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isVerySmall = height < 690;
  const isSmall = height < 780;
  const isNarrow = width < 360;
  const isTabletLike = width >= 700;

  const [screenMode, setScreenMode] = useState<ScreenMode>('intro');
  const [savedLevelIndex, setSavedLevelIndex] = useState(0);
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isScreenReady, setIsScreenReady] = useState(false);

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const translateAnimation = useRef(new Animated.Value(18)).current;
  const scaleAnimation = useRef(new Animated.Value(0.985)).current;

  const currentLevel: QuizLevel | undefined = sparkQuiz[activeLevelIndex];
  const currentQuestion: QuizQuestion | undefined = currentLevel?.questions[questionIndex];

  const ui = useMemo(() => {
    const horizontalPad = isTabletLike ? 34 : isNarrow ? 14 : isVerySmall ? 16 : 20;
    const topPadding = Math.max(insets.top + (isVerySmall ? 4 : 8), isVerySmall ? 8 : 12);
    const bottomPadding = Math.max(insets.bottom + (isVerySmall ? 18 : 24), isVerySmall ? 20 : 26);

    return {
      horizontalPad,
      topPadding,
      bottomPadding,
      titlePillHeight: isVerySmall ? 42 : isSmall ? 46 : 50,
      titleFontSize: isVerySmall ? 13 : 16,
      titlePillMinWidth: Math.min(width - horizontalPad * 2, isVerySmall ? 228 : 282),
      introImageWidth: Math.min(width - horizontalPad * 2, isVerySmall ? 235 : isSmall ? 295 : 350),
      introImageHeight: Math.min(height * (isVerySmall ? 0.26 : isSmall ? 0.31 : 0.36), isVerySmall ? 235 : isSmall ? 305 : 390),
      introSmallTitleFontSize: isVerySmall ? 21 : isSmall ? 25 : 28,
      introMainTitleFontSize: isVerySmall ? 25 : isSmall ? 31 : 34,
      introTextFontSize: isVerySmall ? 12 : 14,
      introButtonWidth: Math.min(width - horizontalPad * 2, isVerySmall ? 220 : 290),
      introButtonHeight: isVerySmall ? 50 : 58,
      questionCardWidth: Math.min(width - horizontalPad * 2, isTabletLike ? 640 : width - horizontalPad * 2),
      questionCardPadding: isVerySmall ? 14 : isSmall ? 16 : 18,
      questionFontSize: isVerySmall ? 15 : isSmall ? 17 : 20,
      questionLineHeight: isVerySmall ? 23 : isSmall ? 27 : 30,
      optionFontSize: isVerySmall ? 13 : 15,
      optionMinHeight: isVerySmall ? 46 : isSmall ? 48 : 52,
      optionGap: isVerySmall ? 12 : 16,
      topButtonSize: isVerySmall ? 42 : 48,
      backArrowSize: isVerySmall ? 24 : 28,
      levelLabelFontSize: isVerySmall ? 12 : 14,
      scoreLabelFontSize: isVerySmall ? 11 : 13,
      resultImageWidth: Math.min(width - horizontalPad * 2, isVerySmall ? 190 : 245),
      resultImageHeight: Math.min(width - horizontalPad * 2, isVerySmall ? 190 : 245),
      resultTitleFontSize: isVerySmall ? 21 : 24,
      resultTextFontSize: isVerySmall ? 14 : 16,
      resultTextLineHeight: isVerySmall ? 21 : 25,
      resultPrimaryButtonWidth: Math.min(width - horizontalPad * 2 - 92, isVerySmall ? 170 : 210),
      resultPrimaryButtonHeight: isVerySmall ? 38 : 42,
      smallSquareWidth: isVerySmall ? 36 : 40,
      smallSquareHeight: isVerySmall ? 34 : 36,
      footerBrandFontSize: isVerySmall ? 24 : 32,
      contentMaxWidth: isTabletLike ? 680 : width - horizontalPad * 2,
    };
  }, [height, insets.bottom, insets.top, isNarrow, isSmall, isTabletLike, isVerySmall, width]);

  const triggerAppearAnimation = useCallback(() => {
    fadeAnimation.setValue(0);
    translateAnimation.setValue(18);
    scaleAnimation.setValue(0.985);

    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnimation, {
        toValue: 0,
        duration: 360,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnimation, scaleAnimation, translateAnimation]);

  const loadSavedLevelIndex = useCallback(async () => {
    try {
      const rawValue = await AsyncStorage.getItem(STORAGE_LEVEL_KEY);
      const parsedValue = rawValue ? JSON.parse(rawValue) : 0;
      const normalizedValue = Number.isInteger(parsedValue)
        ? Math.max(0, Math.min(parsedValue, sparkQuiz.length - 1))
        : 0;

      setSavedLevelIndex(normalizedValue);
      setIsScreenReady(true);
    } catch (error) {
      console.log('loadSavedLevelIndex error', error);
      setSavedLevelIndex(0);
      setIsScreenReady(true);
    }
  }, []);

  const saveCurrentLevelIndex = useCallback(async (levelIndex: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_LEVEL_KEY, JSON.stringify(levelIndex));
      setSavedLevelIndex(levelIndex);
    } catch (error) {
      console.log('saveCurrentLevelIndex error', error);
    }
  }, []);

  const resetToIntroState = useCallback(() => {
    setScreenMode('intro');
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setCorrectAnswersCount(0);
  }, []);

  useFocusEffect(
    useCallback(() => {
      resetToIntroState();
      loadSavedLevelIndex();
      return () => {};
    }, [loadSavedLevelIndex, resetToIntroState]),
  );

  useEffect(() => {
    if (isScreenReady) {
      triggerAppearAnimation();
    }
  }, [screenMode, activeLevelIndex, questionIndex, isScreenReady, triggerAppearAnimation]);

  const startChallenge = useCallback(() => {
    setActiveLevelIndex(savedLevelIndex);
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setCorrectAnswersCount(0);
    setScreenMode('play');
  }, [savedLevelIndex]);

  const getCorrectOptionId = useCallback(() => {
    return currentQuestion?.options.find(option => option.isCorrect)?.id ?? null;
  }, [currentQuestion]);

  const onSelectOption = useCallback((optionId: string) => {
    if (!currentQuestion || !currentLevel || selectedOptionId) {
      return;
    }

    setSelectedOptionId(optionId);

    const selectedOption = currentQuestion.options.find(option => option.id === optionId);
    const isCorrect = !!selectedOption?.isCorrect;
    const nextCorrectAnswersCount = correctAnswersCount + (isCorrect ? 1 : 0);
    const isLastQuestionInLevel = questionIndex === currentLevel.questions.length - 1;

    setTimeout(async () => {
      setCorrectAnswersCount(nextCorrectAnswersCount);

      if (!isLastQuestionInLevel) {
        setQuestionIndex(previousIndex => previousIndex + 1);
        setSelectedOptionId(null);
        return;
      }

      setSelectedOptionId(null);

      const hasPassedLevel = nextCorrectAnswersCount >= 4;

      if (hasPassedLevel) {
        const nextLevelIndex = Math.min(activeLevelIndex + 1, sparkQuiz.length - 1);

        if (activeLevelIndex < sparkQuiz.length - 1) {
          await saveCurrentLevelIndex(nextLevelIndex);
        } else {
          await saveCurrentLevelIndex(activeLevelIndex);
        }

        setScreenMode('level_done');
      } else {
        await saveCurrentLevelIndex(activeLevelIndex);
        setScreenMode('game_over');
      }
    }, 700);
  }, [
    activeLevelIndex,
    correctAnswersCount,
    currentLevel,
    currentQuestion,
    questionIndex,
    saveCurrentLevelIndex,
    selectedOptionId,
  ]);

  const continueToNextLevel = useCallback(() => {
    const isLastLevel = activeLevelIndex === sparkQuiz.length - 1;

    if (isLastLevel) {
      resetToIntroState();
      return;
    }

    const nextLevelIndex = Math.min(activeLevelIndex + 1, sparkQuiz.length - 1);

    setActiveLevelIndex(nextLevelIndex);
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setCorrectAnswersCount(0);
    setScreenMode('play');
  }, [activeLevelIndex, resetToIntroState]);

  const retryCurrentLevel = useCallback(() => {
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setCorrectAnswersCount(0);
    setScreenMode('play');
  }, []);

  const goToIntroScreen = useCallback(() => {
    resetToIntroState();
  }, [resetToIntroState]);

  const shareResult = useCallback(async () => {
    try {
      let message = 'I am playing Canada Curiosity Explore.';

      if (currentLevel) {
        message = `I finished ${currentLevel.title} with ${correctAnswersCount} correct answers out of 7 in Canada Curiosity Explore.`;
      }

      await Share.share({ message });
    } catch (error) {
      console.log('shareResult error', error);
    }
  }, [correctAnswersCount, currentLevel]);

  const correctOptionId = getCorrectOptionId();

  const getOptionStyle = useCallback((optionId: string) => {
    if (!selectedOptionId) {
      return styles.optionButton;
    }

    if (optionId === correctOptionId) {
      return [styles.optionButton, styles.optionCorrect];
    }

    if (optionId === selectedOptionId && optionId !== correctOptionId) {
      return [styles.optionButton, styles.optionWrong];
    }

    return [styles.optionButton, styles.optionDisabled];
  }, [correctOptionId, selectedOptionId]);

  if (!isScreenReady) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderWrap}>
          <Text style={styles.loaderText}>Loading challenge...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[
          styles.full,
          {
            opacity: fadeAnimation,
            transform: [{ translateY: translateAnimation }, { scale: scaleAnimation }],
          },
        ]}
      >
        {screenMode === 'intro' && (
          <ScrollView
            style={styles.introScroll}
            contentContainerStyle={[
              styles.introWrap,
              {
                paddingTop: ui.topPadding,
                paddingBottom: ui.bottomPadding,
                paddingHorizontal: ui.horizontalPad,
              },
            ]}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View
              style={[
                styles.titlePill,
                {
                  height: ui.titlePillHeight,
                  borderRadius: ui.titlePillHeight / 2,
                  minWidth: ui.titlePillMinWidth,
                },
              ]}
            >
              <Text style={[styles.titlePillText, { fontSize: ui.titleFontSize }]}>
                Canada Curiosity Explore
              </Text>
            </View>

            <Image
              source={introIllustration}
              style={{
                width: ui.introImageWidth,
                height: ui.introImageHeight,
                marginTop: isVerySmall ? 10 : 14,
              }}
              resizeMode="contain"
            />

            <Text
              style={[
                styles.introMiniTitle,
                {
                  fontSize: ui.introSmallTitleFontSize,
                  marginTop: isVerySmall ? 6 : 10,
                },
              ]}
            >
              Test Your
            </Text>

            <Text
              style={[
                styles.introMainTitle,
                {
                  fontSize: ui.introMainTitleFontSize,
                  marginTop: 2,
                },
              ]}
            >
              Canada Curiosity
            </Text>

            <Text
              style={[
                styles.savedLevelText,
                {
                  fontSize: ui.introTextFontSize,
                  marginTop: isVerySmall ? 8 : 10,
                },
              ]}
            >
              Continue from {sparkQuiz[savedLevelIndex]?.title ?? 'Level 1'}
            </Text>

            <Pressable
              style={[
                styles.primaryButton,
                {
                  width: ui.introButtonWidth,
                  minHeight: ui.introButtonHeight,
                  marginTop: isVerySmall ? 20 : 24,
                  borderRadius: isVerySmall ? 8 : 10,
                },
              ]}
              onPress={startChallenge}
            >
              <Text style={styles.primaryButtonText}>Start the Challenge</Text>
            </Pressable>
          </ScrollView>
        )}

        {screenMode === 'play' && currentQuestion && currentLevel && (
          <ScrollView
            style={styles.playWrap}
            contentContainerStyle={{
              paddingTop: ui.topPadding,
              paddingBottom: ui.bottomPadding + 28,
              paddingHorizontal: ui.horizontalPad,
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={[styles.topRow, { width: ui.contentMaxWidth }]}>
              <Pressable
                style={[
                  styles.backCircle,
                  {
                    width: ui.topButtonSize,
                    height: ui.topButtonSize,
                    borderRadius: ui.topButtonSize / 2,
                    marginRight: 10,
                  },
                ]}
                onPress={goToIntroScreen}
              >
                <Text style={[styles.backArrow, { fontSize: ui.backArrowSize }]}>←</Text>
              </Pressable>

              <View
                style={[
                  styles.titlePillPlay,
                  {
                    height: ui.titlePillHeight,
                    borderRadius: ui.titlePillHeight / 2,
                  },
                ]}
              >
                <Text style={[styles.titlePillText, { fontSize: ui.titleFontSize }]}>
                  Canada Curiosity Explore
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.levelLabel,
                {
                  marginTop: isVerySmall ? 14 : 18,
                  fontSize: ui.levelLabelFontSize,
                },
              ]}
            >
              {currentLevel.title} · Question {questionIndex + 1}/7
            </Text>

            <Text
              style={[
                styles.scoreLabel,
                {
                  fontSize: ui.scoreLabelFontSize,
                  marginTop: 6,
                },
              ]}
            >
              Correct answers: {correctAnswersCount}
            </Text>

            <View
              style={[
                styles.questionCard,
                {
                  width: ui.questionCardWidth,
                  marginTop: isVerySmall ? 16 : isSmall ? 22 : 30,
                  padding: ui.questionCardPadding,
                  borderRadius: isVerySmall ? 10 : 12,
                },
              ]}
            >
              <Text
                style={[
                  styles.questionText,
                  {
                    fontSize: ui.questionFontSize,
                    lineHeight: ui.questionLineHeight,
                  },
                ]}
              >
                {questionIndex + 1}. {currentQuestion.question}
              </Text>

              <View style={[styles.optionsWrap, { gap: ui.optionGap }]}>
                {currentQuestion.options.map(option => (
                  <Pressable
                    key={option.id}
                    style={[
                      getOptionStyle(option.id),
                      {
                        minHeight: ui.optionMinHeight,
                        borderRadius: isVerySmall ? 8 : 10,
                      },
                    ]}
                    onPress={() => onSelectOption(option.id)}
                    disabled={!!selectedOptionId}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          fontSize: ui.optionFontSize,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Text
              style={[
                styles.footerBrand,
                {
                  marginTop: isVerySmall ? 24 : 36,
                  fontSize: ui.footerBrandFontSize,
                },
              ]}
            >
              Reagent
            </Text>
          </ScrollView>
        )}

        {screenMode === 'level_done' && currentLevel && (
          <ScrollView
            style={styles.resultWrap}
            contentContainerStyle={{
              paddingTop: ui.topPadding + 8,
              paddingBottom: ui.bottomPadding + 20,
              paddingHorizontal: ui.horizontalPad,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={[styles.resultContent, { width: ui.contentMaxWidth }]}>
              <Image
                source={successIllustration}
                style={{
                  width: ui.resultImageWidth,
                  height: ui.resultImageHeight,
                }}
                resizeMode="contain"
              />

              <Text
                style={[
                  styles.resultTitle,
                  {
                    fontSize: ui.resultTitleFontSize,
                    marginTop: isVerySmall ? 10 : 14,
                  },
                ]}
              >
                Excellent Explorer
              </Text>

              <Text
                style={[
                  styles.resultText,
                  {
                    fontSize: ui.resultTextFontSize,
                    lineHeight: ui.resultTextLineHeight,
                    maxWidth: Math.min(width - ui.horizontalPad * 2, 320),
                  },
                ]}
              >
                You completed {currentLevel.title} with {correctAnswersCount} correct answers out of 7. This level is passed because you answered at least 4 questions correctly.
              </Text>

              <View style={[styles.resultActions, isNarrow && styles.resultActionsWrap]}>
                <Pressable
                  style={[
                    styles.smallSquareButton,
                    {
                      width: ui.smallSquareWidth,
                      height: ui.smallSquareHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={shareResult}
                >
                  <Text style={styles.smallSquareIcon}>↗</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.resultPrimaryButton,
                    {
                      width: ui.resultPrimaryButtonWidth,
                      minHeight: ui.resultPrimaryButtonHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={continueToNextLevel}
                >
                  <Text style={styles.resultPrimaryText}>
                    {activeLevelIndex === sparkQuiz.length - 1 ? 'Back to Start' : 'Continue Exploring'}
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.smallSquareButton,
                    {
                      width: ui.smallSquareWidth,
                      height: ui.smallSquareHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={goToIntroScreen}
                >
                  <Text style={styles.smallSquareIcon}>⌂</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}

        {screenMode === 'game_over' && currentLevel && (
          <ScrollView
            style={styles.resultWrap}
            contentContainerStyle={{
              paddingTop: ui.topPadding + 8,
              paddingBottom: ui.bottomPadding + 20,
              paddingHorizontal: ui.horizontalPad,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={[styles.resultContent, { width: ui.contentMaxWidth }]}>
              <Image
                source={failIllustration}
                style={{
                  width: ui.resultImageWidth,
                  height: ui.resultImageHeight,
                }}
                resizeMode="contain"
              />

              <Text
                style={[
                  styles.resultTitle,
                  {
                    fontSize: ui.resultTitleFontSize,
                    marginTop: isVerySmall ? 10 : 14,
                  },
                ]}
              >
                Not This Time
              </Text>

              <Text
                style={[
                  styles.resultText,
                  {
                    fontSize: ui.resultTextFontSize,
                    lineHeight: ui.resultTextLineHeight,
                    maxWidth: Math.min(width - ui.horizontalPad * 2, 320),
                  },
                ]}
              >
                You completed {currentLevel.title} with {correctAnswersCount} correct answers out of 7. This level is not passed because you need at least 4 correct answers to win.
              </Text>

              <View style={[styles.resultActions, isNarrow && styles.resultActionsWrap]}>
                <Pressable
                  style={[
                    styles.smallSquareButton,
                    {
                      width: ui.smallSquareWidth,
                      height: ui.smallSquareHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={shareResult}
                >
                  <Text style={styles.smallSquareIcon}>↗</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.resultPrimaryButton,
                    {
                      width: ui.resultPrimaryButtonWidth,
                      minHeight: ui.resultPrimaryButtonHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={retryCurrentLevel}
                >
                  <Text style={styles.resultPrimaryText}>Try Again</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.smallSquareButton,
                    {
                      width: ui.smallSquareWidth,
                      height: ui.smallSquareHeight,
                      borderRadius: 8,
                    },
                  ]}
                  onPress={goToIntroScreen}
                >
                  <Text style={styles.smallSquareIcon}>⌂</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6A0019',
  },

  full: {
    flex: 1,
  },

  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A0019',
    paddingHorizontal: 24,
  },

  loaderText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  introScroll: {
    flex: 1,
    backgroundColor: '#6A0019',
  },

  introWrap: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A0019',
  },

  titlePill: {
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  titlePillPlay: {
    flex: 1,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  titlePillText: {
    color: '#120D0B',
    fontWeight: '800',
    textAlign: 'center',
  },

  introMiniTitle: {
    color: '#F6EFE5',
    fontWeight: '500',
    textAlign: 'center',
  },

  introMainTitle: {
    color: '#F6EFE5',
    fontWeight: '900',
    textAlign: 'center',
  },

  savedLevelText: {
    color: '#F6EFE5',
    fontWeight: '600',
    textAlign: 'center',
  },

  primaryButton: {
    backgroundColor: '#62000E',
    borderWidth: 2,
    borderColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },

  playWrap: {
    flex: 1,
    backgroundColor: '#6A0019',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backCircle: {
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F2E6DB',
  },

  backArrow: {
    color: '#221713',
    fontWeight: '700',
    marginTop: -2,
  },

  levelLabel: {
    color: '#F4E7DE',
    textAlign: 'center',
    fontWeight: '700',
  },

  scoreLabel: {
    color: '#E2CDB6',
    textAlign: 'center',
    fontWeight: '600',
  },

  questionCard: {
    alignSelf: 'center',
    backgroundColor: '#E7DFD0',
    borderWidth: 1.5,
    borderColor: '#D5AB9B',
  },

  questionText: {
    color: '#17120F',
    fontWeight: '700',
  },

  optionsWrap: {
    marginTop: 22,
  },

  optionButton: {
    backgroundColor: '#A87261',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: '#E8D9CF',
  },

  optionCorrect: {
    backgroundColor: '#66773A',
    borderColor: '#E8D9CF',
  },

  optionWrong: {
    backgroundColor: '#8B0000',
    borderColor: '#E8D9CF',
  },

  optionDisabled: {
    backgroundColor: '#A87261',
    borderColor: '#E8D9CF',
    opacity: 0.82,
  },

  optionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  footerBrand: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '300',
    letterSpacing: 0.5,
  },

  resultWrap: {
    flex: 1,
    backgroundColor: '#6A0019',
  },

  resultContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  resultTitle: {
    color: '#F6EFE5',
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },

  resultText: {
    color: '#F6EFE5',
    textAlign: 'center',
  },

  resultActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    gap: 8,
  },

  resultActionsWrap: {
    flexWrap: 'wrap',
  },

  smallSquareButton: {
    backgroundColor: '#62000E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#D5AB9B',
  },

  smallSquareIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },

  resultPrimaryButton: {
    backgroundColor: '#62000E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#D5AB9B',
  },

  resultPrimaryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});