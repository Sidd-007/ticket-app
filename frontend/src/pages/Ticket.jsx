import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote } from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'


const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const { ticket } = useSelector((state) => state.tickets)

    const { notes } = useSelector((state) => state.notes)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ticketId } = useParams()

    useEffect(() => {
        dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
        dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
    }, [ticketId, dispatch])

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
            .unwrap()
            .then(() => {
                toast.success('Ticket Closed')
                navigate('/tickets')
            })
            .catch(toast.error)
    }

    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ noteText, ticketId }))
            .unwrap()
            .then(() => {
                setNoteText('')
                closeModal()
            })
            .catch(toast.error())
    }

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    if (!ticket) {
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
                                    <th class="px-4 py-3">Ticket ID</th>
                                    <th class="px-4 py-3">Product</th>
                                    <th class="px-4 py-3">Description of Issue</th>
                                    <th class="px-4 py-3">Notes</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="text-gray-700" key={ticket._id}>
                                    <td class="px-4 py-3 border">
                                        <div class="flex items-center text-sm">
                                            <div>
                                                <p class="font-semibold">{ticket._id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-4 py-3 border">
                                        <span class="px-2 py-1 text-lg font-semibold">{ticket.product}</span>
                                    </td>
                                    <td class="px-4 py-3 border text-md">{ticket.description}</td>

                                    <td class="px-4 py-3 border text-md font-semibold">{ticket.status !== 'closed' && (
                                        <button onClick={openModal} class="relative inline-flex items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group">
                                            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </span>
                                            <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">Add Note</span>
                                            <span class="relative invisible">Add Note</span>
                                        </button>
                                    )}

                                        <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel='Add Note'
                                        >
                                            <div className=' flex justify-between'>

                                                <h2 className='font-semibold'>Add Note</h2>
                                                <button className='btn-close' onClick={closeModal}>
                                                    X
                                                </button>
                                            </div>
                                            <form onSubmit={onNoteSubmit}>
                                                <div className='mt-4'>
                                                    <textarea
                                                        name='noteText'
                                                        id='noteText'
                                                        className=''
                                                        placeholder='Note text'
                                                        value={noteText}
                                                        onChange={(e) => setNoteText(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div className='mt-4'>
                                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </Modal>

                                        {notes ? (
                                            notes.map((note) => <NoteItem key={note._id} note={note} />)
                                        ) : (
                                            <Spinner />
                                        )}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className='flex justify-center items-center'>

                {ticket.status !== 'closed' && (

                    <button onClick={onTicketClose} class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-indigo-100 border border-indigo-500 rounded-lg shadow-sm cursor-pointer hover:text-white bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-500">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span class="relative">Close Ticket</span>
                    </button>
                )}
            </div>

        </>
    )
}

export default Ticket
