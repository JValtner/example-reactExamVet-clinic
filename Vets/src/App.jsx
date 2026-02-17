import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Home from "./components/home/Home"
import Login from "./components/users/login"
import Register from "./components/users/register"
import Profile from "./components/users/profile"
import "./styles/style.scss"
import PatientsView from "./components/patients/PatientsView"
import PatientForm from "./components/form/PatientForm"
import PatientsFilterSection from "./utils/PatientsFilterSection"
import Appointment from "./components/appointments/Appointment"
import DoctorAppointment from "./components/appointments/DoctorAppointment"

const App = () => (
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<PatientsView />} />
          <Route path="/patientsForm" element={<PatientForm />} />
          <Route path="/patientsForm/:id" element={<PatientForm />} />
          <Route path="/patientsFilterSection" element={<PatientsFilterSection />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/appointments/edit/:id" element={<Appointment />} />
          <Route path="/doctorAppointments" element={<DoctorAppointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
