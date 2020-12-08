
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
    let url = `https://api.unsplash.com/photos?page=${pageNo}&client_id=wCfpMYaIMhDxhXWfdVSKpvGJHxVEBgFAmX4sqDQEXuU`

    if(input){ url =`https://api.unsplash.com/search/photos?page=${pageNo}&query=${input}&client_id=wCfpMYaIMhDxhXWfdVSKpvGJHxVEBgFAmX4sqDQEXuU`}
   
    fetch(url)
    .then(response => response.json())
    .then(data =>  {

      const imagesFromApi = data.results ?? data;

      // if page is 1, then we need a whole new array of images
      if (pageNo === 1) {
        setImageArr(imagesFromApi);
        return;
      }

      // if page > 1, then we are adding for our infinite scroll
      setImageArr((images) => [...images, ...imagesFromApi]);
    })
    setPageNo(prevNo => prevNo+1)
   
  }


  useEffect(()=>{

    let randomIndex = 2;     let spanClass=""; let row = 0;

   function map(arr){ 
     return arr.map((elm,i) => {
        
      randomIndex == 2 ? randomIndex = 7 : randomIndex = 2 
     console.log(row)
     i%randomIndex == 0 ? spanClass = "span-columns" : spanClass =""
       return(
       

       <div className={`images-div ${spanClass}`}>
        <a href={elm.links.html} target="_blank"> <img src={elm.urls.small} className="images"/> </a>
       </div>)


     }) }

    if(imageArr.length !== 0){

       setGalleryDiv(map(imageArr))
      
    }
    

  },[imageArr])

  function handleSearch(e){
    e.preventDefault();
    setPageNo(1);
    fetchMoreData()
  
  }

 
  

  return (
    <div className="main-container">
      <h1>UnSplash Image Gallery</h1>

     <div className="search-container"> 
     <input type="text" value={input} onChange={handleChange} placeholder="Beautiful Day..." />    
     <button onClick={handleSearch}>Search</button> 
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
