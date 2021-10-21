import { useState } from 'react';
import { TextField, Divider, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box, SxProps, Theme } from '@mui/system';

import { VideoPlaceholder } from '../../../Components';
import { VideoPlaceholderType } from '../../../Types';
import { searchVideos } from '../../../../API';

const rightColumnStyle: SxProps<Theme> = {
  width: 350,
  p: 1.5
};

interface RightColumnProps {
  onVideoClick: ( videoId: string ) => void;
  onAddVideo:   ( videoId: string ) => void;
}

export function RightColumn( props: RightColumnProps ) {
  const [ searchInput, setSearchInput ] = useState( '' );
  const [ videoList,   setVideoList ] = useState<VideoPlaceholderType[]>();

  const handleClick = () => {
    searchVideos( searchInput, 10 )
      .then( response => {
        const videoListObjects = response.data.items.map( item => {
          return {
            id: item.id.videoId,
            thumbnail: item.snippet.thumbnails.medium,
            title: item.snippet.title
          }
        });

        setVideoList( videoListObjects );
      }).catch( e => console.log( e ));
  }

  const handleEnterPress = ( key: string ) => {
    if ( key === 'Enter' ) {
      handleClick();
    }
  };

  return (
    <Box sx = { rightColumnStyle }>
      <Box sx = {{ display: 'flex', m: 1 }}>
        <TextField size = "small"
          label   = "Search"
          variant = "outlined"
          value   = { searchInput }
          onChange  = { e => setSearchInput( e.target.value ) }
          onKeyDown = { e => handleEnterPress( e.key ) } />
        <Button onClick = { handleClick } sx = {{ ml: 1 }}>
          <Search />
        </Button>
      </Box>
      <Divider />
      <p>Results:</p>
      {
        videoList?.map( item => (
          <VideoPlaceholder
            key = { item.id }
            videoId   = { item.id }
            thumbnail = { item.thumbnail }
            title     = { item.title }
            onAddToPlaylist = { videoId => console.log( videoId ) }
            onPlayVideo = { videoId => console.log( videoId ) }
          />
        ))
      }
      <Divider />
      <p>Suggested:</p>
      <div>Video #1</div>
      <div>Video #2</div>
    </Box>
  )
}
