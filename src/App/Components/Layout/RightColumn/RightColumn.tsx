import { useState } from 'react';
import { TextField, Divider, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Box, SxProps, Theme } from '@mui/system';

import { searchVideos } from '../../../../API';

const rightColumnStyle: SxProps<Theme> = {
  width: 250,
  p: 1.5
};

interface RightColumnProps {
  onVideoClick: ( videoId: string ) => void;
  onAddVideo:   ( videoId: string ) => void;
}

export function RightColumn( props: RightColumnProps ) {
  const [ searchInput, setSearchInput ] = useState( '' );

  const handleClick = () => {
    searchVideos( searchInput, 10 )
      .then( response => {
        console.log(response);
        
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
      <div>Video #1</div>
      <div>Video #2</div>
      <div>Video #3</div>
      <div>...</div>
      <Divider />
      <p>Suggested:</p>
      <div>Video #1</div>
      <div>Video #2</div>
    </Box>
  )
}
