import React, { useState, useEffect } from 'react';
import './Admin.css';
import { useTranslation } from 'react-i18next';
import PurchasesService from '../../services/purchases/services/purchases-service';
import ErrorHandler from '../../services/core/error-handler';

function Admin() {
  const { t } = useTranslation();
  const [commandAmount, setCommandAmount] = useState(0);

  useEffect(() => {
    const purchasesService = new PurchasesService();
    purchasesService.getAll().then((res) => {
      if (res) {
        setCommandAmount(res.length);
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <button type="button" className="btn btn-info">
          <a href="/admin/users">{t('admin.btn-users')}</a>
        </button>
        <button type="button" className="btn btn-info">
          <a href="/admin/products">{t('admin.btn-products')}</a>
        </button>
      </div>
      <div className="card">
        <h1>{t('admin.command-nbr')}</h1>
        <p>{commandAmount}</p>
      </div>
    </div>
  );
}

export default Admin;
