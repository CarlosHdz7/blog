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

export {
  isNotEmpty,
  maxLength
}