
import Sequelize from 'sequelize'
import sequelize from '../config/database.js'

const { DataTypes } = Sequelize

const vendas = sequelize.define('Vendas',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produto_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_venda:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'vendas'
})

export default vendas
