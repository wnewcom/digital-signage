const db = require('../database');

class Slideshow {
  static create(slideshowData) {
    const stmt = db.prepare(`
      INSERT INTO slideshows (name, description, is_active)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(
      slideshowData.name,
      slideshowData.description || null,
      slideshowData.is_active !== undefined ? slideshowData.is_active : 1
    );
    
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM slideshows WHERE id = ?');
    return stmt.get(id);
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM slideshows ORDER BY created_at DESC');
    return stmt.all();
  }

  static findActive() {
    const stmt = db.prepare('SELECT * FROM slideshows WHERE is_active = 1 ORDER BY created_at DESC');
    return stmt.all();
  }

  static update(id, slideshowData) {
    const stmt = db.prepare(`
      UPDATE slideshows 
      SET name = ?, description = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      slideshowData.name,
      slideshowData.description,
      slideshowData.is_active,
      id
    );
    
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM slideshows WHERE id = ?');
    return stmt.run(id);
  }
}

module.exports = Slideshow;