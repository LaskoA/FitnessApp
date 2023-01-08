const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

type Errors = {
  username?: string,
}
 
export const validate = (values, props /* only available when using withFormik */) => {
   return sleep(2000).then(() => {
     const errors: Errors = {};
     if (['admin', 'null', 'god'].includes(values.username)) {
       errors.username = 'Nice try';
     }
     // ...
     return errors;
   });
 };