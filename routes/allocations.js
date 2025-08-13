
const { Allocation, Operator } = require('../models');

exports.getOperatorDistributionFromAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.findAll({
      include: [
        {
          model: Operator,
          attributes: ['name']
        }
      ]
    });

    // Operatör bazlı gruplama
    const distribution = {};
    allocations.forEach(a => {
      const opName = a.Operator ? a.Operator.name : "Bilinmeyen";
      distribution[opName] = (distribution[opName] || 0) + 1;
    });

    const result = Object.entries(distribution).map(([operator, count]) => ({
      operator,
      count
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Operatör dağılımı alınamadı' });
  }
};
