import { useState } from 'react';
import { useTrail, a } from 'react-spring';
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
  onAddToPlaylist: ( vidProps: VideoPlaceholderType ) => void;
  onPlayVideo:     ( videoId: string ) => void;
}

export function RightColumn( props: RightColumnProps ) {
  const [ searchInput, setSearchInput ] = useState( '' );
  const [ videoList,   setVideoList ] = useState<VideoPlaceholderType[]>();
  const [ searchTrailAnim, searchTrailAnimCtrl ] = useTrail( videoList?.length || 0, () => ({
    from: { transform: 'translateX(150px) scale(0.8)' }
  }));

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
        searchTrailAnimCtrl.update({
          from: { transform: 'translateX(150px) scale(0.8)' },
          to:   { transform: 'translateX(0) scale(1)' },
          config: {
            mass: 2,
            tension: 280
          }
        }).start();
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
        <Button
          sx = {{ ml: 1 }}
          variant = "contained"
          onClick = { handleClick }>
          <Search />
        </Button>
      </Box>
      <Divider />
      <p>Results:</p>
      {
        videoList && searchTrailAnim.map(( animationStyle, i) => (
          <a.div
            key = { videoList[i].id }
            style = { animationStyle }>
            <VideoPlaceholder
              videoId   = { videoList[i].id }
              thumbnail = { videoList[i].thumbnail }
              title     = { videoList[i].title }
              onPlayVideo = { props.onPlayVideo }
              onAddToPlaylist = { props.onAddToPlaylist }
            />
          </a.div>
        ))
      }
    </Box>
  )
}
