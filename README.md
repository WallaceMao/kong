# 空投

# 初始化

```
insert into bc_project(created_at, project_code, project_name, project_note, telegram_join_link, default_reward_value, default_reward_value_unit) values(now(), 'abcdefg', '示例项目', null, 'https://aaa.bbb.com', '20', 'bt');
insert into bc_project_admin(created_at, project_code, username, password) values(now(), 'abcdefg', 'admin', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413')
```