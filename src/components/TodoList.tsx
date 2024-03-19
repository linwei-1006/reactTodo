import React, { useState } from 'react';
import { Checkbox, Input, Button, message } from 'antd';
import './TodoList.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = () => {
    if (!newTodoText.trim()) {
      message.warning('请输入代办事项')
      return;
    };
    setTodos([...todos, { id: Date.now(), text: newTodoText, completed: false }]);
    setNewTodoText('');
  };

  const toggleTodoComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const todoCompleted = (checked: boolean) => {
    setTodos(todos.map((todo) => ({ ...todo, completed: checked })));
  };

  const clearTodo = () => {
    setTodos([]);
  };

  return (
    <div className='wrap'>
      <h1>代办事项 Todo</h1>
      <div className='header'>
        <Input
          placeholder="请输入待办事项"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <Button onClick={addTodo}>添加</Button>
      </div>
      {
        todos.length > 0 && <div className='content' >
        {
          todos.map((todo) => (
            <p key={todo.id}>
              <Checkbox checked={todo.completed} onChange={() => toggleTodoComplete(todo.id)}>
                {todo.text}
              </Checkbox>
            </p>
          ))
        }
        <div className='footer'>
          <p>已有{todos.length}个待办事项</p>
          <p onClick={() => todoCompleted(true)}>选中所有完成事项</p>
          <p onClick={() => clearTodo()}>清除事项</p>
        </div>
      </div>
      }
    </div>
  );
};

export default TodoList;