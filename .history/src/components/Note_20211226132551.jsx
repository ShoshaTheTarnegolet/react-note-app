import React from 'react';
import { nanoid } from 'nanoid';
import ButtonBlock from './ButtonBLock';
import { app, db } from '../firebase/firebase';
import { ref, set, onValue } from 'firebase/database';
/* material ui */
import Input from '@mui/material/Input';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editId: this.props.id,
      editKey: this.props.key,
      editTitle: this.props.title,
      editDetails: this.props.details,
      editedDate: this.props.date,
      newDate: new Date().toLocaleString(),
      children: [],
      open: false,
      count: 0,
  /*     id: nanoid(), */
    };

    this.save = this.save.bind(this);
    this.edit = this.edit.bind(this);
    this.appendChild = this.appendChild.bind(this);
  }

  appendChild() {
    this.setState({
      newDate: new Date().toLocaleString(),
/*       id: nanoid(), */
      children: [
        ...this.state.children,
        <Typography key={this.state.id} variant="caption">
          Edited {this.state.newDate}
        </Typography>,
      ],
    });
  }

  handleTitle = (e) => {
    this.setState({
      editTitle: e.target.value,
    });
  };

  handleText = (e) => {
    this.setState({
      editDetails: e.target.value,
    });
  };

  edit = () => {
    this.setState(() => ({
      editing: true,
      count: (count) => (count += 1),
    }));
  };

  save() {
    if (this.state.editing === true) {
      this.setState(() => ({
        editing: false,
        editKey: nanoid(3),
      }));
      this.appendChild();
    }
  }


  addNoteToDB = () => {
    /*   const note_id = `note-${this.state.date}`;
     const time = new Date().toLocaleTimeString();
    set(ref(db, `${note_id}-${time.replace(/:\d+ /, ' ')}`), { */
     set(ref(db, `${this.state.id}`), {
       newTitle: this.state.title,
       newDetails: this.state.details,
       date: new Date().toDateString(),
       id: this.state.id,
       key: nanoid(3),
     });
   };

  openModal = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleAgree = () => {
    console.log('I agree!');
    this.handleClose();
  };
  handleDisagree = () => {
    console.log('I do not agree.');
    this.handleClose();
  };

  render() {
    const editedTitle = this.state.editTitle;
    const editedDetails = this.state.editDetails;
    const editedDate = this.state.editedDate;
    const editing = this.state.editing;
    const editKey = this.state.editKey;
    const editId = this.state.editId;

    return (
      <>
        <Card sx={{ boxShadow: 3 }} className="entry" id={editId} key={editKey}>
          <CardActionArea onClick={this.openModal}>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {editedTitle}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom className="date">
                {editedDate}
              </Typography>
              <Typography variant="body1" color="text.secondary" className="text">
                {editedDetails}
              </Typography>
            </CardContent>
          </CardActionArea>
          {/* modal note with editing*/}
          <Dialog id="dialog" open={this.state.open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            {editing ? (
              <Input color="warning" id="title" type="text" name="title" placeholder="Title" defaultValue={editedTitle} onChange={this.handleTitle} />
            ) : (
              <DialogTitle variant="h4" className="note-title">
                {editedTitle}
              </DialogTitle>
            )}
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Typography variant="caption" display="block" gutterBottom className="date">
                  {editedDate}
                </Typography>
              </DialogContentText>
              <>
                {editing ? (
                  <TextareaAutosize onChange={this.handleText} name="textInput" id="textInput" minRows={10} style={{ width: 400 }} defaultValue={editedDetails} />
                ) : (
                  <DialogContentText id="alert-dialog-description">
                    <Typography id="details" className="details" variant="body1">
                      {editedDetails}
                    </Typography>
                    <Typography id="date" display="block" variant="caption">
                      {this.state.children.map((child) => child)}{' '}
                    </Typography>
                  </DialogContentText>
                )}
              </>

              {/* button group */}
              <DialogActions>
                <ButtonBlock save={this.save} edit={this.edit} delete={this.props.delete} />
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Card>
      </>
    );
  }
}

export default Note;
