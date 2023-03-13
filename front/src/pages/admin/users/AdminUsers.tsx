import React, { useEffect, useState } from 'react';
import '../AdminTab.css';
import { useTranslation } from 'react-i18next';
import UserService from '../../../services/user/services/user-service';
import ErrorHandler from '../../../services/core/error-handler';
import UserDto from '../../../services/user/dto/user-dto';
import store from '../../../components/global/store';
import { addCard } from '../../../components/global/actions';
import PurchasesService from '../../../services/purchases/services/purchases-service';

function AdminUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    const userService = new UserService();
    userService.getAll().then((res) => {
      if (res) {
        setUsers(res);
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  }, []);

  const deleteUser = (userId: number | undefined) => {
    const userService = new UserService();

    if (userId) {
      userService.deleteEntity(userId).then(() => {
        store.dispatch(addCard(Math.floor(Math.random() * 10000), 'alert.user-removed'));
      }).catch(() => {
        ErrorHandler.onNewError('generic.cant-reach-api');
      });
    }
  };

  const deletePurchases = (userId: number | undefined) => {
    const purchasesService = new PurchasesService();

    purchasesService.getAll().then((data) => {
      if (data) {
        data.forEach((purchase) => {
          if (purchase.user && purchase.user.id && purchase.user.id === userId) {
            if (purchase.id) {
              purchasesService.deleteEntity(purchase.id).then(() => {
              }).catch(() => {
                ErrorHandler.onNewError('generic.cant-reach-api');
              });
            }
          }
        });
      }
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  };

  const setAdmin = (user: UserDto) => {
    const userService = new UserService();
    // eslint-disable-next-line no-param-reassign
    user.role = 'admin';
    userService.updateEntity(user).then(() => {
      store.dispatch(addCard(Math.floor(Math.random() * 10000), 'alert.user-updated'));
    }).catch(() => {
      ErrorHandler.onNewError('generic.cant-reach-api');
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="entity-tab">
          <table>
            <thead>
              <tr>
                <th>{t('admin.btn-users')}</th>
                <th>{t('admin.user-role')}</th>
                <th>{t('user.address')}</th>
                <th>{t('admin.action')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.address}</td>
                  <td>
                    <button type="button" onClick={() => setAdmin(user)} className="btn btn-info">{t('admin.btn-set-admin')}</button>
                    <button onClick={() => deleteUser(user.id)} type="button" className="btn btn-danger">{t('admin.btn-delete')}</button>
                    <button onClick={() => deletePurchases(user.id)} type="button" className="btn btn-danger">{t('admin.btn-delete-purchases')}</button>
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

export default AdminUsers;
