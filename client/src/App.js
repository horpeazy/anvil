import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import OldCodeSpace from './Components/Editor/OldCodeSpace';
import NewCodeSpace from './Components/Editor/NewCodeSpace';
import GithubCallback from './Components/AuthCallbacks/GithubCallback';
import GoogleCallback from './Components/AuthCallbacks/GoogleCallback';
import GitlabCallback from './Components/AuthCallbacks/GitlabCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/p/codespace/:projectId" element={<OldCodeSpace />}></Route>
        <Route path="/n/codespace" element={<NewCodeSpace />}></Route>
        <Route path="/login/github/cb" element={<GithubCallback />}></Route>
        <Route path="/login/google/cb" element={<GoogleCallback />}></Route>
        <Route path="/login/gitlab/cb" element={<GitlabCallback />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
