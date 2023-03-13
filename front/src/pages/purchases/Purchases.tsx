import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserService from '../../services/user/services/user-service';
import PurchaseDto from '../../services/purchases/dto/purchase-dto';
import PurchasesService from '../../services/purchases/services/purchases-service';
import ErrorHandler from "../../services/core/error-handler";

function Purchases() {
  const { t } = useTranslation();

  const purchaseService = new PurchasesService();
  const userService = new UserService();
  const [purchases, setPurchases] = useState<PurchaseDto[]>([]);

  useEffect(() => {
    purchaseService.getAll().then((data: PurchaseDto[] | undefined) => {
      if (data) {
        userService.actual().then((user) => {
          const purchasesUser: PurchaseDto[] = [];

          if (user) {
            data.forEach((purchase) => {
              if (purchase.user && purchase.user.id && purchase.user.id === user.id) {
                purchasesUser.push(purchase);
              }
            });
            setPurchases(purchasesUser);
          }
        }).catch(() => {
          ErrorHandler.onNewError('generic.cant-reach-api');
        });
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  });

  return (
    <div className="glasses">
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <div className="titlepage">
              <h2>{t('user.purchases.title')}</h2>
              <p>{t('user.purchases.text')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="glasses_box">
                <figure>
                  <img
                    src={purchase.product?.urlPicture}
                    alt={purchase.product?.name}
                  />
                </figure>
                <h3>
                  <span className="blu">$</span>
                  {purchase.product?.price}
                </h3>
                <p>{purchase.product?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Purchases;
