import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import HomePage from "./pages/HomePage";
import UsersList from "./components/UsersList";
import UserRegisterForm from "./components/UserRegisterForm";

function App() {
  return (
    <BrowserRouter>
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/users" element={<UsersList/>} />
        <Route path="/users/:userId/tasks" element={<UserRegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


/**<Route path="/users/:userId" element={<User/>} />
        <Route path="/users/:userId/tasks/:taskId" element={<Task/>} />
        <Route path="/users/:userId/groups" element={<Groups/>} />
        <Route path="/users/:userId/groups/:groupId" element={<Group/>} />
        <Route path="/users/:userId/groups/:groupId/messages" element={<Messages/>} />
        <Route path="/users/:userId/groups/:groupId/messages/:messageId" element={<Message/>} />*/