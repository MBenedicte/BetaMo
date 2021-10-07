import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MovieIcon from '@mui/icons-material/Movie';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root:{
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor:'#1e1e1f',
    zIndex: 100,

  }
});


export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/favorites");
    else if (value === 2) history.push("/watchlater")
  },[value,history]);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className = {classes.root}
      >
        <BottomNavigationAction style={{ color: "white" }} label="All" icon={<MovieIcon />} />
        <BottomNavigationAction style={{ color: "white" }} label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction style={{ color: "white" }} label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction style={{ color: "white" }} label="Watch later" icon={<WatchLaterIcon />} />
      
      </BottomNavigation>
    </Box>
  );
}
