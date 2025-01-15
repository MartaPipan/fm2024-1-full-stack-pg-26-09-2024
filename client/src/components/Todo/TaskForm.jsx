import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todoSlice';
import styles from './Todo.module.scss';

const TaskForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(addTask({ ...values }));
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={{ content: '', date: '' }} onSubmit={onSubmit}>
      <Form className={styles.form}>
        <Field name="content" />
        <Field name="date" type="date" />
        <input type="submit" />
      </Form>
    </Formik>
  );
};

export default TaskForm;
