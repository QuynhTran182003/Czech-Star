import 'react-native-url-polyfill/auto'
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LevelList from './screens/Levels'
import Units from './screens/Units'
import Lessons from './screens/Lessons'
import Lesson from './screens/Lesson'
import Exercise from './screens/Exercise'
import Grammar from './screens/Grammar'
import Auth from './screens/Auth'

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
        <Stack.Screen name="Exercise" component={Exercise}/>
        <Stack.Screen name="Grammar" component={Grammar}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
