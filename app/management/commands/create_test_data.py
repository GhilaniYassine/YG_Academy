from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from app.models import CustomUser, MathCourse

class Command(BaseCommand):
    help = 'Create test data for Math courses'

    def handle(self, *args, **options):
        self.stdout.write('Creating test data...')
        
        # First, create test teachers
        teachers_data = [
            {'username': 'teacher1', 'email': 'teacher1@example.com', 'first_name': 'John', 'last_name': 'Smith'},
            {'username': 'teacher2', 'email': 'teacher2@example.com', 'first_name': 'Jane', 'last_name': 'Johnson'},
            {'username': 'teacher3', 'email': 'teacher3@example.com', 'first_name': 'Mike', 'last_name': 'Brown'},
            {'username': 'teacher4', 'email': 'teacher4@example.com', 'first_name': 'Sarah', 'last_name': 'Davis'},
            {'username': 'teacher5', 'email': 'teacher5@example.com', 'first_name': 'David', 'last_name': 'Wilson'},
            {'username': 'teacher6', 'email': 'teacher6@example.com', 'first_name': 'Emily', 'last_name': 'Taylor'},
        ]
        
        teachers = []
        for i, teacher_data in enumerate(teachers_data):
            teacher, created = CustomUser.objects.get_or_create(
                username=teacher_data['username'],
                defaults={
                    'email': teacher_data['email'],
                    'first_name': teacher_data['first_name'],
                    'last_name': teacher_data['last_name'],
                    'is_teacher': True,
                    'can_access_math': True,
                    'can_access_physics': True,
                    'can_access_science': True,
                    'can_access_history': True,
                }
            )
            if created:
                teacher.set_password('password123')
                teacher.save()
                self.stdout.write(f'Created teacher: {teacher.username}')
            teachers.append(teacher)
        
        # Create test students
        students_data = [
            {'username': 'student1', 'email': 'student1@example.com', 'first_name': 'Alice', 'last_name': 'Anderson'},
            {'username': 'student2', 'email': 'student2@example.com', 'first_name': 'Bob', 'last_name': 'Baker'},
            {'username': 'student3', 'email': 'student3@example.com', 'first_name': 'Charlie', 'last_name': 'Clark'},
            {'username': 'student4', 'email': 'student4@example.com', 'first_name': 'Diana', 'last_name': 'Evans'},
            {'username': 'student5', 'email': 'student5@example.com', 'first_name': 'Frank', 'last_name': 'Garcia'},
        ]
        
        for student_data in students_data:
            student, created = CustomUser.objects.get_or_create(
                username=student_data['username'],
                defaults={
                    'email': student_data['email'],
                    'first_name': student_data['first_name'],
                    'last_name': student_data['last_name'],
                    'is_teacher': False,
                    'can_access_math': True,
                    'can_access_physics': True,
                    'can_access_science': False,
                    'can_access_history': False,
                }
            )
            if created:
                student.set_password('password123')
                student.save()
                self.stdout.write(f'Created student: {student.username}')
        
        # Now create math courses with real teacher references
        math_courses_data = [
            # Algebra Course
            {
                'name_of_course': 'Algebra',
                'name_of_chapter': 'Chapter 1: Introduction',
                'video_title': 'What is Algebra? Key Concepts',
                'video_url': 'https://www.youtube.com/watch?v=NybHckSEQBI',
                'video_duration': '10:05',
                'description': 'Overview of variables, constants, and basic operations.',
                'order': 1,
                'teacher_index': 0
            },
            {
                'name_of_course': 'Algebra',
                'name_of_chapter': 'Chapter 1: Introduction',
                'video_title': 'Solving Linear Equations',
                'video_url': 'https://www.youtube.com/watch?v=9RT-RNpOGfI',
                'video_duration': '15:30',
                'description': 'Step-by-step methods to solve single-variable linear equations.',
                'order': 2,
                'teacher_index': 0
            },
            {
                'name_of_course': 'Algebra',
                'name_of_chapter': 'Chapter 2: Quadratic Functions',
                'video_title': 'Graphing Parabolas',
                'video_url': 'https://www.youtube.com/watch?v=LPqzQdLyT8o',
                'video_duration': '12:45',
                'description': 'How to sketch parabolas by finding vertex, axis of symmetry, and intercepts.',
                'order': 1,
                'teacher_index': 1
            },
            {
                'name_of_course': 'Algebra',
                'name_of_chapter': 'Chapter 2: Quadratic Functions',
                'video_title': 'The Quadratic Formula',
                'video_url': 'https://www.youtube.com/watch?v=_y-aO2aVn8w',
                'video_duration': '14:20',
                'description': 'Using the quadratic formula to find real and complex roots.',
                'order': 2,
                'teacher_index': 1
            },
            
            # Calculus Course
            {
                'name_of_course': 'Calculus',
                'name_of_chapter': 'Chapter 1: Limits',
                'video_title': 'Understanding Limits Intuitively',
                'video_url': 'https://www.youtube.com/watch?v=riXcZT2ICjA',
                'video_duration': '11:10',
                'description': 'Visual approach to the concept of a limit and notation.',
                'order': 1,
                'teacher_index': 2
            },
            {
                'name_of_course': 'Calculus',
                'name_of_chapter': 'Chapter 1: Limits',
                'video_title': 'Limit Laws and Algebraic Techniques',
                'video_url': 'https://www.youtube.com/watch?v=YNstP0ESndU',
                'video_duration': '13:25',
                'description': 'Applying limit laws to compute limits analytically.',
                'order': 2,
                'teacher_index': 2
            },
            {
                'name_of_course': 'Calculus',
                'name_of_chapter': 'Chapter 2: Derivatives',
                'video_title': 'Derivative as an Instantaneous Rate of Change',
                'video_url': 'https://www.youtube.com/watch?v=S0_qX4VJhMQ',
                'video_duration': '16:00',
                'description': 'Relating derivatives to slopes of tangent lines and velocity.',
                'order': 1,
                'teacher_index': 3
            },
            {
                'name_of_course': 'Calculus',
                'name_of_chapter': 'Chapter 2: Derivatives',
                'video_title': 'Rules of Differentiation',
                'video_url': 'https://www.youtube.com/watch?v=rAof9Ld5sOg',
                'video_duration': '18:40',
                'description': 'Power, product, quotient, and chain rules with examples.',
                'order': 2,
                'teacher_index': 3
            },
            
            # Geometry Course
            {
                'name_of_course': 'Geometry',
                'name_of_chapter': 'Chapter 1: Basics of Geometry',
                'video_title': 'Points, Lines, and Planes',
                'video_url': 'https://www.youtube.com/watch?v=VREgR2zcSWo',
                'video_duration': '09:50',
                'description': 'Fundamental undefined terms and their properties.',
                'order': 1,
                'teacher_index': 4
            },
            {
                'name_of_course': 'Geometry',
                'name_of_chapter': 'Chapter 1: Basics of Geometry',
                'video_title': 'Measuring Line Segments',
                'video_url': 'https://www.youtube.com/watch?v=kQdxmjM0EiE',
                'video_duration': '11:05',
                'description': 'Using a ruler postulate to determine lengths and midpoints.',
                'order': 2,
                'teacher_index': 4
            },
            {
                'name_of_course': 'Geometry',
                'name_of_chapter': 'Chapter 2: Angles',
                'video_title': 'Classifying Angles',
                'video_url': 'https://www.youtube.com/watch?v=VREgR2zcSWo',
                'video_duration': '08:30',
                'description': 'Acute, right, obtuse, and straight angles explained.',
                'order': 1,
                'teacher_index': 5
            },
            {
                'name_of_course': 'Geometry',
                'name_of_chapter': 'Chapter 2: Angles',
                'video_title': 'Complementary and Supplementary Angles',
                'video_url': 'https://www.youtube.com/watch?v=kQdxmjM0EiE',
                'video_duration': '12:00',
                'description': 'Identifying and working with complementary and supplementary pairs.',
                'order': 2,
                'teacher_index': 5
            },
            
            # Trigonometry Course
            {
                'name_of_course': 'Trigonometry',
                'name_of_chapter': 'Chapter 1: Introduction to Trig',
                'video_title': 'Unit Circle Basics',
                'video_url': 'https://www.youtube.com/watch?v=TcuUJ5Sf2qQ',
                'video_duration': '14:30',
                'description': 'Understanding the unit circle and basic trigonometric functions.',
                'order': 1,
                'teacher_index': 0
            },
            {
                'name_of_course': 'Trigonometry',
                'name_of_chapter': 'Chapter 1: Introduction to Trig',
                'video_title': 'Sine, Cosine, and Tangent',
                'video_url': 'https://www.youtube.com/watch?v=PUB0TaZ7bhA',
                'video_duration': '16:45',
                'description': 'Learn the three fundamental trigonometric ratios.',
                'order': 2,
                'teacher_index': 0
            },
            {
                'name_of_course': 'Statistics',
                'name_of_chapter': 'Chapter 1: Data Analysis',
                'video_title': 'Mean, Median, and Mode',
                'video_url': 'https://www.youtube.com/watch?v=MdHtK7CWpCQ',
                'video_duration': '13:20',
                'description': 'Understanding measures of central tendency.',
                'order': 1,
                'teacher_index': 1
            },
        ]
        
        # Create the math courses
        for course_data in math_courses_data:
            teacher = teachers[course_data['teacher_index']]
            
            course, created = MathCourse.objects.get_or_create(
                name_of_course=course_data['name_of_course'],
                name_of_chapter=course_data['name_of_chapter'],
                video_title=course_data['video_title'],
                created_by=teacher,
                defaults={
                    'video_url': course_data['video_url'],
                    'video_duration': course_data['video_duration'],
                    'description': course_data['description'],
                    'order': course_data['order'],
                    'is_active': True,
                }
            )
            
            if created:
                self.stdout.write(f'Created course: {course.video_title}')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully created test data!')
        )
        self.stdout.write('Test login credentials:')
        self.stdout.write('Teachers: teacher1-teacher6, password: password123')
        self.stdout.write('Students: student1-student5, password: password123')