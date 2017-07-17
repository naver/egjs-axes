import {AxisManager} from "../../src/AxisManager";


describe("AxisManager", function() {
  describe("static method", function() {

    it("should check 'equal' method", () => {
      // Given
      let target1 = {
        x: 10,
        y: 20,
        z: 30
      };
      let target2 = {
        x: 10,
        y: 20
      }
      
      // Then
      expect(AxisManager.equal(target1, target2)).to.be.false;
      expect(AxisManager.equal(target2, target1)).to.be.true;
    });

  });
  describe("instance method", function() {
    beforeEach(() => {
      this.inst = new AxisManager( {
        axis: {
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
        }
      });
    });
    afterEach(() => {
    });
    
    it("should check 'moveTo' method", () => {
      // Given
      // When (all)
      let orgPos = this.inst.get();
      let moveTo = {x: 10, y: 20, z: 30};
      let moved = this.inst.moveTo(moveTo);
      
      // Then
      expect(moved).to.be.eql(moveTo);
      expect(moved).to.be.not.equal(moveTo);

      // When (single) 
      moveTo = {x: 30};
      moved = this.inst.moveTo(moveTo);

      // Then
      orgPos = this.inst.get();
      expect(moved).to.be.eql(orgPos);
      expect(moved).to.be.not.equal(orgPos);

      // When (not included)
      moveTo = {notX: 30};
      moved = this.inst.moveTo(moveTo);

      // Then
      orgPos = this.inst.get();
      expect(orgPos.notX).to.be.undefined;
      expect(moved).to.be.eql(orgPos);
      expect(moved).to.be.not.equal(orgPos);
    });

    it("should check 'get' method", () => {
      // Given
      // When

      // Then
      expect(this.inst.get()).to.be.eql({x: 0, y: 0, z: -100});

      // When
      this.inst.moveTo({x: 20, y: 40});

      // Then
      expect(this.inst.get(["x"])).to.be.eql({x : 20});
      expect(this.inst.get(["y"])).to.be.eql({y : 40});
      expect(this.inst.get(["z"])).to.be.eql({z : -100});
      expect(this.inst.get(["notX"])).to.be.eql({});

      // When (check reference)
      const firstGet = this.inst.get();
      const secondGet = this.inst.get();

      // Then
      expect(firstGet).to.be.eql(secondGet);
      expect(firstGet).to.be.not.equal(secondGet);
    });

    it("should check 'every' high-order method", () => {  
      // Given
      let orgPos = this.inst.get();
      expect(orgPos).to.be.eql({x: 0, y: 0, z: -100});

      // When
      this.inst.moveTo({x: 20, y: 0});
      
      // Then
      expect(this.inst.every(this.inst.get(), (v, k) => v !== orgPos[k])).to.be.false;

      // When
      this.inst.moveTo({x: 20, y: 30, z: 0});

      // Then
      expect(this.inst.every(this.inst.get(), (v, k) => v !== orgPos[k])).to.be.true;
    });


    it("should check 'filter' high-order method", () => {  
      // Given
      let orgPos = this.inst.get();
      expect(orgPos).to.be.eql({x: 0, y: 0, z: -100});

      // When
      this.inst.moveTo({x: 20, y: 0});
      
      // Then
      expect(this.inst.filter(this.inst.get(), (v, k) => v !== orgPos[k])).to.be.eql({x:20});

      // When
      this.inst.moveTo({x: 20, y: 30, z: 0});

      // Then
      expect(this.inst.filter(this.inst.get(), (v, k) => v !== orgPos[k])).to.be.eql({x:20, y:30, z:0});
    });

    it("should check 'map' high-order method", () => {  
      // Given
      let orgPos = this.inst.get();
      expect(orgPos).to.be.eql({x: 0, y: 0, z: -100});

      // When
      this.inst.moveTo({x: 20, y: 0});
      
      // Then
      expect(this.inst.map(this.inst.get(), (v) => v + 20)).to.be.eql({x:40, y:20, z: -80});
    });  

    it("should check 'isOutside' method", () => {  
      // Given
      // When
      let orgPos = this.inst.get();
      expect(orgPos).to.be.eql({x: 0, y: 0, z: -100});

      // Then
      expect(this.inst.isOutside()).to.be.false;

      // When
      this.inst.moveTo({x: -50});

      // Then
      expect(this.inst.isOutside()).to.be.true;
      expect(this.inst.isOutside(["y", "z"])).to.be.false;
      
      // When
      this.inst.moveTo({x: 50});

      // Then
      expect(this.inst.isOutside()).to.be.false;
      expect(this.inst.isOutside(["y", "z"])).to.be.false;
    });
  });
});
