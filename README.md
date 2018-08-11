# 空投

# 初始化

```
insert into bc_project(created_at, project_code, project_name, project_note, telegram_join_link, reward_rule, default_unit, status, frontend_root_url) values(now(), 'abcdefg', '示例项目', null, 'https://aaa.bbb.com', 'defaultRewardRule', 'XTX', 'open', 'https://www.qq.com');
insert into bc_project_admin(created_at, project_code, username, password) values(now(), 'abcdefg', 'admin', '15efa3d8d2845c411f29e40ff2e8d07c8acc7af674eaa213760c2832e2b10f9a4e64817fe505da44872956de25f7ea9fabe7c78375756d5bfdec1f4bd0c35c19');
insert into bc_project_reward_config(created_at, project_code, config_key, config_value) values(now(), 'abcdefg', 'registerRewardValue', '100');
insert into bc_project_reward_config(created_at, project_code, config_key, config_value) values(now(), 'abcdefg', 'registerRewardUnit', 'XTX');
insert into bc_project_reward_config(created_at, project_code, config_key, config_value) values(now(), 'abcdefg', 'inviteRewardValue', '20');
insert into bc_project_reward_config(created_at, project_code, config_key, config_value) values(now(), 'abcdefg', 'inviteRewardUnit', 'XTX');
insert into bc_project_reward_config(created_at, project_code, config_key, config_value) values(now(), 'abcdefg', 'inviteRewardLimit', '5');
```

微信支持
```
insert into bc_weixin_app(created_at, app_id, app_secret, app_name, token, aes_key) values(now(), 'APP_ID', 'APP_SECRET', 'APP_NAME', null, null);
insert into bc_project_weixin_app_link(created_at, project_code, app_id, is_active) values(now(), 'abcdefg', 'APP_ID', 1);
```