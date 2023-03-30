import React from 'react'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const Notify = ({notify , setNotify}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={notify.isOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setNotify({
                  ...notify,
                  isOpen:false
                });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity={notify.severity}
        >
          {notify.message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default Notify