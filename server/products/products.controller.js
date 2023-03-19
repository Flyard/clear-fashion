const router = require("express").Router();
const productsService = require('./products.service')

router.get('/', async(req, res) => {
    return res.status(200).send(await productsService.findAll());
})
router.get('/search', async(req, res) => {
    const limit = req.query.limit;
    const brand = req.query.brand;
    const price = req.query.price;
    return res.status(200).send(await productsService.findAllLimit(limit, brand, price));
})
router.get('/:id', async(req, res) => {
    return res.status(200).send(await productsService.findId(req.params.id));
})



module.exports = router;