# 🎓 YG Academy

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![AI Powered](https://img.shields.io/badge/AI_Powered-Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> A modern Django-based academy management system with AI-powered quiz generation - A comprehensive learning platform that combines traditional education management with cutting-edge artificial intelligence.

![YG Academy Banner](img/1.png)

## 🚀 Project Overview

YG Academy is a comprehensive educational management platform built with Django that integrates advanced AI capabilities for personalized learning. This project serves as both a robust academy management system and a showcase of innovative educational technology, featuring AI-powered quiz generation from PDF documents.

## 📸 Screenshots

### Dashboard Overview
![Dashboard](img/Screenshot from 2025-07-21 11-41-56.png)

### Student Management Interface
![Student Management](img/student-management.png)

### Course Management System
![Course Management](img/course-management.png)

### AI Quiz Assistant
![AI Quiz Home](img/ai-quiz-home.png)

### Quiz Generation Process
![Quiz Upload](img/quiz-upload.png)

## 🏢 Current Features & Functionality

### 🔐 Authentication System
- **User Registration** - Custom user registration with email validation
- **User Login/Logout** - Secure authentication system with session management
- **Password Reset** - Email-based password recovery with secure token verification
- **Role-Based Access** - Separate student and teacher accounts with granular permissions

### 👨‍🏫 Teacher Features
- **Teacher Dashboard** - Comprehensive teacher interface with management tools
- **Student Management** - View, manage, and monitor student accounts
- **Subject Access Control** - Grant/revoke student access to specific subjects (Math, Physics, Science, History)
- **Math Video Management** - Add, organize, edit, and delete math course videos
- **Course Organization** - Structure videos by course, chapter, and sequential ordering
- **Student Progress Tracking** - Monitor student quiz performance and learning analytics

### 👨‍🎓 Student Features
- **Student Dashboard** - Personalized student interface with subject access
- **Subject Access** - Access to Math, Physics, Science, History based on teacher permissions
- **Video Learning** - Watch educational videos with organized course structure
- **Subject-Specific Content** - Dedicated pages for each subject area
- **AI Quiz Assistant** - Advanced AI-powered quiz generation and testing system

### 📚 Course Management
- **Math Courses** - Complete math course system with video organization
- **Chapter Organization** - Videos organized by course and chapter hierarchy
- **Video Player** - Integrated video watching experience with progress tracking
- **Course Ordering** - Sequential organization of course content
- **Content Management** - Teacher-controlled content creation and management

### 🤖 AI Quiz Assistant (NEW!)
#### Core AI Features
- **PDF Upload & Processing** - Upload PDF documents for quiz generation
- **AI-Powered Question Generation** - Uses Google Gemini AI to create intelligent questions
- **Multiple Choice Questions** - Automatically generates 4-option multiple choice questions
- **Smart Content Analysis** - AI analyzes PDF content to create relevant, diverse questions
- **Customizable Quiz Length** - Choose from 5, 10, 15, or 20 questions per quiz

#### Quiz Generation Process
- **PDF Text Extraction** - Advanced PDF parsing using PyPDF2
- **Content Validation** - Ensures sufficient content for meaningful quiz generation
- **AI Processing** - Google Gemini 2.0 Flash model analyzes content and generates questions
- **Question Validation** - Automatic validation of generated questions and answers
- **Database Storage** - Secure storage of quizzes and user progress

#### Quiz Taking Experience
- **Interactive Interface** - Modern, responsive quiz-taking interface
- **Real-time Timer** - Built-in timer to track quiz completion time
- **Progress Tracking** - Visual progress indicators throughout the quiz
- **Answer Selection** - Intuitive radio button interface with visual feedback
- **Instant Validation** - Client-side validation before quiz submission

#### Results & Analytics
- **Detailed Results** - Comprehensive breakdown of quiz performance
- **Score Calculation** - Percentage-based scoring with detailed statistics
- **Answer Review** - Review correct/incorrect answers with explanations
- **Performance Metrics** - Time taken, accuracy rate, and question-by-question analysis
- **Progress History** - Complete history of all quiz attempts

#### Quiz Management
- **Quiz History** - View all previous quiz attempts with scores and dates
- **Retake Capability** - Ability to retake quizzes for improved scores
- **Custom Titles** - Personalized quiz titles for better organization
- **Content Preview** - Preview of PDF content used for quiz generation

### 🔒 Permission System
- **Subject-Based Access** - Granular control over subject access permissions
- **Teacher-Only Areas** - Protected teacher functionality and administrative tools
- **Access Control Decorators** - Secure page access based on user roles and permissions
- **Subject Unavailable Pages** - Proper handling and messaging for access restrictions
- **Dynamic Permission Updates** - Real-time permission updates by teachers

### 🌐 Website Navigation
- **Home Page** - Modern landing page with academy information
- **About Page** - Comprehensive information about the academy
- **Teachers Page** - Faculty information and profiles
- **Contact Page** - Contact information and communication channels
- **Content Page** - General content and announcements area

## 🛠️ Technology Stack

![Tech Stack](img/tech-stack.png)

### Backend Technologies
- **Django 4.x** - Web framework with advanced ORM capabilities
- **Python 3.8+** - Core programming language
- **SQLite/PostgreSQL** - Database management (SQLite for development, PostgreSQL production-ready)
- **Google Gemini AI** - Advanced AI model for quiz generation
- **PyPDF2** - PDF text extraction and processing
- **Python-dotenv** - Environment variable management

### Frontend Technologies
- **HTML5 & CSS3** - Modern web standards with responsive design
- **JavaScript ES6+** - Interactive functionality and AJAX requests
- **Bootstrap 5** - Responsive UI framework
- **Font Awesome** - Icon library for enhanced UI
- **Custom CSS** - Tailored styling for unique user experience

### AI & Machine Learning
- **Google Gemini 2.0 Flash** - Latest AI model for content analysis
- **Natural Language Processing** - Advanced text analysis and question generation
- **Content Understanding** - AI-powered content comprehension and question formulation

### Security & Authentication
- **Django Authentication** - Built-in user management with custom extensions
- **CSRF Protection** - Cross-site request forgery protection
- **Session Management** - Secure session handling and timeout
- **Permission-Based Access** - Role-based access control system

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- virtualenv (recommended for isolated environment)
- Google Gemini API key (for AI features)

### Environment Setup
```bash
# Clone the repository
git clone https://github.com/GhilaniYassine/YG_Academy.git
cd YG_Academy

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Environment Configuration
Create a `.env` file in the project root:
```env
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (optional)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Django Secret Key
SECRET_KEY=your_secret_key_here
```

### Database Setup
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### AI Features Setup
1. **Get Google Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

2. **Configure Media Settings**:
   - Ensure media directory exists for PDF uploads
   - Check file upload permissions

## 🐳 Docker (Containerized Run)

Build image:
```bash
docker build -t yg_academy:latest .
```

Run container (SQLite + static/media volumes):
```bash
docker run --rm \
  -p 8000:8000 \
  --env-file .env \
  -e DEBUG=False \
  -e SECRET_KEY=change_me_in_prod \
  -e ALLOWED_HOSTS=127.0.0.1,localhost \
  -v "$(pwd)"/media:/app/media \
  -v "$(pwd)"/staticfiles:/app/staticfiles \
  yg_academy:latest
```

Open: http://localhost:8000

Notes:
- WhiteNoise serves collected static files from /app/staticfiles.

## Troubleshooting: collectstatic MissingFileError
If build/run fails with:
- `whitenoise.storage.MissingFileError: The file 'images/...' could not be found ...`
Then one of your CSS files references an image that isn’t present in static sources.

Fix options:
- Add the missing files under:
  - `learn/static/images/Untitled-1.jpg`
  - `learn/static/images/6.jpg`
  - `learn/static/images/logotn.png`
- Or temporarily remove/disable those `background-image: url(...)` lines in `css/index.css` (already done in this repo).
- After adding assets, you can restore the URLs and rerun `collectstatic`.

## 📁 Project Structure

```
YG_Academy/
├── app/                           # Main application directory
│   ├── views.py                  # Application views and business logic
│   ├── models.py                 # Database models (User, Course, Quiz, QuizAttempt)
│   ├── services.py               # AI service layer (GeminiQuizService)
│   ├── urls.py                   # URL routing configuration
│   └── templates/                # Application-specific templates
│       └── ai_quiz/             # AI Quiz feature templates
│           ├── quiz_home.html   # AI Quiz dashboard
│           ├── upload_pdf.html  # PDF upload interface
│           ├── take_quiz.html   # Quiz taking interface
│           ├── quiz_results.html # Results display
│           └── quiz_history.html # Quiz history
├── templates/                    # Global HTML templates
├── static/                       # Static files
│   ├── css/                     # Stylesheets
│   │   ├── dashboard.css        # Main dashboard styles
│   │   └── ai_quiz.css          # AI Quiz specific styles
│   ├── js/                      # JavaScript files
│   └── images/                  # Image assets
├── media/                        # User uploaded files (PDFs)
├── learn/                        # Django project settings
│   ├── settings.py              # Configuration with AI integration
│   └── urls.py                  # Main URL configuration
├── requirements.txt              # Python dependencies including AI packages
├── .env                         # Environment variables (not in repo)
├── manage.py                    # Django management script
└── README.md                    # Project documentation
```

## 🎯 Implemented Features

### ✅ Completed Core Features
- [x] User authentication (login/logout/register)
- [x] Role-based access control (teachers vs students)
- [x] Teacher dashboard with student management
- [x] Subject-based permission system
- [x] Math course video management
- [x] Video organization by course and chapter
- [x] Student video watching interface
- [x] Password reset functionality
- [x] Custom user model with subject permissions
- [x] Protected views with decorators
- [x] Error handling (404, access denied)

### ✅ AI Quiz Features (NEW!)
- [x] PDF upload and text extraction
- [x] AI-powered quiz generation using Google Gemini
- [x] Multiple choice question creation
- [x] Interactive quiz taking interface
- [x] Real-time timer and progress tracking
- [x] Comprehensive results analysis
- [x] Quiz history and progress tracking
- [x] Score calculation and performance metrics
- [x] Question validation and error handling
- [x] Responsive design for all devices

### 🚧 Planned Features
- [ ] Advanced analytics dashboard for teachers
- [ ] Multiple question types (True/False, Fill-in-the-blank)
- [ ] Collaborative learning features
- [ ] Mobile app development
- [ ] Integration with Learning Management Systems (LMS)
- [ ] Advanced AI tutoring system
- [ ] Multimedia quiz content (images, audio, video)
- [ ] Peer-to-peer learning network

## 🔧 API Dependencies

### Required Python Packages
```txt
Django==5.0.6
google-generativeai==0.3.2
PyPDF2==3.0.1
python-dotenv==1.0.0
# ... other dependencies in requirements.txt
```

### External APIs
- **Google Gemini AI API** - For intelligent quiz generation
- **Email Services** - For password reset functionality

## 🎓 Usage Guide

### For Students
1. **Login** to your student account
2. **Access Subjects** based on teacher permissions
3. **Use AI Quiz Assistant**:
   - Click the AI Quiz button on dashboard
   - Upload a PDF document
   - Set quiz parameters (title, number of questions)
   - Take the generated quiz
   - Review results and explanations
   - Track progress in quiz history

### For Teachers
1. **Login** to your teacher account
2. **Manage Students** - Grant/revoke subject access
3. **Add Course Content** - Upload and organize video content
4. **Monitor Progress** - View student quiz performance
5. **Content Management** - Organize courses by subject and chapter

### AI Quiz Generation Process
1. **Upload PDF** - Select and upload educational PDF content
2. **AI Processing** - Gemini AI analyzes content and generates questions
3. **Quality Assurance** - System validates questions for completeness
4. **Quiz Creation** - Interactive quiz interface is generated
5. **Performance Tracking** - Results are stored for progress monitoring

## 🤝 Contributing

We welcome contributions to YG Academy! Here's how you can help:

### Development Contributions
- **Bug Reports** - Report issues with detailed reproduction steps
- **Feature Requests** - Suggest new educational features
- **Code Contributions** - Submit pull requests with improvements
- **AI Enhancements** - Improve quiz generation algorithms
- **UI/UX Improvements** - Enhance user interface and experience

### Educational Content
- **Course Materials** - Contribute educational video content
- **Quiz Templates** - Create standardized quiz formats
- **Learning Assessments** - Develop evaluation criteria

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Learning Journey & AI Innovation

This project represents a significant step forward in educational technology, combining traditional learning management with artificial intelligence. The AI Quiz Assistant demonstrates how modern AI can be integrated into educational platforms to create personalized, adaptive learning experiences.

### Technical Achievements
- **AI Integration** - Successfully integrated Google Gemini AI for content analysis
- **Real-time Processing** - Efficient PDF processing and question generation
- **Scalable Architecture** - Designed for future AI feature expansion
- **User Experience** - Intuitive interface for complex AI functionality

### Educational Impact
- **Personalized Learning** - AI adapts to individual learning materials
- **Instant Assessment** - Immediate feedback and performance analysis
- **Content Flexibility** - Works with any educational PDF content
- **Progress Tracking** - Comprehensive learning analytics

## 🆘 Support & Documentation

### Getting Help
- **Issues** - Report bugs on GitHub Issues
- **Documentation** - Comprehensive setup and usage guides
- **Community** - Join our educational technology discussions

### Performance Notes
- **PDF Processing** - Supports files up to 10MB for optimal performance
- **AI Response Time** - Quiz generation typically takes 10-30 seconds
- **Concurrent Users** - Optimized for multiple simultaneous users

## 🌟 Acknowledgments

- **Google AI** - For providing the Gemini AI platform
- **Django Community** - For the robust web framework
- **Open Source Contributors** - For various libraries and tools used

⭐ **Star this repository if you find it helpful for educational technology development!**

**Made with ❤️, 🤖 AI, and lots of ☕ by Yassine Ghilani**

---

*YG Academy - Where Traditional Education Meets Artificial Intelligence*
