import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket } from '../features/tickets/ticketSlice'

function NewTicket() {

    const [product, setProduct] = useState('iPhone')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
            .unwrap()
            .then(() => {
                navigate('/tickets')
                toast.success('New ticket created!')
            })
            .catch(toast.error)
    }

    return (
        <>
            <div className='h-auto font-raleway'>
                {/* <section className="mx-auto mb-12 mt-10 overflow-hidden py-0 px-8 font-din"> */}
                <div className='flex flex-col justify-center items-center'>
                    <span className="sm:text-4xl text-4xl mt-8 dark:text-gray-300">
                        Create New Ticket
                    </span>

                    <form class="w-full md:w-1/3 mt-16 shadow-2xl dark:bg-[#1E1E1E] rounded-lg mb-10 dark:text-gray-300" onSubmit={onSubmit}>
                        <div className='px-12 pb-10'>

                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <select
                                        className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:ring-blue-500 focus:border-blue-500" id="grid-state'
                                        name='product'
                                        id='product'
                                        value={product}
                                        onChange={(e) => setProduct(e.target.value)}
                                    >
                                        <option value='iPhone'>iPhone</option>
                                        <option value='Macbook Pro'>Macbook Pro</option>
                                        <option value='iMac'>iMac</option>
                                        <option value='iPad'>iPad</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-2">
                                <div className='form-group flex flex-col ml-3'>
                                    <label htmlFor='description' className='font-medium'>Description of the issue</label>
                                    <textarea
                                        name='description'
                                        id='description'
                                        className='form-control mt-2'
                                        placeholder='Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                            </div>

                            <div className='form-group'>
                                <button className='flex px-6 py-2.5 bg-blue-600 text-white text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-8'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* </section> */}
            </div>
        </>
    )
}

export default NewTicket


