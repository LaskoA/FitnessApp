import { Button, Grid, LinearProgress } from '@mui/material';
import { Formik, Form, Field, FormikState } from 'formik';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField } from 'formik-mui';

import { createUser, useChangeUser } from '@app/queries';
import userAvatar from '@app/app/images/user-avatar.png';
import { authStorage } from '@app/auth/utils/authStorage';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { actions as actionsAvatar } from '@app/redux/userAvatarSlice';

import { TypeForm } from './typeForm';
import { validate } from './validateForm';

export const FormRegistration = () => {
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const { avatar } = useAppSelector(state => state.avatar);
  const { t } = useTranslation('common');
  const { back, push } = useRouter();
  const dispatch = useAppDispatch();
  const local = authStorage.get();

  const { mutate } = useChangeUser({
    onError: async e => {
      await push('/profile')
      console.log('change data error:', e)
    }
  });

  useEffect(() => {
    if (local) {
      mutate({ id: Number(local.user.id) })
    } else {
      push('/change');
    }
  }, []);

  const initialValues: TypeForm = {
    email: local?.user?.email || '',
    password: String(local?.user?.password) || '',
    first_name: local?.user?.firstName || '',
    last_name: local?.user?.lastName || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      onSubmit={() => {}}
    >
      {({ submitForm, isSubmitting, values }) => (
        <Form style={{ width: '100%' }}>
          <Grid container spacing={5}>
            <Grid
              container
              item
              maxWidth={368}
              m='auto'
              direction='column'
              rowSpacing={1}
            >
              <Grid item>
                <Field
                  component={TextField}
                  value={values.first_name.trim()}
                  name="first_name"
                  label={t('form.placoholder.firstName')}
                  fullWidth
                  sx={{
                    height: '70px',
                  }}
                />
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  value={values.last_name.trim()}
                  name="last_name"
                  label={t('form.placoholder.lastName')}
                  fullWidth
                  sx={{
                    height: '70px'
                  }}
                />
              </Grid>
            
              <Grid item>
                <Field
                  component={TextField}
                  value={values.email.toLowerCase().trim()}
                  name="email"
                  type="email"
                  label={t('form.placoholder.email')}
                  fullWidth
                  sx={{
                    height: '70px',
                  }}
                />
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  value={values.password.trim()}
                  type="password"
                  label={t('form.placoholder.password')}
                  name="password"
                  fullWidth
                  sx={{
                    height: '70px'
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {isSubmitting && <LinearProgress />}
         
          <Grid
            item
            p='0 20px'
            m='auto'
            mt={5}
            maxWidth={368}
          >
            <Grid container columnSpacing={3}>
              <Grid item md={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={back}
                >
                  {t('general.buttons.cancel')}
                </Button>
              </Grid>
              <Grid item md={6}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={submitForm}
                  color={isErrorSubmit ? 'error' : 'primary'}
                >
                  {t(`general.buttons${isErrorSubmit ? 'error' : 'save'}`)}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
