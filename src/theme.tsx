'use client';

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        primary: {
          main: '#000',
          contrastText: '#fff',
        },
        secondary: {
          main: '#db4444',
          contrastText: '#fff',
        },
      },
});

export default theme;