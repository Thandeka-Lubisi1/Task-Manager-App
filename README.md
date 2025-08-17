# Task Manager Application

A full-stack web application built with C# .NET Web API backend and Angular frontend for managing tasks with priorities and completion status.

## Features

- **Add Tasks**: Create new tasks with title and priority (High, Medium, Low)
- **View Tasks**: Display all tasks in a clean, organized list
- **Complete Tasks**: Mark tasks as completed with a single click
- **Filter Tasks**: Filter by priority and completion status
- **Modern UI**: Responsive design with beautiful styling
- **Real-time Updates**: Immediate feedback when tasks are modified

## Technology Stack

### Backend
- **C# .NET 9.0** - Web API framework
- **ASP.NET Core** - Cross-platform web framework
- **xUnit** - Unit testing framework

### Frontend
- **Angular 20** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with gradients and animations

## Prerequisites

Before running this application, ensure you have the following installed:

1. **.NET SDK 9.0** - [Download here](https://dotnet.microsoft.com/download)
2. **Node.js 18+** - [Download here](https://nodejs.org/)
3. **Angular CLI** - Install via terminal: `npm install -g @angular/cli`
4. **Git** - [Download here](https://git-scm.com/)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd task-manager-application
```

### 2. Backend Setup

```bash
cd TaskManagerAPI

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run
```

The backend API will be available at:
- **HTTPS**: https://localhost:7001
- **HTTP**: http://localhost:5000
- **API Endpoint**: https://localhost:7001/api/tasks

### 3. Frontend Setup

```bash
cd TaskManagerFrontend

# Install dependencies
npm install

# Start the development server
ng serve
```

The frontend application will be available at:
- **http://localhost:4200**

## API Endpoints

### GET /api/tasks
Retrieves all tasks.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "priority": "High",
    "completed": false
  }
]
```

### POST /api/tasks
Creates a new task.

**Request Body:**
```json
{
  "title": "New task title",
  "priority": "Medium"
}
```

**Validation Rules:**
- Title is required and cannot be empty
- Priority must be one of: "High", "Medium", "Low"

### PUT /api/tasks/{id}
Marks a task as completed.

**Response:**
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "priority": "High",
  "completed": true
}
```

## Running Tests

### Backend Tests

```bash
cd TaskManagerAPI
dotnet test
```

### Frontend Tests

```bash
cd TaskManagerFrontend
ng test
```

## Project Structure

```
├── TaskManagerAPI/                 # Backend API
│   ├── Controllers/               # API controllers
│   │   └── TasksController.cs    # Task management endpoints
│   ├── TaskManagerAPI.Tests/     # Backend unit tests
│   └── Program.cs                # Application configuration
├── TaskManagerFrontend/           # Angular frontend
│   ├── src/app/
│   │   ├── components/           # Angular components
│   │   │   ├── task-form/        # Task creation form
│   │   │   └── task-list/        # Task display and management
│   │   ├── services/             # Angular services
│   │   │   └── task.service.ts   # API communication service
│   │   └── app.ts                # Main application component
│   └── package.json              # Frontend dependencies
├── DEBUG_NOTES.txt               # Documentation of bugs fixed
├── answers.txt                   # General development questions
└── README.md                     # This file
```

## Development Workflow

1. **Backend Development**: Use Visual Studio or VS Code with C# extensions
2. **Frontend Development**: Use VS Code with Angular extensions
3. **Testing**: Run tests frequently during development
4. **API Testing**: Use tools like Postman or curl to test endpoints

## Troubleshooting

### Common Issues

1. **Port Conflicts**: If ports 5000, 7001, or 4200 are in use, modify the configuration files
2. **CORS Issues**: Ensure the backend CORS policy allows requests from http://localhost:4200
3. **Build Errors**: Run `dotnet restore` and `npm install` to ensure all dependencies are installed

### Backend Issues

- Check if .NET SDK is properly installed: `dotnet --version`
- Verify the API is running: `curl https://localhost:7001/api/tasks`

### Frontend Issues

- Check if Node.js is properly installed: `node --version`
- Verify Angular CLI is installed: `ng version`
- Clear npm cache if needed: `npm cache clean --force`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is created for educational and assessment purposes.

## Support

For questions or issues, please refer to the documentation or create an issue in the repository.
