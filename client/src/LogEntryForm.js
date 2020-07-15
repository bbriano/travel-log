import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addLogEntry } from './api';

export default ({ location, onSubmit }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (formData) => {
    try {
      setLoading(true);
      const newEntry = await addLogEntry({ ...location, ...formData });
      onSubmit(newEntry);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '320px',
      }}
    >
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <label>
        <small>API Key</small>
        <br />
        <input type="password" name="apiKey" required ref={register} />
      </label>
      <label>
        <small>Title</small>
        <br />
        <input type="text" name="title" required ref={register} />
      </label>
      <label>
        <small>Comments</small>
        <br />
        <input type="text" name="comments" ref={register} />
      </label>
      <label>
        <small>Image URL</small>
        <br />
        <input type="text" name="imageURL" ref={register} />
      </label>
      <label>
        <small>Rating</small>
        <br />
        <input type="number" name="rating" ref={register} />
      </label>
      <label>
        <small>Visited date</small>
        <br />
        <input type="date" name="visitDate" required ref={register} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Create Entry'}
      </button>
    </form>
  );
};
