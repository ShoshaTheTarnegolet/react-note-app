import React from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Ubuntu', 'sans-serif'],
  },
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const NoteInput = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <form className="form">
        <label htmlFor="title"></label>
        <Input color="warning" id="title" type="text" name="title" placeholder="Title" value={props.titleValue} onChange={props.titleHandle} />
        <label htmlFor="textInput"></label>
        <TextareaAutosize name="textInput" id="textInput" minRows={10} style={{ width: 400 }} placeholder="Your note" value={props.detailsValue} onChange={props.detailsHandle} />

        <Button color="neutral" variant="contained" className="addBtn" onClick={props.onSubmit}>
          Add Note
        </Button>
      </form>
    </ThemeProvider>
  );
};

export default NoteInput;
