import React, { useState } from "react";
import Modal from "./modal";
import "../Styles/TodoList.scss";

interface Todo {
  id: number;
  task: string;
  comment?: string;
  reminder?: Date;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      task: "First todo",
      comment: "First comment",
      reminder: new Date(),
      isCompleted: false,
    },
    {
      id: 2,
      task: "Second todo",
      comment: "Second comment",
      reminder: new Date(),
      isCompleted: false,
    },
    {
      id: 3,
      task: "Third todo",
      comment: "Third comment",
      reminder: new Date(),
      isCompleted: false,
    },
    {
      id: 4,
      task: "Fourth todo",
      comment: "Fourth comment",
      reminder: new Date(),
      isCompleted: false,
    },
  ]);

  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");
  const [reminder, setReminder] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const toggleTodoCompletion = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const addTodo = (): void => {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo: Todo = {
      id: newId,
      task,
      comment,
      reminder: reminder ? new Date(reminder) : undefined,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
    setComment("");
    setReminder(undefined);
    setIsModalOpen(false);
  };

  const openModalToAdd = (): void => {
    setTask("");
    setComment("");
    setReminder(undefined);

    setModalContent(
      <>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add todo"
        />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comment"
        />
        <input
          type="date"
          value={reminder || ""}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Add reminder"
        />
        <button onClick={addTodo}>Add Todo</button>
      </>
    );
    setIsModalOpen(true);
  };

  const openModalToView = (todo: Todo): void => {
    setModalContent(
      <>
        <h2>{todo.task}</h2>
        <p>{todo.comment ? todo.comment : "No additional comment"}</p>
        <p>
          {todo.reminder ? todo.reminder.toLocaleDateString() : "No set date"}
        </p>
      </>
    );
    setIsModalOpen(true);
  };

  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <div className="todoList">
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => openModalToView(todo)}
              style={{ cursor: "pointer" }}
            >
              {todo.task}
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleTodoCompletion(todo.id)}
              />
            </li>
          ))}
        </ul>
        <button className="addNewTask_btn" onClick={openModalToAdd}>
          Add New Task
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default TodoList;
