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
  const [sensorData, setSensorData] = useState(0);
  const [Alert, setAlert] = useState(0);

  useEffect(() => {
    if (distance) {
      setSensorData(distance);
      setAlert(alert)

    }
  }, [distance]);

  const levelInPixels = mapCmToPixels(sensorData)
  const percentage = (sensorData / 105) * 100;




  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-[100vh] gap-10 bg-black">
      <div className="w-full text-center">

        <h1 className="mb-4 scale-110 text-3xl font-semibold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Water Tank</span> Level</h1>
     

      </div>
      <div className="flex items-center justify-center w-[78%] h-[500px] bg-white rounded-lg overflow-hidden border-[10px] border-white">
        <img
          src="water2.png"
          alt="water"
          className="w-full bg-repeat-x relative"
          style={{ top: `${levelInPixels}px` }}
        />
        <div className="absolute w-full h-full flex items-center justify-center font-mono text-4xl font-semibold text-white [-webkit-text-stroke:1px_black]">
          {
            alert === false
              ? distance <= 3
                ? 'sensor error'
                : `${percentage.toFixed(0)}%` // If alert is true, display percentage
              : <p className='text-red-400'>{` Tank Full ${percentage.toFixed(0)}%`} </p> // If alert is false, display 'Alert'
          }

        </div>
      </div>
      <Send sensorData={sensorData} alert={Alert}/>

    </div>
  );
};

export default WaterTank;
