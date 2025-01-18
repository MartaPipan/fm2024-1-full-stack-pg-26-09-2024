import UserRegisterForm from "../../components/UserRegisterForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../store/usersSlice";
import { useEffect, useState } from "react";

const UserUpdate = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userCurrent, isPending, error } = useSelector((state) => state.users);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    isMale: true,
    avatar: null,
  });

  // Завантаження користувача при відкритті сторінки
  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // Оновлення initialValues, коли дані користувача змінюються
  useEffect(() => {
    if (userCurrent) {
      setInitialValues({
        ...userCurrent,
        password: "", // Пароль не відображається, залишаємо поле порожнім
      });
    }
  }, [userCurrent]);

  // Сабміт форми
  const handleSubmit = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "avatar" && value) {
        formData.append(key, value); // Додаємо файл, якщо він існує
      } else {
        formData.append(key, value);
      }
    });
    dispatch(updateUser(userId, formData));
    alert("User has been updated successfully!");
  };

  return (
    <div>
      <h1>Update User</h1>
      {error && <p>{error}</p>}
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <UserRegisterForm initialValues={initialValues} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default UserUpdate;
