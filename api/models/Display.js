const db = require('../database');

class Display {
  static create(displayData) {
    const stmt = db.prepare(`
      INSERT INTO displays (name, description, location, is_active)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      displayData.name,
      displayData.description || null,
      displayData.location || null,
      displayData.is_active !== undefined ? displayData.is_active : 1
    );
    
    return this.findById(result.lastInsertRowid);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM displays WHERE id = ?');
    return stmt.get(id);
  }

  static findAll() {
    const stmt = db.prepare('SELECT * FROM displays ORDER BY created_at DESC');
    return stmt.all();
  }

  static findActive() {
    const stmt = db.prepare('SELECT * FROM displays WHERE is_active = 1 ORDER BY created_at DESC');
    return stmt.all();
  }

  static update(id, displayData) {
    const stmt = db.prepare(`
      UPDATE displays 
      SET name = ?, description = ?, location = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(
      displayData.name,
      displayData.description,
      displayData.location,
      displayData.is_active,
      id
    );
    
    return this.findById(id);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM displays WHERE id = ?');
    return stmt.run(id);
  }
}

module.exports = Display;