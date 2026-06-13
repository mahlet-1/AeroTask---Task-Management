const menuButtons = document.querySelectorAll('.sidebar-menu .menu-btn');
const pageViews = document.querySelectorAll('.main-content .page-view');
const dashboardView = document.getElementById('dashboard-view');

const openModalBtn = document.getElementById('open-window');
const closeModalBtn = document.getElementById('close-window');
const modalOverlay = document.getElementById('task-popup');
const taskForm = document.getElementById('task-form');

const openLoginBtn = document.getElementById('open-login');
const openGetStartedBtn = document.getElementById('open-get-started');
const closeAuthBtn = document.getElementById('close-auth');
const authOverlay = document.getElementById('auth-popup');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authNameGroup = document.getElementById('auth-name-group');
const authSubmitBtn = document.getElementById('btn-auth-submit');

const themeSelect = document.getElementById('Theme-select');
const bodyElement = document.body;

const tasksListContainer = document.getElementById('tasks-list');
const trashListContainer = document.getElementById('trash-list');
const totalCountEl = document.getElementById('total-count');
const pendingCountEl = document.getElementById('pending-count');
const completedCountEl = document.getElementById('completed-count');
const completionRateEl = document.getElementById('completion-rate');

const filterButtons = document.querySelectorAll('.task-pills .tp-btn');
const searchInput = document.querySelector('.search-box input');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        menuButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetId = button.getAttribute('data-target');
        
        pageViews.forEach(view => {
            if (view.id === targetId) {
                view.style.display = 'block';
            } else {
                view.style.display = 'none';
            }
        });
    });
});

if (openModalBtn && modalOverlay) {
    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });
}

if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        taskForm.reset();
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            taskForm.reset();
        }
    });
}

if (openLoginBtn && authOverlay) {
    openLoginBtn.addEventListener('click', () => {
        authTitle.textContent = 'Welcome Back';
        authNameGroup.style.display = 'none';
        document.getElementById('auth-name').removeAttribute('required');
        authSubmitBtn.textContent = 'Login';
        authOverlay.style.display = 'flex';
    });
}

if (openGetStartedBtn && authOverlay) {
    openGetStartedBtn.addEventListener('click', () => {
        authTitle.textContent = 'Create Account';
        authNameGroup.style.display = 'flex';
        document.getElementById('auth-name').setAttribute('required', 'required');
        authSubmitBtn.textContent = 'Get Started';
        authOverlay.style.display = 'flex';
    });
}

if (closeAuthBtn && authOverlay) {
    closeAuthBtn.addEventListener('click', () => {
        authOverlay.style.display = 'none';
        authForm.reset();
    });
}

if (authOverlay) {
    authOverlay.addEventListener('click', (e) => {
        if (e.target === authOverlay) {
            authOverlay.style.display = 'none';
            authForm.reset();
        }
    });
}

if (authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        authOverlay.style.display = 'none';
        authForm.reset();
    });
}

if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        bodyElement.className = '';
        bodyElement.classList.add(`theme-${e.target.value}`);
    });
}

function updateMetrics() {
    const totalTasks = document.querySelectorAll('#dashboard-view .task-item').length;
    const completedTasks = document.querySelectorAll('#dashboard-view .task-item input[type="checkbox"]:checked').length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    if (totalCountEl) totalCountEl.textContent = totalTasks;
    if (pendingCountEl) pendingCountEl.textContent = pendingTasks;
    if (completedCountEl) completedCountEl.textContent = completedTasks;
    if (completionRateEl) completionRateEl.textContent = `${completionRate}%`;
}

function sendToTrash(title, priority) {
    if (!trashListContainer) return;
    const trashItem = document.createElement('div');
    trashItem.className = 'task-item';
    trashItem.setAttribute('data-priority', priority);
    
    trashItem.innerHTML = `
        <label class="task-text">${title} <small style="color: var(--text-sub);">(${priority})</small></label>
        <button class="btn-restore-action" data-title="${title}" data-priority="${priority}">Restore</button>
    `;
    trashListContainer.appendChild(trashItem);
}

