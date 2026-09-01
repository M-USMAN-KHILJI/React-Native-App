import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  wp,
  hp,
  COLORS,
  FONT_SIZES,
  SafeAreaView,
  CustomButton,
  React,
  useState,
  Modal,
  MaterialCommunityIcons,
  KeyboardAvoidingView,
  LinearGradient,
} from '../../api/Index.js';
import ScreenHarder from '../../Components/screenHarder.jsx';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { setJoinedPlayers } from '../../redux/tournamentSlice';
// Derives the bracket size the tournament will actually run at (next power of 2
// at or above capacity), so the card can announce the real format up front.
const getFormatLabel = capacity => {
  const n = parseInt(capacity, 10) || 0;
  let size = 1;
  while (size < n) size *= 2;
  return `${size}-PLAYER KNOCKOUT`;
};

const Tormament = ({ navigation }) => {
  const [tournament, setTournament] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('8');
  const [reward, setReward] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const user = useSelector(state => state.auth.user);
  const credentials = useSelector(state => state.auth.credentials);
  const username = user?.name || credentials?.username || 'Player';

  const dispatch = useDispatch();
  const joinedPlayers = useSelector(state => state.tournament.joinedPlayers);
  const joinedCount = joinedPlayers.length;
  const isUserJoined = joinedPlayers.includes(username);

  const handleJoinTournament = () => {
    // Optionally update local tournament state if needed, but we rely on Redux now
    setTournament(prev =>
      prev ? { ...prev, joinedCount: prev.joinedCount } : null,
    );
  };

  const handleChooseImage = async () => {
    const response = await launchImageLibrary({ mediaType: 'photo' });
    if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri);
    }
  };

  const handleAddTournament = () => {
    if (!name || !capacity) return;
    setTournament({
      name,
      capacity: parseInt(capacity, 10),
      reward,
      imageUri,
      joinedCount: 0,
    });

    // Add capacity-1 dummy players
    const numDummies = parseInt(capacity, 10) - 1;
    const dummyPlayers = Array.from(
      { length: numDummies },
      (_, i) => `Player ${i + 1}`,
    );
    dispatch(setJoinedPlayers(dummyPlayers));

    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHarder
        title="TOURNAMENT"
        subtitle="HAITIAN CARD LOUNGE"
        onPress={() => navigation.goBack()}
        // rightIcon="plus"
        onRightPress={() => setModalVisible(true)}
      />

      {!tournament ? (
        <View style={styles.buttonContainer}>
          <CustomButton
            title="ADD"
            onPress={() => setModalVisible(true)}
            buttonStyle={styles.addButton}
          />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.listContainer}>
          <TouchableOpacity
            style={styles.tournamentCard}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('TournamentDetial', {
                tournament,
                onJoin: handleJoinTournament,
              })
            }
          >
            <View style={styles.cardImageWrapper}>
              {tournament.imageUri ? (
                <Image
                  source={{ uri: tournament.imageUri }}
                  style={styles.cardImage}
                />
              ) : (
                <View style={[styles.cardImage, styles.placeholderImage]}>
                  <MaterialCommunityIcons
                    name="trophy"
                    size={40}
                    color={COLORS.gold}
                  />
                </View>
              )}
              <View style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>
                  {getFormatLabel(tournament.capacity)}
                </Text>
              </View>
            </View>

            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {tournament.name}
                </Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>REG OPEN</Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>
                  {joinedCount} / {tournament.capacity} joined
                </Text>
                <Text style={styles.progressLabel}>
                  {Math.round((joinedCount / tournament.capacity) * 100)}%
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#f2dd88ea', '#debe56', '#bc9b37', '#8c733c']}
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.round(
                        (joinedCount / tournament.capacity) * 100,
                      )}%`,
                    },
                  ]}
                />
              </View>

              {joinedCount === 0 ? (
                <Text style={styles.beFirstText}>Be the first to join</Text>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: hp(1.5),
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    {joinedPlayers.slice(0, 5).map((player, index) => (
                      <View
                        key={index}
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor:
                            player === username ? COLORS.gold : '#444',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: index === 0 ? 0 : -wp(2),
                          borderWidth: 1.5,
                          borderColor: '#1a1f33',
                          zIndex: 5 - index,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              player === username
                                ? COLORS.black || '#000'
                                : COLORS.white,
                            fontSize: 10,
                            fontWeight: 'bold',
                          }}
                        >
                          {player.substring(0, 1).toUpperCase()}
                        </Text>
                      </View>
                    ))}
                  </View>
                  <Text
                    style={{
                      color: '#bbb',
                      fontSize: FONT_SIZES.bodySmall,
                      marginLeft: wp(2),
                    }}
                  >
                    {isUserJoined
                      ? joinedCount > 1
                        ? `You and ${joinedCount - 1} others joined`
                        : 'You joined'
                      : `${joinedCount} player(s) joined`}
                  </Text>
                </View>
              )}

              {tournament.reward ? (
                <View style={styles.prizeRow}>
                  <View style={styles.cardRow}>
                    <MaterialCommunityIcons
                      name="crown"
                      size={16}
                      color={COLORS.gold}
                    />
                    <Text style={styles.cardText}>Champion prize</Text>
                  </View>
                  <Text style={styles.prizeValue}>{tournament.reward}</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Creation Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create Tournament</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color={COLORS.gold}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.label}>Tournament Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Weekly Championship"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />

                <Text style={styles.label}>Max Players (e.g. 8, 16, 32)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="8"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={capacity}
                  onChangeText={setCapacity}
                />

                <Text style={styles.label}>Reward (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 10,000 Coins"
                  placeholderTextColor="#666"
                  value={reward}
                  onChangeText={setReward}
                />

                <Text style={styles.label}>Tournament Image</Text>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={handleChooseImage}
                >
                  {imageUri ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.previewImage}
                    />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <MaterialCommunityIcons
                        name="camera-plus"
                        size={30}
                        color={COLORS.gold}
                      />
                      <Text style={styles.imagePickerText}>Upload Image</Text>
                    </View>
                  )}
                </TouchableOpacity>

                <CustomButton
                  title="ADD TOURNAMENT"
                  onPress={handleAddTournament}
                  buttonStyle={styles.submitButton}
                />
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.homebackground,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: COLORS.gold,
    color: COLORS.white,
    width: wp(40),
    height: hp(5),
    borderRadius: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: wp(4),
  },
  tournamentCard: {
    backgroundColor: '#1a1f33',
    borderRadius: wp(4),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginBottom: hp(2),
  },
  cardImageWrapper: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: hp(15),
    resizeMode: 'cover',
  },
  placeholderImage: {
    backgroundColor: '#0f1424',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formatBadge: {
    position: 'absolute',
    top: hp(1),
    left: wp(3),
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: wp(4),
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(3),
  },
  formatBadgeText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.bodySmall,
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: wp(4),
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: wp(2),
  },
  statusPill: {
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: wp(4),
    paddingVertical: hp(0.4),
    paddingHorizontal: wp(2.5),
  },
  statusPillText: {
    color: COLORS.gold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.6),
  },
  progressLabel: {
    color: '#bbb',
    fontSize: FONT_SIZES.bodySmall,
  },
  progressTrack: {
    height: hp(0.8),
    backgroundColor: '#0f1424',
    borderRadius: hp(0.4),
    overflow: 'hidden',
    marginBottom: hp(1),
  },
  progressFill: {
    height: '100%',
    borderRadius: hp(0.4),
  },
  beFirstText: {
    color: '#888',
    fontSize: FONT_SIZES.bodySmall,
    fontStyle: 'italic',
    marginBottom: hp(1.5),
  },
  prizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: hp(1.5),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#bbb',
    marginLeft: wp(2),
    fontSize: FONT_SIZES.body,
  },
  prizeValue: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.body,
    fontWeight: 'bold',
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
    maxHeight: hp(80),
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(3),
  },
  modalTitle: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h4,
    fontWeight: 'bold',
  },
  label: {
    color: COLORS.white,
    fontSize: FONT_SIZES.body,
    marginBottom: hp(1),
    marginTop: hp(2),
  },
  input: {
    backgroundColor: '#1a1f33',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: wp(2),
    color: COLORS.white,
    paddingHorizontal: wp(3),
    height: hp(6),
  },
  imagePicker: {
    backgroundColor: '#1a1f33',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: wp(2),
    height: hp(15),
    overflow: 'hidden',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    color: COLORS.gold,
    marginTop: hp(1),
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    width: '100%',
    marginTop: hp(2),
    marginBottom: hp(4),
  },
});

export default Tormament;
