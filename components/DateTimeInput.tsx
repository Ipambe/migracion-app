import { AntDesign } from '@expo/vector-icons'
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { Text, TouchableOpacity, View } from 'react-native'

interface DateTimeInputProps {
  value: Date
  onChange: (event: DateTimePickerEvent, date?: Date) => void
}

export const DateTimeInput = ({ onChange, value }: DateTimeInputProps) => {
  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: value,
      onChange,
      mode: currentMode
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }
  return (
    <View className='flex gap-3'>
      <Text className='text-lg font-bold'>Fecha y hora</Text>
      <View className='flex-row justify-between rounded border border-gray-300 bg-gray-100 p-4 text-gray-900'>
        <Text className='text-lg text-gray-800'>
          {value.toLocaleString('es-ES', {
            dateStyle: 'full',
            timeStyle: 'short'
          })}
        </Text>
        <View className='flex-row gap-4'>
          <TouchableOpacity
            onPress={showDatepicker}
            className='rounded-md'
          >
            <AntDesign
              name='calendar'
              size={24}
              color='#666666'
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showTimepicker}
            className='rounded-md'
          >
            <AntDesign
              name='clockcircleo'
              size={24}
              color='#666666'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
