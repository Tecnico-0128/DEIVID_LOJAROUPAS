
import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const { DataTypes } = Sequelize

const produtos = sequelize.define('Produtos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    produto:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'produtos'
})

export default produtos
