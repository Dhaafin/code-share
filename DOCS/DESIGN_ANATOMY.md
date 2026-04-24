# Design Anatomy: The macOS Code Window 🖥️

A breakdown of the specific components that make a code snippet look "Apple-esque."

## 1. The Container (The Frame)
- **Background**: Semi-transparent black (`rgba(30, 30, 30, 0.7)`) or white (`rgba(255, 255, 255, 0.7)`).
- **Backdrop Blur**: `20px` to `40px` (Adjust based on background intensity).
- **Shadow**: 
  - `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3)`
  - Optional: A second "diffused" shadow: `0 10px 20px rgba(0, 0, 0, 0.15)`

## 2. The Title Bar (The Header)
- **Traffic Lights**:
  - **Red**: `#FF5F56`
  - **Yellow**: `#FFBD2E`
  - **Green**: `#27C93F`
- **Spacing**: Lights should have `12px` padding from the left edge and be centered vertically.
- **Title**: Centered text, size `12px`, weight `500`, color `rgba(255, 255, 255, 0.5)`.

## 3. The Code Area (The Body)
- **Padding**: Large internal padding (`24px` to `40px`) to give the code "room to breathe."
- **Syntax Highlighting**: Sophisticated palettes like **Vesper**, **GitHub Dark**, or **Minimal Light**.
- **Line Height**: `1.6` for optimal readability.

## 4. The Backdrop (The Stage)
- **Mesh Gradients**: A combination of 3-4 vibrant colors blending into each other.
- **Noise Texture**: A subtle `5%` opacity grain overlay to remove color banding in gradients.
- **AspectRatio**: Keep it flexible, but default to `16:9` or `4:3` for social sharing.

---

## 5. UI Controls (The Sidebar/Toolbar)
- **Visuals**: Frosted glass icons.
- **States**: 
  - **Active**: Blue tint (`#007AFF`).
  - **Hover**: Subtle increase in opacity or slight scale up.
