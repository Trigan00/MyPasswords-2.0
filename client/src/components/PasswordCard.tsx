import React, { useState } from 'react';
import { IEncryptedPassword } from '../services/Password.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Tooltip } from '@mui/material';
import styles from './PasswordCard.module.css';
import DeletePassword from './DeletePassword';
import PasswordInfo from './PasswordInfo';

interface PasswordCardProps {
  index: number;
  password: IEncryptedPassword;
}

const getPasswordInfo = (strength: string, isName: boolean = false) => {
  switch (strength) {
    case '0':
      return isName ? 'слабый пароль' : '#f7504a';
    case '1':
      return isName ? 'средний пароль' : '#feea64';
    case '2':
      return isName ? 'сильный пароль' : '#1976d2';

    default:
      return 'gray';
  }
};

const PasswordCard: React.FC<PasswordCardProps> = ({ password, index }) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isPasswordInfo, setIsPasswordInfo] = useState(false);

  return (
    <div className={styles.Wrapper}>
      <Tooltip title={getPasswordInfo(password.passwordStrength, true)}>
        <Box
          className={styles.Circle}
          sx={{
            border: `2px solid ${getPasswordInfo(password.passwordStrength)}`,
          }}
        >
          {index + 1}
        </Box>
      </Tooltip>

      <Box className={styles.Card}>
        <Box
          sx={{ width: '100%', cursor: 'pointer', p: 1 }}
          onClick={() => setIsPasswordInfo(true)}
        >
          {password.title}
        </Box>
      </Box>
      <DeleteIcon
        className={styles.DeleteIcon}
        onClick={() => setIsDelete(true)}
      />

      {isDelete && (
        <DeletePassword
          id={password.id}
          isModal={isDelete}
          setIsModal={setIsDelete}
          title={password.title}
        />
      )}

      {isPasswordInfo && (
        <PasswordInfo
          id={password.id}
          isModal={isPasswordInfo}
          setIsModal={setIsPasswordInfo}
        />
      )}
    </div>
  );
};

export default PasswordCard;
