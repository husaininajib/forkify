import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import RecipeList from './components/RecipeList';
import Cook from './components/Cook';
import Footer from './components/Footer';
import Menu from './components/Menu';
import { nanoid } from 'nanoid'

function App() {
  const [toggle, setToggle] = useState(false)
  const [menus, setMenus] = useState([]) //1st
  const [recipeId, setRecipe] = useState(35626)
  const [selectedRecipe, setSelectedRecipe] = useState({}) //2nd
  const [menuClicked, setMenuClicked] = useState(false)

  function toggleMenu() {
    setToggle(prev => !prev)
    setMenuClicked(false)
  }

  function getRecipe(id) {
    menus.forEach(menu => {
      if (menu.recipe_id === id) {
        setRecipe(id)
      }
    })
    setMenuClicked(prev => !prev)
    setToggle(false)
  }

  useEffect(() => {
    async function getMenu() {
      const menuUrl = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
      const menuData = await menuUrl.json()
      setMenus(menuData.recipes)
    }
    getMenu()

    async function getSelectedrecipe() {
      const recipeUrl = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
      const recipeData = await recipeUrl.json()
      setSelectedRecipe(recipeData.recipe)
    }
    getSelectedrecipe()

  }, [recipeId])

  const menuElement = menus.map(menu => {
    return (
      <Menu 
        key={menu.recipe_id}
        recipe={menu.recipe_id}
        title={menu.title}
        imageUrl={menu.image_url}
        publisher={menu.publisher}
        getRecipe={() => getRecipe(menu.recipe_id)}
      />
    )
  })

  // ==================================================
  return (
    <div>
      <article 
        className={`menu-list ${toggle ? "show-menu" : "remove-menu"} ${menuClicked? "remove-menu" : "show-menu"}`}
      >
        {menuElement}
      </article>
      <Navbar 
        toggle={toggleMenu}  
      />
      <main>
        <Hero 
          menuImage={selectedRecipe.image_url}
          title={selectedRecipe.title}
        />
        <RecipeList
          recipeId={selectedRecipe.recipe_id}
          recipeIngredients={selectedRecipe.ingredients}
        />
        <Cook />
      </main>
      <Footer />
    </div>
  )
}

export default App;
