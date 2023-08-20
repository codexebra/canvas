import { FONT_FAMILY, TEXT_ALIGN, THEME } from '@/constants';

export type FileId = string;
export type ChartType = 'bar' | 'line';
export type FillStyle = 'hachure' | 'cross-hatch' | 'solid' | 'zigzag';
export type FontFamilyKeys = keyof typeof FONT_FAMILY;
export type FontFamilyValues = (typeof FONT_FAMILY)[FontFamilyKeys];
export type Theme = (typeof THEME)[keyof typeof THEME];
export type FontString = string & { _brand: 'fontString' };
export type GroupId = string;
export type PointerType = 'mouse' | 'pen' | 'touch';
export type StrokeRoundness = 'round' | 'sharp';
export type StrokeStyle = 'solid' | 'dashed' | 'dotted';
export type TextAlign = (typeof TEXT_ALIGN)[keyof typeof TEXT_ALIGN];

export type ElementSelection = {
  active?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  // for line elements
  start?: boolean;
  end?: boolean;
};

export type ElementHover = {
  active: boolean;
};

export type ElementBase = {
  id: string;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  selection: ElementSelection;
  hover: ElementHover;
  stackOrder: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: FillStyle;
  strokeWidth: number;
  strokeStyle: StrokeStyle;
  opacity: number;
  width: number;
  height: number;
  angle: number;
  seed: number;
  version: number;
  versionNonce: number;
  isDeleted: boolean;
  groupIds: readonly GroupId[];
  frameId: string | null;
  updated: number;
  link: string | null;
  locked: boolean;
  containerId?: Element['id'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customData?: Record<string, any>;
  type: 'line' | 'frame' | 'text';
};

export type TextElement = {
  fontSize: number;
  fontFamily: FontFamilyValues;
  text: string;
  baseline: number;
  textAlign: TextAlign;
  originalText: string;
  lineHeight: number & { _brand: 'unitlessLineHeight' };
};

export type FrameElement = ElementBase & {
  type: 'frame';
  name: string | null;
};

export type LineElement = ElementBase & {
  type: 'line';
  x2: number;
  y2: number;
};

export type ImageElement = ElementBase & {
  type: 'image';
  fileId: FileId | null;
  status: 'pending' | 'saved' | 'error';
  scale: [number, number];
};

export type Element = ElementBase & LineElement & TextElement;

export type GeneratorOptions = {
  stroke?: string;
};
