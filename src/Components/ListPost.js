import React from 'react';
import { Card, Stack } from 'react-bootstrap';
import { useAuth } from '../Context/authContext';
import { firebaseApp } from './Firebase'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

const firestore = getFirestore(firebaseApp);

export const ListPost = ({ arrayPost, setArrayPost}) => {
    const { user } = useAuth()
    console.log(user.displayName);

    async function erase(idTaskErase) {
        const newArrayPost = arrayPost.filter((objPost) => objPost.id !== idTaskErase)
    // actualizar base de datos
    const docRef = doc(firestore, `newPost/${user.email || user.displayName}`);
        updateDoc(docRef, { tareas: [...newArrayPost] });
        // actualizar state
        setArrayPost(newArrayPost);
    };
    return (
    <Stack>
            {arrayPost.map((objPost) => {
                // console.log(arrayPost);
        return ( 
            <Card>
                <Card.Header className='text-center'>
                    <h5><i className="large material-icons">directions_bike</i>| </h5>
                </Card.Header>
                <Card.Title className='text-center'>
                { objPost.title }
                </Card.Title>
                <Card.Text className='text-center'>
                { objPost.description }
                </Card.Text>
                <div >
                    <button className='btn btn-primary' onClick={() => erase(objPost.id)}>
                        Eliminar
                    </button>
                    <button className='btn btn-secondary'>
                        Editar
                    </button>
                </div>
                <hr/>
            </Card>
            )
    })
            
        
        }
        </Stack>
    )
}