import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');
  
  const cadastro = ()=>{
  alert(name);
  alert(senha)

}
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Bem Vindo!</Text>
      <StatusBar hidden />

      <Image style={{ width: 300, height: 200 }} source={require('./assets/adaptive-icon.png')} />

      <TextInput 
      placeholder= 'Digite Seu Nome...'
        style={styles.textInput}
        onChangeText={setName}
        value={name}
      />

      <TextInput
      placeholder= 'Digite Sua Senha...'
        style={styles.textInput}
        onChangeText={setSenha}
        value={senha}
        secureTextEntry={true} 

      />
      
      <TouchableOpacity style = {styles.btnCadastro} onPress={()=>cadastro()}>
         <Text style={{color: 'white', textAlign: 'center'}}>CADASTRAR</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b4a24',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 40,
    marginTop: 20,
    paddingLeft:10
  },
  btnCadastro:{
    width:'100%',
    height:40,
    backgroundColor: '#f7c705',
    paddingLeft:10,
    borderRadius: 40,
    marginTop: 20,
    justifyContent: 'center'
  }
});