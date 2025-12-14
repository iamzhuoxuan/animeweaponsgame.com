# Anime Weapons 攻略站 PRD（当前实现版）

> 面向 `animeweapons.org` 前端仓库，描述已交付能力与后续计划。

- 版本：v1.0（2025-11-28）
- 仓库：/Users/zero/Documents/websites/animeweapons.org
- 产品负责人：zero（开发支持：AI/Codex）
- 技术栈：Next.js 14 App Router、TypeScript、Tailwind CSS、next-sanity（/studio）、GTAG(G-65KM1T79ZB)

---

## 1. 背景与目标
- 为 Roblox 游戏 **Anime Weapons** 提供“兑换码 + 攻略 + 轻社区”一站式站点。
- 主要业务目标：提升“Anime Weapons codes / wiki / tier list”关键词 SEO，自然流量转化到 Roblox 游戏启动；同时打造后续可扩展的攻略数据中心（Sanity）。
- 品牌基调：霓虹科技感、深色背景、紫/粉渐变，与游戏视觉统一。

## 2. 用户与使用场景
- 新玩家：搜索“Anime Weapons codes/how to redeem”，需要快速复制兑换码与查看兑换步骤。
- 回流/硬核玩家：关注新版本、强度榜与角色信息，想要一站式浏览攻略/Wiki。
- 观望用户：希望在等待更新时有替代玩法（Games 页内置 Web 端策略小游戏）。

## 3. 成功衡量（建议）
- SEO：codes 页 Google impressions & CTR，首页平均排名，收录的 sitemap URL 数。
- 转化：`Copy Code` 点击率/成功率、跳转 Roblox CTA 点击率、平均停留时长。
- 体验：移动端 CLS < 0.1，LCP < 2.5s（静态资源 + 动态 import 基准）。

## 4. 范围与信息架构

| 路径/模块 | 角色 | 目的 | 状态 | 数据源 |
| --- | --- | --- | --- | --- |
| `/` | 落地页 | 游戏介绍 + 兑换码概览 + Wiki/社区入口 | 已上线 | 本地静态数据 + 组件 |
| `/codes` | 兑换码页 | 全量兑换码、复制、兑换教程、FAQ | 已上线 | `data/codes.ts` |
| `/wiki` | Wiki 首页 | 分类导航、搜索占位、更新卡片 | 已上线（内容占位） | 静态配置 |
| `/games` | 游戏聚合 | 3 个浏览器可玩策略小游戏内嵌 | 已上线 | `data/games.ts` |
| `/studio` | CMS | Sanity Studio（需环境变量） | 已上线（需配置项目ID/数据集） | Sanity |
| `/robots.txt` `/sitemap.xml` | SEO | 爬虫规则、站点地图 | 已上线 | 自动生成 |

## 5. 功能需求（结合当前实现）

### 5.1 公共/框架
- FR-COM-1：固定 Header（Logo、导航、Roblox CTA、移动抽屉）可全局使用。（已上线）
- FR-COM-2：Footer 含快速链接、版权与社媒按钮。（已上线）
- FR-COM-3：动态导入部分组件（WikiGrid/FAQ/Community 等）降低首屏体积，配占位骨架。（已上线）
- FR-COM-4：自定义光标（桌面端且无减弱动画偏好时启用），可降级到系统指针。（已上线）
- FR-COM-5：全局深色 UI、紫粉渐变、玻璃态卡片、平滑滚动与焦点样式。（已上线）

### 5.2 首页 `/`
- FR-HOME-1：Hero 含 Roblox CTA、跳转到 Codes 的二级 CTA、游戏统计徽章、YouTube Trailer 嵌入。（已上线）
- FR-HOME-2：Game Intro 区展示游戏卖点、玩法说明与高亮指标。（已上线）
- FR-HOME-3：CodesSection 组件：列出 `active` 代码、一键复制；可展开 `expired` 列表。（数据来自 `data/codes.ts`，已上线）
- FR-HOME-4：WikiGrid 与 HowToPlay：提供分类入口与 4 步新手流程卡片。（已上线）
- FR-HOME-5：PopularUnits/Tier CTA，PlayerReviews（含社区口碑与数值条）、SimilarGames（首个游戏自动播放 iframe + /games 引导）。（已上线）
- FR-HOME-6：Features、FAQ、Community 区，补充玩法卖点、常见问题、社群外链。（已上线）

### 5.3 兑换码页 `/codes`
- FR-CODE-1：展示 Active/Expired 列表，含状态徽章、等级要求、奖励描述。（已上线）
- FR-CODE-2：复制按钮写入剪贴板，状态提示“Copied!”；失败在控制台报错。（已上线）
- FR-CODE-3：按 `new Date()` 渲染“Last Updated”徽章，显式时间戳。（已上线）
- FR-CODE-4：兑换步骤（含截图 `/public/anime-weapons-gameplay.webp`）、FAQ、Tips、回到首页/Roblox CTA。（已上线）
- FR-CODE-5：手动数据来源 `data/codes.ts`；未来需接 CMS 或管理端以保障实时性。（待办）

