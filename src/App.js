import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import RecipeList from './components/RecipeList';
import Cook from './components/Cook';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Dropdown from './components/Dropdown';
import { nanoid } from 'nanoid'

function App() {
  const [displayMenuStatus, setDisplayMenuStatus] = useState(false)
  const [isMenuSelected, setIsMenuSelected] = useState(false)
  const [isBookmarkDisplayed, setIsBookmarkDisplayed] = useState(false)
  const [servingCount, setServingCount] = useState(1)
  const [menus, setMenus] = useState([]) 
  // const [recipeId, setRecipeId] = useState(35626)
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd09") //refactor
  const [selectedRecipe, setSelectedRecipe] = useState(0)
  const [bookmarkList, setBookmarkList] = useState([])

  function toggleMenu() {
    setDisplayMenuStatus(prev => !prev)
    setIsMenuSelected(false)
    setIsBookmarkDisplayed(false)
  }

  function toggleBookmark() {
    setIsBookmarkDisplayed(prev => !prev)
    setDisplayMenuStatus(false)
  }

  function addServing() {
    setServingCount(prev => {
      return prev + 1
    })
  }

  function reduceServing() {
    setServingCount(prev => {
      return servingCount > 1 ? prev - 1 : 1
    })
  }

  function getRecipeId(id) { // to fetch the recipe url
    menus.forEach(menu => {
      if (menu.recipe_id === id) {
        setRecipeId(id)
      }
    })
    setIsMenuSelected(prev => !prev)
    setDisplayMenuStatus(false)
  }

  function bookmarkRecipe() {
    setBookmarkList(prev => {
      return [...prev, {selectedRecipe, isBookmarked: true}]
    })
  }

  // function displaySelectedMenu() {
  //   const recipeEl = {

  //   }
  // }


  useEffect(() => {
    async function getMenu() {
      // const menuUrl = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
      const menuUrl = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza") //refactor code
      const menuData = await menuUrl.json()
      // setMenus(menuData.recipes)
      const allMenu = menuData.data.recipes
      setMenus(allMenu) // refactor code
    }
    getMenu()

    async function getSelectedrecipe() {
      // const recipeUrl = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
      const recipeUrl = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`) // refactor
      const recipeData = await recipeUrl.json()
      const allRecipe = recipeData.data.recipe
      // setSelectedRecipe(recipeData.recipe)
      setSelectedRecipe({allRecipe})
      // setSelectedRecipe(
      //   id: allRecipe.id,
      //   ingredients: allRecipe.ingredients,
      //   imageUrl: allRecipe.image_url,
      //   sourceUrl: allRecipe.source_url,
      //   title: allRecipe.title,
      //   servings: allRecipe.servings,
      //   cookingTime: allRecipe.cooking_time

      // ) //refactor
    }
    getSelectedrecipe()

  }, [recipeId])


  // ============= MAPPING COMPONENT ======================

  const menuElement = menus.map(menu => {
    return (
      <Menu 
        // key={menu.recipe_id}
        // recipe={menu.recipe_id}
        // title={menu.title}
        // imageUrl={menu.image_url}
        // publisher={menu.publisher}
        // getRecipe={() => getRecipeId(menu.recipe_id)}
        // + refactor
        key={menu.id}
        recipe={menu.id}
        title={menu.title}
        imageUrl={menu.image_url}
        publisher={menu.publisher}
        getRecipe={() => getRecipeId(menu.id)}
      />
    )
  })

  const bookmarkElement = bookmarkList.map(item => {
    return (
      <Dropdown 
        key={nanoid()}
        menuName={item.selectedRecipe.title}
        menuImage={item.selectedRecipe.image_url}
        menuPublisher={item.selectedRecipe.publisher}
      />
    )
  })
  console.log(selectedRecipe)
  // ==================================================
  return (
    <div>
      <article 
        className={`menu-list ${displayMenuStatus ? "show-menu" : "remove-menu"} ${isMenuSelected? "remove-menu" : "show-menu"}`}
      >
        {menuElement}
      </article>
      <Navbar 
        toggle={toggleMenu}  
        toggleBookmark={toggleBookmark}
      />
      <article className="dropdown">
        {isBookmarkDisplayed && bookmarkElement}
      </article>
      <main>
        <Hero 
          // menuImage={selectedRecipe.image_url}
          // title={selectedRecipe.title}
          // serving={servingCount}
          // menuImage={selectedRecipe.image_url} //refactor
          // title={selectedRecipe.title}
          // serving={servingCount}
          
          addServing={addServing}
          reduceServing={reduceServing}
          saveRecipe={bookmarkRecipe}
          bookmarked={bookmarkList}
        />
        <RecipeList
          // recipeId={selectedRecipe.recipe_id}
          // recipeIngredients={selectedRecipe.ingredients}
          recipeId={selectedRecipe.id} //refactor
          recipeIngredients={selectedRecipe.ingredients}
        />
        <Cook />
      </main>
      <Footer />
    </div>
  )
}

export default App;
