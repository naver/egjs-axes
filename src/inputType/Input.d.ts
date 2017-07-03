export interface InputType {
	subscribe(observer);
	unsubscribe();
	mapAxes(axes: Array<string>);
	OnHold?(inputType:InputType, event);
	OnChange?(inputType:InputType, event);
}