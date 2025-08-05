import { formatTime } from '@/utils/formatTime'
import { AntDesign } from '@expo/vector-icons'
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { Text, View } from 'react-native'

interface AudioPlayerProps {
  uri: string
}

export const AudioPlayer = ({ uri }: AudioPlayerProps) => {
  const player = useAudioPlayer(uri)
  const audioStatus = useAudioPlayerStatus(player)

  const barWidth = Math.floor(
    (audioStatus.currentTime * 100) / audioStatus.duration
  )

  return (
    <View className='mt-8 gap-2'>
      <Text className='text-2xl font-bold'>Nota de voz</Text>
      <View className='p-4'>
        <View className='item-center mt-4 w-full flex-row gap-4 rounded-full bg-gray-200 p-4'>
          <AntDesign
            name={player.currentStatus.playing ? 'pausecircle' : 'play'}
            size={36}
            color='#2563eb'
            onPress={() => {
              if (player.playing) return player.pause()
              if (audioStatus.didJustFinish) player.seekTo(0)
              player.play()
            }}
          />
          <View
            className='h-2 flex-1 self-center rounded-full bg-gray-400'
            style={{ borderRadius: 9999, overflow: 'hidden' }}
          >
            <View
              className='h-full bg-blue-600'
              style={{ width: `${barWidth}%`, borderRadius: 9999 }}
            ></View>
          </View>
          <Text className='self-center'>
            {formatTime(audioStatus.currentTime)} /{' '}
            {formatTime(audioStatus.duration)}
          </Text>
        </View>
      </View>
    </View>
  )
}
