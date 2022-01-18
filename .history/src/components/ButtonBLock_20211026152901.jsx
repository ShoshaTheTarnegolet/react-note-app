import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#64748B',
      contrastText: '#000',
    },
  },
});

function ButtonBLock(props) {
  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button color="primary" variant="outlined" className="save" onClick={props.save}>
          Save
        </Button>

        <Button color="primary" variant="outlined" className="edit" onClick={props.edit}>
          Edit
        </Button>

        <Button className="delete" onClick={props.delete} aria-label="delete" variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </ButtonGroup>
    </ThemeProvider>
  );
}

export default ButtonBLock;
