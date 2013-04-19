/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 11.
 * Time: 오후 8:12
 * To change this template use File | Settings | File Templates.
 */


THREE.CSS3DScene = function (param) {

    THREE.Scene.call( this );

    var element;
    if(param.element == undefined) {
        element = document.createElement( 'div');
        element.setAttribute('id','css3dscene-root-rev1');
    }
    else {
        element = param.element;
    }

    this.rootObject = new THREE.CSS3DObject(element);

    this.rootObject.position.set(0,0,0);
    //최고 루트는 씬객체
    this.rootObject.parent = this;

    if(param.camera == undefined) {

    }
    else {
        param.camera.element.appendChild(element);
    }
};

THREE.CSS3DScene.prototype = Object.create( THREE.Scene.prototype );

THREE.CSS3DScene.prototype.add = function(object) {

    this.rootObject.add(object);

}

THREE.CSS3DScene.prototype.setActiveCamera = function(camera) {

    camera.element.appendChild(this.rootObject.element);

}

THREE.CSS3DScene.prototype.updateAllObject= function() {

    for(var index in this.__objects) {
        this.__objects[index].updateMatrix();
    }

}

THREE.CSS3DScene.prototype.updateMatrixWorld = function(force) {
    this.rootObject.updateMatrixWorld(force);
}