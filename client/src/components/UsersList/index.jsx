import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/usersSlice";

const UsersList = () => {
  const { users, error, isPending } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const mapUsers = (user) => <li key={user.id}>{user.email}</li>;

  useEffect(() => {
      dispatch(getUsers({ page: 1, amount: 5 }));//effect request users 
    //eslint-disable-next-line  
  }, []); //one time request
  return (
    <>
      {error && <p>{error}</p>}
      {isPending && <p>Loading....</p>}
      {!error && !isPending && users.length === 0 ? (
        <p>users list empty</p>
      ) : (
        <ol>{users.map(mapUsers)}</ol>
      )}
    </>
  );
};

export default UsersList;
