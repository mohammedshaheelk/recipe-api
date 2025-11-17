📚 Student–Course Management API

A simple REST API for managing Students, Courses, and their many-to-many relationship.

🚀 How to Run the Project Locally
1️⃣ Clone the repository
git clone <your-repo-url>
cd <project-folder>

2️⃣ Install dependencies
npm install

3️⃣ Create a .env file
MONGO_URI=your_mongodb_connection_string
PORT=5000

4️⃣ Start the server
npm start

5️⃣ Your API will run at
http://localhost:5000

🌍 Deployed API URL

Replace this with your actual deployment link

https://your-deployed-api-url.com

📘 API Endpoint Documentation
Students
Method	Endpoint	Description
POST	/students	Create a new student
GET	/students	Get all students
GET	/students/:id	Get a single student
PUT	/students/:id	Update a student
DELETE	/students/:id	Delete a student
GET	/students/:studentId/courses	Get all courses of a student
Courses
Method	Endpoint	Description
POST	/courses	Create a new course
GET	/courses	Get all courses
GET	/courses/:id	Get a single course
PUT	/courses/:id	Update a course
DELETE	/courses/:id	Delete a course
GET	/courses/:courseId/students	Get all students in a course
Enroll / Unenroll
Enroll a student in a course
Method	Endpoint
POST	/enroll

Body:

{
  "studentId": "string",
  "courseId": "string"
}

Unenroll a student from a course
Method	Endpoint
DELETE	/unenroll

Body:

{
  "studentId": "string",
  "courseId": "string"
}

✅ Example JSON
Student Example
{
  "name": "Shaheel",
  "age": 20
}

Course Example
{
  "title": "Web Development",
  "description": "Learn Express and MongoDB"
}