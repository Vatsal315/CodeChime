# 🚀 CodeCast - Real-time Code Collaboration Platform

[![CodeChime](https://img.shields.io/badge/CodeCast-Premium%20Design-blue?style=for-the-badge&logo=code&logoColor=white)](https://codecast.vercel.app)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.0.0-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.0.0-010101?style=flat-square&logo=socket.io)](https://socket.io/)

> **CodeCast** is a premium, real-time code collaboration platform that enables developers to code together seamlessly. Built with modern technologies and featuring a beautiful, recruiter-worthy interface.

## ✨ Features

### 🚀 **Core Functionality**
- **Real-time Code Collaboration** - Multiple users can code together simultaneously
- **Instant Synchronization** - Changes appear in real-time across all connected clients
- **Multi-language Support** - 15+ programming languages including Python, Java, C++, JavaScript, and more
- **Live Code Execution** - Run and test code instantly with integrated compiler
- **Room Management** - Create or join collaboration rooms with unique IDs

### 🎨 **Premium Design**
- **Dark Theme** - Professional dark interface with custom color palette
- **Glass Morphism** - Modern glass effects and smooth animations
- **Responsive Layout** - Optimized for all device sizes
- **Custom Typography** - Inter and JetBrains Mono fonts for optimal readability
- **Smooth Animations** - Fade-in, slide-in, and floating animations

### 💻 **Developer Experience**
- **CodeMirror Editor** - Advanced code editor with syntax highlighting
- **Keyboard Shortcuts** - Ctrl+Space (autocomplete), Ctrl+/ (comment), F11 (fullscreen)
- **Active Line Highlighting** - Visual feedback for current editing position
- **Bracket Matching** - Automatic bracket and tag completion
- **Status Indicators** - Real-time connection and compilation status

## **Live Image**
<img width="1870" height="1644" alt="image" src="https://github.com/user-attachments/assets/45a45d28-c678-4099-98f1-76d9b559414a" />
<img width="1512" height="832" alt="Screenshot 2025-08-24 at 7 05 20 PM" src="https://github.com/user-attachments/assets/af0160fb-6926-4049-8a20-3d995d1f79e6" />




## 🛠️ Technologies Used

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **Socket.IO Client** - Real-time communication
- **CodeMirror** - Professional code editor
- **Bootstrap 5** - Responsive UI framework
- **Custom CSS** - Premium design system with CSS variables

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **JDoodle API** - Multi-language code compilation
- **Axios** - HTTP client for API requests

### **Development Tools**
- **Nodemon** - Auto-restart server during development
- **React Scripts** - Create React App build tools
- **ESLint** - Code quality and consistency


**📱 Features to Try:**
1. Create a new room or join an existing one
2. Invite friends by sharing the room ID
3. Write code in real-time together
4. Run code in multiple programming languages
5. Experience the premium dark theme interface

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ (or Node.js 20+ with OpenSSL legacy provider)
- npm or yarn package manager
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/codecast.git
cd codecast
```

### **2. Install Dependencies**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### **3. Environment Configuration**
Create `.env` files in both `server/` and `client/` directories:

**Server (.env)**
```env
PORT=5001
JDoodle_clientId=your_jdoodle_client_id
JDoodle_clientSecret=your_jdoodle_client_secret
```

**Client (.env)**
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

### **4. Get JDoodle API Credentials**
1. Sign up at [https://www.jdoodle.com/compiler-api/](https://www.jdoodle.com/compiler-api/)
2. Get your free API credentials
3. Update the `server/.env` file

### **5. Start Development Servers**
```bash
# Terminal 1: Start backend server
cd server
npm start

# Terminal 2: Start frontend (with OpenSSL fix for Node.js 20+)
cd client
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

**🌐 Access the application at:** [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### **Vercel Deployment (Frontend)**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy from Client Directory**
```bash
cd client
vercel
```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set build command: `NODE_OPTIONS="--openssl-legacy-provider" npm run build`
   - Set output directory: `build`
   - Deploy!

### **Alternative: Vercel Dashboard**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `NODE_OPTIONS="--openssl-legacy-provider" npm run build`
4. Set output directory: `build`
5. Deploy!

### **Backend Deployment Options**
- **Render** - Free Node.js hosting
- **Railway** - Easy deployment platform
- **Heroku** - Traditional hosting (requires credit card)
- **DigitalOcean** - VPS hosting

## 🔧 Configuration

### **Environment Variables**
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `5001` |
| `JDoodle_clientId` | JDoodle API client ID | Required |
| `JDoodle_clientSecret` | JDoodle API client secret | Required |
| `REACT_APP_BACKEND_URL` | Backend API URL | `http://localhost:5001` |

### **Supported Programming Languages**
- **Python 3** 🐍
- **Java** ☕
- **C++** ⚙️
- **Node.js** 🟢
- **C** 🔷
- **Ruby** 💎
- **Go** 🐹
- **Scala** 🔴
- **Bash** 🖥️
- **SQL** 🗄️
- **Pascal** 📐
- **C#** 🟦
- **PHP** 🐘
- **Swift** 🦉
- **Rust** 🦀
- **R** 📊

## 📱 Usage Guide

### **Getting Started**
1. **Open the application** in your browser
2. **Create a room** or **join existing** using room ID
3. **Enter your username** for identification
4. **Start coding** in the collaborative editor

### **Collaboration Features**
- **Real-time sync** - See changes as they happen
- **User presence** - Know who's online in the room
- **Room sharing** - Copy room ID to invite others
- **Language switching** - Change programming language on the fly

### **Code Execution**
1. **Write code** in your preferred language
2. **Select language** from the dropdown
3. **Click "Run Code"** button
4. **View output** in the console panel
5. **Share results** with your team

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Code Style**
- Follow existing code formatting
- Add comments for complex logic
- Test your changes locally
- Ensure no console errors

## 🐛 Troubleshooting

### **Common Issues**

#### **Build Errors (Node.js 20+)**
```bash
# Use OpenSSL legacy provider
NODE_OPTIONS="--openssl-legacy-provider" npm run build
```

#### **Code Compilation Not Working**
- Check JDoodle API credentials in `.env`
- Verify backend server is running
- Check browser console for errors

#### **Real-time Sync Issues**
- Ensure Socket.IO connection is established
- Check network connectivity
- Verify room ID is correct

#### **Port Conflicts**
- Change `PORT` in server `.env` file
- Update `REACT_APP_BACKEND_URL` in client `.env`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **JDoodle** for providing the code compilation API
- **CodeMirror** for the excellent code editor
- **Socket.IO** for real-time communication
- **React** team for the amazing framework
- **Bootstrap** for the responsive UI components




</div>
