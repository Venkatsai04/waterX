import React, { useEffect, useState } from 'react';

const Send = ({ sensorData, alert }) => {
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);
  const [Data, setData] = useState()
  const [Alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(true); // New loading state
  const serverUrl = 'https://push-server-silk.vercel.app/'

  
  const fetchDistance = async () => {
    try {
      const response = await fetch('https://server-waterx.onrender.com/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setAlert(data.alert)
        // console.log(data);
        setError(null); // Clear any previous errors
      } else {
        throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching distance:', error);
      setError(error.message);
    } finally {
      setLoading(false); // Update loading state
    }
  };

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

  const handleRefresh = () => {
    window.location.reload()
  }

  const sendNotification = async () => {
    if (!subscription) {
      setError('Please subscribe to notifications first.');
      return;
    }

    try {
      await fetch(`${serverUrl}/sendNotification`, {
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

  const notifyUser = () => {
    if (sensorData >= 3 && sensorData <= 25 && alert == true) {
      console.log(typeof (sensorData));
      sendNotification()
    }
  }



  useEffect(() => {
    notifyUser();
  }, [Data]); // Empty dependency array ensures subscription happens only once

  useEffect(() => {
    fetchDistance();
  }, []); // Empty dependency array ensures subscription happens only once

  useEffect(() => {
    subscribe();
  }, []); // Empty dependency array ensures subscription happens only once



  return (
    <>

      <div className="flex flex-row gap-10">
        <button onClick={handleRefresh} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer z-50 relative right-10 scale-110">Refresh</button>
        <button onClick={sendNotification} type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer z-50 relative left-10 scale-110">Tank ON</button>
      </div>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </>
  );
};

export default Send;
