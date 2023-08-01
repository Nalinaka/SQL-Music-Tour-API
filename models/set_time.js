'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Set_time.init({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true

    DataTypes.INTEGER,
    band_id: DataTypes.INTEGER,
    set_time_id: DataTypes.INTEGER,
    stage_id: DataTypes.INTEGER,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE

          
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
    modelName: 'Set_time',
  });
  return Set_time;
};