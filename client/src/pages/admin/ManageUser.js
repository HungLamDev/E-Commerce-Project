import React, { useEffect, useState } from 'react';
import { apiGetUsers } from 'apis/user';
import { roles } from 'ultils/contants';
import moment from 'moment';
import { InputManage, Pagination } from 'components';
import useDebounce from 'hooks/useDebounce';
import {useSearchParams} from 'react-router-dom'
const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({ q: "" });
  const [params] = useSearchParams()
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({ ...params, limit: process.env.REACT_APP_LIMIT })
    if (response.success) setUsers(response)
  }

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) {
      queries.q = queriesDebounce;
    }
    fetchUsers(queries);
  }, [queriesDebounce, params]);

  const getRoleValue = (roleCode) => {
    const role = roles.find(r => r.code === Number(roleCode));
    return role ? role.value : 'Unknown';
  };

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage users</span>
      </h1>
      <div className='w-full p-4'>
        <div className='flex justify-end py-4'>
          <InputManage 
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            style='w-500'
            placeholder='Search name user...'
            isHideLabel
          />
        </div>
        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-blue-600 text-[13px] text-white'>
            <tr className='border border-blue-300'>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Mail</th>
              <th className='px-4 py-2'>Full name</th>
              <th className='px-4 py-2'>Role</th>
              <th className='px-4 py-2'>Mobile</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.length > 0 ? (
              users.users.map((el, index) => (
                <tr key={el._id} className='border border-gray-500'>
                  <td className='py-2 px-4'>{index + 1}</td>
                  <td className='py-2 px-4'>{el.email}</td>
                  <td className='py-2 px-4'>{`${el.lastname} ${el.firstname}`}</td>
                  <td className='py-2 px-4'>{getRoleValue(el.role)}</td>
                  <td className='py-2 px-4'>{el.mobile}</td>
                  <td className='py-2 px-4'>{el.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className='py-2 px-4'>{moment(el.createdAt).format('DD-MM-YY')}</td>
                  <td className='py-2 px-4'>
                    <span className='px-4 text-blue-500 hover:underline cursor-pointer'>Edit</span>
                    <span className='px-4 text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className='w-full text-right'>
          <Pagination totalCount={users?.counts || 0} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
