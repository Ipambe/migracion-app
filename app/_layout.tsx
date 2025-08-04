import { db } from '@/db/db'
import migrations from '@/drizzle/migrations'
import '@/global.css'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { Stack } from 'expo-router'
import { ActivityIndicator, Text, View } from 'react-native'

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations)

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
        <ActivityIndicator
          size='large'
          color='#0000ff'
        />
      </View>
    )
  }

  return <Stack />
}
