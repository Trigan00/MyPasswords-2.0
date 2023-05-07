import { Box, AppBar, Toolbar, Container, Tooltip } from '@mui/material';
import shortenText from '../helpers/shortenText';
import { useAuth } from '../hooks/useAuth';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { logout } from '../store/slices/user/user.action';
import { useTypedDispatch } from '../store/hooks/useTypedDispatch';

const NavBar: React.FC = () => {
  const { email } = useAuth();
  const dispatch = useTypedDispatch();

  const signOutHandler = () => {
    dispatch(logout());
  };

  return (
    <Box>
      <AppBar position='static'>
        <Container>
          <Toolbar style={{ padding: '0' }}>
            <Box
              component='div'
              sx={{ flexGrow: 1 }}
              style={{ cursor: 'pointer' }}
            >
              My Passwords
            </Box>

            <Tooltip title={email}>
              <Box
                sx={{
                  p: 1,
                  mr: '5px',
                  borderRadius: '5px',
                  boxShadow:
                    'rgba(50, 50, 93, 0.15) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
                }}
              >
                {shortenText(email || '', 12)}
              </Box>
            </Tooltip>

            <PowerSettingsNewIcon
              onClick={signOutHandler}
              sx={{ cursor: 'pointer' }}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
