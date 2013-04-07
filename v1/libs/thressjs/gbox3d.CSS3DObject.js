/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 3.
 * Time: 오후 10:03
 * To change this template use File | Settings | File Templates.
 */


THREE.CSS3DObject = function ( element ) {

    THREE.Object3D.call( this );

    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.WebkitTransformStyle = 'preserve-3d';
    this.element.style.MozTransformStyle = 'preserve-3d';
    this.element.style.oTransformStyle = 'preserve-3d';
    this.element.style.transformStyle = 'preserve-3d';
};

THREE.CSS3DObject.prototype = Object.create( THREE.Object3D.prototype );

////////////////////
//gbox3d fatch start
//커스텀 오브잭트 클로닝
THREE.CSS3DObject.prototype.clone = function() {

    var clone_obj = new THREE.CSS3DObject(this.element.cloneNode(true));

    //슈퍼콜링
    THREE.Object3D.prototype.clone.call(this,clone_obj);

    //console.log('my css3d obj clone');
    return clone_obj;
}


THREE.CSS3DObject.prototype.updateMatrix = function() {

    //슈퍼콜링
    THREE.Object3D.prototype.updateMatrix.call(this);

    this.updateCSS();

    /*
    //css3 스타일 스트링 업데이트
    var element = this.element;

    var style = this.matrix.toCSSMatrix();

    element.style.WebkitTransform = style;
    element.style.MozTransform = style;
    element.style.oTransform = style;
    element.style.transform = style;
    */

}

THREE.CSS3DObject.prototype.updateCSS = function() {
    //css3 스타일 스트링 업데이트
    var element = this.element;

    var style = this.matrix.toCSSMatrix();

    element.style.WebkitTransform = style;
    element.style.MozTransform = style;
    element.style.oTransform = style;
    element.style.transform = style;

}



//gbox3d fatch end
//////////////////