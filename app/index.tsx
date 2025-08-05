import { db } from '@/db/db'
import { Undocumented } from '@/db/schema'
import { AntDesign } from '@expo/vector-icons'
import { Link, Tabs, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

export default function Index() {
  const [undocumenteds, setUndocumenteds] = useState<Undocumented[]>([])
  useFocusEffect(
    useCallback(() => {
      const fetchUndocumenteds = async () => {
        const undocumenteds = await db.query.undocumenteds.findMany()
        setUndocumenteds(undocumenteds)
      }
      fetchUndocumenteds()
    }, [])
  )

  return (
    <View className='flex-1'>
      <Tabs.Screen
        options={{
          headerRight: () => (
            <Link
              href={{ pathname: '/register' }}
              className='text-teal-700 mr-4'
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
        <FlatList
          data={undocumenteds}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UndocumentedItem item={item} />}
          className='mt-4 flex-1'
        />
      )}
    </View>
  )
}

const UndocumentedItem = ({ item }: { item: Undocumented }) => {
  return (
    <Link
      href={{ pathname: '/[id]', params: { id: item.id } }}
      asChild
    >
      <TouchableOpacity className='flex-row items-center justify-between border-b border-gray-200 p-4 px-4'>
        <Text className='text-xl'>{item.name}</Text>
        <AntDesign
          name='right'
          size={24}
          color='#888'
        />
      </TouchableOpacity>
    </Link>
  )
}
