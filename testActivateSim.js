



// testActivateSim.js
const { SimCard, sequelize } = require('./models'); // models klasörüne göre yolu kontrol et

async function testActivateSim(simId) {
  try {
    const sim = await SimCard.findByPk(simId);
    if (!sim) return console.log('SimCard bulunamadı');

    console.log('Eski status:', sim.status);

    await sequelize.transaction(async (t) => {
      await sim.update({ status: 'aktif' }, { transaction: t });
    });

    const updatedSim = await SimCard.findByPk(simId);
    console.log('Yeni status:', updatedSim.status);

    process.exit(0);
  } catch (err) {
    console.error('Hata:', err);
    process.exit(1);
  }
}

// Test etmek istediğin sim kartın ID’sini buraya yaz
testActivateSim(5);
