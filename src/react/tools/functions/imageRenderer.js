import _isObject from 'lodash/isObject'

const arrayBufferToBase64 = buffer => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

const getImgSrc = image => {
    if (!_isObject(image)) return image

    return `data:${image.contentType};base64, ${arrayBufferToBase64(image.data.data)}`
}


export default getImgSrc