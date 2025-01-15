import { useSelector, useDispatch } from 'react-redux';
import Task from './Task';
import { sortByDate } from '../../store/todoSlice';

const TodoList = () => {
  const { tasks } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const showTasks = (task) => <Task key={task.id} task={task} />;
  const handleSortByDate = () => {dispatch(sortByDate())}
  return (
    <section>
      <h2>tasks list</h2>
      <button onClick={handleSortByDate}>sort by date</button>
      {tasks.map(showTasks)}
    </section>
  );
};

export default TodoList;
