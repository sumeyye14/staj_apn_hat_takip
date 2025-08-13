
// Express modülünü projeye dahil ediyoruz
const express = require('express');
const router = express.Router();

// Controller ve modeller
const reportsController = require('../controllers/reportsController');
const auth = require('../middleware/auth');
const { Allocation, Operator, Sequelize } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Raporlama işlemleri
 */

// 📌 1. Aktif hat sayısını döndürür
router.get(
  '/active-sim-count',
  auth(['admin', 'user']),
  reportsController.activeSimCardCount
);

// 📌 2. SimCard üzerinden operatör bazlı hat dağılımı
router.get(
  '/operator-distribution',
  auth(['admin', 'user']),
  reportsController.operatorDistribution
);

// 📌 2b. Allocations tablosundan operatör bazlı dağılım
router.get(
  '/operator-distribution-from-allocations',
  auth(['admin', 'user']),
  async (req, res) => {
    try {
      const data = await Allocation.findAll({
        attributes: [
          'operator_id',
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        group: ['operator_id'],
        include: [
          { model: Operator, attributes: ['name'] }
        ]
      });

      const result = data.map(item => ({
        operator: item.Operator?.name || 'Bilinmeyen',
        count: parseInt(item.dataValues.count, 10)
      }));

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucuda hata oluştu' });
    }
  }
);

// 📌 3. Müşteri bazlı tahsisat raporu
router.get(
  '/customer-allocations',
  auth(['admin', 'user']),
  reportsController.customerAllocations
);

// 📌 4. Tarihe göre tahsisat raporu
router.get(
  '/allocations-by-date',
  auth(['admin', 'user']),
  reportsController.allocationsByDate
);

// 🔹 Test endpoint: operatör dağılımını kontrol etmek için (middleware ile)
router.get(
  '/operator-distribution-test',
  auth(['admin', 'user']),
  async (req, res) => {
    try {
      await reportsController.operatorDistributionFromAllocations(
        { query: {} },
        { json: (output) => res.json(output) }
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
