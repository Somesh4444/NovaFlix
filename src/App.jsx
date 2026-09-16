import './App.css'

import { Routes, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

import Home from './components/pages/Home'
import Details from './components/pages/Details'
import List from './components/pages/List'
import Series from './components/pages/Series'
import GenrePage from './components/pages/GenrePage'
import About from './components/pages/About'
import Watchlist from './components/pages/Watchlist'
import SearchResults from './components/pages/SearchResults'
import ScrollToTop from './components/common/ScrollToTop'

function App() {

  return (

    <div className="min-h-screen bg-linear-to-b from-[#020617] via-[#07111f] to-[#020617] text-white">
      <ScrollToTop/>
      {/* Header */}
      <Header />

      {/* Routes */}
      <Routes>

        <Route path="/" element={<Home />} />

        {/* <Route path="//movie/:id" element={<Details />} /> */}
        <Route path="/details/:type/:id" element={<Details />} />
        <Route path="/movies" element={<List />} />
        <Route path="/series" element={<Series />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App