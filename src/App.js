import React, { useContext } from "react";
import { useState, useRef } from "react";
import TodoList from "./TodoList";
import DoneList from "./DoneList";
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import { Typography } from "@mui/material";

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = React.createContext();

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

function App() {
  const [todos, setTodos] = useState([]);
  const [dones, setDones] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name !== "") {
      setTodos((prevTodos) => {
        return ([...prevTodos, {id: uuidv4(), name: name, status: false}]);
      });
      todoNameRef.current.value = null;
    }
  };

  const handleDeleteTodo = () => {
    setDones([]);
  };

  const toggleTodo = (id) => {
    const currentTodos = [...todos];
    const currentDones = [...dones];
    const todo = currentTodos.find((todo) => (todo.id === id));
    todo.status = !todo.status;
    const newTodos = currentTodos.filter((todo) => (todo.id !== id));
    const newDones = [...currentDones, todo];
    setTodos(newTodos);
    setDones(newDones);
  };

  const toggleDone = (id) => {
    const currentTodos = [...todos];
    const currentDones = [...dones];
    const done = currentDones.find((done) => (done.id === id));
    done.status = !done.status;
    const newTodos = [...currentTodos, done];
    const newDones = currentDones.filter((done) => (done.id !== id));
    setTodos(newTodos);
    setDones(newDones);
  };

  const handleDoToAllDone = () => {
    const newTodos = [];
    const newDones = dones.concat(todos).map((done) => {
      return {id: done.id, name: done.name, status: true}
    });
    setTodos(newTodos);
    setDones(newDones);
  }

  const handleDoneToAllDo = () => {
    const newTodos = todos.concat(dones).map((todo) => {
      return {id: todo.id, name: todo.name, status: false}
    });
    const newDones = [];
    setTodos(newTodos);
    setDones(newDones);
  }

  return (
    <div className="App">
      <ThemeContext.Provider value={themes}>
        <Chip label="Todo" color="secondary"/>
        <Chip label="完了済みにする" onClick={handleDoToAllDone} color="primary"/>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <Divider />
        <Chip label="Done" color="secondary"/>
        <Chip label="未完了にする" onClick={handleDoneToAllDo} color="primary"/>
        <DoneList dones={dones} toggleDone={toggleDone} />
        <Divider />
        <Input type="text" inputRef={todoNameRef} color='primary'/>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={handleAddTodo}>タスクの追加</Button>
          <Button onClick={handleDeleteTodo}>完了したタスクの削除</Button>
        </ButtonGroup>
        <Typography>残りのタスク:{todos.filter((todo) => (todo.status === false)).length}</Typography>
        </ThemeContext.Provider>
    </div>
  );
}

export default App;
