let Tasks;
if (localStorage.tasks != null) {
  Tasks = JSON.parse(localStorage.tasks);
} else {
  Tasks = [];
}
let choice = -1;
let LastidCounter;
localStorage.lastIdCounterForTodoList != null
  ? (LastidCounter = localStorage.lastIdCounterForTodoList)
  : (LastidCounter = 0);
document.querySelector("#toggle").addEventListener("click", () => {
  while (choice != 6) {
    console.log(
      "Task Manager Menu :\n1-Add task\n2-view tasks\n3-toggle task completion\n4-edit task\n5-delete task\n6-exit"
    );
    choice = parseInt(window.prompt("enter your choice"));
    switch (choice) {
      case 1:
        {
          addTask();
        }
        break;
      case 2:
        {
          viewTasks();
        }
        break;
      case 3:
        {
          ToggleTaskCompletion();
        }
        break;
      case 4:
        {
          editTask();
        }
        break;
      case 5:
        {
          DeleteTask();
        }
        break;
      case 6:
        {
          console.log("exit");
        }
        break;
      default:
        console.log("invalid choice, please enter a number between 1-6");
    }
  }
});
function addTask() {
  let Takdescription = window.prompt("Enter Task Description :");
  Tasks.push({
    id: LastidCounter,
    description: Takdescription,
    complete: false,
  });
  LastidCounter++;
  localStorage.setItem("lastIdCounterForTodoList", LastidCounter);
  console.log(`task \" ${Takdescription} \" Added successfully`);
  localStorage.setItem("tasks", JSON.stringify(Tasks));
}
function viewTasks() {
  console.log("Tasks :");
  Tasks.forEach((task) => {
    console.log(
      `${task.id}. ${task.description} [ ${
        task.complete ? "completed" : "not completed"
      } ]`
    );
  });
}
const DeleteTask = () => {
  let toggledTaskId = Number(
    window.prompt("enter the task id you want to delete :")
  );
  if (toggledTaskId >= LastidCounter || toggledTaskId < 0) {
    alert("the task you want is not exsist");
  } else {
    let TaskIndex;
    Tasks.forEach((task, index) => {
      if (task.id == toggledTaskId) {
        TaskIndex = index;
      }
    });
    console.log(
      `task \" ${Tasks[TaskIndex].description} \" has been removed successfully`
    );
    Tasks.splice(TaskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }
};
const ToggleTaskCompletion = () => {
  let toggledTaskId = Number(
    window.prompt("enter the task id you want to complete :")
  );
  let toggledTask = Tasks.find((task) => {
    return task.id === toggledTaskId;
  });
  if (toggledTask) {
    toggledTask.complete === true
      ? (toggledTask.complete = false)
      : (toggledTask.complete = true);
    console.log(
      `toggled task \" ${toggledTask.description} \" as ${
        toggledTask.complete ? "completed" : "not completed"
      }`
    );
  } else {
    console.log("Task not Found");
  }
  localStorage.setItem("tasks", JSON.stringify(Tasks));
};
function editTask() {
  let toggledTaskId = Number(
    window.prompt("enter the task id you want to edit :")
  );
  if (toggledTaskId >= LastidCounter || toggledTaskId < 0) {
    alert("the task you want is not exsist");
  } else {
    let newDescription = window.prompt("enter new description :");
    let toggledTask = Tasks.find((task) => {
      return task.id === toggledTaskId;
    });
    toggledTask.description = newDescription;
    console.log(
      `Task description with id \" ${toggledTaskId} \" changed to \" ${newDescription} \" `
    );
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }
}
