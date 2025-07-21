from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),  # Added trailing slash
    path('about/', views.about, name='about'),  # Added trailing slash
    path('teachers/', views.teachers, name='teachers'),  # Added trailing slash
    path('contact/', views.contact, name='contact'),
    path('content/', views.content, name='content'),  # Added trailing slash
    path('login/', views.login, name='login'),  # Added trailing slash
    path('register/', views.register, name='register'),  # Added trailing slash
    path('signup/', views.SignupPage, name='signup'),  # Added trailing slash
    path('forget', views.forgetpassword, name='forget'),
    path('math/', views.math, name='math'),
    path('physics/', views.physics, name='physics'),  # Changed from english to physics
    path('science/', views.science, name='science'),
    path('history/', views.history, name='history'),
    path('subject-unavailable/<str:subject_name>/', views.subject_unavailable, name='subject_unavailable'),
    path('teacher-dashboard/', views.manage_math_videos, name='teacher_dashboard'),
    path('manage-students/', views.manage_students, name='manage_students'),
    path('update-student-access/<int:student_id>/', views.update_student_access, name='update_student_access'),

    # Math course URLs
    path('math-courses/', views.math_courses, name='math_courses'),
    path('manage-math-videos/', views.manage_math_videos, name='manage_math_videos'),
    path('delete-math-video/<int:video_id>/', views.delete_math_video, name='delete_math_video'),
    path('watch-video/<int:video_id>/', views.watch_video, name='watch_video'),

    # Password Reset URLs
    path('password-reset/', views.ResetPasswordView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),
         name='password_reset_complete'),
]