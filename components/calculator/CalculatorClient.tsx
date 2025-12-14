'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { wikiContent, type Weapon } from '@/data/wiki';
import { gameCodes } from '@/data/codes';
import NumericField from './NumericField';

type PotionKey = 'damage' | 'yen' | 'mastery';
type GamepassKey = 'vip' | 'doubleDamage' | 'autoClicker';

const rarityBaseDamage: Record<Weapon['rarity'], number> = {
  Common: 70,
  Rare: 100,
  Epic: 140,
  Legendary: 185,
  Mythic: 240,
  Secret: 320,
};

const potionConfig: Record<PotionKey, { label: string; multiplier: number; note?: string }> = {
  damage: { label: 'Damage Potion (+50%)', multiplier: 1.5 },
  yen: { label: 'Yen Potion (for drops)', multiplier: 1 },
  mastery: { label: 'Mastery Potion (XP)', multiplier: 1 },
};

const gamepassConfig: Record<GamepassKey, { label: string; multiplier: number; note?: string }> = {
  vip: { label: 'VIP (+20%)', multiplier: 1.2 },
  doubleDamage: { label: '2x Damage', multiplier: 2 },
  autoClicker: { label: 'Auto-Clicker (10 cps)', multiplier: 1 },
};

function parseDamageMultiplier(stat?: string) {
  if (!stat) return 1;
  const numeric = Number(stat.replace(/[^\d.]/g, ''));
  if (!Number.isFinite(numeric)) return 1;
  return numeric >= 10 ? numeric / 100 : numeric;
}

