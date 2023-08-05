const stage = require('express').Router();
const db = require('../models');
const { Stage, Band, Meet_Greet, Event, SetTime } = db;
const { Op } = require('sequelize');

//* GET ALL STAGES
stage.get('/', async (req, res) => {
	try {
		const foundStage = await Stage.findAll({
			order: [['available_start_time', 'ASC']],
			where: {
				name: {
					[Op.like]: `%${req.query.name ? req.query.name : ''}%`,
				},
			},
		});
		res.status(200).json(foundStage);
	} catch (e) {
		res.status(500).json(e);
	}
});

//* GET ONE STAGE
stage.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { name: req.params.name },
            include: [{
                model: Event,
                as: 'event',  
                where: {
                    name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` 
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
        res.status(200).json(foundStage)
    } catch(e) {
        res.status(500).json(e)
    }
})

//* CREATE STAGE
Stage.post('/', async (req, res) => {
	try {
		const newStage = await Stage.create(req.body);
		res.status(200).json(newStage);
	} catch (e) {
		res.status(500).json(e);
	}
});

//* UPDATE STAGE
stage.put('/:id', async (req, res) => {
	try {
		const updatedStage = await Stage.update(req.body, {
			where: { band_id: req.params.id },
		});
		res.status(200).json({
			message: `Updated ${updatedStage} stage`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

//* DELETE STAGE
stage.delete('/:id', async (req, res) => {
	try {
		const deletedStage = await Stage.destroy({
			where: { stage_id: req.params.id },
		});
		res.status(200).json({
			message: `Deleted ${deletedStage} stage`,
		});
	} catch (e) {
		res.status(500).json(e);
	}
});


module.exports = stage;

