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
    useGoogleSignIn,
} from '../../api/Index'
import { useDispatch, useSelector } from 'react-redux'
import { saveAuthSession } from '../../api/session';
import { setUser } from '../../redux/authSlice';

const Login = ({ navigation }) => {
  const { onGooglePress } = useGoogleSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const credentials = useSelector(state => state.auth.credentials);


    const handleSignIn = async () => {
      setLoginError(''); // Clear any previous login error
      let isValid = true;
      if (!email.trim()) {
          setEmailError('enter your email');
          isValid = false;
      }
      if (!password.trim()) {
          setPasswordError('password not entered');
          isValid = false;
      }
      if (isValid) {
          // Check credentials from Redux
          if (email === credentials.email && password === credentials.password) {
              const user = {
                  name: credentials.username,
                  email: credentials.email,
                  photoURL: null,
                  uid: null,
              };
              await saveAuthSession(user);
              dispatch(setUser(user));
              navigation.navigate('Home');
          } else {
              setLoginError('Account not found. Create an account');
          }
      }
  };

  return (
    
    <SafeAreaView style={styles.container}> 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

      <View style={styles.main}>{/*Main view*/}


        <View style={styles.innerView}>{/*Inner view*/}
            

            <AuthHeader title="SIGN IN" />

            <View>
                <Text style={styles.toPlay}>To Play</Text>
            </View>



            <View>{/* input container */}

                <Text style={styles.email}>
                    EMAIL 
                </Text>


                <CustomInput
                    iconName="user"
                    placeholder="Kazino@example.com"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError('');
                        setLoginError('');
                    }}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


                <Text style={[styles.email, {marginTop: hp('3px')}]}>
                    PASSWORD
                </Text>

                <CustomInput
                    iconName="lock"
                    placeholder="****************"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError('');
                        setLoginError('');
                    }}
                    iconRight={
                            <TouchableOpacity
                            activeOpacity={0.9}
        onPress={() => setShowPassword(!showPassword)}
    >
        <FontAwesome
            name={showPassword ? 'eye' : 'eye-slash'}
            size={hp(2.5)}
            color={COLORS.personIcon}
            style={{marginLeft : wp('20px')}}
        />
    </TouchableOpacity>
                    }
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            </View>



            <View style={styles.remamberMeContainer}>{/* remamber me and forgot password */}

                <View>{/* remamber me  */}

                    <View style={styles.remamberMeIcon}>

                    <TouchableOpacity activeOpacity={0.9}onPress={() => setRememberMe(!rememberMe)}>

                        <FontAwesome
                            name={rememberMe ? "check-square" : "square"}
                            size={hp('1.8%')}
                            color={rememberMe ? COLORS.textColor : COLORS.cardBackground}
                            style={styles.boxIcon}
                        />
                    </TouchableOpacity>
                    
                    

                    <View>

                    <Text style={styles.remamberMe}>Remanber me</Text>
                    
                    </View>

                    </View>


                </View>

                <View>{/* forgot password  */}

                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ForgotPassword')}>
                        
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>

                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.Button}>{/* sign in button */}

                <CustomButton title="Sign In" onPress={handleSignIn} />
                {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
                
            </View>




            <View style={styles.Orcontainer}>{/*OR*/}

                <View style={styles.LeftLine}/>


                <View>
                <Text style={styles.OR}>OR</Text>
                </View>


                <View style={styles.RightLine}/>

            </View>
   

           <GoogleButton onPress={onGooglePress} />


        </View>


        <View style={styles.NewAccontMainContaner}>{/* create account */}

          <View style={styles.Text}>
            <Text style={styles.newAccount}>
                New at Kazino?
            </Text>
           </View>

           <View>
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.createAccount}>
                    Create an Account
                </Text>
            </TouchableOpacity>
           </View>

            

        </View> 


        <View style={styles.termsAndConditionMainContaner}>{/*Terms and Condition Main Contaner*/}

            <View> 
                <Text style={styles.terms}>
                    By Continuing, you agree to our 
                </Text>
            </View>


          <TouchableOpacity activeOpacity={0.9} onPress={() => setShowTerms(true)}>
            <View>
                <Text style={styles.termsCondition}>
                    Terms & Conditions
                </Text>
            </View>
          </TouchableOpacity>



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
        height : hp(105)
    },

    innerView: {
        backgroundColor: COLORS.cardBackground,
        width : wp(87),
        height : hp(88),
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
        fontSize: FONT_SIZES.h6,
        marginLeft: wp(1.5),
        marginTop: hp(1.5),
    },
    email : {
        color : COLORS.textColor,
        fontSize :FONT_SIZES.bodySmall,
        marginTop : hp(1),
        marginLeft : wp(4),
        fontWeight:'bold',
        letterSpacing:wp('0.6')
    },
    errorText: {
        color: 'red',
        fontSize: FONT_SIZES.body,
        marginLeft: wp(8),
        marginTop: hp(0.5),
    },
    boxIcon : {
        borderWidth: wp(0.5),
        borderColor : COLORS.inputBorder,
        width: wp(4.8),
        height: hp(2.3),
        marginTop : hp(0.3),
        borderRadius : wp(1),
        marginLeft : wp(2.7),
        textAlign: 'center',
        verticalAlign: 'middle',
    },
    remamberMe : {
        color : '#ffffff',
        fontSize : FONT_SIZES.body,
        marginLeft : wp(4),
    },
    remamberMeContainer : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : hp(3),
        marginLeft : wp(4),
    },
    remamberMeIcon : {
        display : 'flex',
        flexDirection : 'row',
    },
    forgotPassword : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.body,
        fontWeight : 'bold',
        marginRight : wp(4),     
    },
    Button : {
        marginTop : hp(3),
        marginLeft : wp(5.5)
    },
    buttonText : {
        color : COLORS.textColor,
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
    NewAccontMainContaner : {
        display : 'flex',
        flexDirection : 'row',
        marginTop : hp(2),
        marginLeft : wp(23.5),
        
    },
    newAccount : {
        color : COLORS.toPlay,
        fontSize : FONT_SIZES.body,
    },
    createAccount : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.body,
        fontWeight : 'bold',
        marginLeft : wp(1)
    },
    termsAndConditionMainContaner : {
        display: 'flex',
        flexDirection : 'row',
        alignSelf : 'center',
        justifyContent : 'center',
        marginTop : hp(1.5)
    },
    terms : {
        color : COLORS.toPlay,
        marginRight : wp(1)
    },
    termsCondition : {
        color : COLORS.textColor,
        fontSize : FONT_SIZES.body,
        fontWeight : 'bold',
        marginLeft : wp(0.2),
        textDecorationLine: 'underline',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: wp(5),
    },
    bottomSheetTitle: {
        color: COLORS.textColor,
        fontSize: FONT_SIZES.h5,
        fontWeight: 'bold',
        marginBottom: hp(2),
    },
    bottomSheetText: {
        color: COLORS.textColor,
        fontSize: FONT_SIZES.body,
        textAlign: 'center',
    }
});

export default Login