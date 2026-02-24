import Body from "./components/Body"
import Header from "./components/Header"
import LoginPage from "./pages/LoginPage"
import RoomPage from "./pages/RoomPage"
import SignUpPage from "./pages/SignUpPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UploadRoom from "./pages/UploadRoom"
import FullGallery from "./components/FullGallary"
import MyRooms from "./pages/MyRooms"
import { Toaster } from "react-hot-toast"
import Favourites from "./pages/Favourites"

function App() {

  return (
    <div className="bg-mid-bg min-h-screen max-h-full">
        <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/upload-room" element={<UploadRoom />} />
            <Route path="/full-gallery" element={<FullGallery/>} />
            <Route path="/my-rooms" element={<MyRooms/>} />
            <Route path="/favourites" element={<Favourites/>} />
          </Routes>
      <Toaster/>
    </div>
  )
}


export default App