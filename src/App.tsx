import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from './state/todolistReducer';
import {
  addEmptyTasksAC,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasksReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, todolistDispatch] = useReducer(todolistReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, taskDispatch] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    taskDispatch(removeTaskAC(id, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    taskDispatch(addTaskAC(title, todolistId));
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    taskDispatch(changeTaskStatusAC(id, isDone, todolistId));
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    taskDispatch(changeTaskTitleAC(id, newTitle, todolistId));
  }

  function changeFilter(filter: FilterValuesType, id: string) {
    todolistDispatch(changeTodolistFilterAC(id, filter));
  }

  function removeTodolist(id: string) {
    todolistDispatch(removeTodolistAC(id));
  }

  function changeTodolistTitle(id: string, title: string) {
    todolistDispatch(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    const newTodoID = v1();
    todolistDispatch(addTodolistAC(title, newTodoID));
    taskDispatch(addEmptyTasksAC(newTodoID));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
            }

            return (
              <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
