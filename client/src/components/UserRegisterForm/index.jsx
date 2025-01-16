import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/usersSlice";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  birthday: "",
  isMale: true,
  avatar: null,
};
const UserRegisterForm = () => {
  const dispatch = useDispatch();
  const onSubmit = (values, formikBag) => {
    dispatch(createUser(values));
    formikBag.resetForm();/**useDispatch: ініціалізація Redux-диспетчера для відправки даних.
onSubmit:
Отримує значення форми (values).
Викликає дію createUser, передаючи в неї значення форми.
Скидає форму (formikBag.resetForm()).
 */
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => {
        const handleAvatar = ({ target }) => {
          formikProps.setFieldValue("avatar", target.files[0]);
        };
      /**initialValues: передає початковий стан.
onSubmit: функція, яка викликається при надсиланні форми.
formikProps: об'єкт із методами та станом форми.
setFieldValue: дозволяє оновлювати значення конкретного поля форми.
handleAvatar: спеціальний обробник для додавання файлу аватара.
 */
        return (
          <Form encType="multipart/form-data">
            <label>
              avatar:
              <input name="avatar" type="file" onChange={handleAvatar} />
              <ErrorMessage name="avatar" />
            </label>
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
        );
      }}
    </Formik>
  );
};

export default UserRegisterForm;

/**
 * Formik: використовується для спрощення роботи з формами.
Formik — обгортка, яка управляє станом форми та її логікою.
Form — заміна стандартного HTML-елемента <form>.
Field — автоматично пов'язує інпут із станом форми.
ErrorMessage — відображає помилки валідації для конкретного поля.
useDispatch: хук із Redux, який дозволяє викликати дії (actions) для зміни стану Redux.
createUser: Redux-дія, яка відправляє дані користувача до бекенду.

 */