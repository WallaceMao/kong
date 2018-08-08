const database = require('./database')
const Sequelize = require('sequelize')

/**
 * 项目用户的资金账户信息
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const UserAccountInfo = database.define('UserAccountInfo', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  projectCode: { type: Sequelize.STRING(64), field: 'project_code', allowNull: false, unique: 'bc_user_account_info_user_code' },
  userCode: { type: Sequelize.STRING(64), field: 'user_code', allowNull: false, unique: 'bc_user_account_info_user_code' },
  walletAddress: { type: Sequelize.STRING(255), field: 'wallet_address', allowNull: false },
  balanceValue: { type: Sequelize.DECIMAL(10, 2), field: 'balance_value', allowNull: false, defaultValue: 0 },
  balanceValueUnit: { type: Sequelize.STRING(24), field: 'balance_value_unit', allowNull: false },
  inviteRewardLimit: { type: Sequelize.BIGINT(10), field: 'invite_reward_limit', allowNull: false, defaultValue: -1 },
  inviteRewardClaimed: { type: Sequelize.BIGINT(10), field: 'invite_reward_claimed', allowNull: false, defaultValue: 0 },
  accountStatus: { type: Sequelize.STRING(32), field: 'account_status', allowNull: false }
}, {
  // 表注释信息
  comment: '项目用户账单信息表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_user_account_info',
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

module.exports = UserAccountInfo