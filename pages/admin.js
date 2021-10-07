import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/actions";
import Image from "next/image";


const Users = () => {
  const dispatch = useDispatch();
//   const { handleEdit } = props;
  const allUsersData = useSelector((state) => state.Users);
  const { loading, error, users } = allUsersData;
  const [ searchFilter, setSearchFilter ] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <section className="product">
      <div className="list-group">
        <div className="list-header">
            <h1 className="headerlist">Database Account</h1>
            <div className="filter-post">
                <input type="text"
                    className="filter"
                    placeholder="Search"
                    onChange={ (e) => {
                    setSearchFilter(e.target.value);
                    } }
                />
            </div>
        </div>
      </div>
      {loading
        ? "Loading..."
        : error
        ? error.message
        : users
        .filter((val) => {
          if( searchFilter === "") {
            return val;
          } else if ( val.name.firstname.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return val;
          } else if ( val.name.lastname.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return val;
          } else if ( val.email.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return val;
          } else if ( val.username.toLowerCase().includes(searchFilter.toLocaleLowerCase())) {
            return val;
          }
        }).map((user) => (
            <div className="flex-container">
            <div className="flex-left">
                <h3 key={user.id}>{user.name.firstname + " " + user.name.lastname}</h3>
                <p>Username : {user.username}</p>
                <p>Password : {user.password}</p>
                <p>Email : {user.email}</p>
                <p>Phone : {user.phone}</p>
            </div>
            </div>
          ))}
    </section>
  );
};

export default Users; 