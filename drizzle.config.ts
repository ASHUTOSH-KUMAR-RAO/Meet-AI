
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});



//? npx drizzle-kit push, jaab bhi hum apne drizzle ki schema ko update karte hain, tab humein ye command run karni hoti hai isse humari database ki schema update ho jaati hai 


//! npx drizzle-kit studio, isse hum apne database ki schema ko visualise kar sakte hain 