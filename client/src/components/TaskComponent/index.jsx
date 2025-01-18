import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "../../store/tasksSlice";

const TaskComponent = ({ userId, taskId }) => {
  const dispatch = useDispatch();

  // Стан для поточної задачі
  const { taskCurrent, error, isPending } = useSelector((state) => state.tasks);

  // Завантаження задачі при зміні taskId
  useEffect(() => {
    if (userId && taskId) {
      dispatch(getTask({ userId: Number(userId), taskId: Number(taskId) }));
    }
  }, [dispatch, userId, taskId]);

  return (
    <div>
      {error && <p>Error fetching task: {error}</p>}
      {isPending && <p>Loading task...</p>}
      {!error && !isPending && taskCurrent && (
        <div>
          <h3>Task Details</h3>
          <p>ID: {taskCurrent.id}</p>
          <p>Content: {taskCurrent.content}</p>
          <p>Deadline: {taskCurrent.deadline}</p>
        </div>
      )}
    </div>
  );
};

// Перевірка типів пропсів
TaskComponent.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  taskId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TaskComponent;
