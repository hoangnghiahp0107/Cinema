
import React from 'react'

function TestComponent() {
  const dayjs = require('dayjs');
  const date = 'Sun May 21 2023 10:40:27 GMT+0700'
  const dat1 = ('25/05/2023 09:05:28').toLocaleString();
  console.log('dat1: ',dat1);
  const dat2 = ('25/05/2023 09:05:20').toLocaleString();
  console.log('dat2: ',dat2);
  if(dat1 < dat2) console.log('dat1 < dat2');
  if(dat1 > dat2) console.log('dat1 > dat2');
  if(dat1 == dat2) console.log('dat1 = dat2');

  return (
    <div>TestComponent</div>
  )
}

export default TestComponent
