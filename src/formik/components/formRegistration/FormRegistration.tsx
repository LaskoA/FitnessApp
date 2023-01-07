// import * as React from 'react';
// import {render} from 'react-dom';
// import {Formik, Form, Field} from 'formik';
// import {
//   Box,
//   Button,
//   LinearProgress,
//   MenuItem,
//   FormControl,
//   FormControlLabel,
//   Typography,
//   AutocompleteRenderInputParams,
//   ToggleButton,
// } from '@mui/material';
// import {LocalizationProvider} from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import MuiTextField from '@mui/material/TextField';
// import {
//   Autocomplete,
//   TextField,
//   Select,
//   Switch,
//   ToggleButtonGroup,
// } from 'formik-mui';
// // import {TimePicker, DatePicker, DateTimePicker} from 'formik-mui-lab';

// // import {UpperCasingTextField} from './UpperCasingTextField';
// // import {top100Films, ranges} from './data';

// interface Values {
//   email: string;
// }

// export const MyForm = () => (
//   <Formik
//     initialValues={{
//       email: '',
//       password: '',
//       select: '0-20',
//       tags: [],
//       rememberMe: true,
//       date: new Date(),
//       time: new Date(),
//       dateTime: new Date(),
//       toggle: [],
//       autocomplete: [],
//     }}
//     validate={(values) => {
//       const errors: Partial<Values> = {};
//       if (!values.email) {
//         errors.email = 'Required';
//       } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//       ) {
//         errors.email = 'Invalid email address';
//       }
//       return errors;
//     }}
//     onSubmit={(values, {setSubmitting}) => {
//       setTimeout(() => {
//         setSubmitting(false);
//         alert(JSON.stringify(values, null, 2));
//       }, 500);
//     }}
//   >
//     {({values, submitForm, resetForm, isSubmitting, touched, errors}) => (
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Form>
//           <Box margin={1}>
//             <Field
//               // component={UpperCasingTextField}
//               name="email"
//               type="email"
//               label="Email"
//               helperText="Please Enter Email"
//             />
//           </Box>
//           <Box margin={1}>
//             <Field
//               component={TextField}
//               type="password"
//               label="Password"
//               name="password"
//             />
//           </Box>
//           <Box margin={1}>
//             <FormControlLabel
//               control={
//                 <Field component={Switch} type="checkbox" name="rememberMe" />
//               }
//               label="Remember Me"
//             />
//           </Box>
//           <Box margin={1}>
//             <Field
//               component={TextField}
//               type="text"
//               name="select"
//               label="With Select"
//               select
//               variant="standard"
//               helperText="Please select Range"
//               margin="normal"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             >
//               {/* {ranges.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))} */}
//             </Field>
//           </Box>
//           <Box margin={1}>
//             <FormControl sx={{minWidth: 120}}>
//               <Field
//                 component={Select}
//                 type="text"
//                 label="Tags"
//                 name="tags"
//                 multiple={true}
//                 inputProps={{name: 'tags', id: 'tags'}}
//               >
//                 <MenuItem value="dogs">Dogs</MenuItem>
//                 <MenuItem value="cats">Cats</MenuItem>
//                 <MenuItem value="rats">Rats</MenuItem>
//                 <MenuItem value="snakes">Snakes</MenuItem>
//               </Field>
//             </FormControl>
//           </Box>
//           {isSubmitting && <LinearProgress />}
//           <Box margin={1}>
//             <Field /* component={TimePicker} */ name="time" label="Time" />
//           </Box>
//           <Box margin={1}>
//             <Field /* component={DatePicker} */ name="date" label="Date" />
//           </Box>
//           <Box margin={1}>
//             <Field
//               // component={DateTimePicker}
//               name="dateTime"
//               label="Date Time"
//             />
//           </Box>
//           <Box margin={1}>
//             <Typography>Toggle button</Typography>
//             <Field component={ToggleButtonGroup} name="toggle" type="checkbox">
//               <ToggleButton value="left" aria-label="left aligned">
//                 <FormatAlignLeftIcon />
//               </ToggleButton>
//               <ToggleButton value="center" aria-label="centered">
//                 <FormatAlignCenterIcon />
//               </ToggleButton>
//               <ToggleButton value="right" aria-label="right aligned">
//                 <FormatAlignRightIcon />
//               </ToggleButton>
//               <ToggleButton value="justify" aria-label="justified" disabled>
//                 <FormatAlignJustifyIcon />
//               </ToggleButton>
//             </Field>
//           </Box>
//           <Box margin={1}>
//             <Field
//               name="autocomplete"
//               multiple
//               component={Autocomplete}
//               // options={top100Films}
//               getOptionLabel={(option: any) => option.title}
//               style={{width: 300}}
//               renderInput={(params: AutocompleteRenderInputParams) => (
//                 <MuiTextField
//                   {...params}
//                   name="autocomplete"
//                   error={touched['autocomplete'] && !!errors['autocomplete']}
//                   // helperText={touched['autocomplete'] && errors['autocomplete']}
//                   label="Autocomplete"
//                   variant="outlined"
//                 />
//               )}
//             />
//           </Box>
//           <Box margin={1}>
//             <Button
//               sx={{margin: 1}}
//               variant="contained"
//               color="primary"
//               disabled={isSubmitting}
//               onClick={submitForm}
//             >
//               Submit
//             </Button>
//             <Button
//               sx={{margin: 1}}
//               variant="contained"
//               color="secondary"
//               disabled={isSubmitting}
//               onClick={() => {
//                 resetForm();
//               }}
//             >
//               Reset
//             </Button>
//           </Box>
//           <pre>{JSON.stringify(values, null, 2)}</pre>
//         </Form>
//       </LocalizationProvider>
//     )}
//   </Formik>
// );

