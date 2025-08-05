import { Feather } from '@expo/vector-icons'
import { AudioModule, setAudioModeAsync } from 'expo-audio'
import { useEffect } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'

interface AudioInputProps {
  isRecording: boolean
  record: () => void
  stopRecording: () => void
}

export const AudioInput = ({
  isRecording,
  record,
  stopRecording
}: AudioInputProps) => {
  useEffect(() => {
    const setupAudio = async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync()
      if (!status.granted) {
        Alert.alert(
          'Permiso denegado',
          'La aplicacion necesita acceder a los permisos del microfono para grabar audios sobre el indocumentado.'
        )
      }
      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true
      })
    }
    setupAudio()
  }, [])

  return (
    <View className='gap-4'>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : record}
        className={`flex-row items-center rounded border  bg-gray-100 p-4`}
        style={{
          borderColor: isRecording ? 'red' : '#d1d5db'
        }}
      >
        <Feather
          name={isRecording ? 'stop-circle' : 'mic'}
          size={24}
          color={isRecording ? 'red' : 'black'}
          className='mr-2 rounded-full bg-gray-50 p-2'
        />
        <Text
          className='text-lg font-semibold'
          style={{ color: isRecording ? 'red' : 'black' }}
        >
          {isRecording ? 'Detener grabación' : 'Grabar audio'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
