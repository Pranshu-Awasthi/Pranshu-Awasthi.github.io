import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import Loading from "./Components/Loading";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const listener = auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
    return () => listener();
  }, [dispatch]);

  const removeRoom = (roomid) => {
    db.collection("Rooms")
      .doc(roomid)
      .delete()
      .then(() => {
        alert("Room Deleted");
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/" exact>
                <Sidebar hide={false} />
                <Chat hide={true} removeRoom={removeRoom} />
                <div className="project__info">
                  <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/f7ce033a-831a-42af-8ac0-6ae8ae66cc6d/d5mwe2v-a84d7b67-1a16-44a9-b3ba-cad774f0db8a.png"
                    alt=""
                  />
                  <div className="text">
                    <h1>Major Project - II : LRU Cache Implementation</h1>
                    <p>- Pranshu Awasthi ( 18102276 ) & Anubhav Srivastava ( 9918102025 )</p>
                    <p>- Supervisor : Dr. Ajay Kumar</p>
                  </div>
                </div>
              </Route>
              <Route path="/rooms/:roomId">
                <Sidebar hide={true} />
                <Chat hide={false} removeRoom={removeRoom} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