// import React, { FC, useEffect } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { Box, Button, FormControl, OutlinedInput, TextField, useFormControl } from '@mui/material';
// import { MyFormHelperText } from './HelperText';
// // import Button from '@material-ui/core/Button';
// // import TextField from '@material-ui/core/TextField';

// const validationSchema = yup.object({
//   email: yup
//     .string()
//     .email('Enter a valid email')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required'),
// });
// // type Props = {
// //   formik: (...args: any) => any
// // };

// export const FormRegistration = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//   });

//   const { error, focused } = useFormControl() || {};

//   useEffect(() => {
//     console.log('error')
//   }, [focused])

//   return (
//     <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
//       <TextField
//         fullWidth
//         id="email"
//         name="email"
//         label="Email"
//         value={formik.values.email}
//         onChange={formik.handleChange}
//         error={formik.touched.email && Boolean(formik.errors.email)}
//         helperText={formik.touched.email && formik.errors.email}
//       />

//       <MyFormHelperText
//         message={formik.touched.email && formik.errors.email}
//         error={error}
//       />
      
//       <TextField
//         fullWidth
//         id="password"
//         name="password"
//         label="Password"
//         type="password"
//         value={formik.values.password}
//         onChange={formik.handleChange}
//         error={formik.touched.password && Boolean(formik.errors.password)}
//         helperText={formik.touched.password && formik.errors.password}
//       />

//       <Button color="primary" variant="contained" fullWidth type="submit">
//         Submit
//       </Button>
//     </Box>
//   );
// };

import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { useRouter } from 'next/router';
import { DatePicker } from 'formik-mui-lab';
import { Fragment } from 'react';
import { FormikRadioGroup } from './FormikRadioGroup';
import axios from 'axios';

interface Values {
  email: string;
  password: string;
  username: string;
}

export const FormRegistration = () => {
  const { back } = useRouter();
  const validate = (values: Values) => {
    const errors: Partial<Values> = {};

    // if (!values.email) {
    //   errors.email = 'Email обов\'язковий';
    // } else if (
    //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    // ) {
    //   errors.email = 'Неправильний email';
    // }

    // if (!values.password) {
    //   errors.password = 'Пароль обов\'язковий';
    // } else if (
    //   !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(values.password)
    // ) {
    //   errors.password = 'Пароль має складатися мінімум із 8 символів та містити хоча б по одному із таких символів: число, по одному латинському символу у верхньому та нижньому регістрі!'
    // }

    // if (!values.name) {
    //   errors.name = 'Ім\'я обов\'язкове';
    // } else if (values.name.length < 4) {
    //   errors.name = 'Ім\'я має містити мінімум 4 символи';
    // }

    return errors;
  }


  const handleSubmit = (
    values: Values,
    { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}
  ) => {
      setSubmitting(false);
      console.log(values);
      axios.post('http://127.0.0.1:8000/user/register/', values)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // alert(JSON.stringify(values, null, 2));
  }

  const optionsRadioGroup = [
    {
      name: 'Чоловік',
      value: 'm',
    },
    {
      name: 'Жінка',
      value: 'f',
    },
  ];

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, setFieldValue, values }) => (
        <Form>
          <Grid container mt={2.75} columnSpacing={8}>
            <Grid item md={6}>
              <Field
                component={TextField}
                name="username"
                label="Ім'я"
              />

              <Field
                component={TextField}
                name="usersurname"
                label="Прізвище"
              />

              <Field
                component={TextField}
                name="birthdate"
                type="date"
                label="Дата народження"
                InputLabelProps={{ shrink: true }}
                // textField={{ helperText: 'Helper text', variant: 'filled' }}
              />

              <Field
                name="sex"
                options={optionsRadioGroup}
                component={FormikRadioGroup}
              />
            </Grid>
            <Grid item md={6}>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />

              <Field
                component={TextField}
                type="password"
                label="Пароль"
                name="password"
              />

              <Field
                component={TextField}
                type="number"
                name="height"
                label="Зріст"
              />

              <Field
                component={TextField}
                type="number"
                name="weight"
                label="Вага"
              />
            </Grid>
          </Grid>
         

        {/* <Field component={DatePicker} name="date" label="Date" /> */}

          {isSubmitting && <LinearProgress />}
          {/* <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button> */}
          <Grid item md={6} ml="auto" mt={5}>
            <Grid container columnSpacing={3}>
              <Grid item md={6}>
                <Button variant="outlined" fullWidth onClick={back}>
                  Скасувати
                </Button>
              </Grid>
              <Grid item md={6}>
                {/* onclick save changes with formik values onSubmit */}
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Зберегти
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}