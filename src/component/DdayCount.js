import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import './toggle.css';
import axios from'axios';

export default function DdayCount({dday,setDday}){

  const [ddayWrite,setDdayWrite] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const dDayCalculate = Math.floor(((startDate.getTime() - today.getTime())/(1000*60*60*24))+1);

  return(
    <>
      <div className='toggle-setting1'>
        <div>D-day 제목</div>
        <input required className='dday-input' placeholder=' 디데이로 설정할 제목을 입력하세요.' value={ddayWrite} onChange={(e)=>{setDdayWrite(e.target.value)}}/>
        <div>날짜</div>
        <DatePicker  selected={startDate} onChange={date => setStartDate(date)} />
        <button className='date-input' onClick={()=>{ //디데이 설정 버튼 클릭시에 

          if(dDayCalculate < 0){
            alert('정확한 날짜를 입력하세요.')
          }else{
            if(ddayWrite === ''){
              alert('이름을 입력하세요')
            }else{
              setDday([ddayWrite,dDayCalculate])
              axios({
                method: 'post',
                url: 'http://localhost:8000/dday',
                data: {
                  addDday:[ddayWrite,dDayCalculate],
                }
              });
            }
          }
        }
        }>설정완료!</button>
      </div>
    </>
  )
}