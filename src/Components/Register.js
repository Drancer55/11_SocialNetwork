import { useState } from 'react';
import { useAuth } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from './Alert';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Register() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const {signup} = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState();

    const handleChange = ({target: { name, value }}) => 
        // console.log(name, value);
        setUser({ ...user, [name]: value }); 

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        //console.log(user);
        try {
            await signup(user.email, user.password)
            navigate('/')
        } catch (error) {
            //console.log(error.message);
            // if (error.code === "auth/internal-error") {
            //     setError("Email invalido")
            // }
            setError(error.message)
        }
    }

    return (
        <div className='w-full max-w-xs m-auto'>
            <Logo/>
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className='bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <p className='text-sm text-center text-gray-700'>Ingresa un correo y una contraseña con mínimo de 6 carácteres alfanuméricos</p>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-800 text-sm font-bold my-2'>Email: </label>
                    <input type="email" name="email" placeholder="example_user@mail.com" onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 loading-tight focus:outline-none focus:shadow-outline'/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="password" className='block text-gray-800 text-sm font-bold my-2'>Contraseña: </label>
                    <input type="password" name="password" placeholder=' mínimo 6 carácteres alfanuméricos' id="password" onChange={handleChange} className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 loading-tight focus:outline-none focus:shadow-outline'/>
                </div>

                <button className='bg-yellow-400 hover:bg-yellow-700 font-bold text-sm py-2 mt-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'>Registrate</button>
            </form>
            <Link to='/login'><button className='bg-gray-400 hover:bg-gray-600 font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'>Regresar</button></Link>
        </div>
    )
}