const database = require('./database')
const Sequelize = require('sequelize')
const UserInviteInfo = require('./UserInviteInfo')

/**
 * 项目用户的基本信息
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const UserInfo = database.define('UserInfo', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  projectCode: { type: Sequelize.STRING(64), field: 'project_code', allowNull: false },
  userCode: { type: Sequelize.STRING(64), field: 'user_code', allowNull: false },
  name: { type: Sequelize.STRING(255), field: 'name', allowNull: false },
  phoneNumber: { type: Sequelize.STRING(32), field: 'phone_number', allowNull: false },
  avatar: { type: Sequelize.STRING(255), field: 'avatar', allowNull: true },
  isSeedUser: { type: Sequelize.BOOLEAN, field: 'is_seed_user', allowNull: false, defaultValue: 0 },
  status: { type: Sequelize.STRING(32), field: 'status', allowNull: false },
  infoFrom: { type: Sequelize.STRING(32), field: 'info_from', allowNull: true }
}, {
  // 表注释信息
  comment: '项目用户信息表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_user_info',
  // 乐观锁字段名
  version: 'version',
  // 是否自动使用createAt/updateAt/deleteAt时间戳
  timestamps: true,
  // 创建时间字段
  createdAt: 'created_at',
  // 更新时间字段
  updatedAt: 'updated_at',
  // 是否使用标记删除
  paranoid: true,
  // 删除时间
  deletedAt: 'deleted_at',
  // 唯一约束
  indexes: [{
    name: 'bc_user_info_project_code_user_code',
    unique: true,
    fields: ['projectCode', 'userCode']
  },{
    name: 'bc_user_info_project_code_phone_number',
    unique: true,
    fields: ['projectCode', 'phoneNumber']
  }]
});

UserInfo.hasOne(UserInviteInfo, { as: 'userInviteInfo', foreignKey: 'userCode', sourceKey: 'userCode'})

module.exports = UserInfo