import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  wp,
  hp,
  COLORS,
  FONT_SIZES,
  SafeAreaView,
  MaterialCommunityIcons,
  Modal,
} from '../../api/Index.js';
import ScreenHarder from '../../Components/screenHarder.jsx';
import CustomButton from '../../Components/CustomButton.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addJoinedPlayer } from '../../redux/tournamentSlice';
const generateBracket = (capacity, joinedPlayers) => {
  let size = 1;
  while (size < capacity) size *= 2;

  const players = Array.from({ length: capacity }, (_, i) => {
    if (i < joinedPlayers.length) {
      return { id: i + 1, name: joinedPlayers[i], isActive: true };
    }
    return { id: i + 1, name: `Waiting...`, isActive: false };
  });

  const byes = size - capacity;
  const initialSlots = [...players];
  for (let i = 0; i < byes; i++) {
    initialSlots.push({ id: `bye-${i}`, name: 'BYE', isBye: true });
  }

  const rounds = [];
  let currentSlots = initialSlots;
  let roundNum = 1;

  while (currentSlots.length >= 2) {
    const roundName =
      currentSlots.length === 2
        ? 'FINAL'
        : currentSlots.length === 4
        ? 'SEMIFINAL'
        : currentSlots.length === 8
        ? 'QUARTERFINAL'
        : `ROUND ${roundNum}`;
    const round = { roundNumber: roundNum, roundName, matches: [] };

    const nextSlots = [];
    for (let i = 0; i < currentSlots.length; i += 2) {
      const p1 = currentSlots[i];
      const p2 = currentSlots[i + 1];

      round.matches.push({ player1: p1, player2: p2 });

      if (p1?.isBye) nextSlots.push(p2);
      else if (p2?.isBye) nextSlots.push(p1);
      else
        nextSlots.push({
          id: `tbd-r${roundNum}-m${i / 2}`,
          name: 'TBD',
          isTbd: true,
        });
    }

    rounds.push(round);
    currentSlots = nextSlots;
    roundNum++;
  }

  return rounds;
};

