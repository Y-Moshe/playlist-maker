import { useTrail, a } from 'react-spring';
import { Button, Alert, Divider } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

import { VideoPlaceholder } from '../../../Components';
import { VideoPlaceholderType } from '../../../Types';

const leftColumnStyle: SxProps<Theme> = {
  width: 350,
  p: 1.5
};

interface LeftColumnProps {
  playList: VideoPlaceholderType[];
  onAddToPlaylist: ( vidProps: VideoPlaceholderType ) => void;
  onPlayVideo:     ( videoId: string ) => void;
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
      <Divider />
      {
        props.playList.length > 0 && trailAnim.map(( animationStyle, i) => (
          <a.div
            key = { props.playList[i].id }
            style = { animationStyle }>
            <VideoPlaceholder
              videoId   = { props.playList[i].id }
              thumbnail = { props.playList[i].thumbnail }
              title     = { props.playList[i].title }
              onPlayVideo = { props.onPlayVideo }
              onAddToPlaylist = { props.onAddToPlaylist }
            />
          </a.div>
        ))
      }
      <Divider />
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
    </Box>
  )
}
