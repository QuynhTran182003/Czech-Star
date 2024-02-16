import React, { useState } from 'react'
import { Alert, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import styles from "../style";
import { LinearGradient } from 'expo-linear-gradient';


export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header
    });
  }, [navigation]);

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <LinearGradient
            // colors={['rgba(35,0,36,1)', 'rgba(9,31,121,1)', 'rgba(190,0,255,1)']}
            colors={['rgba(75,1,77,1)', 'rgba(51,74,170,1)', 'rgba(190,0,255,1)']}
            style={styles.linearGradient}
        >
    <SafeAreaView style={styles.template}>
      <View>
        <Text style={[styles.white_text, styles.bold_text, styles.header, styles.padding2X, styles.paddingY]}>Czech Star</Text>
        <Text style={[styles.white_text, styles.subheading, styles.padding2X, styles.paddingY]}>Let's join Czech Community</Text>
      </View>
      <View style={[styleCustom.verticallySpaced, styleCustom.mt20, styles.padding2X]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styleCustom.verticallySpaced, styles.padding2X]}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.white_text}
        />
      </View>
      <View style={[styleCustom.verticallySpaced, styleCustom.mt20, styles.margin2X]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} />
      </View>
      <View style={[styleCustom.verticallySpaced, styles.margin2X]}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} />
      </View>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styleCustom = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})