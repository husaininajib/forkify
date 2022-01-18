import './App.css';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import RecipeList from './components/RecipeList';
import Cook from './components/Cook';
import Footer from './components/Footer';
import Menu from './components/Menu';

function App() {
  function toggleMenu() {
    console.log("clicked")
  }
  return (
    <div>
      <Menu />
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
