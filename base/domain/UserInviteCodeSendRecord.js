const database = require('./database')
const Sequelize = require('sequelize')

/**
 * 项目用户邀请码发送的记录表
 * 当用户在群里（例如telegram群）发送邀请码以做验证时，会在该表记录用户邀请码发送的情况
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const UserInviteCodeSendRecord = database.define('UserInviteCodeSendRecord', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  inviteCode: { type: Sequelize.STRING(64), field: 'invite_code', allowNull: false, unique: 'bc_user_invite_send_record_invite_code' },
  inviteCodeSendMsg: { type: Sequelize.STRING(768), field: 'invite_code_send_msg', allowNull: false },
  inviteCodeSendSource: { type: Sequelize.STRING(32), field: 'invite_code_send_source', allowNull: false }
}, {
  // 表注释信息
  comment: '项目用户邀请码发送的记录表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_user_invite_code_send_record',
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

module.exports = UserInviteCodeSendRecord