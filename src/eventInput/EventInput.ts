import { ExtendedEvent, InputEventType } from "../types";
import { getAngle } from "../utils";
import { window } from "../browser";

export const SUPPORT_TOUCH = "ontouchstart" in window;
export const SUPPORT_POINTER = "PointerEvent" in window;
export const SUPPORT_MSPOINTER = "MSPointerEvent" in window;
export const SUPPORT_POINTER_EVENTS = SUPPORT_POINTER || SUPPORT_MSPOINTER;

export abstract class EventInput {
	public prevEvent: ExtendedEvent;

	public abstract onEventStart(event: InputEventType): ExtendedEvent;

	public abstract onEventMove(event: InputEventType): ExtendedEvent;

	public abstract onEventEnd(event: InputEventType): void;

	public abstract getTouches(event: InputEventType): number;

	public extendEvent(event: InputEventType): ExtendedEvent {
		const prevEvent = this.prevEvent;
		const center = this.getCenter(event);
		const movement = prevEvent ? this.getMovement(event) : { x: 0, y: 0 };
		const scale = prevEvent ? this.getScale(event) : 1;
		const angle = prevEvent ? getAngle(center.x - prevEvent.center.x, center.y - prevEvent.center.y) : 0;
		const deltaX = prevEvent ? prevEvent.deltaX + movement.x : movement.x;
		const deltaY = prevEvent ? prevEvent.deltaY + movement.y : movement.y;
		const offsetX = prevEvent ? (deltaX - prevEvent.deltaX) : 0;
		const offsetY = prevEvent ? (deltaY - prevEvent.deltaY) : 0;
		const velocityX = prevEvent ? offsetX / (event.timeStamp - prevEvent.srcEvent.timeStamp) : 0;
		const velocityY = prevEvent ? offsetY / (event.timeStamp - prevEvent.srcEvent.timeStamp) : 0;
		return {
			srcEvent: event,
			scale,
			angle,
			center,
			deltaX,
			deltaY,
			offsetX,
			offsetY,
			velocityX,
			velocityY,
			preventSystemEvent: true,
		};
	}

	protected getDistance(start: Touch | PointerEvent, end: Touch | PointerEvent): number {
		const x = end.clientX - start.clientX;
		const y = end.clientY - start.clientY;
		return Math.sqrt((x * x) + (y * y));
	}

	protected abstract getScale(event: InputEventType): number;

	protected abstract getCenter(event: InputEventType): { x: number; y: number; };

	protected abstract getMovement(event: InputEventType): { x: number; y: number; };
}