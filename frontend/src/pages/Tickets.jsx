import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

function Tickets() {
    const { tickets } = useSelector((state) => state.tickets)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (!tickets) {
        return <Spinner />
    }

    return (
        <>
            <section class="container mx-auto p-6 text-gray-900">
                <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div class="w-full overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th class="px-4 py-3">Product</th>
                                    <th class="px-4 py-3">Status</th>
                                    <th class="px-4 py-3">Date</th>
                                    <th class="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                {tickets.map((ticket) => (
                                    <tr class="text-gray-700" key={ticket._id}>
                                        <td class="px-4 py-3 border">
                                            <div class="flex items-center text-sm">
                                                <div>
                                                    <p class="font-semibold">{ticket.product}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-4 py-3 border text-xs">
                                            <span class="px-2 py-1 font-semibold text-lg text-green-700 "> <div className={`status status-${ticket.status}`}>{ticket.status}</div></span>
                                        </td>
                                        <td class="px-4 py-3 border text-md">{new Date(ticket.createdAt).toLocaleString('en-US')}</td>
                                        <td class="px-4 py-3 border text-md font-semibold"><Link to={`/ticket/${ticket._id}`} class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-purple-600 active:shadow-none shadow-lg bg-gradient-to-tr from-purple-600 to-purple-500 border-purple-700 text-white">
                                            <span class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                            <span class="relative">View</span>
                                        </Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Tickets
