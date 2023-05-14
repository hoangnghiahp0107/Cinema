import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import { Animated } from "react-animated-css";
// import ReactPlayer from 'react-player';
import ReactPlayer from 'react-player/lazy'
import './BtnPlay.scss';

function BtnPlay({wh, urlMovie}) {
  const [showTrailerMovie, setShowTrailerMovie] = useState(false);

  const handleCloseTrailerMovie = () => setShowTrailerMovie(false);
  const handleShowTrailerMovie = () => setShowTrailerMovie(true);
  // console.log(showTrailerMovie);
  return (
    <>
      <div onClick={handleShowTrailerMovie} className='showInfo z-10' style={{ fontSize: `${wh/2}px`, width: `${wh}px`, height: `${wh}px` }}>
          <a className='showInfoLink'><i className='bi bi-play-fill iconPlay'></i></a>
      </div>
      <Animated animationIn="slideInDown" animationInDuration={1000} isVisible={showTrailerMovie}>
        <Modal size='lg' centered className='sizeModalTrailerMovie' show={showTrailerMovie} onHide={handleCloseTrailerMovie}>
        <div className='player-wrapper'>
          <ReactPlayer
            url={urlMovie}
            centered = {true}
            width="640px"
            height="360px"
            controls={true}
            animation={true}
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              },
              facebook: {
                appId: '12345'
              }
            }}
            // onReady={true}
            className='react-player'
          />
          <div onClick={handleCloseTrailerMovie} className="closeBtn"><i className="bi bi-x-circle"></i></div>
        </div>
        </Modal>
      </Animated>
    </>

  )
}

export default BtnPlay