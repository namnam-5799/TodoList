import { useEffect, useState } from 'react';
import './main.css';
import TodayIcon from './TdoayIcon';
import Toggle from './Toggle';
import axios from 'axios';

function Main(){

  const [todo,setTodo] = useState([]); //투두 목록
  const [writing,setWriting] = useState('');
  const [toggle,setToggle] = useState(false); //토글창 열지말지
  const [icon,setIcon] = useState('😇');
  const [iconMenu,setIconMenu] = useState(false);
  const [dday,setDday] = useState([]); //디데이 설정할거로 
  const [phrase,setPhrase] = useState(); // 명언 가져오면 어떻게 설정할지
  const [phraseOrSentense,setPhraseOrSentense] = useState(false); // false면 명언, 아니면 설정문구
  const [sentense,setSentense] = useState('');
  
  let month = new Date().getMonth()+1
  let day = new Date().getDate();
  let week = new Date().getDay();

  useEffect(()=>{
    //console.log(todo.length)
    // 서버의 데이터 가져오기!
    axios.get('http://localhost:8000')
    .then(res => {
      setDday(res.data[0].ddaySetting) //설정한 디데이
      setTodo(res.data[0].todoList)
      setIcon(res.data[0].todayIcon)
      //setPhraseOrSentense(res.data[0].phraseorsen)
    })//투두 렌더링
    
  },[])

  switch(week){
    case 0:
      week= '일'
      break
    case 1:
      week ='월'
      break
    case 2:
      week ='화'
      break
    case 3:
      week = '수'
      break
    case 4:
      week = '목'
      break
    case 5:
      week = '금'
      break
    case 6:
      week = '토'      
  }

  const typing = (e) =>{
    setWriting(e.target.value);
  }

  const addTodo = () => {
    if(writing!== '' && todo.length< 19){
      let copy = [...todo]; 
      copy.push(writing);
      

      // 서버에 데이터 보내서 저장하기 
      axios({
        method: 'post',
        url: 'http://localhost:8000/todo',
        data: {
          addtodo: writing,
        }
      });

      setTodo(copy);
      setWriting('');

    }else if(writing!== '' && todo.length>= 19){
      alert('더 이상 입력할 수 없습니다.')
      setWriting('');
    }
  }

  const addTodoEnter = (e) => {
    if(e.key === 'Enter'){
      addTodo()
    }
  }
  const openToggle = () =>{
    setToggle(!toggle)
  }

  const handleChange = (index,e)=>{
    if(e.target.checked){
      document.getElementsByClassName('main-todo')[index].style.textDecorationLine = 'line-through'
    }else{
      document.getElementsByClassName('main-todo')[index].style.textDecorationLine = 'none'
    }
  }

  const handleDelete = (index,e) => {
    // 삭제시 
    const copy = [...todo]  

    copy.splice(index,1) //삭제해서 합치고 보여줄 데이터
    //console.log('삭제대상',copy[index])
    setTodo(copy)

    axios({
      method: 'delete',
      url: 'http://localhost:8000/todo',
      data: {
        deletetodo: index,
      }
    });

  }
  return(
    <>
    <div className='container'>
    {toggle===false? 
      <div className='header'>
        <div style={{display:'flex'}}>
          <button className='toggle' onClick={openToggle}>☰</button>
          <div style={{display:'flex' ,flexDirection:'column'}}>
          <div className='day'>오늘은 {month}월 {day}일 {week}요일 입니다.</div>
          <div className='info'>
            {phraseOrSentense === false? <div>{phrase}</div>
            : <div>{sentense}</div>}</div>
        </div>
        <div style={{display:'flex'}}>
            <div className='todayIcon' onClick={()=>{setIconMenu(!iconMenu)}}> 
                오늘의 기분 
                {iconMenu === true? 
                  <TodayIcon icon={icon} setIcon={setIcon}></TodayIcon>
                  : <div className='icon'>{icon}</div> }
            </div>
        </div>
      </div>


        <div style={{display:'flex'}}>
          <div className='inputHead'>
              <input value={writing} onChange={typing} onKeyUp={addTodoEnter} placeholder="오늘의 할일을 기록해 보세요."></input>
              <button onClick={addTodo}>+</button>
          </div>
          <div className='ddaycount'>
            
            <div>{dday[0]}</div>
            {dday.length !== 0 ? 
            <div> D - { dday[1] === 0? ' Day': dday[1]}</div>
          
          : null}</div>
        </div>
      </div>
      :
      <Toggle 
        toggle={toggle} 
        setToggle={setToggle} 
        openToggle={openToggle}
        dday={dday} 
        setDday={setDday} 
        phrase={phrase} 
        setPhrase={setPhrase}
        phraseOrSentense={phraseOrSentense}
        setPhraseOrSentense={setPhraseOrSentense}
        sentense={sentense} 
        setSentense={setSentense}>
        </Toggle>}


      { toggle === false? 
        todo.map(function(el,index){
        return ( 
          <div className ='todolist' key={index} style={{display:'flex'}}>
            <input className='main-check' type="checkbox" onChange={(e)=>handleChange(index,e)} /> 
            <div className='main-todo'>{el}</div>
            <button className='main-delete' onClick={(e)=>{handleDelete(index,e)}} style={{float:'right'}}>X</button>
          </div>
        )})
        :
          <div className='toggleBackground'>
            <div>My D-day</div>
              { dday.length !==0 ?
                <div className='dday-box'>     
                  <div style={{paddingTop:'10px'}} className='dday-title'>{dday[0]}</div>
                  <div style={{marginLeft:'10px',marginTop:'10px'}}>D - {dday[1]}</div>
                </div> 
              :null}
          </div>
        }
    </div>
  </>
  )

}

export default Main