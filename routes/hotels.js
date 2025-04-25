const express = require("express");
const router = express.Router();
const {
    getHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel,
} = require("../controllers/hotel.js");
const { protect, authorize } = require("../middleware/auth.js");
const bookingRouter = require("./bookings");

router.use("/:hotelId/bookings/", bookingRouter);
router
    .route("/")
    .get(getHotels)
    .post(protect, authorize("admin"), createHotel);

router
    .route("/:id")
    .get(getHotel)
    .put(protect, authorize("admin"), updateHotel)
    .delete(protect, authorize("admin"), deleteHotel);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: The hotels managing API
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Returns the list of all the hotels
 *     tags:
 *       - Hotels
 *     responses:
 *       200:
 *         description: The list of the hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Get the hotel by ID
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel ID
 *     responses:
 *       200:
 *         description: The hotel description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: The hotel was not found
 */
/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags:
 *       - Hotels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       201:
 *         description: The hotel was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /hotels/{id}:
 *   put:
 *     summary: Update the hotel by ID
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: The hotel was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: The hotel was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /hotels/{id}:
 *   delete:
 *     summary: Remove the hotel by ID
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel ID
 *     responses:
 *       200:
 *         description: The hotel was deleted
 *       404:
 *         description: The hotel was not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the hotel
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         ลําดับ:
 *           type: string
 *           description: Ordinal number
 *         name:
 *           type: string
 *           description: Hotel name
 *         address:
 *           type: string
 *           description: House No., Street, Road
 *         district:
 *           type: string
 *           description: District
 *         province:
 *           type: string
 *           description: Province
 *         postalcode:
 *           type: string
 *           description: 5-digit postal code
 *         tel:
 *           type: string
 *           description: Telephone number
 *         region:
 *           type: string
 *           description: Region
 *       example:
 *         id: 609bda561452242d88d36e37
 *         ลําดับ: 1
 *         name: Happy Hotel
 *         address: 121 ถ.สุขุมวิท
 *         district: บางนา
 *         province: กรุงเทพมหานคร
 *         postalcode: 10110
 *         tel: 02-2187000
 *         region: กรุงเทพมหานคร (Bangkok)
 */

