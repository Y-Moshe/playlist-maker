import { CSSProperties } from 'react';
import { useSpring, a } from 'react-spring';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { Add, Remove, PlayArrow } from '@mui/icons-material';

import { ThumbnailType, VideoPlaceholderType } from '../../../Types';

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
  zIndex: 5,
  maxHeight: '100%'
};

const titleStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  zIndex: 10,
  margin: 3,
  color: 'white'
};

const actionStyle: CSSProperties = {
  position: 'absolute',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  bottom: 0
};

const slider: CSSProperties = {
  width: '100%',
  height: '100%',
  zIndex: 6,
  position: 'absolute',
  borderRadius: 8,
  background: 'linear-gradient(rgba(0, 0, 0, 0.8), transparent 80%, rgba(0, 0, 0, 0.8) 15%)'
};

export interface VideoPlaceholderProps {
  isInPlaylist: boolean;
  videoId: string;
  thumbnail: ThumbnailType;
  title: string;
  onAddToPlaylist: ( vidProps: VideoPlaceholderType ) => void;
  onPlayVideo:     ( videoId: string ) => void;
  onRemoveVideo:   ( videoId: string ) => void;
}

export function VideoPlaceholder( props: VideoPlaceholderProps ) {
  const [ slideAnim, slideAnimCtrl ] = useSpring(() => ({
    from: { transform: 'scale(0)', opacity: 0 },
    config: {
      mass: 2,
      tension: 200
    }
  }));

  const [ slideInActions, slideInActionsCtrl ] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(50px)' }
  }));

  const [ slideInTitle, slideInTitleCtrl ] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(-50px)' }
  }));
  
  const handleShadowSlide = ( e: 'enter' | 'leave' ) => {
    switch ( e ) {
      case 'enter':
        slideAnimCtrl.update({
          from: { transform: 'scale(0.5)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
          config: { mass: 3, tension: 280 },
          delay: 150
        }).start();
        slideInActionsCtrl.update({
          from: { opacity: 0, transform: 'translateY(50px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }).start();
        slideInTitleCtrl.update({
          from: { opacity: 0, transform: 'translateY(-50px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }).start();
        break;
      case 'leave':
          slideInActionsCtrl.update({
            from: { opacity: 1 },
            to: { opacity: 0 }
          }).start();
          slideInTitleCtrl.update({
            from: { opacity: 1 },
            to: { opacity: 0 }
          }).start();
          slideAnimCtrl.update({
            from: { opacity: 1 },
            to: { opacity: 0 },
            config: { mass: 1 }
          }).start();
        break;
    }
  };

  const handleAddToPlaylist = () => {
    props.onAddToPlaylist({
      id: props.videoId,
      title: props.title,
      thumbnail: props.thumbnail
    });
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
      <a.p style = {{ ...titleStyle, ...slideInTitle }}>{ props.title }</a.p>
      <a.div style = {{ ...slider, ...slideAnim }}></a.div>
      <a.div style = {{ ...actionStyle, ...slideInActions }}>
        <Tooltip title = "Play this Video">
          <Button
            color = "error"
            startIcon = { <PlayArrow /> }
            onClick   = { () => props.onPlayVideo( props.videoId ) }>
            Play
          </Button>
        </Tooltip>
        {
          !props.isInPlaylist &&
          <Tooltip title ="Add to Playlist">
            <IconButton
              size    = "small"
              color   = "info"
              onClick = { handleAddToPlaylist }>
                <Add />
            </IconButton>
          </Tooltip>
        }
        {
          props.isInPlaylist &&
          <Tooltip title ="Remove from Playlist">
            <IconButton
              size    = "small"
              color   = "info"
              onClick = { () => props.onRemoveVideo( props.videoId ) }>
                <Remove />
            </IconButton>
          </Tooltip>
        }
      </a.div>
    </Box>
  )
}
