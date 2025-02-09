import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../../../shared/database';

// Define Movie class with strict typing
class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare id: CreationOptional<number>; // Auto-increment field
  declare year: number;
  declare title: string;
  declare studios: string;
  declare producers: string;
  declare won: boolean;
}

// Initialize Model
Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    won: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: false,
  }
);

export default Movie;
