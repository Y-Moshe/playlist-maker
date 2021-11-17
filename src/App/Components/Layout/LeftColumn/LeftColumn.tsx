import { useTrail, a } from 'react-spring';
import { Button, Alert, Divider } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

import { VideoPlaceholder } from '../../../Components';
import { VideoPlaceholderType } from '../../../Types';

const leftColumnStyle: SxProps<Theme> = {
  width: 370,
  p: 1.5,
};

const videosContainerStyle: SxProps<Theme> = {
  p: 1,
  overflowY: 'scroll',
  maxHeight: 650
};

interface LeftColumnProps {
  playList: VideoPlaceholderType[];
  onAddToPlaylist: ( vidProps: VideoPlaceholderType ) => void;
  onPlayVideo:     ( videoId: string ) => void;
  onRemoveVideo:   ( videoId: string ) => void;
  onNewPlaylist:   () => void;
}

export function LeftColumn( props: LeftColumnProps ) {
  const trailAnim = useTrail( props.playList.length || 0, {
    from: { transform: 'translateX(-150px) scale(0.8)' },
    to:   { transform: 'translateX(0) scale(1)' },
    config: {
      mass: 2,
      tension: 280
    }
  });

  return (
    <Box sx = { leftColumnStyle }>
      <Alert
        sx   = {{ m: 1 }}
        icon = {false}
        severity = "info">
          Current playlist
      </Alert>
      <Button
        fullWidth
        sx = {{ m: 1 }}
        onClick = { props.onNewPlaylist }>
          New+
      </Button>
      <ul>
        <li>Playlist #1</li>
        <li>Playlist #2</li>
        <li>Playlist #3</li>
      </ul>
      <Divider sx = {{ m: 1 }} />
      <Box sx = { videosContainerStyle }>
        {
          props.playList.length > 0 && props.playList.map(( video, i ) => (
            <a.div
              key = { video.id }
              style = { trailAnim[i] }>
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
    </Box>
  )
}
