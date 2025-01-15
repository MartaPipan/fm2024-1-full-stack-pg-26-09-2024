import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, sub } from '../../store/countSlice';

const Counter = () => {
  const [step] = useState(5);
  const { count } = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const handleAdd = () => dispatch(add({step}));
  const handleSub = () => dispatch(sub({step}));
  return (
    <div>
      <h2>count: {count}</h2>
      <button onClick={handleAdd}>+</button>
      <button onClick={handleSub}>-</button>
    </div>
  );
};

export default Counter;
