import { Button, Alert, Divider } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

const leftColumnStyle: SxProps<Theme> = {
  width: 250,
  p: 1.5
};

interface LeftColumnProps {}

export function LeftColumn( props: LeftColumnProps ) {
  return (
    <Box sx = { leftColumnStyle }>
      <Alert icon = {false} severity = "info">Current playlist</Alert>
      <Divider />
      <div>Video #1</div>
      <div>Video #2</div>
      <div>Video #3</div>
      <Divider />
      <Button>New+</Button>
      <ul>
        <li>Playlist #1</li>
        <li>Playlist #2</li>
        <li>Playlist #3</li>
      </ul>
    </Box>
  )
}
