const express = require('express');
const router = express.Router();

router.get('/calisthenics', (req, res) => {
  res.render('index', { page: 'calisthenics' });
});

router
  .route('/add-training')
  .get((req, res) => {
    res.render('index', { page: 'add-training', exerciseCount: 6 });
  })
  .post((req, res) => {
  })
  .delete((req, res) => {
    //TODO:
  });

router.param('id', (req, res, next, id) => {
  next();
});

router
  .route('/:id')
  .get((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  })
  .post((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Get training plan with ID ${req.params.id}`);
  });

router.param('id', (req, res, next, id) => {
  next();
});

module.exports = router;
