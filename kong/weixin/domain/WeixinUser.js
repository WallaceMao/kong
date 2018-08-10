const database = require('@base/domain/database')
const Sequelize = require('sequelize')

/**
 * 项目
 * @type {void|Model|*|{charset, dialectOptions}|{}}
 */
const WeixinUser = database.define('WeixinUser', {
  id: { type: Sequelize.BIGINT(20), field: 'id', allowNull: false, autoIncrement: true, primaryKey: true },
  version: { type: Sequelize.BIGINT(20), field: 'version', allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, field: 'created_at', allowNull: true },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at', allowNull: true },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
  appId: { type: Sequelize.STRING(64), field: 'app_id', allowNull: false },
  openId: { type: Sequelize.STRING(128), field: 'open_id', allowNull: false, unique: 'bc_weixin_user_open_id' },
  nickname: { type: Sequelize.STRING(64), field: 'nickname', allowNull: true },
  sex: { type: Sequelize.STRING(64), field: 'sex', allowNull: true },
  province: { type: Sequelize.STRING(64), field: 'province', allowNull: true },
  city: { type: Sequelize.STRING(64), field: 'city', allowNull: true },
  country: { type: Sequelize.STRING(64), field: 'country', allowNull: true },
  headImgUrl: { type: Sequelize.STRING(255), field: 'head_img_url', allowNull: true },
  privilege: { type: Sequelize.STRING(255), field: 'privilege', allowNull: true },
  unionId: { type: Sequelize.STRING(128), field: 'union_id', allowNull: true }
}, {
  // 表注释信息
  comment: '微信用户表',
  // 锁定表名，禁止查询时使用复数形式
  freezeTableName: true,
  // 在自动生成的数据库表结构的时候将驼峰命名法改成下划线命名
  underscored: true,
  // 表名
  tableName: 'bc_weixin_user',
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

module.exports = WeixinUser