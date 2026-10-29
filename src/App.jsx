import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>React Todo App</h1>
      <form onSubmit={addTodo} className="form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add</button>
      </form>
      <ul className="list">
        {todos.length === 0 && <li className="empty">No todos yet.</li>}
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </label>
            <button onClick={() => deleteTodo(todo.id)} className="delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <p className="count">{todos.filter((t) => !t.done).length} remaining</p>
    </div>
  );
}
