export const EditingForm = ({
    editingText,
    onChange,
    onSave,
    onCancel,
}) => {

    return (
        <div className="list-low">
            <input
            value={editingText}
            onChange={onChange}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSaveEdit();
                if (e.key === "Escape") onCancelEdit();
            }}
            autoFocus
            />
            <button onClick={onSave}>保存</button>
            <button onClick={onCancel}>キャンセル</button>
        </div>
    );
};