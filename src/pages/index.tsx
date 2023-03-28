import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from '../components/Home/Home'

import '../assets/styles/tailwind.css'

const Main = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='*' element={<Navigate to='/home' />} />
			</Routes>
		</BrowserRouter>
	)
}

const root = createRoot(document.querySelector('body > div'))
root.render(<Main />)