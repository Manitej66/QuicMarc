import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import {firestore, auth} from '../firebase'

const Dashboard = () => {
    const [value, loading, error] = useCollection(
        firestore.collection('attendance').where('author','==',auth.currentUser.email),
        {
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      );

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
        <div className="flex flex-col justify-center items-center font-myfont w-screen">
            {value.docs.length > 0 ? (
                <div className="w-3/4 md:w-1/2 ">
                    {value.docs.map(doc => (
                            <Link className="w-full text-white text-center" to={`/detailed/${doc.id}`}>
                                <p className="p-2 my-4 w-full capitalize bg-indigo-800 shadow-md rounded-md ">
                                    {doc.data().name}
                                </p>
                            </Link>
            ))}
                </div>
            ) : (
                <div className="w-3/4"><p className="text-3xl w-3/4 font-bold text-center m-6 md:w-1/2">No classes created :(</p></div>
            )}
        </div>
    )
}

export default Dashboard
