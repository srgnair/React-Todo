export const CompleteTodos = (props) => {
  const { 
    todos, 
    onClickBack,  
    editing,
    editingText,
    onStartEdit,
    onChangeEditingText,
    onSaveEdit,
    onCancelEdit, } = props;
    return (
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {todos.map((todo, index) => {
            const isEditing =
              editing && editing.list === "complete" && editing.index === index;
  
            return (
              <li key={index}>
                <div className="list-row">
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
                      <button onClick={() => onStartEdit("complete", index)}>
                        編集
                      </button>
                      <button onClick={() => onClickBack(index)}>戻す</button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };