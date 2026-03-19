import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { echoNotes } from '../data/echoNotes.data';

type EchoNoteItem = (typeof echoNotes)[number];

export default function EchoScreen() {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<EchoNoteItem>>(null);

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const isVerySmall = height < 690;
  const isNarrow = width < 360;

  const horizontalPadding = isNarrow ? 14 : 18;
  const cardPadding = isVerySmall ? 14 : 18;
  const cardRadius = isVerySmall ? 22 : 26;

  const titleFont = isVerySmall ? 14 : 16;
  const cardTitleSize = isVerySmall ? 15 : 17;
  const cardTextSize = isVerySmall ? 13 : 14;

  const selectedNote = useMemo(
    () => echoNotes.find(item => item.id === selectedNoteId) ?? null,
    [selectedNoteId]
  );

  const closeModal = () => {
    setSelectedNoteId(null);
  };

  const renderItem = ({ item }: { item: EchoNoteItem }) => {
    return (
      <View
        style={[
          styles.card,
          {
            padding: cardPadding,
            borderRadius: cardRadius,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { fontSize: cardTitleSize }]}>
          {item.title}
        </Text>

        <Text
          style={[styles.cardText, { fontSize: cardTextSize }]}
          numberOfLines={3}
        >
          {item.content}
        </Text>

        <Pressable
          style={styles.openButton}
          onPress={() => setSelectedNoteId(item.id)}
        >
          <Text style={styles.openButtonText}>OPEN</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.container,
          {
            paddingTop: Math.max(insets.top - 10, 16),
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        <View style={styles.headerCurtain}>
          <View style={styles.header}>
            <Text style={[styles.headerText, { fontSize: titleFont }]}>
              Travel Insights
            </Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={echoNotes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <Modal
        visible={!!selectedNote}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                width: Math.min(width - 32, 430),
                maxHeight: height * 0.78,
                borderRadius: isVerySmall ? 24 : 28,
                padding: isVerySmall ? 16 : 20,
                marginTop: insets.top + 12,
                marginBottom: Math.max(insets.bottom, 16) + 12,
              },
            ]}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    fontSize: isVerySmall ? 20 : 24,
                  },
                ]}
              >
                {selectedNote?.title}
              </Text>

              <Text
                style={[
                  styles.modalText,
                  {
                    fontSize: isVerySmall ? 14 : 15,
                  },
                ]}
              >
                {selectedNote?.content}
              </Text>
            </ScrollView>

            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7B0015',
  },

  container: {
    flex: 1,
  },

  headerCurtain: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 2,
  },

  header: {
    alignSelf: 'center',
    backgroundColor: '#E5C7BE',
    paddingTop: 12,
    paddingBottom: 17,
    paddingHorizontal: 26,
    borderRadius: 40,
  },

  headerText: {
    fontWeight: '700',
    color: '#000000',
  },

  listContent: {
    paddingTop: 10,
    paddingBottom: 90,
  },

  card: {
    backgroundColor: '#F5E6E1',
    marginBottom: 18,
  },

  cardTitle: {
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },

  cardText: {
    color: '#333333',
    lineHeight: 20,
    marginBottom: 16,
  },

  openButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#5E0A14',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  openButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  modalCard: {
    backgroundColor: '#F5E6E1',
    width: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
  },

  modalScrollContent: {
    paddingBottom: 18,
  },

  modalTitle: {
    fontWeight: '800',
    color: '#000000',
    marginBottom: 14,
  },

  modalText: {
    color: '#333333',
    lineHeight: 24,
  },

  closeButton: {
    alignSelf: 'center',
    minWidth: 140,
    backgroundColor: '#5E0A14',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    marginTop: 8,
  },

  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
});