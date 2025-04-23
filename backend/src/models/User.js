import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // <- Chemin mis à jour

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 50],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100],
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

export default User;
