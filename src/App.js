import "./App.css";
import { useState } from "react";

const data = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg"
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg"
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key"
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt"
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg"
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key"
  }
];

const BLUE = "#87CEEB";

let prv = -1;
for (let i = 0; i < 35; i++) {
  let num = Math.floor(Math.random() * 6);
  if (prv >= 0 && (num >= data.length || data[num].title === data[prv].title)) {
    i--;
    continue;
  }
  prv = num;
  data.push(data[num]);
}

let pageContent = [];
let totalPages = Math.ceil(+data.length / 4);

for (let i = 0; i < totalPages; i++) {
  let arrImagePage = [],
    len = Math.min(data.length, 4 * i + 4);
  for (let j = 4 * i; j < len; j++) {
    arrImagePage.push(data[j]);
  }
  pageContent.push(arrImagePage);
}

export default function MyApp() {
  const [imageId, setImageId] = useState(0);

  function onKeyPressed(event) {
    event.preventDefault();
    if(event.key === "ArrowDown"){
      if(imageId%4 === 3) handleImageId(imageId - 3);
      else  handleImageId(imageId + 1);
    }
    else if(event.key === "ArrowUp"){
      if((imageId%4) === 0) handleImageId(imageId + (+pageContent[Math.floor(imageId/4)].length) - 1);
      else  handleImageId(imageId - 1);
    }
    else if(event.key === "ArrowRight"){
      let curPage = Math.floor(imageId/4);
      if(curPage + 1 < totalPages) handleImageId(4 * (curPage + 1));
    }
    else if(event.key === "ArrowLeft"){
      let curPage = Math.floor(imageId/4);
      if(curPage > 0) handleImageId(4 * (curPage - 1));
    }
  };

  function handleImageId(id){
    if(id >= 0 && id < (+data.length))  {
      setImageId(id);
      document.removeEventListener("keydown", onKeyPressed);
    }
  }
  document.addEventListener("keydown", onKeyPressed);

  return (
    <>
      <div>
        <div className="flex-container-row margin-auto">
          <div className="pagination-container text-center flex-container-col">
            <ImageList imageId = {imageId}  handleImageId = {handleImageId} />
            <div className="pageNavigator flex-container-row">
              <button className="button" id="previousPage" onClick = {() => handleImageId(12 * (Math.floor(imageId/12)-1))} >
                <b>&#60;</b>
              </button>
            
              <PageNavigator imageId = {imageId} handleImageId = {handleImageId} />

              <button className="button" id="previousPage" onClick = {() => handleImageId(12 * (Math.floor(imageId/12)+1))}>
                <b>&#62;</b>
              </button>
            </div>
          </div>
          <div id="imageBox" className="flex-container-col">
            <DisplayImage imageId = {imageId} />
          </div>
        </div>
      </div>
    </>
  );
}

function ImageList({ imageId, handleImageId}) {
  let pageNo = Math.floor(imageId / 4);
  let imageNo = imageId % 4;
  let arr = Array((+pageContent[pageNo].length)).fill(0);

  return (
      <ol style={{listStyle : "none"}}>
        {arr.map((item, index) => {
          let imgSrc = pageContent[pageNo][index].previewImage;
          let imgTitle = pageContent[pageNo][index].title;
          let fontColor = "black";
          let bgColor = "white";
          if(index === imageNo){
            bgColor = BLUE;
            fontColor = "white";
          }
          return (
            <li key = {4 * pageNo + index} className = "li-container flex-container-row" style = {{backgroundColor : bgColor}} onClick = {() => handleImageId(4 * pageNo + index)}>
              <img src = {imgSrc} className = "img-icon" alt = "" />
              <p className = "img-title" style = {{color : fontColor}} >{imgTitle}</p>
            </li>
          );
        })}
      </ol>
  );
}

function PageNavigator( {imageId, handleImageId} ){
  let startPageButton = Math.floor(3  * Math.floor(imageId/12));
  let activePage = Math.floor(imageId/4);
  let arr = [];

  for(let curPageButton = startPageButton; curPageButton < Math.min(totalPages,startPageButton + 3); curPageButton++){
    arr.push(curPageButton);
  }

  return (
    <>
      {arr.map((value) => {
          if(value === activePage)  return (<button className = "button" key = {value} onClick = {() => handleImageId(4*value)} style = {{backgroundColor : BLUE}}>{value + 1}</button>); 
          else  return (<button className = "button" key = {value} onClick = {() => handleImageId(4*value)}>{value + 1}</button>);
      })}
    </>
  );
}

function DisplayImage( {imageId} ){
  let pageNo = Math.floor(imageId / 4);
  let imageNo = imageId % 4;
  let imgSrc = pageContent[pageNo][imageNo].previewImage;
  let imgTitle = pageContent[pageNo][imageNo].title;

  return (
    <>
      <img src = {imgSrc} alt = "" className = "img-displayed" />
      <p className = "img-title text-center">{imgTitle}</p>
    </>
  );
}