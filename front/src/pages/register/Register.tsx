import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserDto from '../../services/user/dto/user-dto';
import UserService from '../../services/user/services/user-service';

function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userService = new UserService();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userCreation = new UserDto();
    userCreation.username = formData.username;
    userCreation.password = formData.password;
    userCreation.email = formData.email;
    userCreation.address = formData.address;

    userService.register(userCreation).then((res) => {
      if (res) {
        navigate('/login');
      }
    }).catch(() => {
      userService.errorHandler.onNewError('generic.cant-reach-api');
    });
  };

  return (
    <div className="about">
      <div className="container">
        <h1>{t('user.register.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameInput">{t('user.username')}</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              name="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="usernameHelp"
              placeholder={t('user.username-holder') || 'username'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">{t('user.email')}</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="emailHelp"
              placeholder={t('user.email-holder') || 'email'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="addressInput">{t('user.address')}</label>
            <input
              type="text"
              className="form-control"
              value={formData.address}
              name="address"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              id="addressInput"
              aria-describedby="addressHelp"
              placeholder={t('user.address-holder') || 'Address'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">{t('user.password')}</label>
            <input
              type="password"
              value={formData.password}
              className="form-control"
              id="passwordInput"
              name="password"
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              placeholder={t('user.password') || 'password'}
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('generic.submit')}</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
