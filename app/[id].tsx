import { AudioPlayer } from '@/components/AudioPlayer'
import { db } from '@/db/db'
import { Undocumented, undocumenteds } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { router, Tabs, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

export default function UndocumentedDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [data, setData] = useState<Undocumented | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      const result = await db.query.undocumenteds.findFirst({
        where: eq(undocumenteds.id, Number(id))
      })
      setData(result || null)
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator
          size='large'
          color='#0000ff'
        />
      </View>
    )
  }

  if (!data) {
    return (
      <View className='flex-1 items-center justify-center gap-4'>
        <Text className='text-xl text-red-500'>Registro no encontrado</Text>
        <TouchableOpacity className='text-lg text-teal-700'>
          Volver al inicio
        </TouchableOpacity>
      </View>
    )
  }

  const deleteHandler = async () => {
    await db.delete(undocumenteds).where(eq(undocumenteds.id, data.id))
    router.back()
  }

  return (
    <ScrollView className='flex-1 bg-white p-8'>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              className='mr-4'
              onPress={deleteHandler}
            >
              <Text className='text-red-700'>Eliminar</Text>
            </TouchableOpacity>
          )
        }}
      />
      {data.imageUri && (
        <View className='mx-auto size-44 rounded-full border-2 border-blue-700 p-1'>
          <Image
            source={{ uri: data.imageUri }}
            className='size-full rounded-full'
            resizeMode='cover'
          />
        </View>
      )}
      <Text className='mt-4 text-center text-3xl font-bold'>{data.name}</Text>
      <Text className='mt-2 text-center text-2xl font-bold text-gray-400'>
        ID: {data.id}
      </Text>
      <View className='mt-8 gap-2'>
        <Text className='text-2xl font-bold'>Informacion personal</Text>
        <View className='rounded-lg border border-gray-200'>
          <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
            <Text className='text-xl text-gray-500'>Nombre</Text>
            <Text className='text-xl'>{data.name}</Text>
          </View>
          <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
            <Text className='text-xl text-gray-500'>Edad</Text>
            <Text className='text-xl'>{Math.floor(data.age)}</Text>
          </View>
          <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
            <Text className='text-xl text-gray-500'>Nacionalidad</Text>
            <Text className='text-xl'>{data.nationality}</Text>
          </View>
        </View>
      </View>
      <View className='mt-8 gap-2'>
        <Text className='text-2xl font-bold'>Sobre el encuentro</Text>
        <View className='rounded-lg border border-gray-200'>
          <View className='flex-row items-center justify-between gap-8 border-b border-gray-200 p-4'>
            <Text className='text-xl text-gray-500'>Descripcion</Text>
            <View style={{ flex: 1 }}>
              <Text
                className='text-xl'
                style={{ flexWrap: 'wrap' }}
              >
                {data.description}
              </Text>
            </View>
          </View>
          {data.ubication && (
            <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
              <Text className='text-xl text-gray-500'>Ubicación</Text>
              <Text className='text-xl'>{data.ubication}</Text>
            </View>
          )}
          <View className='flex-row items-center justify-between border-b border-gray-200 p-4'>
            <Text className='text-xl text-gray-500'>Fecha y hora</Text>
            <Text className='text-xl'>
              {new Date(data.dateTime).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      {data.voiceNoteUri && <AudioPlayer uri={data.voiceNoteUri} />}
      <View className='p-10'></View>
    </ScrollView>
  )
}
