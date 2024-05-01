import { useState, useEffect } from 'react';
import WaterTank from './components/WaterTank'; // Import the WaterTank component
import Send from './components/Send';


function App() {
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // New error state
  const [Alert, setAlert] = useState(false)

  const fetchDistance = async () => {
    try {
      const response = await fetch('http://192.168.29.94/distance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDistance(data);
        setAlert(data.alert)

        console.log(data);

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

  useEffect(() => {
    fetchDistance(); // Fetch the distance on component mount
  }, []);

 
  // useEffect(() => {
  //   reqPerm(); // Fetch the distance on component mount
  //   onMessage(messaging, (payload)=>{
  //     console.log(payload);
  //   })

  // }, []);

  // const sendNotification = async () => {
  //   const token = await getToken(getMessaging());
  //   const notificationTitle = 'Alert';
  //   const notificationBody = 'Water tank is full ';

  //   try {
  //     const response = await axios.post('http://localhost:3000/send-notification', {
  //       token,
  //       title: notificationTitle,
  //       body: notificationBody,
  //     });

  //     console.log('Notification sent:', response.data);
  //   } catch (error) {
  //     console.error('Error sending notification:', error);
  //   }
  // };


  // useEffect(() => {
  //   if(Alert==false){
  //     console.log("sending");
  //     sendNotification()

  //   }
  // }, [])
  


  return (
    <>

      {loading ? (
        <div className="flex w-full h-[100vh] justify-center items-center bg-black text-white font-mono text-4xl">
          <p>Loading...</p>

        </div>
      ) : error ? (
        <div className="flex w-full h-[100vh] justify-center items-center bg-black text-white font-mono text-4xl">
          <p className='text-center'>Server is Sleeping 😴</p>
          
        </div>
      ) : (
        <>
        <WaterTank distance={parseInt(distance.distance)} alert={Alert} />
       <Send/>
        </>
      )}
    </>
  );
}

export default App;
