# mask-it
Mask values from given JSON (objects / arrays). 
Useful in protecting confidential data, mask it before sending it to third party applications.

## Installation
```
$ npm install mask-it
```
OR
```
$ yarn install mask-it
```

## Usage
```javascript
const maskJson = require('mask-it')('***') // values will be replaced with '***'
const pathsToBeMasked = ['block[].price'];
const mockData = {"block":[{"type":"article","id":"1","price":"$40"},{"type":"article","id":"2","price":"$50"}]}
const maskedData = maskJson(mockData, pathsToBeMasked);
// maskedData = {"block":[{"type":"article","id":"1","price":"***"},{"type":"article","id":"2","price":"***"}]}
```
Note that input json object get modified in the process, cloning isn't used. 

## Tests

```
$ npm test 
```
OR
```
$ yarn test
```

## License
MIT