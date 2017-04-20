import MovableCoord from '../../src/MovableCoord.js';

describe("AnimationHandler setTo/setBy method Test", function() {
  beforeEach(() => {
    this.changeHandler = sinon.spy();
    this.inst = new MovableCoord( {
      min : [ 0, 0 ],
      max : [ 300, 400 ],
      bounce : 100,
      margin : 0,
      circular : false,
      maximumDuration : 200
    });
    this.inst.on({
      "change": this.changeHandler
    });
  });
  afterEach(() => {
    if(this.inst) {
      this.inst.destroy();
      this.inst = null;
    }
    this.changeHandler.reset();
  });  

  it("should check setTo method", () => {
    // Given

    // When
    this.inst.setTo(0, 200);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 200]);
    expect(this.changeHandler.getCall(0).args[0].pos).to.deep.equal([0, 200]);
    
    // When
    this.inst.setTo(-200, 500);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 400]);
    expect(this.changeHandler.getCall(1).args[0].pos).to.deep.equal([0, 400]);

    // When
    this.inst.setTo(600, -900);
    // Then
    expect(this.inst.get()).to.deep.equal([300, 0]);
    expect(this.changeHandler.getCall(2).args[0].pos).to.deep.equal([300, 0]);
  });  

  it("should check setBy method", () => {
    // Given

    // When
    this.inst.setBy(20, 20);
    // Then
    expect(this.inst.get()).to.deep.equal([20, 20]);
    expect(this.changeHandler.getCall(0).args[0].pos).to.deep.equal([20, 20]);
    
    // When
    this.inst.setBy(-10, -10);
    // Then
    expect(this.inst.get()).to.deep.equal([10, 10]);
    expect(this.changeHandler.getCall(1).args[0].pos).to.deep.equal([10, 10]);

    // When
    this.inst.setBy(-1000, -1000);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 0]);
    expect(this.changeHandler.getCall(2).args[0].pos).to.deep.equal([0, 0]);

    // When
    this.inst.setBy(1000, 1000);
    // Then
    expect(this.inst.get()).to.deep.equal([300, 400]);
    expect(this.changeHandler.getCall(3).args[0].pos).to.deep.equal([300, 400]);      
  });  
});


describe("AnimationHandler setTo/setBy Test when inputType is []", function() {
  beforeEach(() => {
    this.changeHandler = sinon.spy();
    this.inst = new MovableCoord( {
      min : [ 0, 0 ],
      max : [ 300, 400 ],
      bounce : 100,
      margin : 0,
      circular : false,
      maximumDuration : 200,
      inputType : []
    });
    this.inst.on({
      "change": this.changeHandler
    });
  });
  afterEach(() => {
    if(this.inst) {
      this.inst.destroy();
      this.inst = null;
    }
    this.changeHandler.reset();
  });  

  it("should check setTo method", () => {
    // Given

    // When
    this.inst.setTo(0, 200);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 200]);
    expect(this.changeHandler.getCall(0).args[0].pos).to.deep.equal([0, 200]);
    
    // When
    this.inst.setTo(-200, 500);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 400]);
    expect(this.changeHandler.getCall(1).args[0].pos).to.deep.equal([0, 400]);

    // When
    this.inst.setTo(600, -900);
    // Then
    expect(this.inst.get()).to.deep.equal([300, 0]);
    expect(this.changeHandler.getCall(2).args[0].pos).to.deep.equal([300, 0]);
  });  

  it("should check setBy method", () => {
    // Given

    // When
    this.inst.setBy(20, 20);
    // Then
    expect(this.inst.get()).to.deep.equal([20, 20]);
    expect(this.changeHandler.getCall(0).args[0].pos).to.deep.equal([20, 20]);
    
    // When
    this.inst.setBy(-10, -10);
    // Then
    expect(this.inst.get()).to.deep.equal([10, 10]);
    expect(this.changeHandler.getCall(1).args[0].pos).to.deep.equal([10, 10]);

    // When
    this.inst.setBy(-1000, -1000);
    // Then
    expect(this.inst.get()).to.deep.equal([0, 0]);
    expect(this.changeHandler.getCall(2).args[0].pos).to.deep.equal([0, 0]);

    // When
    this.inst.setBy(1000, 1000);
    // Then
    expect(this.inst.get()).to.deep.equal([300, 400]);
    expect(this.changeHandler.getCall(3).args[0].pos).to.deep.equal([300, 400]);      
  });          
});

describe("AnimationHandler setTo method Test with Animation", function() {
    beforeEach(() => {
      this.animationStartHandler = sinon.spy();
      this.animationEndHandler = sinon.spy();
      this.changeHandler = sinon.spy();
		  this.inst = new MovableCoord( {
        min : [ 0, 0 ],
        max : [ 300, 400 ],
        bounce : 100,
        margin : 0,
        circular : false,
        maximumDuration : 200
      });
      this.inst.on({
        "change": this.changeHandler,
        "animationStart" : this.animationStartHandler,
        "animationEnd" : this.animationEndHandler,
      });
    });
    afterEach(() => {
      if(this.inst) {
        this.inst.destroy();
        this.inst = null;
      }
      this.animationStartHandler.reset();
      this.animationEndHandler.reset();
      this.changeHandler.reset();
    });

    it("should check event flow when maximumDuration(200ms) is bigger than a duration of setTo", (done) => {
      // Given
      // When
      this.inst.setTo(200, 200, 100);
      
      // Then
      setTimeout(() => {
        expect(this.animationStartHandler.calledOnce).to.be.true;      
        expect(this.changeHandler.called).to.be.true;      
        expect(this.animationEndHandler.calledOnce).to.be.true;      
        done();
      }, 150);
    });

    it("should check event flow when a duration of setTo is bigger than maximumDuration(200ms)", (done) => {
      // Given
      // When
      this.inst.setTo(200, 200, 3000);

      // Then
      setTimeout(() => {
        expect(this.animationEndHandler.called).to.be.false;
      }, 100);
      setTimeout(() => {
        expect(this.animationStartHandler.calledOnce).to.be.true;      
        expect(this.changeHandler.called).to.be.true;      
        expect(this.animationEndHandler.calledOnce).to.be.true;
        done();      
      }, 250);   
    });

    it("should check same position", () => {
      // Given
      // When
      var beforePos = this.inst.get();
      this.inst.setTo(...beforePos, 3000);
      
      expect(this.animationStartHandler.called).to.be.false;
      expect(this.animationEndHandler.called).to.be.false;
      expect(this.changeHandler.called).to.be.false;  
    });        

    it("should check position when animation is running. then, start other animation", (done) => {
      // Given
      // When
      this.inst.setTo(200, 200, 200);
      
      // Then
      setTimeout(() => {
        expect(this.animationStartHandler.calledOnce).to.be.true;
        expect(this.animationEndHandler.called).to.be.false;
        expect(this.changeHandler.called).to.be.true;  

        // When
        this.inst.setTo(0,0, 300);
        expect(this.inst.get()).to.not.deep.equal([200, 200]);
      }, 100);
      setTimeout(() => {
        expect(this.animationStartHandler.calledTwice).to.be.true;  
        expect(this.changeHandler.called).to.be.true;    
        expect(this.animationEndHandler.calledTwice).to.be.true;
        expect(this.inst.get()).to.deep.equal([0, 0]);
        done();
      }, 500);   
    });        
});
