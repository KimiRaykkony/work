import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBkCet1CZ9U5VmOviURpFntq27bFUbZdQQ",
  authDomain: "fblogin-662fb.firebaseapp.com",
  projectId: "fblogin-662fb",
  storageBucket: "fblogin-662fb.appspot.com",
  messagingSenderId: "680874218279",
  appId: "1:680874218279:web:f77f94d78319a9e753cf02",
  measurementId: "G-EEC89ZGR0Q"
};

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth com persistência
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const TelaDeAutenticacao = ({ email, setEmail, senha, setSenha, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <ImageBackground source={require('./assets/images/background.jpg')} style={styles.imageBackground} resizeMode="cover">
      <View style={styles.authContainer}>
        <Text style={styles.title}>{isLogin ? 'Conecte-se' : 'Cadastre-se'}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Senha de 6 caracteres"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Entrar' : 'Cadastrar'} onPress={handleAuthentication} color="#004c01" />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Precisa de uma conta? Cadastre-se' : 'Já tem uma conta? Conecte-se'}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const TelaAutenticada = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Bem Vindo</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Sair" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOut(auth);
        console.log('Usuário desconectado com sucesso!');
      } else {
        if (isLogin) {
          await signInWithEmailAndPassword(auth, email, senha);
          console.log('Usuário conectado com sucesso!');
        } else {
          await createUserWithEmailAndPassword(auth, email, senha);
          console.log('Usuário criado com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro de autenticação:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <TelaAutenticada user={user} handleAuthentication={handleAuthentication} />
      ) : (
        <TelaDeAutenticacao
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#004c01',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#004c01',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
