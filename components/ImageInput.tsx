import { Feather } from '@expo/vector-icons'
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync
} from 'expo-image-picker'
import { Image, Text, TouchableOpacity, View } from 'react-native'

interface ImageInputProps {
  image: string | null
  setImage: (uri: string | null) => void
}

export const ImageInput = ({ image, setImage }: ImageInputProps) => {
  const pickImage = async () => {
    const { granted } = await requestMediaLibraryPermissionsAsync()

    if (!granted) {
      alert('Permiso denegado para acceder a la galería de imágenes.')
      return
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
      aspect: [1, 1]
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <View className='gap-4 '>
      {image ? (
        <View className='relative aspect-square w-2/3 rounded-3xl border-2 border-blue-400 bg-white p-2 shadow-xl'>
          <Image
            source={{ uri: image }}
            className='h-full w-full rounded-2xl'
            resizeMode='cover'
          />
          <TouchableOpacity
            onPress={() => setImage(null)}
            className='absolute -right-4 -top-4 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-150 active:bg-red-100'
          >
            <Feather
              name='trash-2'
              size={22}
              color='red'
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickImage}
          className='flex-row items-center rounded border border-gray-300 bg-gray-100 p-4'
        >
          <Feather
            name='image'
            size={20}
            color='black'
            className='mr-2 rounded-full bg-gray-50 p-2'
          />
          <Text className='text-lg font-bold'>Seleccionar Imagen</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
