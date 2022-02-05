import React from 'react'
import { Linkform } from './Linkform'
import { app, db } from './Firebase'
import { getFirestore, updateDoc, doc} from 'firebase/firestore'

const firestore = getFirestore(app);

export const Links = () => {

    const addOrEdit = async (initialStateValues, inputChange, handleSubmit) => {
        console.log('new task');
        console.log(initialStateValues, inputChange, handleSubmit);
        
        //await db.collection('post').doc().set(initialStateValues, inputChange)
        console.log('Nueva publicación agregada');

        const docRef = doc(firestore, `newPost/${initialStateValues}`);
        updateDoc(docRef, {post: [... inputChange]})

    }

    return <div>
        <Linkform addOrEdit={addOrEdit} />
    </div>
}