
const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');


/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Müşteri/bayi işlemleri
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Tüm müşterileri/bayileri listeler
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Başarılı
 */
router.get('/', customersController.getAll);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Tek müşteri/bayi detayını getirir
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Başarılı
 *       404:
 *         description: Bulunamadı
 */
router.get('/:id', customersController.getById);

router.post('/', customersController.create);
router.put('/:id', customersController.update);
router.delete('/:id', customersController.remove);












router.get('/', customersController.getAll);
router.get('/:id', customersController.getById);
router.post('/', customersController.create);
router.put('/:id', customersController.update);
router.delete('/:id', customersController.remove);

module.exports = router;












