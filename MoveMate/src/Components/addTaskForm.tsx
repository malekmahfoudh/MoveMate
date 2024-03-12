import React, { useState } from "react";
import "../Styles/AddTaskForm.scss";

interface AddTaskFromProps {
  onAdd: (task: string, comment: string) => void;
}

const AddTaskForm: React.FC<AddTaskFromProps> = ({ onAdd }) => {
  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="addTodo_modal">
      <input
        type="text"
        value={task}
        placeholder="Title"
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        value={comment}
        placeholder="Comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={() => onAdd(task, comment)}>Add</button>
    </div>
  );
};

export default AddTaskForm;
