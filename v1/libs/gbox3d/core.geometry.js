


gbox3d.core.geo = {};

//Line3D
gbox3d.core.geo.Line3d = function(start, end) {

	if (start == undefined) {
		this.Start = new gbox3d.core.Vect3d();
	} else {
		this.Start = new gbox3d.core.Vect3d(start.X,start.Y,start.Z);
	}
	
	if (end == undefined) {
		this.End = new gbox3d.core.Vect3d();
	} else {
		this.End = new gbox3d.core.Vect3d(end.X,end.Y,end.Z);
	}
	
};

gbox3d.core.geo.Line3d.prototype.Start = null;
gbox3d.core.geo.Line3d.prototype.End = null;


gbox3d.core.geo.Line3d.prototype.getVector = function() {
	return this.End.substract(this.Start)
};
gbox3d.core.geo.Line3d.prototype.getLength = function() {
	return this.getVector().getLength()
};

//box3d
gbox3d.core.geo.Box3d = function() {
	this.MinEdge = new gbox3d.core.Vect3d();
	this.MaxEdge = new gbox3d.core.Vect3d()
};
gbox3d.core.geo.Box3d.prototype.MinEdge = null;
gbox3d.core.geo.Box3d.prototype.MaxEdge = null;
gbox3d.core.geo.Box3d.prototype.clone = function() {
	var a = new gbox3d.Box3d();
	a.MinEdge = this.MinEdge.clone();
	a.MaxEdge = this.MaxEdge.clone();
	return a
};
gbox3d.core.geo.Box3d.prototype.getCenter = function() {
	var a = this.MinEdge.add(this.MaxEdge);
	a.multiplyThisWithScal(0.5);
	return a
};
gbox3d.core.geo.Box3d.prototype.getExtent = function() {
	return this.MaxEdge.substract(this.MinEdge)
};
gbox3d.core.geo.Box3d.prototype.getEdges = function() {
	var b = this.getCenter();
	var c = b.substract(this.MaxEdge);
	var a = new Array();
	a.push(new gbox3d.core.Vect3d(b.X + c.X, b.Y + c.Y, b.Z + c.Z));
	a.push(new gbox3d.core.Vect3d(b.X + c.X, b.Y - c.Y, b.Z + c.Z));
	a.push(new gbox3d.core.Vect3d(b.X + c.X, b.Y + c.Y, b.Z - c.Z));
	a.push(new gbox3d.core.Vect3d(b.X + c.X, b.Y - c.Y, b.Z - c.Z));
	a.push(new gbox3d.core.Vect3d(b.X - c.X, b.Y + c.Y, b.Z + c.Z));
	a.push(new gbox3d.core.Vect3d(b.X - c.X, b.Y - c.Y, b.Z + c.Z));
	a.push(new gbox3d.core.Vect3d(b.X - c.X, b.Y + c.Y, b.Z - c.Z));
	a.push(new gbox3d.core.Vect3d(b.X - c.X, b.Y - c.Y, b.Z - c.Z));
	return a
};
gbox3d.core.geo.Box3d.prototype.intersectsWithLine = function(d, e) {
	var c = e.substract(d);
	var a = c.getLength();
	c.normalize();
	var b = d.add(e).multiplyWithScal(0.5);
	return this.intersectsWithLineImpl(b, c, a * 0.5)
};
gbox3d.core.geo.Box3d.prototype.intersectsWithLineImpl = function(b, a, g) {
	var f = this.getExtent().multiplyWithScal(0.5);
	var c = this.getCenter().substract(b);
	if ((Math.abs(c.X) > f.X + g * Math.abs(a.X)) || (Math.abs(c.Y) > f.Y + g * Math.abs(a.Y)) || (Math.abs(c.Z) > f.Z + g * Math.abs(a.Z))) {
		return false
	}
	var d = f.Y * Math.abs(a.Z) + f.Z * Math.abs(a.Y);
	if (Math.abs(c.Y * a.Z - c.Z * a.Y) > d) {
		return false
	}
	d = f.X * Math.abs(a.Z) + f.Z * Math.abs(a.X);
	if (Math.abs(c.Z * a.X - c.X * a.Z) > d) {
		return false
	}
	d = f.X * Math.abs(a.Y) + f.Y * Math.abs(a.X);
	if (Math.abs(c.X * a.Y - c.Y * a.X) > d) {
		return false
	}
	return true
};
gbox3d.core.geo.Box3d.prototype.addInternalPoint = function(a, c, b) {
	if (a > this.MaxEdge.X) {
		this.MaxEdge.X = a
	}
	if (c > this.MaxEdge.Y) {
		this.MaxEdge.Y = c
	}
	if (b > this.MaxEdge.Z) {
		this.MaxEdge.Z = b
	}
	if (a < this.MinEdge.X) {
		this.MinEdge.X = a
	}
	if (c < this.MinEdge.Y) {
		this.MinEdge.Y = c
	}
	if (b < this.MinEdge.Z) {
		this.MinEdge.Z = b
	}
};
gbox3d.core.geo.Box3d.prototype.addInternalPointByVector = function(a) {
	this.addInternalPoint(a.X, a.Y, a.Z)
};
gbox3d.core.geo.Box3d.prototype.intersectsWithBox = function(a) {
	return this.MinEdge.X <= a.MaxEdge.X && this.MinEdge.Y <= a.MaxEdge.Y && this.MinEdge.Z <= a.MaxEdge.Z && this.MaxEdge.X >= a.MinEdge.X && this.MaxEdge.Y >= a.MinEdge.Y && this.MaxEdge.Z >= a.MinEdge.Z
};
gbox3d.core.geo.Box3d.prototype.isPointInside = function(a) {
	return a.X >= this.MinEdge.X && a.X <= this.MaxEdge.X && a.Y >= this.MinEdge.Y && a.Y <= this.MaxEdge.Y && a.Z >= this.MinEdge.Z && a.Z <= this.MaxEdge.Z
};
gbox3d.core.geo.Box3d.prototype.reset = function(a, c, b) {
	this.MaxEdge.set(a, c, b);
	this.MinEdge.set(a, c, b)
};

