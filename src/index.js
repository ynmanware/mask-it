let REPLACEMENT = '***';
const maskValuesFromArray = ({maskedPayload, currentKey, index, keysArray}) => {
    const key = currentKey.substr(0, currentKey.length - 2);
    const arrayObject = key === '' ? maskedPayload : maskedPayload[key];
    if (arrayObject) {
        arrayObject.map(element => {
            maskValue(element, keysArray.slice(index + 1).join('.'))
        });
    }
    keysArray.splice(1);
}
const maskValueFromObject = ({maskedPayload, currentKey, index, keysArray}) => {
    if (!maskedPayload || !Object.prototype.hasOwnProperty.call(maskedPayload, currentKey)) {
        keysArray.splice(1);
    } else {
        if (keysArray.length - 1 === index) {
            maskedPayload[currentKey] = REPLACEMENT;
        }
        return maskedPayload[currentKey];
    }
}
const maskValue = (payload, pathToBeMasked) => {
    const keys = pathToBeMasked.split('.')
    keys.reduce((maskedPayload, currentKey, index, arr) => {
        if (currentKey.endsWith('[]')) {
            return maskValuesFromArray({maskedPayload, currentKey, index, keysArray: arr})
        }
        return maskValueFromObject({maskedPayload, currentKey, index, keysArray: arr})
    }, payload);
    return payload;
}
const maskValues = (payload, pathsToBeMasked) => {
    pathsToBeMasked.map((pathToBeMasked) => {
        maskValue(payload, pathToBeMasked)
    })
    return payload;
}
module.exports = (replacement) => {
    REPLACEMENT = replacement;
    return maskValues;
}




