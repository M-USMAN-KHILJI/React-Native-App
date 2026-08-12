import { View, Text, Button } from 'react-native';
import useGoogleSignIn from '../../api/Google'; // adjust path to match your Index.js re-export if applicable
import { SafeAreaView } from '../../api/Index'; // or however you import it

const Home = ({ navigation }) => {
  const { onLogout } = useGoogleSignIn();

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <Button title="Back to Login" onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Home;