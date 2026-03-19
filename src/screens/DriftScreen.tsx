import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
  Share,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { waypoints, type WaypointItem } from '../data/waypoints.data';
import { getSavedWaypointIds, toggleSavedWaypoint } from '../storage/harborStorage';

const introMarkerScene = require('../assets/images/orbit_reveal_scene.png');

const imageMap: Record<string, any> = {
  mineral_mosaic_lake: require('../assets/images/places/mineral_mosaic_lake.png'),
  frozen_breath_lake: require('../assets/images/places/frozen_breath_lake.png'),
  dune_whisper: require('../assets/images/places/dune_whisper.png'),
  northern_dunes: require('../assets/images/places/northern_dunes.png'),
  arctic_dome_fields: require('../assets/images/places/arctic_dome_fields.png'),
  sheer_sky_wall: require('../assets/images/places/sheer_sky_wall.png'),

  sea_arch_monolith: require('../assets/images/places/sea_arch_monolith.png'),
  badlands_totems: require('../assets/images/places/badlands_totems.png'),
  island_stone_blooms: require('../assets/images/places/island_stone_blooms.png'),
  tidal_giants: require('../assets/images/places/tidal_giants.png'),
  river_cut_span: require('../assets/images/places/river_cut_span.png'),
  coast_pillar_garden: require('../assets/images/places/coast_pillar_garden.png'),

  hidden_isle_pit: require('../assets/images/places/hidden_isle_pit.png'),
  shadow_valley_run: require('../assets/images/places/shadow_valley_run.png'),
  atlantic_curve_sands: require('../assets/images/places/atlantic_curve_sands.png'),
  fog_totem_harbor: require('../assets/images/places/fog_totem_harbor.png'),
  cliff_echo_ground: require('../assets/images/places/cliff_echo_ground.png'),
  canyon_fall_roar: require('../assets/images/places/canyon_fall_roar.png'),

  coin_colossus: require('../assets/images/places/coin_colossus.png'),
  timber_giant: require('../assets/images/places/timber_giant.png'),
  beaver_guardian: require('../assets/images/places/beaver_guardian.png'),
  ocean_ribbon_view: require('../assets/images/places/ocean_ribbon_view.png'),
  mac_high_watch: require('../assets/images/places/mac_high_watch.png'),
  sky_goose_gate: require('../assets/images/places/sky_goose_gate.png'),
  forest_bridge_swing: require('../assets/images/places/forest_bridge_swing.png'),
};

type ScreenSize = {
  isVerySmall: boolean;
  isSmall: boolean;
  isNarrow: boolean;
  horizontalPad: number;
  introImageWidth: number;
  introImageHeight: number;
  introTitleSize: number;
  introTextSize: number;
  introTextLine: number;
  revealButtonHeight: number;
  revealButtonWidth: number;
  modalWidth: number;
  modalRadius: number;
  heroHeight: number;
  titleSize: number;
  bodySize: number;
  bodyLine: number;
  mapHeight: number;
  iconButtonSize: number;
  heartSize: number;
  nextButtonHeight: number;
};

function getScreenSize(width: number, height: number): ScreenSize {
  const isVerySmall = height < 700;
  const isSmall = height < 780;
  const isNarrow = width < 360;

  return {
    isVerySmall,
    isSmall,
    isNarrow,
    horizontalPad: isNarrow ? 16 : 22,
    introImageWidth: isVerySmall ? 240 : isSmall ? 280 : 330,
    introImageHeight: isVerySmall ? 200 : isSmall ? 235 : 285,
    introTitleSize: isVerySmall ? 14 : 16,
    introTextSize: isVerySmall ? 16 : isSmall ? 18 : 20,
    introTextLine: isVerySmall ? 24 : isSmall ? 28 : 31,
    revealButtonHeight: isVerySmall ? 48 : 56,
    revealButtonWidth: isNarrow ? width - 40 : 235,
    modalWidth: isNarrow ? width - 20 : isSmall ? width - 34 : Math.min(width - 40, 440),
    modalRadius: isVerySmall ? 16 : 18,
    heroHeight: isVerySmall ? 150 : isSmall ? 175 : 205,
    titleSize: isVerySmall ? 17 : 20,
    bodySize: isVerySmall ? 12 : 14,
    bodyLine: isVerySmall ? 20 : 22,
    mapHeight: isVerySmall ? 170 : isSmall ? 200 : 230,
    iconButtonSize: isVerySmall ? 40 : 44,
    heartSize: isVerySmall ? 18 : 21,
    nextButtonHeight: isVerySmall ? 48 : 54,
  };
}

