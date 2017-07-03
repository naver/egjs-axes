export interface IInputType {
	axes: Array<string>;
	subscribe(observer);
	unsubscribe();
	mapAxes(axes: Array<string>);
	OnHold?(inputType: IInputType, event);
	OnChange?(inputType: IInputType, event);
}