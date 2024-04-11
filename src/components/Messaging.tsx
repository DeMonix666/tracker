import React, { useEffect } from 'react';
import { messaging } from 'core';
import { useAppDispatch, useAppSelector } from 'store';
import { userState } from 'store/reducers';
import { updateMessagingToken } from 'store/reducers/MessagingSlice';

export const Messaging: React.FC<any> = () => {
  const dispatch: any = useAppDispatch();
  const user = useAppSelector(state => userState(state));

  const handleRemoteNotification = async (message: any) => {
    if (!message) return;

    messageHandler(message);

  };

  const messageHandler = async (message: any) => {
    console.log('message', message)

  };

  const initializeMessaging = async () => {
    try {
      await dispatch(updateMessagingToken({}));

      messaging.setBackgroundMessageHandler(async message => {
        console.log('Message handled in the background!', message);
      });

      messaging.onTokenRefresh(async () => {
        await dispatch(updateMessagingToken({}));
      });
      messaging.getInitialNotification().then(handleRemoteNotification);
      messaging.onNotificationOpenedApp((message: any) => {
        console.log('onNotificationOpenedApp', user, message);

        messageHandler(message);
      });

      messaging.onMessage((message: any) => {
        console.log('onMessage', message);

        // if (message?.notification) {
        //   toastHelper.info({
        //     message: message?.notification?.body,
        //     title: message?.notification?.title,
        //     onPress: () => handleRemoteNotification(message),
        //     position: 'top',
        //     duration: 5000,
        //   });
        // }
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    initializeMessaging();

    return () => {
    };
  }, [user]);

  return null;
};
