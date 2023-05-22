// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function TestComponent() {
//     // console.log();
//     // const [value, setValue] = useState(null)
//     // console.log(value);
//     const [native, setNative] = useState(new Date('2023-05-06T00:00:00'));
//     console.log(native);
//   const onNativeChange = e => {
//     console.log("onNativeChange: ", e);
//     setNative(e);
//   };
//   return (
//     <div>
//         {/* <input
//           type="date"
//           className="form-control"
//           placeholder='Ngày khởi chiếu'
//           >fsdfsdf</input> */}
//           {/* <input type="date" onChange={(event) => {console.log(event.target.value)}}/> */}
//           {/* <input type="date" value={native} onChange={onNativeChange}/> */}
//           {/* <DatePicker selected={native} onChange={onNativeChange} locale="pt-BR"/> */}
//           <DatePicker
//             selected={native}
//             onChange={(date) => setNative(date)}
//             // locale="pt-BR"
//             // showTimeSelect
//             // timeFormat="p"
//             // timeIntervals={15}
//             // dateFormat="Pp"
//             dateFormat="dd/MM/yyyy"
//             />
//     </div>
//   )
// }

// import "./test.css";

// // import required modules
// import { FreeMode, Scrollbar, Mousewheel } from "swiper";

// export default function App() {
//   return (
//     <>
//       <Swiper
//         direction={"vertical"}
//         slidesPerView={"auto"}
//         freeMode={true}
//         scrollbar={true}
//         mousewheel={true}
//         modules={[FreeMode, Scrollbar, Mousewheel]}
//         className="mySwiper"
//       >
//         <SwiperSlide>
//           <h4>Scroll Container</h4>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus,
//             ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet
//             dolor lectus eu libero. Vestibulum venenatis eget turpis sed
//             faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam
//             elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean
//             tristique nisl tellus, sit amet fringilla nisl volutpat cursus.
//             Quisque dignissim lectus ac nunc consectetur mattis. Proin vel
//             hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et
//             tincidunt tristique, nisl risus facilisis lectus, ut interdum orci
//             nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit
//             sodales posuere eget non est. Fusce convallis vestibulum dolor non
//             volutpat. Vivamus vestibulum quam ut ultricies pretium.
//           </p>
//           <p>
//             Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna
//             consectetur convallis non vel mi. Donec libero dolor, volutpat ut
//             urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel
//             scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis
//             ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque
//             iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus,
//             sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare
//             nunc vel tellus facilisis, quis dictum elit tincidunt. Donec
//             accumsan nisi at laoreet sodales. Cras at ullamcorper massa.
//             Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.
//           </p>
//           <p>
//             Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat
//             elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit.
//             Integer tincidunt finibus metus vel porta. Mauris sed mauris congue,
//             pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu
//             et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium
//             tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.
//           </p>
//           <p>
//             Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi
//             id tempor vulputate, nisi justo cursus justo, pellentesque
//             condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et
//             magnis dis parturient montes, nascetur ridiculus mus. In placerat
//             tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis
//             et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet
//             pellentesque orci aliquam. Vestibulum elementum posuere vehicula.
//           </p>
//           <p>
//             Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum
//             id arcu nec fringilla. Maecenas faucibus, ante et venenatis
//             interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis
//             vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh
//             sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor
//             fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare
//             libero. Aliquam auctor erat enim, a semper risus semper at. In ut
//             dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna,
//             sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut
//             nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet
//             lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh
//             in massa pretium scelerisque.
//           </p>
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus,
//             ex eu sagittis faucibus, ligula ipsum sagittis magna, et imperdiet
//             dolor lectus eu libero. Vestibulum venenatis eget turpis sed
//             faucibus. Maecenas in ullamcorper orci, eu ullamcorper sem. Etiam
//             elit ante, luctus non ante sit amet, sodales vulputate odio. Aenean
//             tristique nisl tellus, sit amet fringilla nisl volutpat cursus.
//             Quisque dignissim lectus ac nunc consectetur mattis. Proin vel
//             hendrerit ipsum, et lobortis dolor. Vestibulum convallis, nibh et
//             tincidunt tristique, nisl risus facilisis lectus, ut interdum orci
//             nisl ac nunc. Cras et aliquam felis. Quisque vel ipsum at elit
//             sodales posuere eget non est. Fusce convallis vestibulum dolor non
//             volutpat. Vivamus vestibulum quam ut ultricies pretium.
//           </p>
//           <p>
//             Suspendisse rhoncus fringilla nisl. Mauris eget lorem ac urna
//             consectetur convallis non vel mi. Donec libero dolor, volutpat ut
//             urna sit amet, aliquet molestie purus. Phasellus faucibus, leo vel
//             scelerisque lobortis, ipsum leo sollicitudin metus, eget sagittis
//             ante orci eu ipsum. Nulla ac mauris eu risus sagittis scelerisque
//             iaculis bibendum mauris. Cras ut egestas orci. Cras odio risus,
//             sagittis ut nunc vitae, aliquam consectetur purus. Vivamus ornare
//             nunc vel tellus facilisis, quis dictum elit tincidunt. Donec
//             accumsan nisi at laoreet sodales. Cras at ullamcorper massa.
//             Maecenas at facilisis ex. Nam mollis dignissim purus id efficitur.
//           </p>
//           <p>
//             Curabitur eget aliquam erat. Curabitur a neque vitae purus volutpat
//             elementum. Vivamus quis vestibulum leo, efficitur ullamcorper velit.
//             Integer tincidunt finibus metus vel porta. Mauris sed mauris congue,
//             pretium est nec, malesuada purus. Nulla hendrerit consectetur arcu
//             et lacinia. Suspendisse augue justo, convallis eget arcu in, pretium
//             tempor ligula. Nullam vulputate tincidunt est ut ullamcorper.
//           </p>
//           <p>
//             Curabitur sed sodales leo. Nulla facilisi. Etiam condimentum, nisi
//             id tempor vulputate, nisi justo cursus justo, pellentesque
//             condimentum diam arcu sit amet leo. Cum sociis natoque penatibus et
//             magnis dis parturient montes, nascetur ridiculus mus. In placerat
//             tellus a posuere vehicula. Donec diam massa, efficitur vitae mattis
//             et, pretium in augue. Fusce iaculis mi quis ante venenatis, sit amet
//             pellentesque orci aliquam. Vestibulum elementum posuere vehicula.
//           </p>
//           <p>
//             Sed tincidunt diam a massa pharetra faucibus. Praesent condimentum
//             id arcu nec fringilla. Maecenas faucibus, ante et venenatis
//             interdum, erat mi eleifend dui, at convallis nisl est nec arcu. Duis
//             vitae arcu rhoncus, faucibus magna ut, tempus metus. Cras in nibh
//             sed ipsum consequat rhoncus. Proin fringilla nulla ut augue tempor
//             fermentum. Nunc hendrerit non nisi vitae finibus. Donec eget ornare
//             libero. Aliquam auctor erat enim, a semper risus semper at. In ut
//             dui in metus tincidunt euismod eget et lacus. Aenean et dictum urna,
//             sed rhoncus lorem. Duis pharetra sagittis odio. Etiam a libero ut
//             nisi feugiat tincidunt vel vitae turpis. Maecenas vel orci sit amet
//             lorem hendrerit venenatis sollicitudin ut dui. Quisque rhoncus nibh
//             in massa pretium scelerisque.
//           </p>
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import React, { useState } from "react";

function TestComponent() {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (evt) => {
    setIsChecked(evt.target.checked);
  };
  console.log(isChecked);
  // console.log(values);
  return (
    <div className="row mb-3 align-items-center">
      <div className="col-2 text-end">Sắp chiếu</div>
      <div className="col-10">
        <input
          name="type1"
          checked={isChecked}
          onChange={handleChange}
          class="form-check-input"
          type="checkbox"
        />
      </div>
    </div>
  );
}

export default TestComponent;
