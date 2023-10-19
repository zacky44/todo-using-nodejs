const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, './todos.json');

/**
 * Add a new task to the list
 * @param {string} data - The task name
 * @returns {void}
 */
async function addTask(data) {
  try {
    const fileContent = fs.readFileSync(fileName, 'utf8');
    const existingData = JSON.parse(fileContent);
    let id = Math.floor(Math.random() * 100000).toString().substring(0, 5);
    const findItem = existingData.find((item) => item.id === id);
    if (findItem) {
      id = Math.floor(Math.random() * 100000).toString().substring(0, 5);
    }
    existingData.push({
      id,
      title: data,
    });
    fs.writeFileSync(fileName, JSON.stringify(existingData, null, 2));
    console.log(`New Data Saved: ${data}`);
    process.exit(1);
  } catch (error) {
    const newItem = [
      {
        id: Math.floor(Math.random() * 100000).toString().substring(0, 5),
        title: data,
      },
    ];
    fs.writeFileSync(fileName, JSON.stringify(newItem, null, 2));
    console.log(`New Item Saved: ${data}`);
    process.exit(1);
  }
}

/**
 * Update a task
 * @param {string} id - The task id
 * @param {string} args - The new task name
 */
function updateTask(id, args) {
  try {
    const data = fs.readFileSync(fileName, 'utf8');
    const parsedData = JSON.parse(data);
    const findItem = parsedData.find((item) => item.id === id);
    if (findItem) {
      findItem.title = args;
      fs.writeFileSync(fileName, JSON.stringify(parsedData, null, 2));
      console.log(`Updated Item with id: ${id}`);
      process.exit(1);
    }
    console.log('No item found');
    process.exit(1);
  } catch (error) {
    console.log('No item found');
    process.exit(1);
  }
}

/**
 * Delete a task
 * @param {string} id - The task id
 */
function deleteTask(id) {
  const data = fs.readFileSync(fileName, 'utf8');
  const existingData = JSON.parse(data);
  const findItem = existingData.find((item) => item.id === id);
  if (!findItem) {
    console.log('No item found');
    process.exit(1);
  }
  const removedData = existingData.filter((item) => item.id !== id);
  fs.writeFileSync(fileName, JSON.stringify(removedData, null, 2));
  console.log(`Removed Item with id: ${id}`);
  process.exit(1);
}

/**
 * Display all tasks
 * @returns {Array} - An array of tasks
 */
function displayTasks() {
  const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  // console.log(data);
  return data;
}

module.exports = {
  addTask,
  updateTask,
  deleteTask,
  displayTasks,
};