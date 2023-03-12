import React from 'react';

function Home() {
  return (
    <div className="about">
      <div className="container">
        <div className="row d_flex">
          <div className="col-md-5">
            <div className="about_img">
              <figure><img src="/public/images/about_img.png" alt="#" /></figure>
            </div>
          </div>
          <div className="col-md-7">
            <div className="titlepage">
              <h2>About Our Shop</h2>
              <p>
                About text
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
