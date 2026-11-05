const Service = require('../models/Service');

const getServices = async (req, res) => {
    try {
        const { category, search, limit } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        let dbQuery = Service.find(query).populate('providerId', 'name email').sort({ createdAt: -1 });
        if (limit) {
            dbQuery = dbQuery.limit(parseInt(limit));
        }

        const services = await dbQuery;
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('providerId', 'name email phone');

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const { title, category, description, price, duration, image, location } = req.body;

        const service = await Service.create({
            title,
            category,
            description,
            price,
            duration,
            image,
            location,
            providerId: req.user._id
        });

        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (service.providerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized to update this service' });
        }

        service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (service.providerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized to delete this service' });
        }

        await service.deleteOne();

        res.status(200).json({ message: 'Service removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
