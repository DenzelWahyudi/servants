const uploadToCloudinary = require('../../../utils/uploadToCloudinary');

const uploadFile = async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ message: 'No file provided' });

        const result = await uploadToCloudinary(req.file.buffer);

        // const savedFile = await File.create({
        //     url: result.secure_url,
        //     publicId: result.public_id,
        //     resourceType: result.resource_type,
        //     format: result.format,
        //     originalName: req.file.originalname,
        //     bytes: result.bytes,
        // });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Upload failed',
            error: error.message,
        });
    }
};

module.exports = { uploadFile };
