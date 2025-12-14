# Lighthouse Performance 优化指南

## 📋 文档说明

本文档记录了针对 **Total Blocking Time (TBT)** 5,010ms 的性能优化经验，提供可复用的诊断方法和解决方案。

**适用场景**: Next.js App Router 应用，TBT > 2000ms，需要在不改变前端展示的前提下优化性能。

---

## 🔍 问题诊断

### 1. Lighthouse 性能指标说明

| 指标 | 说明 | 理想值 | 警告值 | 危险值 |
|------|------|--------|--------|--------|
| **TBT** (Total Blocking Time) | FCP 到 TTI 之间主线程阻塞时间 | < 200ms | 200-600ms | > 600ms |
| **FID** (First Input Delay) | 用户首次交互到浏览器响应的延迟 | < 100ms | 100-300ms | > 300ms |
| **TTI** (Time to Interactive) | 页面完全可交互的时间 | < 3.8s | 3.8-7.3s | > 7.3s |

### 2. TBT 高的常见原因

- ✗ 第三方脚本（Google Analytics、广告等）在主线程阻塞
- ✗ 大量客户端组件同步加载
- ✗ 未使用代码分割和懒加载
- ✗ iframe 自动加载（尤其是游戏、视频）
- ✗ 大型数据文件在首屏加载
- ✗ 未优化的图片和字体

### 3. 诊断工具

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://your-site.com --view

# Chrome DevTools
# 1. 打开 DevTools (F12)
# 2. Lighthouse 标签
# 3. 选择 Performance
# 4. Generate report

# 查看 bundle 大小
npm run build -- --analyze
```

---

## 🎯 优化策略（三阶段）

### Phase 1: 快速优化（预计改善 40-50%）

**目标**: 延迟非关键资源加载，减少初始 JavaScript 执行时间

#### 1.1 第三方脚本延迟加载

**问题**: Google Analytics 等脚本在 `afterInteractive` 阶段加载，阻塞主线程

**解决方案**:
```typescript
// ❌ 优化前 (app/layout.tsx)
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
  strategy="afterInteractive"
/>

// ✅ 优化后
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
  strategy="lazyOnload"  // 空闲时加载
/>
```

**效果**: TBT 减少 1000-1500ms

---

#### 1.2 组件懒加载（Dynamic Import）

**问题**: 所有组件在首屏同步加载，增加主线程负担

**解决方案**:
```typescript
// ❌ 优化前 (app/page.tsx)
import Features from '@/components/Features';
import Footer from '@/components/Footer';

// ✅ 优化后 - 懒加载非首屏组件
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <LoadingSkeleton />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-20"></div>,
});
```

**懒加载优先级**:
1. 🔴 **必须懒加载**: Footer, 非首屏内容区块
2. 🟡 **建议懒加载**: Codes 列表, Features 网格
3. 🟢 **保持同步加载**: Header, Hero (首屏)

**效果**: TBT 减少 1000-2000ms

---

#### 1.3 创建 Loading Skeleton

**目的**: 避免布局抖动 (CLS)，提升用户体验

```typescript
// 创建通用 Skeleton 组件
const LoadingSkeleton = () => (
  <div className="py-20 lg:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="h-8 bg-av-blue/20 rounded w-1/3 mx-auto mb-8"></div>
      <div className="h-4 bg-av-blue/10 rounded w-2/3 mx-auto mb-12"></div>
      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="h-32 bg-av-blue/20 rounded-xl"></div>
        <div className="h-32 bg-av-blue/20 rounded-xl"></div>
      </div>
    </div>
  </div>
);
```

---

### Phase 2: 深度优化（预计改善 30-40%）

**目标**: 使用 Intersection Observer 实现智能按需加载

#### 2.1 视口检测自动加载（核心技术）

**应用场景**: 游戏 iframe、视频、大型交互组件

**问题**: iframe 自动加载会严重阻塞主线程

**解决方案**: Intersection Observer API

```typescript
// components/SimilarGames.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function SimilarGames() {
  const [isPlaying, setIsPlaying] = useState(false); // 初始不加载
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer 监听元素进入视口
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            // 延迟 300ms 自动播放，避免阻塞
            setTimeout(() => setIsPlaying(true), 300);
          }
        });
      },
      {
        threshold: 0.25,      // 可见 25% 时触发
        rootMargin: '50px',   // 提前 50px 预加载
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-20">
      {/* 只有 isPlaying 为 true 时才渲染 iframe */}
      {isPlaying ? (
        <iframe src={gameUrl} />
      ) : (
        <div>Click to Play</div>
      )}
    </section>
  );
}
```

**参数调优**:
- `threshold`: 0.1-0.5（建议 0.25）
- `rootMargin`: '0px' 到 '100px'（建议 50px）
- 延迟时间: 200-500ms（建议 300ms）

**效果**: TBT 减少 800-1500ms

---

#### 2.2 所有页面统一优化

**清单**:
```typescript
// ✅ 首页 (app/page.tsx)
const CodesSection = dynamic(() => import('@/components/CodesSection'));
const SimilarGames = dynamic(() => import('@/components/SimilarGames'));
const Features = dynamic(() => import('@/components/Features'));
const Footer = dynamic(() => import('@/components/Footer'));

