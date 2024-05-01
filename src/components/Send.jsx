import React, { useEffect, useState } from 'react';

const Send = () => {
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BEAxVPVb72JDTuOy-jS7Qv9CIpkC-wilsr8gEd3-YMPnYWImyTMRP3iRNq5o3fhq4HDAnzI2FrRQH1hSdGjntPs',
      });
      setSubscription(subscription);
      console.log('Subscribed:', JSON.stringify(subscription));

      // Send subscription to server
      await fetch('http://localhost:3001/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription }),
      });
    } catch (error) {
      console.error('Error subscribing:', error);
      setError(error.message);
    }
  };

  const sendNotification = async () => {
    if (!subscription) {
      setError('Please subscribe to notifications first.');
      return;
    }

    try {
      await fetch('http://localhost:3001/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          notification: {
            title: 'New Notification',
            body: 'This is a push notification!',
          },
        }),
      });
      console.log('Notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    subscribe();
  }, []); // Empty dependency array ensures subscription happens only once

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={subscribe} disabled={subscription}>
        {subscription ? 'Subscribed' : 'Subscribe to Notifications'}
      </button>
      <button className='absolute z-50' onClick={sendNotification} disabled={!subscription}>
        Send Notification
      </button>
    </>
  );
};

export default Send;
