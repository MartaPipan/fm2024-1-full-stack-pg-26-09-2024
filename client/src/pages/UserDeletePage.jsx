import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/usersSlice";

const UserDeletePage = () => {
  const { userId } = useParams(); // Отримання userId з URL
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(Number(userId))); // Перетворення userId у число
    alert("User has been deleted successfully!");
  };

  return (
    <div>
      <h1>Delete User</h1>
      <button onClick={handleDelete}>Confirm Delete</button>
    </div>
  );
};

export default UserDeletePage;
