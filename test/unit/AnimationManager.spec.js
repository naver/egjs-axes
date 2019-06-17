import { AnimationManager } from "../../src/AnimationManager";
import { AxisManager } from "../../src/AxisManager";
import { InterruptManager } from "../../src/InterruptManager";
import { EventManager } from "../../src/EventManager";
import Component from "@egjs/component";
import { map } from "../../src/utils";

describe("AnimationManager", function () {
	describe("method test", function () {
		beforeEach(() => {
			this.axis = {
				x: {
					range: [0, 100],
					bounce: [50, 50],
					circular: false
				},
				y: {
					range: [0, 200],
					bounce: [0, 0],
					circular: false
				},
				z: {
					range: [-100, 200],
					bounce: [50, 0],
					circular: true
				}
			};
			this.options = {
				deceleration: 0.0001,
				maximumDuration: 2000,
				minimumDuration: 0
			};
			this.inst = new AnimationManager({
				options: this.options,
				itm: new InterruptManager(this.options),
				em: new EventManager(null),
				axm: new AxisManager(this.axis, this.options)
			});
		});
		afterEach(() => {
		});

		it("should check 'getDuration' method", () => {
			// Given
			// When
			const depaPos = {
				x: 0,
				y: 0
			};
			const destPos = {
				x: 100,
				y: 50
			};

			// When/Then
			expect(this.inst.getDuration(depaPos, destPos)).to.be.equal(1414.213562373095);

			// When (change option)
			this.options.maximumDuration = 1200;

			// Then
			expect(this.inst.getDuration(depaPos, destPos)).to.be.equal(1200);

			// When/Then
			expect(this.inst.getDuration(depaPos, destPos, 1000)).to.be.equal(1000);

			// When/Then
			expect(this.inst.getDuration(depaPos, destPos, 2000)).to.be.equal(1200);
		});

		it("should check 'createAnimationParam' method", () => {
			// Given
			// When
			const pos = {
				x: 200,
				y: 210,
				z: -155
			};

			// When
			// createAnimationParam does not change the 'pos' param since 2017.10.27
			let param = this.inst.createAnimationParam(pos, 1000);

			// Then
			expect(param.depaPos).to.be.eql({ x: 0, y: 0, z: -100 });
			expect(param.destPos).to.be.eql({ x: 200, y: 210, z: -155 }); // do not change destPos.
			expect(param.duration).to.be.eql(1000);
			expect(param.delta).to.be.eql({ x: 200, y: 210, z: -55 });
			expect(param.inputEvent).to.be.eql(null);
			expect(param.input).to.be.eql(null);

			// When
			this.options.maximumDuration = 500;
			const eventValue = { event: "i'm inputEvent" };
			param = this.inst.createAnimationParam(pos, 1000, {
				event: eventValue
			});

			// Then
			expect(param.depaPos).to.be.eql({ x: 0, y: 0, z: -100 });
			expect(param.destPos).to.be.eql({ x: 200, y: 210, z: -155 });
			expect(param.duration).to.be.eql(500);
			expect(param.delta).to.be.eql({ x: 200, y: 210, z: -55 });
			expect(param.inputEvent).to.be.equal(eventValue);
		});
	});

	describe("animation test", function () {
		beforeEach(() => {
			this.axis = {
				x: {
					range: [0, 100],
					bounce: [50, 50],
					circular: false/*[false, false]*/
				},
				y: {
					range: [0, 200],
					bounce: [0, 0],
					circular: false/*[false, false]*/
				},
				z: {
					range: [-100, 200],
					bounce: [50, 0],
					circular: true/*[true, true]*/
				}
			};
			this.options = {
				easing: function easeOutCubic(x) {
					return 1 - Math.pow(1 - x, 3);
				},
				interruptable: true,
				deceleration: 0.0001,
				minimumDuration: 0,
				maximumDuration: 2000
			};
			this.component = new Component();
			var axm = new AxisManager(this.axis, this.options);
			var em = new EventManager(this.component);
			this.inst = new AnimationManager({
				options: this.options,
				itm: new InterruptManager(this.options),
				em,
				axm
			});
			em.setAnimationManager(this.inst);
		});
		afterEach(() => {
			this.component.off();
		});
		it("should check 'setTo' method(duration: 0)", () => {
			// Given
			const changeHandler = sinon.spy();
			const finishHandler = sinon.spy();
			this.component.on({
				"change": changeHandler,
				"finish": finishHandler,
			});

			// When
			this.inst.setTo({
				x: 100,
				y: 200
			}, 0);

			// Then
			expect(changeHandler.calledOnce).to.be.true;
			expect(finishHandler.calledOnce).to.be.true;
			expect(this.inst.axm.get()).to.be.eql({ x: 100, y: 200, z: -100 });
		});
		it("should check 'setTo' method (outside)", () => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 200,
				z: -155
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy();
			const endHandler = sinon.spy();
			this.component.on({
				"animationStart": startHandler,
				"change": changeHandler,
				"animationEnd": endHandler
			});

			// When
			this.inst.setTo(destPos, 0);

			// Then
			expect(startHandler.called).to.be.false;
			expect(endHandler.called).to.be.false;
			expect(changeHandler.called).to.be.true;
			expect(changeHandler.getCall(0).args[0].isTrusted).to.be.false;
			expect(self.axm.get()).to.be.eql({ x: 100, y: 0, z: 145 });
		});
		it("should check 'setTo' method (outside, duration)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 200,
				z: -155
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy(function (event) {
				expect(event.input).to.be.null;
				expect(event.inputEvent).to.be.null;
				expect(self.getEventInfo()).to.be.null;
			});
			this.component.on({
				"animationStart": startHandler,
				"change": changeHandler,
				"animationEnd": function (event) {
					expect(self.axm.get()).to.be.eql({ x: 100, y: 0, z: 145 });
					expect(startHandler.callCount).to.be.equal(1);
					expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
					expect(changeHandler.called).to.be.true;
					expect(event.isTrusted).to.be.false;
					done();
				}
			});

			// When
			this.inst.setTo(destPos, 1000);
		});

		it("should check 'setTo' method (same position #1)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 0,
				z: -100
			};
			const self = this.inst;
			const changeHandler = sinon.spy();
			this.component.on({
				"change": changeHandler,
			});

			// When
			const ret = this.inst.setTo(destPos);

			// Then
			setTimeout(() => {
				expect(changeHandler.called).to.be.false;
				expect(ret).to.be.eq(self);
				done();
			}, 100);
		});

		it("should check 'setTo' method (same position #2 - completely same)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 0,
				z: -100
			};
			const self = this.inst;
			const changeHandler = sinon.spy();
			this.component.on({
				"change": changeHandler,
			});

			// When
			const ret = this.inst.setTo(destPos);

			// Then
			setTimeout(() => {
				expect(changeHandler.called).to.be.false;
				expect(ret).to.be.eq(self);
				done();
			}, 100);
		});

		it("should check 'setTo' method (circular, no duration)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = { z: -200 };
			const self = this.inst;
			const changeHandler = sinon.spy(function (event) {
				// Then
				expect(self.axm.get()).to.be.eql({ x: 0, y: 0, z: 100 });
				done();
			});
			this.component.on({
				"change": changeHandler,
			});

			// When
			const ret = this.inst.setTo(destPos, 0, true);
		});

		it("should check 'setTo' method (same position after range limit, useCircular)", (done) => {
			// Given
			// depaPos: {x: 0, y: 0, z: -100}
			const destPos = { x: -100, z: 500 };
			const self = this.inst;
			const changeHandler = sinon.spy();
			this.component.on({
				"change": changeHandler,
			});

			// When
			const ret = this.inst.setTo(destPos, 0); // last (useCircular) param makes invalidating z-pos change(500)

			// Then
			setTimeout(() => {
				expect(self.axm.get()).to.be.eql({ x: 0, y: 0, z: -100 });
				expect(changeHandler.callCount).to.be.equals(1);
				expect(changeHandler.args[0][0].delta).to.be.eql({ x: 0, y: 0, z: 600 });
				expect(ret).to.be.eq(self);
				done();
			}, 100);
		});

		it("should check 'setTo' method (diff position after range limit)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = { x: -100, z: 450 };
			const self = this.inst;
			const changeHandler = sinon.spy(function (event) {
				// Then
				expect(self.axm.get()).to.be.eql({ x: 0, y: 0, z: 150 });
				done();
			});
			this.component.on({
				"change": changeHandler,
			});

			// When
			const ret = this.inst.setTo(destPos);
		});

		it("should check 'setBy' method (inside, duration)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const byPos = {
				x: 20,
				z: 40
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy(function (event) {
				expect(event.input).to.be.null;
				expect(event.inputEvent).to.be.null;
				expect(self.getEventInfo()).to.be.null;
			});
			this.component.on({
				"animationStart": startHandler,
				"change": changeHandler,
				"animationEnd": function (event) {
					expect(self.axm.get()).to.be.eql({ x: depaPos.x + byPos.x, y: 0, z: depaPos.z + byPos.z });
					expect(startHandler.callCount).to.be.equal(1);
					expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
					expect(changeHandler.called).to.be.true;
					expect(event.isTrusted).to.be.false;
					done();
				}
			});

			// When
			this.inst.setBy(byPos, 1000);
		});
		it("should check 'setBy' method (outside, duration)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const minZ = this.axis.z.range[0];
			const rangeLength = this.axis.z.range[1] - this.axis.z.range[0];
			const byPos = {
				x: 200,
				z: 500
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy(function (event) {
				// console.log("change handler", self.axm.get());
				expect(event.input).to.be.null;
				expect(event.inputEvent).to.be.null;
				expect(self.getEventInfo()).to.be.null;
			});
			this.component.on({
				"animationStart": startHandler,
				"change": changeHandler,
				"animationEnd": function (event) {
					expect(self.axm.get()).to.be.eql({ x: 100, y: 0, z: 100 });
					expect(startHandler.callCount).to.be.equal(1);
					expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
					expect(changeHandler.called).to.be.true;
					expect(event.isTrusted).to.be.false;
					done();
				}
			});

			// When
			this.inst.setBy(byPos, 1000);
		});
		it("should check 'animateTo' method (inside)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 90,
				z: -80
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy(function (event) {
				expect(event.input).to.be.null;
				expect(event.inputEvent).to.be.null;
				expect(self.getEventInfo()).to.be.null;
			});
			this.component.on({
				"animationStart": startHandler,
				"change": changeHandler,
				"animationEnd": function (event) {
					expect(self.axm.get()).to.be.eql({ x: 90, y: 0, z: -80 });
					expect(startHandler.callCount).to.be.equal(1);
					expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
					expect(changeHandler.called).to.be.true;
					expect(event.isTrusted).to.be.false;
					done();
				}
			});

			// When
			this.inst.setTo(destPos, 500);
		});
		it("should check 'animateTo' method (outside)", (done) => {
			// Given
			const depaPos = this.inst.axm.get();
			const destPos = {
				x: 200,
				z: -155
			};
			const self = this.inst;
			const startHandler = sinon.spy();
			const endHandler = sinon.spy(function (event) {
				if (endHandler.callCount === 1) {
					// first destPos
					expect(self.axm.get()).to.be.eql({ x: 200, y: 0, z: 145 });
					expect(startHandler.callCount).to.be.equal(1);
					expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
					expect(event.isTrusted).to.be.false;
				} else if (endHandler.callCount === 2) {
					// Then
					expect(self.axm.get()).to.be.eql({ x: 100, y: 0, z: 145 });
					expect(startHandler.getCall(1).args[0].isTrusted).to.be.false;
					expect(startHandler.callCount).to.be.equal(2);
					expect(event.isTrusted).to.be.false;
					done();
				}
			});
			this.component.on({
				"animationStart": startHandler,
				"animationEnd": endHandler
			});

			// When
			this.inst.animateTo(destPos, 1000);
		});
		it("should check 'animateTo' with destPos that can cause floating point", (done) => {
			// circular: true,
			// duration: 102
			// depaPos: 729.5859375
			// destPos: 1055.984375
			// range: [-96, 1055.984375]

			// Given
			this.inst.axm.axis.z.range = [-96, 1055.984375];
			this.inst.setTo({ z: 729.5858375 }, 0);

			// When
			this.inst.animateTo({ z: 1055.984375 }, 102);

			setTimeout(() => {
				// Then
				expect(this.inst.axm.get().z).to.be.equals(1055.984375);
				done();
			}, 200);
		});
		it("should check position when animation is running. then, start other animation", (done) => {
			// Given
			const startHandler = sinon.spy();
			const changeHandler = sinon.spy();
			const endHandler = sinon.spy();
			this.component.on({
				"change": changeHandler,
				"animationStart": startHandler,
				"animationEnd": endHandler
			});

			// When
			this.inst.setTo({ x: 80, y: 150 }, 200);

			// Then
			setTimeout(() => {
				expect(startHandler.calledOnce).to.be.true;
				expect(changeHandler.called).to.be.true;
				expect(endHandler.called).to.be.false;

				// When
				this.inst.setTo({ x: 0, y: 0 }, 300);
				expect(this.inst.axm.get()).to.not.eql({ x: 80, y: 150, z: -100 });
			}, 100);
			setTimeout(() => {
				expect(startHandler.calledTwice).to.be.true;
				expect(changeHandler.called).to.be.true;
				expect(endHandler.calledTwice).to.be.true;
				const result = this.inst.axm.get();

				expect(result.x).to.be.equal(0);
				expect(result.y).to.be.equal(0);
				expect(result.z).to.be.equal(-100);
				done();
			}, 500);
		});
		[1, -1].forEach(direction => {
			it(`should check destPos when range changes dynamically during animateLoop(direction: ${direction}, circular: true)`, (done) => {
				// Given
				const depaPos = { z: -100 };
				const destPos = direction > 0 ? { z: 600 } : { z: -600 };
				const resultPos = direction > 0 ? { z: 300 } : { z: 0 };

				// When
				setTimeout(() => {
					// the right time for a range to be crossed
					// 'pos' is off the range.
					// z.range[1] 200 => 600
					this.axis.z.range[1] = 600;
				}, 300)

				this.inst.animateLoop({
					duration: 1000,
					depaPos,
					destPos,
					delta: { z: destPos.z - depaPos.z },
				}, () => {
					// Then
					expect(this.inst.axm.get(["z"]).z).to.be.equals(resultPos.z);
					done();
				});
			});
			it(`should check destPos when range changes dynamically during animateLoop and change(direction: ${direction}, circular: true)`, (done) => {
				// Given
				const depaPos = { z: -100 };
				const destPos = direction > 0 ? { z: 600 } : { z: -600 };
				const resultPos = direction > 0 ? { z: 300 } : { z: 0 };

				// When
				let willChange = false;
				setTimeout(() => {
					// Starts with the exception of -100, which is the start position.
					this.component.on("change", e => {
						if (
							// range[0] = -100
							(direction === -1 && e.pos.z < -80)
							// range[1] = 200
							|| (direction === 1 && e.pos.z > 180)
						) {
							willChange = true;
						} else if (willChange) {
							this.axis.z.range[1] = 600;
						}
					});
				}, 100);

				this.inst.animateLoop({
					duration: 1000,
					depaPos,
					destPos,
					delta: { z: destPos.z - depaPos.z },
				}, () => {
					// Then
					expect(this.inst.axm.get(["z"]).z).to.be.equals(resultPos.z);
					done();
				});
			});
		});
	});
});
