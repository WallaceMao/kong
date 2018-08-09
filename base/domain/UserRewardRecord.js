const database = require('./database')
const Sequelize = require('sequelize')
const UserInfo = require('./UserInfo')

/**
 * 项目用户的邀请奖励信息
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const UserRewardRecord = database.define('UserRewardRecord', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  projectCode: { type: Sequelize.STRING(64), field: 'project_code', allowNull: false },
  rewardUserCode: { type: Sequelize.STRING(64), field: 'reward_user_code', allowNull: false },
  rewardValue: { type: Sequelize.DECIMAL(10, 2), field: 'reward_value', allowNull: false },
  rewardValueUnit: { type: Sequelize.STRING(24), field: 'reward_value_unit', allowNull: false },
  relatedUserCode: { type: Sequelize.STRING(64), field: 'related_user_code', allowNull: false },
  rewardType: { type: Sequelize.STRING(32), field: 'reward_type', allowNull: false },
}, {
  // 表注释信息
  comment: '项目用户账单详细信息表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_user_reward_record',
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

UserRewardRecord.belongsTo(UserInfo, {foreignKey: 'rewardUserCode', targetKey: 'userCode', as: 'rewardUser'})
UserRewardRecord.belongsTo(UserInfo, {foreignKey: 'relatedUserCode', targetKey: 'userCode', as: 'relatedUser'})

module.exports = UserRewardRecord