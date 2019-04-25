'use strict';

const cloudinary = require('cloudinary').v2;

function cloudinaryCroppedImage(publicId, context) {
    const options = context.hash;

    const canRun = (
        publicId &&
        options.width &&
        options.height &&
        options.crop
    );

    if (!canRun) {
        // throw new TypeError('Missing arguments');
        console.log('TypeError: Missing arguments');
    }

    options.secure = true;
    options.fetch_format = 'auto'; // eslint-disable-line camelcase
    options.quality = options.quality || 'auto';

    /**
     * Some crop methods don't support gravity,
     * so don't accept the option if it's one of those methods.
     */
    if (['fit', 'limit', 'mfit', 'pad', 'lpad'].indexOf(options.crop) === -1) {
        options.gravity = options.gravity || 'auto';
    }

    return cloudinary.url(publicId, options);
}

module.exports = {
    cloudinaryCroppedImage
};
