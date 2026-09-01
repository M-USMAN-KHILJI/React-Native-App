import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Modal,
  wp,
  hp,
  COLORS,
  FONT_SIZES,
  MaterialCommunityIcons,
  LinearGradient,
  CustomButton,
  // screenHarder,
} from '../../api/Index';
import { useSelector, useDispatch } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { setUser, setCredentials } from '../../redux/authSlice';
import ProfileTabs from '../../Navigation/Tab';
import ScreenHeader from '../../Components/screenHarder';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const credentials = useSelector((state) => state.auth.credentials);

  const savedUsername = user?.name || credentials?.username || 'Usman';
  const savedEmail = user?.email || credentials?.email || 'uk4790907@gmail.com';
  const savedCountryCode = user?.countryCode || credentials?.countryCode || null;
  const savedProfileImageUri = user?.profileImageUri || credentials?.profileImageUri || null;

  const [username, setUsername] = useState(savedUsername);
  const [email, setEmail] = useState(savedEmail);
  const [profileImageUri, setProfileImageUri] = useState(savedProfileImageUri);
  const [countryCode, setCountryCode] = useState(savedCountryCode);
  const [countryName, setCountryName] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);

  const isDirty =
    username !== savedUsername ||
    email !== savedEmail ||
    countryCode !== savedCountryCode ||
    profileImageUri !== savedProfileImageUri;

  const handleSelectCountry = (country) => {
    const selectedName =
      typeof country.name === 'string'
        ? country.name
        : country.name?.common || country.name?.en || 'Unknown country';

    setCountryCode(country.cca2);
    setCountryName(selectedName);
    setPickerVisible(false);
  };

  const handleImageResponse = (response) => {
    if (response.didCancel || response.errorCode) {
      return;
    }

    const imageUri = response.assets?.[0]?.uri;
    if (imageUri) {
      setProfileImageUri(imageUri);
    }
  };

  const openCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
      saveToPhotos: true,
    });
    handleImageResponse(response);
  };

  const openImageLibrary = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    handleImageResponse(response);
  };

  // Opens the custom themed modal instead of the native Alert.
  const handleChangePhoto = () => {
    setPhotoModalVisible(true);
  };

  const handleTakePhoto = () => {
    setPhotoModalVisible(false);
    openCamera();
  };

  const handleChooseGallery = () => {
    setPhotoModalVisible(false);
    openImageLibrary();
  };

  const handleSave = () => {
    dispatch(
      setUser({
        ...(user || {}),
        name: username,
        email,
        countryCode,
        profileImageUri,
      })
    );

    dispatch(
      setCredentials({
        ...(credentials || {}),
        username,
        email,
        countryCode,
        profileImageUri,
      })
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* <screenHarder title="PROFILE" subtitle="HAITIAN CARD LOUNGE" /> */}
        {/* <screenHarder title="PROFILE" subtitle="HAITIAN CARD LOUNGE" /> */}
        <ScreenHeader title="PROFILE" subtitle="HAITIAN CARD LOUNGE" iconstyle={styles.iconback}  />


        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            {profileImageUri ? (
              <Image source={{ uri: profileImageUri }} style={styles.avatar} />
            ) : (
              <LinearGradient
                colors={['#d8c4a2', '#5a3814', '#1d1c23']}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <View style={styles.avatarInner} />
              </LinearGradient>
            )}

            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeNumber}>13</Text>
              <Text style={styles.levelBadgeLabel}>LVL</Text>
            </View>

            <TouchableOpacity style={styles.cameraBadge} onPress={handleChangePhoto}>
              <MaterialCommunityIcons name="camera" size={18} color={COLORS.gold} />
            </TouchableOpacity>
          </View>

          <Text style={styles.nameText}>{username}</Text>

          <View style={styles.inlineInfoRow}>
            <CountryPicker
              countryCode={countryCode || 'US'}
              withFilter
              withFlag
              withEmoji
              withAlphaFilter
              visible={isPickerVisible}
              onSelect={handleSelectCountry}
              onClose={() => setPickerVisible(false)}
              theme={{
                backgroundColor: '#150f2b',
                onBackgroundTextColor: COLORS.gold,
                primaryColor: COLORS.goldenBtn,
                primaryColorVariant: 'rgba(211,177,96,0.2)',
                filterPlaceholderTextColor: 'rgba(211,177,96,0.6)',
                fontSize: FONT_SIZES.body,
              }}
              renderFlagButton={({ onOpen, flag }) => (
                <TouchableOpacity style={styles.pill} onPress={() => setPickerVisible(true)} activeOpacity={0.8}>
                  {flag ? (
                    <Text style={styles.flagText}>{flag}</Text>
                  ) : (
                    <MaterialCommunityIcons name="flag-variant-outline" size={18} color={COLORS.gold} style={{marginRight: wp(1)}} />
                  )}
                  <Text style={styles.pillText}>{countryName || 'Set country'}</Text>
                </TouchableOpacity>
              )}
            />

            <View style={styles.pill}>
              <MaterialCommunityIcons name="shield-check" size={16} color={COLORS.gold} />
              <Text style={styles.pillText}>HIGH ROLLER</Text>
            </View>
          </View>

          <View style={styles.levelRow}>
            <Text style={styles.levelLabel}>LEVEL: 13</Text>
            <Text style={styles.xpLabel}>XP: 1,250</Text>
          </View>

          <View style={styles.progressBarTrack}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.statsRow}>
            <View style={styles.statBlock}>
              <MaterialCommunityIcons name="star-four-points" size={20} color={COLORS.gold} />
              <Text style={styles.statValue}>1,250</Text>
              <Text style={styles.statLabel}>TOTAL XP</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statBlock}>
              <MaterialCommunityIcons name="poll" size={20} color={COLORS.gold} />
              <Text style={styles.statValue}>High Roller</Text>
              <Text style={styles.statLabel}>RANK</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statBlock}>
              <MaterialCommunityIcons name="shield-star" size={20} color={COLORS.gold} />
              <Text style={styles.statValue}>13</Text>
              <Text style={styles.statLabel}>LEVEL</Text>
            </View>
          </View>
        </View>

        <ProfileTabs />

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>

          <Text style={styles.fieldLabel}>USER NAME</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={COLORS.placeHolderColor || 'rgba(255,255,255,0.3)'}
          />

          <Text style={styles.fieldLabel}>EMAIL</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.placeHolderColor || 'rgba(255,255,255,0.3)'}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={{ opacity: isDirty ? 1 : 0.5, alignItems: 'center', marginTop: hp(2) }} pointerEvents={isDirty ? "auto" : "none"}>
            <CustomButton
              title="Save Change"
              onPress={handleSave}
              buttonStyle={{ width: wp(80), height: hp(6.5) }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Profile photo picker modal — matches the client-provided design */}
      <Modal
        visible={isPhotoModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPhotoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setPhotoModalVisible(false)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons name="close" size={22} color={COLORS.gold} />
            </TouchableOpacity>

            <View style={styles.modalIconOuterRing}>
              <View style={styles.modalIconInnerCircle}>
                <MaterialCommunityIcons name="camera" size={28} color={COLORS.gold} />
              </View>
            </View>

            <Text style={styles.modalTitle}>PROFILE PHOTO</Text>
            <Text style={styles.modalSubtitle}>Choose how to update your lounge photo.</Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={handleTakePhoto} activeOpacity={0.85}>
                <Text style={styles.modalButtonText}>Take photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={handleChooseGallery} activeOpacity={0.85}>
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#150f2b',
  },
  scrollContent: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(4),
  },
  iconback : {
    marginLeft : wp(-1)
  },

  profileCard: {
    backgroundColor: 'rgba(7, 16, 30, 0.8)',
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    borderRadius: wp(7),
    padding: wp(4),
    alignItems: 'center',
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  avatarWrap: {
    width: wp(42),
    height: wp(42),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  avatar: {
    width: wp(34),
    height: wp(34),
    borderRadius: wp(17),
    borderWidth: 3,
    borderColor: COLORS.goldenBtn,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarInner: {
    width: wp(32),
    height: '80%',
    borderRadius: wp(14),
    backgroundColor: '#5d3d1d',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  levelBadge: {
    position: 'absolute',
    top: wp(1),
    right: wp(1),
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    backgroundColor: '#0d1728',
    borderWidth: 2,
    borderColor: COLORS.goldenBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeNumber: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    lineHeight: FONT_SIZES.body,
  },
  levelBadgeLabel: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.caption,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cameraBadge: {
    position: 'absolute',
    right: wp(1),
    bottom: wp(1),
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#0d1728',
    borderWidth: 2,
    borderColor: COLORS.goldenBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    marginTop: hp(2),
    color: COLORS.gold,
    fontSize: FONT_SIZES.h3,
    fontWeight: '700',
  },
  inlineInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(2),
  },
  pill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1.2),
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    borderRadius: wp(10),
    marginHorizontal: wp(1),
  },
  pillText: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    marginLeft: wp(2),
  },
  flagText: {
    fontSize: FONT_SIZES.body,
    marginRight: wp(1),
  },
  levelRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2.5),
  },
  levelLabel: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
  },
  xpLabel: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
  },
  progressBarTrack: {
    width: '100%',
    height: hp(0.9),
    backgroundColor: '#2a2d3a',
    borderRadius: hp(1),
    overflow: 'hidden',
    marginTop: hp(1.5),
  },
  progressBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: COLORS.goldenBtn,
    borderRadius: hp(1),
  },
  sectionDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(211,177,96,0.35)',
    marginTop: hp(2.2),
  },
  statsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2.2),
  },
  statBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  statValue: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h5,
    fontWeight: '700',
    marginTop: hp(0.8),
  },
  statLabel: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.caption,
    letterSpacing: 0.8,
    marginTop: hp(0.4),
  },
  divider: {
    width: 1,
    height: hp(6),
    backgroundColor: COLORS.goldenBtn,
  },
  formSection: {
    backgroundColor: 'rgba(7, 16, 30, 0.8)',
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    borderRadius: wp(7),
    padding: wp(4),
    marginTop: hp(3),
    paddingBottom: hp(2),
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: hp(1.5),
  },
  fieldLabel: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: hp(1.2),
    marginTop: hp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    borderRadius: wp(16),
    color: COLORS.gold,
    fontSize: FONT_SIZES.h4,
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.6),
    marginBottom: hp(2),
    backgroundColor: 'transparent',
  },
  saveButton: {
    marginTop: hp(2),
    backgroundColor: COLORS.goldenBtn,
    borderRadius: wp(12),
    paddingVertical: hp(1.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: 'rgba(211,177,96,0.4)',
  },
  saveButtonText: {
    color: COLORS.Black,
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
  },

  // ---- Profile photo modal ----
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 3, 15, 0.78)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  modalCard: {
    width: '100%',
    backgroundColor: 'rgba(12, 8, 28, 0.98)',
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    borderRadius: wp(8),
    paddingTop: hp(4),
    paddingBottom: hp(3),
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(4),
    zIndex: 1,
  },
  modalIconOuterRing: {
    width: wp(24),
    height: wp(24),
    borderRadius: wp(12),
    borderWidth: 1,
    borderColor: 'rgba(211,177,96,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2.2),
  },
  modalIconInnerCircle: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(8.5),
    borderWidth: 1,
    borderColor: COLORS.goldenBtn,
    backgroundColor: 'rgba(211,177,96,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: COLORS.gold,
    fontSize: FONT_SIZES.h4,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: hp(1),
  },
  modalSubtitle: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: FONT_SIZES.body,
    textAlign: 'center',
    marginBottom: hp(3),
    paddingHorizontal: wp(2),
  },
  modalButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: COLORS.goldenBtn,
    borderRadius: wp(8),
    paddingVertical: hp(1.7),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(1.5),
  },
  modalButtonText: {
    color: COLORS.Black,
    fontSize: FONT_SIZES.bodyLarge,
    fontWeight: '700',
  },
});

export default Profile;