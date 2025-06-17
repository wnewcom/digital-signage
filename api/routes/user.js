import express from 'express'
import bcrypt from 'bcryptjs'

const router = express.Router()

// Demo user for testing
const demoUser = {
  id: 1,
  username: 'demo',
  email: 'demo@example.com',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // 'demo'
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (username === demoUser.username && await bcrypt.compare(password, demoUser.password)) {
      req.session.user = { id: demoUser.id, username: demoUser.username }
      res.json({ 
        success: true, 
        user: { id: demoUser.id, username: demoUser.username } 
      })
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.json({ success: true })
})

router.get('/me', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.status(401).json({ error: 'Not authenticated' })
  }
})

export default router