const database = require('./database')
const Sequelize = require('sequelize')

/**
 * 项目用户的邀请信息
 * 注意，邀请码inviteCode在所有项目中都是唯一的
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const UserInviteInfo = database.define('UserInviteInfo', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  projectCode: { type: Sequelize.STRING(64), field: 'project_code', allowNull: false, unique: 'bc_user_invite_info_user_code' },
  userCode: { type: Sequelize.STRING(64), field: 'user_code', allowNull: false, unique: 'bc_user_invite_info_user_code' },
  inviteCode: { type: Sequelize.STRING(64), field: 'invite_code', allowNull: false, unique: 'bc_user_invite_info_invite_code' },
  inviteStatus: { type: Sequelize.STRING(32), field: 'invite_status', allowNull: false }
}, {
  // 表注释信息
  comment: '项目用户邀请信息表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_user_invite_info',
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
  deletedAt: 'deleted_at'
});

module.exports = UserInviteInfo