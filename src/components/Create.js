import React from 'react'
import {firestore, auth} from '../firebase'
import {  useHistory } from 'react-router-dom'

const Create = () => {
    const [name, setName] = React.useState('')
    const [load, setLoad] = React.useState(false)
    const [time, setTime] = React.useState(5)
    let history = useHistory();

    const post = async() => {
        if(name.trim().length > 0) {
            const root = firestore.collection('attendance')
            setLoad(true)
            await root.add({
            name,
            createdAt: new Date().getTime() ,
            endsAt : (new Date().getTime() ) + (parseInt(time) * 60 * 1000),
            present : [],
            author: auth.currentUser.email

        }).then((d)=> {
            history.push(`/detailed/${d.id}`)
        }).catch(e => console.log(e))
        } else {
            alert("Enter name!")
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-around items-center font-myfont">
                <input className="p-2 border border-blue-400 m-4" placeholder="Enter class name" onChange={e => setName(e.target.value)} />
                <p>Choose time limit</p>
                <select defaultValue="5" onChange={e => setTime(e.target.value)} className="py-2 px-5 m-4 text-left">
                    <option value="3">3 min</option>
                    <option value="5">5 min</option>
                    <option value="10">10 min</option>
                </select>
                <button onClick={post} className="py-2 px-4 shadow-md bg-indigo-900 text-white">Create class</button>
                {load && <p className="p-4">Please wait....</p>}
            </div>
        </div>
    )
}

export default Create