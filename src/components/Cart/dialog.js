import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Menu from './Menu';

import POSProvider, { POSContext } from './POSProvider';

export default function POS({ Launcher }) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([0]);
  const { menu, order } = useContext(POSContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <POSProvider>
      <Launcher onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{"Transcription"}</DialogTitle> */}
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            {call.TranscriptionText}
          </DialogContentText> */}
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
            {call.RecordingUrl ? (
              <audio controls>
                <source src={call.RecordingUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div />
            )}
          </div> */}

          <DialogTitle id="alert-dialog-title">{'Menu'}</DialogTitle>
          <Menu />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleCreateOrder} color="primary" autoFocus>
            Create Order
          </Button> */}
        </DialogActions>
      </Dialog>
    </POSProvider>
  );
}
