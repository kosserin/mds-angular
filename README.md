# 📱 MDS Angular Kanban Board

This documentation covers basic functionalities and structure of the project. Application is designed to implement kanban functionality, like the one Jira has. Below, you'll find details about the project structure, key features, and how it works.

## 🚀 Features

✅ Board page with columns related to status with task items inside - Items on the board are draggable. Create task functionality added.

✅ Statuses page with all statuses - Page where you can change order of statuses, remove them or add one

✅ Task details preview - Dialog with all task relevant data in it. Availability to delete task.

## 📂 Project Structure

```
todo-angular/
│-- src/
│   │-- app/
│   │   │-- components/            # Reusable UI components
│   │   │-- pages/                 # Application pages
│   │   │-- services/              # Business logic
│   │   │-- constants/             # Constants and configuration
│   │   │-- directives/            # Custom directives
│   │   │-- pipes/                 # Data transformation utilities
│   │   │-- models/                # Data models and interfaces
│   │   │-- app.routing.module.ts  # Application routing setup
│   │   │-- app.component.ts       # Root application component
│   │   └── app.module.ts          # Main app module
│   │-- assets/
│   │   └── icons/                 # Icon assets
│   │-- theme/                     
│   │   │-- dialog.css             # Styles related to dialog
│   │   │-- forms.css              # Styles related to form field, input, textarea, labels
│   │   └── variables.css          # CSS variables used for standardised colors across the application
│-- package.json                   # Dependencies and scripts
│-- angular.json                   # Angular configuration
│-- README.md                      # This file!
```

## 📜 Pages

- Board Page - The main page where board columns are displayed with items inside the columns.
- Edit Statuses Page - A page to configure statuses - reorder, remove or add status.

## 🛠️ Components

CreateTaskDialogComponent - A dialog that displays the task creation form, triggered when the "Create Task" button in the board header is clicked.
TaskDetailsDialogComponent - A dialog that appears when a task item is selected, showing its details.
CreateStatusDialogComponent - A dialog that opens when the "Add Status" button is clicked on the edit page, containing a form for creating a new status.
StatusSelectorComponent - A custom component that serves as a dropdown input field for selecting task statuses.
TaskItemComponent - A component that displays an individual task, including its title, description, due date, status, and unique ID.
TaskListComponent - A component responsible for rendering a list of task items and managing their interactions.

## 🎮 How It Works

- The user can view a task board where tasks are organized into columns based on their current status.

- Tasks can be created, modified, or deleted, including updates to their status.

- Drag-and-drop functionality allows users to move tasks between columns, automatically updating their status.

- Users can manage statuses by adding new ones, reordering them, or removing existing ones.

## 📦 Installation & Setup

### Clone the repository
```git clone git@github.com:kosserin/mds-angular.git```
cd mds-angular

### Install dependencies
```npm install```

### Start the development server
```npm run start```

## 🚀 Deployment

To deploy the project to the Netlify:

install netlify-cli globally:
```npm install -g netlify-cli```

then initialize netlify:
```netlify init```

for build command write:
```ng build```

for directory to deploy write:
```dist/todo-angular```
