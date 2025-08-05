import { AudioInput } from '@/components/AudioInput'
import { DateTimeInput } from '@/components/DateTimeInput'
import { ImageInput } from '@/components/ImageInput'
import { Input } from '@/components/Input'
import { db } from '@/db/db'
import { undocumenteds } from '@/db/schema'
import { stringInputToNumericFormat } from '@/utils/stringInputToNumericFormat'
import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import {
  RecordingPresets,
  useAudioRecorder,
  useAudioRecorderState
} from 'expo-audio'
import { copyAsync, documentDirectory } from 'expo-file-system'
import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function register() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [nationality, setNationality] = useState('')
  const [date, setDate] = useState(new Date())
  const [ubication, setUbication] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const router = useRouter()
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY)
  const recorderState = useAudioRecorderState(audioRecorder)

  useFocusEffect(
    useCallback(() => {
      setName('')
      setAge('')
      setNationality('')
      setDate(new Date())
      setUbication('')
      setDescription('')
      setImage(null)
    }, [])
  )

  const onDateTimeChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate
    if (currentDate) setDate(currentDate)
  }

  const record = async () => {
    await audioRecorder.prepareToRecordAsync()
    audioRecorder.record()
  }

  const stopRecording = async () => {
    await audioRecorder.stop()
  }

  const saveIndocumentado = async () => {
    try {
      if (!name.trim())
        return Alert.alert('Nombre requerido', 'Por favor ingrese el nombre.')
      if (!age.trim() || isNaN(+age) || +age <= 0)
        return Alert.alert(
          'Edad inválida',
          'La edad debe ser un número positivo.'
        )
      if (!nationality.trim())
        return Alert.alert(
          'Nacionalidad requerida',
          'Por favor ingrese la nacionalidad.'
        )
      if (!date)
        return Alert.alert('Fecha requerida', 'Por favor seleccione una fecha.')
      if (!description.trim())
        return Alert.alert(
          'Descripción requerida',
          'Por favor ingrese una descripción.'
        )

      let imagePath: string | null = null
      if (image) {
        const imageName = image.split('/').pop()
        imagePath = documentDirectory + imageName!
        await copyAsync({ from: image, to: imagePath })
      }

      if (recorderState.isRecording) await audioRecorder.stop()

      let voiceNoteUri: string | null = null
      if (recorderState.url) {
        voiceNoteUri = documentDirectory + date.getTime().toString() + '.m4a'
        await copyAsync({ from: recorderState.url, to: voiceNoteUri })
      }

      await db.insert(undocumenteds).values({
        name,
        age: +age,
        dateTime: date.toISOString(),
        description,
        nationality,
        ubication: ubication || null,
        imageUri: imagePath || null,
        voiceNoteUri: voiceNoteUri || null
      })
      router.back()
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al guardar: ' + error)
    }
  }

  return (
    <ScrollView className='pb-safe flex-1 bg-white'>
      <View className='gap-4 p-6'>
        <Input
          label='Nombre'
          placeholder='Ingrese el nombre'
          value={name}
          onChangeText={setName}
        />
        <View className='flex-row gap-4'>
          <Input
            label='Edad'
            placeholder='Ingrese la edad'
            value={age}
            onChangeText={(text) => setAge(stringInputToNumericFormat(text))}
            keyboardType='numeric'
          />
          <Input
            label='Nacionalidad'
            placeholder='Ingrese la nacionalidad'
            value={nationality}
            onChangeText={setNationality}
          />
        </View>
        <DateTimeInput
          value={date}
          onChange={onDateTimeChange}
        />
        <Input
          label='Ubicación (opcional)'
          placeholder='Ingrese la ubicación'
          value={ubication}
          onChangeText={setUbication}
        />
        <Input
          label='Descripción'
          placeholder='Ingrese una descripción'
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <View className='mt-4 gap-4'>
          <Text className='text-lg font-bold'>Adjuntos</Text>
          <View className='gap-2'>
            <AudioInput
              isRecording={recorderState.isRecording}
              record={record}
              stopRecording={stopRecording}
            />
            <ImageInput
              image={image}
              setImage={setImage}
            />
          </View>
        </View>
        <TouchableOpacity
          className='rounded-lg bg-blue-500 p-4'
          onPress={saveIndocumentado}
        >
          <Text className='text-lg text-white'>Guardar Indocumentado</Text>
        </TouchableOpacity>
      </View>
      <View className='p-10'></View>
    </ScrollView>
  )
}
