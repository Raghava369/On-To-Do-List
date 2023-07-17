import React from "react";
import "./App.css";

const App = () => {
  const [array1, setarray1] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, Modify] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("array1");
    const loadedarray1 = JSON.parse(json);
    if (loadedarray1) {
      setarray1(loadedarray1);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(array1);
    localStorage.setItem("array1", json);
  }, [array1]);

  function handle_Submit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setarray1([...array1].concat(newTodo));
    setTodo("");
  }

  function Remove(id) {
    let updatedarray1 = [...array1].filter((todo) => todo.id !== id);
    setarray1(updatedarray1);
  }

  function toggle_Complete(id) {
    let updatedarray1 = [...array1].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setarray1(updatedarray1);
  }

  function Update(id) {
    const updatedarray1 = [...array1].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setarray1(updatedarray1);
    Modify(null);
  }

  return (
    <div id="todo-list">
      <h1>TODO LIST</h1>
      <form onSubmit={handle_Submit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add</button>
      </form>
      {array1.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggle_Complete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className="todo-actions">
            {todo.id === todoEditing ? (
              <button onClick={() => Update(todo.id)}>Update</button>
            ) : (
              <button onClick={() => Modify(todo.id)}>Modify</button>
            )}

            <button onClick={() => Remove(todo.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;