export default function DriftScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const ui = useMemo(() => getScreenSize(width, height), [width, height]);

  const [currentPlace, setCurrentPlace] = useState<WaypointItem | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showRandomWindow, setShowRandomWindow] = useState(false);

  const introFade = useRef(new Animated.Value(0)).current;
  const introTranslate = useRef(new Animated.Value(18)).current;

  const modalFade = useRef(new Animated.Value(0)).current;
  const modalTranslate = useRef(new Animated.Value(24)).current;

  const mapProgress = useRef(new Animated.Value(0)).current;

  const closeModal = useCallback(() => {
    setShowRandomWindow(false);
    setShowMap(false);
  }, []);

  const resetToIntro = useCallback(() => {
    setCurrentPlace(null);
    setIsSaved(false);
    setShowMap(false);
    setShowRandomWindow(false);
    mapProgress.setValue(0);
  }, [mapProgress]);

  useFocusEffect(
    useCallback(() => {
      resetToIntro();

      introFade.setValue(0);
      introTranslate.setValue(18);

      Animated.parallel([
        Animated.timing(introFade, {
          toValue: 1,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(introTranslate, {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, [introFade, introTranslate, resetToIntro]),
  );

  useEffect(() => {
    if (!showRandomWindow) {
      modalFade.setValue(0);
      modalTranslate.setValue(24);
      return;
    }

    Animated.parallel([
      Animated.timing(modalFade, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(modalTranslate, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [showRandomWindow, modalFade, modalTranslate]);

  useEffect(() => {
    Animated.timing(mapProgress, {
      toValue: showMap ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [showMap, mapProgress]);

  const syncSaved = useCallback(async (placeId?: string | null) => {
    if (!placeId) {
      setIsSaved(false);
      return;
    }

    const ids = await getSavedWaypointIds();
    setIsSaved(ids.includes(placeId));
  }, []);

  const pickRandomPlace = useCallback(
    async (excludeId?: string) => {
      const pool = excludeId
        ? waypoints.filter(item => item.id !== excludeId)
        : waypoints;

      if (pool.length === 0) {
        return;
      }

      const random = pool[Math.floor(Math.random() * pool.length)];

      setCurrentPlace(random);
      setShowMap(false);
      mapProgress.setValue(0);
      await syncSaved(random.id);
    },
    [mapProgress, syncSaved],
  );

  const revealPlace = useCallback(async () => {
    await pickRandomPlace();
    setShowRandomWindow(true);
  }, [pickRandomPlace]);

  const nextPlace = useCallback(async () => {
    if (!currentPlace) {
      await pickRandomPlace();
      return;
    }

    await pickRandomPlace(currentPlace.id);
  }, [currentPlace, pickRandomPlace]);

  const onToggleSave = useCallback(async () => {
    if (!currentPlace) return;

    const updated = await toggleSavedWaypoint(currentPlace.id);
    setIsSaved(updated.includes(currentPlace.id));
  }, [currentPlace]);

  const onToggleMap = useCallback(() => {
    setShowMap(prev => !prev);
  }, []);

  const sharePlace = useCallback(async () => {
    if (!currentPlace) return;

    try {
      await Share.share({
        message:
          `${currentPlace.title}\n` +
          `Location: ${currentPlace.city}, ${currentPlace.region}, ${currentPlace.country}\n` +
          `Coordinates: ${currentPlace.coordinates.lat}, ${currentPlace.coordinates.lng}\n\n` +
          `${currentPlace.details}`,
      });
    } catch (error) {
      console.log('sharePlace error', error);
    }
  }, [currentPlace]);

  const coordsText = useMemo(() => {
    if (!currentPlace) return '';
    return `${currentPlace.coordinates.lat}, ${currentPlace.coordinates.lng}`;
  }, [currentPlace]);

  const mapAnimatedHeight = mapProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ui.mapHeight],
  });

  const modalTopPadding = Math.max(insets.top + 10, 14);
  const modalBottomPadding = Math.max(insets.bottom + 18, 18);
  const modalMaxHeight = height - modalTopPadding - modalBottomPadding;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.bgTop} />
      <View style={styles.bgBottom} />

      <Animated.View
        style={[
          styles.introWrap,
          {
            paddingHorizontal: ui.horizontalPad,
            opacity: introFade,
            transform: [{ translateY: introTranslate }],
          },
        ]}
      >
        <View style={styles.titlePill}>
          <Text style={[styles.titlePillText, { fontSize: ui.introTitleSize }]}>
            Random Reagent
          </Text>
        </View>

        <Image
          source={introMarkerScene}
          style={{
            width: ui.introImageWidth,
            height: ui.introImageHeight,
          }}
          resizeMode="contain"
        />

        <Text
          style={[
            styles.introText,
            {
              fontSize: ui.introTextSize,
              lineHeight: ui.introTextLine,
              maxWidth: Math.min(width - ui.horizontalPad * 2, 340),
              marginTop: ui.isVerySmall ? 18 : 22,
            },
          ]}
        >
          Some of the most fascinating places in Canada are the ones you don’t plan to visit.
        </Text>

        <Pressable
          style={[
            styles.revealButton,
            {
              height: ui.revealButtonHeight,
              width: ui.revealButtonWidth,
              marginTop: ui.isVerySmall ? 26 : 38,
            },
          ]}
          onPress={revealPlace}
        >
          <Text style={styles.revealButtonText}>Reveal a Place</Text>
        </Pressable>
      </Animated.View>

      <Modal
        visible={showRandomWindow}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={closeModal}
      >
        <View
          style={[
            styles.modalOverlay,
            {
              paddingTop: modalTopPadding,
              paddingBottom: modalBottomPadding,
              paddingHorizontal: ui.isNarrow ? 10 : 14,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.modalCard,
              {
                width: ui.modalWidth,
                maxHeight: modalMaxHeight,
                borderRadius: ui.modalRadius,
                opacity: modalFade,
                transform: [{ translateY: modalTranslate }],
              },
            ]}
          >
            <View style={styles.modalTopRow}>
              <Pressable style={styles.closeCircle} onPress={closeModal} hitSlop={8}>
                <Text style={styles.closeArrow}>←</Text>
              </Pressable>

              <View style={styles.modalTitlePill}>
                <Text style={[styles.titlePillText, { fontSize: ui.introTitleSize }]}>
                  Random Reagent
                </Text>
              </View>
            </View>

            {currentPlace && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={[
                  styles.modalScrollContent,
                  {
                    paddingBottom: Math.max(insets.bottom + 12, 16),
                  },
                ]}
              >
                <View style={styles.placeCard}>
                  <Image
                    source={imageMap[currentPlace.imageName]}
                    style={[styles.heroImage, { height: ui.heroHeight }]}
                    resizeMode="cover"
                  />

                  <Text style={[styles.placeTitle, { fontSize: ui.titleSize }]}>
                    {currentPlace.title}
                  </Text>

                  <Text style={[styles.metaText, { fontSize: ui.bodySize }]}>
                    Location: {currentPlace.city}, {currentPlace.region}, {currentPlace.country}
                  </Text>

                  <Text style={[styles.metaText, { fontSize: ui.bodySize }]}>
                    Coordinates: {coordsText}
                  </Text>

                  <Text
                    style={[
                      styles.description,
                      {
                        fontSize: ui.bodySize,
                        lineHeight: ui.bodyLine,
                      },
                    ]}
                  >
                    {currentPlace.details}
                  </Text>

                  <View
                    style={[
                      styles.actionsRow,
                      ui.isNarrow && styles.actionsRowWrap,
                    ]}
                  >
                    <Pressable
                      style={[
                        styles.squareButton,
                        {
                          width: ui.iconButtonSize,
                          height: ui.iconButtonSize,
                        },
                      ]}
                      onPress={sharePlace}
                    >
                      <Text style={styles.iconGlyph}>↗</Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.mapButton,
                        ui.isNarrow && styles.mapButtonNarrow,
                        { minHeight: ui.iconButtonSize },
                      ]}
                      onPress={onToggleMap}
                    >
                      <Text style={styles.mapButtonText}>
                        {showMap ? 'Hide Map' : 'Show Map'}
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.squareButton,
                        {
                          width: ui.iconButtonSize,
                          height: ui.iconButtonSize,
                        },
                      ]}
                      onPress={onToggleSave}
                    >
                      <Text
                        style={[
                          styles.heartIcon,
                          { fontSize: ui.heartSize },
                          isSaved && styles.heartIconActive,
                        ]}
                      >
                        ♥
                      </Text>
                    </Pressable>
                  </View>

                  <Animated.View
                    style={[
                      styles.mapWrap,
                      {
                        height: mapAnimatedHeight,
                        opacity: mapProgress,
                        marginTop: showMap ? 14 : 0,
                      },
                    ]}
                  >
                    {showMap && (
                      <View style={styles.mapCard}>
                        <MapView
                          style={styles.map}
                          scrollEnabled
                          zoomEnabled
                          rotateEnabled={false}
                          pitchEnabled={false}
                          initialRegion={{
                            latitude: currentPlace.coordinates.lat,
                            longitude: currentPlace.coordinates.lng,
                            latitudeDelta: 0.12,
                            longitudeDelta: 0.12,
                          }}
                          region={{
                            latitude: currentPlace.coordinates.lat,
                            longitude: currentPlace.coordinates.lng,
                            latitudeDelta: 0.12,
                            longitudeDelta: 0.12,
                          }}
                        >
                          <Marker
                            coordinate={{
                              latitude: currentPlace.coordinates.lat,
                              longitude: currentPlace.coordinates.lng,
                            }}
                            title={currentPlace.title}
                            description={`${currentPlace.city}, ${currentPlace.region}`}
                          />
                        </MapView>
                      </View>
                    )}
                  </Animated.View>
                </View>

                <Pressable
                  style={[
                    styles.nextButton,
                    {
                      height: ui.nextButtonHeight,
                      marginTop: ui.isVerySmall ? 16 : 18,
                    },
                  ]}
                  onPress={nextPlace}
                >
                  <Text style={styles.nextButtonText}>Next Place</Text>
                </Pressable>
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EFE9D8',
  },

  bgTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EFE9D8',
  },

  bgBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '42%',
    backgroundColor: 'rgba(103, 0, 22, 0.34)',
  },

  introWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlePill: {
    minWidth: 220,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    paddingHorizontal: 18,
  },

  titlePillText: {
    color: '#120D0B',
    fontWeight: '800',
  },

  introText: {
    color: '#120D0B',
    fontWeight: '800',
    textAlign: 'center',
  },

  revealButton: {
    borderRadius: 8,
    backgroundColor: '#62000E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  revealButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 7, 11, 0.38)',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  modalCard: {
    backgroundColor: '#EFE9D8',
    paddingTop: 14,
    paddingHorizontal: 14,
    paddingBottom: 0,
    overflow: 'hidden',
  },

  modalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  closeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },

  closeArrow: {
    color: '#221713',
    fontSize: 28,
    marginTop: Platform.OS === 'ios' ? -2 : -1,
  },

  modalTitlePill: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  modalScrollContent: {
    paddingBottom: 16,
  },

  placeCard: {
    backgroundColor: '#5E1725',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    borderRadius: 8,
    padding: 12,
  },

  heroImage: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#3A0D14',
  },

  placeTitle: {
    color: '#F1E6D9',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },

  metaText: {
    color: '#F1E6D9',
    marginBottom: 5,
  },

  description: {
    color: '#F6EFE5',
    marginTop: 8,
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },

  actionsRowWrap: {
    flexWrap: 'wrap',
  },

  squareButton: {
    backgroundColor: '#7B8644',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconGlyph: {
    color: '#10130C',
    fontSize: 18,
    fontWeight: '800',
  },

  heartIcon: {
    color: '#F0E5D4',
    fontWeight: '700',
  },

  heartIconActive: {
    color: '#D62839',
  },

  mapButton: {
    flex: 1,
    backgroundColor: '#7B8644',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    minWidth: 126,
  },

  mapButtonNarrow: {
    width: '100%',
    flexBasis: '100%',
  },

  mapButtonText: {
    color: '#10130C',
    fontSize: 14,
    fontWeight: '700',
  },

  mapWrap: {
    overflow: 'hidden',
  },

  mapCard: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    backgroundColor: '#3A0D14',
  },

  map: {
    flex: 1,
  },

  nextButton: {
    alignSelf: 'center',
    minWidth: 210,
    paddingHorizontal: 20,
    backgroundColor: '#62000E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});