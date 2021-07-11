import RegExsUtils from "./regExs.js";

const regExsUtils = new RegExsUtils();

const isNotEmpty = (value, field, errorMessage) => {
  
  if(!value){
    return {
      success: false,
      errorMessage: errorMessage,
      field: field
    };
  }

  return {
    success: true,
    errorMessage: '',
    field:field
  };
} 

const maxLength = (value, field, errorMessage, max) => {
  
  if(value.length > max){
    return {
      success: false,
      errorMessage: errorMessage,
      field: field
    };
  }

  return {
    success: true,
    errorMessage: '',
    field:field
  };
} 

const isValidUrl = (value, field, errorMessage) => {
  
  if(!regExsUtils.isValidUrl.test(value)){
    return {
      success: false,
      errorMessage: errorMessage,
      field: field
    };
  }

  return {
    success: true,
    errorMessage: '',
    field:field
  };
} 

export {
  isNotEmpty,
  maxLength,
  isValidUrl
}