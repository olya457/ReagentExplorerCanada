import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'saved_waypoints_v1';

export async function getSavedWaypointIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.log('getSavedWaypointIds error', error);
    return [];
  }
}

export async function isWaypointSaved(id: string): Promise<boolean> {
  const ids = await getSavedWaypointIds();
  return ids.includes(id);
}

export async function toggleSavedWaypoint(id: string): Promise<string[]> {
  try {
    const ids = await getSavedWaypointIds();
    const updated = ids.includes(id)
      ? ids.filter(item => item !== id)
      : [...ids, id];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.log('toggleSavedWaypoint error', error);
    return [];
  }
}