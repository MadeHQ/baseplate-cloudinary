'use strict';

const cloudinary = require('cloudinary').v2;

function cloudinaryCroppedImage(publicId, context) {
    const options = context.hash;

    const { width, height, crop } = options;

    if (!crop) {
        crop = 'fill';
    }

    if (!publicId || (!width && !height)) {
        return 'https://via.placeholder.com/720x405?text=Missing+arguments';
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
