import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Modal from "./modal";
import AddTaskForm from "./addTaskForm";
import "../Styles/TodoList.scss";

interface Todo {
  id: string;
  task: string;
  comment?: string;
  isCompleted: boolean;
}

interface TodoListProps {
  user: User | null;
}

const TodoList: React.FC<TodoListProps> = ({ user }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "todos"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosData: Todo[] = [];
        querySnapshot.forEach((doc) => {
          todosData.push({ id: doc.id, ...doc.data() } as Todo);
        });
        setTodos(todosData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const addTodo = async (task: string, comment: string = ""): Promise<void> => {
    if (user && user.uid) {
      await addDoc(collection(db, "todos"), {
        task: task,
        comment: comment,
        isCompleted: false,
        userId: user.uid,
      });
    } else {
      console.error("User not logged in");
    }
  };

  const toggleTodoCompletion = async (
    id: string,
    isCompleted: boolean
  ): Promise<void> => {
    await updateDoc(doc(db, "todos", id), {
      isCompleted: isCompleted,
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: isCompleted } : todo
      )
    );
  };

  const deleteTodo = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "todos", id));
  };

  const openModalToAdd = (): void => {
    setIsModalOpen(true);
    setModalContent(<AddTaskForm onAdd={addTodo} />);
  };

  const openModalToView = (todo: Todo): void => {
    setIsModalOpen(true);
    setModalContent(
      <div className="todo_modal">
        <h2>{todo.task}</h2>
        <p>{todo.comment ? todo.comment : "Inga kommentarer"}</p>
        <button className="delete_btn" onClick={() => deleteTodo(todo.id)}>
          Radera Todo
        </button>
      </div>
    );
  };

  const closeModal = (): void => setIsModalOpen(false);

  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <>
      <div className="todoList">
        <ul>
          {incompleteTodos.map((todo) => (
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
                onChange={(e) =>
                  toggleTodoCompletion(todo.id, e.target.checked)
                }
              />
            </li>
          ))}
        </ul>
        <button className="addNewTask_btn" onClick={openModalToAdd}>
          Lägg till Todo
        </button>
        <ul>
          {completedTodos.map((todo) => (
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
                onChange={(e) =>
                  toggleTodoCompletion(todo.id, e.target.checked)
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default TodoList;
