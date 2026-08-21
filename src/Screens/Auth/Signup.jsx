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
    TermsBottomSheet,
    useGoogleSignIn
} from '../../api/Index'

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';


const Signup = ({ navigation }) => {
  const { onGooglePress } = useGoogleSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const [rememberMe, setRememberMe] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const dispatch = useDispatch();

  const hasErrors = !!(usernameError || emailError || passwordError || confirmPasswordError);

  const handleSignUp = () => {
      let isValid = true;
      if (!username.trim()) { setUsernameError('username not entered'); isValid = false; }
      if (!email.trim()) { setEmailError('email not entered'); isValid = false; }
      if (!password.trim()) { setPasswordError('password not entered'); isValid = false; }
      if (!confirmPassword.trim()) { setConfirmPasswordError('confirm password not entered'); isValid = false; }
      if (isValid) {
          setUsernameError('');
          setEmailError('');
          setPasswordError('');
          setConfirmPasswordError('');
          dispatch(setCredentials({ username, email, password }));
          Alert.alert('Account created successfully');
          navigation.navigate('Login');
      }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">


        <View style={[styles.main, hasErrors && { height: hp(140) }]}>{/* Main View */}


            <View style={[styles.innerView, hasErrors && { height: hp(130) }]}>{/* Inner View */}

                <AuthHeader title="Join" />

                <Text style={styles.toPlay}>New player Kazino Kat 509</Text>


                <View>


                    <View>
                        <Text style={styles.email}>USERNAME</Text>

                        <CustomInput
                         iconName="user"
                         placeholder="Username"
                         value={username}
                         onChangeText={(text) => { setUsername(text); setUsernameError(''); }}
                         />
                    </View>
                    {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
                    

                    <View>
                        <Text style={styles.email}>EMAIL</Text>
                        <CustomInput
                        iconName="envelope"
                        placeholder="you@example.com"
                        value={email}
                        onChangeText={(text) => { setEmail(text); setEmailError(''); }}
                        />


                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View>

                        <Text style={styles.email}>PASSWORD</Text>
                        <CustomInput
                        iconName="lock"
                        placeholder="****************"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => { setPassword(text); setPasswordError(''); }}
                        iconRight={
                            <TouchableOpacity activeOpacity={0.9} onPress={() => setShowPassword(!showPassword)}>
                                <FontAwesome
                                    name={showPassword ? 'eye' : 'eye-slash'}
                                    size={hp('2.2%')}
                                    color={COLORS.personIcon}
                                    style={{marginLeft : wp('20px')}}
                                />
                            </TouchableOpacity>
                        }
                        />

                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <View>
                          
                          <Text style={styles.email}>CONFIRM PASSWORD</Text>
                          <CustomInput
                          iconName="lock"
                          placeholder="****************"
                          secureTextEntry={!showConfirmPassword}
                          value={confirmPassword}
                          onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(''); }}
                          iconRight={
                              <TouchableOpacity activeOpacity={0.9} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                  <FontAwesome
                                      name={showConfirmPassword ? 'eye' : 'eye-slash'}
                                      size={hp('2.2%')}
                                      color={COLORS.personIcon}
                                      style={{marginLeft : wp('20px')}}
                                  />
                              </TouchableOpacity>
                          }
                          />

                    </View>
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                              <View>{/* remamber me  */}
                  
                                  <View style={styles.remamberMeIcon}>
                
                                  <TouchableOpacity activeOpacity={0.9} onPress={() => setRememberMe(!rememberMe)}>
                
                                      <FontAwesome
                                          name={rememberMe ? "check-square" : "square"}
                                          size={hp('1.8%')}
                                          color={rememberMe ? COLORS.textColor : COLORS.cardBackground}
                                          style={styles.boxIcon}
                                      />
                                  </TouchableOpacity>
                                  
                                  
                
                                  <View style={{display : 'flex', flexDirection : 'row'}}>
                
                                  <Text style={styles.remamberMe}>I agree to the </Text>
                                  <View>
                                  <TouchableOpacity activeOpacity={0.9} onPress={() => setShowTerms(true)}>
                                    <Text style={styles.termsCondition} >Terms & Conditions</Text>
                                  </TouchableOpacity>
                                  </View>
                                  
                                  </View>
                
                                  </View>
                  
                  
                                  </View>


                                  <View style={styles.button}>
                                    <CustomButton title="Create Account" onPress={handleSignUp} />
                                  </View>
                                  

                            <View style={styles.Orcontainer}>{/*OR*/}
                        
                                      <View style={styles.LeftLine}/>
                                      <Text style={styles.OR}>OR</Text>
                                      <View style={styles.RightLine}/>
                        
                            </View>
                            <View>
                                <GoogleButton onPress={onGooglePress}/>
                            </View>

                </View>


                 
                

            </View>

                
                <View style={styles.AlreadyHaveAccountMainContaner}>

                    <View>
                        <Text style={styles.alreadyHaveAccount}>
                            Already have an account?
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.login}>
                            Sign In
                        </Text>
                        </TouchableOpacity>
                    </View>


                </View>
        


        </View>
       <TermsBottomSheet visible={showTerms} onClose={() => setShowTerms(false)} />
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
        height : hp(124),
        maxHeight : hp(140)
    },

    innerView: {
        backgroundColor: COLORS.cardBackground,
        width : wp(87),
        height : hp(115),
        maxHeight : hp(130),
        marginTop: hp(2),
        marginLeft : wp(6.5),
        borderRadius: wp(10),
        borderWidth : wp(0.2),
        borderColor : COLORS.cartBarder,
        shadowColor : COLORS.Black,
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
        fontSize: FONT_SIZES.body ,
        marginLeft: wp(1.5),
        marginTop: hp(2),
    },
        email : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.bodySmall,
        marginTop : hp(2.3),
        marginLeft : wp(4),
        fontWeight:'600',
        letterSpacing:wp('0.6')
    },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(8),
        marginTop: hp(0.5),
    },
     remamberMeIcon : {
        display : 'flex',
        flexDirection : 'row',
        marginTop:hp(2),
        marginLeft:wp(7.5),   
    },
        remamberMe : {
        color : '#ffffff',
        fontSize : FONT_SIZES.body,
        marginLeft : wp(2),
    
    },
   boxIcon : {
        borderWidth: wp(0.5),
        borderColor : COLORS.inputBorder,
        width: wp(4.7),
        height: hp(2.3),
        marginTop : hp(0.3),
        borderRadius : wp(1),
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    button : {
        marginTop : hp(3),
        marginLeft : wp(5.5)
    },
        LeftLine : {
        width : wp(35),
        height : hp(0.3),
        backgroundColor : COLORS.inputBorder,
        marginTop : hp(1),
        marginLeft : wp(3),
    },
    Orcontainer : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : hp(3),
    }, 
    RightLine : {
        width : wp(35),
        height : hp(0.3),
        backgroundColor : COLORS.inputBorder,
        marginTop : hp(0.9),
        marginRight : wp(3),
    },
    OR : {
        color : COLORS.toPlay,
        fontSize : FONT_SIZES.body,
        marginLeft : wp(2),
        marginRight : wp(2),
        
    },
    termsCondition : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.body,
        marginLeft : wp(1),
        textDecorationLine: 'underline',
        fontWeight : 'bold'
    },
    AlreadyHaveAccountMainContaner : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : hp(2),
        marginLeft : wp(22),
        
    },
    alreadyHaveAccount : {
        color : COLORS.toPlay,
        fontSize : FONT_SIZES.h6
    },
    login : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.h6,
        marginLeft : wp(1),
        fontWeight : 'bold',
    }
    
})

export default Signup