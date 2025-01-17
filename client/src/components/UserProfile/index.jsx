import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/usersSlice";

const UserProfile = () => {
  const {
    userCurrent,
    isPending,
    error,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(5));
  }, [dispatch]);

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {!error && !isPending && userCurrent &&(
        <article>
          <h2>User Profile</h2>
          <p>First name: {userCurrent.firstName}</p>
          <p>Last name: {userCurrent.lastName}</p>
          <p>Email: {userCurrent.email}</p>
        </article>
      )}
    </div>
  );
};

export default UserProfile;
