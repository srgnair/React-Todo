import { useEffect, useState } from 'react';
import './App.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState(() =>
  JSON.parse(localStorage.getItem("incompleteTodos") || []));
  const [completeTodos, setCompleteTodos] = useState(() =>
  JSON.parse(localStorage.getItem("completeTodos") || []));
  const [editing, setEditing] = useState(null); 
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [incompleteTodos, completeTodos]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  const onStartEdit = (list, index) => {
    setEditing({ list, index });
    const current =
      list === "incomplete" ? incompleteTodos[index] : completeTodos[index];
    setEditingText(current);
  };

  const onChangeEditingText = (e) => setEditingText(e.target.value);

  const onSaveEdit = () => {
    if (!editing) return;
    const { list, index } = editing;
    const text = editingText.trim();
    if (text === "") return;

    if (list === "incomplete") {
      const next = [...incompleteTodos];
      next[index] = text;
      setIncompleteTodos(next);
    } else {
      const next = [...completeTodos];
      next[index] = text;
      setCompleteTodos(next);
    }

    setEditing(null);
    setEditingText("");
  };

  const onCancelEdit = () => {
    setEditing(null);
    setEditingText("");
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <div style={{ color: 'red' }}>
          <p>未完了のTODOの数が登録できる上限に達したよ</p>
          <p>完了させよう！！</p>
        </div>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickDelete={onClickDelete}
        onClickComplete={onClickComplete}
        editing={editing}
        editingText={editingText}
        onStartEdit={onStartEdit}
        onChangeEditingText={onChangeEditingText}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
      />
      <CompleteTodos
        todos={completeTodos}
        onClickBack={onClickBack}
        editing={editing}
        editingText={editingText}
        onStartEdit={onStartEdit}
        onChangeEditingText={onChangeEditingText}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit} 
      />
    </>
  );
};
