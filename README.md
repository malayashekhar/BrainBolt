# 🧠⚡ Brain Bolt

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
</div>

<div align="center">
  <h3>🎯 The Free AI-Powered Quiz Generator That Transforms PDFs into Interactive Learning Experiences</h3>
  <p><em>Upload any PDF, get instant quizzes. No cost, no limits, just learning.</em></p>
</div>

---

## ✨ What Makes Brain Bolt Special?

> **🆓 Completely Free** - While other AI quiz generators charge premium fees, Brain Bolt democratizes education by providing powerful quiz generation at zero cost.

Brain Bolt revolutionizes how you study and test knowledge by instantly converting any PDF document into engaging, AI-generated quizzes. Whether you're a student preparing for exams, an educator creating assessments, or a professional training your team, Brain Bolt makes learning interactive and accessible.

## 🚀 Key Features

### 📄 **Smart PDF Processing**
- Upload any PDF document (textbooks, research papers, manuals, etc.)
- Advanced text extraction and processing using LangChain
- Intelligent content chunking for optimal quiz generation

### 🤖 **AI-Powered Quiz Generation**
- Generates contextually relevant multiple-choice questions
- Adapts difficulty based on content complexity
- Creates diverse question types from the same source material

### 🔐 **Secure & Personalized**
- User authentication and personalized quiz history
- Secure document handling and storage
- Track your learning progress over time

### 🎨 **Beautiful User Experience**
- Modern, responsive design with shadcn/ui components
- Intuitive interface that works seamlessly across devices
- Clean, distraction-free learning environment

### ⚡ **Lightning Fast**
- Optimized PDF processing pipeline
- Real-time quiz generation
- Instant results and feedback

## 🛠️ Tech Stack

Brain Bolt is built with cutting-edge technologies for performance, scalability, and user experience:

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 14 | React framework with App Router |
| **Language** | TypeScript | Type-safe development |
| **AI/ML** | LangChain | PDF processing and AI integration |
| **Database** | Supabase | PostgreSQL database and real-time features |
| **ORM** | Drizzle ORM | Type-safe database operations |
| **UI Components** | shadcn/ui | Beautiful, accessible components |
| **Authentication** | Google OAuth | Secure user authentication |
| **AI Processing** | Google AI/Gemini | AI-powered content analysis |
| **Styling** | Tailwind CSS | Utility-first styling |

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm/yarn/pnpm package manager
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/malayashekhar/BrainBolt.git
   cd BrainBolt
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   GOOGLE_API_KEY=your_google_api_key
   DATABASE_URL=postgresql://username:password@host:port/database
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   AUTH_SECRET=your_auth_secret_key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How It Works

1. **📤 Upload**: Drop your PDF file into the upload zone
2. **🔄 Process**: Brain Bolt extracts and analyzes the content using LangChain
3. **🧠 Generate**: AI creates relevant quiz questions based on the material
4. **📝 Take Quiz**: Answer questions in an interactive, timed environment
5. **📊 Review**: Get instant feedback and track your performance

## 🌟 Use Cases

- **📚 Students**: Convert textbook chapters into practice quizzes
- **👨‍🏫 Educators**: Create assessments from course materials
- **🏢 Professionals**: Generate training quizzes from documentation
- **📖 Researchers**: Test comprehension of academic papers
- **🎓 Self-learners**: Transform any learning material into interactive content

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **LangChain** for powerful document processing capabilities
- **Supabase** for seamless backend infrastructure
- **Vercel** for hosting and deployment
- **shadcn/ui** for beautiful UI components
- **OpenAI** for AI-powered question generation

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/malayashekhar/BrainBolt/issues)
- **Developer**: [@malayashekhar](https://github.com/malayashekhar)

---

<div align="center">
  <h3>🌟 Star this repo if Brain Bolt helps you learn better!</h3>
  <p>Made with ❤️ for the learning community</p>
</div>

## 🚀 Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/malayashekhar/BrainBolt)

---

<div align="center">
  <strong>Brain Bolt - Empowering Learning Through AI</strong>
</div>