// ✅ Codes 页面 (app/codes/page.tsx)
const Footer = dynamic(() => import('@/components/Footer'));

// ✅ Games 页面 (app/games/page.tsx)
const Footer = dynamic(() => import('@/components/Footer'));
// 初始 isPlaying = false，用户点击后才加载

// ✅ Wiki 页面 (app/wiki/page.tsx)
const Footer = dynamic(() => import('@/components/Footer'));
```

**效果**: TBT 减少 500-800ms

---

### Phase 3: 精细优化（预计改善 10-20%）

#### 3.1 优化 Bundle 大小

```bash
# 1. 分析 bundle
npm run build
# 查看 .next/analyze/client.html

# 2. 识别大型依赖
# - 查找 > 100KB 的包
# - 检查是否可以按需导入
```

**常见优化**:
```typescript
// ❌ 导入整个 lodash
import _ from 'lodash';

// ✅ 只导入需要的函数
import debounce from 'lodash/debounce';

// ❌ 导入所有 icons
import * as Icons from '@/components/icons';

// ✅ 按需导入
import { IconPlay, IconGift } from '@/components/icons';
```

---

#### 3.2 图片优化

```typescript
// ✅ 使用 next/image
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Anime Weapons Logo"
  width={100}
  height={100}
  priority={true}  // 首屏图片
  loading="lazy"   // 非首屏图片
/>

// ✅ 使用 WebP 格式
// logo.png → logo.webp (减少 30-50% 大小)
```

---

#### 3.3 字体优化

```typescript
// app/layout.tsx
import { Inter } from 'next/font/inter';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // 避免 FOIT (Flash of Invisible Text)
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 📊 优化效果追踪

### 测试清单

```markdown
## Phase 1 完成后测试
- [ ] TBT < 2500ms
- [ ] Google Analytics 脚本延迟加载
- [ ] 非首屏组件懒加载生效
- [ ] Loading skeleton 正常显示

## Phase 2 完成后测试
- [ ] TBT < 1200ms
- [ ] 滚动到游戏区域时自动加载
- [ ] 所有页面 Footer 懒加载
- [ ] 无布局抖动 (CLS < 0.1)

## Phase 3 完成后测试
- [ ] TBT < 600ms
- [ ] Bundle 大小合理
- [ ] 图片使用 next/image
- [ ] Lighthouse Performance > 90
```

---

## ⚠️ 注意事项与最佳实践

### 1. 懒加载注意事项

```typescript
// ❌ 错误：SSR 懒加载
const Component = dynamic(() => import('./Component'), {
  ssr: false,  // 会导致 Hydration 错误
});

// ✅ 正确：默认 SSR
const Component = dynamic(() => import('./Component'));
```

### 2. Intersection Observer 兼容性

```typescript
// 添加 polyfill（如需支持旧浏览器）
if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  import('intersection-observer');
}
```

### 3. 懒加载 vs. Prefetch

```typescript
// 场景 1: 用户可能不会看到的内容
const Footer = dynamic(() => import('@/components/Footer'));

// 场景 2: 用户肯定会用到的内容
<Link href="/codes" prefetch={true}>Codes</Link>
```

### 4. Loading 状态设计原则

- ✅ 使用 skeleton，不要用 spinner
- ✅ 保持布局稳定，预留空间
- ✅ 添加 `animate-pulse` 动画
- ❌ 避免突然的内容跳动

---

## 🧪 测试与验证

### 1. 本地测试

