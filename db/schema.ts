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

const agent = sqliteTable('agent_table', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  surname: text().notNull(),
  agentCode: text().notNull(),
  photoUri: text().notNull(),
  motivationalQuote: text().notNull()
})

const schema = {
  undocumenteds,
  agent
}

type Undocumented = typeof undocumenteds.$inferSelect
type Agent = typeof agent.$inferSelect
type Schema = typeof schema

export type { Agent, Schema, Undocumented }

export { agent, schema, undocumenteds }
