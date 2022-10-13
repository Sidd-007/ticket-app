import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const { name, email, password, password2 } = formData

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

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
            }

            dispatch(register(userData))
                .unwrap()
                .then((user) => {
                    toast.success(`Registered new user - ${user.name}`)
                    navigate('/')
                })
                .catch(toast.error)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div class="font-raleway mb-20">
            <div class="mt-12 flex items-center justify-center ">
                <form onSubmit={onSubmit} class="w-full md:w-1/3  shadow-2xl dark:bg-[#1E1E1E] rounded-lg items-center">
                    <h2 class="text-4xl text-center text-gray-700 dark:text-gray-100 mb-4 mt-10 font-semibold">Create your Account!</h2>
                    <div class="px-12 pb-10">
                        <div class="w-full mb-2 mt-10">
                            <div class="flex justify-center">
                                <input type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={onChange} class="px-8 w-full border focus:ring-blue-500 focus:border-blue-500 rounded py-2 text-gray-700 focus:outline-none items-center" />
                            </div>
                        </div>
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
                        <div class="w-full mb-2 mt-10">
                            <div class="flex justify-center">
                                <input type="password"
                                    placeholder="Confirm Password"
                                    name="password2"
                                    value={password2}
                                    onChange={onChange}
                                    class="px-8 w-full border rounded py-2 text-gray-700 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
                            </div>
                        </div>
                        <div class="flex justify-center">
                            <input
                                type="submit" class="w-1/2 mt-6 py-2 rounded bg-purple-500 text-gray-100 focus:outline-none cursor-pointer" value="Sign Up" />
                        </div>
                        <div class="flex justify-center mt-10">
                            <label class="mr-2 dark:text-gray-200" >Already have an account? </label>
                            <Link
                                to="/login"
                                class=" text-[#1EC28B] font-semibold transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                            >
                                Sign In
                            </Link>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
