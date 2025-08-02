import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

import { AdapterAccountType } from "@auth/core/adapters";
import { relations } from "drizzle-orm"; // Removed 'desc' as it's not used

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => [
    {
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    },
  ]
)

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ]
)

export const quizs = pgTable("quizs", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  userId: text("userId").references(() => users.id),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  questionText: text("questionText"),
  quizId: integer("quizId").references(() => quizs.id), // Added foreign key reference
});

export const questionAnswers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("questionId").references(() => questions.id), // Added foreign key reference
  answerText: text("answerText"),
  isCorrect: boolean("isCorrect"),
});

export const quizSubmissions = pgTable("quizSubmissions", {
  id: serial("id").primaryKey(),
  quizId: integer("quizId").references(() => quizs.id),
  score: integer("score"),
})

export const userRelations = relations(users, ({ many }) => ({
  quizs: many(quizs)
}));

export const quizRelations = relations(quizs, ({ many }) => ({
  questions: many(questions),
  quizSubmissions: many(quizSubmissions),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
  quiz: one(quizs, {
    fields: [questions.quizId],
    references: [quizs.id],
  }),
  answers: many(questionAnswers),
}));

export const questionAnswerRelations = relations(questionAnswers, ({ one }) => ({
  question: one(questions, {
    fields: [questionAnswers.questionId],
    references: [questions.id],
  }),
}));

export const quizSubmissionRelations = relations(quizSubmissions, ({ one, many }) => ({
  quizs: one(quizs, {
    fields: [quizSubmissions.quizId],
    references: [quizs.id],
  })
}))