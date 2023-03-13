import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { removeCard } from './actions';
import { State } from './reducer';
import './Popup.css';

function CardPopup() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cards = useSelector((state: State) => state.cards);

  const handleRemoveCard = (id: number) => {
    dispatch(removeCard(id));
  };

  return (
    <div className="card-popup-container">
      {cards.map((card) => (
        <div className="card-popup" key={card.id}>
          <div className="card-popup-content">
            <div className="card-popup-title">{t('alert.title')}</div>
            <div className="card-popup-message">{t(card.text)}</div>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={() => handleRemoveCard(card.id)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default CardPopup;
