import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ScrollView, Image ,KeyboardAvoidingView, Platform } from 'react-native';
import { wp, hp, COLORS, MaterialCommunityIcons, CustomButton } from '../../api/Index';
import ScreenHarder from '../../Components/screenHarder';
import { SafeAreaView } from 'react-native-safe-area-context';

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const CreateMatch = ({ route, navigation }) => {
  const players = route?.params?.players || 2;
  const [code, setCode] = useState(generateRandomCode());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleCopyCode = () => {
    Alert.alert("Code Copied!", `You copied: ${code}`);
  };

  const handleShare = () => {
    Alert.alert("Share", `Share this code: ${code}`);
  };

  const handleCreateNewCode = () => {
    setCode(generateRandomCode());
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHarder 
        title="PRIVATE ROOM" 
        subtitle="HAITIAN CARD LOUNGE" 
        onPress={() => navigation.goBack()} 
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? hp(2) : 0}>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Room Code Card */}
        <View style={styles.roomCodeCard}>
          <Text style={styles.roomCodeLabel}>ROOM CODE</Text>
          <Text style={styles.roomCodeText}>{code}</Text>
          
          {timeLeft > 0 ? (
            <Text style={styles.expiresText}>
              Expires in {formatTime(timeLeft)}
            </Text>
          ) : (
            <Text style={styles.expiredText}>Expired</Text>
          )}

          {timeLeft > 0 ? (
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={handleCopyCode} activeOpacity={0.7}>
                <MaterialCommunityIcons name="content-copy" size={wp(4)} color={COLORS.goldenBtn || '#D3B160'} />
                <Text style={styles.actionBtnText}>Copy Code</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.7}>
                <MaterialCommunityIcons name="share-variant" size={wp(4)} color={COLORS.goldenBtn || '#D3B160'} />
                <Text style={styles.actionBtnText}>Share</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.createNewCodeContainer}>
               <CustomButton 
                title="Create a New Code" 
                onPress={handleCreateNewCode} 
                buttonStyle={styles.newCodeButton}
                icon={<MaterialCommunityIcons name="refresh" size={20} color={COLORS.btnTextBlack || '#000'} style={styles.btnIcon} />}
              />
            </View>
          )}
        </View>

        {/* Players Section */}
        <Text style={styles.sectionTitle}>Players (1/{players})</Text>

        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={wp(5.5)} color={COLORS.subtitleGray || '#b3b6bd'} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends to invite..."
            placeholderTextColor={COLORS.subtitleGray || '#b3b6bd'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Host Player */}
        <View style={styles.playerRow}>
          <View style={styles.playerInfo}>
            <View style={styles.avatarPlaceholder}>
               {/* Replace with actual image if available */}
               <View style={styles.avatarCircle} />
            </View>
            <View>
              <Text style={styles.playerName}>You</Text>
              <Text style={styles.playerStatus}>Online</Text>
            </View>
          </View>
          
          <View style={styles.hostBadge}>
            <MaterialCommunityIcons name="crown" size={wp(3.5)} color={COLORS.goldenBtn || '#D3B160'} />
            <Text style={styles.hostBadgeText}>HOST</Text>
          </View>
        </View>

        <Text style={styles.noFriendsText}>No friends to invite yet</Text>
        
        {/* Spacer for bottom fixed content */}
        <View style={{height: hp(15)}} />

      </ScrollView>

      {/* Bottom Fixed Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.waitingButton}>
          <MaterialCommunityIcons name="play" size={wp(5)} color={COLORS.subtitleGray || '#b3b6bd'} />
          <Text style={styles.waitingButtonText}>Waiting for players (1/{players})</Text>
        </View>
        
        <Text style={styles.bottomWarningText}>
          This room needs {players} players (1/{players}). You can't start yet - {players - 1} more needed.
        </Text>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.outerBackground || '#0B111D',
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  roomCodeCard: {
    backgroundColor: COLORS.cardBackground || 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: '#30303F', // faint border
    borderRadius: wp(8),
    paddingVertical: hp(4),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(4),
  },
  roomCodeLabel: {
    color: COLORS.subtitleGray || '#b3b6bd',
    fontSize: wp(3.5),
    letterSpacing: wp(0.5),
    marginBottom: hp(1.5),
  },
  roomCodeText: {
    color: COLORS.goldenBtn || '#d3b160',
    fontSize: wp(8),
    fontWeight: 'bold',
    letterSpacing: wp(2),
    marginBottom: hp(1.5),
  },
  expiresText: {
    color: COLORS.subtitleGray || '#b3b6bd',
    fontSize: wp(3.5),
    marginBottom: hp(3),
  },
  expiredText: {
    color: '#e0402f',
    fontSize: wp(3.5),
    marginBottom: hp(3),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldenBtn || '#d3b160',
    borderRadius: wp(5),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginHorizontal: wp(2),
  },
  actionBtnText: {
    color: COLORS.goldenBtn || '#d3b160',
    fontSize: wp(3.5),
    marginLeft: wp(1.5),
  },
  createNewCodeContainer: {
    width: '100%',
    paddingHorizontal: wp(10),
  },
  newCodeButton: {
    width: '100%',
    height: hp(6),
  },
  btnIcon: {
    marginRight: wp(2),
  },
  sectionTitle: {
    color: COLORS.goldenBtn || '#d3b160',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginBottom: hp(2),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#30303F',
    borderRadius: wp(6),
    height: hp(6),
    paddingHorizontal: wp(4),
    marginBottom: hp(3),
  },
  searchIcon: {
    marginRight: wp(2),
  },
  searchInput: {
    flex: 1,
    color: COLORS.btnTextWhite || '#ffffff',
    fontSize: wp(3.8),
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(3),
    paddingHorizontal: wp(1),
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#30303F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    borderWidth: 2,
    borderColor: COLORS.goldenBtn || '#d3b160',
  },
  avatarCircle: {
    width: '100%',
    height: '100%',
    borderRadius: wp(6),
    backgroundColor: '#8B5A2B', // mock avatar color
  },
  playerName: {
    color: COLORS.goldenBtn || '#d3b160',
    fontSize: wp(4),
    fontWeight: 'bold',
    marginBottom: hp(0.5),
  },
  playerStatus: {
    color: '#4CAF50',
    fontSize: wp(3),
  },
  hostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.goldenBtn || '#d3b160',
    borderRadius: wp(4),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2.5),
  },
  hostBadgeText: {
    color: COLORS.goldenBtn || '#d3b160',
    fontSize: wp(3),
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  noFriendsText: {
    color: COLORS.subtitleGray || '#b3b6bd',
    textAlign: 'center',
    fontSize: wp(3.5),
    marginTop: hp(2),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(5),
    paddingBottom: hp(4),
    paddingTop: hp(2),
    backgroundColor: COLORS.outerBackground || '#0B111D', // to avoid overlap transparency
  },
  waitingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2C38', // disabled look
    borderRadius: wp(10),
    height: hp(7),
    marginBottom: hp(1.5),
  },
  waitingButtonText: {
    color: COLORS.subtitleGray || '#b3b6bd',
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  bottomWarningText: {
    color: COLORS.goldenBtn || '#d3b160',
    textAlign: 'center',
    fontSize: wp(3.2),
  },
});

export default CreateMatch;