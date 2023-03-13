import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserService from '../../services/user/services/user-service';
import UserLoginDto from '../../services/user/dto/user-login-dto';
import ErrorHandler from '../../services/core/error-handler';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userService = new UserService();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userLogin = new UserLoginDto();
    userLogin.username = formData.username;
    userLogin.password = formData.password;

    userService.login(userLogin).then((res) => {
      if (res) {
        navigate('/');
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  };

  return (
    <div className="about">
      <div className="container">
        <h1>{t('user.login.title')}</h1>
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

export default Login;
