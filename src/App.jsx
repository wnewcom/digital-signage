import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { SocketProvider } from '@/contexts/SocketContext'
import { DisplayProvider } from '@/contexts/DisplayContext'

// Pages
import Dashboard from '@/pages/Dashboard'
import Displays from '@/pages/Displays'
import Layout from '@/pages/Layout'
import Slideshows from '@/pages/Slideshows'
import SlideshowDetail from '@/pages/SlideshowDetail'
import Preview from '@/pages/Preview'
import Display from '@/pages/Display'
import Login from '@/pages/Login'
import ProtectedRoute from '@/components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <DisplayProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/display/:id" element={<Display />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/displays" element={
                <ProtectedRoute>
                  <Displays />
                </ProtectedRoute>
              } />
              <Route path="/layout/:id" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              <Route path="/slideshows" element={
                <ProtectedRoute>
                  <Slideshows />
                </ProtectedRoute>
              } />
              <Route path="/slideshow/:id" element={
                <ProtectedRoute>
                  <SlideshowDetail />
                </ProtectedRoute>
              } />
              <Route path="/preview/:id" element={
                <ProtectedRoute>
                  <Preview />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </div>
        </DisplayProvider>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App