import { useSelector } from 'react-redux'

function NoteItem({ note }) {
    const { user } = useSelector((state) => state.auth)

    return (
        <div
            className=''
            style={{
                backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
                color: note.isStaff ? '#fff' : '#000',
            }}
        >
            <p className='ml-2 mt-2 p-2'>{note.text}</p>
        </div>
    )
}

export default NoteItem
