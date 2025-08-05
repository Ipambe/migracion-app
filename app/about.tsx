import React from 'react'
import { Image, Text, View } from 'react-native'

export default function AboutScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-white px-6'>
      <View className='mb-6 items-center'>
        <Image
          source={require('@/assets/images/adolfo.webp')}
          className='mb-4 size-52 rounded-full border-4 border-blue-500'
          resizeMode='cover'
        />
        <Text className='mb-1 text-2xl font-bold text-blue-800'>
          Rafael Adolfo Rosa
        </Text>
        <Text className='mb-2 text-base text-gray-700'>
          Matrícula: <Text className='font-semibold'>2023-1025</Text>
        </Text>
        <Text className='text-center text-lg italic text-blue-600'>
          Sirviendo a la nación con integridad.
        </Text>
      </View>
    </View>
  )
}
