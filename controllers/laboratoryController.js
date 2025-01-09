const Laboratory = require('../models/laboratoryModel');

// Получить направления для лаборатории
exports.getLaboratoryDirections = async (req, res) => {
    try {
        const directions = await Laboratory.find()
            .populate('patientId', 'fullName birthDate passport phone')
            .sort({ createdAt: -1 }); // Сортировка по дате создания

        res.status(200).json(directions);
    } catch (error) {
        console.error('Ошибка при получении данных лаборатории:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};

// Удалить направления из лаборатории
exports.deleteLaboratoryDirections = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: 'Не выбраны записи для удаления.' });
        }

        const result = await Laboratory.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            message: `Успешно удалено ${result.deletedCount} записей.`,
        });
    } catch (error) {
        console.error('Ошибка при удалении записей лаборатории:', error);
        res.status(500).json({ message: 'Ошибка сервера.' });
    }
};
