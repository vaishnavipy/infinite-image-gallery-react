
import { useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from "react-infinite-scroll-component";

function App() {

  const [input,setInput] = useState("")

  const [imageArr,setImageArr] = useState([])

  const [galleryDiv,setGalleryDiv] = useState("")

  const [pageNo,setPageNo] = useState(1)

 

  function handleChange(event){

    setInput(event.target.value)
  }


  useEffect(()=>{
    
    fetchMoreData()
  
  },[])

  function fetchMoreData(){

    fetch(`https://api.unsplash.com/photos?page=${pageNo}&per_page=20&client_id=wCfpMYaIMhDxhXWfdVSKpvGJHxVEBgFAmX4sqDQEXuU`)
    .then(response => response.json())
    .then(data =>   setImageArr(prevArr => [...prevArr,...data]) )

    setPageNo(prevNo => prevNo+1)
  }


  useEffect(()=>{

    let randomIndex = 2;     let spanClass=""; let row = 0;

    if(imageArr.length !== 0){

       setGalleryDiv(  imageArr.map((elm,i) => {
        
        
         randomIndex == 2 ? randomIndex = 7 : randomIndex = 2 
        console.log(row)
        i%randomIndex == 0 ? spanClass = "span-columns" : spanClass =""
          return(
          

          <div className={`images-div ${spanClass}`}>
           <a href={elm.links.html} target="_blank"> <img src={elm.urls.small} className="images"/> </a>
          </div>)


        })
       )

    }
  },[imageArr])

 
  

  return (
    <div className="main-container">
      <h1>UnSplash Image Gallery</h1>

     <div className="search-container"> 
     <input type="text" value={input} onChange={handleChange} placeholder="Beautiful Day..." />    
     <button>Search</button> 
     </div> 

     <InfiniteScroll 
        dataLength={imageArr.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}>

     <div className="gallery-grid">
      {galleryDiv}
     </div>

     </InfiniteScroll>

    </div>
  );
}

export default App;
