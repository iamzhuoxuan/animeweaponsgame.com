## 2025-11-29
1. **【P0】品牌重定位：全站改为 Anime Weapons，更新首页 Hero/Intro/Features/FAQ/Community/Reviews/HowToPlay/PopularDrops 文案与 CTA 指向新 Roblox 链接**
2. **【P0】代码数据源：`data/codes.ts` 替换为最新 Anime Weapons 活跃/过期兑换码列表，同步展示到首页与 /codes 页面**
3. **【P0】SEO 关键词与元信息：更新 app/layout.tsx 站点 meta、/codes、/wiki、/games 页面标题与描述，主关键词聚焦 “Anime Weapons”“Anime Weapons codes”**
4. **【P0】GA/GSC 配置：全局 Layout 替换 GA Measurement ID 为 `G-1LGY9BYR0X`，保留 GSC 验证文件 `public/googlede440813da04503a.html`**
5. **【P0】构建与部署验证：npm install 后运行 `npm run lint`、`npm run build` 均通过，推送提交 `V1.0 快速替换上线` 与 `v1.1 ga 和 gsc 配置` 至 main**
6. 【P1】站点可爬配置：robots.txt、sitemap.xml、site.webmanifest 替换域名为 animeweapons.org 并更新 lastmod；保留机器人允许全站抓取
7. 【P1】资产与图标：替换 favicon/logo/manifest 图标为新 Roblox 缩略图，新增 gameplay 截图 `public/anime-weapons-gameplay.png` 与 icon 资源
8. 【P1】内容导航：Footer、Community、WikiGrid 等导航链接指向新的代码页、掉落指南与 Roblox 页面，移除旧品牌引用
9. 【P1】Sanity 占位：新增 sanity 配置与 studio 路由，live fetch 改为本地 stub 以避免缺失包编译错误
10. 【P2】内部文档：更新 README、PRD/SEO/指南类 self_doc 文档到新品牌，保留操作指引与 lighthouse 文档
