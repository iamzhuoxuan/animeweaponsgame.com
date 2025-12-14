~ 使用 codex 创建

## 2025-11-28
1. **【P0】codes 数据源清理：仅保留新的有效 code “Kat”，移除全部过期条目，Rewards 更新为播放短猫咪动图**
2. 【P0】首页 Active Codes 区域同步展示“Kat”有效信息，过期列表入口隐藏（首页 Active Codes 模块）
3. 【P1】/codes 页面 Active Codes 列表只保留“Kat”，无过期列表时折叠入口不再出现（/codes 页面 Active/Expired 区块）
4. 【P2】部署前检查记录：规划运行 lint/build 以验证 Vercel 部署前状态（开发流程）
5. 【P1】恢复过期 codes 数据以便展示历史条目，Active 保持仅 “Kat”（codes 数据源）

## 2025-11-26

1. **【P0】主页多板块重构：Hero、GameIntro、PopularUnits、Community、FAQ、PlayerReviews、HowToPlay、WikiGrid 在首页完成布局与样式更新**
2. 【P0】构建保障：修复 ESLint 报错并清理构建缓存，确保打包通过（全局样式与布局文件）
3. 【P1】交互细节：首页引入自定义光标与光晕效果（全局样式、交互组件）【后删除】
4. 【P1】角色卡片补图：PopularUnits 接入角色素材，卡片改为展示角色图片【未成功】
5. 【P1】媒体素材补充：新增 bgm 音频与 game clip / key art 图片用于展示【后删除】
6. 【P1】导航与底部微调：主页头部与页脚文案、样式更新，参考进行详细的 wiki 罗列
7. 【P2】基于规则文件进行部署前 SEO 检查：更新 robots.txt、site.webmanifest、sitemap.xml

## 2025-11-25
1. **【P0】V0.9 发布：新增 /games iframe 页面、/wiki 页面骨架、/codes 页面重制并接入导航**
2. **【P0】主页与布局升级：Header、Hero、Features、SimilarGames 调整视觉与栈，首页整体更新**
3. 【P0】部署修复：codes 页面与 Features 细节调整以通过发布
4. 【P1】数据与素材补充：新增游戏数据源（相似游戏，嵌入iframe）、添加 anime-weapons-gameplay 展示图
5. 【P1】站点生成：新增 robots.ts、sitemap.ts 并同步公开 robots.txt
6. 【P2】文档沉淀：**补充 lighthouse 指南**、features/home PRD、work log 等文档

## 2025-11-24
1. **【P0】仓库初始化与 MVP：上线 /codes 页面基础功能与展示**
2. **【P0】全局框架搭建：主页框架与主题样式（布局、全局样式、Tailwind 配置）**
3. **【P1】基础组件集：主页导航、英雄区、特性卡片、页脚、代码预览组件等初版**
4. **【P1】SEO 与站点配置：robots.txt、sitemap.xml、site.webmanifest、Next/Vercel 配置**
5. 【P1】站点资产：favicon、logo 等品牌图标导入
6. **【P2】支持文档：SEO 指南、PRD、robots/sitemap 规则、logo 与 favicon 指引**
7. **【P1】同日部署与分析：配置 Vercel 部署、调整首页文案与导航、集成 GA 追踪、添加 GSC 验证文件**
