import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { wp, hp, COLORS, FONT_SIZES, MaterialCommunityIcons , CustomButton , KeyboardAvoidingView } from '../../api/Index';
import ScreenHarder from '../../Components/screenHarder';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const PrivateMatch = ({navigation}) => {
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const [joinCode, setJoinCode] = useState('');

  return (
    <SafeAreaView style={styles.continner}>
      <ScreenHarder title={"PRIVATE MATCH"} subtitle={"HAITIAN CARD LOUNGE"} onPress={() => navigation.goBack() } />
      
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? hp(2) : 0}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Join Room Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="door-open" size={24} color={COLORS.goldenBtn} />
            </View>
            <Text style={styles.cardTitle}>Join Room</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            Got a code or join link from a friend? Enter it below to join their private table.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder="Enter Code"
              placeholderTextColor={COLORS.placeHolderColor}
              value={joinCode}
              onChangeText={setJoinCode}
            />
          </View>
          <CustomButton
          onPress={() => {}}
          title="Join Table"
          buttonStyle={styles.buttonStyle}
          icon={<MaterialCommunityIcons name="login-variant" size={20} color={COLORS.btnTextBlack} style={styles.btnIcon} />}
          />
        </View>

        {/* Create Room Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="plus-box-multiple-outline" size={24} color={COLORS.goldenBtn} />
            </View>
            <Text style={styles.cardTitle}>Create Room</Text>
          </View>
          <Text style={styles.cardSubtitle}>
            Host your own private match and invite friends to join using a unique code. Lobby expires in 5 minutes.
          </Text>
          <Text style={styles.sectionLabel}>Table size</Text>

       
          <View style={styles.pillsContainer}>
            {[2, 3, 4].map(num => {
              const isSelected = selectedPlayers === num;
              
              if (isSelected) {
                return (
                  <LinearGradient
                    key={num}
                    colors={['#c3971ea8', '#d5b139', '#ddb941']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.pill}
                  >
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      style={styles.pillTouchable} 
                      onPress={() => setSelectedPlayers(num)}
                    >
                      <Text style={[styles.pillText, styles.pillTextSelected]}>
                        {num} players
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                );
              }

              return (
                <View key={num} style={[styles.pill, styles.pillInactive]}>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    style={styles.pillTouchable} 
                    onPress={() => setSelectedPlayers(num)}
                  >
                    <Text style={styles.pillText}>
                      {num} players
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        

          <CustomButton
          onPress={() => navigation.navigate("CreateMatch", { players: selectedPlayers })}
          title="Create Table"
          buttonStyle={styles.buttonStyle}
          icon={<MaterialCommunityIcons name="tools" size={20} color={COLORS.btnTextBlack} style={styles.btnIcon} />}
          />
        </View>

        {/* Challenges Section */}
        <TouchableOpacity
        onPress={() => navigation.navigate("Challenges")}
        activeOpacity={0.8}
         style={styles.cardRow}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="history" size={24} color={COLORS.goldenBtn} />
            </View>
            <View style={styles.rowTextContent}>
              <Text style={styles.cardTitle}>Challenges</Text>
              <Text style={styles.cardSubtitleSmall}>
                Track sent and received private match invites.
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.btnTextWhite} />
        </TouchableOpacity>
        
        <View style={{height: hp(5)}} />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    continner : {
        flex : 1,
        backgroundColor : COLORS.outerBackground
    },
    content: {
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
    },
    card: {
        backgroundColor: COLORS.cardBackground || 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: '#2A2C38',
        borderRadius: wp(6),
        padding: wp(5),
        marginBottom: hp(3),
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.cardBackground || 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: '#2A2C38',
        borderRadius: wp(6),
        padding: wp(5),
        marginBottom: hp(3),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: 'rgba(211, 177, 96, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    cardTitle: {
        color: COLORS.goldenBtn,
        fontSize: wp(4.5),
        fontWeight: 'bold',
    },
    cardSubtitle: {
        color: COLORS.subtitleGray,
        fontSize: wp(3.5),
        lineHeight: hp(2.5),
        marginBottom: hp(2.5),
    },
    cardSubtitleSmall: {
        color: COLORS.subtitleGray,
        fontSize: wp(3.5),
        lineHeight: hp(2),
        marginTop: hp(0.5),
        paddingRight: wp(5),
    },
    rowTextContent: {
        flex: 1,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.inputBorder || '#2A2C38',
        borderRadius: wp(8),
        paddingHorizontal: wp(5),
        height: hp(7),
        justifyContent: 'center',
        marginBottom: hp(2.5),
        backgroundColor: COLORS.inputBackground || 'rgba(0,0,0,0.2)',
    },
    input: {
        color: COLORS.btnTextWhite,
        fontSize: wp(4),
    },
    goldenBtn: {
        backgroundColor: COLORS.goldenBtn,
        borderRadius: wp(10),
        height: hp(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnIcon: {
        marginRight: wp(2),
    },
    goldenBtnText: {
        color: COLORS.btnTextBlack,
        fontSize: wp(4),
        fontWeight: 'bold',
    },
    sectionLabel: {
        color: COLORS.subtitleGray,
        fontSize: wp(3.8),
        marginBottom: hp(1.5),
    },
    pillsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(3),
    },
    pill: {
        flex: 1,
        borderRadius: wp(10),
        marginHorizontal: wp(1),
        overflow: 'hidden',
    },
    pillTouchable: {
        paddingVertical: hp(1.5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillInactive: {
        borderWidth: 1,
        borderColor: COLORS.goldenBtn,
    },
    pillText: {
        color: COLORS.btnTextWhite,
        fontSize: wp(3.5),
        fontWeight: '500',
    },
    pillTextSelected: {
        color: COLORS.btnTextBlack,
    },
    buttonStyle : {
        width : wp(79)
    }
    
});

export default PrivateMatch;