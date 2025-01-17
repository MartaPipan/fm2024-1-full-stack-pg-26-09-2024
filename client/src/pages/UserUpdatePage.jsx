import UserRegisterForm from "../components/UserRegisterForm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/usersSlice";

const UserUpdatePage = () => {
    const { userId } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(updateUser(userId, values));
    alert("User has been updated successfully!");
  };

  return (
    <div>
      <h1>Update User</h1>
      <UserRegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UserUpdatePage;
