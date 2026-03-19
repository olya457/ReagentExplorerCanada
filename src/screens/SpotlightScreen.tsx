import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Share,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AtlasStackParamList } from '../navigation/types';
import { waypoints } from '../data/waypoints.data';
import { getSavedWaypointIds, toggleSavedWaypoint } from '../storage/harborStorage';

type Props = NativeStackScreenProps<AtlasStackParamList, 'Spotlight'>;

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

export default function SpotlightScreen({ route, navigation }: Props) {
  const place = waypoints.find(item => item.id === route.params.placeId);
  const { height, width } = useWindowDimensions();

  const isSmall = height < 760;
  const isVerySmall = height < 690;
  const isNarrow = width < 360;

  const [isSaved, setIsSaved] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;
  const mapAnim = useRef(new Animated.Value(0)).current;

  const imageHeight = isVerySmall ? 175 : isSmall ? 205 : 235;
  const pageTitleSize = isVerySmall ? 15 : 16;
  const cardTitleSize = isVerySmall ? 18 : 21;
  const textSize = isVerySmall ? 13 : 14;
  const mapHeight = isVerySmall ? 180 : isSmall ? 210 : 240;
  const bottomPad = isVerySmall ? 110 : 132;
  const sidePad = isNarrow ? 14 : 18;
  const heartSize = isVerySmall ? 18 : 20;

  useEffect(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(18);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim, route.params.placeId]);

  useEffect(() => {
    Animated.timing(mapAnim, {
      toValue: showMap ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [showMap, mapAnim]);

  const syncSaved = useCallback(async () => {
    if (!place) return;
    const ids = await getSavedWaypointIds();
    setIsSaved(ids.includes(place.id));
  }, [place]);

  useEffect(() => {
    syncSaved();
  }, [syncSaved]);

  const onToggleSave = async () => {
    if (!place) return;
    const updated = await toggleSavedWaypoint(place.id);
    setIsSaved(updated.includes(place.id));
  };

  const onShare = async () => {
    if (!place) return;

    try {
      await Share.share({
        message:
          `${place.title}\n` +
          `Location: ${place.city}, ${place.region}, ${place.country}\n` +
          `Coordinates: ${place.coordinates.lat}, ${place.coordinates.lng}\n\n` +
          `${place.details}`,
      });
    } catch (error) {
      console.log('share place error', error);
    }
  };

  const onToggleMap = () => {
    setShowMap(prev => !prev);
  };

  const onBackToAtlas = () => {
    navigation.navigate('AtlasHome');
  };

  const coordsText = useMemo(() => {
    if (!place) return '';
    return `${place.coordinates.lat}, ${place.coordinates.lng}`;
  }, [place]);

  const mapContainerHeight = mapAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, mapHeight],
  });

  if (!place) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Location not found</Text>
          <Pressable style={styles.backOnlyButton} onPress={onBackToAtlas}>
            <Text style={styles.backOnlyText}>Back to Locations</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingHorizontal: sidePad,
          paddingTop: 10,
          paddingBottom: bottomPad,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          }}
        >
          <View style={styles.topRow}>
            <Pressable style={styles.backCircle} onPress={onBackToAtlas}>
              <Text style={styles.backArrow}>←</Text>
            </Pressable>

            <View style={styles.titlePill}>
              <Text style={[styles.titlePillText, { fontSize: pageTitleSize }]}>
                Location Details
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={imageMap[place.imageName]}
              style={[styles.heroImage, { height: imageHeight }]}
              resizeMode="cover"
            />

            <Text style={[styles.placeTitle, { fontSize: cardTitleSize }]}>
              {place.title}
            </Text>

            <Text style={[styles.metaText, { fontSize: textSize }]}>
              Category: {place.category}
            </Text>

            <Text style={[styles.metaText, { fontSize: textSize }]}>
              Location: {place.city}, {place.region}, {place.country}
            </Text>

            <Text style={[styles.metaText, { fontSize: textSize }]}>
              Coordinates: {coordsText}
            </Text>

            <Text
              style={[
                styles.description,
                {
                  fontSize: textSize,
                  lineHeight: isVerySmall ? 20 : 22,
                },
              ]}
            >
              {place.details}
            </Text>

            <View style={styles.actionsRow}>
              <Pressable style={styles.iconButton} onPress={onShare}>
                <Text style={styles.iconGlyph}>↗</Text>
              </Pressable>

              <Pressable style={styles.mapButton} onPress={onToggleMap}>
                <Text style={styles.mapButtonText}>
                  {showMap ? 'Hide Map' : 'Show Map'}
                </Text>
              </Pressable>

              <Pressable style={styles.iconButton} onPress={onToggleSave}>
                <Text
                  style={[
                    styles.heartIcon,
                    { fontSize: heartSize },
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
                  height: mapContainerHeight,
                  opacity: mapAnim,
                  marginTop: showMap ? 14 : 0,
                },
              ]}
            >
              {showMap && (
                <View style={styles.mapCard}>
                  <Text style={styles.mapLabel}>Location Preview</Text>

                  <View style={styles.mapInnerWrap}>
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: place.coordinates.lat,
                        longitude: place.coordinates.lng,
                        latitudeDelta: 0.12,
                        longitudeDelta: 0.12,
                      }}
                      region={{
                        latitude: place.coordinates.lat,
                        longitude: place.coordinates.lng,
                        latitudeDelta: 0.12,
                        longitudeDelta: 0.12,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: place.coordinates.lat,
                          longitude: place.coordinates.lng,
                        }}
                        title={place.title}
                        description={`${place.city}, ${place.region}`}
                      />
                    </MapView>
                  </View>
                </View>
              )}
            </Animated.View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5E0014',
  },

  container: {
    flex: 1,
    backgroundColor: '#5E0014',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  backCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  backArrow: {
    color: '#221713',
    fontSize: 28,
    marginTop: -2,
  },

  titlePill: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D5AB9B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlePillText: {
    color: '#120D0B',
    fontWeight: '800',
  },

  card: {
    backgroundColor: '#61202B',
    borderWidth: 1,
    borderColor: '#C9A98C',
    borderRadius: 4,
    padding: 12,
  },

  heroImage: {
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#3A0D14',
  },

  placeTitle: {
    color: '#F1E6D9',
    fontWeight: '700',
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

  iconButton: {
    width: 34,
    height: 30,
    backgroundColor: '#7B8644',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconGlyph: {
    color: '#10130C',
    fontSize: 18,
    fontWeight: '800',
  },

  mapButton: {
    minWidth: 124,
    height: 30,
    backgroundColor: '#7B8644',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  mapButtonText: {
    color: '#10130C',
    fontSize: 14,
    fontWeight: '700',
  },

  heartIcon: {
    color: '#F0E5D4',
    fontWeight: '700',
  },

  heartIconActive: {
    color: '#D62839',
  },

  mapWrap: {
    overflow: 'hidden',
  },

  mapCard: {
    flex: 1,
    backgroundColor: '#6A2430',
    borderWidth: 1,
    borderColor: '#C9A98C',
    borderRadius: 6,
    padding: 8,
  },

  mapLabel: {
    color: '#F6EFE5',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },

  mapInnerWrap: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#3A0D14',
  },

  map: {
    flex: 1,
  },

  emptyWrap: {
    flex: 1,
    backgroundColor: '#5E0014',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  emptyTitle: {
    color: '#F6EFE5',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 18,
    textAlign: 'center',
  },

  backOnlyButton: {
    minWidth: 180,
    height: 46,
    backgroundColor: '#62000E',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  backOnlyText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});