//plane 3d
gbox3d.core.geo.Plane3d = function() {
	this.Normal = new gbox3d.core.Vect3d(0, 1, 0);
	this.recalculateD(new gbox3d.core.Vect3d(0, 0, 0))
};
gbox3d.core.geo.Plane3d.prototype.D = 0;
gbox3d.core.geo.Plane3d.prototype.Normal = null;
gbox3d.core.geo.Plane3d.ISREL3D_FRONT = 0;
gbox3d.core.geo.Plane3d.ISREL3D_BACK = 1;
gbox3d.core.geo.Plane3d.ISREL3D_PLANAR = 2;
gbox3d.core.geo.Plane3d.prototype.clone = function() {
	var a = new gbox3d.Plane3d(false);
	a.Normal = this.Normal.clone();
	a.D = this.D;
	return a
};
gbox3d.core.geo.Plane3d.prototype.recalculateD = function(a) {
	this.D = -a.dotProduct(this.Normal)
};
gbox3d.core.geo.Plane3d.prototype.getMemberPoint = function() {
	return this.Normal.multiplyWithScal(-this.D)
};

// a : point
// b : nVector

gbox3d.core.geo.Plane3d.prototype.setPlane = function(a, b) {
	this.Normal = b.clone();
	this.recalculateD(a)
};
gbox3d.core.geo.Plane3d.prototype.setPlaneFrom3Points = function(c, b, a) {
	this.Normal = (b.substract(c)).crossProduct(a.substract(c));
	this.Normal.normalize();
	this.recalculateD(c)
};
gbox3d.core.geo.Plane3d.prototype.normalize = function() {
	var a = (1 / this.Normal.getLength());
	this.Normal = this.Normal.multiplyWithScal(a);
	this.D *= a
};
gbox3d.core.geo.Plane3d.prototype.classifyPointRelation = function(a) {
	var b = this.Normal.dotProduct(a) + this.D;
	if (b < -0.000001) {
		return gbox3d.Plane3d.ISREL3D_BACK
	}
	if (b > 0.000001) {
		return gbox3d.Plane3d.ISREL3D_FRONT
	}
	return gbox3d.Plane3d.ISREL3D_PLANAR
};
gbox3d.core.geo.Plane3d.prototype.getIntersectionWithPlanes = function(d, c, b) {
	var a = new gbox3d.core.Vect3d();
	var e = new gbox3d.core.Vect3d();
	if (this.getIntersectionWithPlane(d, a, e)) {
		return c.getIntersectionWithLine(a, e, b)
	}
	return false
};
gbox3d.core.geo.Plane3d.prototype.getIntersectionWithPlane = function(j, l, g) {
	var f = this.Normal.getLength();
	var e = this.Normal.dotProduct(j.Normal);
	var a = j.Normal.getLength();
	var h = f * a - e * e;
	if (Math.abs(h) < 1e-8) {
		return false
	}
	var d = 1 / h;
	var k = (a * -this.D + e * j.D) * d;
	var i = (f * -j.D + e * this.D) * d;
	this.Normal.crossProduct(j.Normal).copyTo(g);
	var c = this.Normal.multiplyWithScal(k);
	var b = j.Normal.multiplyWithScal(i);
	c.add(b).copyTo(l);
	return true
};

