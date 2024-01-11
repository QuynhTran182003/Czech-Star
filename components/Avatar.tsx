// import { useState, useEffect } from 'react'
// import { supabase } from '../lib/supabase'
// import { StyleSheet, View, Alert, Image, TouchableOpacity, Text } from 'react-native'
// import DocumentPicker, { isCancel, isInProgress, types } from 'react-native-document-picker'
// import React from 'react'

// interface Props {
//   size: number
//   url: string | null
//   onUpload: (filePath: string) => void
// }

// export default function Avatar({ url, size = 150, onUpload }: Props) {
//   const [uploading, setUploading] = useState(false)
//   const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
//   const avatarSize = { height: size, width: size }

//   useEffect(() => {
//     if (url) downloadImage(url)
//   }, [url])

//   async function downloadImage(path: string) {
//     try {
//       const { data, error } = await supabase.storage.from('avatars').download(path)

//       if (error) {
//         throw error
//       }

//       const fr = new FileReader()
//       fr.readAsDataURL(data)
//       fr.onload = () => {
//         setAvatarUrl(fr.result as string)
//       }
//     } catch (error) {
//       if (error instanceof Error) {
//         console.log('Error downloading image: ', error.message)
//       }
//     }
//   }

//   async function uploadAvatar() {
//     try {
//       setUploading(true)

//       const file = await DocumentPicker.pickSingle({
//         presentationStyle: 'fullScreen',
//         copyTo: 'cachesDirectory',
//         type: types.images,
//         mode: 'open',
//       })

//     //   const photo = {
//       const uri = file.fileCopyUri ?? 'null';
//       const type = file.type;
//       const name = file.name ?? 'null';  // Use 'null' if file.name is null or undefined
//     //   };
      
//       const response = await fetch(uri);
//       const blob = await response.blob();

    
//       const formData = new FormData();
//       formData.append('file', blob, name);


//       const fileExt = file.name ? file.name.split('.').pop() : '';

//       const filePath = `${Math.random()}.${fileExt}`

//       const { error } = await supabase.storage.from('avatars').upload(filePath, formData)

//       if (error) {
//         throw error
//       }

//       onUpload(filePath)
//     } catch (error) {
//       if (isCancel(error)) {
//         console.warn('cancelled')
//         // User cancelled the picker, exit any dialogs or menus and move on
//       } else if (isInProgress(error)) {
//         console.warn('multiple pickers were opened, only the last will be considered')
//       } else if (error instanceof Error) {
//         Alert.alert(error.message)
//       } else {
//         throw error
//       }
//     } finally {
//       setUploading(false)
//     }
//   }

//   return (
//     <View>
//       {avatarUrl ? (
//         <Image
//           source={{ uri: avatarUrl }}
//           accessibilityLabel="Avatar"
//           style={[avatarSize, styles.avatar, styles.image]}
//         />
//       ) : (
//         <View style={[avatarSize, styles.avatar, styles.noImage]} />
//       )}
//       <View>
//       <TouchableOpacity
//   onPress={uploadAvatar}
//   disabled={uploading}
// >
//   <Text>{uploading ? 'Uploading ...' : 'Upload'}</Text>
// </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   avatar: {
//     borderRadius: 5,
//     overflow: 'hidden',
//     maxWidth: '100%',
//   },
//   image: {
//     objectFit: 'cover',
//     paddingTop: 0,
//   },
//   noImage: {
//     backgroundColor: '#333',
//     border: '1px solid rgb(200, 200, 200)',
//     borderRadius: 5,
//   },
// })