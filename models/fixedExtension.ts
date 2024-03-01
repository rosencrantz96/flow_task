import { Model, DataTypes, Sequelize } from 'sequelize';

export default class fixedExtension extends Model {
  public id!: number;
  public ext_name: string;
  public is_checked: boolean;

  public static initModel(sequelize: Sequelize) {
    return fixedExtension.init(
      {
        ext_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        is_checked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'FixedExtension',
        tableName: 'fixedExtension',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  public static associate(db: any) {}
}
