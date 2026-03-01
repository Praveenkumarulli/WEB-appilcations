function addTask(){
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if(text === ""){
        alert("Enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));  // ✅ SAVE HERE

    input.value = "";
    loadTasks();
}