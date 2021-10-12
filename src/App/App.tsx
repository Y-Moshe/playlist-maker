import { Player, Youtube } from '@vime/react';
import { Button, Box } from '@mui/material';

import { Footer, Header, LeftColumn, RightColumn } from './Components';

function App() {
  return (
    <div style = {{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Box sx = {{ flexGrow: 1, width: 1, display: 'flex' }} component = "main">
        <LeftColumn />

        <Box sx = {{ flexGrow: 1 }}>
          <Player>
            <Youtube videoId = "XJcXjUB0yqY" />
          </Player>
          <Button>Randomize playlist</Button>
          <Button>Save playlist</Button>
        </Box>

        <RightColumn />
      </Box>

      <Footer />
    </div>
  );
}

export default App;
