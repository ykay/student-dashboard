'use client';

import React from 'react';
import YouTube from 'react-youtube';
import { useSelector } from "react-redux";

function VideoPlayer() {
  const video = useSelector((state) => state.video.metadata);

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      start: video.startTime,
    },
  };

  return <YouTube videoId={video.videoId} opts={opts} />;
}

export default VideoPlayer;