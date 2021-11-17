import { useState } from 'react';
import { useTrail, a, useSpring } from 'react-spring';
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
  playList: VideoPlaceholderType[];
  onAddToPlaylist: ( vidProps: VideoPlaceholderType ) => void;
  onPlayVideo:     ( videoId: string ) => void;
  onRemoveVideo:   ( videoId: string ) => void;
}

export function RightColumn( props: RightColumnProps ) {
  const [ searchInput, setSearchInput ] = useState( '' );
  const [ videoList,   setVideoList ] = useState<VideoPlaceholderType[]>();
  const [ searchTrailAnim, searchTrailAnimCtrl ] = useTrail( videoList?.length || 0, () => ({
    from: { transform: 'translateX(150px) scale(0.8)' }
  }));
  const textFieldAnim = useSpring({
    from: { transform: 'translateX(-50px)' },
    to:   { transform: 'translateX(0)' }
  });
  const searchBtnAnim = useSpring({
    from: { transform: 'translateX(50px)' },
    to:   { transform: 'translateX(0)' }
  });

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
        <a.div style = { textFieldAnim }>
          <TextField
            size = "small"
            label   = "Search"
            variant = "outlined"
            value   = { searchInput }
            onChange  = { e => setSearchInput( e.target.value ) }
            onKeyDown = { e => handleEnterPress( e.key ) }
          />
        </a.div>
        <a.div style = { searchBtnAnim }>
          <Button
            sx = {{ ml: 1 }}
            variant = "contained"
            onClick = { handleClick }>
            <Search />
          </Button>
        </a.div>
      </Box>
      <Divider />
      {
        videoList && videoList.map(( video, i) => (
          <a.div
            key = { video.id }
            style = { searchTrailAnim[i] }>
            <VideoPlaceholder
              videoId   = { video.id }
              thumbnail = { video.thumbnail }
              title     = { video.title }
              isInPlaylist    = { props.playList.find( item => item.id === video.id ) !== undefined }
              onPlayVideo     = { props.onPlayVideo }
              onAddToPlaylist = { props.onAddToPlaylist }
              onRemoveVideo   = { props.onRemoveVideo }
            />
          </a.div>
        ))
      }
    </Box>
  )
}
