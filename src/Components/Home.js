// import {useNavigate} from 'react-router-dom'
import { useAuth } from '../Context/authContext'

export function Home() {
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
    if (loading) return <h1 className='w-full'>Cargando...</h1>
    return (
        <div className='w-full max-w-xl m-auto'>
            <div className='bg-white rounded shadow-md px-10 pt-2 pb-3 mb-4 flex'>
                <img className='imagen' src={user.photoURL} alt='Perfil'/>
                <h1 className='mb-1 text-center w-full mt-5 text-sm'>Bikerband ID: {user.displayName || user.email}</h1>
            </div>
            <button className='bg-gray-300 hover:bg-red-700 hover:text-white rounded font-light py-1 px-2 focus:outline-none focus:shadow-outline text-center' onClick={handleLogout}>LogOut</button>
        </div>
        
    )};
