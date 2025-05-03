# Portfolio

It's me Denzel

## Typography

- **Logo**: Lora  
- **Headings**: Playfair Display  
- **Body Text**: Lato  

# Cosmic Color Scheme 🪐

Perfect for dark purple galaxy-themed interfaces. Designed for readability and harmony with space backgrounds.

## Text Colors

| Element          | Color            | Preview                                                                 |
|------------------|------------------|-------------------------------------------------------------------------|
| Body Text        | `#E0F7FF`        | <span style="color:#E0F7FF;background:#0A0F14;padding:2px 10px;">▉</span> Soft cyan-white |
| Bold Text        | `#00D2FF`        | <span style="color:#00D2FF;background:#0A0F14;padding:2px 10px;">▉</span> Bright cyan |
| Headings         | `#3A7BD5`→`#00D2FF` | <span style="background:linear-gradient(to right, #3A7BD5, #00D2FF);color:transparent;padding:2px 10px;">▉▉</span> Gradient |
| Muted Text       | `#8A9BA8`        | <span style="color:#8A9BA8;background:#0A0F14;padding:2px 10px;">▉</span> Cool gray-blue |

## Interactive Elements

| Element          | Color            | Preview                                                                 |
|------------------|------------------|-------------------------------------------------------------------------|
| Normal Links     | `#A0E7FF`        | <span style="color:#A0E7FF;background:#0A0F14;padding:2px 10px;">▉</span> Light cyan |
| Hover Links      | `#00FFFF`        | <span style="color:#00FFFF;background:#0A0F14;padding:2px 10px;">▉</span> Neon cyan |
| CTA Buttons      | `#00B4D8`        | <span style="color:#0A0F14;background:#00B4D8;padding:2px 10px;">▉</span> Deep cyan |

## CSS Snippet

```css
/* Typography */
body { color: #E0F7FF; }
strong, b { color: #00D2FF; }
h1, h2, h3 { 
  background: linear-gradient(to right, #3A7BD5, #00D2FF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.muted { color: #8A9BA8; }

/* Links */
a { color: #A0E7FF; transition: all 0.3s; }
a:hover { color: #00FFFF; text-shadow: 0 0 8px rgba(0, 255, 255, 0.5); }

/* Buttons */
.cta-button {
  background: #00B4D8;
  color: #0A0F14;
  box-shadow: 0 0 15px rgba(0, 180, 216, 0.5);
}
