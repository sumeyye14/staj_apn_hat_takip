
// controllers/authController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'apn_secret_key';

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı' });

    // Burada password kontrolü (plain text değilse bcrypt ile yap)
    if (user.password !== password) return res.status(401).json({ error: 'Şifre yanlış' });

    // Token oluşturma, role kesin ekleniyor
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // <--- role eklendi
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};
