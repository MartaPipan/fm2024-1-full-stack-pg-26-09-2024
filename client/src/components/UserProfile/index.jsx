import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/usersSlice";
import { getTasks } from "../../store/tasksSlice";

const UserProfile = () => {
  const { userId } = useParams();
  const { userCurrent, isPending, error } = useSelector((state) => state.users);
  const {
    tasks,
    error: errorTasks,
    isPending: isPendingTasks,
  } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [showTasksState, setShowTasksState] = useState(false);

  useEffect(() => {
    dispatch(getUser(Number(userId)));
  }, [dispatch, userId]);

  const toggleTasks = () => {
    if (!showTasksState) {
      dispatch(getTasks(userId));
    }
    setShowTasksState((prevState) => !prevState);
  };

    // Завантаження конкретної задачі
  const fetchTask = (taskId) => {
    setSelectedTaskId(taskId);
    dispatch(getTask({ userId: Number(userId), taskId }));
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {!error && !isPending && userCurrent && (
        <article>
          <h2>User Profile</h2>
          <p>First name: {userCurrent.firstName}</p>
          <p>Last name: {userCurrent.lastName}</p>
          <p>Email: {userCurrent.email}</p>
          {userCurrent.avatar ? (
            <img
              src={`http://localhost:3000/images/${userCurrent.avatar}`}
              alt={userCurrent.email}
            />
          ) : (
            <img src="/user-profile.png" alt="noname" />
          )}

          {/* Botão para alternar entre mostrar/ocultar tarefas */}
          <button onClick={toggleTasks} disabled={isPendingTasks}>
            {isPendingTasks
              ? "Loading..."
              : showTasksState
              ? "Hide tasks"
              : "Show tasks"}
          </button>

          {/* Lista de tarefas */}
          {showTasksState && (
            <ol>
              {errorTasks && <p>{errorTasks}</p>}
              {isPendingTasks && <p>Loading tasks...</p>}
              {!errorTasks &&
                !isPendingTasks &&
                Array.isArray(tasks) &&
                tasks.length === 0 && <p>No tasks found</p>}
              {!errorTasks &&
                !isPendingTasks &&
                Array.isArray(tasks) &&
                tasks.map((task) => (
                  <li key={task.id}>{task.content}</li>
                ))}
            </ol>
          )}
        </article>
      )}
    </div>
  );
};

export default UserProfile;

/**Щоб отримати лише одну задачу для користувача, потрібно створити відповідну логіку, яка викликатиме getTask з потрібним taskId(Завантажувати всі задачі користувача, Вибирати одну задачу для перегляду її деталей.)
 * import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/usersSlice";
import { getTasks, getTask } from "../../store/tasksSlice";

const UserProfile = () => {
  const { userId } = useParams();
  const { userCurrent, isPending, error } = useSelector((state) => state.users);
  const {
    tasks,
    error: errorTasks,
    isPending: isPendingTasks,
    taskCurrent, // Додаємо стан для поточної задачі
    error: errorTask,
  } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const [showTasksState, setShowTasksState] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Завантаження користувача
  useEffect(() => {
    dispatch(getUser(Number(userId)));
  }, [dispatch, userId]);

  // Завантаження задач
  const toggleTasks = () => {
    if (!showTasksState) {
      dispatch(getTasks(userId));
    }
    setShowTasksState((prevState) => !prevState);
  };

  // Завантаження конкретної задачі
  const fetchTask = (taskId) => {
    setSelectedTaskId(taskId);
    dispatch(getTask({ userId: Number(userId), taskId }));
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading user...</p>}
      {userCurrent && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userCurrent.name}</p>
          <button onClick={toggleTasks}>
            {showTasksState ? "Hide Tasks" : "Show Tasks"}
          </button>
        </div>
      )}

      {showTasksState && (
        <div>
          <h3>Tasks</h3>
          {isPendingTasks && <p>Loading tasks...</p>}
          {errorTasks && <p>{errorTasks}</p>}
          {!isPendingTasks && tasks.length > 0 && (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.content}
                  <button onClick={() => fetchTask(task.id)}>View Details</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedTaskId && taskCurrent && (
        <div>
          <h3>Task Details</h3>
          <p>ID: {taskCurrent.id}</p>
          <p>Content: {taskCurrent.content}</p>
          <p>Deadline: {taskCurrent.deadline}</p>
        </div>
      )}

      {errorTask && <p>Error fetching task: {errorTask}</p>}
    </div>
  );
};

export default UserProfile;

 */