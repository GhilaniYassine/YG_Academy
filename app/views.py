from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password
from django.core.exceptions import PermissionDenied
from django.contrib import messages
from django.db.models import Q
from django.urls import reverse_lazy
from django.contrib.auth.views import PasswordResetView
from django.contrib.messages.views import SuccessMessageMixin
from .models import CustomUser, MathCourse

# Custom decorator to check if user is a teacher
def teacher_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_teacher:
            messages.error(request, 'You need to be a teacher to access this page.')
            return redirect('home')  # Updated redirect to 'home'
        return view_func(request, *args, **kwargs)
    return _wrapped_view

# Add this missing view
def access_denied(request):
    """View for when non-teachers try to access teacher-only content"""
    context = {
        'message': 'You need teacher privileges to access this page.',
        'user': request.user,
    }
    return render(request, 'access_denied.html', context)

# Create your views here.
def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'About.html')

def content(request):
    return render(request, 'content.html')

def teachers(request):  # Changed from 'Teachers' to 'teachers'
    return render(request, 'Teachers.html')

def contact(request):
    return render(request, 'Contact.html')

def login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'login.html', {'error': 'Identifiants invalides.'})

    return render(request, 'login.html')

def register(request):  # Added this function
    return render(request, 'register.html')

@login_required(login_url='login')
def dashboard(request):
    if request.user.is_teacher:
        # Redirect teachers to teacher dashboard
        return redirect('teacher_dashboard')  # Fixed: changed from 'its_teacher' to 'teacher_dashboard'
    else:
        # Regular student dashboard
        context = {
            'user': request.user,
        }
        return render(request, 'dashboard.html', context)

@login_required(login_url='login')
def HomePage(request):
    return render(request,'dashboard.html')

def SignupPage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        if pass1 != pass2:
            return render(request, 'signup.html', {'error': 'Les mots de passe ne correspondent pas.'})
        else:
            # Check if the user already exists
            if CustomUser.objects.filter(username=username).exists():
                return render(request, 'signup.html', {'error': 'Nom d\'utilisateur déjà pris.'})
            
            # Check if email already exists
            if CustomUser.objects.filter(email=email).exists():
                return render(request, 'signup.html', {'error': 'Cet email est déjà utilisé.'})
            
            try:
                # Create user with custom model - NEW USERS ARE NOT TEACHERS BY DEFAULT
                user = CustomUser.objects.create_user(
                    username=username, 
                    email=email, 
                    password=pass1,
                    # Set default subject access (you can customize this)
                    can_access_math=False,
                    can_access_physics=False,
                    can_access_science=False,
                    can_access_history=False,
                    # Ensure new users are NOT teachers by default
                    is_teacher=False
                )
                
                # Pass success=True to trigger the success message
                return render(request, 'signup.html', {'success': True})
                
            except Exception as e:
                return render(request, 'signup.html', {'error': 'Une erreur est survenue lors de la création du compte.'})

    return render(request, 'signup.html')

def signup_view(request):
    if request.method == 'POST':
        # Get form data
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')
        
        # Server-side validation
        if user.objects.filter(username=username).exists():
            return render(request, 'signup.html', {
                'error': 'Username is already taken. Please choose a different username.'
            })
        
        if user.objects.filter(email=email).exists():
            return render(request, 'signup.html', {
                'error': 'Email is already registered. Please use a different email address.'
            })
        
        if password1 != password2:
            return render(request, 'signup.html', {
                'error': 'Passwords do not match. Please try again.'
            })
        
        # Additional password validation if needed
        if len(password1) < 8:
            return render(request, 'signup.html', {
                'error': 'Password must be at least 8 characters long.'
            })
        
        try:
            # Create user in database
            user = user.objects.create_user(
                username=username,
                email=email,
                password=password1
            )
            
            # User successfully created - show success message
            return render(request, 'signup.html', {
                'success': True
            })
            
        except Exception as e:
            return render(request, 'signup.html', {
                'error': 'An error occurred during registration. Please try again.'
            })
    
    # GET request - show empty form
    return render(request, 'signup.html')

def logoutpage(request):
    logout(request)
    return redirect('login')

def forgetpassword(request):
    return render(request,'forgetpassword.html')

