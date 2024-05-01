//유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다.
// 유저가 삭제버튼을 누르면 할 일이 삭제된다.
// 유저가 체크버튼을 누르면 할 일이 끝나면서 줄이 생긴다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만 ,진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let tasks = document.getElementById("tasks");
let taskList = [];
let mode = "all";
let filterList = [];
let doneList = [];
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

addBtn.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  } else if (mode === "done") {
    list = doneList;
  }
  let resultHtml = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml += `<div id="tasks" class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHtml += `<div id="tasks" class="task">
      <div>${list[i].taskContent}</div>
      <div>
        <button onclick="toggleComplete('${list[i].id}')">Check</button>
        <button onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }

  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  doneList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        doneList.push(taskList[i]);
      }
    }
    render();
  }
}
