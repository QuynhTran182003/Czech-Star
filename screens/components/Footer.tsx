import { View } from 'react-native'
import React from 'react'
import Button from './Button'

const COLORS = {
  remember: '#00eda6',
  revise: '#ff006f',
  star: '#07A6FF'
}

const Footer = ({ handleChoice }) => {
  return (
    <View style={{
      position: 'absolute', bottom: 15, width: 240,
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between', zIndex: -99999}}>
      <Button
              name="times"
              size={24}
              color={COLORS.revise}
              onPress={() => handleChoice(-1)} style={undefined}/>  
      
      <Button
              name="heart"
              size={24}
              color={COLORS.remember}
              onPress={() => handleChoice(1)} style={undefined}/>
    </View>
  )
}

export default Footer