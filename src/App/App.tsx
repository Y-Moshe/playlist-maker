import { useState, CSSProperties } from 'react';
import { Player, Youtube } from '@vime/react';
import { Button, Box, Divider } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

import { Footer, Header, LeftColumn, RightColumn } from './Components';
import { VideoPlaceholderType } from './Types';

const appStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh'
};

const mainStyle: SxProps<Theme> = {
  flexGrow: 1,
  width: 1,
  display: 'flex'
};

const playerActionsStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-around'
};

const playerContainerStyle: SxProps<Theme> = {
  width: 1,
  maxWidth: 800,
  m: 'auto',
  boxShadow: '0 0 15px grey'
};

export default function App() {
  const [ currentPlaying, setCurrentPlaying ] = useState( '' );
  const [ playList, setPlaylist ] = useState<VideoPlaceholderType[]>( [] );

  const handlePlayVideo = ( videoId: string ) => {
    setCurrentPlaying( '' );
    setTimeout(() => setCurrentPlaying( videoId ), 1000);
    console.log('Playing ' + videoId);
  };

  const handleAddToPlaylist = ( vidProps: VideoPlaceholderType ) => {
    const item = playList.find( item => item.id === vidProps.id );
    if ( item ) {
      window.alert( 'already exists in current playlist!' );
      return;
    }

    setPlaylist( prev => [ ...prev, vidProps ]);
  };

  const handleRemoveFromPlaylist = ( videoId: string ) => {
    setPlaylist( prev => [ ...prev.filter( vid => vid.id !== videoId )]);
  };

  const handleRandomizePlaylist = () => {
    const copy = playList.slice();

    for ( let i = copy.length - 1; i > 0; i-- ) {
      const j = Math.floor( Math.random() * ( i + 1 ));
      const temp = copy[i];
      copy[i] = { ...copy[j] };
      copy[j] = { ...temp };
    }

    setPlaylist( copy );
  };

  const handleSaveToPlaylist = ( videoId: string ) => {

  };

  const handlePlayNextInPlaylist = () => {
    const indexOfCurrent = playList.findIndex( vid => vid.id === currentPlaying );
    if ( playList.length <= 1 ) {
      return;
    }
    const indexOfNext = indexOfCurrent + 1;
    const videoId2Play = playList[indexOfNext]?.id;

    videoId2Play && handlePlayVideo( videoId2Play );
  };

  const handleNewPlaylist = () => {

  };

  return (
    <div style = { appStyle }>
      <Header />

      <Box component = "main" sx = { mainStyle }>
        <LeftColumn
          playList        = { playList }
          onPlayVideo     = { handlePlayVideo }
          onAddToPlaylist = { handleAddToPlaylist }
          onRemoveVideo   = { handleRemoveFromPlaylist }
          onNewPlaylist   = { handleNewPlaylist }
        />

        <Box sx = {{ flexGrow: 1, mt: 2, mr: 1 }}>
          {
            currentPlaying &&
            <>
              <Box sx = { playerContainerStyle }>
                <Player
                  controls
                  onVmPlaybackEnded = { () => handlePlayNextInPlaylist() }>
                  <Youtube videoId  = { currentPlaying } />
                </Player>
              </Box>

              <Divider sx = {{ m: 2 }} />

              <Box sx = { playerActionsStyle }>
                <Button
                  size    = "large"
                  color   = "warning"
                  variant = "outlined"
                  onClick = { handleRandomizePlaylist }>
                    Randomize playlist
                </Button>
                <Button
                  size    = "large"
                  color   = "success"
                  variant = "contained"
                  onClick = { () => handleSaveToPlaylist( currentPlaying ) }>
                    Save playlist
                </Button>
              </Box>
            </>
          }
        </Box>

        <RightColumn
          playList        = { playList }
          onPlayVideo     = { handlePlayVideo }
          onAddToPlaylist = { handleAddToPlaylist }
          onRemoveVideo   = { handleRemoveFromPlaylist }
        />
      </Box>

      <Footer />
    </div>
  );
}
