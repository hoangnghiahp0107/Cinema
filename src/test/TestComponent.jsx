import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TestComponent() {
    // console.log();
    // const [value, setValue] = useState(null)
    // console.log(value);
    const [native, setNative] = useState(new Date('2023-05-06T00:00:00'));
    console.log(native);
  const onNativeChange = e => {
    console.log("onNativeChange: ", e);
    setNative(e);
  };
  return (
    <div>
        {/* <input 
          type="date"
          className="form-control" 
          placeholder='Ngày khởi chiếu'
          >fsdfsdf</input> */}
          {/* <input type="date" onChange={(event) => {console.log(event.target.value)}}/> */}
          {/* <input type="date" value={native} onChange={onNativeChange}/> */}
          {/* <DatePicker selected={native} onChange={onNativeChange} locale="pt-BR"/> */}
          <DatePicker
            selected={native}
            onChange={(date) => setNative(date)}
            // locale="pt-BR"
            // showTimeSelect
            // timeFormat="p"
            // timeIntervals={15}
            // dateFormat="Pp"
            dateFormat="dd/MM/yyyy"
            />
    </div>
  )
}

export default TestComponent