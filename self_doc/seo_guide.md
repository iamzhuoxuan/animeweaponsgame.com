# SEO 操作指南

根据以下指南，根据二级标题建立检查清单，进行逐个检查与优化

## Title

• 为每个页面提供一个独特的标题，简洁准确地描述页面的内容；

• 标题长度保持在50-60个字符以内（以免在搜索引擎结果页面中被截断）；

• 将重要关键词放在首位，但要自然，就好像你首先为访客编写标题一样；
【本网站重要的关键词是 Anime Weapons Codes, Codes】

• 在标题中使用您的品牌名称，即使最终不会显示在搜索引擎结果页面上，对搜索引擎仍会产生影响。

• 哥飞的习惯，会在全站所有页面的标题结尾都加上网站名称和域名，如果网站名称就是域名，则只需要加域名就行。

## Description

• 为每个页面提供一个独特的元描述，清晰地反映页面所传达的价值；

• 谷歌的摘要通常最多约为150-160个字符（包括空格）；

• 包括您最重要的关键词，这样它们在实际的搜索引擎结果页面上就会被突出显示，但要小心避免关键词堆砌，不要让您的描述只是您正在针对的关键词的组合；

• 可选择地，使用引人注目的号召行动，您提供的独特主张，或者关于期望的额外提示 - 如“学习”，“购买”等构建。

• 注意，我们还可以用结构化的描述，具体可以看《10种谷歌结构化搜索结果样式介绍及实现方法，最骚的是第9种》，要想呈现结构化的搜索结果，最好的办法是按照谷歌的帮助文档要求去给谷歌提供结构化的数据，具体可以看这里：https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn

## Headings

• 确保标题与它们描述的文本段相关。搜索引擎虽然不会将其作为排名因素，但仍会考虑它们；

• 请始终让标题反映其所覆盖的文本的情感。避免使用简单的顺序标题“第一章...第二章...第三章...”的标题；

• 不要过度使用标签和其中的关键词。保持对用户的可读性。

• 有个小问题，Title 和 H1 是否可以重复呢？谷歌的建议是可以一样，但是也可以不一样。所以如果你实在写不出不一样的H1，那就让H1和Title一样也行。

## 图片 Alt

• 给图片标签增加 alt 属性，正确的写法如下：<img src="这里是图片地址" alt="这里是图片描述">

• 在正确的上下文里使用正确的图片，在图片 alt 里正确的写图片描述；

• 尽力优化最突出的图片（产品图片、信息图表或培训图片），这些图片可能会在谷歌图片搜索中被查找到；

• 确保替代文本清晰且具有描述性，合理使用关键词，并确保它们自然地融入页面内容的整体画布中。

## 链接的 Nofollow 属性

• 具体用法如下：<a href="链接网址" rel="noopener noreferrer nofollow">锚文本</a>

• 通常以下场景需要设置 nofollow ：任何可能被视为“不受信任内容”的资源链接；任何付费或赞助链接（你不希望谷歌发现你在出售“选票”）；评论或其他类型的用户生成内容中的链接可能会被滥用，而这是您无法控制的。

## robots 元标签

• 用法示例：<meta name="robots" content="noindex">

• 更多取值看谷歌文档：https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag?hl=zh-cn

• 一些最佳实践：关闭那些内容稀少、价值不大且没有出现在搜索引擎结果页面中意图的不必要/未完成页面；关闭那些不合理浪费爬取预算的页面；请确保仔细检查，不要错误地限制重要页面的索引。


## canonical 标签

• 在网站首页的 html head 里加上如下代码：<link rel="canonical" href="https://abc.com/">

• 网站博客的某篇介绍如何搞钱的文章应该返回如下代码：<link rel="canonical" href="https://abc.com/blog/how-to-make-money">

Schema Markup 模式标记

• 按照谷歌的帮助文档要求去主动给谷歌提供结构化的数据，具体可以看这里：https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data?hl=zh-cn

• 谷歌官方也提供了一个结构化数据标记辅助工具：https://www.google.com/webmasters/markup-helper/?hl=zh

• 使用步骤很简单，输入要标记的网址，选择标记的数据类型，点击网页选择内容然后标记数据。

• 最后生成的 JSON-LD 数据代码如下，把这些代码添加到网页html 的 head 中即可：

`<!-- 由 Google 结构化数据标记助手生成的 JSON-LD 标记。-->
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Product",
  "name": "Listen Notes",
  "image": "https://wxcdn.qabot.cn/plugin/img/1280.duck_3.png",
  "description": "最好的播客搜索引擎和数据库，包含所有播客和剧集。"
}
</script>`

## Social Media 社媒元标签

• 最主要的 Open Graph 标签有以下几个：og:title - 控制显示的标题；og:url - 控制网址，如可以增加跟踪参数；og:description - 控制描述；og:image - 控制图片

• 示例代码：

`<meta property="og:title" content="HIX.AI: Your Most Powerful, All-In-One AI Writing Copilot"/>
<meta property="og:description" content="Generate high-quality copies for ads, emails, blogs, and more in seconds with HIX.AI, the most powerful, all-in-one AI writing copilot on the market."/>
<meta property="og:url" content="https://hix.ai"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://hix.ai/featured-images/hix-ai-the-most-powerful-all-in-one-ai-writing-copilot.jpg"/>
<meta property="og:image:alt" content="The Most Powerful, All-in-One AI Writing Copilot."/>
<meta property="og:image:width" content="800"/>
<meta property="og:image:height" content="600"/>`
• Twitter cards 有些不太一样，具体看下面文档：https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started

## Viewport Meta Tag 视口元标签

• 通常代码如下：<meta name="viewport" content="width=device-width, initial-scale=1"/>

• “width=device-width”将使页面与设备独立像素的屏幕宽度匹配，“initial scale=1”将建立CSS像素和设备独立像素之间的1:1关系，考虑屏幕方向。

