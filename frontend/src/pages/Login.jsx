import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
            .unwrap()
            .then((user) => {
                toast.success(`Logged in as ${user.name}`)
                navigate('/')
            })
            .catch(toast.error)
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div class="font-raleway">
            <div class="mt-12 flex items-center justify-center ">
                <form onSubmit={onSubmit} class="w-full md:w-1/3  shadow-2xl dark:bg-[#1E1E1E] rounded-lg items-center">
                    <h2 class="text-4xl text-center text-gray-700 dark:text-gray-100 mb-4 mt-10 font-semibold">Welcome Back!</h2>
                    <div class="px-12 pb-10">
                        <div class="w-full mb-2 mt-10">
                            <div class="flex justify-center">
                                <input type="email"
                                    placeholder="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={onChange} class="px-8 w-full border focus:ring-blue-500 focus:border-blue-500 rounded py-2 text-gray-700 focus:outline-none items-center" />
                            </div>
                        </div>
                        <div class="w-full mb-2 mt-10">
                            <div class="flex justify-center">
                                <input type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    class="px-8 w-full border rounded py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <input
                                type="submit" class="w-1/2 mt-6 py-2 rounded bg-purple-500 text-gray-100 focus:outline-none cursor-pointer" value="Log In" />
                        </div>
                        <div class="flex justify-center mt-10">
                            <label class="mr-2 dark:text-gray-200" >Don't have an account? </label>
                            <Link
                                to="/register"
                                class=" text-[#1EC28B] font-semibold transition duration-500 ease-in-out overflow-hidden  transform hover:-translate-x hover:scale-105"
                            >
                                Sign Up
                            </Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login