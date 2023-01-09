import { TypeForm } from "./typeForm";

export const validate = (values: TypeForm) => {
  const errors: Partial<TypeForm> = {};

  if (!values.email) {
    errors.email = 'Email обов\'язковий';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Неправильний email';
  }

  if (!values.password) {
    errors.password = 'Пароль обов\'язковий';
  } else if (
    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g.test(values.password)
  ) {
    errors.password = 'Від 5 символів, цифри та великі і маленькі латинські літери!'
  } else if (values.password.length > 128) {
    errors.password = 'Пароль не може бути довшим за 128 символів'
  }

  if (!values.first_name) {
    errors.first_name = 'Ім\'я обов\'язкове';
  } else if (values.first_name.length < 4 || values.first_name.length > 150) {
    errors.first_name = 'Ім\'я має містити від 4 до 150 символів';
  }

  return errors;
};