# Custom decorator to check subject access
def subject_required(subject_field):
    def decorator(view_func):
        def wrapper(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return redirect('login')
            
            if not getattr(request.user, subject_field, False):
                # Get subject name from the field
                subject_name = subject_field.replace('can_access_', '')
                return redirect('subject_unavailable', subject_name=subject_name)
            
            return view_func(request, *args, **kwargs)
        return wrapper
    return decorator

# Updated math view with custom permission check
@login_required(login_url='login')
def math(request):
    """Display math courses for students"""
    if not request.user.can_access_math:
        messages.error(request, 'You do not have access to Math courses. Please contact your teacher.')
        return redirect('subject_unavailable', subject_name='Math')
    
    # Get all active math courses organized by course and chapter
    math_videos = MathCourse.objects.filter(is_active=True).order_by('name_of_course', 'name_of_chapter', 'order')
    
    # Organize videos by course and chapter
    organized_videos = {}
    for video in math_videos:
        course_name = video.name_of_course
        chapter_name = video.name_of_chapter
        
        if course_name not in organized_videos:
            organized_videos[course_name] = {}
        
        if chapter_name not in organized_videos[course_name]:
            organized_videos[course_name][chapter_name] = []
        
        organized_videos[course_name][chapter_name].append(video)
    
    context = {
        'organized_videos': organized_videos,
        'subject': 'Mathematics'
    }
    return render(request, 'math.html', context)

@login_required
def math_courses(request):
    """Display math courses for students"""
    if not request.user.can_access_math:
        messages.error(request, 'You do not have access to Math courses. Please contact your teacher.')
        return redirect('dashboard')
    
    # Get all math courses organized by course and chapter
    math_videos = MathCourse.objects.filter(is_active=True).order_by('name_of_course', 'name_of_chapter', 'order')
    
    # Organize videos by course and chapter
    organized_videos = {}
    for video in math_videos:
        course_name = video.name_of_course
        chapter_name = video.name_of_chapter
        
        if course_name not in organized_videos:
            organized_videos[course_name] = {}
        
        if chapter_name not in organized_videos[course_name]:
            organized_videos[course_name][chapter_name] = []
        
        organized_videos[course_name][chapter_name].append(video)
    
    context = {
        'organized_videos': organized_videos,
        'subject': 'Mathematics'
    }
    return render(request, 'math_courses.html', context)

@login_required
@teacher_required
def manage_math_videos(request):
    """Allow teachers to manage math videos"""
    if request.method == 'POST':
        # Handle video addition
        course_name = request.POST.get('course_name')
        chapter_name = request.POST.get('chapter_name')
        video_title = request.POST.get('video_title')
        video_url = request.POST.get('video_url')
        video_duration = request.POST.get('video_duration')
        description = request.POST.get('description')
        order = request.POST.get('order', 0)
        
        try:
            MathCourse.objects.create(
                name_of_course=course_name,
                name_of_chapter=chapter_name,
                video_title=video_title,
                video_url=video_url,
                video_duration=video_duration,
                description=description,
                order=int(order) if order else 0,
                created_by=request.user
            )
            messages.success(request, 'Math video added successfully!')
        except Exception as e:
            messages.error(request, 'Failed to add video. Please try again.')
        
        return redirect('manage_math_videos')
    
    # GET request - show form and existing videos
    math_videos = MathCourse.objects.filter(created_by=request.user).order_by('name_of_course', 'name_of_chapter', 'order')
    
    context = {
        'math_videos': math_videos
    }
    return render(request, 'teacher_dashboard.html', context)

@login_required
@teacher_required
def delete_math_video(request, video_id):
    """Allow teachers to delete math videos"""
    video = get_object_or_404(MathCourse, id=video_id, created_by=request.user)
    video.delete()
    messages.success(request, 'Video deleted successfully!')
    return redirect('manage_math_videos')

@login_required
def watch_video(request, video_id):
    """Display video player for students"""
    video = get_object_or_404(MathCourse, id=video_id, is_active=True)
    
    # Check if user has access to math
    if not request.user.can_access_math:
        messages.error(request, 'You do not have access to this video.')
        return redirect('dashboard')
    
    context = {
        'video': video
    }
    return render(request, 'watch_video.html', context)

# Add views for other subjects
@login_required(login_url='login')
@subject_required('can_access_english')
def english(request):  # Fixed: changed from physics to english
    return render(request, 'english.html')

@login_required(login_url='login')
@subject_required('can_access_science')
def science(request):
    return render(request, 'science.html')

@login_required(login_url='login')
@subject_required('can_access_history')
def history(request):
    return render(request, 'history.html')

@login_required(login_url='login')
@subject_required('can_access_physics')
def physics(request):
    return render(request, 'physics.html')

# Add the subject unavailable view
@login_required(login_url='login')
def subject_unavailable(request, subject_name):
    context = {
        'user': request.user,
        'subject_name': subject_name,
    }
    return render(request, 'subject_unavailable.html', context)

# Teacher-only views - only teachers can access these
@login_required(login_url='login')
@teacher_required
def teacher_dashboard(request):
    """Main teacher dashboard"""
    return render(request, 'teacher_dashboard.html')

@login_required(login_url='login')
@teacher_required
def manage_students(request):
    """Allow teachers to manage student subject access"""
    students = CustomUser.objects.filter(is_teacher=False)
    context = {
        'students': students,
    }
    return render(request, 'manage_students.html', context)

@login_required(login_url='login')
@teacher_required
def update_student_access(request, student_id):
    """Allow teachers to update student subject access"""
    if request.method == 'POST':
        try:
            student = CustomUser.objects.get(id=student_id, is_teacher=False)
            
            # Update subject access based on form data
            student.can_access_math = 'can_access_math' in request.POST
            student.can_access_physics = 'can_access_physics' in request.POST
            student.can_access_science = 'can_access_science' in request.POST
            student.can_access_history = 'can_access_history' in request.POST
            
            student.save()
            
            return redirect('manage_students')
        except CustomUser.DoesNotExist:
            return redirect('manage_students')
    
    return redirect('manage_students')

class ResetPasswordView(SuccessMessageMixin, PasswordResetView):
    template_name = 'forgetpassword.html'
    email_template_name = 'password_reset_email.html'
    subject_template_name = 'password_reset_subject.txt'
    success_message = "We've emailed you instructions for setting your password, " \
                      "if an account exists with the email you entered. You should receive them shortly." \
                      " If you don't receive an email, " \
                      "please make sure you've entered the address you registered with, and check your spam folder."
    success_url = reverse_lazy('home')

def custom_404_view(request, exception):
    return render(request, '404.html', status=404)
