
// QUnit.test("check user's direction", function(assert) {
// 	//Given
// 	// When
// 	this.inst._subOptions.thresholdAngle = 45;

// 	// Then
// 	assert.equal(this.inst._getDirection(0), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal")
// 	assert.equal(this.inst._getDirection(20), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal")
// 	assert.equal(this.inst._getDirection(45), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a directgion is horizontal");
// 	assert.equal(this.inst._getDirection(100), eg.MovableCoord.DIRECTION_VERTICAL, "check if a direction is vertical");
// 	assert.equal(this.inst._getDirection(134), eg.MovableCoord.DIRECTION_VERTICAL, "check if a direction is vertical");
// 	assert.equal(this.inst._getDirection(135), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(136), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(180), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");

// 	// When
// 	this.inst._subOptions.thresholdAngle = 20;

// 	// Then
// 	assert.equal(this.inst._getDirection(0), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal")
// 	assert.equal(this.inst._getDirection(10), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(20), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(30), eg.MovableCoord.DIRECTION_VERTICAL, "check if a direction is vertical");
// 	assert.equal(this.inst._getDirection(50), eg.MovableCoord.DIRECTION_VERTICAL, "check if a direction is vertical");
// 	assert.equal(this.inst._getDirection(160), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(161), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// 	assert.equal(this.inst._getDirection(180), eg.MovableCoord.DIRECTION_HORIZONTAL, "check if a direction is horizontal");
// });