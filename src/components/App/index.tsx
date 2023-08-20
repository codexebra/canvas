/* eslint-disable react-hooks/exhaustive-deps */
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { useIsMounted } from 'usehooks-ts';

import { useDefineCanvasProps } from '@/hooks/useDefineCanvasProps';
import { useRenderScene } from '@/hooks/useRenderScene';

import { CursorContext } from '@/components/CursorContext';

import {
  actionType_canvasAtom,
  cursorType_canvasAtom,
  height_canvasAtom,
  isDrawing_canvasAtom,
  isMoving_canvasAtom,
  width_canvasAtom,
} from '@/store/canvas';
import { previousEvent_eventsAtom } from '@/store/events';
import {
  activeElement_sceneAtom,
  elements_sceneAtom,
  selectedElement_sceneAtom,
} from '@/store/scene';
import { activeTool_toolAtom } from '@/store/tools';

import {
  onCanvasPointerDown,
  onCanvasPointerMove,
  onCanvasPointerUp,
} from '@/utils/events';

import { CanvasProps } from '@/types/Canvas';
import { OnCanvasEventProps, OnCanvasEventResp } from '@/types/Events';

export const App: React.FC<CanvasProps> = () => {
  const container =
    typeof window !== 'undefined'
      ? window.document.getElementById('main-canvas')
      : null;

  const [activeTool, setActiveTool] = useAtom(activeTool_toolAtom);
  // ref
  const { ref } = useDefineCanvasProps(container);
  const isMounted = useIsMounted()();
  // canvas atoms
  const width = useAtomValue(width_canvasAtom);
  const height = useAtomValue(height_canvasAtom);
  const [isDrawing, setIsDrawing] = useAtom(isDrawing_canvasAtom);
  const [action, setAction] = useAtom(actionType_canvasAtom);
  const moving = useAtom(isMoving_canvasAtom);
  const [previousEvent, setPreviousEvent] = useAtom(previousEvent_eventsAtom);
  // scene atoms
  const [elements, setElements] = useAtom(elements_sceneAtom);
  const [selectedElementId, setSelectedElemendId] = useAtom(
    selectedElement_sceneAtom
  );
  const [activeElementId, setActiveElementId] = useAtom(
    activeElement_sceneAtom
  );

  const setCursor = useSetAtom(cursorType_canvasAtom);

  const canvas = React.useMemo(() => ref.current, [isMounted, ref]);
  const context = React.useMemo(
    () => ref.current?.getContext('2d'),
    [isMounted, ref]
  );

  useRenderScene(elements, canvas, context);

  const setState = async (actions: OnCanvasEventResp) => {
    actions?.forEach(async (res) => {
      if (res && res.type) {
        if (res.type == 'add_element') {
          setActiveElementId(res.options?.id);
          setElements({
            ...elements,
            [res.options?.id]: res.options?.element,
          });
        }
        if (res.type === 'set_selected_element') {
          setSelectedElemendId(res.options?.id);
        }
        if (res.type === 'remove_selected_element') {
          setActiveElementId(null);
        }
        if (res.type == 'remove_element') {
          const updatedElements = elements;
          delete updatedElements[res.options?.id];
          setElements({ ...updatedElements });
        }
        if (res.type === 'change_to_selection') {
          setActiveTool({ type: 'selection' });
        }
        if (res.type === 'update_elements') {
          setElements({ ...res.options?.elements });
        }
        if (res.type === 'set_cursor') {
          setCursor(res.options?.cursorType);
        }
        if (res.type === 'set_action') {
          setAction(res.options?.value);
        }
      }
    });
  };

  const eventOptions: Partial<OnCanvasEventProps> = React.useMemo(() => {
    return {
      canvas,
      context,
      tool: activeTool,
      action,
      elements,
      setCursor,
      activeElement: elements[activeElementId ?? ''],
      selectedElement: elements[selectedElementId ?? ''],
      setState: setState,
      previousEvent,
      moveState: moving,
    };
  }, [
    canvas,
    context,
    activeTool,
    action,
    isDrawing,
    setIsDrawing,
    elements,
    activeElementId,
    selectedElementId,
    setState,
    setCursor,
    previousEvent,
    moving,
  ]);

  const onPointerDown = async (event: React.PointerEvent) => {
    await onCanvasPointerDown({
      event,
      ...eventOptions,
      elements,
    } as OnCanvasEventProps);
    await setPreviousEvent(event.type);
  };

  const onPointerUp = async (event: React.PointerEvent) => {
    await onCanvasPointerUp({
      event,
      ...eventOptions,
      elements,
    } as OnCanvasEventProps);
    await setPreviousEvent(event.type);
  };

  const onPointerMove = async (event: React.PointerEvent) => {
    await onCanvasPointerMove({
      event,
      ...eventOptions,
      elements,
    } as OnCanvasEventProps);
    await setPreviousEvent(event.type);
  };

  return (
    <CursorContext>
      <div id='main-canvas' className='relative h-[100vh] w-[100vw]'>
        <div className='absolute left-[10px] top-[10px] h-[calc(100vh-20px)]'>
          <button
            onClick={() => setActiveTool({ type: 'line' })}
            className={`${activeTool.type === 'line' && 'bg-red-500'}`}
          >
            Line
          </button>
          <button
            onClick={() => setActiveTool({ type: 'selection' })}
            className={`${activeTool.type === 'selection' && 'bg-red-500'}`}
          >
            Selection
          </button>
        </div>
        <canvas
          className='xrn__canvas'
          style={{ width, height }}
          width={width}
          height={height}
          ref={ref}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          // onContextMenu={(event: React.PointerEvent<HTMLCanvasElement>) =>
          //   this.handleCanvasContextMenu(event)
          // }
          // onDoubleClick={this.handleCanvasDoubleClick}
          // onPointerCancel={this.removePointer}
          // onTouchMove={this.handleTouchMove}
        ></canvas>
      </div>
    </CursorContext>
  );
};
