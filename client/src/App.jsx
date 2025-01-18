import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserDeletePage from "./pages/UserDeletePage";
import UserUpdatePage from "./pages/UserUpdatePage";


function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/users" element={<UsersPage/>} />
        <Route path="/users" element={<UserRegisterPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/users/:userId" element={<UserDeletePage />} />
        <Route path="/users/:userId" element={<UserUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/**
        <Route path="/users/:userId/tasks/:taskId" element={<Task/>} />
        <Route path="/users/:userId/groups" element={<Groups/>} />
        <Route path="/users/:userId/groups/:groupId" element={<Group/>} />
        <Route path="/users/:userId/groups/:groupId/messages" element={<Messages/>} />
        <Route path="/users/:userId/groups/:groupId/messages/:messageId" element={<Message/>} />*/