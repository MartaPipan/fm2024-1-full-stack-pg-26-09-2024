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
