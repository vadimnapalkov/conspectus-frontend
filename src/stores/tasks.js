import { writable } from 'svelte/store';
import * as UUID from 'uuid';
import * as api from 'Api/task';

export const tasks = writable([]);

function generateTask(params) {
  return {
    uuid: UUID.v4(),
    body: '',
    completed: false,
    discarded: false,
    comment: '',
    parentUuid: null,
    ...params
  }
}

function updateOne(updatedTask) {
  return tasks.update(currentTasks => currentTasks.map(task => {
    if (task.uuid === updatedTask.uuid) return {...task, ...updatedTask};
    return task;
  }));
}

export function addTask(params) {
  const newTask = generateTask(params)
  tasks.update(currentTasks => [...currentTasks, newTask]);
  api.createTask(newTask).then(response => {
    updateOne(response.task)
  }).catch(() => {
    tasks.update(currentTasks => currentTasks.filter(task => task.uuid !== newTask.uuid));
  })
}

export function updateTask(task) {
  updateOne(task)
  return api.updateTask(task)
}

function getSortedItems(items) {
  if (!items) return [];
  const parentItems = items.filter(({ parentUuid }) => parentUuid === null);
  const sortedItems = Array.from(parentItems);
  parentItems.forEach(item => {
    if (items.some(({ parentUuid }) => parentUuid === item.uuid)) {
      const itemIndex = sortedItems.indexOf(item);
      sortedItems.splice(itemIndex + 1, 0, ...items.filter(({ parentUuid }) => parentUuid === item.uuid));
    }
  });
  return sortedItems;
}

export function nestTask(uuid) {
  let prevParentItemUuid
  tasks.update(currentTasks => {
    const sortedItems = getSortedItems(currentTasks)
    const task = sortedItems.find(t => t.uuid === uuid)
    const childPresented = currentTasks.some(({ parentUuid }) => parentUuid === uuid)

    const index = sortedItems.indexOf(task);
    if (index === 0 || childPresented || task.parentUuid) return currentTasks;

    const parentList = sortedItems.filter(({ parentUuid: itemParentUuid }) => !itemParentUuid);
    prevParentItemUuid = parentList[parentList.indexOf(task) - 1].uuid;

    return currentTasks.map(task => {
      if (task.uuid ===uuid) return {...task, parentUuid: prevParentItemUuid};
      return task;
    })
  });

  if(!prevParentItemUuid) return null;
  return api.updateTask({ uuid, parentUuid: prevParentItemUuid })
}

export function removeTaskNesting(uuid) {
  const taskParams = { uuid, parentUuid: null }
  updateOne(taskParams)
  return api.updateTask(taskParams)
}

export function removeTask(uuid) {
  tasks.update(currentTasks => currentTasks.filter(task => task.uuid !== uuid));
  return api.deleteTask(uuid)
}

export function removeCompletedTasks() {
  tasks.update(currentTasks => currentTasks.filter(({ completed }) => !completed));
}