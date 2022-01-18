import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import RecipeList from './components/RecipeList';
import Cook from './components/Cook';
import Footer from './components/Footer';
import Menu from './components/Menu';

function App() {
  const [toggle, setToggle] = useState(false)

  function toggleMenu() {
    setToggle(prev => !prev)
  }
  return (
    <div>
      <Menu 
        toggleStatus={toggle}
      />
      <Navbar 
        toggle={toggleMenu}  
      />
      <main>
        <Hero />
        <RecipeList />
        <Cook />
      </main>
      <Footer />
    </div>
  )
}

export default App;