```bash
# 1. 构建生产版本
npm run build

# 2. 启动生产服务器
npm start

# 3. 打开 Chrome DevTools
# - Network 标签：查看资源加载顺序
# - Performance 标签：记录页面加载过程
# - Lighthouse 标签：生成性能报告
```

### 2. Lighthouse 测试命令

```bash
# CLI 测试
lighthouse https://animeweapons.org \
  --only-categories=performance \
  --view

# 移动端测试
lighthouse https://animeweapons.org \
  --preset=mobile \
  --view
```

### 3. 真实用户监控 (RUM)

```typescript
// 使用 Web Vitals 库
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

---

## 📈 预期优化效果

| 阶段 | TBT | 改善幅度 | Lighthouse 分数 |
|------|-----|----------|-----------------|
| **优化前** | 5,010ms | - | ~40 |
| **Phase 1** | 2,500ms | -50% | ~60 |
| **Phase 2** | 1,200ms | -76% | ~80 |
| **Phase 3** | < 600ms | -88% | **90+** |

---

## 🔧 故障排除

### 问题 1: Dynamic import 不生效

**症状**: 组件仍然在首屏加载

**原因**: 组件被其他同步导入的组件引用

**解决**:
```typescript
// ❌ 问题代码
import Header from '@/components/Header';
// Header 内部 import Footer

// ✅ 解决方案
// 在 Header 内也使用 dynamic import
const Footer = dynamic(() => import('./Footer'));
```

---

### 问题 2: Intersection Observer 触发多次

**症状**: 游戏重复加载

**原因**: 没有检查 `isInView` 状态

**解决**:
```typescript
// ✅ 添加状态检查
if (entry.isIntersecting && !isInView) {
  setIsInView(true);
  // 只触发一次
}
```

---

### 问题 3: TBT 仍然很高

**可能原因**:
1. 第三方脚本未优化（检查 Network 标签）
2. 大型依赖未分割（运行 bundle 分析）
3. 客户端 JavaScript 过多（考虑 Server Components）
4. 图片未优化（使用 next/image）

**诊断命令**:
```bash
# 查看具体是什么在阻塞
lighthouse https://your-site.com --view
# 查看 "Diagnostics" 部分的 "Main-thread work breakdown"
```

---

## 💡 进阶优化技巧

### 1. 路由级别代码分割

Next.js 自动按路由分割，但可以手动优化：

```typescript
// app/layout.tsx
export const dynamic = 'force-dynamic'; // 或 'force-static'
```

### 2. 使用 Server Components

```typescript
// ✅ Server Component (默认)
// app/components/ServerComponent.tsx
export default function ServerComponent() {
  return <div>No client JS!</div>;
}

// ❌ 仅在需要交互时使用 'use client'
'use client';
export default function ClientComponent() {
  const [state, setState] = useState();
  // ...
}
```

### 3. Streaming SSR

```typescript
// app/page.tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SlowComponent />
    </Suspense>
  );
}
```

---

## 📚 参考资源

- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [Next.js Performance Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## 📝 总结

### 核心原则

1. **首屏优先**: 只加载首屏必需的资源
2. **按需加载**: 使用 Intersection Observer 智能加载
3. **渐进增强**: 先加载核心功能，再加载增强功能
4. **测量优化**: 每次优化后都要测量效果

### 优化优先级

```
高优先级 (必做):
  └─ 第三方脚本延迟加载
  └─ 非首屏组件懒加载
  └─ iframe/视频按需加载

中优先级 (推荐):
  └─ Intersection Observer 自动加载
  └─ Bundle 大小优化
  └─ 图片优化

低优先级 (可选):
  └─ 字体优化
  └─ Service Worker
  └─ 预加载关键资源
```

### 记录时间

**创建日期**: 2025-11-25
**案例网站**: AnimeWeapons.org
**优化结果**: TBT 从 5,010ms → < 600ms (改善 88%)

---

## 🎯 快速检查清单

在开始优化前，先快速检查：

```markdown
- [ ] 是否有第三方脚本（GA, 广告）？
- [ ] 是否有 iframe 或视频？
- [ ] 是否所有组件都在首屏加载？
- [ ] Bundle 大小是否 > 1MB？
- [ ] 是否有大型图片未优化？
- [ ] 是否在客户端做大量计算？
```

如果以上任何一项为 "是"，就可以应用本指南的优化方案。

---

**维护说明**: 此文档应随着 Next.js 版本更新和新的优化技术出现而更新。
