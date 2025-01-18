import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/usersSlice";

const UsersList = () => {
  const { users, error, isPending } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // Локальний стан для відстеження сторінки
  const [currentPage, setCurrentPage] = useState(1);
  const amountPerPage = 6;

  // Завантаження користувачів при зміні сторінки
  useEffect(() => {
    dispatch(getUsers({ page: currentPage, amount: amountPerPage }));
  }, [dispatch, currentPage]);

  // Відображення користувачів
  const mapUsers = (user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.email}</Link>

      adicione delete user +butom for delete user after user link  >>>
    </li>
  );

  // Обробники для перемикання сторінок
  const handleNextPage = () => setCurrentPage((currentPage) => currentPage + 1);
  const handlePrevPage = () => setCurrentPage((currentPage) => currentPage - 1);

  return (
    <div>
      {error && <p>{error}</p>}
      {isPending && <p>Loading....</p>}
      {!error && !isPending && users.length === 0 ? (
        <p>Users list is empty</p>
      ) : (
        <>
          <ol>{users.map(mapUsers)}</ol>
          <>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={users.length < amountPerPage}>
              Next
            </button>
          </>
        </>
      )}
    </div>
  );
};

export default UsersList;
