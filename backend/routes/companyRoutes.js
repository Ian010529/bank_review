const express = require('express');
const {
  getAllCompanies,
  getAllCompaniesTotalStats,
  getCompaniesById,
} = require('../controllers/companyController');

const router = express.Router();

router.get('/all', getAllCompanies);
router.get('/total-stats', getAllCompaniesTotalStats);
router.get('/stats', getAllCompaniesTotalStats);
router.get('/:id', getCompaniesById);

module.exports = router;
