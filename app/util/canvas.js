import {addText} from 'util/text';
import StackBlur from 'stackblur-canvas';

const canvasComponents = {
  image(ctx, child) {
    drawImage(ctx, child.frame, child.image);
  },
  filter(ctx, child) {
    const {filter} = child;

    if (filter === 'light_contrast' || filter === 'heavy_contrast') {
      const value = filter === 'light_contrast' ? 0.35 : 0.65;
      applyContrast(ctx, child.frame, value);
    }

    if (filter === 'light_blur' || filter === 'heavy_blur') {
      const radius = filter === 'light_blur' ? 15 : 40;
      const [x, y, w, h] = child.frame;
      const scale = window.devicePixelRatio || 1;
      StackBlur.canvasRGB(ctx.canvas, x, y, w*scale, h*scale, radius);
    }
  },
  text(ctx, child) {
    const rect = addText(ctx, child.textAttrs, child.frame, child.text);
    if (child.frame.join(',') !== rect.join(',')) {
      child.onUpdateRect && child.onUpdateRect(rect);
    }
  },
  rect(ctx, child) {
    ctx.fillStyle = child.fill;
    ctx.fillRect(...child.frame);
  },
  outline(ctx, child) {
    ctx.lineWidth = child.width;
    ctx.strokeStyle = child.color;
    ctx.strokeRect(...child.frame);
  },
  line(ctx, child) {
    ctx.strokeStyle = child.color;
    ctx.lineWidth = child.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(...child.from);
    ctx.lineTo(...child.to);
    ctx.stroke();
    ctx.strokeStyle = null;
  }
};

const applyContrast = (ctx, frame, value) => {
  ctx.fillStyle = `rgba(45, 45, 45, ${value})`;
  ctx.fillRect(...frame);
};

const drawImage = (ctx, frame, img) => {
  const canvasWidth = frame[2];
  const canvasHeight = frame[3];

  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;

  const origRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;

  // determine crop
  let zoneWidth, zoneHeight;
  if (canvasRatio >= origRatio) {
    zoneWidth = imgWidth;
    zoneHeight = imgWidth / canvasRatio;
  } else {
    zoneWidth = imgHeight * canvasRatio;
    zoneHeight = imgHeight;
  }

  // center
  const xPad = (imgWidth - zoneWidth) / 2;
  const yPad = (imgHeight - zoneHeight) / 2;

  ctx.drawImage(img, xPad, yPad, zoneWidth, zoneHeight, 0, 0, canvasWidth, canvasHeight);
};

export const renderCanvasLayout = (ctx, layout) => {
  layout.children.forEach(child => {
    if (!child) return;
    const renderer = canvasComponents[child.type];
    if (!renderer) console.error(`Unknown canvas component: ${child.type}`);
    ctx.save();
    renderer(ctx, child);
    ctx.restore();
  });
};
