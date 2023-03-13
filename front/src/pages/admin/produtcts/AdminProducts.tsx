import React, { useEffect, useState } from 'react';
import '../AdminTab.css';
import { useTranslation } from 'react-i18next';
import ErrorHandler from '../../../services/core/error-handler';
import store from '../../../components/global/store';
import { addCard } from '../../../components/global/actions';
import ProductDto from '../../../services/products/dto/product-dto';
import ProductsService from '../../../services/products/services/products-service';

function AdminProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    const productService = new ProductsService();
    productService.getAll().then((res) => {
      if (res) {
        setProducts(res);
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  }, []);

  const deleteProduct = (productId: number | undefined) => {
    const productService = new ProductsService();

    if (productId) {
      productService.deleteEntity(productId).then(() => {
        store.dispatch(addCard(Math.floor(Math.random() * 10000), 'alert.user-removed'));
      }).catch(() => {
        ErrorHandler.onNewError('generic.cant-reach-api');
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="entity-tab">
          <table>
            <thead>
              <tr>
                <th>{t('admin.name')}</th>
                <th>{t('admin.price')}</th>
                <th>{t('user.description')}</th>
                <th>{t('user.action')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button onClick={() => deleteProduct(product.id)} type="button" className="btn btn-danger">{t('admin.btn-delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
