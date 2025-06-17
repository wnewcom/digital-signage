const db = require('../database');

class Widget {
  static create(widgetData) {
    const stmt = db.prepare(`
      INSERT INTO widgets (slide_id, type, name, config, position_x, position_y, width, height, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      widgetData.slide_id,
      widgetData.type,
      widgetData.name,
      JSON.stringify(widgetData.config || {}),
      widgetData.position_x || 0,
      widgetData.position_y || 0,
      widgetData.width || 100,
      widgetData.height || 100,
      widgetData.is_active !== undefined ? widgetData.is_active : 1
    );
    
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM widgets WHERE id = ?');
    const widget = stmt.get(id);
    if (widget && widget.config) {
      widget.config = JSON.parse(widget.config);
    }
    return widget;
  }

  static findBySlide(slideId) {
    const stmt = db.prepare('SELECT * FROM widgets WHERE slide_id = ? ORDER BY created_at ASC');
    const widgets = stmt.all(slideId);
    return widgets.map(widget => {
      if (widget.config) {
        widget.config = JSON.parse(widget.config);
      }
      return widget;
    });
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM widgets ORDER BY created_at DESC');
    const widgets = stmt.all();
    return widgets.map(widget => {
      if (widget.config) {
        widget.config = JSON.parse(widget.config);
      }
      return widget;
    });
  }

  static update(id, widgetData) {
    const stmt = db.prepare(`
      UPDATE widgets 
      SET slide_id = ?, type = ?, name = ?, config = ?, position_x = ?, position_y = ?, width = ?, height = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      widgetData.slide_id,
      widgetData.type,
      widgetData.name,
      JSON.stringify(widgetData.config || {}),
      widgetData.position_x,
      widgetData.position_y,
      widgetData.width,
      widgetData.height,
      widgetData.is_active,
      id
    );
    
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM widgets WHERE id = ?');
    return stmt.run(id);
  }
}

module.exports = Widget;