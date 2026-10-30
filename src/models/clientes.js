
import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const { DataTypes } = Sequelize

const clientes = sequelize.define('Clientes',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'clientes'
})

export default clientes
