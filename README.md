# Meet AI - AI-Powered Video Calling Platform

A cutting-edge video calling application with AI integration, built using modern web technologies including Next.js 15, Stream.io, and OpenAI Realtime API.

## 🚀 Tech Stack

- **Frontend:** Next.js 15 with React 19
- **Database:** Neon Database with Drizzle ORM
- **Video Calling:** Stream.io Video SDK
- **AI Integration:** OpenAI Realtime API
- **Authentication:** Better Auth
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** Zustand + TanStack Query
- **API:** tRPC for type-safe APIs
- **Animations:** Framer Motion
- **Forms:** React Hook Form with Zod validation

## ✨ Features

- **AI-Powered Video Calls** - Real-time AI integration during video calls
- **Modern Video Interface** - Built with Stream.io for seamless video experience
- **Avatar Generation** - Dynamic avatars using DiceBear
- **Real-time Communication** - OpenAI Realtime API for instant AI responses
- **Responsive Design** - Works perfectly on desktop and mobile
- **Dark/Light Theme** - Toggle between themes
- **Type-safe APIs** - Full TypeScript support with tRPC
- **Database Management** - Drizzle ORM with Neon Database
- **Advanced UI Components** - Rich component library with Radix UI

## 🛠️ Installation

### Prerequisites
- Node.js 18+ (or Bun for better performance)
- Neon Database account
- Stream.io account
- OpenAI API access
- ngrok for webhook development

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ASHUTOSH-KUMAR-RAO/meet-ai.git
   cd meet-ai
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Or using Bun (recommended for faster performance)
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database (Neon)
   DATABASE_URL=postgresql://username:password@host/database
   
   # Better Auth
   BETTER_AUTH_SECRET=your-auth-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   
   # Stream.io
   STREAM_API_KEY=your-stream-api-key
   STREAM_API_SECRET=your-stream-secret
   
   # OpenAI
   OPENAI_API_KEY=sk-...
   
   # ngrok (for webhook development)
   NGROK_URL=smart-walleye-extremely.ngrok-free.app
   ```

4. **Database Setup**
   ```bash
   # Push schema to database
   npm run db:push
   
   # Open Drizzle Studio for database management
   npm run db:studio
   ```

## 🚀 Running the Application

### Development Mode
```bash
# Start development server
npm run dev

# Application will be available at http://localhost:3000
```

### Webhook Development
```bash
# Start ngrok tunnel for webhooks (in separate terminal)
npm run dev:webhook
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🎥 Stream.io Video Setup

1. Create account at [Stream.io](https://stream.io)
2. Get your API key and secret
3. Add to environment variables
4. Video calling features will be automatically available

## 🤖 OpenAI Integration

1. Get OpenAI API key from [OpenAI Platform](https://platform.openai.com)
2. Add to environment variables
3. Real-time AI features will work during video calls

## 🗄️ Database Management

### Drizzle Commands
```bash
# Push schema changes to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Neon Database
- Cloud PostgreSQL database
- Serverless and scalable
- Perfect for modern applications

## 📁 Project Structure

```
meet-ai/
├── src/
│   ├── app/              # Next.js app directory (pages & layouts)
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   ├── server/           # tRPC server and API routes
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── drizzle/              # Database schema and migrations
├── public/               # Static assets
├── drizzle.config.ts     # Drizzle ORM configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── next.config.js        # Next.js configuration
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build production application |
| `start` | Start production server |
| `lint` | Run ESLint for code quality |
| `db:push` | Push database schema changes |
| `db:studio` | Open Drizzle Studio (database GUI) |
| `dev:webhook` | Start ngrok tunnel for webhook development |

## 🎨 UI Features

- **Responsive Design** - Works on all device sizes
- **Modern Animations** - Smooth transitions with Framer Motion
- **Icon Library** - Lucide React + React Icons
- **Component Library** - Rich set of accessible components
- **Theme Support** - Dark/light mode toggle
- **Avatar Generation** - Dynamic user avatars

## 🔧 Development Tools

- **TypeScript** - Full type safety
- **ESLint** - Code quality and formatting
- **Drizzle Studio** - Visual database management
- **TanStack Query** - Powerful data fetching
- **React Error Boundary** - Better error handling

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Optimal for Next.js)
- **Railway**
- **Netlify**
- **DigitalOcean App Platform**

### Database
- **Neon Database** (Recommended - serverless PostgreSQL)
- Connection string required in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👤 Author

**Ashutosh Kumar Rao**
- GitHub: [@ASHUTOSH-KUMAR-RAO](https://github.com/ASHUTOSH-KUMAR-RAO)

---

*Experience the future of AI-powered video communication* 🚀
