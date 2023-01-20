import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../shared/components/Navbar'
import { DCPage, HeroPage, MarvelPage, SearchPage } from '../pages'

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          //Default route
          <Route path="/" element={<Navigate to="/marvel" />} />

          //Heroes pages
          <Route path="marvel" element={<MarvelPage />} />
          <Route path="dc" element={<DCPage />} />

          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPage />} />
        </Routes>
      </div>

    </>
  )
}
