import React, { useEffect, useState } from 'react';
import Send from './Send';

// Function to map centimeters to pixels
const mapCmToPixels = (cm) => {
  const minCm = 0; // Tank empty
  const maxCm = 105; // Tank full
  const minPixels = 450; // Bottom position in pixels
  const maxPixels = -10; // Top position in pixels

  const scale = (maxPixels - minPixels) / (maxCm - minCm);
  return minPixels + scale * (maxCm - cm);
};

const WaterTank = ({ distance, alert }) => {
  const [sensorData, setSensorData] = useState(distance || 0);
  const [Alert, setAlert] = useState(alert || false);
  const [percentage, setPercentage] = useState((distance / 105) * 100 || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDistance();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (distance !== undefined) {
      setSensorData(distance);
      setAlert(alert);
      setPercentage((distance / 105) * 100);
    }
  }, [distance, alert]);

  const fetchDistance = async () => {
    const url = "https://server-sooty-beta.vercel.app/"

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSensorData(data.distance);
        setAlert(data.alert);
        setPercentage((data.distance / 105) * 100);
      } else {
        throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching distance:', error);
    }
  };

  const levelInPixels = mapCmToPixels(sensorData);

  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-[100vh] gap-10 bg-black">
      <div className="w-full text-center">
        <h1 className="mb-4 scale-110 text-3xl font-semibold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Water Tank Level</span> 
        </h1>
      </div>
      <div className="flex items-center justify-center w-[78%] h-[500px] bg-white rounded-lg overflow-hidden border-[10px] border-white">
        <img
          src="water2.png"
          alt="water"
          className="w-full bg-repeat-x relative" 
          style={{ top: `${levelInPixels}px` }}
        />
        <div className="absolute w-full h-full flex items-center justify-center font-mono text-4xl font-semibold text-white [-webkit-text-stroke:1px_black]">
          {Alert === false
            ? sensorData <= 3
              ? 'sensor error'
              : `${percentage.toFixed(0)}%`
            : <p className='text-red-400'>{` Tank Full ${100 - (percentage.toFixed(0))}%`}</p>}
        </div>
      </div>
      <Send sensorData={sensorData} alert={Alert} onFetchDistance={fetchDistance} />
    </div>
  );
};

export default WaterTank;
