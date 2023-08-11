'use client'
//https://codesandbox.io/s/react-pixi-viewport-9ngfd?from-embed=&file=/src/Viewport.tsx:0-995
import React, { MutableRefObject } from "react";
import * as PIXI from "pixi.js";
import BaseViewport, { IClampZoomOptions, Viewport as PixiViewport } from "pixi-viewport";
import { FederatedPointerEvent } from "pixi.js";
import { DragEvent } from "pixi-viewport/dist/types";
import { PixiComponent, useApp } from "@pixi/react";

export interface ViewportProps {
  width: number;
  height: number;
  startingScale?: number;
  refObject?: MutableRefObject<PixiViewport | undefined>
  children?: React.ReactNode;
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application;
  ticker?: PIXI.Ticker;
}

const PixiComponentViewport = PixiComponent("Viewport", {
  //NOTE FOR FUTURE DEVS:
  //This is basically a constructor - the only way to get changes to apply is to get the component to unmount
  //by refreshing the page or some other means
  create: (props: PixiComponentViewportProps) => {
    
    if (!("events" in props.app.renderer))
    //@ts-ignore
      props.app.renderer.addSystem(PIXI.EventSystem, "events");

    //debugger;
    const viewport = new PixiViewport({
      screenWidth: props.width,
      screenHeight: props.height,
      worldWidth: props.width * 2,
      worldHeight: props.height * 2,
      passiveWheel: false,
      
      //ticker: props.app.ticker,
      //ticker: props.app.ticker,
      
      events: props.app.renderer.events,
      //interaction: props.app.renderer.plugins.interaction,
    });

    //Attach Ref
    if(props.refObject){
      //let tempObject = props.refObject.current;
      
      props.refObject.current = viewport;

    }

    return viewport;
  },
  applyProps(instance, oldProps, newProps) {
  },
  willUnmount(instance, parent) {
    instance.destroy();
  },
});

const Viewport = (props: ViewportProps) => {
  const app = useApp();
  //const ticker = useTick();
  return <PixiComponentViewport app={app} {...props} />;
};


export default Viewport;