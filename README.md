# Lin Hua Chung - Frontend Developer Portfolio

A modern, responsive portfolio website built with Next.js 14, showcasing my work as a Frontend Developer with 3+ years of experience in ReactJS, NextJS, and modern web technologies.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Components**: Engaging UI elements with Framer Motion
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Detailed project portfolio with case studies
- **Resume Section**: Comprehensive experience and education overview
- **Admin Panel**: Content management system for portfolio updates
- **Performance Optimized**: Fast loading times and SEO-friendly

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: MUI with Emotion styled components (theme in `src/shared/theme`)
- **Forms**: React Hook Form + Yup
- **Database**: Prisma with MongoDB
- **Email**: Resend
- **Authentication**: HS256 tokens in httpOnly cookies, verified in middleware and in each admin route

## 📁 Project Structure

Code is organised by feature. Each feature owns its UI, hooks, client API calls and server logic.

```
src/
├── app/                    # Routes only: thin page.jsx, layouts, API route handlers
├── features/
│   ├── <feature>/
│   │   ├── components/<Name>/   # <Name>.jsx, optional <Name>.styles.js, index.js
│   │   ├── hooks/<useName>/     # useName.js, index.js
│   │   ├── api/                 # client calls to the API routes
│   │   ├── server/              # server-only logic; server/index.js is the entry point
│   │   ├── constants/ schemas/ styles/ utils/
│   ├── admin-shell   auth   dashboard   inbox   profile   content-studio
│   └── portfolio   contact   analytics   uploads
├── shared/                 # Used by several features; must stay client-safe
│   ├── components/         # Toast, Loader, form/<Field>/
│   ├── hooks/  providers/  theme/  api/ (http client)  constants/  utils/  assets/
├── server/                 # Server infrastructure: db, http, email, security, utils
├── content/                # Static portfolio content (public-content.js)
└── middleware.js
prisma/  tests/  public/
```

Rules:

- `src/app` files only wire routes; a page re-exports a feature component.
- Inside one feature or shared module, import with relative paths. Across modules, use `@/` (maps to `src/`).
- Components, hooks, `api/` and `shared/` never import `server/` code. ESLint enforces this (`no-restricted-imports`).
- Modules covered by `npm test` (Node's test runner) use relative imports only, because Node does not resolve `@/`.

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chung-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your configuration values
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

- **Home**: Introduction and overview
- **Services**: Professional services offered
- **Work**: Project portfolio and case studies
- **Resume**: Experience, education, and skills
- **Contact**: Contact form and information
- **Admin**: Content management panel

## 🎨 Customization

The portfolio is designed to be easily customizable:

- Update profile, experience, projects and education in `src/content/public-content.js`
- Customize colors and typography in `src/shared/theme/createAppTheme.js`
- Add a feature under `src/features/<name>/` following the structure above

## 📧 Contact

- **Email**: chunglh1304@gmail.com
- **Phone**: (+84) 849966 277
- **Location**: Ho Chi Minh City, Vietnam
- **LinkedIn**: [Lin Hua Chung](https://www.linkedin.com/in/lin-hua-chung/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Lin Hua Chung
