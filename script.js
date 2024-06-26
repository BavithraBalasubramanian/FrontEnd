document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("tasks");
    const taskForm = document.getElementById("task-form");
    const taskDetail = document.getElementById("task-detail");
    const addTaskBtn = document.getElementById("add-task-btn");
    const formTitle = document.getElementById("form-title");
    const form = document.getElementById("form");
    const cancelBtn = document.getElementById("cancel-btn");
    const editBtn = document.getElementById("edit-btn");
    const deleteBtn = document.getElementById("delete-btn");
    const backBtn = document.getElementById("back-btn");

    let tasks = [];
    let editingTaskId = null;

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${task.title}</span> <button onclick="viewTask(${index})">View</button>`;
            taskList.appendChild(li);
        });
    }

    function viewTask(index) {
        const task = tasks[index];
        document.getElementById("detail-title").innerText = `Title: ${task.title}`;
        document.getElementById("detail-description").innerText = `Description: ${task.description}`;
        document.getElementById("detail-due-date").innerText = `Due Date: ${task.dueDate}`;
        editingTaskId = index;
        toggleSection("task-detail");
    }

    function toggleSection(section) {
        taskForm.classList.add("hidden");
        taskDetail.classList.add("hidden");
        if (section === "task-form") {
            taskForm.classList.remove("hidden");
        } else if (section === "task-detail") {
            taskDetail.classList.remove("hidden");
        }
    }

    addTaskBtn.addEventListener("click", () => {
        form.reset();
        formTitle.innerText = "Add New Task";
        editingTaskId = null;
        toggleSection("task-form");
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = form.title.value;
        const description = form.description.value;
        const dueDate = form["due-date"].value;

        if (editingTaskId !== null) {
            tasks[editingTaskId] = { title, description, dueDate };
        } else {
            tasks.push({ title, description, dueDate });
        }

        renderTasks();
        toggleSection("");
    });

    cancelBtn.addEventListener("click", () => {
        toggleSection("");
    });

    editBtn.addEventListener("click", () => {
        const task = tasks[editingTaskId];
        form.title.value = task.title;
        form.description.value = task.description;
        form["due-date"].value = task.dueDate;
        formTitle.innerText = "Edit Task";
        toggleSection("task-form");
    });

    deleteBtn.addEventListener("click", () => {
        tasks.splice(editingTaskId, 1);
        renderTasks();
        toggleSection("");
    });

    backBtn.addEventListener("click", () => {
        toggleSection("");
    });

    renderTasks();
});

function viewTask(index) {
    const event = new CustomEvent("viewTask", { detail: index });
    document.dispatchEvent(event);
}
