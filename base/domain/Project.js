const database = require('./database')
const Sequelize = require('sequelize')

/**
 * 项目
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const Project = database.define('Project', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  projectCode: { type: Sequelize.STRING(64), field: 'project_code', allowNull: false, unique: 'bc_project_code' },
  projectName: { type: Sequelize.STRING(255), field: 'project_name', allowNull: false },
  projectLogoUrl: { type: Sequelize.STRING(255), field: 'project_logo_url', allowNull: true },
  projectNote: { type: Sequelize.STRING(4096), field: 'project_note', allowNull: true },
  telegramJoinLink: { type: Sequelize.STRING(255), field: 'telegram_join_link', allowNull: true },
  rewardRule: { type: Sequelize.STRING(128), field: 'reward_rule', allowNull: true },
  defaultUnit: { type: Sequelize.STRING(24), field: 'default_unit', allowNull: false },
  status: { type: Sequelize.STRING(32), field: 'status', allowNull: false },
  platformLink: { type: Sequelize.STRING(255), field: 'platform_link', allowNull: true },
  frontendRootUrl: { type: Sequelize.STRING(255), field: 'frontend_root_url', allowNull: false }
}, {
  // 表注释信息
  comment: '项目表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_project',
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

module.exports = Project