if (tasksListContainer) {
    tasksListContainer.addEventListener('change', (e) => {
        if (e.target && e.target.type === 'checkbox') {
            updateMetrics();
        }
    });

    tasksListContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-menu-trigger')) {
            e.stopPropagation();
            const currentContainer = e.target.closest('.task-menu-container');
            
            document.querySelectorAll('.task-menu-container').forEach(container => {
                if (container !== currentContainer) {
                    container.classList.remove('show-menu');
                }
            });
            
            if (currentContainer) {
                currentContainer.classList.toggle('show-menu');
            }
        }

        if (e.target && e.target.classList.contains('btn-delete-action')) {
            const taskItem = e.target.closest('.task-item');
            if (taskItem) {
                const title = taskItem.querySelector('.task-text').textContent;
                const priority = taskItem.getAttribute('data-priority') || 'medium';
                
                sendToTrash(title, priority);
                taskItem.remove();
                updateMetrics();
            }
        }
    });
}

if (trashListContainer) {
    trashListContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-restore-action')) {
            const trashItem = e.target.closest('.task-item');
            const title = e.target.getAttribute('data-title');
            const priority = e.target.getAttribute('data-priority');
            
            if (tasksListContainer) {
                const taskId = `task-${Date.now()}`;
                const taskItem = document.createElement('div');
                taskItem.className = 'task-item';
                taskItem.setAttribute('data-priority', priority);

                taskItem.innerHTML = `
                    <input type="checkbox" id="${taskId}">
                    <label for="${taskId}" class="task-text">${title}</label>
                    <div class="task-menu-container">
                        <button class="btn-menu-trigger">⋮</button>
                        <div class="task-dropdown-menu">
                            <button class="btn-delete-action">Delete</button>
                        </div>
                    </div>
                `;
                tasksListContainer.appendChild(taskItem);
            }
            
            if (trashItem) trashItem.remove();
            
            const currentActiveFilter = document.querySelector('.task-pills .tp-btn.active').textContent.toLowerCase();
            filterAndSearchTasks(currentActiveFilter, searchInput ? searchInput.value : '');
            updateMetrics();
        }
    });
}

document.addEventListener('click', () => {
    document.querySelectorAll('.task-menu-container').forEach(container => {
        container.classList.remove('show-menu');
    });
});

if (taskForm && tasksListContainer) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('input-text').value;
        const priority = document.getElementById('select-priority').value;
        const taskId = `task-${Date.now()}`;

        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.setAttribute('data-priority', priority);

        taskItem.innerHTML = `
            <input type="checkbox" id="${taskId}">
            <label for="${taskId}" class="task-text">${title}</label>
            <div class="task-menu-container">
                <button class="btn-menu-trigger">⋮</button>
                <div class="task-dropdown-menu">
                    <button class="btn-delete-action">Delete</button>
                </div>
            </div>
        `;

        tasksListContainer.appendChild(taskItem);
        
        modalOverlay.style.display = 'none';
        taskForm.reset();
        
        const currentActiveFilter = document.querySelector('.task-pills .tp-btn.active').textContent.toLowerCase();
        filterAndSearchTasks(currentActiveFilter, searchInput ? searchInput.value : '');
        
        updateMetrics();
    });
}

function filterAndSearchTasks(priorityFilter, searchQuery) {
    const taskItems = document.querySelectorAll('#tasks-list .task-item');
    const cleanQuery = searchQuery.toLowerCase().trim();
    
    taskItems.forEach(item => {
        const taskPriority = item.getAttribute('data-priority');
        const taskText = item.querySelector('.task-text').textContent.toLowerCase();
        
        const matchesPriority = (priorityFilter === 'all' || taskPriority === priorityFilter);
        const matchesSearch = taskText.includes(cleanQuery);
        
        if (matchesPriority && matchesSearch) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const selectedPriority = button.textContent.toLowerCase();
        const currentQuery = searchInput ? searchInput.value : '';
        filterAndSearchTasks(selectedPriority, currentQuery);
    });
});

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const currentActiveFilter = document.querySelector('.task-pills .tp-btn.active').textContent.toLowerCase();
        filterAndSearchTasks(currentActiveFilter, e.target.value);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateMetrics();
});