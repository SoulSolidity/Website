export interface Point {
    x: number;
    y: number;
}

export interface LightningBoltProps {
    canvasWidth: number;
    canvasHeight: number;
    clickX?: number;
}

export interface LightningBoltState {
    x: number;
    y: number;
    progress: number;
    size: number;
    opacity: number;
    points: Point[];
    fadeSpeed: number;
    startTime: number;
    width: number;
    canvasHeight: number;
}

export function createLightningBolt({ canvasWidth, canvasHeight, clickX }: LightningBoltProps): LightningBoltState {
    const points: Point[] = [];
    let currentY = 0;
    const segments = 12 + Math.floor(Math.random() * 6);
    const height = canvasHeight * (0.5 + Math.random() * 0.5);
    const segmentSize = height / segments;
    
    for (let i = 0; i <= segments; i++) {
        const spread = Math.min(300, segmentSize);
        points.push({
            x: (Math.random() - 0.5) * spread,
            y: currentY
        });
        currentY += segmentSize * (0.7 + Math.random() * 0.6);
    }

    return {
        progress: 0,
        size: 200 + Math.random() * 400,
        opacity: 0.9 + Math.random() * 0.1,
        x: clickX ?? Math.random() * canvasWidth,
        y: -50,
        fadeSpeed: 0.01 + Math.random() * 0.01,
        startTime: performance.now(),
        width: 4 + Math.random() * 3,
        canvasHeight,
        points
    };
}

export function updateLightningBolt(bolt: LightningBoltState, currentTime: number): LightningBoltState {
    if (currentTime < bolt.startTime) return bolt;

    const timeSinceStart = (currentTime - bolt.startTime) / 1000; // Convert to seconds
    const fadeStartTime = 0.3; // Start fading after 0.3 seconds
    const fadeDuration = 1.0; // Take 1 second to fade out

    if (timeSinceStart < fadeStartTime) {
        // Initial phase - growing
        return {
            ...bolt,
            progress: Math.min(1, bolt.progress + 0.2)
        };
    } else {
        // Fading phase
        const fadeProgress = Math.min(1, (timeSinceStart - fadeStartTime) / fadeDuration);
        return {
            ...bolt,
            progress: 1,
            opacity: bolt.opacity * (1 - fadeProgress)
        };
    }
}

export function drawLightningBolt(ctx: CanvasRenderingContext2D, bolt: LightningBoltState): void {
    ctx.save();
    ctx.translate(bolt.x, bolt.y);

    const gradient = ctx.createLinearGradient(0, 0, 0, bolt.points[bolt.points.length - 1].y);
    gradient.addColorStop(0, `rgba(255, 255, 150, ${bolt.opacity * bolt.progress})`);
    gradient.addColorStop(0.5, `rgba(255, 255, 0, ${bolt.opacity * bolt.progress})`);
    gradient.addColorStop(1, `rgba(255, 220, 0, ${bolt.opacity * bolt.progress})`);

    ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
    ctx.shadowBlur = 30;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = bolt.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
    
    for (let i = 1; i < bolt.points.length; i++) {
        const progress = Math.min(1, bolt.progress * (bolt.points.length / (i + 0.5)));
        if (progress > 0) {
            ctx.lineTo(
                bolt.points[i].x,
                bolt.points[i].y * progress
            );
        }
    }
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.lineWidth = bolt.width * 0.6;
    ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity * bolt.progress * 1.5})`;
    ctx.stroke();

    ctx.restore();
} 