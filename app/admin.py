from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, MathCourse

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Subject Permissions', {
            'fields': ('can_access_math', 'can_access_physics', 'can_access_science', 'can_access_history')
        }),
        ('Role & Additional Info', {
            'fields': ('is_teacher', 'phone_number', 'date_of_birth')
        }),
    )
    
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_teacher', 'can_access_math']
    list_filter = ['is_staff', 'is_superuser', 'is_teacher', 'can_access_math', 'can_access_physics', 'can_access_science', 'can_access_history']

@admin.register(MathCourse)
class MathCourseAdmin(admin.ModelAdmin):
    list_display = ['video_title', 'name_of_course', 'name_of_chapter', 'created_by', 'is_active', 'created_at']
    list_filter = ['name_of_course', 'name_of_chapter', 'is_active', 'created_by']
    search_fields = ['video_title', 'name_of_course', 'name_of_chapter']
    ordering = ['name_of_course', 'name_of_chapter', 'order']

admin.site.register(CustomUser, CustomUserAdmin)