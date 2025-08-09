# TuTrabajoJusto - Transparent Job Platform

## 🎯 Project Overview

**TuTrabajoJusto** is a modern, full-stack job platform designed to revolutionize the hiring process by connecting job seekers with **validated companies** offering **transparent salaries** and using **structured profiles** instead of traditional CVs.

## 🚀 Live Demo

**🌐 Visit the live application:** [https://tutrabajojusto.ddns.net/](https://tutrabajojusto.ddns.net/)

Experience the full application with real features including:
- ✅ Job posting creation and management
- ✅ User registration and profiles
- ✅ Job search and filtering
- ✅ Application system
- ✅ Company validation process
- ✅ Admin panel functionality

## 🏗️ Architecture & Tech Stack

**Backend:**
- **Framework:** Laravel 12.x (Latest)
- **Database:** PostgreSQL with optimized queries
- **Authentication:** Session-based with CSRF protection
- **API:** RESTful with Inertia.js for SPA experience
- **Testing:** Pest PHP with comprehensive test coverage
- **Code Quality:** PHPStan, Laravel Pint, ESLint

**Frontend:**
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Inertia.js for seamless SPA
- **Animations:** Framer Motion
- **Testing:** Playwright for E2E testing

**DevOps & Tools:**
- **Package Manager:** Composer + npm
- **Build Tool:** Vite for fast development
- **Code Quality:** Prettier, ESLint, PHPStan
- **Testing:** Pest PHP, Playwright
- **CI/CD:** Ready for GitHub Actions

## 🚀 Key Features

### For Job Seekers
- ✅ **Structured Profiles:** No more CV uploads - create once, apply everywhere
- ✅ **Transparent Salaries:** Every job posting shows exact salary ranges
- ✅ **One-Click Applications:** Apply with structured profile instantly
- ✅ **Advanced Search:** Filter by salary, location, work type, keywords
- ✅ **Application Tracking:** Real-time status updates
- ✅ **Company Reviews:** Public reviews and star ratings for companies
- ✅ **Notification Control:** Customize notification settings instantly

### For Companies
- ✅ **Company Validation:** Verified companies only for quality assurance
- ✅ **Structured Job Postings:** Comprehensive job creation with salary transparency
- ✅ **Applicant Management:** View and manage applications with status updates
- ✅ **Analytics Dashboard:** Track application metrics and performance
- ✅ **Penalty System:** Penalties for ghosting or not providing feedback

### Platform Features
- ✅ **Multi-language Support:** Internationalization ready
- ✅ **Responsive Design:** Mobile-first approach
- ✅ **Real-time Notifications:** Email and in-app notifications
- ✅ **Admin Panel:** Company validation and platform management
- ✅ **SEO Optimized:** Public job listings with meta tags

## 🏗️ Project Structure

```
tutrabajojusto-platform/
├── app/
│   ├── Http/Controllers/     # RESTful controllers
│   ├── Models/              # Eloquent models with relationships
│   ├── Policies/            # Authorization policies
│   └── Providers/           # Service providers
├── resources/
│   ├── js/
│   │   ├── Components/      # Reusable React components
│   │   ├── Pages/          # Inertia.js page components
│   │   ├── Layouts/        # Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript type definitions
│   └── css/                # Global styles
├── tests/
│   ├── Feature/            # Feature tests
│   ├── Unit/              # Unit tests
│   └── Browser/           # Browser tests
├── database/
│   ├── migrations/        # Database migrations
│   ├── seeders/          # Database seeders
│   └── factories/        # Model factories
└── routes/
    ├── web.php           # Web routes
    └── auth.php          # Authentication routes
```



## 🏗️ Project Structure

```
tutrabajojusto-platform/
├── app/
│   ├── Http/Controllers/     # RESTful controllers
│   ├── Models/              # Eloquent models with relationships
│   ├── Policies/            # Authorization policies
│   └── Providers/           # Service providers
├── resources/
│   ├── js/
│   │   ├── Components/      # Reusable React components
│   │   ├── Pages/          # Inertia.js page components
│   │   ├── Layouts/        # Layout components
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript type definitions
│   └── css/                # Global styles
├── tests/
│   ├── Feature/            # Feature tests
│   ├── Unit/              # Unit tests
│   └── Browser/           # Browser tests
├── database/
│   ├── migrations/        # Database migrations
│   ├── seeders/          # Database seeders
│   └── factories/        # Model factories
└── routes/
    ├── web.php           # Web routes
    └── auth.php          # Authentication routes
```

This application is deployed using **Laravel Forge** on a **VPS** for optimal performance and cost-effectiveness.

### Code Standards
- **PHP:** PSR-12 with Laravel Pint
- **JavaScript/TypeScript:** ESLint + Prettier
- **Git:** Conventional commits
- **Testing:** TDD approach with high coverage

### Git Workflow
```bash
# Feature branch workflow
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create PR for review
```

## 📊 Performance & Optimization

### Backend Optimizations
- ✅ **Database Indexing:** Optimized queries with proper indexes
- ✅ **Eager Loading:** Prevents N+1 queries
- ✅ **Caching:** Redis for session, cache, and queues
- ✅ **Queue Jobs:** Background processing for heavy tasks
- ✅ **API Rate Limiting:** Protected endpoints

### Frontend Optimizations
- ✅ **Code Splitting:** Lazy loading for better performance
- ✅ **Image Optimization:** WebP support with fallbacks
- ✅ **Bundle Optimization:** Vite for fast builds
- ✅ **SEO:** Meta tags and structured data
- ✅ **Accessibility:** WCAG 2.1 compliant

## 🔒 Security Features

- ✅ **CSRF Protection:** Laravel's built-in CSRF tokens
- ✅ **SQL Injection Prevention:** Eloquent ORM with prepared statements
- ✅ **XSS Protection:** Input sanitization and output escaping
- ✅ **Authentication:** Secure password hashing with bcrypt
- ✅ **Authorization:** Role-based access control (RBAC)
- ✅ **Rate Limiting:** API and form submission protection
- ✅ **HTTPS:** SSL/TLS encryption (production)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Roadmap

### Phase 2 Features (After-MVP)

#### 🎯 Core Problem Solutions
- **Fake/Dead-End Job Offers Detection**
  - Automatic penalties for companies if applicants don't progress within timeframe
  - Applicant compensation/tokens for wasted time
  - Real-time job offer validation

- **Feedback System**
  - Mandatory feedback from companies within specified timeframe
  - Penalties for ghosting applicants
  - Transparent communication tracking

#### 🤖 AI-Powered Features
- **AI Career Advisor:** Personalized career suggestions based on skills and background
- **AI Interview Trainer:** Practice smart, stress-free interviews
- **AI CV Translation:** Automatic CV translation for international opportunities
- **AI Notification Filtering:** Smart notification management

#### 📊 Analytics & Insights
- **Useful Statistics:** Real ratio of job offers vs applicants by field/language
- **Digital Company Trophies:** Monthly recognition for top-rated companies
- **Performance Metrics:** Company response times and applicant satisfaction

#### 🎥 Enhanced Profiles
- **Intro Videos:** Job seekers can upload multiple short intro videos
- **Diploma Validation:** Users can add "título" with scanned diploma validation
  - Unvalidated until diploma is uploaded
  - Companies can see validation status
  - Prevents time waste on unqualified candidates

#### 🌍 Holistic Resources
- **Legal Resources:** Labor laws explained simply, emergency contacts, official support platforms
- **Well-being Support:** Resources for mental clarity and job search alignment
- **Social Responsibility:** Regulations, sustainable finance, social impact, subsidies, scholarships

#### 🔍 Advanced Features
- **Future Jobs:** Apply to positions with future start dates
- **Red Flags Review System:** Users can add reviews with red flags
- **Random Application Reviews:** Internal team randomly applies to offers for quality control
- **External Link Prevention:** Don't allow links to external sites

#### 🎯 Social Impact
- **Human Values:** Resources for humans, not just job seekers
- **Community Building:** Social media engagement and company blacklisting (with proof)
- **Sustainable Practices:** Focus on responsible and sustainable job offers

---

**Built with ❤️ using Laravel, React, and TypeScript**
