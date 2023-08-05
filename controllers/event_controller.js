const event = require('express').Router();
const db = require('../models');
const { Event, Band, MeetGreet, SetTime } = db;
const { Op } = require('sequelize');

//* GET ALL EVENTS
event.get('/', async (req, res) => {
	try {
		const foundEvent = await Event.findAll({
			order: [['available_start_time', 'ASC']],
			where: {
				name: {
					[Op.like]: `%${req.query.name ? req.query.name : ''}%`,
				},
			},
		});
		res.status(200).json(foundEvent);
	} catch (e) {
		res.status(500).json(e);
	}
});

//* GET ONE EVENT
event.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [{
                model: Meet_Greet,
                as: 'meet_greets',
                include: {
                    model: Event,
                    as: 'event',
                    where: {
                        name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` 
                        }
                    }
                }
            },
            {
                model: Set_Time,
                as: 'set_times',
                include: {
                    model: Event,
                    as: 'event',
                    where: {
                        name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` 
                        }
                    }
                }
            }
            ]
        })
        res.status(200).json(foundEvent)
    } catch(e) {
        res.status(500).json(e)
    }
})

//* CREATE EVENT
event.post('/', async (req, res) => {
	try {
		const newEvent = await Event.create(req.body);
		res.status(200).json(newEvent);
	} catch (e) {
		res.status(500).json(e);
	}
});

//* UPDATE EVENT
event.put('/:id', async (req, res) => {
	try {
		const updatedEvent = await Event.update(req.body, {
			where: { band_id: req.params.id },
		});
		res.status(200).json({
			message: `Updated ${updatedEvent} event`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

//* DELETE EVENT
event.delete('/:id', async (req, res) => {
	try {
		const deletedEvent = await Event.destroy({
			where: { band_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedEvent} event`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});


module.exports = event;