//d : 직선 시작점
//e : 직선 방향벡터
//return : 교점이 있으면 true없으면 false
gbox3d.core.geo.Plane3d.prototype.getIntersectionWithLine = function(d, e, c) {
	var b = this.Normal.dotProduct(e); //평면 법선과 직선벡터의 각도를 구한다.
	if (b == 0) { //만약직각이라면 교점이 발생하지않는다.
		return false
	}
	var a = -(this.Normal.dotProduct(d) + this.D) / b;
	d.add((e.multiplyWithScal(a))).copyTo(c);
	return true
};

//line3d 객체로 평면과 충돌점 구하기
gbox3d.core.geo.Plane3d.prototype.getIntersectionWithRay  = function( Ray, vIntersec ) {
	//console.log(Ray);
	return this.getIntersectionWithLine(Ray.Start,Ray.getVector(),vIntersec);
}


gbox3d.core.geo.Plane3d.prototype.getDistanceTo = function(a) {
	return a.dotProduct(this.Normal) + this.D
};
gbox3d.core.geo.Plane3d.prototype.isFrontFacing = function(b) {
	var a = this.Normal.dotProduct(b);
	return a <= 0
};

//triangle 3d

gbox3d.core.geo.Triangle3d = function(e, d, f) {
	if (e) {
		this.pointA = e
	} else {
		this.pointA = new gbox3d.core.Vect3d()
	}
	if (d) {
		this.pointB = d
	} else {
		this.pointB = new gbox3d.core.Vect3d()
	}
	if (f) {
		this.pointC = f
	} else {
		this.pointC = new gbox3d.core.Vect3d()
	}
};
gbox3d.core.geo.Triangle3d.prototype.pointA = null;
gbox3d.core.geo.Triangle3d.prototype.pointB = null;
gbox3d.core.geo.Triangle3d.prototype.pointC = null;
gbox3d.core.geo.Triangle3d.prototype.clone = function() {
	return new gbox3d.Triangle3d(this.pointA, this.pointB, this.pointC)
};
gbox3d.core.geo.Triangle3d.prototype.getPlane = function() {
	var a = new gbox3d.Plane3d(false);
	a.setPlaneFrom3Points(this.pointA, this.pointB, this.pointC);
	return a
};
gbox3d.core.geo.Triangle3d.prototype.isPointInsideFast = function(j) {
	var l = this.pointB.substract(this.pointA);
	var k = this.pointC.substract(this.pointA);
	var u = l.dotProduct(l);
	var s = l.dotProduct(k);
	var q = k.dotProduct(k);
	var i = j.substract(this.pointA);
	var n = i.dotProduct(l);
	var m = i.dotProduct(k);
	var t = (n * q) - (m * s);
	var r = (m * u) - (n * s);
	var h = (u * q) - (s * s);
	var o = t + r - h;
	return (o < 0) && !((t < 0) || (r < 0))
};
gbox3d.core.geo.Triangle3d.prototype.isPointInside = function(a) {
	return (this.isOnSameSide(a, this.pointA, this.pointB, this.pointC) && this.isOnSameSide(a, this.pointB, this.pointA, this.pointC) && this.isOnSameSide(a, this.pointC, this.pointA, this.pointB))
};
gbox3d.core.geo.Triangle3d.prototype.isOnSameSide = function(i, g, d, c) {
	var e = c.substract(d);
	var h = e.crossProduct(i.substract(d));
	var f = e.crossProduct(g.substract(d));
	return (h.dotProduct(f) >= 0)
};
gbox3d.core.geo.Triangle3d.prototype.getNormal = function() {
	return this.pointB.substract(this.pointA).crossProduct(this.pointC.substract(this.pointA))
};
gbox3d.core.geo.Triangle3d.prototype.getIntersectionOfPlaneWithLine = function(c, f) {
	var e = this.getNormal();
	e.normalize();
	var b = e.dotProduct(f);
	if (gbox3d.iszero(b)) {
		return null
	}
	var g = this.pointA.dotProduct(e);
	var a = -(e.dotProduct(c) - g) / b;
	return c.add(f.multiplyWithScal(a))
};
gbox3d.core.geo.Triangle3d.prototype.getIntersectionWithLine = function(b, c) {
	var a = this.getIntersectionOfPlaneWithLine(b, c);
	if (a == null) {
		return null
	}
	if (this.isPointInside(a)) {
		return a
	}
	return null
};
gbox3d.core.geo.Triangle3d.prototype.isTotalInsideBox = function(a) {
	return a.isPointInside(this.pointA) && a.isPointInside(this.pointB) && a.isPointInside(this.pointC)
};
gbox3d.core.geo.Triangle3d.prototype.copyTo = function(a) {
	this.pointA.copyTo(a.pointA);
	this.pointB.copyTo(a.pointB);
	this.pointC.copyTo(a.pointC)
}; 