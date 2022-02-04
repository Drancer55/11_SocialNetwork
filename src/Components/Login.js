import { useState } from 'react';
import { useAuth } from '../Context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from './Alert';
import { Logo } from './Logo';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import { auth } from './Firebase'

export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const {login, loginWithGoogle, resetPassword} = useAuth();
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
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            //console.log(error.message);
            // if (error.code === "auth/internal-error") {
            //     setError("Email invalido")
            // }
            setError(error.message)
        }
    };

    const handleGoogleSignin = async () => {
        try {
            // throw new Error('Google Error')
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    }

    const handleFacebookSignin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
            .then((re) => { navigate('/')
            console.log(re);
            })
            .catch((err) => {
            console.log(err.message);
        })
    }

    const handleResetPassword = async() => {
        if (!user.email) return setError("Por favor, ingresa un email")
        try {
            await resetPassword(user.email)
            setError('¡Revisa tu bandeja de entrada! hemos enviado un enlace para reestablecer tu contraseña :D')
        } catch (error) {
            setError(error.message)
        }
    }

    return (    
        <div className='w-full max-w-xs m-auto'>
            <Logo/>
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className='bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className='mb-2 mt--2'>
                <label htmlFor="email" className='block text-gray-900 text-sm font-fold mb-2'>Email: </label>
                <input type="email" name="email" placeholder=" example_user@mail.com " onChange={handleChange} className='shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                </div>

                <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-900 text-sm font-fold'>Contraseña: </label>
                <input type="password" name="password" placeholder=' Contraseña ' id="password" onChange={handleChange} className='shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline leading-tight'/>
                </div>

                <button className='bg-yellow-500 hover:bg-yellow-800 hover:text-gray-300 rounded text-brown font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-center w-full'> Inicia sesión </button>
                <button onClick={handleGoogleSignin} className='bg-gray-400 hover:bg-gray-600 hover:border-gray-400 text-black shadow-md rounded border-2 border-gray-600 mt-1 py-2 px-4 w-full font-bold'>Inicia sesión con Google</button>
                <button onClick={handleFacebookSignin} className='bg-blue-600 hover:bg-blue-900 text-black shadow-md rounded border-2 border-blue-900 hover:border-blue-600 mt-1 py-2 px-4 w-full font-bold'>Inicia sesión con Facebook</button>
                
            </form>
            <div>
                <p className='my-2 text-sm flex justify-between px-10 inline-block align-baseline'>¿Olvidaste tu contraseña? <a href='#!' className='font-bold inline-block text-sm text-orange-600 hover:text-red-800' onClick={handleResetPassword}>Recuperala</a></p>
                <p className='my-2 text-sm flex justify-between px-10'>¿Aún no tienes una cuenta? <Link to='/register' className='font-bold'> Registrate</Link></p>
            </div>
        </div>
    )
}