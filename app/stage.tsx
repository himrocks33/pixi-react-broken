'use client'
import { Stage } from "@pixi/react"
import GridGraphics from "./grid-lines"



export const StageTest = () => {

    return (
        <Stage style={{/* border: '1px solid black' */ }} width={500} height={500} options={{ backgroundColor: 'grey', antialias: true }}>
            <GridGraphics cameraX={0} cameraY={0} scale={.5} />
        </Stage>
    )
}