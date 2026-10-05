class TodoApp {
    constructor() {
        const savedData = localStorage.getItem('win98_tasks');
        this.tasks = savedData ? JSON.parse(savedData) : [];

        this.form = document.getElementById('task-form');
        this.input = document.getElementById('task-input');
        this.categorySelect = document.getElementById('task-category');
        this.list = document.getElementById('task-list');
        
        this.cartFill = document.getElementById('cart-fill');
        this.cartCount = document.getElementById('cart-count');
        this.totalCount = document.getElementById('total-count');

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        this.render();
    }

    addTask() {
        const text = this.input.value.trim();
        const category = this.categorySelect.value;

        if (!text) {
            alert('Error / Помилка: Task cannot be empty! (Завдання не може бути порожнім)');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            category: category,
            completed: false
        };

        this.tasks.push(newTask);
        this.input.value = '';

        this.saveAndRender();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveAndRender();
    }

    toggleComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        this.saveAndRender();
    }

    saveAndRender() {
        localStorage.setItem('win98_tasks', JSON.stringify(this.tasks));
        this.render();
    }

    updateCart() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const percentage = total === 0 ? 0 : (completed / total) * 100;

        this.cartFill.style.width = `${percentage}%`;
        this.cartCount.textContent = completed;
        this.totalCount.textContent = total;
    }

    render() {
        this.list.innerHTML = '';

        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-btn">
                <span class="tag tag-${task.category}">${task.category.toUpperCase()}</span>
                <span class="task-text">${task.text}</span>
                <button class="win98-btn delete-btn">Del / Видалити</button>
            `;

            const checkbox = li.querySelector('.toggle-btn');
            checkbox.addEventListener('change', () => this.toggleComplete(task.id));

            const delBtn = li.querySelector('.delete-btn');
            delBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.list.appendChild(li);
        });

        this.updateCart();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
