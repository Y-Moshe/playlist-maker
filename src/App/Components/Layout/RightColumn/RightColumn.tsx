import { TextField, Divider } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

const rightColumnStyle: SxProps<Theme> = {
  width: 250,
  p: 1.5
};

interface RightColumnProps {}

export function RightColumn( props: RightColumnProps ) {
  return (
    <Box sx = { rightColumnStyle }>
      <TextField size = "small"
        label   = "Search"
        variant = "outlined" />
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
