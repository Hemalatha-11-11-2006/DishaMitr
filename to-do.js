const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage when page loads
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  addTaskToDOM(text, false);
  saveTasks();
  taskInput.value = "";
}

function addTaskToDOM(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;
  if (completed) li.classList.add("completed");

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "deleteBtn";
  del.addEventListener("click", e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(del);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  
}

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
  }