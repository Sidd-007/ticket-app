import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import NewTicket from './pages/NewTicket'
import Tickets from './pages/Tickets'
import Ticket from './pages/Ticket'


function App() {
    return (
        <div>
            <Router >
                <div className="container font-raleway">
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route
                            path='/new-ticket'
                            element={
                                <PrivateRoute>
                                    <NewTicket />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/tickets'
                            element={
                                <PrivateRoute>
                                    <Tickets />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/ticket/:ticketId'
                            element={
                                <PrivateRoute>
                                    <Ticket />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}
export default App