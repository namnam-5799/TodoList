import phrases from './phrases'
import './toggle.css'


export default function SettingPhrases({phrase,setPhrase,setPhraseOrSentense,phraseOrSentense,sentense,setSentense}){


  // useEffect(()=>{
  // },[phraseOrSentense])


  const random1 = Math.floor(Math.random()*((phrases.length-1)+1));

  const handleUnder = (setting) => {
    if(setting === 'random'){
      document.getElementById('random').style.fontWeight = 'bold'
      document.getElementById('sen').style.fontWeight = '500'
    }else{
      document.getElementById('random').style.fontWeight = '500'
      document.getElementById('sen').style.fontWeight = 'bold'
    }
  }

  // const handleSettings = (settingme) => {
  //   console.log(settingme)
  //   setPhraseOrSentense(settingme)
  //   console.log('설정값',phraseOrSentense)
  //   axios({
  //     method:'post',
  //     url:'http://localhost:8000/senorran',
  //     data : {
  //       addSenOfRan: phraseOrSentense,
  //     }
  //   })
  // }


  // setPhraseOrSentense(false)이 값을 설정해야함 


  return(
    <>
    <div style={{display:'flex',marginLeft:'10px'}}>
    <button  className='phrase-setting' id="random" onClick={()=>{
      setPhraseOrSentense(false)
      setPhrase(phrases[random1].content);
      handleUnder('random')}}>명언 랜덤</button>
    <button  className='phrase-setting' id="sen" onClick={()=> {
      setPhraseOrSentense(true);
      handleUnder('sen');}}>문구 지정</button>
    </div>
    {
      phraseOrSentense === false? 
      <div className='phrase-box'>
        <div>랜덤 명언 문구로 설정합니다.</div>
      </div>
      :
      
      <div className='phrase-box'>
        <div>원하는 문구를 작성할 수 있습니다.</div>
        <div className='phrase-input-box'>
          <input className='phrase-input' placeholder ='원하는 문구를 입력하세요.'onChange={(e)=>{setSentense(e.target.value); handleUnder()}} value={sentense}></input>
          <button className ='phrase-input-button' onClick={()=>{setSentense(sentense)}}>설정하기</button>
        </div>
      </div>
    }
    </>
  )
}