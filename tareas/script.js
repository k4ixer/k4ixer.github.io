const taskContainer = document.getElementById('taskContainer');
const newTaskBtn = document.getElementById('newTaskBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskContainer.innerHTML = '';
  if (tasks.length === 0) {
    taskContainer.innerHTML = `
      <p class="text-gray-500 text-center">No hay tareas aún. Crea una nueva 👇</p>
    `;
    return;
  }

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = `card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${task.completed ? 'completed' : ''}`;
    div.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold">${task.name}</h3>
        <p class="text-gray-400 text-sm">${task.desc || ''}</p>
      </div>
      <div class="flex gap-2">
        <button onclick="toggleComplete(${index})"
          class="px-3 py-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
          ${task.completed ? '↩️ Desmarcar' : '✅ Completar'}
        </button>
        <button onclick="editTask(${index})"
          class="px-3 py-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition">
          ✏️ Editar
        </button>
        <button onclick="deleteTask(${index})"
          class="px-3 py-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-red-400 transition">
          🗑️ Eliminar
        </button>
      </div>
    `;
    taskContainer.appendChild(div);
  });
}

newTaskBtn.addEventListener('click', () => {
  const name = prompt('Nombre de la tarea:');
  const desc = prompt('Descripción de la tarea:');
  if (name) {
    const task = { name, desc, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
  }
});

window.toggleComplete = function (index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};

window.editTask = function (index) {
  const newName = prompt('Nuevo nombre:', tasks[index].name);
  const newDesc = prompt('Nueva descripción:', tasks[index].desc);
  if (newName) {
    tasks[index].name = newName;
    tasks[index].desc = newDesc;
    saveTasks();
    renderTasks();
  }
};

window.deleteTask = function (index) {
  if (confirm('¿Eliminar esta tarea?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
};

renderTasks();

const newDayBtn = document.getElementById('newDayBtn');

newDayBtn.addEventListener('click', () => {
  if (tasks.length === 0) {
    alert("No hay tareas que eliminar.");
    return;
  }

  const confirmDelete = confirm("⚠️ Se eliminarán todas las tareas para iniciar un nuevo día. ¿Deseas continuar?");
  if (confirmDelete) {
    tasks = [];
    saveTasks();
    renderTasks();
    alert("✅ Todas las tareas han sido eliminadas. ¡Nuevo día!");
  }
});
