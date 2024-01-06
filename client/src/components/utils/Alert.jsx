import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomAlert({ openStatus }) {
    const [open, setOpen] = React.useState(openStatus);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open} orientation='vertical'>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Close me!
                </Alert>
            </Collapse>
        </Box>
    );
}
