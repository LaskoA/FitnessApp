import { useState } from 'react';
import { Button, Grid, LinearProgress } from '@mui/material';
import { Formik, Form, Field, FormikState } from 'formik';
import { TextField } from 'formik-mui';
import { useRouter } from 'next/router';
import { TypeForm } from './typeForm';
import { createUser } from '@app/queries';
import { validate } from './validateForm';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { actions as actionsAvatar } from '../../../redux/userAvatarSlice';
import userAvatar from '@app/app/images/user-avatar.png';

export const FormRegistration = () => {
  const { back } = useRouter();
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const dispatch = useAppDispatch();
  const { avatar } = useAppSelector(state => state.avatar);

  const handleSubmit = async (
    values: TypeForm,
    { setSubmitting, resetForm }: {
      setSubmitting: (isSubmitting: boolean) => void,
      resetForm: (nextState?: Partial<FormikState<TypeForm>>) => void,
    },
  ) => {
    try {
      await createUser({...values, base64: avatar});
      dispatch(actionsAvatar.setAvatar(null));
      dispatch(actionsAvatar.setPreview(userAvatar));
      setSubmitting(false);
      resetForm();
    } catch {
      setIsErrorSubmit(true);
      setTimeout(setIsErrorSubmit, 5000, false);
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        first_name: '',
        last_name: '',
      }}
      validate={validate}
      onSubmit={handleSubmit}
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
                  label="Ім'я"
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
                  label="Прізвище"
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
                  label="Email"
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
                  label="Пароль"
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
                <Button variant="outlined" fullWidth onClick={back}>
                  Скасувати
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
                  {isErrorSubmit ? 'Помилка' : 'Зберегти'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}