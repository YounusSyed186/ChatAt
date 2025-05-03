import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  useTheme,
  DialogActions,
} from '@mui/material';

const ShortcutKey = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
        color: theme.palette.text.primary,
        padding: theme.spacing(0.5, 1),
        borderRadius: 1,
        margin: theme.spacing(0, 0.5),
        fontSize: '0.875rem',
        display: 'inline-flex',
        alignItems: 'center',
        height: '24px',
      }}
    >
      {children}
    </Box>
  );
};

const ShortcutItem = ({ action, keys }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1.5,
        px: 2,
      }}
    >
      <Typography variant="body1">{action}</Typography>
      <Box>
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            <ShortcutKey>{key}</ShortcutKey>
            {index < keys.length - 1 && (
              <Typography component="span" sx={{ mx: 0.5, color: 'text.secondary' }}>
                +
              </Typography>
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

const ShortcutsDialog = ({ open, onClose }) => {
  const theme = useTheme();

  const shortcuts = [
    { action: 'Mark as unread', keys: ['Cmd', 'Shift', 'U'] },
    { action: 'Archive chat', keys: ['Cmd', 'Shift', 'E'] },
    { action: 'Pin chat', keys: ['Cmd', 'Shift', 'P'] },
    { action: 'Search Chat', keys: ['Cmd', 'Shift', 'F'] },
    { action: 'Next Chat', keys: ['Ctrl', 'Tab'] },
    { action: 'New Group', keys: ['Cmd', 'Shift', 'N'] },
    { action: 'Increase speed of voice message', keys: ['Shift', '.'] },
    { action: 'Settings', keys: ['Cmd', 'G'] },
    { action: 'Mute', keys: ['Cmd', 'Shift', 'M'] },
    { action: 'Delete chat', keys: ['Cmd', 'Shift', 'D'] },
    { action: 'Search', keys: ['Cmd', 'F'] },
    { action: 'New Chat', keys: ['Cmd', 'N'] },
    { action: 'Previous Chat', keys: ['Ctrl', 'Shift', 'Tab'] },
    { action: 'Profile & About', keys: ['Cmd', 'P'] },
    { action: 'Decrease speed of voice message', keys: ['Shift', ','] },
    { action: 'Emoji Panel', keys: ['Cmd', 'E'] },
    { action: 'Sticker Panel', keys: ['Cmd', 'S'] },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="keyboard-shortcuts-dialog"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: '800px',
          height: 'auto',
          maxHeight: '90vh',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle id="keyboard-shortcuts-dialog" sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Keyboard Shortcuts
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 0,
          }}
        >
          <Box>
            {shortcuts.slice(0, 8).map((shortcut) => (
              <ShortcutItem key={shortcut.action} action={shortcut.action} keys={shortcut.keys} />
            ))}
          </Box>
          <Box>
            {shortcuts.slice(8).map((shortcut) => (
              <ShortcutItem key={shortcut.action} action={shortcut.action} keys={shortcut.keys} />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ minWidth: '120px' }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShortcutsDialog;