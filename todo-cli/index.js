const EventEmitter = require('events');
const readline = require('readline');
const Todo = require('./src/todo');
const { ACTIONS, TodoData } = require('./src/types');

const eventEmitter = new EventEmitter();
const todo =  Todo;
const readLine = initReadLine();

console.log('Welcome to Todo CLI!');
console.log('--------------------');

displayCommands();

function initReadLine() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function displayCommands() {
  readLine.question('Choose one of these commands (add/delete,update,list,exit) :- ', (data) => {
    chooseCommand(data);
  });
}

function chooseCommand(data) {
  switch (data) {
    case ACTIONS.ADD:
      readLine.question('Enter task name :- ', (taskName) => {
        todo.addTask(taskName);
      });
      break;
    case ACTIONS.UPDATE:
      const tasks = todo.displayTasks();
      readLine.question('Enter the task id you want to update :- ', (taskId) => {
        const task = tasks.find((item) => item.id === taskId);
        if (task) {
          readLine.question('Enter the new task name :- ', (newTaskName) => {
            todo.updateTask(taskId, newTaskName);
          });
        } else {
          console.log('Task not found');
          eventEmitter.emit('exit');
        }
      });
      break;
    case ACTIONS.DELETE:
      const tasksForDelete = todo.displayTasks();
      readLine.question('Enter the task id you want to delete :- ', (taskId) => {
        const task = tasksForDelete.find((item) => item.id === taskId);
        if (task) {
          todo.deleteTask(taskId);
        } else {
          console.log('Task not found');
          eventEmitter.emit('exit');
        }
      });
      break;
    case ACTIONS.LIST:
      const tasksForList = todo.displayTasks();
      console.log(tasksForList);
      eventEmitter.emit('exit');
      break;
    case ACTIONS.EXIT:
      eventEmitter.emit('exit');
      break;
    default:
      console.error('Invalid command, please try again');
      eventEmitter.emit('exit');
      break;
  }
}

eventEmitter.on('exit', () => {
  readLine.close();
});