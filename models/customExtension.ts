import { Model, DataTypes, Sequelize } from 'sequelize';

export default class customExtension extends Model {
  public id!: number;
  public ext_name: string;

  public static initModel(sequelize: Sequelize) {
    return customExtension.init(
      {
        ext_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        paranoid: false,
        modelName: 'CustomExtension',
        tableName: 'customExtension',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }

  public static associate(db: any) {}
}
