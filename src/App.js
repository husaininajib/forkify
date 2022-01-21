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
import Search from './components/Search';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuBarOpened, setIsMenuBarOpened] = useState(false)
  const [isMenuSelected, setIsMenuSelected] = useState(false)
  // const [showBookmarkList, setShowBookmarkList] = useState(false)
  const [menus, setMenus] = useState([]) 
  const [currentMenu, setCurrentMenu] = useState([])
  const [recipeId, setRecipeId] = useState(null)
  const [bookmarkList, setBookmarkList] = useState([]) // ************
  const [searchValue, setSearchValue] = useState("sushi")
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
  }

  // fetching
  // const fetchMenus = async () => {
  //   const menuUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
  //   setIsLoading(true)
  //   const fetchMenu = await fetch(menuUrl)
  //   const menuData = await fetchMenu.json()
  //   const menuList = menuData.data.recipes
  //   setMenus(menuList)
  //   setIsLoading(false)
  //   setRecipeId(menuList[0].id)
  // }

  // const fetchRecipe = async () => {
  //   menus && setRecipeId(menus[0].id)
  //   const recipeUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
  //   setIsLoading(true)
  //   const fetchRecipe = await fetch(recipeUrl)
  //   const recipeData = await fetchRecipe.json()
  //   const recipeList = recipeData.data.recipe
  //   const newCurrentMenu = {...recipeList, isSaved: false}
  //   setCurrentMenu(newCurrentMenu)
  //   setIsLoading(false)
  // }

  const menuUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
  
  useEffect(() => {
    fetchData()

  }, [searchValue])


  const [menus, setMenus] = useState([])
  const [currentMenu, setCurrentMenu] = useState([])
  const [recipeId, setRecipeId] = useState(null)
  const menuUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
  
  const fetchData = () => {
    fetch(menuUrl)
      .then(res => {return res.json()})
      .then(data => {
        const menuList = data.data.recipes
        setMenus(menuList)
        setRecipeId(menuList[0].id)
        return fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`)
      })
      .then(res => {return res.json()})
      .then(data => setCurrentMenu(data.data.recipe))
  } 



  // useEffect(() => {
  //   fetchMenus()
  //   menus && fetchRecipe()
  // }, [searchValue])


  function getRecipeId(id) {
    menus.forEach(menu => {
      if (menu.id === id) {
        setRecipeId(id)
      }
    })
    // setIsMenuSelected(prev => !prev)
    // setIsMenuOpened(false)
  }


  const toggleMenuBar = () => {
      setIsMenuBarOpened(oldState => !oldState)
  }






  


  // ============= MAPPING COMPONENT ======================



  const menuElement = page.map(menu => {
    return (
        <Menu 
          key={menu.id}
          image={menu.image_url}
          title={menu.title}
          publisher={menu.publisher}
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
                  type="search" name="search" id="search" 
                  className={`p-2 border`}
                  onChange={handleSearch}
              />
              <button type="submit">
                  <i className="fas fa-search text-2xl"></i>
              </button>
          </form>

          <nav className={`menu-list relative ${isMenuBarOpened && "show-menu"}`}>
              {menuElement}
              <div className="move-page flex justify-end text-2xl">

                  {currentPage > 1 && <i className="fas fa-arrow-left" onClick={previousPage}></i>}
                  <i className="fas fa-arrow-right ml-auto" onClick={nextPage}></i>
              </div>
          </nav>
        </header>
        <main>
          <Hero />
          <ServingDetail />
          <RecipeList />
          <Cook />
        </main>
        <Footer />
      </>
    )
}

export default App;


