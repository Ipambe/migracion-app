import { UndocumentedItem } from '@/components/UndocumentedItem'
import { db } from '@/db/db'
import { Undocumented, undocumenteds as u } from '@/db/schema'
import { Link, Tabs, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const fetchUndocumenteds = async () => await db.query.undocumenteds.findMany()

export default function Index() {
  const [undocumenteds, setUndocumenteds] = useState<Undocumented[]>([])

  const fetchAndSetUndocumenteds = async () => {
    const undocumenteds = await fetchUndocumenteds()
    setUndocumenteds(undocumenteds)
  }

  useFocusEffect(
    useCallback(() => {
      fetchAndSetUndocumenteds()
    }, [])
  )

  const handleDeleteAll = async () => {
    await db.delete(u)
    await fetchAndSetUndocumenteds()
  }

  return (
    <View className='flex-1'>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Link
              href={{ pathname: '/register' }}
              className='mr-4 text-teal-700'
            >
              Agregar
            </Link>
          )
        }}
      />

      {undocumenteds.length === 0 ? (
        <View className='flex-1 items-center justify-center'>
          <Text className='text-lg text-gray-500'>No hay registros</Text>
          <Link
            href={{ pathname: '/register' }}
            className='mt-4 text-teal-700'
          >
            Agregar uno
          </Link>
        </View>
      ) : (
        <>
          <FlatList
            data={undocumenteds}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UndocumentedItem item={item} />}
            className='mt-4 flex-1'
          />
          <TouchableOpacity
            className='m-4 rounded-lg bg-red-500 py-4'
            onPress={handleDeleteAll}
          >
            <Text className='text-center text-lg font-bold text-white'>
              Borrar todos
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}
