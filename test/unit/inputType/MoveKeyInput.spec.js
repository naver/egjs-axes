import TestHelper from "./TestHelper";
import Axes from "../../../src/Axes.ts";
import {MoveKeyInput,
  KEY_A, KEY_D, KEY_DOWN_ARROW, KEY_TOP_ARROW, KEY_LEFT_ARROW,
  KEY_RIGHT_ARROW, KEY_S, KEY_UP_ARROW, KEY_W} from "../../../src/inputType/MoveKeyInput";
import {UNIQUEKEY} from "../../../src/inputType/InputType";

describe("MoveKeyInput", () => {
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new MoveKeyInput(sandbox());
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    it("should check status after disconnect", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.disconnect();

      // Then
      expect(this.observer).to.be.not.exist;
      expect(this.inst.element).to.be.exist;
      expect(this._timer).to.be.not.exist;
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      expect(this._timer).to.be.not.exist;
      this.inst = null;
    });
  });
  describe("enable/disable", function() {
    beforeEach(() => {
      this.el = sandbox();
      this.inst = new MoveKeyInput(this.el);
      this.inst.mapAxes(["x", "y"]);
      this.observer = {
        release() {},
        hold() {},
        change() {},
        options: {
          deceleration: 0.0001
        }
      };
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check value of `enable/disalbe` methods", () => {
      // Given
      // When
      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When
      this.inst.disable();

      // Then
      expect(this.inst.isEnable()).to.be.false;

      // When
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;

      // When (after connection)
      this.inst.connect(this.observer);
      this.inst.enable();

      // Then
      expect(this.inst.isEnable()).to.be.true;
    }); 
  });

  describe("No axes keydown event test", function() {
    beforeEach(() => {
      this.elBody = sandbox();
      this.el = document.createElement("div");
      this.elBody.appendChild(this.el);

      this.input = new MoveKeyInput(this.el); 
      this.inst = new Axes({
        x: {
            range: [10, 120]
        },
        y: {
            range: [10, 120]
        }
      });
    });

    afterEach(() => {
      if (this.ins) {
        this.inst.destroy();
        this.inst = null;
      }
      if (this.input) {
        this.input.destroy();
        this.input = null;
      }
      cleanup();
    });

    it("no event triggering when connet no axes(Left, Right)", (done) => {
      const change = sinon.spy();
      this.inst.connect([], this.input);
      this.inst.on("change", change);
      TestHelper.key(this.el, "keydown", {keyCode: KEY_RIGHT_ARROW}, () => {
        expect(change.calledOnce).to.be.false;
        done();
      });
    });
    it("no event triggering when connet no axes(Top, Bottom)", (done) => {
      const change = sinon.spy();
      this.inst.connect([], this.input);
      this.inst.on("change", change);
      TestHelper.key(this.el, "keydown", {keyCode: KEY_TOP_ARROW}, () => {
        expect(change.calledOnce).to.be.false;
        done();
      });
    });
  });
  describe("Keydown event test", function() {
    beforeEach(() => {
      this.elBody = sandbox();
      this.el = document.createElement("div");
      this.elBody.appendChild(this.el);

      this.input = new MoveKeyInput(this.el); 
      this.inst = new Axes({
        x: {
            range: [10, 120]
        },
        y: {
            range: [10, 120]
        }
      });

      this.inst.connect(["x", "y"], this.input);
    });

    afterEach(() => {
      if (this.ins) {
        this.inst.destroy();
        this.inst = null;
      }
      if (this.input) {
        this.input.destroy();
        this.input = null;
      }
      cleanup();
    });

    it("no event triggering when disconnected", (done) => {
        // Given
        const rightArrayKeyCode = {keyCode: KEY_RIGHT_ARROW};
        let changeTriggered = false;

        this.inst
        .on("change", () => {
            changeTriggered = true;
        });
        this.inst.disconnect();

        // When
        TestHelper.key(this.el, "keydown", rightArrayKeyCode, () => {
            // Then
            expect(changeTriggered).to.be.false;
            done();
	    });
    });

    it("no event triggering when pressed is not move key", (done) => {
      // Given
      const bKeyCode = 66;
      let changeTriggered = false;

      this.inst
      .on("change", () => {
        changeTriggered = true;
      });

      // When
      TestHelper.key(this.el, "keydown", bKeyCode, () => {
        // Then
        expect(changeTriggered).to.be.false;
        done();
      });
      
    });

    // left
    [KEY_LEFT_ARROW, KEY_A].forEach((keyCode, idx) => {
        it("should trigger 'change' event to left(keyCode: "+keyCode+")", (done) => {
            // Given
            let changeTriggered = false;
            let deltaX = 0;
            const leftKeyCode = {
                keyCode: keyCode
            };
            this.input.options.scale[0] = -1;
            this.inst
            .on("change", (e) => {
              deltaX = e.delta.x;
              changeTriggered = true;
            });

            // When
            TestHelper.key(this.el, "keydown", leftKeyCode);

            // Then
            expect(changeTriggered).to.be.true;
            expect(deltaX).to.be.equal(1);
            done();
        });
    });

    // right
    [KEY_RIGHT_ARROW, KEY_D].forEach((keyCode, idx) => {
        it("should trigger 'change' event to right(keyCode: "+keyCode+")", done => {
            // Given
            let changeTriggered = false;
            let deltaX = 0;
            const rightKeyCode = {
                keyCode: keyCode
            };
            const change = sinon.spy(e => {
              deltaX = e.delta.x;
              changeTriggered = true;
              expect(deltaX).to.be.equal(1);
              this.inst.off("change");
            })
            const hold = sinon.spy();

            this.inst.on("hold", hold);
            this.inst.on("change", change);

            // When / Then
            expect(this.input._isHolded).to.be.false;
            TestHelper.key(this.el, "keydown", rightKeyCode, e => {
              expect(this.input._isHolded).to.be.true;
              expect(hold.callCount).to.be.equal(1);

                // Then
              expect(change.calledOnce).to.be.true;
              

              TestHelper.key(this.el, "keydown", rightKeyCode, e => {
                expect(this.input._isHolded).to.be.true;
                expect(hold.callCount).to.be.equal(1);
                done();
              });
            });
        });
    });

    // up
    [KEY_UP_ARROW, KEY_W].forEach((keyCode, idx) => {
        it("should trigger 'change' event to up("+keyCode+")", (done) => {
            // Given
            let changeTriggered = false;
            let deltaY = 0;
            const upKeyCode = {
                keyCode: keyCode
            };
            const change = sinon.spy(e => {
              deltaY = e.delta.y;
              changeTriggered = true;
              expect(deltaY).to.be.equal(1);
              this.inst.off("change");
            })
            const hold = sinon.spy();

            this.inst.on("hold", hold);
            this.inst.on("change", change);

            expect(this.input._isHolded).to.be.false;
            // When
            TestHelper.key(this.el, "keydown", upKeyCode, e => {
              expect(this.input._isHolded).to.be.true;
              expect(hold.callCount).to.be.equal(1);

                // Then
              expect(change.calledOnce).to.be.true;
              

              TestHelper.key(this.el, "keydown", upKeyCode, e => {
                expect(this.input._isHolded).to.be.true;
                expect(hold.callCount).to.be.equal(1);
                done();
              });
            });

        });
    });

    // down
    [KEY_DOWN_ARROW, KEY_S].forEach((keyCode, idx) => {
        it("should trigger 'change' event to down("+keyCode+")", () => {
            // Given
            let changeTriggered = false;
            let deltaY = 0;
            this.inst
            .on("change", (e) => {
                deltaY = e.delta.y;
                changeTriggered = true;
            });
            const downKeyCode = {
                keyCode: keyCode
            };
            this.input.options.scale[1] = -1;
            
            // When
            TestHelper.key(this.el, "keydown", downKeyCode);

            // Then
            expect(changeTriggered).to.be.true;
            expect(deltaY).to.be.equal(1);
        });
    });
    // down
    [1, 2, 3, 4].forEach((keyCode, idx) => {
      it("should not trigger 'change' event to down wrong keyCode("+keyCode+")", done => {
          // Given
          let changeTriggered = false;
          let deltaY = 0;
          const changeHandler = sinon.spy();
          const holdHandler = sinon.spy();
          const releaseHandler = sinon.spy();
          const downKeyCode = {
              keyCode: keyCode
          };
          

          this.inst.on("hold", holdHandler);
          this.inst.on("change", changeHandler);
          this.inst.on("release", releaseHandler);
          
          // When
          TestHelper.key(this.el, "keydown", downKeyCode);

          // Then
          expect(changeHandler.calledOnce).to.be.false;
          expect(holdHandler.calledOnce).to.be.false;
          setTimeout(() => {
            TestHelper.key(this.el, "keyup", downKeyCode);
            expect(releaseHandler.calledOnce).to.be.false;
            done();
          }, 100);
      });
      it("triggering order test to down wrong keyCode("+keyCode+")", (done) => {
        // Given
        const deltaY = 1;
        const eventLog = [];
        const eventLogAnswer = ["hold", "change", "release"];

        this.inst
        .on("hold", () => {
          eventLog.push("hold");
        }).on("change", () => {
          eventLog.push("change");
        }).on("release", () => {
          eventLog.push("release");
        });

        // When
        TestHelper.key(this.el, "keydown", {keyCode: KEY_DOWN_ARROW}, () => {
          setTimeout(()=> {
            TestHelper.key(this.el, "keyup", {keyCode: keyCode}, () => {
              setTimeout(()=> {
                // Then
                expect(eventLog).to.be.deep.equal(eventLogAnswer);
                done();
              }, 100);
            });
          }, 20);		
        });
      });
    });
  });
});

