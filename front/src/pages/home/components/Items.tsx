import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsService from '../../../services/products/services/products-service';
import ProductDto from '../../../services/products/dto/product-dto';

function Items() {
  const { t } = useTranslation();

  const max = 8;
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    const productService = new ProductsService();
    productService.getAll().then((data: ProductDto[] | undefined) => {
      if (data) {
        const toSend: ProductDto[] = [];
        let i = 0;
        data.forEach((product) => {
          if (i < max) {
            toSend.push(product);
            i += 1;
          }
        });
        setProducts(toSend);
      }
    }).catch(() => {
    });
  }, []);

  return (
    <div className="glasses">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="titlepage">
              <h2>{t('home.items.our-glasses')}</h2>
              <p>
                {t('home.items.our-glasses-text')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="glasses_box">
                <figure><img src={product.urlPicture} alt={product.name} /></figure>
                <h3>
                  <span className="blu">$</span>
                  {product.price}
                </h3>
                <p>{product.name}</p>
              </div>
            </div>
          ))}
          <div className="col-md-12">
            <a className="read_more" href="/products">{t('generic.read-more')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Items;
