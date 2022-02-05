import React, {useState, useEffect} from 'react';
// import {useNavigate} from 'react-router-dom'
import { firebaseApp } from './Firebase';
import { useAuth } from '../Context/authContext';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { AddPost } from './AddPost';
import { ListPost } from './ListPost';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// import { Logo } from './Logo'

const firestore = getFirestore(firebaseApp)

export function Home() {
    const [arrayPost, setArrayPost] = useState(null);
    useEffect(() => {
        async function fetchTareas() {
            const tareasFetch = await searchOrCreateDocument(useAuth);
            setArrayPost(tareasFetch);
        }
        fetchTareas();
}, []);

    const { user, logout, loading } = useAuth()
    //     //const authContext = useContext(context)
    console.log(user); //para ver el usuario actual
    // const navigate = useNavigate()
    const handleLogout = async () => {
        // navigate("/Login");
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    const userName = user.displayName || user.email;

    if (loading) return <h1 className='w-full'><i className="large material-icons">directions_bike</i> Cargando... <i className="large material-icons">directions_bike</i></h1>
    
    const testText = [
        { id: 1, title: 'Primer Post', description: 'Hola mundo1' },
        { id: 2, title: 'Segundo Post', description: 'Hola mundo2' },
        { id: 3, title: 'Tercer Post', description: 'Hola mundo3' },
    ]

    async function searchOrCreateDocument(idDocument) {
        // Crear referencia al documento
        const docRef = doc(firestore, `newPost/${idDocument}`)
        // buscar documento
        const consulta = await getDoc(docRef);
        // revisar existencia
        if (consulta.exists()) {
            //  en caso de existir...        
            const infDoc = consulta.data();
            return infDoc.tareas;
        } else {
            //en caso de no existir...
            await setDoc(docRef, { tareas: [...testText] });
            const consulta = await getDoc(docRef);
            const infDoc = consulta.data();
            return infDoc.tareas;
        }
    }
    
    return (
        <div >
            <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                <Container>
                    <div className='bg-dark rounded shadow-md '>
                        <img className='imagen' src={user.photoURL} alt='Perfil' />
                    </div>
                <Navbar.Brand href="#home"><h1 className='text-center w-full text-sm mx-2 text-gray-300'><i className="large material-icons color-red-300">directions_bike| </i> {userName} | <i className="large material-icons">directions_bike</i></h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto px-5">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                            <button className='bg-gray-500 hover:bg-red-700 hover:text-white rounded font-light py-1 px-4 focus:outline-none focus:shadow-outline text-center text-white' onClick={handleLogout}>LogOut</button>
                        </Nav>
                        {/* <Nav><Logo/></Nav> */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <div className='container p-4'>
                <div className='row'>
                    <AddPost
                        arrayPost={arrayPost}
                        setArrayPost={setArrayPost}
                        user={userName} />    
                    {
                        arrayPost ? 
                            <ListPost
                                arrayPost={arrayPost}
                                setArrayPost={setArrayPost} 
                                user={userName} />
                            : null
                    }
                </div>
            </div>
        </div>
    )};
