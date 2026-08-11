import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Button,
    Platform,
    KeyboardAvoidingView,
    Alert,
    wp,
    hp,
    COLORS,
    FONT_SIZES,
    logo,
    SafeAreaView,
    FontAwesome,
    CustomInput,
    CustomButton,
    GoogleButton,
    React,
    useState,
    useEffect,
    useContext,
    AuthHeader,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from '../../api/Index'
import { useSelector, useDispatch } from 'react-redux';
import { clearResetEmail } from '../../redux/authSlice';

const NewPassword = ({navigation}) => {
    const email = useSelector((state) => state.auth.resetEmail);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSave = () => {
        let isValid = true;
        if (!password.trim()) { setPasswordError('password not entered'); isValid = false; }
        if (!confirmPassword.trim()) { setConfirmPasswordError('confirm password not entered'); isValid = false; }
        if (isValid) {
            Alert.alert(
              "Success",
              "Your password has been saved",
              [{ text: "OK", onPress: () => {
                dispatch(clearResetEmail());
                navigation.navigate('Login');
              }}]
            );
        }
    };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.main}>{/* Main view */}

                <View style={styles.innerView}>{/* Inner View */}

                    <View>
                        <AuthHeader title="NEW PASSWORD" />
                    </View>

                    <View>
                        <Text style={styles.toPlay}>
                            Choose a strong password . Kazino Kat 509
                        </Text>

                        <Text style={styles.toPlay1}>
                            Account: {email || '[EMAIL_ADDRESS]'}
                        </Text>
                    </View>


                    <View>
                        <Text style={styles.email}>New Password</Text>
                        <CustomInput placeholder="Password" iconName="lock" 
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                        iconRight={
                             <TouchableOpacity
                             activeOpacity={0.9}
            onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
                name={showPassword ? 'eye' : 'eye-slash'}
                size={hp('2.2%')}
                color={COLORS.personIcon}
                style={{marginLeft : wp('20px')}}
            />
        </TouchableOpacity>
                        } />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <View>
                        <Text style={styles.email}>Confirm Password</Text>
                        <CustomInput 
                        placeholder="Password" 
                        iconName="lock" 
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(''); }}
                        iconRight={
                            <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <FontAwesome
                name={showConfirmPassword ? 'eye' : 'eye-slash'}
                size={hp('2.2%')}
                color={COLORS.personIcon}
                style={{marginLeft : wp('20px')}}
            />
        </TouchableOpacity>
                        }/>
                    </View>
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}


                    <View style={styles.Button}>
                        <CustomButton title="Save Now" onPress={handleSave} />
                    </View>

                </View>

                 <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Login')} style={styles.change}>
                            <FontAwesome
                                 name="chevron-left"
                                 size={hp('2.2%')}
                                 color={COLORS.textColor}
                                 style={styles.backIcon}
                               />
                          
                
                          <View>
                            <Text style={styles.changeEmail}>
                                Back to Sign In
                            </Text>
                          </View>
                          
                          </TouchableOpacity>
                       

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
 
  )
}

const styles = StyleSheet.create({
container: {
        flex: 1,
        backgroundColor : COLORS.outerBackground
    },

    main: {
        backgroundColor: COLORS.outerBackground,
        width : wp(100),
        height : hp(100)
    },

    innerView: {
        backgroundColor: COLORS.cardBackground,
        width : wp(87),
        height : hp(72),
        marginTop: hp(2),
        marginLeft : wp(6.5),
        borderRadius: wp(10),
        borderWidth : wp(0.2),
        borderColor : COLORS.cartBarder,
        shadowColor : COLORS. Black,
        shadowOffset : {
            width : wp(0),
            height : hp(2)
        },
        shadowOpacity: wp(0.2),
        shadowRadius: wp(0.2),
    },
    toPlay: {
        color: COLORS.toPlay,
        textAlign: 'center',
        fontSize: FONT_SIZES.h6,
        fontWeight : 'bold',
        marginLeft: wp(1.5),
        marginTop: hp(3),
    },
    toPlay1 : {
        color: COLORS.toPlay,
        textAlign: 'center',
        fontSize: FONT_SIZES.h6,
        fontWeight : 'bold',
        marginLeft: wp(1.5),
        marginTop: hp(2),
    },
        email : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginTop : hp(1),
        marginLeft : wp(4),
        fontWeight:'bold',
        letterSpacing:wp('0.4')

    },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(8),
        marginTop: hp(0.5),
    },
      Button : {
        marginTop : hp(3),
        marginLeft : wp(5.5)
    },
    change : {
        display : "flex",
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "center",
        marginTop : hp(2),
        marginLeft : wp(3)
    },
    changeEmail : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginLeft : wp(2),
        fontWeight : "bold",
    },
    backIcon : {
        marginTop : hp(0.3)
    }
});

export default NewPassword