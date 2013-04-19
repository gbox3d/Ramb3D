/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 3.
 * Time: 오후 6:33
 * To change this template use File | Settings | File Templates.
 */


THREE.Math.epsilon = function ( value ) {

    return Math.abs( value ) < 0.000001 ? 0 : value;

};

THREE.Matrix4.prototype.toCSSMatrix = function () {

    var elements = this.elements;

    return 'translate3d(-50%,-50%,0) matrix3d(' +
        THREE.Math.epsilon( elements[ 0 ] ) + ',' +
        THREE.Math.epsilon( elements[ 1 ] ) + ',' +
        THREE.Math.epsilon( elements[ 2 ] ) + ',' +
        THREE.Math.epsilon( elements[ 3 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 4 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 5 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 6 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 7 ] ) + ',' +
        THREE.Math.epsilon( elements[ 8 ] ) + ',' +
        THREE.Math.epsilon( elements[ 9 ] ) + ',' +
        THREE.Math.epsilon( elements[ 10 ] ) + ',' +
        THREE.Math.epsilon( elements[ 11 ] ) + ',' +
        THREE.Math.epsilon( elements[ 12 ] ) + ',' +
        THREE.Math.epsilon( elements[ 13 ] ) + ',' +
        THREE.Math.epsilon( elements[ 14 ] ) + ',' +
        THREE.Math.epsilon( elements[ 15 ] ) +
        ')';

};

THREE.Matrix4.prototype.toCameraCSSMatrix = function ( ) {

    var elements = this.elements;

    return 'matrix3d(' +
        THREE.Math.epsilon( elements[ 0 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 1 ] ) + ',' +
        THREE.Math.epsilon( elements[ 2 ] ) + ',' +
        THREE.Math.epsilon( elements[ 3 ] ) + ',' +
        THREE.Math.epsilon( elements[ 4 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 5 ] ) + ',' +
        THREE.Math.epsilon( elements[ 6 ] ) + ',' +
        THREE.Math.epsilon( elements[ 7 ] ) + ',' +
        THREE.Math.epsilon( elements[ 8 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 9 ] ) + ',' +
        THREE.Math.epsilon( elements[ 10 ] ) + ',' +
        THREE.Math.epsilon( elements[ 11 ] ) + ',' +
        THREE.Math.epsilon( elements[ 12 ] ) + ',' +
        THREE.Math.epsilon( - elements[ 13 ] ) + ',' +
        THREE.Math.epsilon( elements[ 14 ] ) + ',' +
        THREE.Math.epsilon( elements[ 15 ] ) +
        ')';

}

///////벡터 확장
//    (0,0,1) 기준으로 x,y 축의 회전 각도를 구한다.

THREE.Vector3.prototype.getHorizontalAngle = function() {
    var b = new  THREE.Vector3();

    b.y =  THREE.Math.radToDeg(Math.atan2(this.x, this.z));

    if (b.y < 0) {
        b.y += 360
    }
    if (b.y >= 360) {
        b.y -= 360
    }
    var a = Math.sqrt(this.x * this.x + this.z * this.z);
    b.x = THREE.Math.radToDeg(Math.atan2(a, this.y)) - 90;
    if (b.x < 0) {
        b.x += 360
    }
    if (b.x >= 360) {
        b.x -= 360
    }
    return b;
};
