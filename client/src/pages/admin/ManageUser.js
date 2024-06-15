import React, { useEffect } from 'react';
import { apiGetUsers } from 'apis/user';

const ManageUser = () => {
  const fetchUsers = async (params) => {
    const response = await apiGetUsers(params)
    console.log(response);
  };

  useEffect(() => {
    fetchUsers();
  },[]);
  return (
    <div>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage users</span>
      </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
