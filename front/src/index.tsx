import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import store from './components/global/store';

i18n.use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          alert: {
            title: 'Alert',
          },
          navbar: {
            home: 'Home',
            about: 'About',
            products: 'Shop',
            purchases: 'Purchases',
            login: 'Login',
            register: 'Register',
            account: 'Account',
            admin: 'Administration',
          },
          generic: {
            'read-more': 'Read more !',
            submit: 'Submit',
            'cant-reach-api': 'Server unavailable',
          },
          user: {
            register: {
              title: 'Account creation',
            },
            login: {
              title: 'Login',
            },
            purchases: {
              title: 'Your purchases',
              text: 'This is the list of your past purchases',
              success: 'You successfully bought an item !',
            },
            email: 'Email address',
            'email-holder': 'Enter email address',
            password: 'Password',
            username: 'Username',
            'username-holder': 'Enter username',
            address: 'Address',
            'address-holder': 'Enter Address',
          },
          products: {
            title: 'Articles list',
            text: 'This is the list of best available articles',
            buy: 'Buy',
          },
          home: {
            items: {
              'our-glasses': 'Our Glasses',
              'our-glasses-text': 'Best product in the region !',
            },
          },
        },
      },
      fr: {
        home: {
          items: {
            'our-glasses': 'Nos lunettes',
            'our-glasses-text': 'Les meilleures lunettes de la région',
          },
        },
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  }).then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <App />
          </Provider>
        </I18nextProvider>
      </React.StrictMode>,
    );
  }).catch(() => {
  });
