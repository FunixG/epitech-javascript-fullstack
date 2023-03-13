import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import store from './global/store';
import { addCard } from './global/actions';

const wsEndpoint = process.env.REACT_APP_API_WS || 'wss://epitech-api.funixgaming.fr/';

function Websocket() {
  const { t } = useTranslation();

  useEffect(() => {
    const ws = new WebSocket(wsEndpoint);

    function handleWsMessage(event: MessageEvent) {
      const message = event.data as string;
      const args: string[] = message.split(':');

      if (message.startsWith('ping') && args.length === 2) {
        ws.send(args[1]);
      } else if (message.startsWith('product-buy') && args.length === 3) {
        store.dispatch(
          addCard(
            Math.floor(Math.random() * 10000),
            `${t('product-buy')} ${args[1]} ${args[2]}`,
          ),
        );
      }
    }

    ws.addEventListener('message', handleWsMessage);

    return () => {
      ws.removeEventListener('message', handleWsMessage);
      ws.close();
    };
  }, [t]);

  return null;
}

export default Websocket;