export default function CalculatorClient() {
  const weaponOptions = useMemo(() => {
    return wikiContent.weapons.map((weapon) => ({
      id: weapon.id,
      name: weapon.name,
      rarity: weapon.rarity,
      baseDamage: rarityBaseDamage[weapon.rarity],
      scaling: Math.max(4, Math.round((weapon.stats.baseMastery ?? 50) / 2)),
      multiplier: parseDamageMultiplier(weapon.stats.damageMultiplier),
      class: weapon.class,
    }));
  }, []);

  const bossOptions = useMemo(
    () =>
      wikiContent.bosses.map((boss) => ({
        id: boss.id,
        name: boss.name,
        hp: boss.hp,
        worldId: boss.worldId,
      })),
    []
  );

  const [weaponId, setWeaponId] = useState(weaponOptions[0]?.id ?? '');
  const [weaponLevel, setWeaponLevel] = useState(50);
  const [baseDamage, setBaseDamage] = useState(weaponOptions[0]?.baseDamage ?? 100);
  const [scaling, setScaling] = useState(weaponOptions[0]?.scaling ?? 8);
  const [companionBonus, setCompanionBonus] = useState(0.15);
  const [masteryBonus, setMasteryBonus] = useState(0.1);
  const [autoClickRate, setAutoClickRate] = useState(10);
  const [potions, setPotions] = useState<Record<PotionKey, boolean>>({
    damage: true,
    yen: false,
    mastery: false,
  });
  const [gamepasses, setGamepasses] = useState<Record<GamepassKey, boolean>>({
    vip: false,
    doubleDamage: false,
    autoClicker: true,
  });
  const [bossId, setBossId] = useState(bossOptions[0]?.id ?? '');
  const [targetStar, setTargetStar] = useState(3);
  const [currentStar, setCurrentStar] = useState(1);
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    const selected = weaponOptions.find((w) => w.id === weaponId);
    if (selected) {
      setBaseDamage(selected.baseDamage);
      setScaling(selected.scaling);
    }
  }, [weaponId, weaponOptions]);

  const selectedWeapon = weaponOptions.find((w) => w.id === weaponId);
  const selectedBoss = bossOptions.find((b) => b.id === bossId);

  const multipliers = useMemo(() => {
    const potionMult = Object.entries(potions).reduce((acc, [key, active]) => {
      if (!active) return acc;
      return acc * (potionConfig[key as PotionKey]?.multiplier ?? 1);
    }, 1);

    const gamepassMult = Object.entries(gamepasses).reduce((acc, [key, active]) => {
      if (!active) return acc;
      return acc * (gamepassConfig[key as GamepassKey]?.multiplier ?? 1);
    }, 1);

    return { potionMult, gamepassMult };
  }, [potions, gamepasses]);

  const additive = 1 + masteryBonus + companionBonus + (selectedWeapon?.multiplier ? selectedWeapon.multiplier - 1 : 0);
  const damagePerClick = (baseDamage + weaponLevel * scaling) * additive * multipliers.potionMult * multipliers.gamepassMult;
  const cps = gamepasses.autoClicker ? autoClickRate : 3; // fallback to manual clicks
  const estimatedDps = damagePerClick * cps;
  const bossHp = selectedBoss?.hp ?? 100000;
  const ttkSeconds = bossHp / Math.max(estimatedDps, 1);
  const ttkLabel = ttkSeconds <= 1 ? 'One-shot' : `${ttkSeconds.toFixed(1)}s`;

  const fusionNeeded = Math.max(0, Math.pow(3, Math.max(0, targetStar - currentStar)) - currentCount);

  const activeCodes = useMemo(() => gameCodes.filter((code) => code.status === 'active'), []);
  const latestCodes = useMemo(
    () =>
      [...activeCodes].sort((a, b) => (b.addedDate ?? '').localeCompare(a.addedDate ?? '')).slice(0, 4),
    [activeCodes]
  );

  return (
    <>
      <header className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Tools · Simulator</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Anime Weapons Calculator</h1>
        <p className="text-gray-300 text-lg">
          Simulate damage per click, estimated DPS, boss time-to-kill, and 3-to-1 fusion needs with live inputs for weapons, potions, gamepasses, and companions. Edit any field or clear and restore defaults to match your in-game numbers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/codes#codes"
            className="px-5 py-3 rounded-lg glass-effect border border-av-purple/30 font-semibold hover:border-av-purple"
          >
            Apply Active Codes
          </Link>
          <Link
            href="/value-list"
            className="px-5 py-3 rounded-lg bg-av-gradient-purple-pink font-semibold shadow-glow-purple hover:scale-105 transition-all"
          >
            Check Value List
          </Link>
        </div>
      </header>

      {/* Combat Simulator */}
      <section className="grid lg:grid-cols-[1.1fr_1fr_1fr] gap-6" id="combat-simulator">
        <div className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Build Config</h2>
            <span className="text-xs text-av-purple uppercase tracking-[0.12em]">Step 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Weapon</label>
              <select
                className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
                value={weaponId}
                onChange={(e) => setWeaponId(e.target.value)}
              >
                {weaponOptions.map((weapon) => (
                  <option key={weapon.id} value={weapon.id}>
                    {weapon.name} · {weapon.rarity}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Defaults auto-fill based on rarity. Override below if you have live numbers.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <NumericField
                  label="Base Damage"
                  value={baseDamage}
                  defaultValue={selectedWeapon?.baseDamage ?? 100}
                  min={1}
                  step={1}
                  onChange={(val) => setBaseDamage(val)}
                />
              </div>
              <div>
                <NumericField
                  label="Scaling / Level"
                  value={scaling}
                  defaultValue={selectedWeapon?.scaling ?? 8}
                  min={0}
                  step={1}
                  onChange={(val) => setScaling(val)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs text-gray-400">Weapon Level</label>
                <span className="text-xs text-av-purple font-semibold">{weaponLevel}</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={weaponLevel}
                onChange={(e) => setWeaponLevel(Number(e.target.value))}
                className="w-full accent-av-purple"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <NumericField
                  label="Companion Bonus (e.g. +15%)"
                  value={companionBonus}
                  defaultValue={0.15}
                  min={0}
                  max={5}
                  step={0.01}
                  inputMode="decimal"
                  onChange={(val) => setCompanionBonus(val)}
                />
              </div>
              <div>
                <NumericField
                  label="Mastery Bonus (additive)"
                  value={masteryBonus}
                  defaultValue={0.1}
                  min={0}
                  max={5}
                  step={0.01}
                  inputMode="decimal"
                  onChange={(val) => setMasteryBonus(val)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Buff Console</h2>
            <span className="text-xs text-av-purple uppercase tracking-[0.12em]">Step 2</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-300">Potions</p>
            {Object.entries(potionConfig).map(([key, potion]) => (
              <label key={key} className="flex items-center justify-between bg-av-blue/30 border border-av-purple/20 rounded-lg px-3 py-2 cursor-pointer hover:border-av-purple/50">
                <div>
                  <div className="text-sm text-white">{potion.label}</div>
                  {potion.note && <div className="text-xs text-gray-500">{potion.note}</div>}
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-av-purple"
                  checked={potions[key as PotionKey]}
                  onChange={(e) => setPotions((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-300">Gamepasses</p>
            {Object.entries(gamepassConfig).map(([key, pass]) => (
              <label key={key} className="flex items-center justify-between bg-av-blue/30 border border-av-purple/20 rounded-lg px-3 py-2 cursor-pointer hover:border-av-purple/50">
                <div>
                  <div className="text-sm text-white">{pass.label}</div>
                  {pass.note && <div className="text-xs text-gray-500">{pass.note}</div>}
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-av-purple"
                  checked={gamepasses[key as GamepassKey]}
                  onChange={(e) => setGamepasses((prev) => ({ ...prev, [key]: e.target.checked }))}
                />
              </label>
            ))}
          </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">Auto-clicks per second</label>
              <NumericField
                value={autoClickRate}
                defaultValue={10}
                min={1}
                step={1}
                onChange={(val) => setAutoClickRate(val)}
              />
              <p className="text-xs text-gray-500 mt-1">Auto-Clicker toggle controls if we use this rate (on) or a 3 cps manual baseline (off).</p>
            </div>
        </div>

        <div className="glass-effect border border-av-purple/20 rounded-2xl p-5 space-y-5 lg:sticky lg:top-28">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Results</h2>
            <span className="text-xs text-av-purple uppercase tracking-[0.12em]">Live</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-av-blue/30 border border-av-purple/20">
              <p className="text-xs text-gray-400">Damage / Click</p>
              <p className="text-2xl font-bold text-white">{Math.round(damagePerClick).toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-av-blue/30 border border-av-purple/20">
              <p className="text-xs text-gray-400">Estimated DPS</p>
              <p className="text-2xl font-bold text-white">{Math.round(estimatedDps).toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-gray-400 mb-1">Target Boss</label>
            <select
              className="w-full rounded-lg bg-av-blue/30 border border-av-purple/30 px-3 py-2 text-white"
              value={bossId}
              onChange={(e) => setBossId(e.target.value)}
            >
              {bossOptions.map((boss) => (
                <option key={boss.id} value={boss.id}>
                  {boss.name} · HP {boss.hp.toLocaleString()}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between bg-av-blue/30 border border-av-purple/20 rounded-lg px-3 py-3">
              <div>
                <p className="text-sm text-white">Time to Kill</p>
                <p className="text-xs text-gray-400">Assuming full uptime, no defense.</p>
              </div>
              <span className="text-lg font-bold text-av-pink">{ttkLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Forge Planner */}
      <section id="forge-planner" className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Fusion Planner</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">3-to-1 Star Planner</h2>
          </div>
        </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <NumericField
                  label="Current Star"
                  value={currentStar}
                  defaultValue={1}
                  min={0}
                  max={5}
                  step={1}
                  onChange={(val) => setCurrentStar(Math.trunc(Math.max(0, val)))}
                />
              </div>
              <div>
                <NumericField
                  label="Target Star"
                  value={targetStar}
                  defaultValue={3}
                  min={1}
                  max={7}
                  step={1}
                  onChange={(val) => setTargetStar(Math.trunc(Math.max(1, val)))}
                />
              </div>
              <div>
                <NumericField
                  label="Owned Items @ Current Star"
                  value={currentCount}
                  defaultValue={0}
                  min={0}
                  step={1}
                  onChange={(val) => setCurrentCount(Math.trunc(Math.max(0, val)))}
                />
              </div>
              <div className="bg-av-blue/30 border border-av-purple/20 rounded-lg px-3 py-3 flex flex-col justify-center">
              <p className="text-xs text-gray-400">Needed @ base tier</p>
              <p className="text-2xl font-bold text-white">{fusionNeeded.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Collect this many base copies to hit your target.</p>
          </div>
        </div>
      </section>

      {/* Code Vault */}
      <section id="code-vault" className="glass-effect border border-av-purple/20 rounded-2xl p-6 lg:p-8 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-av-purple font-semibold">Code Vault</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Active Codes Snapshot</h2>
          </div>
          <Link href="/codes#codes" className="text-av-purple font-semibold hover:text-av-pink text-sm">
            Open codes page →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-av-blue/30 border border-av-purple/20">
            <p className="text-xs text-gray-400">Active Codes</p>
            <p className="text-3xl font-bold text-white">{activeCodes.length}</p>
            <p className="text-xs text-gray-500">Filtered automatically from the code list.</p>
          </div>
          <div className="p-4 rounded-xl bg-av-blue/30 border border-av-purple/20">
            <p className="text-xs text-gray-400">Latest Drops</p>
            <p className="text-sm text-white">
              {latestCodes.length > 0
                ? latestCodes.map((code) => code.code).join(', ')
                : 'No recent codes'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-av-blue/30 border border-av-purple/20">
            <p className="text-xs text-gray-400">Rewards Mood</p>
            <p className="text-sm text-white">
              Focused on potions, reset tokens, and emeralds. Combine with Damage Potion toggle above to preview impact.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-av-purple/20">
          <table className="w-full text-sm text-gray-200">
            <thead className="bg-av-blue/30 text-left text-xs uppercase tracking-[0.12em] text-av-purple">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Rewards</th>
                <th className="px-4 py-3">Added</th>
              </tr>
            </thead>
            <tbody>
              {activeCodes.slice(0, 8).map((code) => (
                <tr key={code.code} className="border-t border-av-purple/10 hover:bg-av-blue/20">
                  <td className="px-4 py-3 font-semibold text-white">{code.code}</td>
                  <td className="px-4 py-3 text-gray-300">{code.rewards}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{code.addedDate ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
