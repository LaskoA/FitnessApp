import { TypeForm } from "./typeForm";
import emojiRegex from 'emoji-regex';

const regex = emojiRegex();

export const validate = (values: TypeForm) => {
  const errors: Partial<TypeForm> = {};

  if (!values.email) {
    errors.email = 'Email обов\'язковий';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Неправильний email';
  } else if (values.email.length > 128) {
    errors.email = 'Email не може бути довшим за 128 символів';
  }

  if (!values.password) {
    errors.password = 'Пароль обов\'язковий';
  } else if (
    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g.test(values.password)
  ) {
    errors.password = 'Від 8 символів та повинен включати великі, маленькі літери та цифри!'
  } else if (values.password.length > 128) {
    errors.password = 'Пароль не може бути довшим за 128 символів'
  }

  if (!(values.first_name.trim())) {
    errors.first_name = 'Ім\'я обов\'язкове';
  } else if ((values.first_name.trim()).length < 4 || (values.first_name.trim()).length > 150) {
    errors.first_name = 'Ім\'я має містити від 4 до 150 символів';
  } else if (values.first_name.match(regex)) {
    errors.first_name = 'Ім\'я не має містити емодзі';
  }

  if (values.last_name.length > 128) {
    errors.last_name = 'Прізвище не може бути довшим за 128 символів';
  } else if (values.last_name.match(regex)) {
    errors.last_name = 'Прізвище не має містити емодзі';
  }
  

  return errors;
};
