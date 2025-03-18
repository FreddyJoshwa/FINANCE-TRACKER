# Budget Management Web App

## Overview
This is a simple Budget Management Web Application that allows users to register, log in, input their salary, allocate expenses, and visualize their budget using a pie chart.

## Features
- User authentication (Register/Login/Logout)
- Salary input
- Automatic allocation of expenses based on salary
- Add custom expenses in real time
- View remaining balance after expenses
- Budget visualization using Chart.js

## File Structure
```
|-- index.html      # Login Page
|-- register.html   # Registration Page
|-- salary.html     # Salary Input Page
|-- budget.html     # Budget Allocation Page
|-- chart.html      # Budget Visualization Page
|-- styles.css      # Styling File
|-- script.js       # Main JavaScript Logic
```

## How to Use
### 1. Register
- Open `register.html` and create an account.
- The data will be stored in `localStorage`.

### 2. Login
- Open `index.html` and enter the registered username and password.
- If login is successful, the user is redirected to `salary.html`.

### 3. Enter Salary
- Input salary amount in `salary.html`.
- Click **Next** to proceed to budget allocation.

### 4. Budget Allocation
- `budget.html` automatically assigns a percentage of salary to predefined expenses.
- Users can add new expenses dynamically.
- Remaining balance updates automatically.

### 5. Budget Visualization
- `chart.html` displays expenses in a **pie chart** using **Chart.js**.

### 6. Logout
- A **Logout button** is available to clear session data and return to `index.html`.

## Technologies Used
- HTML5
- **CSS3- JavaScript (LocalStorage, DOM Manipulation)- Chart.js for data visualization

 Notes
- This app uses **localStorage** for data persistence.
- For security, a real-world version should use a backend with proper authentication.
