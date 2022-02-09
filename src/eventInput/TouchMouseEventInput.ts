import { InputEventType, ExtendedEvent } from "../types";
import { EventInput } from "./EventInput";

export class TouchMouseEventInput extends EventInput {
	public readonly start = ["mousedown", "touchstart"];
	public readonly move = ["mousemove", "touchmove"];
	public readonly end = ["mouseup", "touchend", "touchcancel"];

	private _firstTouch: TouchEvent;

	public onEventStart(event: InputEventType): ExtendedEvent {
		this._firstTouch = event instanceof TouchEvent ? event : null;
		return this.extendEvent(event);
	}

	public onEventMove(event: InputEventType): ExtendedEvent {
		return this.extendEvent(event);
	}

	public onEventEnd(): void {
	}

	public getTouches(event: InputEventType): number {
		return event instanceof TouchEvent ? event.touches.length : 0;
	}

	protected getScale(event: MouseEvent | TouchEvent): number {
		if (!this._firstTouch || (event instanceof TouchEvent && event.touches.length !== 2)) {
			return 1; // TODO: consider calculating non-pinch gesture scale
		}
		return event instanceof TouchEvent ? this.getDistance(event.touches[0], event.touches[1]) / this.getDistance(this._firstTouch.touches[0], this._firstTouch.touches[1]) : this.prevEvent.scale;
	}

	protected getCenter(event: MouseEvent | TouchEvent): { x: number; y: number; } {
		return event instanceof TouchEvent ? {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY,
		} : {
			x: event.clientX,
			y: event.clientY,
		};
	}

	protected getMovement(event: MouseEvent | TouchEvent): { x: number; y: number; } {
		const prev = this.prevEvent.srcEvent;
		const [nextSpot, prevSpot] = [event, prev].map(e => {
			return {
				id: e instanceof TouchEvent ? e.touches[0].identifier : null,
				x: e instanceof TouchEvent ? e.touches[0].pageX : e.pageX,
				y: e instanceof TouchEvent ? e.touches[0].pageY : e.pageY,
			};
		});
		return nextSpot.id === prevSpot.id ? {
			x: nextSpot.x - prevSpot.x,
			y: nextSpot.y - prevSpot.y,
		} : {
			x: 0,
			y: 0,
		};
	}
}
