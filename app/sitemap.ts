import { MetadataRoute } from 'next';
import { tradingValues } from '@/data/trading';
import {
  getWikiHref,
  listEntitiesByCategory,
  wikiCategoryList,
} from '@/data/wiki';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://animeweapons.org';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/calculator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.82,
    },
    {
      url: `${siteUrl}/codes`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/wiki`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/tier-list`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/value-list`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.78,
    },
    {
      url: `${siteUrl}/trading`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.68,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = wikiCategoryList.map((category) => {
    const categoryUrl =
      category === 'weapons'
        ? `${siteUrl}/weapons`
        : category === 'worlds'
          ? `${siteUrl}/worlds`
          : `${siteUrl}/wiki/${category}`;

    return {
      url: categoryUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const entityPages: MetadataRoute.Sitemap = wikiCategoryList.flatMap((category) =>
    listEntitiesByCategory(category).map((entry) => ({
      url: `${siteUrl}${getWikiHref(category, entry.slug)}`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: 'weekly',
      priority: category === 'worlds' ? 0.85 : 0.8,
    }))
  );

  const tradingPages: MetadataRoute.Sitemap = tradingValues.map((item) => ({
    url: `${siteUrl}/trading/item/${item.slug}`,
    lastModified: new Date(item.lastUpdated),
    changeFrequency: 'weekly',
    priority: 0.65,
  }));

  return [...staticPages, ...categoryPages, ...entityPages, ...tradingPages];
}
