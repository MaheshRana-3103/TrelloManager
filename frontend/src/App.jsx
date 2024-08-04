import Navbar from "./components/Navbar"
import './App.css'
import Register from "./components/Register"
import Login from "./components/Login"
import Tasks from "./components/Tasks"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import QueryProvider from "./components/QueryProvider"
import { Toaster } from "react-hot-toast"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { GoogleOAuthProvider } from '@react-oauth/google';
function App() {

  return (
    <QueryProvider>
      <div><Toaster position="top-right"reverseOrder={false}/></div>
      <Router>
        <Navbar/>
        <GoogleOAuthProvider clientId="712548217029-34pgq89lk08glignfsnbr3du4a0bbaib.apps.googleusercontent.com">
          <Routes>
              <Route path='/sign-in' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path="/" element={<ProtectedRoute element={
              <DndProvider backend={HTML5Backend}>
                <Tasks />
              </DndProvider>
              
              } />} />
          </Routes>
        </GoogleOAuthProvider>
      </Router>
    </QueryProvider>
  )
}

export default App
