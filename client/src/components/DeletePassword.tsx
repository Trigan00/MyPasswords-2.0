import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDeletePasswordMutation } from '../services/PasswordService';
import Loader from '../UI/Loader';
import useAlert from '../hooks/useAlert';

interface DeleteModalProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  id: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DeletePassword: React.FC<DeleteModalProps> = ({
  isModal,
  setIsModal,
  title,
  id,
}) => {
  const [deletePassword, { isLoading }] = useDeletePasswordMutation();
  const showAlert = useAlert();
  const [deleteIsActive, setDeleteIsActive] = useState(false);

  const onDelete = async () => {
    const res = await deletePassword(id);
    if ('data' in res) showAlert('success', res.data.message);
    setIsModal(false);
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={isModal}
      onClose={() => setIsModal(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModal}>
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Удалить пароль?
            </Typography>
            <CloseIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setIsModal(false)}
            />
          </div>
          <Typography id='transition-modal-description' sx={{ mt: 2 }}>
            Пароль &#171;{title}&#187; будет удален без возможности
            восстановления
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteIsActive}
                  onChange={() => setDeleteIsActive((prev) => !prev)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={'Удалить пароль'}
            />
          </Typography>
          <div style={{ marginTop: '20px', float: 'right' }}>
            {!isLoading ? (
              <>
                <Button
                  size='small'
                  style={{ marginRight: '10px' }}
                  onClick={() => setIsModal(false)}
                >
                  Отменить
                </Button>
                <Button
                  variant='contained'
                  size='small'
                  color='error'
                  disabled={!deleteIsActive}
                  onClick={() => {
                    onDelete();
                    setDeleteIsActive(false);
                    setIsModal(false);
                  }}
                >
                  Удалить
                </Button>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeletePassword;
