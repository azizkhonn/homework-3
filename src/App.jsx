import { useState } from 'react';
import './App.css';
import searchIcon from './assets/search-icon.gif'

// import nameIcon from './assets/name-icon.png'

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
    <>
      <div className="user-table-container">

        <div className="search-container">
          <img width={22} height={22} className="search-icon" src={searchIcon} alt="loading..." />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="SEARCH..."
          />
        </div>
        <div className="input-container">

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="NAME"
          />
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            placeholder="LASTNAME"
          />


          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="EMAIL"
          />


          <input
            type="text"
            name="id"
            value={user.id}
            onChange={handleChange}
            placeholder="ID NUMBER"
          />

          <input
            type="text"
            name="number"
            value={user.number}
            onChange={handleChange}
            placeholder="PHONE NUMBER"
          />


          <button onClick={handleAddUser}>
            {editIndex !== null ? 'Update User' : 'ADD USER'}
          </button>
        </div>
        <table className="user-table">
          <div className='table-wrapper'>
            <thead>
              <tr className='table-header'>
                <th>NAME</th>
                <th>LASTNAME</th>
                <th>ADDRESS</th>
                <th>ID</th>
                <th>NUMBER</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, index) => (
                <tr className='table-row' key={index}>
                  <td>{u.name}</td>
                  <td>{u.lastname}</td>
                  <td>{u.address}</td>
                  <td>{u.id}</td>
                  <td>{u.number}</td>
                  <td className='tableButtons'>
                    <button onClick={() => handleEditUser(index)}>Edit</button>
                    <button onClick={() => handleDeleteUser(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    </>
  );
};

export default UserTable;
