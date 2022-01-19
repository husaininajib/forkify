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
  const [showBookmarkList, setShowBookmarkList] = useState(false)
  const [menus, setMenus] = useState(null) 
  const [currentMenu, setCurrentMenu] = useState(null)
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd09")
  const [bookmarkList, setBookmarkList] = useState([])
  const [servingCount, setServingCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)


  function toggleMenu() {
    setDisplayMenuStatus(prev => !prev)
    setIsMenuSelected(false)
    setShowBookmarkList(false)
  }

  function toggleBookmark() {
    setShowBookmarkList(prev => !prev)
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
      if (menu.id === id) {
        setRecipeId(id)
      }
    })
    setIsMenuSelected(prev => !prev)
    setDisplayMenuStatus(false)
  }

  // function bookmarkRecipe() {
  //   const recipeInfo = currentMenu.recipeDetails
  //   setBookmarkList(prev => {
  //     return [...prev, {recipeInfo, isBookmarked: true}]
  //   })
  // }

  function bookmarkRecipe() {
    // const recipeInfo = currentMenu.recipeDetails
    // setBookmarkList(prev => {
    //   return [...prev, {recipeInfo, isBookmarked: true}]
    // })
    setBookmarkList(prev => {
      return [...prev, {currentMenu, isSaved: !currentMenu.isSaved}]
    })

  }
  
  useEffect(() => {
    fetch("https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza")
    .then(res => res.json())
    .then(data => {
      const menuList=data.data.recipes
      setMenus(menuList)
    })

    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`)
    .then(res => res.json()
)
    .then(data => {
      const recipeDetails = data.data.recipe
      setCurrentMenu({recipeDetails, isSaved: false})
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
    const menuInfo = currentMenu.recipeDetails
    return (
      <Hero 
        imageUrl={menuInfo.image_url}
        title={menuInfo.title}
        servingCount={servingCount}
        addServingCount={addServing}
        reduceServingCount={reduceServing}
        saveRecipe={bookmarkRecipe}
        bookmarkedList={bookmarkList}
      />
    )
  }

  function generateRecipeIngredients() {
    const menuInfo = currentMenu.recipeDetails
    return (
      <RecipeList
          recipeId={menuInfo.id}
          ingredientsList={menuInfo.ingredients}
      />
    )
  }
  


  // const bookmarkElement = bookmarkList.map(item => {
  //   return (
  //     // <Dropdown 
  //     //   key={nanoid()}
  //     //   menuName={item.currentMenu.title}
  //     //   menuImage={item.currentMenu.image_url}
  //     //   menuPublisher={item.currentMenu.publisher}
  //     // />
  //     <Dropdown 
  //       key={nanoid()}
  //       // menuName={item.currentMenu.title}
  //       // menuImage={item.currentMenu.image_url}
  //       // menuPublisher={item.currentMenu.publisher}
  //     />
  //   )
  // })
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
        {/* {showBookmarkList && bookmarkElement} */}
      </article>
      <main>
        {currentMenu && generateSelectedRecipe()}
        {currentMenu && generateRecipeIngredients()}
        {
          currentMenu &&
          <Cook 
          sourceUrl={currentMenu.recipeDetails.source_url}
        />}
      </main>
      <Footer />
    </div>
  )
}

export default App;
