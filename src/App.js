import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Hero from "./components/Hero"
import ServingDetail from './components/ServingDetail';
import RecipeList from './components/RecipeList';
import Cook from './components/Cook';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Dropdown from './components/Dropdown';
import { nanoid, random } from 'nanoid'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuBarOpened, setIsMenuBarOpened] = useState(false)
  const [isMenuSelected, setIsMenuSelected] = useState(false)
  // const [showBookmarkList, setShowBookmarkList] = useState(false)
  const [menus, setMenus] = useState([]) 
  const [currentMenu, setCurrentMenu] = useState([])
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd09")
  const [bookmarkList, setBookmarkList] = useState([]) // ************
  const [searchValue, setSearchValue] = useState("pizza")
  const [input, setInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [maxMenuPerPage, setMaxMenuPerPage] = useState(7)

  const lastPage = currentPage * maxMenuPerPage //50 -10
  const firstPage = lastPage - maxMenuPerPage //45 -5
  const page = menus.slice(firstPage, lastPage)


  // page
  const nextPage = () => {
    setCurrentPage(oldNumber => (oldNumber + 1))
  }
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(oldNumber => (oldNumber - 1))
    }
  }

  // search
  const handleSearch = (ev) => {
    setInput(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setSearchValue(input)
    setInput("")
    setIsMenuBarOpened(true)
    setCurrentPage(1)
  }


  // fetching
  const menuUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
  const recipeUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
  
  const fetchMenuData = async () => {
    setIsLoading(true)
    const response = await fetch(menuUrl)
    const data = await response.json()
    setMenus(data.data.recipes)
    setIsLoading(false)
  }

  const fetchRecipeData = async () => {
    setIsLoading(true)
    const response = await fetch(recipeUrl)
    const data = await response.json()
    const recipeList = data.data.recipe
    const newCurrentMenu = {...recipeList, isSaved: false}
    setCurrentMenu(newCurrentMenu)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMenuData()
    fetchRecipeData()
  }, [recipeId,searchValue])

  const getRecipeId = (id) => {
    setRecipeId(id)
    setIsMenuBarOpened(false)
  }


  // toggle menu element
  const toggleMenuBar = () => {
      setIsMenuBarOpened(oldState => !oldState)
  }

  const handleSelectMenu = () => {
    setIsMenuBarOpened(false)
  }





  


  // ============= MAPPING COMPONENT ======================



  const menuElement = page.map(menu => {
    return (
        <Menu 
          key={menu.id}
          image={menu.image_url}
          title={menu.title}
          publisher={menu.publisher}
          handleClickMenu={() => getRecipeId(menu.id)}
        />
    )
  })

  // ====================== RENDERING APP COMPONENTS ============================

    return (
      <>
        <header className="flex justify-between items-center px-4 ">
          <Navbar
            handleMenuClick={toggleMenuBar}
          />
          <form action="" className="" onSubmit={handleSubmit}>
              <input 
                  type="text" name="search" id="search" 
                  className={`p-2 border`}
                  onChange={handleSearch}
              />
              <button type="submit">
                  <i className="fas fa-search text-2xl"></i>
              </button>
          </form>

          <nav className={`menu-list relative ${isMenuBarOpened && "show-menu"}`}
          >
              {menuElement}
              <div className="move-page flex justify-end text-2xl">

                  {currentPage > 1 && <i className="fas fa-arrow-left" onClick={previousPage}></i>}
                  <i className="fas fa-arrow-right ml-auto" onClick={nextPage}></i>
              </div>
          </nav>
        </header>
        <main>
          <Hero 
            imageUrl={currentMenu.image_url}
            title={currentMenu.title}
          />
          <ServingDetail 
            time={currentMenu.cooking_time}
            serving={currentMenu.servings}
            loading={isLoading}
          />
          <RecipeList 
            ingredients={currentMenu.ingredients}
          />
          <Cook 
            source={currentMenu.source_url}
          />
        </main>
        <Footer />
      </>
    )
}

export default App;


