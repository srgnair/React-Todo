import { EditingForm } from "./EditingForm";

export const CompleteTodos = (props) => {
  const { 
    todos, 
    onClickBack,  
    editing,
    editingText,
    onStartEdit,
    onChangeEditingText,
    onSaveEdit,
    onCancelEdit, 
  } = props;

  return (
    <div className="complete-area">
      <p className="title">完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
          const isEditing =
            editing && editing.list === "complete" && editing.index === index;

          return (
            <li key={index}>
              {isEditing ? (
                <EditingForm 
                  editingText={editingText}
                  onChange={onChangeEditingText}
                  onSave={onSaveEdit}
                  onCancel={onCancelEdit}
                />
              ) : (
                <div className="list-low">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onStartEdit("complete", index)}>
                    編集
                  </button>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};