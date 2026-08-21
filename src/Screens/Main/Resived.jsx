import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONT_SIZES } from '../../Const/Display';

import LinearGradient from 'react-native-linear-gradient';

const ReceivedTab = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const filters = [
    { label: 'ALL', count: 0 },
    { label: 'PENDING', count: 0 },
    { label: 'EXPIRED', count: 0 },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Filter Chips */}
      <View style={styles.filterRow}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;
          
          if (isActive) {
            return (
              <LinearGradient
                key={filter.label}
                colors={['#c3971ea8', '#d5b139', '#ddb941']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.chip, styles.chipActiveGradient]}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setActiveFilter(filter.label)}
                >
                  <Text style={[styles.chipText, styles.chipTextActive]}>
                    {filter.label} · {filter.count}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            );
          }

          return (
            <TouchableOpacity
              key={filter.label}
              activeOpacity={0.7}
              style={styles.chip}
              onPress={() => setActiveFilter(filter.label)}
            >
              <Text style={styles.chipText}>
                {filter.label} · {filter.count}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Description */}
      <Text style={styles.description}>
        Challenges sent to you by other players. Accept to join their lobby.
      </Text>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons
          name="inbox-outline"
          size={hp(6)}
          color={COLORS.grayText}
        />
        <Text style={styles.emptyTitle}>No challenges received</Text>
        <Text style={styles.emptySubtitle}>
          When someone invites you to a match, it will appear here.
        </Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homebackground,
  },
  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  filterRow: {
    flexDirection: 'row',
    gap: wp(2),
  },
  chip: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
    backgroundColor: COLORS.chipBg,
  },
  chipActive: {
    backgroundColor: COLORS.activeChipBg,
    borderColor: COLORS.activeChipBg,
  },
  chipText: {
    color: COLORS.white,
    fontSize: hp(1.5),
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  chipTextActive: {
    color: COLORS.activeChipText,
  },
  description: {
    color: COLORS.grayText,
    fontSize: hp(1.6),
    lineHeight: hp(2.4),
    marginTop: hp(2.5),
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: hp(12),
  },
  emptyTitle: {
    color: COLORS.gold,
    fontSize: hp(2.2),
    fontWeight: 'bold',
    marginTop: hp(1.5),
  },
  emptySubtitle: {
    color: COLORS.grayText,
    fontSize: hp(1.6),
    textAlign: 'center',
    marginTop: hp(1),
    lineHeight: hp(2.4),
    paddingHorizontal: wp(4),
  },
  refreshText: {
    color: COLORS.gold,
    fontSize: hp(1.8),
    fontWeight: '600',
    marginTop: hp(2.5),
  },
});

export default ReceivedTab;
