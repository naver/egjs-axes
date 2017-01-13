import HammerManager, { __RewireAPI__ as HammerManagerRewireApi } from '../../src/hammerManager.js';
import Hammer from "hammerjs";
import { UNIQUEKEY, DIRECTION } from '../../src/consts.js';

describe("HammerManager bind/unbind Test", function() {
    beforeEach(() => {
      this.inst = new HammerManager();;
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });
    
    it("should check a element when adding", () => {
      // Given
      var el = sandbox();
      var before = el.getAttribute(UNIQUEKEY);
      var beforeHammerCount = Object.keys(this.inst._hammers).length;

      // When
      this.inst.add(el);

      // Then
      expect(before).to.not.exist;
      expect(el.getAttribute(UNIQUEKEY)).to.exist;
      expect(beforeHammerCount + 1).to.be.equal(Object.keys(this.inst._hammers).length);
    });

    it("should check one element case of double adding", () => {
      // Given
      var el = sandbox();
      this.inst.add(el);
      var beforeHammerCount = Object.keys(this.inst._hammers).length;
      var before = el.getAttribute(UNIQUEKEY);
      var beforeHammerObject = this.inst.getHammer(el);
      
      // When
      this.inst.add(el);

      // Then
      expect(before).to.be.equal(el.getAttribute(UNIQUEKEY));
      expect(beforeHammerObject).to.not.deep.equal(this.inst.getHammer(el));
      expect(beforeHammerCount).to.be.equal(Object.keys(this.inst._hammers).length);
    });

    it("should check one element after calling destroy", () => {
      // Given
      var el = sandbox();
      this.inst.add(el);

      // When
      this.inst.destroy();

      // Then
      expect(el.getAttribute(UNIQUEKEY)).to.not.exist;
      expect(Object.keys(this.inst._hammers).length).to.be.equal(0);
      this.inst = null;
    });

    it("should check a element when removing", () => {
      // Given
      var el = sandbox();
      this.inst.add(el);
      var before = el.getAttribute(UNIQUEKEY);
      var beforeHammerCount = Object.keys(this.inst._hammers).length;

      // When
      this.inst.remove(el);

      // Then
      expect(before).to.exist;
      expect(before).to.not.equal(el.getAttribute(UNIQUEKEY));
      expect(el.getAttribute(UNIQUEKEY)).to.not.exist;
      expect(beforeHammerCount-1).to.be.equal(Object.keys(this.inst._hammers).length);
    });
});

describe("HammerManager inputType Test", function() {
    beforeEach(() => {
      this.inst = new HammerManager();;
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      HammerManagerRewireApi.__ResetDependency__("SUPPORT_TOUCH");
      cleanup();
    });

    it("should check convertInputType when supporting touch", () => {
      // Given
      HammerManagerRewireApi.__Rewire__("SUPPORT_TOUCH", true);

      // When
      var inputType = [ "touch", "mouse" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.equal(Hammer.TouchInput);

      // When
      inputType = [ "mouse" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.null;
    });


    it("should check convertInputType when not supporting touch", () => {
      // Given
      HammerManagerRewireApi.__Rewire__("SUPPORT_TOUCH", false);

      // When
      var inputType = [ "touch", "mouse" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ "touch" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.null;

      // When
      inputType = [ "mouse" ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.equal(Hammer.MouseInput);

      // When
      inputType = [ ];
      // Then
      expect(this.inst.convertInputType(inputType)).to.be.null;
    });    

    it("should check a element when adding with inputType", () => {
      // Given
      var el = sandbox();
      var beforeHammerCount = Object.keys(this.inst._hammers).length;
      var before = el.getAttribute(UNIQUEKEY);
      
      // When
      this.inst.add(el, {
        direction : DIRECTION.DIRECTION_ALL,
        inputType : null
      });

      // Then
      expect(before).to.not.exist;
      expect(el.getAttribute(UNIQUEKEY)).to.not.exist;
      expect(beforeHammerCount).to.be.equal(Object.keys(this.inst._hammers).length);
    });

    it("should check a element when removing with inputType", () => {
      // Given
      var el = sandbox();
      this.inst.add(el, {
        direction : DIRECTION.DIRECTION_ALL,
        inputType : []
      });
      
      var before = el.getAttribute(UNIQUEKEY);
      var beforeHammerCount = Object.keys(this.inst._hammers).length;
      
      // When
      this.inst.remove(el);

      // Then
      expect(before).to.not.exist;
      expect(el.getAttribute(UNIQUEKEY)).to.not.exist;
      expect(beforeHammerCount).to.be.equal(Object.keys(this.inst._hammers).length);
    });
});

describe("HammerManager getHammer Test", function() {
    beforeEach(() => {
      this.inst = new HammerManager();;
    });
    afterEach(() => {
      if (this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      cleanup();
    });

    it("should check getHammer", () => {
      // Given
      var el = sandbox();

      // When
      this.inst.add(el);

      // Then
      expect(Object.keys(this.inst._hammers).length).to.be.equal(1);
      expect(this.inst.getHammer(el)).to.deep.equal(this.inst._hammers[Object.keys(this.inst._hammers)[0]].hammer);

      // When
      this.inst.remove(el);

      // Then
      expect(Object.keys(this.inst._hammers).length).to.be.equal(0);
      expect(this.inst.getHammer(el)).to.not.exist;
    });
});
