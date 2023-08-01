'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stage_events.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      
        stage_events_id: DataTypes.INTEGER,
        stage_id: DataTypes.INTEGER
          
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      genre: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      available_start_time: {
          type: DataTypes.DATE,
          allowNull: false
      },
      end_time: {
          type: DataTypes.DATE,
          allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Stage_events',
  });
  return Stage_events;
};