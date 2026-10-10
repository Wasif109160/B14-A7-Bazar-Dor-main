import { betterAuth } from 'better-auth';
import Database from 'better-sqlite3';
import path from 'path';

// Determine writable database path: /tmp when running in Vercel/serverless environments, local root otherwise
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;
const dbPath = isServerless ? path.join('/tmp', 'bazardor-auth.db') : path.join(process.cwd(), 'auth.db');

const db = new Database(dbPath);

// Ensure required BetterAuth tables exist
db.exec(`
  CREATE TABLE IF NOT EXISTS "user" (
    "id" text not null primary key,
    "name" text not null,
    "email" text not null unique,
    "emailVerified" integer not null default 0,
    "image" text,
    "createdAt" date not null,
    "updatedAt" date not null
  );

  CREATE TABLE IF NOT EXISTS "session" (
    "id" text not null primary key,
    "expiresAt" date not null,
    "token" text not null unique,
    "createdAt" date not null,
    "updatedAt" date not null,
    "ipAddress" text,
    "userAgent" text,
    "userId" text not null references "user" ("id") on delete cascade
  );

  CREATE TABLE IF NOT EXISTS "account" (
    "id" text not null primary key,
    "accountId" text not null,
    "providerId" text not null,
    "userId" text not null references "user" ("id") on delete cascade,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" date,
    "refreshTokenExpiresAt" date,
    "scope" text,
    "password" text,
    "createdAt" date not null,
    "updatedAt" date not null
  );

  CREATE TABLE IF NOT EXISTS "verification" (
    "id" text not null primary key,
    "identifier" text not null,
    "value" text not null,
    "expiresAt" date not null,
    "createdAt" date not null,
    "updatedAt" date not null
  );
`);

export const auth = betterAuth({
  database: db,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || 'demo-github-client-id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'demo-github-client-secret',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret',
    },
  },
});
