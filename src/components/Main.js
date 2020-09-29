import React from 'react'
import { firestore } from '../firebase'
import firebase from 'firebase/app'
const arrayUnion = firebase.firestore.FieldValue.arrayUnion;

const Main = ({ code }) => {
    const [roll, setRoll] = React.useState('')
    const id = window.location.pathname.split('/')[2]

    const post = async() => {
       if( localStorage.getItem(`${id}`) === 'done') {
           alert("You already submitted!")
       }
       else {
        const doc = firestore.collection('attendance').doc(id)
        await doc.update({
            present: arrayUnion(roll)
        }).then(()=> {
            localStorage.setItem(`${id}`, 'done')
            alert('Success!')
        }).catch(e => console.log(e))
       }
    }


   
    return (
        <div>
            <div className="flex flex-col justify-around items-center p-3 font-myfont">
            <p className="p-2 text-3xl font-bold text-blue-900">Manitej room</p>
            <input className="p-2 border w-3/4 text-center shadow-xs m-4 sm:w-1/2" placeholder="Enter your roll" onChange={e=> setRoll(e.target.value)} />
            <button onClick={post} className="py-2 px-4 bg-purple-800 text-white m-4 shadow-sm">Present</button>
            </div>
        </div>
    )
}

export default Main
