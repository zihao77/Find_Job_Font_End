import { Message } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Regist from './components/Regist/Regist';
import MessageBox from './components/MessageBox/MessageBox';
import JobMarket from './components/JobMarket/JobMarket';
import JobTrack from './components/JobTrack/JobTrack';
import PostMoment from './components/PostMoment/PostMoment'
import UserDashboard from './components/UserDashboard/UserDashboard';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard'
import IndividualProfile from './components/IndividualProfile/IndividualProfile';
import AddWork from './components/Experience/AddWork';
import UpdateWork from './components/Experience/UpdateWork';
import AddStudy from './components/Experience/AddStudy';

const AuthContext = React.createContext(null);

function PrivateRouterUser(props) {
  const data = useContext(AuthContext);
  if (!data.token) {
    return <Navigate to='/Login' replace={true}></Navigate>
  }

  if (data.role == 1) {
    return <Navigate to='/CompanyDashboard' replace={true}></Navigate>
  }

  return props.children;
}

function PrivateRouterCompany(props) {
  const data = useContext(AuthContext);
  if (!data.token) {
    return <Navigate to='/Login' replace={true}></Navigate>
  }

  if (data.role == 0) {
    return <Navigate to='/UserDashboard' replace={true}></Navigate>
  }

  return props.children;
}

function PrivateRouter(props) {
  const data = useContext(AuthContext);
  if (!data.token) {
    return <Navigate to='/Login' replace={true}></Navigate>
  }
  return props.children;
}

//hook of token
function useToken() {
  function getToken() {
    return sessionStorage.getItem("token")
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    sessionStorage.setItem("token", userToken);
    setToken(userToken);
  }

  return {
    setToken: saveToken,
    token
  }

}

//hook of role
function useRole() {
  function getRole() {
    return sessionStorage.getItem("role");
  }

  const [role, setRole] = useState(getRole());

  function saveRole(userRole) {
    sessionStorage.setItem("role", userRole);
    setRole(userRole);
  }

  return {
    setRole: saveRole,
    role
  }
}

//hook of Uid
function useUid() {
  function getUid() {
    return sessionStorage.getItem("uid");
  }

  const [uid, setUid] = useState(getUid());

  function saveUid(userUid) {
    sessionStorage.setItem("uid", userUid);
    setUid(userUid);
  }

  return {
    setUid: saveUid,
    uid
  }
}

function App() {
  const { token, setToken } = useToken();
  const { uid, setUid } = useUid();
  const { role, setRole } = useRole();

  useEffect(function () {
    console.log(token)
    console.log(uid);
    console.log(role);
  })



  let logout = async () => {
    let data = await fetch('http://18.117.128.141:5000/user/logout', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uid": uid,
        "token": token
      })
    }).then(res => res.json())
    console.log(data)
    if (data["code"] == 200) {
      setToken(undefined);
      setRole(undefined);
      setUid(undefined);
    } else {
      alert("log out fail");
    }
  }

  return (
    <div>
      {/* <h1>Application</h1> */}
      <AuthContext.Provider value={{
        "token": token,
        "role": role
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/PostMoment" element={<PrivateRouter>
              <PostMoment logout={logout} uid={uid} token={token} role={role} />
            </PrivateRouter>}>
            </Route>
            <Route path="/Message" element={<PrivateRouter>
              <MessageBox logout={logout} />
            </PrivateRouter>}>
            </Route>

            <Route path="/Login" element={<Login setToken={setToken} setUid={setUid} setRole={setRole} />}></Route>
            <Route path="/Regist" element={<Regist setToken={setToken} setUid={setUid} setRole={setRole} />}></Route>
            <Route path="/UserDashboard" element={<PrivateRouterUser>
              <UserDashboard uid={uid} token={token} logout={logout} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/JobMarket" element={<PrivateRouterUser>
              <JobMarket logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/JobTrack" element={<PrivateRouterUser>
              <JobTrack logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/IndividualProfile" element={<PrivateRouterUser>
              <IndividualProfile logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/AddWork" element={<PrivateRouterUser>
              <AddWork logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/UpdateWork" element={<PrivateRouterUser>
              <UpdateWork logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>
            <Route path="/AddStudy" element={<PrivateRouterUser>
              <AddStudy logout={logout} uid={uid} token={token} />
            </PrivateRouterUser>}>
            </Route>

            <Route path="/CompanyDashboard" element={<PrivateRouterCompany>
              <CompanyDashboard logout={logout} uid={uid} token={token} />
            </PrivateRouterCompany>}>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));