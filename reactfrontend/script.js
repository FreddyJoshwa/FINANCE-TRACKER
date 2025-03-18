// User Registration
function register() {
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    
    if (username && password) {
        localStorage.setItem(username, password);
        alert("Registration successful! You can now log in.");
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields.");
    }
}

// User Login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (localStorage.getItem(username) === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "salary.html";
    } else {
        alert("Invalid username or password!");
    }
}
// Save Salary
function saveSalary() {
    let salary = parseFloat(document.getElementById("salary").value) || 0;
    localStorage.setItem("salary", salary);
    localStorage.setItem("totalExpenses", 0); // Reset expenses
    localStorage.setItem("addedExpenses", JSON.stringify([])); // Reset added expenses
    window.location.href = "budget.html";
}

// Load Budget Page
function loadBudgetPage() {
    let salary = parseFloat(localStorage.getItem("salary")) || 0;
    let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
    
    document.getElementById("displaySalary").innerText = `₹${salary}`;

    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    // Predefined Expenses
    let defaultExpenses = [
        { name: "Rent/Loan", percent: 30 },
        { name: "Groceries", percent: 15 },
        { name: "Savings", percent: 20 },
        { name: "Entertainment", percent: 10 }
    ];

    let allocatedAmount = 0;
    defaultExpenses.forEach(exp => {
        let amount = (salary * exp.percent) / 100;
        allocatedAmount += amount;
        let listItem = document.createElement("li");
        listItem.innerText = `${exp.name}: ₹${amount.toFixed(2)}`;
        listItem.setAttribute("data-name", exp.name);
        listItem.setAttribute("data-amount", amount);
        expenseList.appendChild(listItem);
    });

    // Retrieve & Display Added Expenses
    let addedExpenses = JSON.parse(localStorage.getItem("addedExpenses")) || [];
    addedExpenses.forEach(exp => {
        let listItem = document.createElement("li");
        listItem.innerText = `${exp.name}: ₹${exp.amount}`;
        listItem.setAttribute("data-name", exp.name);
        listItem.setAttribute("data-amount", exp.amount);
        expenseList.appendChild(listItem);
        allocatedAmount += parseFloat(exp.amount);
    });

    // Update Remaining Balance
    let remainingBalance = salary - allocatedAmount;
    document.getElementById("remainingBalance").innerText = `₹${remainingBalance.toFixed(2)}`;
}

// Add Expense
function addExpense() {
    let name = document.getElementById("newExpenseName").value;
    let amount = parseFloat(document.getElementById("newExpenseAmount").value) || 0;
    
    if (name && amount > 0) {
        let expenseList = document.getElementById("expenseList");
        let listItem = document.createElement("li");
        listItem.innerText = `${name}: ₹${amount}`;
        listItem.setAttribute("data-name", name);
        listItem.setAttribute("data-amount", amount);
        expenseList.appendChild(listItem);

        // Save added expenses
        let addedExpenses = JSON.parse(localStorage.getItem("addedExpenses")) || [];
        addedExpenses.push({ name, amount });
        localStorage.setItem("addedExpenses", JSON.stringify(addedExpenses));

        // Update total expenses
        let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
        totalExpenses += amount;
        localStorage.setItem("totalExpenses", totalExpenses);

        // Update Remaining Balance
        let salary = parseFloat(localStorage.getItem("salary")) || 0;
        let remainingBalance = salary - (parseFloat(totalExpenses) + getPredefinedExpenseTotal());
        document.getElementById("remainingBalance").innerText = `₹${remainingBalance.toFixed(2)}`;

        // Clear input fields
        document.getElementById("newExpenseName").value = "";
        document.getElementById("newExpenseAmount").value = "";
    } else {
        alert("Please enter a valid expense name and amount.");
    }
}

// Get Total Predefined Expenses
function getPredefinedExpenseTotal() {
    let salary = parseFloat(localStorage.getItem("salary")) || 0;
    let defaultExpenses = [
        { name: "Rent/Loan", percent: 30 },
        { name: "Groceries", percent: 15 },
        { name: "Savings", percent: 20 },
        { name: "Entertainment", percent: 10 }
    ];
    return defaultExpenses.reduce((total, exp) => total + (salary * exp.percent) / 100, 0);
}


function loadChartPage() {
    let ctx = document.getElementById("expenseChart").getContext("2d");
    let expenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    let salary = parseFloat(localStorage.getItem("salary")) || 0;
    let totalExpenses = parseFloat(localStorage.getItem("totalExpenses")) || 0;
    let savings = salary - totalExpenses;

    let labels = expenses.map(exp => exp.name);
    let values = expenses.map(exp => exp.amount);
    
    labels.push("Savings");
    values.push(savings > 0 ? savings.toFixed(2) : 0);

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ["#F44336", "#4CAF50", "#FFC107", "#2196F3", "#9C27B0"]
            }]
        },
        options: { responsive: true }
    });
}// Go to Chart
function goToChart() {
    let expenses = [];
    document.querySelectorAll("#expenseList li").forEach(item => {
        expenses.push({
            name: item.getAttribute("data-name"),
            amount: parseFloat(item.getAttribute("data-amount"))
        });
    });

    localStorage.setItem("expenseData", JSON.stringify(expenses));
    window.location.href = "chart.html";
}

// Load Chart Page

// Go Back
function goBack() {
    window.location.href = "budget.html";
}
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove login session
    window.location.href = "index.html"; // Redirect to login page
}


