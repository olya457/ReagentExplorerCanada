import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AtlasStackParamList } from '../navigation/types';
import {
  waypoints,
  type WaypointCategory,
  type WaypointItem,
} from '../data/waypoints.data';
import {
  getSavedWaypointIds,
  toggleSavedWaypoint,
} from '../storage/harborStorage';

type Props = NativeStackScreenProps<AtlasStackParamList, 'AtlasHome'>;

type FilterKey = 'All' | WaypointCategory;

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

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'All', label: 'All' },
  { key: 'Strange Nature', label: 'Strange Nature' },
  { key: 'Stone Wonders', label: 'Stone Wonders' },
  { key: 'Mysterious Places', label: 'Mysterious Places' },
  { key: 'Curious Landmarks', label: 'Curious Landmarks' },
];

export default function AtlasScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const { height, width } = useWindowDimensions();

  const isSmall = height < 760;
  const isVerySmall = height < 690;
  const isNarrow = width < 360;

  const titleSize = isVerySmall ? 24 : isSmall ? 26 : 30;
  const chipFont = isVerySmall ? 9 : 10;

  const cardMinH = isVerySmall ? 64 : isSmall ? 68 : 72;
  const thumbW = isNarrow ? 78 : isVerySmall ? 82 : 90;
  const thumbH = isNarrow ? 54 : isVerySmall ? 56 : 60;

  const cardTitleSize = isVerySmall ? 12 : 13;
  const cardMetaSize = isVerySmall ? 10 : 11;
  const buttonFont = isVerySmall ? 9 : 10;
  const heartSize = isVerySmall ? 18 : 20;

  const syncSavedIds = useCallback(async () => {
    const ids = await getSavedWaypointIds();
    setSavedIds(ids);
  }, []);

  useFocusEffect(
    useCallback(() => {
      syncSavedIds();
    }, [syncSavedIds]),
  );

  const filteredData = useMemo(() => {
    if (activeFilter === 'All') return waypoints;
    return waypoints.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const handleToggleSave = async (id: string) => {
    const updated = await toggleSavedWaypoint(id);
    setSavedIds(updated);
  };

  const renderFilter = ({ item }: { item: { key: FilterKey; label: string } }) => {
    const active = item.key === activeFilter;

    return (
      <Pressable
        onPress={() => setActiveFilter(item.key)}
        style={[styles.filterChip, active && styles.filterChipActive]}
      >
        <Text
          style={[
            styles.filterText,
            { fontSize: chipFont },
            active && styles.filterTextActive,
          ]}
        >
          {item.label}
        </Text>
      </Pressable>
    );
  };

  const renderCard = ({ item }: { item: WaypointItem }) => {
    const source = imageMap[item.imageName];
    const isSaved = savedIds.includes(item.id);

    return (
      <View style={[styles.card, { minHeight: cardMinH }]}>
        <View style={styles.cardMainPress}>
          <Pressable
            style={styles.leftZone}
            onPress={() => navigation.navigate('Spotlight', { placeId: item.id })}
          >
            <Image
              source={source}
              style={[styles.thumb, { width: thumbW, height: thumbH }]}
              resizeMode="cover"
            />

            <View style={styles.cardBody}>
              <Text numberOfLines={1} style={[styles.cardTitle, { fontSize: cardTitleSize }]}>
                {item.title}
              </Text>

              <Text numberOfLines={1} style={[styles.cardMeta, { fontSize: cardMetaSize }]}>
                {item.city}
              </Text>
            </View>
          </Pressable>

          <View style={styles.rightZone}>
            <Pressable
              style={styles.openButton}
              onPress={() => navigation.navigate('Spotlight', { placeId: item.id })}
            >
              <Text style={[styles.openText, { fontSize: buttonFont }]}>Open</Text>
            </Pressable>

            <Pressable
              style={styles.saveButton}
              onPress={() => handleToggleSave(item.id)}
              hitSlop={8}
            >
              <Text
                style={[
                  styles.saveIcon,
                  { fontSize: heartSize },
                  isSaved && styles.saveIconActive,
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
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={[styles.title, { fontSize: titleSize }]}>Reagent Spots</Text>

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: isVerySmall ? 110 : 130 },
          ]}
          ListHeaderComponent={
            <FlatList
              data={FILTERS}
              keyExtractor={item => item.key}
              renderItem={renderFilter}
              horizontal={false}
              numColumns={3}
              scrollEnabled={false}
              columnWrapperStyle={styles.filtersRow}
              contentContainerStyle={styles.filtersWrap}
            />
          }
        />
      </View>
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
    paddingHorizontal: 16,
  },

  title: {
    color: '#F6EFE5',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },

  filtersWrap: {
    paddingBottom: 12,
  },

  filtersRow: {
    gap: 8,
    marginBottom: 8,
  },

  filterChip: {
    minHeight: 28,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#8F775A',
    borderWidth: 1,
    borderColor: '#6C4C3D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    flex: 1,
  },

  filterChipActive: {
    backgroundColor: '#7EA45E',
    borderColor: '#617E48',
  },

  filterText: {
    fontWeight: '600',
    color: '#1A120F',
    textAlign: 'center',
  },

  filterTextActive: {
    color: '#10210C',
    fontWeight: '800',
  },

  listContent: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#61202B',
    borderWidth: 1,
    borderColor: '#C9A98C',
    marginBottom: 10,
    padding: 6,
    borderRadius: 4,
  },

  cardMainPress: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftZone: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  thumb: {
    borderRadius: 2,
    backgroundColor: '#3A0D14',
  },

  cardBody: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    paddingVertical: 2,
  },

  cardTitle: {
    color: '#F1E6D9',
    fontWeight: '700',
  },

  cardMeta: {
    color: '#E2CDB6',
    marginTop: 2,
  },

  rightZone: {
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 54,
  },

  openButton: {
    minWidth: 52,
    height: 22,
    backgroundColor: '#6EA347',
    borderWidth: 1,
    borderColor: '#4D6F30',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 2,
  },

  openText: {
    color: '#14210F',
    fontWeight: '700',
  },

  saveButton: {
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 6,
  },

  saveIcon: {
    color: '#F0E5D4',
    fontWeight: '700',
  },

  saveIconActive: {
    color: '#D62839',
  },
});