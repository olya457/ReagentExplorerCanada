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
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { waypoints, type WaypointItem } from '../data/waypoints.data';
import { getSavedWaypointIds, toggleSavedWaypoint } from '../storage/harborStorage';

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

const INITIAL_REGION: Region = {
  latitude: 56.1304,
  longitude: -106.3468,
  latitudeDelta: 28,
  longitudeDelta: 28,
};

export default function GridlineScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isVerySmall = height < 690;
  const isSmall = height < 780;
  const isNarrow = width < 360;

  const ui = useMemo(() => {
    return {
      topPad: Math.max(insets.top + 8, 10),
      sidePad: isNarrow ? 12 : isVerySmall ? 14 : 18,
      pillHeight: isVerySmall ? 42 : 48,
      pillFont: isVerySmall ? 14 : 16,
      backSize: isVerySmall ? 40 : 46,
      controlBtn: isVerySmall ? 38 : 44,
      resetHeight: isVerySmall ? 34 : 38,
      resetMinWidth: isVerySmall ? 66 : 74,
      controlsTop: height * (isVerySmall ? 0.29 : isSmall ? 0.31 : 0.33),
      modalWidth: Math.min(width - (isNarrow ? 20 : 32), 460),
      modalRadius: isVerySmall ? 16 : 18,
      imageHeight: isVerySmall ? 140 : isSmall ? 168 : 210,
      titleSize: isVerySmall ? 16 : isSmall ? 18 : 20,
      metaSize: isVerySmall ? 11 : isSmall ? 12 : 14,
      descSize: isVerySmall ? 12 : isSmall ? 13 : 14,
      descLine: isVerySmall ? 18 : isSmall ? 20 : 22,
      actionSize: isVerySmall ? 40 : 46,
      exitHeight: isVerySmall ? 40 : 46,
      exitMinWidth: isVerySmall ? 110 : 132,
      closeTopGap: Math.max(insets.top + 10, 14),
      closeBottomGap: Math.max(insets.bottom + 14, 16),
    };
  }, [height, insets.bottom, insets.top, isNarrow, isSmall, isVerySmall, width]);

  const [selectedPlace, setSelectedPlace] = useState<WaypointItem | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [modalVisible, setModalVisible] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const modalAnim = useRef(new Animated.Value(0)).current;

  const syncSaved = useCallback(async () => {
    const ids = await getSavedWaypointIds();
    setSavedIds(ids);
  }, []);

  useEffect(() => {
    syncSaved();
  }, [syncSaved]);

  useEffect(() => {
    if (!modalVisible) {
      modalAnim.setValue(0);
      return;
    }

    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [modalAnim, modalVisible]);

  const animateToRegion = useCallback((nextRegion: Region, duration = 350) => {
    setRegion(nextRegion);
    mapRef.current?.animateToRegion(nextRegion, duration);
  }, []);

  const onMarkerPress = useCallback((place: WaypointItem) => {
    setSelectedPlace(place);
    setModalVisible(true);

    const nextRegion: Region = {
      latitude: place.coordinates.lat,
      longitude: place.coordinates.lng,
      latitudeDelta: 8,
      longitudeDelta: 8,
    };

    animateToRegion(nextRegion, 450);
  }, [animateToRegion]);

  const onCloseCard = useCallback(() => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedPlace(null);
    });
  }, [modalAnim]);

  const onToggleSave = useCallback(async () => {
    if (!selectedPlace) return;
    const updated = await toggleSavedWaypoint(selectedPlace.id);
    setSavedIds(updated);
  }, [selectedPlace]);

  const onShare = useCallback(async () => {
    if (!selectedPlace) return;

    try {
      await Share.share({
        message:
          `${selectedPlace.title}\n` +
          `Location: ${selectedPlace.city}, ${selectedPlace.region}, ${selectedPlace.country}\n` +
          `Coordinates: ${selectedPlace.coordinates.lat}, ${selectedPlace.coordinates.lng}\n\n` +
          `${selectedPlace.details}`,
      });
    } catch (error) {
      console.log('share from map error', error);
    }
  }, [selectedPlace]);

  const zoomIn = useCallback(() => {
    const nextRegion: Region = {
      ...region,
      latitudeDelta: Math.max(region.latitudeDelta * 0.6, 0.3),
      longitudeDelta: Math.max(region.longitudeDelta * 0.6, 0.3),
    };
    animateToRegion(nextRegion);
  }, [animateToRegion, region]);

  const zoomOut = useCallback(() => {
    const nextRegion: Region = {
      ...region,
      latitudeDelta: Math.min(region.latitudeDelta * 1.6, 60),
      longitudeDelta: Math.min(region.longitudeDelta * 1.6, 60),
    };
    animateToRegion(nextRegion);
  }, [animateToRegion, region]);

  const resetMap = useCallback(() => {
    animateToRegion(INITIAL_REGION, 500);
    setModalVisible(false);
    setSelectedPlace(null);
  }, [animateToRegion]);

  const selectedSaved = selectedPlace ? savedIds.includes(selectedPlace.id) : false;

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [34, 0],
  });

  const modalScale = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1],
  });

  const titleWidth = Math.min(width - 120, 320);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {waypoints.map(place => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.coordinates.lat,
              longitude: place.coordinates.lng,
            }}
            onPress={() => onMarkerPress(place)}
          />
        ))}
      </MapView>

      <SafeAreaView pointerEvents="box-none" style={styles.overlay}>
        <View
          style={[
            styles.topBar,
            {
              paddingTop: ui.topPad,
              paddingHorizontal: ui.sidePad,
            },
          ]}
        >
          <View
            style={[
              styles.titlePillCentered,
              {
                height: ui.pillHeight,
                borderRadius: ui.pillHeight / 2,
                width: titleWidth,
              },
            ]}
          >
            <Text style={[styles.titlePillText, { fontSize: ui.pillFont }]}>
              Map
            </Text>
          </View>
        </View>

        <View
          pointerEvents="box-none"
          style={[
            styles.controlsWrap,
            {
              right: ui.sidePad,
              top: ui.controlsTop,
            },
          ]}
        >
          <Pressable
            style={[
              styles.controlButton,
              {
                width: ui.controlBtn,
                height: ui.controlBtn,
                borderRadius: ui.controlBtn / 2,
              },
            ]}
            onPress={zoomIn}
          >
            <Text style={[styles.controlText, { fontSize: isVerySmall ? 21 : 24 }]}>+</Text>
          </Pressable>

          <Pressable
            style={[
              styles.controlButton,
              {
                width: ui.controlBtn,
                height: ui.controlBtn,
                borderRadius: ui.controlBtn / 2,
              },
            ]}
            onPress={zoomOut}
          >
            <Text style={[styles.controlText, { fontSize: isVerySmall ? 21 : 24 }]}>−</Text>
          </Pressable>

          <Pressable
            style={[
              styles.resetButton,
              {
                minWidth: ui.resetMinWidth,
                height: ui.resetHeight,
                borderRadius: ui.resetHeight / 2,
              },
            ]}
            onPress={resetMap}
          >
            <Text style={[styles.resetText, { fontSize: isVerySmall ? 11 : 12 }]}>Reset</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={onCloseCard}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalCardWrap,
              {
                width: ui.modalWidth,
                maxHeight: height - ui.closeTopGap - ui.closeBottomGap,
                opacity: modalAnim,
                borderRadius: ui.modalRadius,
                transform: [{ translateY: modalTranslateY }, { scale: modalScale }],
              },
            ]}
          >
            {selectedPlace && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={[
                  styles.modalScroll,
                  { paddingBottom: Math.max(insets.bottom + 12, 16) },
                ]}
              >
                <View style={styles.modalTopRow}>
                  <Pressable
                    style={[
                      styles.backCircle,
                      {
                        width: ui.backSize,
                        height: ui.backSize,
                        borderRadius: ui.backSize / 2,
                      },
                    ]}
                    onPress={onCloseCard}
                  >
                    <Text style={[styles.backArrow, { fontSize: isVerySmall ? 24 : 28 }]}>←</Text>
                  </Pressable>

                  <View
                    style={[
                      styles.modalTitlePill,
                      {
                        height: ui.pillHeight,
                        borderRadius: ui.pillHeight / 2,
                      },
                    ]}
                  >
                    <Text style={[styles.titlePillText, { fontSize: ui.pillFont }]}>
                      Map
                    </Text>
                  </View>
                </View>

                <View style={styles.card}>
                  <Image
                    source={imageMap[selectedPlace.imageName]}
                    style={[styles.cardImage, { height: ui.imageHeight }]}
                    resizeMode="cover"
                  />

                  <Text style={[styles.cardTitle, { fontSize: ui.titleSize }]}>
                    {selectedPlace.title}
                  </Text>

                  <Text style={[styles.metaText, { fontSize: ui.metaSize }]}>
                    Location: {selectedPlace.city}, {selectedPlace.region}, {selectedPlace.country}
                  </Text>

                  <Text style={[styles.metaText, { fontSize: ui.metaSize }]}>
                    Coordinates: {selectedPlace.coordinates.lat}, {selectedPlace.coordinates.lng}
                  </Text>

                  <Text
                    style={[
                      styles.descText,
                      {
                        fontSize: ui.descSize,
                        lineHeight: ui.descLine,
                      },
                    ]}
                  >
                    {selectedPlace.details}
                  </Text>

                  <View style={[styles.actionsRow, isNarrow && styles.actionsRowWrap]}>
                    <Pressable
                      style={[
                        styles.smallAction,
                        {
                          height: ui.actionSize,
                          width: ui.actionSize,
                          borderRadius: 6,
                        },
                      ]}
                      onPress={onShare}
                    >
                      <Text style={[styles.smallActionGlyph, { fontSize: isVerySmall ? 18 : 22 }]}>
                        ↗
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.exitAction,
                        {
                          height: ui.exitHeight,
                          minWidth: ui.exitMinWidth,
                          borderRadius: 6,
                        },
                        isNarrow && styles.exitActionNarrow,
                      ]}
                      onPress={onCloseCard}
                    >
                      <Text style={[styles.exitActionText, { fontSize: isVerySmall ? 14 : 16 }]}>
                        Exit
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.smallAction,
                        {
                          height: ui.actionSize,
                          width: ui.actionSize,
                          borderRadius: 6,
                        },
                      ]}
                      onPress={onToggleSave}
                    >
                      <Text
                        style={[
                          styles.heartIcon,
                          { fontSize: isVerySmall ? 18 : 22 },
                          selectedSaved && styles.heartIconActive,
                        ]}
                      >
                        ♥
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            )}
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11161D',
  },

  overlay: {
    flex: 1,
  },

  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlePillCentered: {
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  titlePillText: {
    color: '#120D0B',
    fontWeight: '800',
  },

  controlsWrap: {
    position: 'absolute',
    alignItems: 'center',
    gap: 8,
  },

  controlButton: {
    backgroundColor: 'rgba(94, 23, 37, 0.92)',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controlText: {
    color: '#F6EFE5',
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? -1 : 0,
  },

  resetButton: {
    backgroundColor: 'rgba(94, 23, 37, 0.92)',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  resetText: {
    color: '#F6EFE5',
    fontWeight: '700',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(8, 10, 14, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  modalCardWrap: {
    backgroundColor: '#EFE9D8',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D5AB9B',
  },

  modalScroll: {
    padding: 12,
  },

  modalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },

  backCircle: {
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  backArrow: {
    color: '#221713',
    marginTop: Platform.OS === 'ios' ? -2 : -1,
  },

  modalTitlePill: {
    flex: 1,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: '#5E1725',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    borderRadius: 8,
    padding: 12,
  },

  cardImage: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#3A0D14',
    marginBottom: 12,
  },

  cardTitle: {
    color: '#F3E8DE',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },

  metaText: {
    color: '#F3E8DE',
    marginBottom: 5,
  },

  descText: {
    color: '#FFFFFF',
    marginTop: 8,
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    gap: 8,
  },

  actionsRowWrap: {
    flexWrap: 'wrap',
  },

  smallAction: {
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallActionGlyph: {
    color: '#16170F',
    fontWeight: '800',
  },

  exitAction: {
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  exitActionNarrow: {
    flexBasis: '100%',
  },

  exitActionText: {
    color: '#16170F',
    fontWeight: '700',
  },

  heartIcon: {
    color: '#16170F',
    fontWeight: '800',
  },

  heartIconActive: {
    color: '#C4172C',
  },
});