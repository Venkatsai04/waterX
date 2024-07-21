import React, { useEffect, useState, useRef } from 'react';

const Send = ({ sensorData, alert }) => {
  const [Data, setData] = useState(null);
  const [Alert, setAlert] = useState(false);
  const [Filling, setFilling] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null);
  const alertAudioRef = useRef(new Audio('/tone2.wav'));
  const intervalIdRef = useRef(null);

  const url = "https://server-sooty-beta.vercel.app/";

  const fetchDistance = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data.distance);
        setAlert(data.alert);
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

  const notifyUser = () => {
    if (Data >= 3 && Data <= 25 && Alert && Filling) {
      if (!intervalIdRef.current) {
        intervalIdRef.current = setInterval(() => {
          alertAudioRef.current.play();
        }, 1000);
      }
    } else {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const setTankState = () => {
    setFilling((prevFilling) => !prevFilling);
    if (Filling) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchDistance, 1000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    notifyUser();
  }, [Data, Alert, Filling]); // Trigger notifyUser when Data, Alert, or Filling changes

  return (
    <div className="flex flex-row gap-y-[50px] gap-x-[10px]">
      <button onClick={handleRefresh} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer z-50 relative right-10 scale-110">
        Refresh
      </button>
      <button onClick={setTankState} type="button" className={`text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer z-50 relative left-10 scale-110`}>
        {Filling ? 'Stop ⚠' : 'Motor ON 💧'}
      </button>
    </div>
  );
};

export default Send;
