import { Undocumented } from '@/db/schema'
import { AntDesign } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

interface UndocumentedItemProps {
  item: Undocumented
}

export const UndocumentedItem = ({ item }: UndocumentedItemProps) => {
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
