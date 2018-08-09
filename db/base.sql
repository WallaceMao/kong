CREATE TABLE `bc_project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `project_name` varchar(255) NOT NULL COMMENT '项目名称',
  `project_note` varchar(512) NULL COMMENT '项目描述',
  `telegram_join_link` varchar(255) NULL COMMENT '电报群的邀请链接',
  `reward_rule` varchar(128) NULL COMMENT '奖励规则名称',
  `default_unit` varchar(24) NOT NULL COMMENT '默认的计量单位的名称',
  `status` varchar(32) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_project_code`(`project_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目信息表';

CREATE TABLE `bc_project_admin`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `username` varchar(64) NOT NULL COMMENT '用户登录名',
  `password` varchar(128) NOT NULL COMMENT '用户密码',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_project_admin_username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目管理员表';

CREATE TABLE `bc_project_reward_config`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `config_key` varchar(128) NOT NULL COMMENT '配置的key值',
  `config_value` varchar(128) NOT NULL COMMENT '配置的value值，String类型',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_project_reward_config_config_key`(`project_code`, `config_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目奖励配置参数表';

CREATE TABLE `bc_user_info`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `user_code` varchar(64) NOT NULL COMMENT '用户代码',
  `name` varchar(255) NOT NULL COMMENT '用户姓名',
  `phone_number` varchar(32) NOT NULL COMMENT '手机号',
  `avatar` varchar(255) NULL COMMENT '头像链接',
  `is_seed_user` bit(1) NOT NULL DEFAULT 0 COMMENT '是否为种子账号，种子账号没有上级',
  `status` varchar(32) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_user_info_project_code_user_code`(`project_code`, `user_code`) USING BTREE,
  UNIQUE INDEX `bc_user_info_project_code_phone_number`(`project_code`, `phone_number`) USING BTREE,
  INDEX `bc_user_name`(`name`) USING BTREE,
  INDEX `bc_user_phone_number`(`phone_number`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户信息表';

CREATE TABLE `bc_user_invite_info`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `user_code` varchar(64) NOT NULL COMMENT '用户代码',
  `invite_code` varchar(64) NOT NULL COMMENT '邀请使用的验证码，inviteCode在所有项目中也是唯一的',
  `invite_status` varchar(32) NOT NULL COMMENT '邀请状态',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_user_invite_info_user_code`(`project_code`, `user_code`) USING BTREE,
  UNIQUE INDEX `bc_user_invite_info_invite_code`(`invite_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户邀请信息表';

CREATE TABLE `bc_user_invite_code_send_record`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `invite_code` varchar(64) NOT NULL COMMENT '邀请使用的验证码',
  `invite_code_send_msg` varchar(768) NOT NULL COMMENT '发送邀请码时的信息',
  `invite_code_send_source` varchar(32) NOT NULL COMMENT '发送邀请信息的来源，例如telegram',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_user_invite_send_record_invite_code`(`invite_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户邀请码发送的记录表';

CREATE TABLE `bc_user_relation`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `up_user_code` varchar(64) NOT NULL COMMENT '上级项目用户代码',
  `down_user_code` varchar(64) NOT NULL COMMENT '下级项目用户代码',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_user_relation_combine_code`(`down_user_code`) USING BTREE,
  INDEX `bc_user_relation_down_user_code`(`down_user_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户关系信息表';

CREATE TABLE `bc_user_account_info`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `user_code` varchar(64) NOT NULL COMMENT '用户代码',
  `balance_value` decimal(10, 2) NOT NULL DEFAULT 0 COMMENT '主账户余额',
  `balance_value_unit` varchar(24) NOT NULL COMMENT '主账户余额计量单位',
  `invite_reward_limit` bigint(10) NOT NULL DEFAULT -1 COMMENT '邀请红包的数量',
  `invite_reward_claimed` bigint(10) NOT NULL DEFAULT 0 COMMENT '已被领取的邀请红包的数量',
  `account_status` varchar(32) NOT NULL COMMENT '状态',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `bc_user_account_info_user_code`(`project_code`, `user_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户账单信息表';

CREATE TABLE `bc_user_reward_record`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `version` bigint(20) NOT NULL DEFAULT 0 COMMENT '乐观锁',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` datetime NULL COMMENT '更新时间',
  `deleted_at` datetime NULL COMMENT '删除时间',
  `project_code` varchar(64) NOT NULL COMMENT '项目代码',
  `reward_user_code` varchar(64) NOT NULL COMMENT '获得奖励的用户代码',
  `reward_value` decimal(10, 2) NOT NULL DEFAULT 0 COMMENT '获得的奖励金额',
  `reward_value_unit` varchar(24) NOT NULL COMMENT '获得的奖励金额的计量单位',
  `related_user_code` varchar(64) NOT NULL COMMENT '奖励相关的用户代码',
  `reward_type` varchar(32) NOT NULL COMMENT '奖励的类型',
  PRIMARY KEY (`id`),
  INDEX `bc_user_reward_record_reward_user_code`(`reward_user_code`) USING BTREE,
  INDEX `bc_user_reward_record_related_user_code`(`related_user_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='项目用户账单详细信息表';

# 新增钱包地址
ALTER TABLE `bc_user_account_info`
ADD COLUMN `wallet_address` varchar(255) NULL COMMENT '比特币钱包地址' AFTER `user_code`;

# 新增项目的logo地址字段
ALTER TABLE `kong`.`bc_project`
ADD COLUMN `project_logo_url` varchar(255) NULL COMMENT '项目logo的地址' AFTER `project_name`;

# 修改项目的project_
ALTER TABLE `kong`.`bc_project`
MODIFY COLUMN `project_note` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目描述';

ALTER TABLE `kong`.`bc_project`
ADD COLUMN `platform_link` varchar(255) NULL COMMENT '平台客服的电报群';