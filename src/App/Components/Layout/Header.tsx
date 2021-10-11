import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface HeaderProps {}

export function Header( props: HeaderProps ) {
  return (
    <AppBar position = "static">
      <Toolbar>
        <Typography
          variant = "h6"
          component = "div"
          sx = {{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color = "inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}
