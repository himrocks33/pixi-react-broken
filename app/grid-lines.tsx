'use client'
import { ComponentProps, FC, useCallback } from 'react';
import { Graphics, useApp } from '@pixi/react';

export type DrawGraphicsType = NonNullable<ComponentProps<typeof Graphics>['draw']>;

export type GridGraphicsProps = {
    cameraX: number;
    cameraY: number;
    scale: number;
}

const line_width = 1;

export const GridGraphics: FC<GridGraphicsProps> = (props) => {

    const { cameraX, cameraY, scale } = props;

    const pixiApp = useApp();

    const drawGridLines = useCallback<DrawGraphicsType>((g) => {
        g.clear()

        const height = pixiApp.renderer.height,
            width = pixiApp.renderer.width
        let spacing = 12 * scale;

        while (spacing < 10) {
            spacing *= 5;
        }

        while (spacing > 100) {
            spacing /= 5;
        }

        const startX = mod(cameraX, spacing),
            startY = mod(cameraY, spacing),
            nx = -Math.floor(cameraX / spacing),
            ny = -Math.floor(cameraY / spacing);

        // Vertical lines
        for (let x = startX, n = 0; x <= width; x += spacing, n++) {
            g.moveTo(x, 0).
                lineStyle(line_width, 'red');

            // If this is _not_ a multiple of 5
            if (mod(n + nx, 5)) {
                g.lineTo(x, height);
            } else {
                g.lineStyle(line_width, 'blue');
                g.lineTo(x, height);
                g.lineStyle(line_width, 'red');
            }
        }

        // Horizontal lines
        for (let y = startY, n = 0; y <= height; y += spacing, n++) {
            g.moveTo(0, y).
                lineStyle(line_width, 'red');

            // If this is _not_ a multiple of 5
            if (mod(n + ny, 5)) {
                g.lineTo(width, y);
            } else {
                g.lineStyle(line_width, 'blue');
                g.lineTo(width, y);
                g.lineStyle(line_width,);
            }
        }

    }, [cameraX, cameraY, scale, pixiApp.renderer.width, pixiApp.renderer.height]);

    return (
        <Graphics  draw={drawGridLines} />
    )
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
};

export default GridGraphics;