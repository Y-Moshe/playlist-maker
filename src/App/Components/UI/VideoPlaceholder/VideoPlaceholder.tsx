import { CSSProperties } from 'react';
import { Box, Button } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { Add, PlayArrow } from '@mui/icons-material';
import { useSpring, a } from 'react-spring';

import { ThumbnailType } from '../../../Types';

export interface VideoPlaceholderProps {
  videoId: string;
  thumbnail: ThumbnailType;
  title: string;
  onAddToPlaylist: ( videoId: string ) => void;
  onPlayVideo: ( videoId: string ) => void;
}

const videoPlaceholderStyle: SxProps<Theme> = {
  m: 1,
  boxShadow: '0 0 7px grey',
  borderRadius: 2,
  position: 'relative',
  height: 180,
  width: 320
};

const imageStyle: CSSProperties = {
  position: 'absolute',
  borderRadius: 7,
  zIndex: 5
};

const titleStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: 10,
  margin: 3
};

const actionStyle: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'space-between',
  width: 1
};

const slider: CSSProperties = {
  width: '100%',
  height: '100%',
  zIndex: 6,
  position: 'absolute',
  borderRadius: 8,
  background: 'linear-gradient(rgba(0, 0, 0, 0.8), transparent 80%, rgba(0, 0, 0, 0.8) 15%)'
}

export function VideoPlaceholder( props: VideoPlaceholderProps ) {
  const [ slideAnim, slideAnimCtrl ] = useSpring(() => ({
    from: { transform: 'scale(0)' },
    config: {
      mass: 2,
      tension: 200
    }
  }));
  
  const handleShadowSlide = ( e: 'enter' | 'leave' ) => {
    switch ( e ) {
      case 'enter':
        slideAnimCtrl.update({
          from: { transform: 'scale(0.5)' },
          to: { transform: 'scale(1)' },
          config: { mass: 3, tension: 280 }
        }).start();
        break;
      case 'leave':
        slideAnimCtrl.update({
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0)' },
          config: { mass: 1 }
        }).start();
        break;
    }
  };

  return (
    <Box
      sx = { videoPlaceholderStyle }
      onMouseEnter = { () => handleShadowSlide( 'enter' ) }
      onMouseLeave = { () => handleShadowSlide( 'leave' ) }>
      <img
        src   = { props.thumbnail.url }
        alt   = "video"
        style = { imageStyle }
      />
      <p style = { titleStyle }>{ props.title }</p>
      <a.div style = {{ ...slider, ...slideAnim }}></a.div>
      <Box sx = { actionStyle }>
        <Button
          startIcon = { <PlayArrow /> }
          onClick   = { () => props.onPlayVideo( props.videoId ) }>
          Play
        </Button>
        <Button
          startIcon = { <Add /> }
          onClick   = { () => props.onAddToPlaylist( props.videoId ) }>
          Add to Playlist
        </Button>
      </Box>
    </Box>
  )
}
