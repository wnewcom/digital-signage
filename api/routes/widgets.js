const express = require('express')
const router = express.Router()

const Widget = require('../models/Widget')
const CommonHelper = require('../helpers/common_helper')
const WidgetHelper = require('../helpers/widget_helper')

/**
 *  list    - GET /widgets/
 *  create  - POST /widgets/
 *  read    - GET /widgets/{id}/
 *  update  - PUT /widgets/{id}/
 *  delete  - DELETE /widgets/{id}/
 */

// GET /widgets/ - List all widgets
router.get('/', async (req, res) => {
  try {
    const widgets = await Widget.find()
    res.json(widgets)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /widgets/ - Create a new widget
router.post('/', async (req, res) => {
  try {
    const widget = new Widget(req.body)
    const savedWidget = await widget.save()
    
    // Run afterActions middleware
    req.result = savedWidget
    await WidgetHelper.addWidget(req, res, () => {})
    await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    
    res.status(201).json(savedWidget)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// GET /widgets/{id}/ - Read a specific widget
router.get('/:id', async (req, res) => {
  try {
    const widget = await Widget.findById(req.params.id)
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    res.json(widget)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// PUT /widgets/{id}/ - Update a specific widget
router.put('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    })
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    
    // Run afterActions middleware
    req.result = widget
    await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    
    res.json(widget)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// DELETE /widgets/{id}/ - Delete a specific widget
router.delete('/:id', async (req, res) => {
  try {
    const widget = await Widget.findByIdAndDelete(req.params.id)
    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' })
    }
    
    // Run afterActions middleware
    req.result = widget
    await WidgetHelper.deleteWidget(req, res, () => {})
    await CommonHelper.broadcastUpdateMiddleware(req, res, () => {})
    
    res.json({ message: 'Widget deleted successfully', widget })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router