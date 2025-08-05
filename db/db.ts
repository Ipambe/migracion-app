import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { schema } from './schema'

const expo = openDatabaseSync('db.db')
const db = drizzle(expo, { schema })

export { db }
