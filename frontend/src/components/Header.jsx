import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)


    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <header class="text-gray-600 body-font">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to='/' class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg width="40" height="40" viewBox="0 0 104 121" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M99.4178 0H5.63887C-0.942101 6.03256 -7.19403 25.3368 20.4461 54.293L53.351 21.3882L86.2558 54.293C109.947 25.3368 104.902 6.03256 99.4178 0Z" fill="#D6223B" />
                            <path d="M20.4458 72.3908L53.3507 39.4859L84.6104 72.3908C105.669 97.3985 93.385 114.619 84.6104 120.103H20.4458C11.1228 113.522 -1.9295 94.7661 20.4458 72.3908Z" fill="#D6223B" />
                        </svg>

                        <span class="ml-3 text-2xl">Ticket</span>
                    </Link>
                    {user ? (<nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to='/login' class="mr-5 hover:text-gray-900 font-semibold" onClick={onLogout}>Logout</Link>
                    </nav>) : (<nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to='/login' class="mr-5 hover:text-gray-900 font-semibold">Login</Link>
                        <Link to='/register' class="mr-5 hover:text-gray-900 font-semibold">Register</Link>
                    </nav>)}
                    
                    </div>
                </header>

        </>
    )
}

export default Header
