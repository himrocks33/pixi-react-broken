'use client'
import { Stage, useApp } from "@pixi/react"
import GridGraphics from "./grid-lines"
import Viewport from "./viewport";



export const StageTest = () => {

    const app = useApp();

    return (
        <Stage style={{/* border: '1px solid black' */ }} width={500} height={500} options={{ backgroundColor: 'grey', antialias: true }}>
            <Viewport 
                height={500}
                width={500}
                startingScale={1}>
                <GridGraphics cameraX={0} cameraY={0} scale={.5} />
            </Viewport>
        </Stage>
    )
}