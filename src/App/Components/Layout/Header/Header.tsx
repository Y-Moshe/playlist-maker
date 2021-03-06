import { useSpring, a } from 'react-spring';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';

interface HeaderProps {}

export function Header( props: HeaderProps ) {
  const widthAnim = useSpring({
    from: { width: '35%' },
    to:   { width: '100%' }
  });

  return (
    <a.div style = { widthAnim }>
      <AppBar position = "static">
        <Toolbar>
          <Typography
            variant = "h6"
            component = "div"
            sx = {{ flexGrow: 1 }}>
            React Playlist Maker
          </Typography>
          <IconButton color = "inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
    </a.div>
  )
}
