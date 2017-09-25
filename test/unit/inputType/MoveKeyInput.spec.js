import TestHelper from "./TestHelper";
import Axes from "../../../src/Axes.ts";
import {MoveKeyInput, KEYMAP} from "../../../src/inputType/MoveKeyInput";
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
    });
    it("should check status after destroy", () => {
      // Given
      this.inst.connect({});
      
      // When
      this.inst.destroy();

      // Then
      expect(this.inst.element).to.be.not.exist;
      expect(this.observer).to.be.not.exist;
      
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
        const rightArrayKeyCode = KEYMAP.RIGHT_ARROW;
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
    [KEYMAP.LEFT_ARROW, KEYMAP.A].forEach((keyCode, idx) => {
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
    [KEYMAP.RIGHT_ARROW, KEYMAP.D].forEach((keyCode, idx) => {
        it("should trigger 'change' event to right(keyCode: "+keyCode+")", () => {
            // Given
            let changeTriggered = false;
            let deltaX = 0;
            const rightKeyCode = {
                keyCode: keyCode
            };
            this.inst
            .on("change", (e) => {
              deltaX = e.delta.x;
              changeTriggered = true;
            });

            // When
            TestHelper.key(this.el, "keydown", rightKeyCode);

            // Then
            expect(changeTriggered).to.be.true;
            expect(deltaX).to.be.equal(1);
        });
    });

    // up
    [KEYMAP.UP_ARROW, KEYMAP.W].forEach((keyCode, idx) => {
        it("should trigger 'change' event to up("+keyCode+")", () => {
            // Given
            let changeTriggered = false;
            let deltaY = 0;
            const upKeyCode = {
                keyCode: keyCode
            };
            this.inst
            .on("change", (e) => {
                deltaY = e.delta.y;
                changeTriggered = true;
            });

            // When
            TestHelper.key(this.el, "keydown", upKeyCode);

            // Then
            expect(changeTriggered).to.be.true;
            expect(deltaY).to.be.equal(1);
        });
    });

    // down
    [KEYMAP.DOWN_ARROW, KEYMAP.S].forEach((keyCode, idx) => {
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
  });
});

