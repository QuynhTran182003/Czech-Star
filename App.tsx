import 'react-native-url-polyfill/auto'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import React, { useState, useEffect } from 'react'
import { View , Text, Button, SafeAreaView, FlatList} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LevelList from './components/Levels'
import Units from './components/Units'
import Lessons from './components/Lessons'
import Lesson from './components/Lesson'
import Auth from './components/Auth'

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {session && session.user ? (
          <Stack.Screen name="LevelList" component={LevelList} />
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
        <Stack.Screen name="Units" component={Units}/>
        <Stack.Screen name="Lessons" component={Lessons}/>
        <Stack.Screen name="Lesson" component={Lesson}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
