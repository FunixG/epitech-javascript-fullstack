import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <ul className="location_icon">
                <li>
                  <i className="fa fa-map-marker" aria-hidden="true" />
                  <br />
                  {' '}
                  Location
                </li>
                <li>
                  <i className="fa fa-phone" aria-hidden="true" />
                  <br />
                  {' '}
                  +01
                  1234567890
                </li>
                <li>
                  <i
                    className="fa fa-envelope"
                    aria-hidden="true"
                  />
                  <br />
                  {' '}
                  antoine.pronnier@gmail.com
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  Epitech Project
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
