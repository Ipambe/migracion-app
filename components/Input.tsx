import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native'

interface InputProps {
  label: string
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  keyboardType?: KeyboardTypeOptions
  multiline?: boolean
  numberOfLines?: number
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1
}: InputProps) => {
  return (
    <View className='flex-1 gap-1'>
      <Text className='text-lg font-bold'>{label}</Text>
      <TextInput
        className='rounded border border-gray-300 bg-gray-100 p-4 text-lg text-gray-900'
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#666666'
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  )
}
