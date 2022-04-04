import { useState } from 'react';
import s from './Searchbar.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.info('Enter your request.');
      return;
    }

    onSubmit(name);

    reset();
  };

  const reset = () => {
    setName('');
  };

  const handleChange = e => {
    setName(e.currentTarget.value);
  };

  return (
    <div>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.button_label}>Search</span>
          </button>

          <input
            onChange={handleChange}
            className={s.input}
            type="text"
            name="name"
            value={name}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};

export default Searchbar;
