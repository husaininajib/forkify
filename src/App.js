import React, {useState, useEffect} from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ServingDetail from "./components/ServingDetail"
import RecipeList from "./components/RecipeList"
import Cook from "./components/Cook"
import Footer from "./components/Footer"
import Menu from "./components/Menu"
import Loading from "./components/Loading"
import PageArrow from "./components/PageArrow"
import Form from "./components/Form"
import { nanoid } from "nanoid"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuBarOpened, setIsMenuBarOpened] = useState(false)
  const [menus, setMenus] = useState([]) 
  const [currentMenu, setCurrentMenu] = useState([])
  const [currentServing, setCurrentServing] = useState(1)
  const [recipeId, setRecipeId] = useState("5ed6604591c37cdc054bcd5a")
  const [searchValue, setSearchValue] = useState("burger")
  const [input, setInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [maxMenuPerPage, setMaxMenuPerPage] = useState(6)

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

  // search and submit
  const handleSearch = (ev) => {
    setInput(ev.target.value)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setSearchValue(input)
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

  // add serving count
  function addServing() {
      setCurrentServing(prevState => {
          return prevState + 1
      })
    }

  // reduce serving count
  function reduceServing() {
      if (currentServing > 1) {
        setCurrentServing(prevState => {
            return prevState - 1
        })
      }
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

  const RecipesContainer = () => {
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

  const styles = {
    menuContainer: 
      `menu-container fixed sm:w-9/12 lg:relative lg:top-0 lg:w-2/5    lg:mt-16 lg:translate-x-0 ${isMenuBarOpened && "show-menu"}`,
    header: "flex justify-between items-center px-4"
  } 

  const { menuContainer, header } = styles

  // ====================== RENDERING APP COMPONENTS ============================

    return (
      <>
        <header className={header}>
          <Navbar
            handleMenuClick={toggleMenuBar}
          />
          <Form 
            query={handleSearch}
            value={handleSubmit}
          />
        </header>

        <div className="lg:flex">
          <div className={menuContainer}>
            {menuElement}
            <PageArrow 
              menus={menus}
              currentPage={currentPage}
              maxMenu={maxMenuPerPage}
              handleNextPage={nextPage}
              handlePrevPage={previousPage}
            />
          </div>

          <main className="lg:w-3/5">
            { isLoading? 
              <Loading /> : 
              <Hero 
                imageUrl={currentMenu.image_url}
                title={currentMenu.title}
              />
            }
            <ServingDetail 
              time={currentMenu.cooking_time}
              serving={currentServing}
              loading={isLoading}
              handleAdd={addServing}
              handleReduce={reduceServing}
              />
            { currentMenu.ingredients && 
            <RecipesContainer /> }
            <Cook 
              source={currentMenu.source_url}
            />
          </main>

        </div>
        { isLoading ? null : <Footer /> }
      </>
    )
}

export default App;


