// validateRegister.js
export default function validateRegister(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || typeof username !== 'string' || username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  next();
}
