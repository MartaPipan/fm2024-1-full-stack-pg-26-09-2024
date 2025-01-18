import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/usersSlice";

const UserProfile = () => {
  const { userId } = useParams();
  const { userCurrent, isPending, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(Number(userId)));
    // eslint-disable-next-line
  }, []); //

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {!error && !isPending && userCurrent && (
        <article>
          <h2>User Profile</h2>
          <p>First name: {userCurrent.firstName}</p>
          <p>Last name: {userCurrent.lastName}</p>
          <p>Email: {userCurrent.email}</p>
          {userCurrent.avatar ? (
            <img
              src={`http://localhost:3000/images/${userCurrent.avatar}`}
              alt={userCurrent.email}
            />
          ) : (
            <img src="/user-profile.png" alt="noname" />
          )}
        </article>
      )}
    </div>
  );
};

export default UserProfile;
