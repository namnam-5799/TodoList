import { useEffect, useState } from 'react';
import './toggle.css';
import DdayCount from './DdayCount';
import SettingPhrases from './SettingPhrases';

export default function Toggle({toggle,setToggle,openToggle,dday,setDday,phrase,setPhrase,
  phraseOrSentense,setPhraseOrSentense,sentense,setSentense}){
  const [view,setView] = useState(false);
  const [nowView,setNowView] = useState('phrase');
  
  useEffect(()=>{
    document.getElementById(nowView).style.border = '1px solid grey';
  },[nowView])

  const handleView = (settings) =>{
    if(settings === 'count'){
      setNowView(settings)
      document.getElementById('phrase').style.border = 'none'
    }else{
      setNowView(settings)
      document.getElementById('count').style.border = 'none'
    }
  }

  // 서버에 저장시켜야 하는데.. 
  


  return(
    <>
    <div className="toggle-container">
      <button className='toggle-button'  style={{marginRight:'10px'}} onClick={openToggle}>☰</button>
      <button className ="setting-phrase" id="phrase" onClick={()=>{setView('viewPhrase');handleView('phrase')}}>문구 설정하기</button>
      <button className ="setting-count" id="count" onClick={()=>{setView('viewCount');handleView('count')}} >디데이 카운트 설정하기</button>

      {view === 'viewCount'? 
        <DdayCount dday={dday} setDday={setDday}></DdayCount>
        :
        <div className='toggle-setting2'>
          <SettingPhrases phrase={phrase} setPhrase={setPhrase} phraseOrSentense ={phraseOrSentense}
          setPhraseOrSentense={setPhraseOrSentense} sentense={sentense} setSentense={setSentense}></SettingPhrases>
        </div>}

    </div>
    </>
  )
}