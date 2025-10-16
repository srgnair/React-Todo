export const IncompleteTodos = (props) => {
  const { 
    todos, 
    onClickComplete, 
    onClickDelete, 
    editing,
    editingText,
    onStartEdit,
    onChangeEditingText,
    onSaveEdit,
    onCancelEdit, } = props;
    return (
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {todos.map((todo, index) => {
            const isEditing =
              editing && editing.list === "incomplete" && editing.index === index;
  
            return (
              <li key={index}>
                  {isEditing ? (
                    <div className="list-low">
                      <input
                        value={editingText}
                        onChange={onChangeEditingText}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") onSaveEdit();
                          if (e.key === "Escape") onCancelEdit();
                        }}
                        autoFocus
                      />
                      <button onClick={onSaveEdit}>保存</button>
                      <button onClick={onCancelEdit}>キャンセル</button>
                    </div>
                  ) : (
                    <div className="list-low">
                      <p className="todo-item">{todo}</p>
                      <button onClick={() => onStartEdit("incomplete", index)}>
                        編集
                      </button>
                      <button onClick={() => onClickComplete(index)}>完了</button>
                      <button onClick={() => onClickDelete(index)}>削除</button>
                    </div>
                  )}

              </li>
            );
          })}
        </ul>
      </div>
    );
  };