import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const undocumenteds = sqliteTable('undocumenteds_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  nationality: text().notNull(),
  dateTime: text().notNull(),
  ubication: text(),
  description: text().notNull(),
  imageUri: text(),
  voiceNoteUri: text()
})

const schema = {
  undocumenteds
}

type Undocumented = typeof undocumenteds.$inferSelect
type Schema = typeof schema

export type { Schema, Undocumented }

export { schema, undocumenteds }
