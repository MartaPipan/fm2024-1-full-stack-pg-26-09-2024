import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser} from "../../store/usersSlice";

const UserDelete = () => {
  const { userId } = useParams(); // Отримання userId з URL
  const {
    userCurrent,//Отримання даних користувача з Redux
    isPending,
    error,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(deleteUser(Number(userId))); // Перетворення userId у число
    alert("User has been deleted successfully!");
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {!error && !isPending && userCurrent && (
        <article>
            <p>Are you sure you want to delete {userCurrent.firstName} {userCurrent.lastName}?</p>
          <button onClick={handleDelete}>Confirm Delete</button>
        </article>
      )}
    </div>
  );
};  
export default UserDelete;
