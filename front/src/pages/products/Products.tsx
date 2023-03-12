import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductsService from '../../services/products/services/products-service';
import ProductDto from '../../services/products/dto/product-dto';
import PurchasesService from '../../services/purchases/services/purchases-service';

function Products() {
  const { t } = useTranslation();
  const productsService = new ProductsService();
  const purchaseService = new PurchasesService();
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    productsService.getAll().then((data: ProductDto[] | undefined) => {
      if (data) {
        setProducts(data);
      }
    }).catch(() => {
      productsService.errorHandler.onNewError('generic.cant-reach-api');
    });
  });

  const purchase = (productId: number | undefined) => {
    if (productId) {
      purchaseService.payment(productId).then((purchaseDone) => {
        if (purchaseDone) {
          console.log('Achat fait !');
        }
      }).catch(() => {
        productsService.errorHandler.onNewError('generic.cant-reach-api');
      });
    }
  };

  return (
    <div className="glasses">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="titlepage">
              <h2>{t('products.title')}</h2>
              <p>{t('products.text')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="glasses_box">
                <figure>
                  <img
                    src={product.urlPicture}
                    alt={product.name}
                  />
                </figure>
                <h3>
                  <span className="blu">$</span>
                  {product.price}
                </h3>
                <p>{product.name}</p>
                <button type="button" onClick={() => purchase(product.id)} className="btn btn-info">
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
