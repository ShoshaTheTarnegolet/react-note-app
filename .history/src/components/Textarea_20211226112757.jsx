/* eslint-disable no-undef */
import React from 'react';
import { nanoid } from 'nanoid';
import { storage, db, storageRef } from '../firebase/firebase';
import { ref, set, onValue, remove } from 'firebase/database';
/* material ui */
import NoteInput from './NoteInput';
import Note from './Note';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* css styling*/
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
      id: nanoid(3),
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
    };
    this.setState((prevState) => ({
      notes: prevState.notes.concat(newNote),
      title: '',
      details: '',
    }));
    this.addNoteToDB();
/*
    storageRef.put({
      newTitle: this.state.title,
      newDetails: this.state.details,
      date: new Date().toDateString(),
      id: nanoid(3),
      key: nanoid(3),
    }) */
  };


  addNoteToDB = () => {
    const note_id = `note-${this.state.date}`;
    const time = new Date().toLocaleTimeString();

     set(ref(db, `${this.state.id}`), {
      newTitle: this.state.title,
      newDetails: this.state.details,
      date: new Date().toDateString(),
      id: this.state.id,
      key: this.state.key,
    });
  };

  componentDidMount() {
    let noteRef = ref(db);
    onValue(noteRef, (snapshot) => {
      const data = snapshot.val();
      let allNotes = [];
      console.log(snapshot.val());
      if (snapshot.exists()) {
        for (let key in data) {
          console.log('data[key]', data[key].date, Object.entries(data[key]));
          allNotes.push(data[key]);
          console.log(allNotes);
        }
      }
      this.setState({ notes: allNotes });
    });
  }

  /* delete note function */
  deleteHandler = (id, i) => {
    let noteRef = ref(db);

    if (window.confirm('Are you sure you want to delete your note?')) {
      const items = this.state.notes.filter((item) => {
        set(ref(db, `${item.id}`), {
          newTitle: item.title,
          newDetails: item.details,
          id: this.state.id,
          key: this.state.key,
        })
        console.log(item.id, item.date);
       return item.id !== i});
      /*  update(ref(db), {
   notes:items
      }); */

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
          {/* grid for notes */}
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
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
