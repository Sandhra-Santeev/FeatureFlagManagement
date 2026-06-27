const express = require('express')
const userController = require('./controllers/userController')
const organizationController = require('./controllers/organizationController')
const featureController = require('./controllers/featureController')
const createUserController = require('./controllers/createUserController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const router = new express.Router()
// admin register
router.post('/register',userController.register)
// login
router.post('/login',userController.login)
// create organization
router.post('/add-organization',jwtMiddleware,roleMiddleware("super_admin"),organizationController.addOrganizations)
//get all organizations
router.get('/organizations',organizationController.getOrganizations)
//create feature
router.post('/add-feature',jwtMiddleware,roleMiddleware("admin"),featureController.addFeature)
//create user
router.post('/add-user',jwtMiddleware,roleMiddleware("admin"),createUserController.addUser)
//get features
router.get('/features',jwtMiddleware,roleMiddleware("admin"),featureController.getFeatures)
//toggle feature
router.post('/features/:id/toggle',jwtMiddleware,roleMiddleware("admin"),featureController.toggleFeature)
//delete feature
router.delete('/features/:id/delete',jwtMiddleware,roleMiddleware("admin"),featureController.deleteFeature)
//edit feature
router.put('/features/:id/edit',jwtMiddleware,roleMiddleware("admin"),featureController.updateFeature)
//evaluate feature
router.get('/feature-flags/evaluate/:key',jwtMiddleware,featureController.evaluateFeature)
//get feature by id
router.get('/features/:id',jwtMiddleware,roleMiddleware("admin"),featureController.getFeatureById)

module.exports = router