import React from 'react';

function Banner() {
  return (
    <section className="banner_main">
      <div id="banner1" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#banner1" data-slide-to="0" className="active" />
          <li data-target="#banner1" data-slide-to="1" />
          <li data-target="#banner1" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="carousel-caption">
                <div className="text-bg">
                  <h1>
                    <span className="blu">
                      Welcome
                      <br />
                    </span>
                    To Our Sunglasses
                  </h1>
                  <figure><img src="images/banner_img.png" alt="#" /></figure>
                  <a className="read_more" href="/src/pages">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
