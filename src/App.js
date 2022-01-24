import React, {useState, useEffect} from 'react'
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ServingDetail from "./components/ServingDetail"
import RecipeList from "./components/RecipeList"
import Cook from "./components/Cook"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Dropdown from "./components/Dropdown"
import Loading from "./components/Loading"
import { nanoid, random } from "nanoid"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuBarOpened, setIsMenuBarOpened] = useState(false)
  const [isMenuSelected, setIsMenuSelected] = useState(false)
  const [isBookmarkOpened, setIsBookmarkOpened] = useState(false)
  const [menus, setMenus] = useState([]) 
  const [currentMenu, setCurrentMenu] = useState([])
  const [currentServing, setCurrentServing] = useState(1)
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd5a")
  const [searchValue, setSearchValue] = useState("burger")
  const [input, setInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [maxMenuPerPage, setMaxMenuPerPage] = useState(6)
  const [bookmarkList, setBookmarkList] = useState([]) // ************

  const lastPage = currentPage * maxMenuPerPage
  const firstPage = lastPage - maxMenuPerPage 
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
  const fetchMenuData = async () => {
    const menuUrl = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchValue}`
    setIsLoading(true)
    const response = await fetch(menuUrl)
    const data = await response.json()
    setMenus(data.data.recipes)
    setIsLoading(false)
  }

  const fetchRecipeData = async () => {
  const recipeUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    setIsLoading(true)
    const response = await fetch(recipeUrl)
    const data = await response.json()
    const recipeList = data.data.recipe
    const newCurrentMenu = {...recipeList, isSaved: false}
    setCurrentMenu(newCurrentMenu)
    setCurrentServing(newCurrentMenu.servings)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMenuData()
    fetchRecipeData()

  }, [recipeId,searchValue])

  //get recipe id to pass to second fetch

  const getRecipeId = (id) => {
    setRecipeId(id)
    setIsMenuBarOpened(false)
  }

  // toggle menu element
  const toggleMenuBar = () => {
      setIsMenuBarOpened(oldState => !oldState)
  }

  // toggle bookmark

  const toggleBookmark = () => {
    setIsBookmarkOpened(prev => !prev)
  }

  // bookmark menu

  const addToBookmark = () => {
    console.log("clicked")
  }

  // add serving

  function addServing() {
      setCurrentServing(prevState => {
          return prevState + 1
      })
    }

  // reduce serving

  function reduceServing() {
      if (currentServing > 1) {
        setCurrentServing(prevState => {
            return prevState - 1
        })
      }
  }
  
  // ============= MAPPING COMPONENT ======================
  
  const PageArrow = () => {
    const calc = Math.ceil(menus.length / maxMenuPerPage)
    return (
      <div className="move-page flex justify-end text-2xl mt-10">
        {currentPage > 1 &&
          <div className="btn-inline mr-auto flex items-center gap-2"  onClick={previousPage}>
            <i className="bi bi-arrow-left"></i>
            <span>Page {currentPage - 1}</span>
          </div>
        }
        {currentPage < calc &&
          <div className={`btn-inline ml-auto flex items-center gap-2 ${currentPage === calc && "hidden"}`} onClick={nextPage}>
            <span>Page {currentPage + 1}</span>
            <i className="bi bi-arrow-right"></i>
          </div>
        }


      </div>
    )
  }

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

  const Ingredients = () => {
    const recipe = currentMenu.ingredients
    const recipeElement = recipe.map(item => {
      return (
        <RecipeList 
          key={nanoid()}
          defaultServing={currentMenu.servings}
          quantity={item.quantity}
          count={currentServing}
          unit={item.unit}
          description={item.description}
        />
      )
    })
    return (
      <section id="recipe" 
        className="grid place-items-center pb-10 px-4"
      >
        <h2 className="mt-8 mb-7 font-bold">RECIPE INGREDIENTS</h2>
        <ul className="grid justify-start gap-6 md:grid-cols-2 md:justify-center">
        {recipeElement}
        </ul>
      </section>
    )
  }


  const Edit = () => {
    return (
        <div className="write-icon text-2xl">
            <i className="far fa-edit"></i>
        </div>
    )
  }

  const Bookmark = () => {
    return (
        <div className="bookmark-icon text-2xl" onClick={toggleBookmark}>
            <i className="far fa-bookmark"></i>
        </div>
    )
  }

  const Form = () => { // onSubmit function cannot run properly if use this component
    return (
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
    )
  }

  // ====================== RENDERING APP COMPONENTS ============================
    return (
      <>
        <header className="flex justify-between items-center px-4 ">
          <Navbar
            handleMenuClick={toggleMenuBar}
            handleSubmit={handleSubmit}
            handleSearch={handleSearch}
          />
          <div className="flex items-center gap-2">
            <form action="" className="flex" onSubmit={handleSubmit} >
              <input 
                  type="text" name="search" id="search" 
                  placeholder="search recipes..."
                  className={`pl-3 py-1`}
                  onChange={handleSearch}
              />
              <button type="submit" className='btn gap-2 text-white'>
                <i className="bi bi-search text-base text-white"></i>
                SEARCH
              </button>
            </form>
            {/* <Edit />
            <Bookmark /> */}
          </div>
        </header>

        <div className="lg:flex">
          <nav 
            className={`menu-list fixed sm:w-9/12 lg:relative lg:top-0 lg:w-2/5 lg:mt-16 lg:translate-x-0 ${isMenuBarOpened && "show-menu"}`}
          >
              {menuElement}
              <PageArrow />
          </nav>
          <Dropdown 
            handleBookmark={isBookmarkOpened}
            image={currentMenu.image_url}
            title={currentMenu.title}
            publisher={currentMenu.publisher}
          />

          <main className='lg:w-3/5'>
            {isLoading? <Loading /> : 
              <Hero 
                imageUrl={currentMenu.image_url}
                title={currentMenu.title}
              />
            }
            <ServingDetail 
              time={currentMenu.cooking_time}
              serving={currentServing}
              loading={isLoading}
              handleAddToBookmark={addToBookmark}
              handleAdd={addServing}
              handleReduce={reduceServing}
              />
            {currentMenu.ingredients && <Ingredients />}
            <Cook 
              source={currentMenu.source_url}
              />
          </main>

        </div>
        {isLoading ? null : <Footer />}
      </>
    )
}

export default App;


