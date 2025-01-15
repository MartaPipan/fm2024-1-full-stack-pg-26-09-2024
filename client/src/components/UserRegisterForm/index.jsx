import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { createUser } from '../../store/usersSlice';
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: '',
  isMale: true,
};

const UserRegisterForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
    formikBag.resetForm();
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <label>
          first name:
          <Field name="firstName" />
          <ErrorMessage name="firstName" />
        </label>
        <label>
          last name:      
          <Field name="lastName" />
          <ErrorMessage name="lastName" />
        </label>
        <label>
          email:      
          <Field name="email" type="email" />  
          <ErrorMessage name="email" />
        </label>  
        <label>
          password:      
          <Field name="password" type="password" />
          <ErrorMessage name="password" />  
        </label>
        <label>  
          birthday:      
          <Field name="birthday" type="date" />    
          <ErrorMessage name="birthday" />
        </label> 
        <label>
          gender:
          <Field name="isMale" type="checkbox" />
        </label>
        <button type="submit">register</button>
      </Form>
    </Formik>
  );
};

export default UserRegisterForm;


