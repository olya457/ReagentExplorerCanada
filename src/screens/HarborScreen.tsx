import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
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
import { useFocusEffect, useNavigation, StackActions } from '@react-navigation/native';
import { waypoints, type WaypointItem } from '../data/waypoints.data';

const STORAGE_KEY = 'saved_waypoints_v1';

const emptySavedIllustration = require('../assets/images/saved_places_empty.png');

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

export default function HarborScreen() {
  const navigation = useNavigation<any>();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isVerySmall = height <= 680;
  const isSmall = height <= 760;
  const isShort = height <= 820;
  const isNarrow = width <= 360;
  const isVeryNarrow = width <= 340;

  const [savedItems, setSavedItems] = useState<WaypointItem[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<WaypointItem | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;

  const sidePadding = isVeryNarrow ? 12 : isNarrow ? 14 : 18;
  const topPadding = insets.top + 8;

  const headerFontSize = isVerySmall ? 15 : 16;
  const headerPillHeight = isVerySmall ? 44 : 50;

  const listThumbWidth = isVerySmall ? 82 : 96;
  const listThumbHeight = isVerySmall ? 52 : 60;

  const titleFont = isVerySmall ? 14 : 16;
  const bodyFont = isVerySmall ? 12 : 14;

  const emptyImageWidth = isVerySmall ? 180 : isSmall ? 210 : 260;
  const emptyImageHeight = isVerySmall ? 180 : isSmall ? 210 : 260;

  const emptyTitleSize = isVerySmall ? 16 : isSmall ? 18 : 20;
  const emptyTextSize = isVerySmall ? 12 : 14;
  const emptyTextWidth = isVerySmall ? Math.min(width - 56, 250) : Math.min(width - 64, 290);

  const exploreButtonWidth = isVerySmall ? 170 : isSmall ? 180 : 190;
  const exploreButtonHeight = isVerySmall ? 38 : 40;

  const detailImageHeight = isVerySmall ? 150 : isSmall ? 170 : 195;

  const triggerAppear = useCallback(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(18);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  const loadSaved = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const items = waypoints.filter(item => ids.includes(item.id));

      setSavedItems(items);

      if (selectedPlace && !ids.includes(selectedPlace.id)) {
        setSelectedPlace(null);
      }
    } catch (error) {
      console.log('loadSaved error', error);
    }
  }, [selectedPlace]);

  useFocusEffect(
    useCallback(() => {
      loadSaved();
      triggerAppear();
      return () => {};
    }, [loadSaved, triggerAppear]),
  );

  const removeSaved = async (id: string) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const updated = ids.filter(item => item !== id);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      const filteredItems = waypoints.filter(item => updated.includes(item.id));
      setSavedItems(filteredItems);

      if (selectedPlace?.id === id) {
        setSelectedPlace(null);
      }
    } catch (error) {
      console.log('removeSaved error', error);
    }
  };

  const onShare = async (place: WaypointItem) => {
    try {
      await Share.share({
        message:
          `${place.title}\n` +
          `Location: ${place.city}, ${place.region}, ${place.country}\n` +
          `Coordinates: ${place.coordinates.lat}, ${place.coordinates.lng}\n\n` +
          `${place.details}`,
      });
    } catch (error) {
      console.log('share saved place error', error);
    }
  };

  const onExplorePlaces = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    try {
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.log('navigation back error', error);
    }
  };

  const selectedImage = useMemo(() => {
    if (!selectedPlace) return null;
    return imageMap[selectedPlace.imageName];
  }, [selectedPlace]);

  const renderSavedCard = ({ item }: { item: WaypointItem }) => {
    return (
      <View style={styles.savedCardRow}>
        <Image
          source={imageMap[item.imageName]}
          style={[
            styles.savedThumb,
            {
              width: listThumbWidth,
              height: listThumbHeight,
            },
          ]}
          resizeMode="cover"
        />

        <View style={styles.savedCardBody}>
          <Text
            numberOfLines={isVerySmall ? 1 : 2}
            style={[
              styles.savedCardTitle,
              {
                fontSize: titleFont,
                lineHeight: isVerySmall ? 16 : 18,
              },
            ]}
          >
            {item.title}
          </Text>

          <View style={styles.savedActionsRow}>
            <Pressable
              style={[styles.openButton, isVerySmall && styles.openButtonSmall]}
              onPress={() => setSelectedPlace(item)}
            >
              <Text
                style={[
                  styles.openButtonText,
                  { fontSize: isVerySmall ? 11 : 12 },
                ]}
              >
                Open
              </Text>
            </Pressable>

            <Pressable
              style={[styles.bookmarkButton, isVerySmall && styles.bookmarkButtonSmall]}
              onPress={() => removeSaved(item.id)}
            >
              <Text
                style={[
                  styles.bookmarkIcon,
                  { fontSize: isVerySmall ? 13 : 15 },
                ]}
              >
                ♥
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View
        style={[
          styles.container,
          {
            paddingTop: topPadding,
            paddingHorizontal: sidePadding,
            opacity: fadeAnim,
            transform: [{ translateY: translateAnim }],
          },
        ]}
      >
        {!selectedPlace ? (
          <>
            <View
              style={[
                styles.headerPill,
                {
                  height: headerPillHeight,
                  borderRadius: headerPillHeight / 2,
                  minWidth: isVerySmall ? 180 : 190,
                },
              ]}
            >
              <Text style={[styles.headerText, { fontSize: headerFontSize }]}>
                Saved Places
              </Text>
            </View>

            {savedItems.length === 0 ? (
              <View
                style={[
                  styles.emptyWrap,
                  {
                    paddingTop: isVerySmall ? 8 : 16,
                    paddingBottom: Math.max(insets.bottom + 18, 18),
                    justifyContent: isShort ? 'center' : 'center',
                  },
                ]}
              >
                <Image
                  source={emptySavedIllustration}
                  style={{
                    width: emptyImageWidth,
                    height: emptyImageHeight,
                    marginTop: isVerySmall ? 4 : 0,
                  }}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.emptyTitle,
                    {
                      fontSize: emptyTitleSize,
                      marginTop: isVerySmall ? 8 : 12,
                      marginBottom: isVerySmall ? 8 : 10,
                    },
                  ]}
                >
                  Nothing Saved Yet
                </Text>

                <Text
                  style={[
                    styles.emptyText,
                    {
                      fontSize: emptyTextSize,
                      lineHeight: isVerySmall ? 18 : 22,
                      maxWidth: emptyTextWidth,
                    },
                  ]}
                >
                  You haven’t saved any places so far. Start exploring unusual locations across
                  Canada and add the ones that spark your curiosity to your list.
                </Text>

                <Pressable
                  style={[
                    styles.exploreButton,
                    {
                      minWidth: exploreButtonWidth,
                      height: exploreButtonHeight,
                      marginTop: isVerySmall ? 18 : 24,
                    },
                  ]}
                  onPress={onExplorePlaces}
                >
                  <Text
                    style={[
                      styles.exploreButtonText,
                      { fontSize: isVerySmall ? 13 : 14 },
                    ]}
                  >
                    Explore Places
                  </Text>
                </Pressable>
              </View>
            ) : (
              <FlatList
                data={savedItems}
                keyExtractor={item => item.id}
                renderItem={renderSavedCard}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: isVerySmall ? 14 : 18,
                  paddingBottom: Math.max(insets.bottom + 90, 90),
                }}
              />
            )}
          </>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: Math.max(insets.bottom + 90, 90),
            }}
          >
            <View
              style={[
                styles.detailTopRow,
                { marginBottom: isVerySmall ? 12 : 16 },
              ]}
            >
              <Pressable
                style={[styles.backCircle, isVerySmall && styles.backCircleSmall]}
                onPress={() => setSelectedPlace(null)}
              >
                <Text
                  style={[
                    styles.backArrow,
                    { fontSize: isVerySmall ? 24 : 28 },
                  ]}
                >
                  ←
                </Text>
              </Pressable>

              <View
                style={[
                  styles.headerPill,
                  {
                    flex: 1,
                    marginLeft: 10,
                    height: headerPillHeight,
                    borderRadius: headerPillHeight / 2,
                  },
                ]}
              >
                <Text style={[styles.headerText, { fontSize: headerFontSize }]}>
                  Saved Places
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.detailCard,
                { padding: isVerySmall ? 10 : 12 },
              ]}
            >
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={[styles.detailImage, { height: detailImageHeight }]}
                  resizeMode="cover"
                />
              )}

              <Text
                style={[
                  styles.detailTitle,
                  { fontSize: isVerySmall ? 16 : 18 },
                ]}
              >
                {selectedPlace.title}
              </Text>

              <Text style={[styles.detailMeta, { fontSize: bodyFont }]}>
                Location: {selectedPlace.city}, {selectedPlace.region}, {selectedPlace.country}
              </Text>

              <Text style={[styles.detailMeta, { fontSize: bodyFont }]}>
                Coordinates: {selectedPlace.coordinates.lat}, {selectedPlace.coordinates.lng}
              </Text>

              <Text
                style={[
                  styles.detailText,
                  {
                    fontSize: bodyFont,
                    lineHeight: isVerySmall ? 20 : 22,
                  },
                ]}
              >
                {selectedPlace.details}
              </Text>

              <View
                style={[
                  styles.detailActionsRow,
                  { marginTop: isVerySmall ? 14 : 18 },
                ]}
              >
                <Pressable
                  style={[
                    styles.smallActionButton,
                    isVerySmall && styles.smallActionButtonSmall,
                  ]}
                  onPress={() => onShare(selectedPlace)}
                >
                  <Text
                    style={[
                      styles.smallActionIcon,
                      { fontSize: isVerySmall ? 16 : 18 },
                    ]}
                  >
                    ↗
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.mapActionButton,
                    isVerySmall && styles.mapActionButtonSmall,
                  ]}
                  onPress={() => setSelectedPlace(null)}
                >
                  <Text
                    style={[
                      styles.mapActionText,
                      { fontSize: isVerySmall ? 13 : 14 },
                    ]}
                  >
                    Exit
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.smallActionButton,
                    isVerySmall && styles.smallActionButtonSmall,
                  ]}
                  onPress={() => removeSaved(selectedPlace.id)}
                >
                  <Text
                    style={[
                      styles.smallActionIcon,
                      styles.activeHeart,
                      { fontSize: isVerySmall ? 16 : 18 },
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#efdbd3ff',
  },

  container: {
    flex: 1,
    backgroundColor: '#EFE8D3',
  },

  headerPill: {
    alignSelf: 'center',
    backgroundColor: '#D6AEA3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  headerText: {
    color: '#140B09',
    fontWeight: '700',
  },

  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    color: '#3A0010',
    fontWeight: '800',
    textAlign: 'center',
  },

  emptyText: {
    color: '#3A0010',
    textAlign: 'center',
  },

  exploreButton: {
    backgroundColor: '#5B0713',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },

  exploreButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  savedCardRow: {
    flexDirection: 'row',
    backgroundColor: '#5E1725',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    borderRadius: 3,
    padding: 6,
    marginBottom: 12,
  },

  savedThumb: {
    borderRadius: 2,
    backgroundColor: '#3A0D14',
  },

  savedCardBody: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'space-between',
    paddingVertical: 2,
    minWidth: 0,
  },

  savedCardTitle: {
    color: '#F3E8DE',
    fontWeight: '700',
  },

  savedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  openButton: {
    minWidth: 58,
    height: 26,
    borderRadius: 2,
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  openButtonSmall: {
    minWidth: 52,
    height: 24,
    paddingHorizontal: 12,
  },

  openButtonText: {
    color: '#16170F',
    fontWeight: '700',
  },

  bookmarkButton: {
    width: 26,
    height: 26,
    borderRadius: 2,
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  bookmarkButtonSmall: {
    width: 24,
    height: 24,
  },

  bookmarkIcon: {
    color: '#8B0000',
    fontWeight: '800',
  },

  detailTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#a52f0eff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backCircleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  backArrow: {
    color: '#221713',
    marginTop: -2,
  },

  detailCard: {
    backgroundColor: '#5E1725',
    borderWidth: 1,
    borderColor: '#D5AB9B',
    borderRadius: 4,
  },

  detailImage: {
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#3A0D14',
  },

  detailTitle: {
    color: '#F3E8DE',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },

  detailMeta: {
    color: '#F3E8DE',
    marginBottom: 5,
  },

  detailText: {
    color: '#FFFFFF',
    marginTop: 8,
  },

  detailActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  smallActionButton: {
    width: 34,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallActionButtonSmall: {
    width: 30,
    height: 28,
  },

  smallActionIcon: {
    color: '#16170F',
    fontWeight: '800',
  },

  activeHeart: {
    color: '#8B0000',
  },

  mapActionButton: {
    minWidth: 122,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#798643',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  mapActionButtonSmall: {
    minWidth: 104,
    height: 28,
    paddingHorizontal: 14,
  },

  mapActionText: {
    color: '#16170F',
    fontWeight: '700',
  },
});