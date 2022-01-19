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
  const [menus, setMenus] = useState(null) 
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [recipeId, setRecipeId] = useState(35626)
  // const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd09") //refactor
  const [bookmarkList, setBookmarkList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)


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



  useEffect(() => {
    async function getMenu() {
      const menuUrl = await fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
      const menuData = await menuUrl.json()
      setMenus(menuData.recipes)
    }
    getMenu()
    // fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza")
    // .then(res => {
    //   return res.json()
    // })
    // .then(data => setMenus(data))

    async function getSelectedrecipe() {
      const recipeUrl = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
      const recipeData = await recipeUrl.json()
      setSelectedRecipe(recipeData.recipe)
    }
    getSelectedrecipe()

  }, [recipeId])




  // ============= MAPPING COMPONENT ======================

  // function pagination(currentPage) {
  //   // const newMenu = []
  //   for (let i = currentPage; i < currentPage * 5; i++) {
  //     // newMenu.push(menus[i])
  //     // setMenus([menus[i]])
  //     console.log(menus[i])
  //   }
  // }
  // pagination(currentPage)


  function generateMenuList() {
    const menuElement = menus.map(menu => {
      return (
        <Menu 
          key={menu.recipe_id}
          recipe={menu.recipe_id}
          title={menu.title}
          imageUrl={menu.image_url}
          publisher={menu.publisher}
          getRecipe={() => getRecipeId(menu.recipe_id)}
        />
      )
    })
    return menuElement
  }

  function generateSelectedRecipe() {
    return (
      <Hero 
          menuImage={selectedRecipe.image_url}
          title={selectedRecipe.title}
          serving={servingCount}
          addServing={addServing}
          reduceServing={reduceServing}
          saveRecipe={bookmarkRecipe}
          bookmarked={bookmarkList}
      />
    )
  }

  function generateRecipeIngredients() {
    return (
      <RecipeList
          recipeId={selectedRecipe.recipe_id}
          recipeIngredients={selectedRecipe.ingredients}
      />
    )
  }
  


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
  // ==================================================
  return (
    <div>
      <article 
        className={`menu-list ${displayMenuStatus ? "show-menu" : "remove-menu"} ${isMenuSelected? "remove-menu" : "show-menu"}`}
      >
        {menus && generateMenuList()}
      </article>
      <Navbar 
        toggle={toggleMenu}  
        toggleBookmark={toggleBookmark}
      />
      <article className="dropdown">
        {isBookmarkDisplayed && bookmarkElement}
      </article>
      <main>
        {selectedRecipe && generateSelectedRecipe()}
        {selectedRecipe && generateRecipeIngredients()}
        <Cook />
      </main>
      <Footer />
    </div>
  )
}

export default App;
