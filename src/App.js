import React, { useState, useEffect } from "react";

import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (ename, sdate, edate, stime, etime, status) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {
          name: ename,
          sdate: sdate,
          edate: edate,
          stime: stime,
          etime: etime,
          status: status,
          id: Math.random().toString(),
        },
      ];
    });
  };
  const data = JSON.parse(localStorage.getItem("events"));
  console.log("app", data);

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList events={data?data:[]} />
    </div>
  );
}

export default App;
