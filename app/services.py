import google.generativeai as genai
import PyPDF2
import json
import os
from django.conf import settings

class GeminiQuizService:
    def __init__(self):
        # Configure Gemini API
        api_key = os.getenv('GEMINI_API_KEY')
        if not api_key:
            raise Exception("GEMINI_API_KEY environment variable not set")
        
        print(f"Debug: Configuring Gemini with API key: {api_key[:10]}...")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-2.0-flash')
    
    def extract_pdf_text(self, pdf_file):
        """Extract text from uploaded PDF file"""
        try:
            print("Debug: Starting PDF text extraction...")
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            
            print(f"Debug: PDF has {len(pdf_reader.pages)} pages")
            
            for i, page in enumerate(pdf_reader.pages):
                page_text = page.extract_text()
                text += page_text + "\n"
                print(f"Debug: Extracted {len(page_text)} characters from page {i+1}")
            
            extracted_text = text.strip()
            print(f"Debug: Total extracted text length: {len(extracted_text)}")
            
            return extracted_text
        except Exception as e:
            print(f"Debug: Error in PDF extraction: {str(e)}")
            raise Exception(f"Error extracting PDF text: {str(e)}")
    
    def generate_quiz(self, pdf_text, num_questions=10):
        """Generate quiz questions using Gemini API"""
        try:
            print(f"Debug: Generating {num_questions} questions from {len(pdf_text)} characters of text")
            
            prompt = f"""
            Based on the following text, create {num_questions} multiple-choice questions. 
            Each question should have 4 options (A, B, C, D) with only one correct answer.
            
            Format your response as a valid JSON array with this structure:
            [
                {{
                    "question": "Question text here?",
                    "options": {{
                        "A": "Option A text",
                        "B": "Option B text", 
                        "C": "Option C text",
                        "D": "Option D text"
                    }},
                    "correct_answer": "A",
                    "explanation": "Brief explanation of why this is correct"
                }}
            ]
            
            Text content:
            {pdf_text[:4000]}
            
            Make sure questions are diverse and test understanding of key concepts.
            Return ONLY the JSON array, no additional text.
            """
            
            print("Debug: Sending request to Gemini API...")
            response = self.model.generate_content(prompt)
            
            print("Debug: Received response from Gemini API")
            print(f"Debug: Response text length: {len(response.text)}")
            
            # Parse the response
            response_text = response.text.strip()
            print(f"Debug: Response preview: {response_text[:200]}...")
            
            # Try to extract JSON from the response
            start_idx = response_text.find('[')
            end_idx = response_text.rfind(']') + 1
            
            if start_idx != -1 and end_idx != -1:
                json_text = response_text[start_idx:end_idx]
                print(f"Debug: Extracted JSON text length: {len(json_text)}")
                
                questions = json.loads(json_text)
                print(f"Debug: Successfully parsed {len(questions)} questions")
                
                # Validate question structure
                for i, question in enumerate(questions):
                    if not all(key in question for key in ['question', 'options', 'correct_answer']):
                        raise Exception(f"Question {i+1} is missing required fields")
                
                return questions
            else:
                print("Debug: Could not find JSON array in response")
                # Fallback: try to parse the entire response as JSON
                try:
                    questions = json.loads(response_text)
                    return questions
                except:
                    raise Exception("Could not parse questions from AI response")
                
        except json.JSONDecodeError as e:
            print(f"Debug: JSON parsing error: {str(e)}")
            raise Exception(f"Error parsing AI response: {str(e)}")
        except Exception as e:
            print(f"Debug: General error in generate_quiz: {str(e)}")
            raise Exception(f"Error generating quiz: {str(e)}")
    
    def evaluate_answers(self, questions, user_answers):
        """Evaluate user answers and calculate score"""
        print(f"Debug: Evaluating {len(questions)} questions with {len(user_answers)} answers")
        
        correct_count = 0
        total_questions = len(questions)
        results = []
        
        for i, question in enumerate(questions):
            question_id = str(i)
            user_answer = user_answers.get(question_id, '')
            correct_answer = question.get('correct_answer', '')
            
            is_correct = user_answer.upper() == correct_answer.upper()
            if is_correct:
                correct_count += 1
            
            results.append({
                'question': question['question'],
                'user_answer': user_answer,
                'correct_answer': correct_answer,
                'is_correct': is_correct,
                'explanation': question.get('explanation', '')
            })
        
        score = (correct_count / total_questions) * 100 if total_questions > 0 else 0
        
        print(f"Debug: Final score: {score}% ({correct_count}/{total_questions})")
        
        return {
            'score': round(score, 1),
            'correct_count': correct_count,
            'total_questions': total_questions,
            'results': results
        }
