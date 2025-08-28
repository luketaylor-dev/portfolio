# Media Files

This folder contains all the media assets for your portfolio website.

## Folder Structure

### `/images/`

- **Project screenshots** (e.g., `dialogue-system-interface.png`)
- **Game screenshots** (e.g., `poker-game-screenshot.png`)
- **UI mockups** and design work
- **Any other static images**

### `/videos/`

- **EEG visualizer demos** (e.g., `eeg-visualizer-demo.mp4`)
- **Game gameplay videos** (e.g., `vr-office-demo.mp4`)
- **Project walkthroughs** and tutorials
- **Any video content**

### `/avatars/`

- **Profile pictures** of yourself
- **Professional headshots**
- **Any personal branding images**

### `/icons/`

- **Custom icons** for projects
- **Brand logos** and symbols
- **UI elements** and graphics

## How to Use

### In React Components:

```tsx
import Image from 'next/image'

// Images
<Image
  src="/images/dialogue-system.png"
  alt="Dialogue System Interface"
  width={800}
  height={600}
/>

// Videos
<video src="/videos/eeg-visualizer.mp4" controls />

// Icons
<img src="/icons/brain-icon.svg" alt="Brain Icon" />
```

### In MDX Content:

```mdx
![Dialogue System Interface](/images/dialogue-system.png)

<video src="/videos/eeg-visualizer.mp4" controls />
```

## File Naming Conventions

- Use **kebab-case** for file names
- Include **descriptive names** (e.g., `dialogue-system-node-editor.png`)
- Use **appropriate formats**:
  - Images: `.png`, `.jpg`, `.webp`
  - Videos: `.mp4`, `.webm`
  - Icons: `.svg`, `.png`

## Optimization Tips

- **Images**: Use Next.js Image component for automatic optimization
- **Videos**: Keep file sizes reasonable for web delivery
- **Icons**: Prefer SVG for scalable graphics
- **Compression**: Optimize files before uploading
