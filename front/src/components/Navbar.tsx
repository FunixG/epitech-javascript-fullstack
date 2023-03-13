import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import UserService from '../services/user/services/user-service';
import UserDto from '../services/user/dto/user-dto';
import ErrorHandler from '../services/core/error-handler';
import store from './global/store';
import { addCard } from './global/actions';

function Navbar() {
  const { t } = useTranslation();
  const [user, setData] = useState<UserDto | undefined>(undefined);
  const userService = new UserService();
  const location = useLocation();

  useEffect(() => {
    userService.actual().then((userDto) => {
      if (userDto) {
        setData(userDto);
      } else {
        setData(undefined);
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  });

  const { i18n } = useTranslation();

  function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    i18n.changeLanguage(event.target.value).then(() => {
      store.dispatch(addCard(Math.floor(Math.random() * 10000), 'alert.lang-switch'));
    }).catch(() => {
    });
  }

  return (
    <header>
      <div className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
              <div className="full">
                <div className="center-desk">
                  <div className="logo">
                    <a href="/"><img src="/images/logo.png" alt="Epitech Logo" /></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
              <nav className="navigation navbar navbar-expand-md navbar-dark ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${location.pathname.endsWith('home') ? 'active' : ''}`}>
                      <a className="nav-link" href="/">{t('navbar.home')}</a>
                    </li>
                    <li className={`nav-item ${location.pathname.endsWith('products') ? 'active' : ''}`}>
                      <a className="nav-link" href="/products">{t('navbar.products')}</a>
                    </li>
                    {user ? (
                      <>
                        <li className={`nav-item ${location.pathname.endsWith('purchases') ? 'active' : ''}`}>
                          <a className="nav-link" href="/purchases">{t('navbar.purchases')}</a>
                        </li>
                        <li className={`nav-item login_btn ${location.pathname.endsWith('account') ? 'active' : ''}`}>
                          <a className="nav-link" href="/account">{t('navbar.account')}</a>
                        </li>
                        {user.role === 'admin' ? (
                          <li className={`nav-item login_btn ${location.pathname.includes('admin') ? 'active' : ''}`}>
                            <a className="nav-link" href="/admin">{t('navbar.admin')}</a>
                          </li>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <li className={`nav-item d_none login_btn ${location.pathname.endsWith('login') ? 'active' : ''}`}>
                          <a className="nav-link" href="/login">{t('navbar.login')}</a>
                        </li>
                        <li className={`nav-item d_none ${location.pathname.endsWith('register') ? 'active' : ''}`}>
                          <a className="nav-link" href="/register">{t('navbar.register')}</a>
                        </li>
                      </>
                    )}
                    <select className="nice-select" onChange={handleLanguageChange} value={i18n.language}>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
