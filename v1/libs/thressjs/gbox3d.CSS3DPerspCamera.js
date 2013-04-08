/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 4.
 * Time: 오전 10:09
 * To change this template use File | Settings | File Templates.
 */


THREE.CSS3DPerspectiveCamera = function ( fov, aspect, near, far, element ) {

    THREE.PerspectiveCamera.call( this,fov, aspect, near, far );

    this.element = element;
    console.log('CSS3DPerspectiveCamera v1.0');

};

THREE.CSS3DPerspectiveCamera.prototype = Object.create( THREE.PerspectiveCamera.prototype );


THREE.CSS3DPerspectiveCamera.prototype.update = function(width,height) {

    //슈퍼콜링
    //THREE.PerspectiveCamera.prototype.updateMatrixWorld.call(this);

    //로컬변환 메트릭스 갱신
    this.updateMatrix();

    //월드변환 메트릭스 갱신
    if ( this.parent === undefined ) {

        this.matrixWorld.copy( this.matrix );

    } else {

        this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

    }
    this.matrixWorldInverse.getInverse( this.matrixWorld );


    //css3 스트링 업데이트

    var fov = 0.5 / Math.tan( THREE.Math.degToRad( this.fov * 0.5 ) ) * height;

    //css3 스타일 스트링 업데이트
    var style = "translate3d(0,0," + fov + "px)" +
        this.matrixWorldInverse.toCameraCSSMatrix() +
        " translate3d(" + width/2 + "px," + height/2 + "px, 0)";

    this.element.style.WebkitTransform = style;
    this.element.style.MozTransform = style;
    this.element.style.oTransform = style;
    this.element.style.transform = style;

    //console.log(style);
}




