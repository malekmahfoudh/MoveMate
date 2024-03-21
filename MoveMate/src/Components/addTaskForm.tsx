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
      <div className="input_fields">
        <input
          type="text"
          value={task}
          placeholder="Title                                       "
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          value={comment}
          placeholder="Comment                           "
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button className="add_task-btn" onClick={() => onAdd(task, comment)}>
        Add New ToDo
      </button>
    </div>
  );
};

export default AddTaskForm;
