import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../../services/core/error-handler';
import ProductDto from '../../../services/products/dto/product-dto';
import ProductsService from '../../../services/products/services/products-service';

function AdminCreateProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const productService = new ProductsService();
  const [formData, setFormData] = useState({
    name: '',
    urlPicture: '',
    description: '',
    price: 0,
    category: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const productCreation = new ProductDto();
    productCreation.name = formData.name;
    productCreation.urlPicture = formData.urlPicture;
    productCreation.description = formData.description;
    productCreation.price = formData.price;
    productCreation.category = formData.category;
    productCreation.category = 'sun';

    productService.createEntity(productCreation).then((res) => {
      if (res) {
        navigate('/adminproducts');
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  };

  return (
    <div className="about">
      <div className="container">
        <h1>{t('admin.create-product')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">{t('admin.name')}</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="nameHelp"
              placeholder={t('admin.name') || 'name'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">{t('admin.price')}</label>
            <input
              type="number"
              className="form-control"
              id="priceInput"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="priceHelp"
              placeholder={t('admin.price') || 'price'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="urlPicInput">{t('admin.url-pic')}</label>
            <input
              type="text"
              className="form-control"
              id="urlPicInput"
              name="urlPicture"
              value={formData.urlPicture}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="urlPicHelp"
              placeholder={t('admin.url-pic') || 'urlPicture'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionInput">{t('admin.description')}</label>
            <input
              type="text"
              className="form-control"
              id="descriptionInput"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              aria-describedby="descriptionHelp"
              placeholder={t('admin.description') || 'price'}
            />
          </div>
          <button type="submit" className="btn btn-primary">{t('generic.submit')}</button>
        </form>
      </div>
    </div>

  );
}

export default AdminCreateProduct;
