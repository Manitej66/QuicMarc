import React from 'react'
import Nav from './Nav'
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase'


const Main = ({ code }) => {
    const [value, loading, error] = useCollection(
        firestore().collection('attendance'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    return (
        <div>
            <Nav />
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            <p className="font-extrabold font-myfont p-2">Manitej room</p>
            {value && (
                <span>
                    {
                        value.forEach()
                    }
                </span>
            )}
        </div>
    )
}

export default Main
