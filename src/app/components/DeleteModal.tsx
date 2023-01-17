import * as React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { DialogTitle, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
const style = {
  position: 'absolute' as 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 468,
  bgcolor: 'background.paper',
  border: '2px solid #F5F6FA',
  boxShadow: 24,
};

type Props = {
  open: boolean,
  setOpen: (open: boolean) => void,
  toDelete: () => void,
}

export const BasicModal: React.FC<Props> = ({ open, setOpen, toDelete }) => {
  const handleClose = () => setOpen(false);
  const{ t } = useTranslation('common');

  return (
    <div>
      {open && 
        <Modal
          className='modal'
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ px: { md: 8 }, py: { md: 6 } }}
        >
          <DialogTitle p={0}>
            <Grid item md={4} display="flex" justifyContent="center" alignItems="center">
              <Box mt={{ md: 2 }} sx={style} height={273} width={468} borderRadius="20px">
                <Box mt={{ md: 5 }} display="flex" flexDirection="column" mx="auto" width={368} gap={2.5} margin={6}>
                  <Box mt={{ md: 1 }}>
                    <Typography variant="h3">
                      {t('delete.title')}
                    </Typography>
                  </Box>

                  <Box >
                    <Typography id="modal-modal-description" color="grey.400">
                      {t('delete.description')}
                    </Typography>
                  </Box>
                  
                  <Box display="flex" mx="auto" gap={2} height={53} width={368}>
                    <Button 
                      fullWidth variant="contained" 
                      sx={{ backgroundColor: "#F5F6FA", 
                      border: "1px solid #CB4920",
                      color: "#CB4920", 
                      "&:hover": { backgroundColor: "#F5F6FA", color: "#CB4920"}
                      }}
                      onClick={handleClose}
                    >
                      {t('general.buttons.no')}
                    </Button>

                    <Button
                      fullWidth 
                      variant="contained" 
                      sx={{ backgroundColor: "#CB4920", 
                      color: "#FFFFFF"}}
                      onClick={toDelete}
                    >
                      {t('general.buttons.yes')}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </DialogTitle>
        </Modal>
      }
    </div>
  );
}