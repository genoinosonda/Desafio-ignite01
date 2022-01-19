import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    let idTask = Math.floor(Math.random() * 15000);
    console.log(idTask);
    console.log(newTaskTitle);

    if (newTaskTitle != "") {
      // Populando objeto do tipo Task
      const task: Task = {
        id: idTask,
        title: newTaskTitle,
        isComplete: false,
      };

      // Decompondo Usestate tasks e adicionando em sequência uma nova task
      // O Usestate não realiza um append automático do novo valor passado,
      //  é necessário informar todos os valores
      setTasks([...tasks, task]);

      setNewTaskTitle("");
    } else {
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    tasks.map((task) => {
      if (task.id == id) {
        task.isComplete = !task.isComplete;
      }
    });

    // Novamente, é necessário realizar um decompose pelo fato da imutabilidade
    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    tasks.map((task) => {
      if (task.id == id) {
        // O metodo splice remove um valor dentro de um array
        tasks.splice(tasks.indexOf(task), 1);
      }
    });

    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
