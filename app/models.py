from django.contrib.auth.models import AbstractUser
from django.db import models
import json

class CustomUser(AbstractUser):
    # Add custom fields for subject access
    can_access_math = models.BooleanField(default=False, verbose_name="Can Access Math")
    can_access_physics = models.BooleanField(default=False, verbose_name="Can Access Physics")
    can_access_science = models.BooleanField(default=False, verbose_name="Can Access Science")
    can_access_history = models.BooleanField(default=False, verbose_name="Can Access History")
    
    # Teacher status
    is_teacher = models.BooleanField(default=False, verbose_name="Teacher Status")
    
    # You can add more fields as needed
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    
    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

class MathCourse(models.Model):
    name_of_course = models.CharField(max_length=200, verbose_name="Course Name")
    name_of_chapter = models.CharField(max_length=200, verbose_name="Chapter Name")
    video_title = models.CharField(max_length=200, verbose_name="Video Title")
    video_url = models.URLField(verbose_name="Video URL")
    video_duration = models.CharField(max_length=10, blank=True, help_text="Format: MM:SS")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0, help_text="Order within chapter")
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'is_teacher': True})
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['name_of_course', 'name_of_chapter', 'order']
        verbose_name = "Math Course Video"
        verbose_name_plural = "Math Course Videos"
    
    def __str__(self):
        return f"{self.name_of_course} - {self.name_of_chapter} - {self.video_title}"

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'is_teacher': False})
    pdf_content = models.TextField()  # Store extracted PDF text
    questions_data = models.TextField()  # Store JSON of questions and answers
    total_questions = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    
    def get_questions(self):
        """Parse JSON questions data"""
        try:
            return json.loads(self.questions_data)
        except:
            return []
    
    def set_questions(self, questions):
        """Store questions as JSON"""
        self.questions_data = json.dumps(questions)
        self.total_questions = len(questions)
    
    def __str__(self):
        return f"Quiz: {self.title} - {self.student.username}"

class QuizAttempt(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    answers = models.TextField()  # Store JSON of user answers
    score = models.FloatField(default=0.0)
    total_questions = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    completed_at = models.DateTimeField(auto_now_add=True)
    time_taken = models.IntegerField(default=0)  # in seconds
    
    def get_answers(self):
        """Parse JSON answers data"""
        try:
            return json.loads(self.answers)
        except:
            return {}
    
    def set_answers(self, answers):
        """Store answers as JSON"""
        self.answers = json.dumps(answers)
    
    def calculate_percentage(self):
        """Calculate percentage score"""
        if self.total_questions > 0:
            return round((self.correct_answers / self.total_questions) * 100, 1)
        return 0
    
    def __str__(self):
        return f"{self.student.username} - {self.quiz.title} - {self.score}%"



