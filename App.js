import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  /* const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState(''); */
  
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Escolha um dos filtros e realize a busca!</Text>

      <TextInput
        style={styles.input}
        /* value={text} */
        placeholder="Useless Text"
      />
      
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#c9c9c9',
  },
});