### 5.4 Wiki 页 `/wiki`
- FR-WIKI-1：分类宫格（Units/Tier List/Mechanics/Resources），包含锚点链接。（已上线）
- FR-WIKI-2：搜索输入框样式占位（当前不触发搜索逻辑）。（占位）
- FR-WIKI-3：更新卡片（示例链接到 /codes），用于展示最新活动或版本。（已上线）
- FR-WIKI-4：缺失的内容层：真实单位列表、TierList 数据、详情页与文章页需通过 CMS 接入。（待办）

### 5.5 游戏页 `/games`
- FR-GAME-1：Tab 切换 3 款策略小游戏（Industry Idle / Yorg.io / Shapez），从 `data/games.ts` 渲染。（已上线）
- FR-GAME-2：iframe 播放/退出控制，切换游戏自动播放；旁侧提供 Tips 与 About。（已上线）
- FR-GAME-3：底部“Why Open Source?” 说明，强化品牌价值与社区属性。（已上线）
- FR-GAME-4：需确认目标游戏的 License/可嵌入性，并定期校验可用性。（运营待办）

### 5.6 内容与 CMS
- FR-CMS-1：`/studio` 基于 next-sanity；需配置 `NEXT_PUBLIC_SANITY_PROJECT_ID`、`NEXT_PUBLIC_SANITY_DATASET`、`NEXT_PUBLIC_SANITY_API_VERSION`。（已上线路由）
- FR-CMS-2：前端当前读取本地静态数组（codes/games/units mock）；尚未打通 GROQ 查询与 SSG/ISR。（待办）
- FR-CMS-3：设计内容模型建议：`redeemCode`（code/status/reward/level/region）、`unit`（stats/rarity/tags）、`tierList`（mode/rank/items）、`article`（body/relatedUnits），支持双向关联。（规划）

### 5.7 SEO、数据与分析
- FR-SEO-1：全局 Metadata（title/description/keywords/canonical）+ 各页自定义 OG/Twitter。（已上线）
- FR-SEO-2：JSON-LD：`WebSite` + `VideoGame` 注入 `<head>`。（已上线）
- FR-SEO-3：`robots.ts` 允许全站抓取、屏蔽 /api /admin；`sitemap.ts` 覆盖 `/` `/codes` `/wiki` `/games`，变更频率/权重已设。（已上线）
- FR-SEO-4：Favicon & PWA manifest、OpenGraph 图片 `/public/android-chrome-512x512.png`。（已上线）
- FR-ANA-1：Google Analytics `G-65KM1T79ZB` 懒加载。（已上线）
- FR-ANA-2：建议新增事件：`copy_code`, `cta_play_roblox`, `toggle_expired_codes`, `/games` iframe play。（待办）

### 5.8 非功能/体验
- 性能：组件分级动态 import，Hero/首屏图片优先加载；需保持 LCP < 2.5s，控制 iframe 懒加载。（当前实现）
- 响应式：Header 移动菜单、卡片栅格在 sm/md/lg 下重排。（当前实现）
- 可访问性：焦点高亮、平滑滚动、`prefers-reduced-motion` 对光标生效；需补充 aria 标签与键盘操作校验。（部分实现）
- 安全：仅前端，无登录；剪贴板调用需 https 或 localhost，嵌入 iframe 需确认 CSP（待补充）。

### 5.9 内容资产与更新流程
- 兑换码更新：编辑 `data/codes.ts`，添加 `status`、`addedDate`、`level`、`category`；更新截图位于 `public/`。
- 游戏列表维护：编辑 `data/games.ts`，确认 `url` 可嵌入、`tips` 文案与颜色渐变。
- 视觉：背景图 `public/hero_key_art.webp`、`game_clip1.webp`，Logo `public/logo.png`。

## 6. 里程碑（建议）
- M0（已交付）：静态内容 + 兑换码页 + Wiki 占位 + Games 嵌入 + SEO/GA。
- M1：Sanity 联通（代码/单位/文章），Codes 页与首页引用 GROQ 数据；补充事件埋点。
- M2：Wiki 搜索与筛选、Tier List/Unit 详情页、文章页；站内锚点/面包屑。
- M3：运营工具：代码失效提醒、定时重建（ISR/再验证）、多语言（可选）。

## 7. 风险与待决
- 代码数据实时性：当前手工维护，需 CMS 或数据抓取策略。
- 版权/可用性：嵌入第三方游戏需确认授权与可用性，避免 404/跨域阻挡。
- 剪贴板：非安全源（http）下复制按钮可能失败，需要提示或降级。
- 内容缺口：Tier List/Unit 数据为空，需产品决策确定最小可行数据结构与来源。

## 8. 技术栈摘要
- 前端：Next.js 14.2.18（App Router, React 18.3.1）、TypeScript 5.6.x。
- UI：Tailwind CSS 3.4、自定义渐变与动画、玻璃态卡片、Intersection Observer + 动态 import。
- CMS：next-sanity 9.x + Sanity 3.x（/studio 路由静态导出）。
- 运维：`npm run dev/build/start/lint`，`vercel.json` 指定 nextjs 框架；robots/sitemap 由 Next MetadataRoute 生成。
