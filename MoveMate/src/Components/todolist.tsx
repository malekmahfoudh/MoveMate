import React, { useState } from "react";
import Modal from "./modal";
import AddTaskForm from "./addTaskForm";
import "../Styles/TodoList.scss";

interface Todo {
  id: number;
  task: string;
  comment?: string;
  isCompleted: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      task: "First todo",
      comment: "First comment",
      isCompleted: false,
    },
    {
      id: 2,
      task: "Second todo",
      comment: "Second comment",
      isCompleted: false,
    },
    {
      id: 3,
      task: "Third todo",
      comment: "Third comment",
      isCompleted: false,
    },
    {
      id: 4,
      task: "Fourth todo",
      comment: "Fourth comment",
      isCompleted: false,
    },
  ]);

  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");
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
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
    setComment("");
    setIsModalOpen(false);
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
    closeModal();
  };

  const openModalToAdd = (): void => {
    setModalContent(
      <AddTaskForm onAdd={(task, comment) => {
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
        const newTodo: Todo = {
          id: newId,
          task,
          comment,
          isCompleted: false,
        };
  
        setTodos([...todos, newTodo]);
        closeModal();
      }} />
    );
    setIsModalOpen(true);
  };

  const openModalToView = (todo: Todo): void => {
    setModalContent(
      <>
        <h2>{todo.task}</h2>
        <p>{todo.comment ? todo.comment : "No additional comment"}</p>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default TodoList;
