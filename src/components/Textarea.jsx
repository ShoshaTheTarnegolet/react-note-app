import React from 'react';
import { nanoid } from 'nanoid';
/* material ui */
import NoteInput from './NoteInput';
import Note from './Note';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* css */
const theme = createTheme({
  typography: {
    fontFamily: ['Ubuntu', 'sans-serif'],
  },
});

class Textarea extends React.Component {
  constructor() {
    super();
    this.state = {
      key: nanoid(3),
      id: nanoid(5),
      open: false,
      notes: [],
      title: '',
      details: '',
      date: new Date().toDateString(),
    };
  }

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  updateDetails = (event) => {
    this.setState({ details: event.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (!this.state.details.length) {
      return;
    }
    const newNote = {
      newTitle: this.state.title,
      newDetails: this.state.details,
      date: new Date().toDateString(),
      id: nanoid(3),
      key: nanoid(3),
    };
    this.setState((prevState) => ({
      notes: prevState.notes.concat(newNote),
      title: '',
      details: '',
    }));
  };

  deleteHandler = (id, i) => {
    if (window.confirm('Are you sure you want to delete your note?')) {
      const items = this.state.notes.filter((item) => item.id !== i);
      this.setState({ notes: items });
      this.handleClose();
    } else {
      this.handleClose();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const title = this.state.title;
    const text = this.state.details;
    const date = this.state.date;

    return (
      <ThemeProvider theme={theme}>
        <div className="container">
          {/* note input */}
          <NoteInput titleValue={title} detailsValue={text} dateNow={date} titleHandle={this.updateTitle} detailsHandle={this.updateDetails} onSubmit={this.submitHandler} />
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            {/* new note */}
            {this.state.notes.map((note) => (
              <Note id={note.id} key={note.key} title={note.newTitle} date={note.date} details={note.newDetails} delete={this.deleteHandler.bind(this, note, note.id)} />
            ))}
          </Stack>
        </div>
      </ThemeProvider>
    );
  }
}

export default Textarea;
