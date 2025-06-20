console.log('Script loaded');

window.onload = function() {
    console.log('Page loaded');

    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    
    console.log('todoInput:', todoInput);
    console.log('addBtn:', addBtn);
    console.log('todoList:', todoList);
    console.log('totalTasks:', totalTasks);
    console.log('completedTasks:', completedTasks);
    
    if (todoInput && addBtn && todoList && totalTasks && completedTasks) {
        console.log('All elements found!');
        setupApp();
    } else {
        console.log('Some elements missing!');
    }
};

function setupApp() {
    let todos = [];
    let todoId = 1;
    
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');

    function addTask() {
        const text = todoInput.value.trim();
        if (text === '') {
            alert('Please enter a task!');
            return;
        }
        
        const todo = {
            id: todoId++,
            text: text,
            completed: false
        };
        
        todos.push(todo);
        todoInput.value = '';
        displayTasks();
        updateStats();
    }

    function displayTasks() {
        todoList.innerHTML = '';
        
        todos.forEach(function(todo) {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) {
                li.className += ' completed';
            }
            
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button onclick="editTask(${todo.id})">Edit</button>
                <button onclick="deleteTask(${todo.id})">Delete</button>
            `;
            
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                todo.completed = checkbox.checked;
                displayTasks();
                updateStats();
            });
            
            todoList.appendChild(li);
        });
    }
    
    function updateStats() {
        const total = todos.length;
        const completed = todos.filter(t => t.completed).length;
        totalTasks.textContent = 'Total: ' + total;
        completedTasks.textContent = 'Completed: ' + completed;
    }

    window.editTask = function(id) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            const newText = prompt('Edit task:', todo.text);
            if (newText && newText.trim()) {
                todo.text = newText.trim();
                displayTasks();
            }
        }
    };
    
    window.deleteTask = function(id) {
        if (confirm('Delete this task?')) {
            todos = todos.filter(t => t.id !== id);
            displayTasks();
            updateStats();
        }
    };
    
    // Event listeners
    addBtn.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Initial display
    updateStats();
}