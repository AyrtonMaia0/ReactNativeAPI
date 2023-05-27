import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

//Pegando Tela de um Sub-Arquivo
import Home from './src/screens/Home';

export default function App() {
  
  return (
    <>
      <StatusBar backgroundColor="#2F48D4" barStyle="light-content" />
      <Home />
    </>
  );
}


const styles = StyleSheet.create({


});
