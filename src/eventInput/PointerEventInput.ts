import { InputEventType, ExtendedEvent } from "../types";
import { EventInput, SUPPORT_POINTER } from "./EventInput";

export class PointerEventInput extends EventInput {
	public readonly start = SUPPORT_POINTER ? ["pointerdown"] : ["MSPointerDown"];
	public readonly move = SUPPORT_POINTER ? ["pointermove"] : ["MSPointerMove"];
	public readonly end = SUPPORT_POINTER ? ["pointerup", "pointercancel"] : ["MSPointerUp", "MSPointerCancel"];

	// store first, recent inputs for each event id
	private _firstInputs: PointerEvent[] = [];
	private _recentInputs: PointerEvent[] = [];

	public onEventStart(event: InputEventType): ExtendedEvent {
		this.updatePointerEvent(event as PointerEvent);
		return this.extendEvent(event);
	}

	public onEventMove(event: InputEventType): ExtendedEvent {
		this.updatePointerEvent(event as PointerEvent);
		return this.extendEvent(event);
	}

	public onEventEnd(event: InputEventType): void {
		this.removePointerEvent(event as PointerEvent);
	}

	public getTouches(): number {
		return this._recentInputs.length;
	}

	protected getScale(): number {
		if (this._recentInputs.length !== 2) {
			return null; // TODO: consider calculating non-pinch gesture scale
		}
		return this.getDistance(this._recentInputs[0], this._recentInputs[1]) / this.getDistance(this._firstInputs[0], this._firstInputs[1]);
	}

	protected getCenter(event: PointerEvent): { x: number; y: number; } {
		return {
			x: event.clientX,
			y: event.clientY,
		};
	}

	protected getMovement(event: PointerEvent): { x: number; y: number; } {
		const prev = this.prevEvent.srcEvent as PointerEvent;
		if (event.pointerId !== prev.pointerId) {
			return {
				x: 0,
				y: 0,
			};
		}
		return {
			x: event.pageX - prev.pageX,
			y: event.pageY - prev.pageY,
		};
	}

	private updatePointerEvent(event: PointerEvent) {
		let addFlag = false;
		this._recentInputs.forEach((e, i) => {
			if (e.pointerId === event.pointerId) {
				addFlag = true;
				this._recentInputs[i] = event;
			}
		});
		if (!addFlag) {
			this._firstInputs.push(event);
			this._recentInputs.push(event);
		}
	}

	private removePointerEvent(event: PointerEvent) {
		this._firstInputs = this._firstInputs.filter(x => x.pointerId !== event.pointerId);
		this._recentInputs = this._recentInputs.filter(x => x.pointerId !== event.pointerId);
	}
}
