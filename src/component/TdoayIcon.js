import { useEffect } from "react"
import './todayIcon.css'
import axios from'axios';

export default function TodayIcon({icon,setIcon}){
  
  // 빈 화면 눌렀을때 창닫는 기능도 구현하기 
  useEffect(()=>{    
    },[icon])

    const handleIcon = (iconimage) =>{
      setIcon(iconimage)
      console.log(iconimage)
      axios({
        method: 'post',
        url: 'http://localhost:8000/icon',
        data: {
          addIcon:iconimage,
        }
      });
    }

  return(
    <>
    <div className="icon-box">
        <div onClick={()=>{handleIcon('🥰')}}>🥰</div>
        <div onClick={()=>{handleIcon('☺️')}}>☺️</div>
        <div onClick={()=>{handleIcon('🙂')}}>🙂</div>
        <div onClick={()=>{handleIcon('🤪')}}>🤪</div>
        <div onClick={()=>{handleIcon('😢')}}>😢</div>
        <div onClick={()=>{handleIcon('😎')}}>😎</div>
    </div>
    </>
  )
}