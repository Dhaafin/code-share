# 🚀 CodeShare — Premium Snippet Studio

CodeShare is a high-end web application designed for developers to create, style, and export beautiful code snippets. Inspired by Apple's minimalist aesthetic, it combines advanced syntax highlighting with modern web design patterns.

## 🛠️ Technical Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Syntax Highlighting**: [Shiki](https://shiki.style/) (The VS Code highlighting engine)
- **Image Generation**: [html-to-image](https://github.com/bubkoo/html-to-image)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## ✨ Key Technical Features

### 1. High-Fidelity Syntax Highlighting
The application utilizes **Shiki** to provide VS Code-level syntax highlighting accuracy. 
- **Real-time Rendering**: Code is highlighted dynamically as the user types using a client-side `useEffect` hook.
- **Language Support**: Native support for JavaScript, Python, and CSS (extensible).
- **Adaptive Themes**: Context-aware switching between `github-dark` and `github-light` based on the studio's background settings.

### 2. Apple-Style Design System
- **Glassmorphism**: Leverages `backdrop-filter: blur(20px)` and semi-transparent backgrounds to create a premium "frosted glass" effect.
- **Mesh Gradients**: Custom CSS-animated mesh gradients (`bg-mesh-1`, `bg-mesh-2`, etc.) that provide a dynamic, modern backdrop for code.
- **Custom Scrollbars**: Minimalist, dark-themed scrollbars for both the web interface and the code viewer, ensuring a cohesive dark-mode experience.

### 3. Responsive "Studio" Layout
- **Adaptive Viewports**: The app features a fluid layout that transforms from a wide desktop studio to an ergonomic vertical stack on mobile.
- **Scaling Logic**: The code preview padding scales dynamically using CSS `min()` functions and viewport units (e.g., `10vw`) to ensure high-padding windows don't break on narrow screens.
- **Line Wrapping**: Smart `pre-wrap` and `break-word` implementation prevents horizontal overflow, keeping code centered and readable.

### 4. Professional-Grade Export
- **4x Resolution**: PNG exports are rendered at a **4x pixel ratio** using `html-to-image`, ensuring snippets remain crystal clear even on 4K displays or high-density social media feeds.
- **Pixel-Perfect Canvas**: The export system captures the exact CSS state, including complex shadows, gradients, and fonts.

## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/your-repo/code-screenshot.git
cd code-screenshot
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating.

## 📁 Component Architecture

- **`Sidebar.jsx`**: The command center. Manages state for themes, languages, and layout padding.
- **`CodeWindow.jsx`**: The rendering engine. Handles Shiki integration, glassmorphism logic, and responsive alignment.
- **`TrafficLights.jsx`**: A reusable atom providing the iconic macOS window control look.
- **`page.jsx`**: The layout orchestrator. Manages global state and responsive container logic.

---

Built with ❤️ for the developer community.
