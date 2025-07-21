from django.contrib.auth.models import AbstractUser
from django.db import models

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



