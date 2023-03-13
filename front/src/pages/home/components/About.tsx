import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  return (
    <div className="about">
      <div className="container">
        <div className="row d_flex">
          <div className="col-md-5">
            <div className="about_img">
              <figure><img src="images/about_img.png" alt="Best product" /></figure>
            </div>
          </div>
          <div className="col-md-7">
            <div className="titlepage">
              <h2>{t('home.items.our-glasses')}</h2>
              <p>
                {t('home.items.our-glasses-text')}
              </p>
            </div>
            <a className="read_more" href="/about">{t('generic.read-more')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
