const pool = require('../database-connection');

class MachineController {
  async createMachine(req, res) {
    try {
      const { machine_size, drink_capacity } = req.body;

      const select = await pool.query(
        'SELECT id, amount FROM CoffeeMachine WHERE machine_size = $1 AND drink_capacity = $2',
        [machine_size, drink_capacity]
      );
      
      let response;
      if(select.rows.length) {
        const { id } = select.rows[0];

        response = await  pool.query(
          'UPDATE CoffeeMachine SET amount = amount + 1 WHERE id = $1 RETURNING *',
          [id]
        );
      } else {
        response = await  pool.query(
          'INSERT INTO CoffeeMachine (machine_size, drink_capacity, amount) VALUES ($1, $2, $3) RETURNING *',
          [machine_size, drink_capacity, 1]
        );
      }

      res.json(response.rows[0]);
    } catch(error) {
      res.status(500).send({
        message: 'Cannot insert or update row'
     });
    }
  }

  async getMachines(_, res) {
    try {
      const selectResp = await pool.query('SELECT * FROM CoffeeMachine ORDER BY id');

      res.json(selectResp.rows);
    } catch(error) {
      res.status(500).send({
        message: 'Database error'
     });
    }
  }

  async updateMachine(req, res) {
    try {
      const id = req.params.id;
      const { amount } = req.body;
      const updateResp = await pool.query(
        'UPDATE CoffeeMachine SET amount = $2 WHERE id = $1 RETURNING *',
        [id, amount]
      );

      res.json(updateResp.rows);
    } catch(error) {
      res.status(500).send({
        message: `Cannot update row with id = ${req.body.id}`
     });
    }
  }

  async deleteMachine(req, res) {
    try {
      const id = req.params.id;
      const deleteResp = await pool.query('DELETE FROM CoffeeMachine WHERE id = $1', [id]);

      res.json(deleteResp.rows);
    } catch(error) {
      res.status(500).send({
        message: `Cannot delete row with id = ${req.body.id}`
     });
    }
  }
}

module.exports = new MachineController()