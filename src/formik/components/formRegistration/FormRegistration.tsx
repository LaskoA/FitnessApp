import { useState } from 'react';
import { Button, Grid, LinearProgress } from '@mui/material';
import { Formik, Form, Field, FormikState } from 'formik';
import { TextField } from 'formik-mui';
import { useRouter } from 'next/router';
import { Values } from './typeForm';
import { createUser } from '@app/queries';
import { validate } from './validateForm';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { actions as actionsAvatar } from '../../../redux/userAvatarSlice';
import { dataURLtoFile } from '@app/cropper/dataURLtoFile';

export const FormRegistration = () => {
  const { back } = useRouter();
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const dispatch = useAppDispatch();
  const { avatar } = useAppSelector(state => state.avatar);

//   const onSaveHandler = () => {
//     fetch(`http://127.0.0.1:8000/user/register/`, {
//         method: "post",
//         credentials: "include", // send cookie with auth
//         headers: {
//             "Content-Type": "application/json",
//             // "X-CSRFToken": document.getElementById("csrf-token").value,
//         },
//         body: JSON.stringify({picture: avatar}),
//      });
//  }

  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: {
      setSubmitting: (isSubmitting: boolean) => void,
      resetForm: (nextState?: Partial<FormikState<Values>>) => void,
    },
  ) => {
    try {
      // if (typeof preview === 'string') {
      //   await dispatch(actionsAvatar.setAvatarName(values.email))
      //   await dispatch(actionsAvatar.setAvatar(dataURLtoFile(preview, `${avatarName}.png`)))
      // }
      // console.log(avatar);
      // onSaveHandler();
      // const ava = JSON.stringify({picture: avatar});

      await createUser(values);
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
      {({ submitForm, isSubmitting }) => (
        <Form style={{ width: '100%' }}>
          <Grid item md={12}>
            <Grid container spacing={5}>
              <Grid
                container
                item
                md={6}
                direction='column'
                rowSpacing={1}
              >
                <Grid item>
                  <Field
                    component={TextField}
                    name="first_name"
                    label="Ім'я"
                    fullWidth
                    sx={{
                      height: '70px'
                    }}
                  />
                </Grid>

                <Grid item>
                  <Field
                    component={TextField}
                    name="last_name"
                    label="Прізвище"
                    fullWidth
                    sx={{
                      height: '70px'
                    }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                item
                md={6}
                direction='column'
                rowSpacing={1}
              >
                <Grid item>
                  <Field
                    component={TextField}
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
          </Grid>

          {isSubmitting && <LinearProgress />}
         
          <Grid item md={6} pl='20px' ml="auto" mt={4}>
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