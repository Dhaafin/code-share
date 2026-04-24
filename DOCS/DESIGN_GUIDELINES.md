# Apple Aesthetic: Design Guidelines 🍏

This document outlines the design philosophy for the **CodeShot** project, focusing on the "Luxury but Sleek" aesthetic characteristic of macOS.

## 1. Core Principles

### Precision & Consistency
- Every corner radius, border-width, and padding value should be mathematically consistent.
- Avoid "almost" alignments. Use strict grid systems (8px base).

### Vibrancy (Layered Translucency)
- Use `backdrop-filter: blur(20px)` to create depth.
- Surfaces should not be solid colors; they should "pick up" the background colors underneath them.

### Softness & Depth
- Shadows should be multi-layered and extremely diffused.
- Use inner borders (1px white at 10% opacity) to simulate light hitting the edge of a physical object.

---

## 2. Visual Attributes

### Corner Radii
| Element | Radius |
| :--- | :--- |
| Main Code Window | `12px` to `16px` |
| Floating Controls | `10px` |
| Input Fields | `6px` |
| Buttons | `8px` |

### Borders & Outlines
- **Primary Border**: `1px solid rgba(255, 255, 255, 0.1)` (Light) or `rgba(0, 0, 0, 0.1)` (Dark).
- **Glass Outline**: A `1px` high-opacity top border can simulate a "beveled" look.

---

## 3. Typography
- **Primary**: `Inter`, `Geist`, or `SF Pro` (System).
- **Monospace**: `JetBrains Mono` or `SF Mono`.
- **Weight Strategy**: Use `Medium (500)` for titles and `Regular (400)` for content. Avoid `Bold (700)` except for primary CTAs to keep the design "sleek."

---

## 4. Animation Principles
- **Curves**: Always use `cubic-bezier(0.4, 0, 0.2, 1)` or `spring` animations.
- **Duration**: Fast but visible (`200ms` - `300ms`).
- **Scale**: Subtle scaling (e.g., `0.98` on click) for physical feedback.
