import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {removeTask, setDoneTask} from '../../store/todoSlice';
import styles from './Todo.module.scss'

const Task = (props) => {
  const {
    task: { id, content, isDone, date },
  } = props;
  const dispatch = useDispatch();
  const handleIsDone = ()=>{dispatch(setDoneTask({id}))}
  const handleRemove = ()=>{dispatch(removeTask({id}))}
  return (
    <article className={styles.task}>
      <h3>{content}</h3>
      <p>{date}</p>
      <input type="checkbox" checked={isDone} onChange={handleIsDone} />
      <span onClick={handleRemove}>X</span>
    </article>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isDone: PropTypes.bool,
    date: PropTypes.string,
  }),
};

export default Task;
