import { useState,useEffect} from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [categories, setcategories] = useState([])
  const [search ,setSearch]=useState()
  const[datasearched,setDataSearched]=useState()

  useEffect(()=>{
    getdata()
  },[])

const getdata =  async () =>{
  try{
    const {data} = await axios.get( 'https://api.publicapis.org/categories')
    setcategories(data.categories)
    
  }
  catch(error){
    console.log(error,'error bagian axios')
  }

  }

  const handlechange = (e) =>{
   setSearch(e.target.value)
  }

  const handlesubmit = async (e) =>{
    try{
      e.preventDefault()
      const {data} = await axios.get(`https://api.publicapis.org/entries?category=${search}`)
      setDataSearched(data.entries)
    }
    catch(error){
      console.log(error,'ini error bagian handlesubmit')
    }
  }
  return (
    <div className="app">
      <h1>GET DATA API</h1>
      <form onSubmit={handlesubmit}>
      <input type="text" onChange={handlechange} />
      <button >search</button>
      </form>

      <ul>
        {datasearched && datasearched.map((data,index)=>{
          console.log(data)
          return(
           <div className="" key={index}>
            <li>{data.API}</li>
            <li>{data.Description}</li>
            <li>{data.Link}</li>
            <br />
            <br />
           </div>
          )
              
        
        })}
      </ul>
      {/* <ul>
        {datasearched && datasearched.map((category,index)=>(
          <li key={index}>{category}</li>
        ))}
      </ul> */}
   
   
    
    </div>
  )
}

export default App
