import { useState } from 'react';
import './App.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    address: '',
    number: '',
    name: '',
    id: '',
    lastname: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'number' && value.length <= 13) {
      if (/^\+?\d*$/.test(value)) {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      }
    } else if (name === 'id' && value.length <= 13) {
      if (/^\d*$/.test(value)) {
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      }
    } else if (name !== 'number' && name !== 'id') {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };

  const handleAddUser = () => {
    if (Object.values(user).every((val) => val.trim() !== '')) {
      if (editIndex !== null) {
        const updatedUsers = users.map((u, index) =>
          index === editIndex ? user : u
        );
        setUsers(updatedUsers);
        setEditIndex(null);
      } else {
        setUsers([...users, user]);
      }
      setUser({ address: '', number: '', name: '', id: '', lastname: '' });
    }
  };

  const handleEditUser = (index) => {
    setUser(users[index]);
    setEditIndex(index);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    ) || (user.name + ' ' + user.lastname).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-table-container">
      <h1>User Table</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>
      <div className="input-container">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          type="text" 
          name="lastname"
          value={user.lastname}
          onChange={handleChange}
          placeholder="Enter lastname"
        />


        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Enter address"
        />


        <input
          type="text"
          name="id"
          value={user.id}
          onChange={handleChange}
          placeholder="Enter ID"
        />

        <input
          type="text"
          name="number"
          value={user.number}
          onChange={handleChange}
          placeholder="Enter number"
        />
        <button onClick={handleAddUser}>
          {editIndex !== null ? 'Update User' : 'Add User'}
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Address</th>
            <th>ID</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u, index) => (
            <tr key={index}>
              <td>{u.name}</td>
              <td>{u.lastname}</td>
              <td>{u.address}</td>
              <td>{u.id}</td>
              <td>{u.number}</td>
              <td>
                <button onClick={() => handleEditUser(index)}>Edit</button>
                <button onClick={() => handleDeleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
