# Navigation Emphasis Options for Codes

## Current Implementation (Subtle)
✅ **What's Active Now:**
- Purple text color (instead of gray)
- Bold font weight
- Gradient underline (purple to pink)
- Underline becomes more visible on hover

## Alternative Emphasis Suggestions

### Option 1: Minimal Dot Indicator
```typescript
// Add a small colored dot before the text
<span className="w-1.5 h-1.5 bg-av-pink rounded-full mr-2"></span>
Codes
```
**Effect**: Small pink dot • before "Codes"

---

### Option 2: Subtle Badge
```typescript
// Add a small badge next to text
Codes <span className="ml-1 px-2 py-0.5 bg-av-purple/20 text-av-purple text-xs rounded">New</span>
```
**Effect**: "Codes" with small purple "New" badge

---

### Option 3: Icon Only
```typescript
// Add a gift icon without animations
🎁 Codes
```
**Effect**: Simple gift emoji, no special effects

---

### Option 4: Subtle Background Highlight
```typescript
className="px-3 py-1.5 bg-av-purple/10 rounded-lg hover:bg-av-purple/20"
```
**Effect**: Light purple background, darker on hover

---

### Option 5: Color Gradient Text
```typescript
className="text-gradient-purple-pink"
```
**Effect**: Text itself has gradient color (like the logo)

---

### Option 6: Slightly Larger Text
```typescript
className="text-base lg:text-lg" // Other links are text-sm lg:text-base
```
**Effect**: Just slightly bigger than other links

---

### Option 7: Underline Only
```typescript
className="underline decoration-av-purple decoration-2 underline-offset-4"
```
**Effect**: Purple underline, always visible

---

### Option 8: Border Box
```typescript
className="border border-av-purple/30 px-3 py-1 rounded hover:border-av-purple"
```
**Effect**: Subtle border around the text

---

## Comparison Table

| Option | Subtlety | Visibility | Professional |
|--------|----------|------------|--------------|
| Current (Underline) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Dot Indicator | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| Subtle Badge | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Icon Only | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Background | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Gradient Text | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Larger Text | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Underline Only | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Border Box | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

## Recommendation

For a **professional, subtle emphasis**, I recommend combining:
- **Current underline** (already implemented)
- **+ Optional dot indicator** for extra visibility

This maintains a clean, Apple-like aesthetic while still drawing attention to the Codes section.

## How to Apply Different Options

Edit `/components/Header.tsx` and modify the `isHighlight` block around line 56-67.
