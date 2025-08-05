import { db } from '@/db/db'
import migrations from '@/drizzle/migrations'
import '@/global.css'
import { Ionicons } from '@expo/vector-icons'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { router, Tabs } from 'expo-router'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations)

  if (error) {
    return (
      <View className='flex-1 items-center justify-center'>
        <Text className='text-3xl italic text-red-500'>
          Migration error: {error.message}
        </Text>
      </View>
    )
  }

  if (!success) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator
          size='large'
          color='#0000ff'
        />
      </View>
    )
  }

  return (
    <Tabs screenOptions={{ sceneStyle: { backgroundColor: 'white' } }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          headerTitle: 'Listado de indocumentados',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='home-outline'
              size={size ?? 24}
              color={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name='register'
        options={{
          title: 'Registrar un indocumentado',
          headerTitleAlign: 'center',
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons
                name='arrow-back'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen
        name='[id]'
        options={{
          title: 'Detalle del indocumentado',
          headerTitleAlign: 'center',
          tabBarStyle: { display: 'none' },
          tabBarItemStyle: { display: 'none' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 16 }}
            >
              <Ionicons
                name='arrow-back'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          )
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'Acerca de',
          headerTitle: 'Acerca del agente',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name='person-circle-outline'
              size={size ?? 24}
              color={color}
            />
          )
        }}
      />
    </Tabs>
  )
}
