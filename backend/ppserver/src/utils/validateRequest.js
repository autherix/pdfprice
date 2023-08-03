// I want  to write a function to validate a request in node js, params should be :

// 1. the request object completely
// 2. allowed methods for that request
// 2. a map or somehow a nested object containing the list of parameters for that request and some info about each parameter, like max allowed lenght (uint), required (true/false), default value(only if not required), allowed characters
// 3. a map or somehow a nested object containing the list of headers for that request and some info about each header, like max allowed lenght, required, allowed values for that header, allowed/prohibited characters, also an option to know if any other headers could be allowed or not 
// 4. a map or somehow a nested object containing some info about body, could it have body?, max allowed size for body, prohibited characters for body, allowed content types for body, a list of info about each field in body, including whether that field is reuired or not, what are allowed characters for that field, the max lenght of that field etc (exactly like parameters)

// at last the function should check for any type of problem or unhandled thing or any prohibited thing in the request based on the info provided in parameter, if any problem found the function should return false, and a short message saying the problem, and log the whole info about the problem

function validateRequest(request, allowedMethods, parameterInfo, headerInfo, bodyInfo) {
    // Check if the request method is allowed
    if (!allowedMethods.includes(request.method)) {
      const message = `Invalid request method. Allowed methods: ${allowedMethods.join(', ')}`;
      console.error(message);
      return { valid: false, message };
    }
  
    // Validate request parameters
    for (const [paramName, paramDetails] of Object.entries(parameterInfo)) {
      const paramValue = request.params[paramName];
  
      // Check if required parameter is missing
      if (paramDetails.required && !paramValue) {
        const message = `Missing required parameter: ${paramName}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check parameter length
      if (paramDetails.maxLength && paramValue.length > paramDetails.maxLength) {
        const message = `Parameter ${paramName} exceeds maximum length of ${paramDetails.maxLength}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check allowed characters
      if (paramDetails.allowedCharacters && !paramValue.match(paramDetails.allowedCharacters)) {
        const message = `Parameter ${paramName} contains invalid characters`;
        console.error(message);
        return { valid: false, message };
      }
    }
  
    // Validate request headers
    for (const [headerName, headerDetails] of Object.entries(headerInfo)) {
      const headerValue = request.headers[headerName];
  
      // Check if required header is missing
      if (headerDetails.required && !headerValue) {
        const message = `Missing required header: ${headerName}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check header length
      if (headerDetails.maxLength && headerValue.length > headerDetails.maxLength) {
        const message = `Header ${headerName} exceeds maximum length of ${headerDetails.maxLength}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check allowed values
      if (headerDetails.allowedValues && !headerDetails.allowedValues.includes(headerValue)) {
        const message = `Header ${headerName} contains invalid value: ${headerValue}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check allowed characters
      if (headerDetails.allowedCharacters && !headerValue.match(headerDetails.allowedCharacters)) {
        const message = `Header ${headerName} contains invalid characters`;
        console.error(message);
        return { valid: false, message };
      }
    }
  
    // Validate request body
    if (request.body) {
      // Check body size
      if (bodyInfo.maxSize && request.body.length > bodyInfo.maxSize) {
        const message = `Request body exceeds maximum size of ${bodyInfo.maxSize}`;
        console.error(message);
        return { valid: false, message };
      }
  
      // Check allowed content types
      if (bodyInfo.allowedContentTypes && !bodyInfo.allowedContentTypes.includes(request.headers['content-type'])) {
        // if there is multipart/form-data in the allowed list, and the content type starts with multipart/form-data, then it is allowed
        if (bodyInfo.allowedContentTypes.includes("multipart/form-data") && request.headers['content-type'].startsWith("multipart/form-data")) {
            // do nothing
        } else {
        const message = 'Invalid content type in request body';
        console.error(message);
        console.error(`Expected: ${bodyInfo.allowedContentTypes.join(', ')}, got ${request.headers['content-type']}`);
        return { valid: false, message };
      }
    }
  
      // Validate fields in the body
      for (const [fieldName, fieldDetails] of Object.entries(bodyInfo.fields)) {
        const fieldValue = request.body[fieldName];
  
        // Check if required field is missing
        if (fieldDetails.required && !fieldValue) {
          const message = `Missing required field in body: ${fieldName}`;
          console.error(message);
          return { valid: false, message };
        }
  
        // Check field length
        if (fieldDetails.maxLength && fieldValue.length > fieldDetails.maxLength) {
          const message = `Field ${fieldName} in body exceeds maximum length of ${fieldDetails.maxLength}`;
          console.error(message);
          return { valid: false, message };
        }
  
        // Check allowed characters
        if (fieldDetails.allowedCharacters && !fieldValue.match(fieldDetails.allowedCharacters)) {
          const message = `Field ${fieldName} in body contains invalid characters`;
          console.error(message);
          return { valid: false, message };
        }
      }

        // Check if there are any fields in the body that are not allowed
        if (!bodyInfo.allowMoreFields && Object.keys(request.body).length > Object.keys(bodyInfo.fields).length) {
            const message = `Request body contains more fields than allowed, allowed fields: ${Object.keys(bodyInfo.fields).join(', ')}`;
            console.error(message);
            return { valid: false, message };
          }
    }
  
    // If all checks pass, return true and an empty message
    return { valid: true, message: '[+] Request is valid' };
  }
  
module.exports = validateRequest;

//   This is a sample request to call this function:
// const request = {
//     method: 'POST',
//     params: {
//       id: '12345',
//       name: 'John Doe'
//     },
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Auth-Token': 'abc123'
//     },
//     body: {
//       age: 25,
//       email: 'john.doe@example.com'
//     }
//   };
  
//   const allowedMethods = ['GET', 'POST'];
//   const parameterInfo = {
//     id: {
//       required: true,
//       maxLength: 10,
//       allowedCharacters: /^[A-Za-z0-9]+$/
//     },
//     name: {
//       required: true,
//       maxLength: 50,
//       allowedCharacters: /^[A-Za-z\s]+$/
//     }
//   };
//   const headerInfo = {
//     'Content-Type': {
//       required: true,
//       allowedValues: ['application/json', 'application/xml']
//     },
//     'X-Auth-Token': {
//       required: true,
//       maxLength: 50,
//       allowedCharacters: /^[A-Za-z0-9]+$/
//     }
//   };
//   const bodyInfo = {
//     maxSize: 1000,
//     allowedContentTypes: ['application/json'],
//     fields: {
//       age: {
//         required: true,
//         maxLength: 3,
//         allowedCharacters: /^[0-9]+$/
//       },
//       email: {
//         required: true,
//         maxLength: 100,
//         allowedCharacters: /^[A-Za-z0-9@.]+$/
//       }
//     },
//    allowMoreFields: false
//   };
  
//   const validationResult = validateRequest(request, allowedMethods, parameterInfo, headerInfo, bodyInfo);
//   console.log(validationResult);
  