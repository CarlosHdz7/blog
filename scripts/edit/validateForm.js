import { isNotEmpty, maxLength, isValidUrl } from '../validations.js';

const validateForm = () => {
  const validations = [
    {
      field: 'textTitle',
      validate(value, field) {
        return isNotEmpty(value, field, 'You must provide a title');
      },
    },
    {
      field: 'textTitle',
      validate(value, field) {
        return maxLength(value, field, 'Text is too long', 100);
      },
    },
    {
      field: 'textSubTitle',
      validate(value, field) {
        return isNotEmpty(value, field, 'You must provide a sub title');
      },
    },
    {
      field: 'textSubTitle',
      validate(value, field) {
        return maxLength(value, field, 'Text is too long', 80);
      },
    },
    {
      field: 'textDescription',
      validate(value, field) {
        return isNotEmpty(value, field, 'You must provide a description');
      },
    },
    {
      field: 'textUrlImage',
      validate(value, field) {
        return isNotEmpty(
          value,
          field,
          'You must provide a valid url for image'
        );
      },
    },
    {
      field: 'textUrlImage',
      validate(value, field) {
        return isValidUrl(
          value,
          field,
          'You must provide a valid url for image'
        );
      },
    },
  ];

  let errors = [];

  validations.forEach((validation) => {
    const element = document.getElementById(validation.field);
    const value = element.value;

    const isValid = validation.validate(value, validation.field);

    if (!isValid.success) {
      errors.push(isValid);
    }
  });

  if (errors.length > 0) {
    handleErrors(errors);
    return false;
  }

  return true;
};

const handleErrors = async (errors) => {
  await cleanErrorsMessages();

  errors.forEach((error) => {
    const element = document.getElementById(`${error.field}_message`);
    element.textContent = error.errorMessage;
  });
};

const cleanErrorsMessages = async () => {
  const messages = Array.from(document.getElementsByClassName('message'));
  messages.forEach((message) => (message.textContent = ''));
};

export { validateForm, cleanErrorsMessages };
