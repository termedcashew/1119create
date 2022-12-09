import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [users, setusers] = useState([]);
  const [database, setdatabase] = useState([]);
  const [error, setError] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const fetchusers = async() => {
    try {      
      const response = await axios.get("/api/users");
      setusers(response.data);
    } catch(error) {
      setError("error retrieving users: " + error);
    }
  }
    const fetchdatabase = async() => {
    try {      
      const response = await axios.get("/api/database");
      setdatabase(response.data);
    } catch(error) {
      setError("error retrieving users: " + error);
    }
  }
  const createuser = async() => {
    try {
      await axios.post("/api/users", {username: username, password: password});
    } catch(error) {
      setError("error adding a user: " + error);
    }
  }
  const adddatabase = async(user) => {
    try {
      await axios.post("/api/database/" + user.id, {username: user.username});
    } catch(error) {
      setError("error adding to database" + error);
    }
  }
  const removedatabase = async(user) => {
    try {
      if (user.quantity<= 1 ) {deletedatabase(user);}
      else {
        await axios.post("/api/database/minus/" + user.id);
      }
    } catch(error) {
      setError("error removing from database" + error);
    }
  }
  const deletedatabase = async(user) => {
    try {
      await axios.delete("/api/database/" + user.id);
    } catch(error) {
      setError("error deleting database" + error);
    }
  }
  

  // fetch ticket data
  useEffect(() => {
    fetchusers();
  },[]);

  const adduser = async(e) => {
    e.preventDefault();
    await createuser();
    fetchusers();
    setusername("");
    setpassword("");
  }

  const addTodatabase = async(user) => {
    //turn into mongo text to be stored as mongo
    
    console.log(user);
    await adddatabase(user);
    fetchdatabase();
  }
  const removeFromdatabase = async(user) => {
    await removedatabase(user);
    fetchdatabase();
  }
  const deleteFromdatabase = async(user) => {
    await deletedatabase(user);
    fetchdatabase();
  }

  // render results
  console.log(database);
  return (
    <div className="App">
      {error}
      <h1>Users</h1>
      <p>Sign Up For a Free Account</p>
        <form onSubmit={e => createuser(this.user)}> <input className="form-input"
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={e => createuser(this.user ={username: })}
          />
          <button onClick={e => addTodatabase(this.user = {username: [document.getElementById('form-input')]})}>Add to Database</button>
          <button>Test</button>
          </form>
      {users.map( user => (
        <div key={user.id} className="user">
            {user.username},{user.password}

        </div>

      ))}
      <h1>Database</h1>
      {database.map( user => (

          <div key={user.id}>
            {user.name},{user.quantity}
          <button onClick={e => removeFromdatabase(user)}>-</button>
          <button onClick={e => addTodatabase(user)}>+</button>
          <button onClick={e => deleteFromdatabase(user)}>Remove from database</button>
        </div>
      ))}  
   
      
        <p>https://github.com/termedcashew/1119create</p>
    </div>
  );
}

export default App;