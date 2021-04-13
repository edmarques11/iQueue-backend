const { Model, DataTypes } = require('sequelize')

class Companies extends Model {
  static init (sequelize) {
    super.init({
      cnpj: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Companies',
      tableName: 'companies'
    })
  }
}

module.exports = { Companies }
