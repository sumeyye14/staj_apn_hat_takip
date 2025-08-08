
const Operator = require('./operator');   // Operator modelini içe aktarıyoruz
const { DataTypes } = require('sequelize'); // Sequelize kütüphanesinden Data
const Package = require('./packages');  // Package modelini içe aktarıyoruz
const SimCard = require('./sim_cards');  // SimCard modelini içe aktarıyoruz
const Customer = require('./customers');   // Customer modelini içe aktarıyoruz
// Allocation modelini içe aktarıyoruz. Bu model allocations tablosunu temsil edecek
const Allocation = require('./allocations');  // Allocation modelini içe aktarıyoruz

// İlişkiler (Associations)

// Operator - Package
Operator.hasMany(Package, { foreignKey: 'operator_id' });
Package.belongsTo(Operator, { foreignKey: 'operator_id' });

// Package - SimCard
Package.hasMany(SimCard, { foreignKey: 'package_id' });
SimCard.belongsTo(Package, { foreignKey: 'package_id' });

// Customer - Allocation
Customer.hasMany(Allocation, { foreignKey: 'customer_id' });
Allocation.belongsTo(Customer, { foreignKey: 'customer_id' });

// SimCard - Allocation
SimCard.hasMany(Allocation, { foreignKey: 'sim_card_id' });
Allocation.belongsTo(SimCard, { foreignKey: 'sim_card_id' });

module.exports = {    // Dışa aktarılan modeller. Yani bu dosyayı bir başka yerde şöyle kullanabilirsin:
  Operator,          //const { Operator, Package, Customer } = require('./models');
  Package,            //Artık bu modeller başka dosyada da hazır bir şekilde kullanıma açık olur. Bu, modülerlik sağlar.
  SimCard,
  Customer,
  Allocation
};