const users = [];
const grades = [];

// Function to switch between forms
document.getElementById('showCreateAccount').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('createAccountForm').classList.add('active');
});

document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('createAccountForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
});

// Handle account creation
document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('create-username').value;
    const password = document.getElementById('create-password').value;
    const role = document.getElementById('role').value;

    const user = { username, password, role };
    users.push(user);

    alert('Account created successfully!');
    document.getElementById('createAccountForm').reset();
    document.getElementById('createAccountForm').classList.remove('active');
    document.getElementById('loginForm').classList.add('active');
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === 'student') {
            showStudentDashboard(username);
        } else {
            showTeacherDashboard(username);
        }
    } else {
        alert('Invalid username or password');
    }
});

function showStudentDashboard(username) {
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('studentDashboard').style.display = 'block';
    document.getElementById('studentInfo').textContent = `Welcome, ${username}`;

    const userGrades = grades.filter(grade => grade.username === username);
    const tbody = document.querySelector('#gradesTable tbody');
    tbody.innerHTML = '';

    userGrades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.subject}</td><td>${grade.grade}</td>`;
        tbody.appendChild(row);
    });
}

function showTeacherDashboard(username) {
    document.querySelector('.form-container').style.display = 'none';
    document.getElementById('teacherDashboard').style.display = 'block';
    document.getElementById('teacherInfo').textContent = `Welcome, ${username}`;

    const tbody = document.querySelector('#allGradesTable tbody');
    tbody.innerHTML = '';

    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.username}</td><td