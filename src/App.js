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
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isMenuSelected, setIsMenuSelected] = useState(false)
  const [showBookmarkList, setShowBookmarkList] = useState(false)
  const [menus, setMenus] = useState(null) 
  const [currentMenu, setCurrentMenu] = useState(null)
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd09")
  const [bookmarkList, setBookmarkList] = useState([])
  const [servingCount, setServingCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)


  function toggleMenu() {
    setIsMenuOpened(prev => !prev)
    setIsMenuSelected(false)
    setShowBookmarkList(false)
  }

  function toggleBookmark() {
    setShowBookmarkList(prev => !prev)
    setIsMenuOpened(false)
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
      if (menu.id === id) {
        setRecipeId(id)
      }
    })
    setIsMenuSelected(prev => !prev)
    setIsMenuOpened(false)
  }

  function saveMenu() {
    setCurrentMenu(prev => {
      return {...prev, isSaved: !prev.isSaved}
    })
    // setBookmarkList(prev => {
    //   return currentMenu.isSaved ? [...prev, currentMenu] : [...prev]
    // })
    const allSavedMenus = []
    currentMenu.isSaved ? allSavedMenus.push(currentMenu) : allSavedMenus.pop(currentMenu)
    setBookmarkList(allSavedMenus)
    // setBookmarkList(currentMenu.isSaved ? )
  }

  
  useEffect(() => {
    fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza")
    .then(res => res.json())
    .then(data => {
      const menuList=data.data.recipes
      setMenus(menuList)
    })

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`)
    .then(res => res.json())
    .then(data => {

      const recipeDetails = data.data.recipe
      const newCurrentMenu = {...recipeDetails, isSaved: false}

      setCurrentMenu(newCurrentMenu)
        // localStorage.setItem("Menu", JSON.stringify())
    }) 
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
          key={menu.id}
          menuID={menu.id}
          title={menu.title}
          imageUrl={menu.image_url}
          publisher={menu.publisher}
          getRecipe={() => getRecipeId(menu.id)}
        />
      )
    })
    return menuElement
  }

  function generateSelectedRecipe() {
    return (
      <Hero
        imageUrl={currentMenu.image_url}
        title={currentMenu.title}
        time={currentMenu.cooking_time}
        servingCount={currentMenu.servings}
        addServingCount={addServing}
        reduceServingCount={reduceServing}
        saveRecipe={saveMenu}
        bookmarkedList={bookmarkList}
      />
    )
  }

  function generateRecipeIngredients() {
    return (
      <RecipeList
          recipeId={currentMenu.id}
          ingredientsList={currentMenu.ingredients}
      />
    )
  }
  
  const dropdownElement = bookmarkList.map(menu => {
    return (
      <Dropdown 
        key={menu.id}
        imageUrl={menu.imageUrl}
        title={menu.title}
        publisher={menu.publisher}
      />
    )
  })
  
  // ==================================================
  return (
    <div>
      <article 
        className={
          `menu-list ${isMenuOpened && "show-menu"} 
          ${isMenuSelected && "remove-menu"}`
        }
      >
        {menus && generateMenuList()}
      </article>
      <Navbar 
        toggle={toggleMenu}  
        toggleBookmark={toggleBookmark}
      />
      <article className="dropdown">
        {showBookmarkList && dropdownElement}

      </article>
      <main>
        {currentMenu && generateSelectedRecipe()}
        {currentMenu && generateRecipeIngredients()}
        {
          currentMenu &&
        <Cook 
          sourceUrl={currentMenu.sourceUrl}
        />}
      </main>
      <Footer />
    </div>
  )
}

export default App;


// currentMenu.isSaved ? bookmarklist.push(currentMenu) : bookmarkList.pop(currentMenu)
