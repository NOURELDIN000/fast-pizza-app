// @ts-nocheck
import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './UserSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateName(username));
    navigate('/menu');

  }

  return (
    <form onSubmit={handleSubmit} className='mt-11'>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
      className='px-4 py-2 border border-stone-200 rounded-full text-sm placeholder:text-sm
      focus:outline-none focus:ring focus:ring-yellow-300 mt-3 
      '
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type = 'primary'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
