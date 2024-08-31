import SignUp from './routes/SignUp.jsx'
import Dashboard from './routes/Dashboard.jsx'
import SendMoney from './routes/SendMoney.jsx'
import SignIn from './routes/SignIn.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