const TournamentDetial = ({ route, navigation }) => {
  const tournament = route.params?.tournament || {
    name: 'Demo Tournament',
    capacity: 8,
  };

  // Get user from Redux
  const user = useSelector(state => state.auth.user);
  const credentials = useSelector(state => state.auth.credentials);
  const username = user?.name || credentials?.username || 'Player';

  const dispatch = useDispatch();
  const joinedPlayers = useSelector(state => state.tournament.joinedPlayers);
  const [rounds, setRounds] = useState([]);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    setRounds(generateBracket(tournament.capacity, joinedPlayers));
  }, [tournament.capacity, joinedPlayers]);

  const handleJoin = () => {
    if (joinedPlayers.length < tournament.capacity) {
      // Simulate adding a user. If it's the first to join, add the actual user name.
      const newPlayerName =
        joinedPlayers.length === 0
          ? username
          : `Player ${joinedPlayers.length + 1}`;
      dispatch(addJoinedPlayer(newPlayerName));
      if (route.params?.onJoin) {
        route.params.onJoin();
      }
    }
  };

  const openProfileModal = playerName => {
    if (
      playerName === 'Waiting...' ||
      playerName === 'BYE' ||
      playerName === 'TBD'
    )
      return;
    setSelectedPlayer({
      name: playerName,
      xp: Math.floor(Math.random() * 5000) + 1000,
      level: Math.floor(Math.random() * 50) + 1,
    });
    setProfileModalVisible(true);
  };

  const renderGroups = () => {
    if (rounds.length === 0) return null;
    const round1Matches = rounds[0].matches;

    return (
      <View style={styles.groupsContainer}>
        <Text style={styles.sectionTitle}>GROUPS</Text>
        <View style={styles.groupsGrid}>
          {round1Matches.map((match, index) => {
            const groupLetter = String.fromCharCode(65 + index); // A, B, C...
            return (
              <View key={index} style={styles.groupCard}>
                <Text style={styles.groupTitle}>GROUP {groupLetter}</Text>
                <TouchableOpacity
                  onPress={() => openProfileModal(match.player1.name)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.groupPlayer,
                      match.player1.isActive && styles.activePlayer,
                      match.player1.name === username && styles.highlightPlayer,
                    ]}
                  >
                    1. {match.player1.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => openProfileModal(match.player2.name)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.groupPlayer,
                      match.player2.isActive && styles.activePlayer,
                      match.player2.name === username && styles.highlightPlayer,
                    ]}
                  >
                    2. {match.player2.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderRules = () => (
    <View style={styles.rulesContainer}>
      <Text style={styles.sectionTitle}>RULES</Text>
      <View style={styles.rulesCard}>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Tournament Format:</Text> The tournament
          follows a single-elimination knockout format.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Players per Match:</Text> Each match is
          played between 2 players.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Advancement:</Text> The winner of each
          match advances to the next round. The loser is eliminated.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Tournament Bracket:</Text> The bracket
          and rounds are automatically generated based on the number of
          registered players.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Player Seeding:</Text> Players are
          matched using their level/ranking to create balanced matchups.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Match Entry:</Text> Players must enter
          their assigned match before the countdown ends.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>No-Show:</Text> A player who does not
          enter the match on time will lose by forfeit.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Disconnect:</Text> Leaving or
          disconnecting during a match is subject to the tournament's
          disconnect/away rules.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Tie:</Text> If a match ends in a tie, a
          tiebreaker will be played to determine who advances.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>BYE:</Text> If required, some players
          may receive a BYE (automatic advancement). A BYE is not counted as a
          match win.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Elimination:</Text> Once eliminated, a
          player cannot re-enter the current tournament.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Final:</Text> The winner of the Final
          becomes the Tournament Champion.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Fair Play:</Text> Players must follow
          Kazino's rules and play fairly. Any abuse, cheating, or exploitation
          may result in disqualification.
        </Text>
        <Text style={styles.ruleItem}>
          <Text style={styles.ruleBold}>Agreement:</Text> By joining the
          tournament, you confirm that you have read and agreed to these rules.
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <ScreenHarder
          title="DETAILS"
          subtitle="HAITIAN CARD LOUNGE"
          onPress={() => navigation.goBack()}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          {tournament.imageUri ? (
            <Image
              source={{ uri: tournament.imageUri }}
              style={styles.bannerImage}
            />
          ) : (
            <View style={[styles.bannerImage, styles.placeholderImage]}>
              <MaterialCommunityIcons
                name="trophy"
                size={50}
                color={COLORS.gold}
              />
            </View>
          )}
          <View style={styles.titleOverlay}>
            <Text style={styles.tournamentName}>{tournament.name}</Text>
          </View>
        </View>

        <View style={styles.detailsBar}>
          <View style={styles.detailItem}>
            <MaterialCommunityIcons
              name="account-group"
              size={20}
              color={COLORS.gold}
            />
            <Text style={styles.detailText}>
              {joinedPlayers.length} / {tournament.capacity} Joined
            </Text>
          </View>
          {tournament.reward ? (
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="gift"
                size={20}
                color={COLORS.gold}
              />
              <Text style={styles.detailText}>{tournament.reward}</Text>
            </View>
          ) : null}
        </View>

        {/* Vertical Bracket Map Section (Reversed so Final is at top) */}
        <Text
          style={[styles.sectionTitle, { marginLeft: wp(4), marginTop: hp(2) }]}
        >
          BRACKET MAP
        </Text>
        <View style={styles.bracketVertical}>
          {[...rounds].reverse().map((round, rIndex) => (
            <View key={rIndex} style={styles.roundVertical}>
              <Text style={styles.roundTitle}>{round.roundName}</Text>
              <View style={styles.matchesVerticalWrapper}>
                {round.matches.map((match, mIndex) => (
                  <View key={mIndex} style={styles.matchBoxVertical}>
                    <TouchableOpacity
                      style={[
                        styles.playerSlot,
                        match.player1.isBye && styles.byeSlot,
                      ]}
                      onPress={() => openProfileModal(match.player1.name)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.playerName,
                          match.player1.isActive && styles.activePlayer,
                          match.player1.name === username &&
                            styles.highlightPlayer,
                        ]}
                        numberOfLines={1}
                      >
                        {match.player1.name}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                      style={[
                        styles.playerSlot,
                        match.player2.isBye && styles.byeSlot,
                      ]}
                      onPress={() => openProfileModal(match.player2.name)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.playerName,
                          match.player2.isActive && styles.activePlayer,
                          match.player2.name === username &&
                            styles.highlightPlayer,
                        ]}
                        numberOfLines={1}
                      >
                        {match.player2.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {/* Down arrow is drawn if it's NOT the last item in the REVERSED array (which is Round 1) */}
              {rIndex < rounds.length - 1 && (
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={24}
                  color={COLORS.gold}
                  style={styles.downArrow}
                />
              )}
            </View>
          ))}
        </View>

        {/* Groups Section */}
        {renderGroups()}

        {/* Rules Section */}
        {/* {renderRules()} */}

        {/* Join Button */}
        <View style={styles.joinContainer}>
          <View
            style={{
              opacity: joinedPlayers.length >= tournament.capacity ? 0.5 : 1,
            }}
          ></View>
        </View>

        <View style={{ height: hp(5) }} />
      </ScrollView>
      <CustomButton
        title={`JOIN TOURNAMENT (${joinedPlayers.length}/${tournament.capacity})`}
        onPress={() => {
          setIsAgreed(false);
          setRulesModalVisible(true);
        }}
        buttonStyle={styles.joinButton}
        disabled={joinedPlayers.length >= tournament.capacity}
      />

      {/* Rules & Join Modal */}
      <Modal
        visible={rulesModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tournament Rules</Text>
              <TouchableOpacity onPress={() => setRulesModalVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={COLORS.gold}
                />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderRules()}
            </ScrollView>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsAgreed(!isAgreed)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkbox, isAgreed && styles.checkboxActive]}
              >
                {isAgreed && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color={COLORS.Black}
                  />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                I confirm that I have read and agreed to these Tournament Rules.
              </Text>
            </TouchableOpacity>

            <View
              style={{ opacity: isAgreed ? 1 : 0.5, marginBottom: hp(4) }}
              pointerEvents={isAgreed ? 'auto' : 'none'}
            >
              <CustomButton
                title="CONFIRM & JOIN"
                onPress={() => {
                  if (isAgreed) {
                    handleJoin();
                    setRulesModalVisible(false);
                  }
                }}
                buttonStyle={{ width: '100%', height: hp(6) }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={profileModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.profileModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Player Profile</Text>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={COLORS.gold}
                />
              </TouchableOpacity>
            </View>

            {selectedPlayer && (
              <View style={styles.profileContainer}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileInitials}>
                    {selectedPlayer.name.substring(0, 2).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.profileName}>{selectedPlayer.name}</Text>

                <View style={styles.statsContainer}>
                  <View style={styles.statBox}>
                    <MaterialCommunityIcons
                      name="star"
                      size={24}
                      color={COLORS.gold}
                    />
                    <Text style={styles.statLabel}>Level</Text>
                    <Text style={styles.statValue}>{selectedPlayer.level}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <MaterialCommunityIcons
                      name="lightning-bolt"
                      size={24}
                      color={COLORS.gold}
                    />
                    <Text style={styles.statLabel}>XP</Text>
                    <Text style={styles.statValue}>{selectedPlayer.xp}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homebackground,
  },
  header: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gold,
  },
  headerContainer: {
    marginBottom: hp(2),
  },
  bannerImage: {
    width: '100%',
    height: hp(25),
    resizeMode: 'cover',
  },
  placeholderImage: {
    backgroundColor: '#0f1424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: wp(4),
    backgroundColor: 'rgba(11, 17, 29, 0.7)',
  },
  tournamentName: {
    color: COLORS.white,
    fontSize: FONT_SIZES.h2,
    fontWeight: 'bold',
  },
  detailsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: wp(4),
    backgroundColor: '#151b2b',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: COLORS.gold,
    marginLeft: wp(2),
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    marginBottom: hp(2),
    letterSpacing: 1,
  },
  bracketVertical: {
    padding: wp(4),
    alignItems: 'center',
  },
  roundVertical: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  roundTitle: {
    color: COLORS.gold,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: hp(1.5),
    fontSize: FONT_SIZES.bodyLarge,
  },
  matchesVerticalWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: wp(3),
  },
  matchBoxVertical: {
    backgroundColor: '#1a1f33',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#444',
    width: wp(42),
    marginBottom: hp(2),
  },
  playerSlot: {
    padding: wp(3),
    justifyContent: 'center',
  },
  byeSlot: {
    opacity: 0.5,
  },
  playerName: {
    color: '#888', // Grey for empty/tbd slots
    fontSize: FONT_SIZES.bodySmall,
    fontWeight: '600',
  },
  activePlayer: {
    color: COLORS.white, // White for joined players
  },
  highlightPlayer: {
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
  },
  downArrow: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  groupsContainer: {
    padding: wp(4),
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  groupCard: {
    width: '48%',
    backgroundColor: '#1a1f33',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#333',
    padding: wp(3),
    marginBottom: hp(2),
  },
  groupTitle: {
    color: COLORS.gold,
    fontWeight: 'bold',
    marginBottom: hp(1),
  },
  groupPlayer: {
    color: '#888',
    fontSize: FONT_SIZES.bodySmall,
    marginVertical: 2,
  },
  rulesContainer: {
    padding: wp(4),
    marginTop: hp(1),
  },
  rulesCard: {
    // Removed border/background from modal rules to keep it clean, or keep it
    marginBottom: hp(2),
  },
  ruleItem: {
    color: '#ddd',
    fontSize: FONT_SIZES.bodySmall,
    marginBottom: hp(1.5),
    lineHeight: FONT_SIZES.bodyLarge,
  },
  ruleBold: {
    color: COLORS.gold,
    fontWeight: 'bold',
  },
  joinContainer: {
    padding: wp(4),
    alignItems: 'center',
    marginTop: hp(2),
  },
  joinButton: {
    width: wp(90),
    height: hp(6.5),
    marginBottom: hp(2),
    marginLeft: wp(5),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0f1424',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    padding: wp(5),
    maxHeight: hp(85),
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  modalTitle: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(3),
    paddingRight: wp(5),
  },
  checkbox: {
    width: wp(5),
    height: wp(5),
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    borderRadius: 4,
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: COLORS.gold,
  },
  checkboxLabel: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    lineHeight: FONT_SIZES.bodyLarge,
  },
  profileModalContent: {
    maxHeight: hp(50),
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: hp(2),
  },
  profileAvatar: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  profileInitials: {
    color: COLORS.Black || '#000',
    fontSize: FONT_SIZES.h2,
    fontWeight: 'bold',
  },
  profileName: {
    color: COLORS.white,
    fontSize: FONT_SIZES.h3,
    fontWeight: 'bold',
    marginBottom: hp(3),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#1a1f33',
    padding: wp(4),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#333',
    width: '45%',
  },
  statLabel: {
    color: '#888',
    fontSize: FONT_SIZES.bodySmall,
    marginTop: hp(1),
  },
  statValue: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    marginTop: hp(0.5),
  },
});

export default TournamentDetial;
