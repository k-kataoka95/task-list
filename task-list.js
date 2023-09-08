"use strict";
const taskMonth = document.getElementById("taskmonth"); //実施月
const taskStatus = document.getElementById("taskstatus"); //進捗
const taskTitle = document.getElementById("tasktitle"); //タイトル
const taskDetail = document.getElementById("taskdetail"); //概要
const submitButton = document.getElementById("submit"); //登録ボタン
const taskListTbody = document.getElementById("tasklist"); //タスクリスト

//タスクを管理する配列を準備する
// { month: 実施月　status: 進捗　title: タイトル detail: 概要 }
let tasks = [];

// ウェブページの表示時にローカルストレージからタスクリストを読み込む
loadTasksFromLocalStorage();

//登録ボタンのクリックイベントを追加する
submitButton.onclick = function () {
  const task = {
    month: taskMonth.value, //実施月
    status: taskStatus.value, //進捗
    title: taskTitle.value, //タイトル
    detail: taskDetail.value, //概要
  };
  addTask(task);
};

function addTask(task) {
  tasks.push(task);
  saveTasksToLocalStorage(); // タスクを追加したらローカルストレージに保存
  displayTaskList();
}

/**
 * タスクを削除する関数
 * @param {number} deleteindex 削除するタスクの添え字
 */
function deleteTask(deleteindex) {
  tasks.splice(deleteindex, 1);
  saveTasksToLocalStorage(); // タスクを削除したらローカルストレージに保存
  displayTaskList();
}

/**
 * タスクリストを表示する関数
 */
function displayTaskList() {
  taskListTbody.innerText = "";
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const taskTr = document.createElement("tr");

    const monthTd = document.createElement("td");
    monthTd.innerText = task.month;
    taskTr.appendChild(monthTd);

    const statusTd = document.createElement("td");
    statusTd.innerText = task.status;
    taskTr.appendChild(statusTd);

    const titleTd = document.createElement("td");
    titleTd.innerText = task.title;
    taskTr.appendChild(titleTd);

    const detailTd = document.createElement("td");
    detailTd.innerText = task.detail;
    taskTr.appendChild(detailTd);

    const deleteTd = document.createElement("td");
    const deletebutton = document.createElement("button");
    deletebutton.innerText = "削除";
    //ボタンにクリックイベントを追加する
    deletebutton.onclick = function () {
      deleteTask(i);
    };

    deleteTd.appendChild(deletebutton);
    taskTr.appendChild(deleteTd);
    taskListTbody.appendChild(taskTr);
  }
}

function addSample() {
  const task = {
    month: "2021-7",
    status: "済",
    title: "A社経営統合プロジェクト",
    detail:
      "経営統合に伴う業務プロセス統合プロジェクト。\nプロジェクトリーダー（メンバー４人）として担当。\nＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。",
  };
  addTask(task);
}

function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
    displayTaskList();
  } else {
    // ローカルストレージに保存されたタスクがない場合、サンプルデータを表示
    addSample();
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
