'use strict';

var cloudinary = require('cloudinary').v2;

function cloudinaryCroppedImage(publicId, context) {
    var options = context.hash;

    var canRun = (
        publicId &&
        options.width &&
        options.height &&
        options.crop
    );

    if (!canRun) {
        throw new TypeError('Missing arguments');
    }

    options.secure = true;
    options.fetch_format = 'auto';
    options.quality = options.quality || 'auto';
    if (options.crop) {
        options.gravity = options.gravity || 'auto';
    }

    return cloudinary.url(publicId, options);
}

module.exports = {
    cloudinaryCroppedImage: cloudinaryCroppedImage
}
