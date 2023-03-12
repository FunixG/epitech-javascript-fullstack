import React from 'react';

function About() {
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
              <h2>About Our Shop</h2>
              <p>
                Best shop in the world
              </p>
            </div>
            <a className="read_more" href="/about">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
