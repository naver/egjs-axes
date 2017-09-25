import {AnimationManager} from "../../src/AnimationManager";
import {AxisManager} from "../../src/AxisManager";
import {InterruptManager} from "../../src/InterruptManager";
import {EventManager} from "../../src/EventManager";
import Component from "@egjs/component";

describe("AnimationManager", function () {
  describe("method test", function() {
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
      let param = this.inst.createAnimationParam(pos, 1000);

      // Then
      expect(param.depaPos).to.be.eql({x:0, y:0, z: -100});
      expect(param.destPos).to.be.eql({x:150, y:200, z: -150});
      expect(param.duration).to.be.eql(1000);
      expect(param.delta).to.be.eql({x:150, y:200, z:-50});
      expect(param.inputEvent).to.be.eql(null);
      expect(param.input).to.be.eql(null);

      // When
      this.options.maximumDuration = 500;
      const eventValue = { event: "i'm inputEvent"};
      param = this.inst.createAnimationParam(pos, 1000, {
        event: eventValue
      });

      // Then
      expect(param.depaPos).to.be.eql({x:0, y:0, z: -100});
      expect(param.destPos).to.be.eql({x:150, y:200, z: -150});
      expect(param.duration).to.be.eql(500);
      expect(param.delta).to.be.eql({x:150, y:200, z:-50});
      expect(param.inputEvent).to.be.equal(eventValue);
    });
  });
  
  describe("animation test", function() {
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
        itm : new InterruptManager(this.options), 
        em,
        axm
      });
      em.setAnimationManager(this.inst);
    });
    afterEach(() => {
      this.component.off();
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
      expect(self.axm.get()).to.be.eql({x: 100, y: 0, z:-100});
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
      const changeHandler = sinon.spy(function(event) {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      this.component.on({
        "animationStart": startHandler,
        "change": changeHandler,
        "animationEnd": function(event) {
          expect(self.axm.get()).to.be.eql({x: 100, y: 0, z:-100});
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
    it("should check 'setBy' method (inside, duration)", (done) => {
      // Given
      const depaPos = this.inst.axm.get();
      const byPos = {
        x: 20,
        z: 40
      };
      const self = this.inst;
      const startHandler = sinon.spy();
      const changeHandler = sinon.spy(function(event) {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      this.component.on({
        "animationStart": startHandler,
        "change": changeHandler,
        "animationEnd": function(event) {
          expect(self.axm.get()).to.be.eql({x: depaPos.x + byPos.x, y: 0, z:depaPos.z + byPos.z});
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
      const changeHandler = sinon.spy(function(event) {
        expect(event.input).to.be.null;
        expect(event.inputEvent).to.be.null;
        expect(self.getEventInfo()).to.be.null;
      });
      this.component.on({
        "animationStart": startHandler,
        "change": changeHandler,
        "animationEnd": function(event) {
          expect(self.axm.get()).to.be.eql({x: 90, y: 0, z:-80});
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
      const endHandler = sinon.spy(function(event) {
        if(endHandler.callCount === 1) {
          // first destPos
          expect(self.axm.get()).to.be.eql({x: 150, y: 0, z:-150});
          expect(startHandler.callCount).to.be.equal(1);
          expect(startHandler.getCall(0).args[0].isTrusted).to.be.false;
          expect(event.isTrusted).to.be.false;
        } else if(endHandler.callCount === 2) {
          // Then
          expect(self.axm.get()).to.be.eql({x: 100, y: 0, z:-100});
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
      this.inst.setTo({x:80, y: 150}, 200);
      
      // Then
      setTimeout(() => {
        expect(startHandler.calledOnce).to.be.true;
        expect(changeHandler.called).to.be.true;  
        expect(endHandler.called).to.be.false;

        // When
        this.inst.setTo({x:0, y:0}, 300);
        expect(this.inst.axm.get()).to.not.eql({x:80, y:150, z:-100});
      }, 100);
      setTimeout(() => {
        expect(startHandler.calledTwice).to.be.true;  
        expect(changeHandler.called).to.be.true;    
        expect(endHandler.calledTwice).to.be.true;
        expect(this.inst.axm.get()).to.eql({x:0, y:0, z:-100});
        done();
      }, 500);   
    });      
  });
});
