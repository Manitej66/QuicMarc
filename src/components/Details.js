import React from 'react'
import {firestore} from '../firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Countdown from 'react-countdown';


const Details = () => {
    const [value, loading, error] = useDocumentData(
        firestore.collection('attendance').doc(window.location.pathname.split('/')[2]),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

      const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <p className="p-2 bg-red-800 text-red-100 text-center shadow-md rounded-md">Timeout</p>
          )
        } else {
          // Render a countdown
          return <p className="p-2 bg-indigo-800 text-white text-center rounded-md shadow-md">Time left - {minutes}:{seconds}</p>;
        }
      };

      if(loading) return (
        <div className="flex flex-col min-h-screen justify-around items-center p-2">
        <p>loading....</p>
      </div>
      )

      if(error) return (
        <div className="flex flex-col min-h-screen justify-around items-center p-2">
        <p>{error}</p>
        </div>
      )
    

    return (
            <div className="flex flex-col justify-center items-center font-myfont p-4">
                <div>
                    <p className="text-blue-600 text-4xl font-extrabold text-center">{value.name}</p>
                    <Countdown
                      date={value.endsAt}
                      renderer={renderer}
                    />
                    <p className="p-3">share the below code to students</p>
                    <div className="p-3 bg-blue-800 text-white rounded-md shadow-md">
                        <p className="text-center">{window.location.pathname.split('/')[2]}</p>
                    </div>
                    <p className="font-bold text-2xl text-center p-2 text-indigo-600">
                        Attendees ({value.present.length})
                    </p>
                </div>
                <div className="w-3/4 md:w-1/2">
                    {value.present.map(d => (
                      <p key={d} className="p-2 m-3 bg-blue-300 text-center rounded-md shadow-sm">{d}</p>
                    ))}
                </div>
            </div>
    )
}

export default Details
