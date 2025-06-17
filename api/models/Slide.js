const db = require('../database');

class Slide {
  static create(slideData) {
    const stmt = db.prepare(`
      INSERT INTO slides (slideshow_id, name, content, duration, order_index, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      slideData.slideshow_id,
      slideData.name,
      slideData.content || null,
      slideData.duration || 5000,
      slideData.order_index || 0,
      slideData.is_active !== undefined ? slideData.is_active : 1
    );
    
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM slides WHERE id = ?');
    return stmt.get(id);
  }

  static findBySlideshow(slideshowId) {
    const stmt = db.prepare('SELECT * FROM slides WHERE slideshow_id = ? ORDER BY order_index ASC');
    return stmt.all(slideshowId);
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM slides ORDER BY created_at DESC');
    return stmt.all();
  }

  static update(id, slideData) {
    const stmt = db.prepare(`
      UPDATE slides 
      SET slideshow_id = ?, name = ?, content = ?, duration = ?, order_index = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      slideData.slideshow_id,
      slideData.name,
      slideData.content,
      slideData.duration,
      slideData.order_index,
      slideData.is_active,
      id
    );
    
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM slides WHERE id = ?');
    return stmt.run(id);
  }
}

module.exports = Slide;