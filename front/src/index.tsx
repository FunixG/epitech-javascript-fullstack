import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App';

i18n.use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
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
            email: 'Email address',
            'email-holder': 'Enter email address',
            password: 'Password',
            username: 'Username',
            'username-holder': 'Enter username',
            address: 'Address',
            'address-holder': 'Enter Address',
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
          <App />
        </I18nextProvider>
      </React.StrictMode>,
    );
  }).catch(() => {
  });
