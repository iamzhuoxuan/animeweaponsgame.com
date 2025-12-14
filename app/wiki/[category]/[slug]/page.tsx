import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ContextualSidebar from '@/components/wiki/ContextualSidebar';
import {
  buildBreadcrumbs,
  getCategoryLabel,
  getEntityById,
  getRecommendations,
  getWikiEntity,
  getWikiHref,
  getWorldById,
  listEntitiesByCategory,
  wikiCategoryList,
  getLatestEntities,
  type Boss,
  type DemonArt,
  type Weapon,
  type WikiCategory,
  type WikiEntity,
  type World,
} from '@/data/wiki';
import { getTradingBySlug, tradingWikiLink } from '@/data/trading';

const Footer = dynamic(() => import('@/components/Footer'));

interface PageParams {
  params: { category: WikiCategory; slug: string };
}

export function generateStaticParams() {
  return wikiCategoryList.flatMap((category) =>
    listEntitiesByCategory(category).map((entry) => ({
      category,
      slug: entry.slug,
    }))
  );
}

export function generateMetadata({ params }: PageParams): Metadata {
  const entity = getWikiEntity(params.category, params.slug);
  if (!entity) return {};

  const title =
    entity.seo?.title ??
    `${entity.name} - ${getCategoryLabel(entity.category)} | Anime Weapons Wiki`;
  const description =
    entity.seo?.description ??
    `${entity.summary} — deep wiki page with breadcrumb navigation and internal links.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/wiki/${entity.category}/${entity.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://animeweapons.org/wiki/${entity.category}/${entity.slug}`,
      type: 'article',
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass-effect border border-av-purple/20 rounded-xl p-5 space-y-3">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

function WeaponSection({ weapon }: { weapon: Weapon }) {
  const source = weapon.acquisition?.id ? getEntityById(weapon.acquisition.id) : undefined;
  const world = getWorldById(weapon.worldId);
  const trading = getTradingBySlug(weapon.slug);
  const demonArts = weapon.recommendedBuild.demonArtIds
    .map((id) => getEntityById(id))
    .filter(Boolean) as DemonArt[];

  return (
    <div className="space-y-5">
      <Section title="Stats">
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-200">
          <div className="glass-effect rounded-lg p-3 border border-av-purple/10">
            <p className="text-gray-400">Base Mastery</p>
            <p className="text-lg font-bold text-white">{weapon.stats.baseMastery}</p>
          </div>
          <div className="glass-effect rounded-lg p-3 border border-av-purple/10">
            <p className="text-gray-400">Max Mastery</p>
            <p className="text-lg font-bold text-white">{weapon.stats.maxMastery}</p>
          </div>
          <div className="glass-effect rounded-lg p-3 border border-av-purple/10">
            <p className="text-gray-400">Damage Multiplier</p>
            <p className="text-lg font-bold text-white">{weapon.stats.damageMultiplier}</p>
          </div>
          {weapon.stats.critBonus && (
            <div className="glass-effect rounded-lg p-3 border border-av-purple/10">
              <p className="text-gray-400">Crit Bonus</p>
              <p className="text-lg font-bold text-white">{weapon.stats.critBonus}</p>
            </div>
          )}
        </div>
      </Section>

      <Section title="Acquisition">
        <ul className="text-sm text-gray-200 space-y-2">
          <li>
            <span className="font-semibold text-av-purple">Dropped by:</span>{' '}
            {source ? (
              <a href={getWikiHref(source.category, source.slug)} className="text-white hover:text-av-purple">
                {source.name}
              </a>
            ) : (
              weapon.acquisition.name
            )}{' '}
            {weapon.acquisition.rate && <span className="text-gray-400">({weapon.acquisition.rate})</span>}
          </li>
          {weapon.acquisition.note && <li className="text-gray-400">{weapon.acquisition.note}</li>}
          {world && (
            <li>
              <span className="font-semibold text-av-purple">World:</span>{' '}
              <a href={getWikiHref('worlds', world.slug)} className="text-white hover:text-av-purple">
                {world.name}
              </a>
            </li>
          )}
        </ul>
      </Section>

      {weapon.crafting && (
        <Section title="Crafting">
          <ul className="text-sm text-gray-200 space-y-2">
            {weapon.crafting.materials.map((material, idx) => (
              <li key={`${material.name}-${idx}`} className="flex justify-between">
                <span>{material.name}</span>
                <span className="text-gray-400">x{material.quantity}</span>
              </li>
            ))}
          </ul>
          {weapon.crafting.note && <p className="text-gray-400 text-sm">{weapon.crafting.note}</p>}
        </Section>
      )}

      <Section title="Recommended Build">
        <p className="text-sm text-gray-200 mb-3">{weapon.recommendedBuild.bestUse}</p>
        {weapon.recommendedBuild.synergyNotes && (
          <p className="text-xs text-gray-400">{weapon.recommendedBuild.synergyNotes}</p>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {demonArts.map((art) => (
            <a
              key={art.id}
              href={getWikiHref('demon-arts', art.slug)}
              className="px-3 py-1 rounded-full bg-av-purple/15 border border-av-purple/30 text-sm text-av-purple hover:border-av-pink"
            >
              {art.name}
            </a>
          ))}
        </div>
      </Section>

      {trading && (
        <Section title="Trading Value">
          <div className="text-sm text-gray-200 space-y-1">
            <div>
              <span className="font-semibold">Floor:</span> {trading.floor} emeralds
            </div>
            <div>
              <span className="font-semibold">Average:</span> {trading.average} emeralds
            </div>
            <div>
              <span className="font-semibold">Demand:</span> {trading.demand}
            </div>
            {trading.notes && <p className="text-xs text-gray-400">{trading.notes}</p>}
            <a
              href={`/trading/item/${trading.slug}`}
              className="inline-flex items-center gap-2 text-av-purple font-semibold hover:text-av-pink"
            >
              View trading page →
            </a>
          </div>
        </Section>
      )}
    </div>
  );
}

function BossSection({ boss }: { boss: Boss }) {
  const world = getWorldById(boss.worldId);
  return (
    <div className="space-y-5">
      <Section title="Info">
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-200">
          <div>HP: {boss.hp.toLocaleString()}</div>
          <div>Respawn: {boss.respawnTime}</div>
          <div>Level Requirement: {boss.levelRequirement}+</div>
          <div>
            Location: {boss.location.area} {boss.location.isSecret ? '(Secret)' : ''}
          </div>
        </div>
      </Section>
      <Section title="Loot Table">
        <ul className="space-y-2 text-sm text-gray-200">
          {boss.loot.map((loot, idx) => {
            const linked = loot.id ? getEntityById(loot.id) : undefined;
            return (
              <li key={`${loot.name}-${idx}`} className="flex justify-between">
                {linked ? (
                  <a
                    href={getWikiHref(linked.category, linked.slug)}
                    className="text-white hover:text-av-purple"
                  >
                    {linked.name}
                  </a>
                ) : (
                  <span>{loot.name}</span>
                )}
                <span className="text-gray-400">{loot.chance ?? ''}</span>
              </li>
            );
          })}
        </ul>
      </Section>
      <Section title="Strategy">
        <p className="text-sm text-gray-200">{boss.tactics}</p>
        {world && (
          <p className="text-xs text-gray-400">
            Found in{' '}
            <a href={getWikiHref('worlds', world.slug)} className="text-av-purple hover:text-av-pink">
              {world.name}
            </a>
          </p>
        )}
      </Section>
    </div>
  );
}

function WorldSection({ world }: { world: World }) {
  return (
    <div className="space-y-5">
      <Section title="Map Overview">
        {world.mapImage ? (
          <div className="overflow-hidden rounded-xl border border-av-purple/20">
            <Image
              src={world.mapImage}
              alt={`${world.name} map`}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        ) : (
          <div className="text-sm text-gray-400">Map image coming soon.</div>
        )}
      </Section>

      <Section title="NPC List">
        <div className="flex flex-wrap gap-2">
          {world.npcs.map((npc) => (
            <span
              key={npc}
              className="px-3 py-1 rounded-full bg-av-purple/15 border border-av-purple/30 text-sm text-av-purple"
            >
              {npc}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Boss & Mob List">
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-av-purple font-semibold">Bosses</p>
            <div className="flex flex-wrap gap-2">
              {world.bosses.map((bossId) => {
                const boss = getEntityById(bossId);
                return boss ? (
                  <a
                    key={boss.id}
                    href={getWikiHref('bosses', boss.slug)}
                    className="px-3 py-1 rounded-full bg-av-blue/30 border border-av-purple/20 text-sm text-white hover:border-av-purple"
                  >
                    {boss.name}
                  </a>
                ) : null;
              })}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-av-purple font-semibold">Mobs</p>
            <div className="flex flex-wrap gap-2">
              {world.mobs.map((mob) => (
                <span
                  key={mob}
                  className="px-3 py-1 rounded-full bg-av-purple/10 border border-av-purple/20 text-sm text-gray-200"
                >
                  {mob}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Secret Spots">
        <ul className="space-y-2 text-sm text-gray-200">
          {world.secretSpots.map((spot, idx) => {
            const related = spot.relatedBossId ? getEntityById(spot.relatedBossId) : undefined;
            return (
              <li key={`${spot.title}-${idx}`} className="glass-effect p-3 rounded-lg border border-av-purple/15">
                <p className="font-semibold text-white">{spot.title}</p>
                <p className="text-gray-400 text-sm">{spot.description}</p>
                {related && (
                  <a
                    href={getWikiHref('bosses', related.slug)}
                    className="text-xs text-av-purple hover:text-av-pink"
                  >
                    Related: {related.name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}

function DemonArtSection({ art }: { art: DemonArt }) {
  const world = getWorldById(art.acquisition.worldId);
  const synergyWeapons = art.synergyWeapons
    .map((id) => getEntityById(id))
    .filter(Boolean) as Weapon[];

  return (
    <div className="space-y-5">
      <Section title="Acquisition">
        <ul className="text-sm text-gray-200 space-y-1">
          <li>Method: {art.acquisition.method}</li>
          {art.acquisition.rate && <li>Rate: {art.acquisition.rate}</li>}
          {art.acquisition.pity && <li>Pity: {art.acquisition.pity}</li>}
          {art.acquisition.locationName && <li>Location: {art.acquisition.locationName}</li>}
          {world && (
            <li>
              World:{' '}
              <a href={getWikiHref('worlds', world.slug)} className="text-white hover:text-av-purple">
                {world.name}
              </a>
            </li>
          )}
        </ul>
      </Section>

      <Section title="Skills">
        <div className="space-y-3">
          {art.skills.map((skill) => (
            <div key={skill.name} className="glass-effect p-3 rounded-lg border border-av-purple/15">
              <div className="flex justify-between items-center mb-1">
                <p className="text-white font-semibold">{skill.name}</p>
                <span className="text-xs text-gray-400">{skill.cooldown}</span>
              </div>
              <p className="text-sm text-gray-300">{skill.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Best With">
        <div className="flex flex-wrap gap-2">
          {synergyWeapons.map((weapon) => (
            <a
              key={weapon.id}
              href={getWikiHref('weapons', weapon.slug)}
              className="px-3 py-1 rounded-full bg-av-purple/15 border border-av-purple/30 text-sm text-av-purple hover:border-av-pink"
            >
              {weapon.name}
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function buildInternalLinks(entity: WikiEntity) {
  const links: { label: string; href: string; description: string }[] = [];

  if (entity.worldId) {
    const world = getWorldById(entity.worldId);
    if (world) {
      links.push({
        label: world.name,
        href: getWikiHref('worlds', world.slug),
        description: 'World map, NPCs, and secret tunnels.',
      });
    }
  }

  if (entity.category === 'weapons') {
    const weapon = entity as Weapon;
    if (weapon.acquisition.id) {
      const boss = getEntityById(weapon.acquisition.id);
      if (boss) {
        links.push({
          label: boss.name,
          href: getWikiHref('bosses', boss.slug),
          description: 'Drop source with spawn timer and loot table.',
        });
      }
    }
    weapon.recommendedBuild.demonArtIds.forEach((id) => {
      const art = getEntityById(id);
      if (art) {
        links.push({
          label: art.name,
          href: getWikiHref('demon-arts', art.slug),
          description: 'Recommended Demon Art synergy.',
        });
      }
    });
    const tradingLink = tradingWikiLink(weapon.slug);
    if (tradingLink) {
      links.push({
        label: `${weapon.name} trading value`,
        href: `/trading/item/${weapon.slug}`,
        description: 'Economy silo tie-in with player sentiment.',
      });
    }
  }

  if (entity.category === 'bosses') {
    const boss = entity as Boss;
    boss.loot.forEach((loot) => {
      if (loot.id) {
        const drop = getEntityById(loot.id);
        if (drop) {
          links.push({
            label: drop.name,
            href: getWikiHref(drop.category, drop.slug),
            description: 'Loot item with stats and trading data.',
          });
        }
      }
    });
  }

  if (entity.category === 'worlds') {
    const world = entity as World;
    world.bosses.forEach((bossId) => {
      const boss = getEntityById(bossId);
      if (boss) {
        links.push({
          label: boss.name,
          href: getWikiHref('bosses', boss.slug),
          description: 'Boss spawn timers and drops.',
        });
      }
    });
  }

  if (entity.category === 'demon-arts') {
    const art = entity as DemonArt;
    art.synergyWeapons.forEach((weaponId) => {
      const weapon = getEntityById(weaponId);
      if (weapon) {
        links.push({
          label: weapon.name,
          href: getWikiHref('weapons', weapon.slug),
          description: 'Weapon synergy to raise PV via internal links.',
        });
      }
    });
  }

  const seen = new Set<string>();
  const unique: { label: string; href: string; description: string }[] = [];
  links.forEach((link) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    unique.push(link);
  });

  if (unique.length < 3) {
    const fillers = getLatestEntities(5);
    for (const filler of fillers) {
      if (filler.id === entity.id) continue;
      const href = getWikiHref(filler.category, filler.slug);
      if (seen.has(href)) continue;
      unique.push({
        label: filler.name,
        href,
        description: 'Additional wiki entry to strengthen internal links.',
      });
      seen.add(href);
      if (unique.length >= 3) break;
    }
  }

  return unique;
}

export default function WikiEntityPage({ params }: PageParams) {
  const entity = getWikiEntity(params.category, params.slug);
  if (!entity) return notFound();

  const breadcrumbs = buildBreadcrumbs(entity);
  const recommendations = getRecommendations(entity);
  const internalLinks = buildInternalLinks(entity);

  const badges = [
    { label: getCategoryLabel(entity.category), color: 'bg-av-purple/20 border-av-purple/40' },
    entity.worldId ? { label: entity.worldId.replace('_', ' '), color: 'bg-av-blue/30 border-av-purple/20' } : null,
  ].filter(Boolean) as { label: string; color: string }[];

  return (
    <div className="min-h-screen bg-av-navy selection:bg-av-purple selection:text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <article className="space-y-6">
            <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{entity.name}</h1>
              <p className="text-gray-300">{entity.summary}</p>
            </header>

            {entity.category === 'weapons' && <WeaponSection weapon={entity as Weapon} />}
            {entity.category === 'bosses' && <BossSection boss={entity as Boss} />}
            {entity.category === 'worlds' && <WorldSection world={entity as World} />}
            {entity.category === 'demon-arts' && <DemonArtSection art={entity as DemonArt} />}

            <Section title="Internal Links (PV Boost)">
              <ul className="space-y-2 text-sm text-gray-200">
                {internalLinks.map((link) => (
                  <li key={link.href} className="flex flex-col">
                    <a href={link.href} className="text-white font-semibold hover:text-av-purple">
                      {link.label}
                    </a>
                    <span className="text-xs text-gray-400">{link.description}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </article>

          <ContextualSidebar
            sameWorld={recommendations.sameWorld}
            sameSilo={recommendations.sameSilo}
            crossLinks={recommendations.crossLinks}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
