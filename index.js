
// Express.js + Sequelize + JWT Login entegre edilmiş API

require('dotenv').config(); // .env desteği
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('./config/database'); // Sequelize bağlantısı

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'GizliAnahtar';

// Middleware
app.use(cors());
app.use(express.json());

// Ana sayfa (test)
app.get('/', (req, res) => {
  res.send('APN Hat Takip API çalışıyor');
});









// Basit demo kullanıcı (DB yerine)
const demoUser = { username: 'admin', password: '1234' };

// LOGIN endpoint
app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Eksik alan' });

    if (username === demoUser.username && password === demoUser.password) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }

    return res.status(401).json({ message: 'Kullanıcı adı veya şifre yanlış' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token yok' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token geçersiz' });
    req.user = user;
    next();
  });
}

// Korunan test route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hoş geldin ${req.user.username}` });
});

// ROUTE’LAR (mevcut sistemden)
const operatorsRoute = require('./routes/operator');
app.use('/api/operators', operatorsRoute);

const simCardsRoute = require('./routes/sim_cards');
app.use('/api/sim-cards', simCardsRoute);

const packagesRoute = require('./routes/packages');
app.use('/api/packages', packagesRoute);

const customersRoute = require('./routes/customers');
app.use('/api/customers', customersRoute);

const allocationsRoute = require('./routes/allocations');
app.use('/api/allocations', allocationsRoute);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const reportsRoute = require('./routes/reports');
app.use('/api/reports', reportsRoute);

const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));






// Veritabanı bağlantısı ve server başlatma
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı');
    app.listen(PORT, () => {
      console.log(`Server ${PORT} portunda çalışıyor`);
    });
  })
  .catch(err => {
    console.error('Veritabanı bağlantı hatası:', err);
    process.exit(1);
  });