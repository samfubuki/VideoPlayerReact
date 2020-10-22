import React,{useState,useEffect} from 'react';
import ReactPlayer from 'react-player'

//https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=10&playlistId=PLB97yPrFwo5hpOay4v2nnDuUCZQMwyQzF&key=AIzaSyCK7T32d7bLwv0iaT04isK8CYGp9LCGL7w

function CourseStructure(props) {

    const courseName = props.match.params.coursename
    const [courses,setCourses] = useState([])

    useEffect(() => {
      let playlistId = ""
      if(courseName == "reactjs"){
        playlistId = "PLB97yPrFwo5hpOay4v2nnDuUCZQMwyQzF"
      }else{
        playlistId =  "PLB97yPrFwo5gh4WP-VtwsVJbebyHbxNk6"      
      }
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=10&playlistId=${playlistId}&key=AIzaSyCK7T32d7bLwv0iaT04isK8CYGp9LCGL7w`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const result = data.items.map(item => {
          return {title:item.snippet.title,vid:item.contentDetails.videoId}
        })
        setCourses(result)
        uid(result[0].vid)
        utit(result[0].title)
      })
    },[])
   
    const [vid,uid] = useState("")
    const [title,utit] = useState("")
    const [counter, setCounter] = useState(0)
    const watched = (vid) => {
      if(localStorage.getItem("saveID")){
        if(JSON.parse(localStorage.getItem("saveID")).includes(vid)){
          return true
        }
      }
      return false;
    }
    const renderVideo = () => {
      return (
        <>
        <h1>{title}</h1>
        <div className="video-container">
        {/*<iframe width="853" height="480" src={"//www.youtube.com/embed/"+vid+"?rel=0"} frameBorder="0" allowFullScreen></iframe>*/}
        <ReactPlayer
          className='react-player'
          url={`https://www.youtube.com/watch?v=${vid}`}
          width='100%'
          height='100%'
          controls = {true}
          onEnded = {() => {
            if(localStorage.getItem("saveID")){
               let data = JSON.parse(localStorage.getItem("saveID"))
               localStorage.setItem("saveID",JSON.stringify([...data,vid]))
            }else{
              localStorage.setItem("saveID",JSON.stringify([vid]))
            }
          }}
        />
        </div>
        </>
      )
    }

  return (
    <>
     {courses.length > 0 ?
      <div>
        {renderVideo()}
        <ul className="collection">
          {
          courses.map((item,index) => {
            return <li key={item.vid} className = {counter===index ? "collection-item myitem" : "collection-item"} onClick={() => {
              uid(item.vid)
              utit(item.title)
              setCounter(index)
            }}>
               {item.title}
               {
                 watched(item.vid) && <i class="tiny material-icons">check</i>
               }
              
             
              </li>
          })
          }
        </ul>
      </div>
      :
      <h1>Loading</h1>
        }
    </>
  );
}

export default CourseStructure;