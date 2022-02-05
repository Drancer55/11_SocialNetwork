import React from 'react';
import { Card } from 'react-bootstrap'
import { useAuth } from '../Context/authContext';
import { firebaseApp } from './Firebase';
import { getFirestore, updateDoc, doc} from 'firebase/firestore'

const firestore = getFirestore(firebaseApp)

export const AddPost = ({ setArrayPost, arrayPost }) => {
    console.log(setArrayPost);
    const { user } = useAuth()
    const userName = user.displayName || user.email;
    console.log(userName);
    
    async function createPost(e) {
        e.preventDefault();

        const title = e.target.title.value;
        const publish = e.target.publish.value;

        //crear nuevo array de publicación
        const newArrayPost = [...arrayPost, {id: + new Date(), title: title, description: publish, url: 'https://picsum.photos/420'}]
        // actualizar base de datos
        const docRef = doc(firestore, `newPost/${userName}`);
        updateDoc(docRef, { tareas: [...newArrayPost] });
        // actualizar estado
        setArrayPost(newArrayPost);
        // limpiar form
        e.target.title.value = '';
        e.target.publish.value = '';
    } 

    return (
    <div>
        <Card>
                <Card.Header className='text-center'>
                    <h5><i className="large material-icons">directions_bike</i>  Nueva Publicación</h5>
                </Card.Header>
                <form onSubmit={createPost}>
                    <Card.Title>
                        <input type="text" className='form-control' placeholder='Agrega un titulo' name='title' id='title'></input>
                    </Card.Title>
                    <Card.Text>
                        <div className='form-group'>
                            <textarea name='publish' rows={4} className='form-control' placeholder='¿Qué hay de nuevo?' id='publish'></textarea>    
                        </div>
                    </Card.Text>
                        <button className='btn btn-primary w-full'>
                            Publicar
                        </button>
                        {/* <Button variant="primary">
                            Go somewhere
                        </Button> */}
                </form>
            </Card>
    </div>
        )
}