import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {

  const { getUsers, users, selectedUser, setSelectedUser,
    unseenMessages, setUnseenMessages } = useContext(ChatContext)

  const { logout, onlineUser } = useContext(AuthContext)

  const [input, setInput] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useNavigate();

  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(() => {
    getUsers();
  }, [onlineUser])

  return (
    <div className={`bg-[#FF7F5C]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='max-w-40' />
          <div className='relative'>
            <img onClick={() => setMenuOpen(!menuOpen)} src={assets.menu_icon} alt="Menu" className='h-6 w-6 cursor-pointer hover:opacity-80 transition' />
            {menuOpen && (
              <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#8B3A1D] border border-gray-600 text-gray-100 shadow-lg'>
                <p onClick={() => { navigate('/profile'); setMenuOpen(false); }} className='cursor-pointer text-sm hover:opacity-80 py-1'>Edit Profile</p>
                <hr className='my-2 border-t border-gray-500' />
                <p onClick={() => { logout(); setMenuOpen(false); }} className='cursor-pointer text-sm hover:opacity-80 py-1'>Logout</p>
              </div>
            )}
          </div>
        </div>

        <div className='bg-[#8B3A1D] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="Search" className='w-3' />
          <input onChange={(e) => setInput(e.target.value)} type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1'
            placeholder='Search User...' />
        </div>

      </div>

      <div className='flex flex-col'>
        {filteredUsers.map((user, index) => (
          <div onClick={() => { setSelectedUser(user), setUnseenMessages(prev => ({ ...prev, [user._id]: 0 })) }}
            key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm
           ${selectedUser?._id === user._id && 'bg-[#8B3A1D]/50'}`}>
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-8.75 aspect-square rounded-full' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              {
                onlineUser.includes(user._id)
                  ? <span className='text-green-400 text-xs'>Online</span>
                  : <span className='text-neural-400 text-xs'>Offline</span>
              }
            </div>
            {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-red-500/50'>
              {unseenMessages[user._id]}</p>}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sidebar
