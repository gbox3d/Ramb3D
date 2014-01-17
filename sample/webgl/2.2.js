/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 20.
 * Time: 오전 11:59
 * To change this template use File | Settings | File Templates.
 */



var rendererType = 'webgl';

var Smgr = new ramb3d.scene.SceneManager({
    camera : {
        fov : 45,
        far : 5000,
        near : 1,
        position : new THREE.Vector3(0, 0, 500),
        lookat : new THREE.Vector3()

    },
    renderer : {
        type : rendererType
    }
});



var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: true, opacity: 0.1, side: THREE.DoubleSide });

var points = [];

for ( var i = 0; i < 50; i ++ ) {

    points.push( new THREE.Vector3( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, 0, ( i - 5 ) * 2 ) );

}

var object = new THREE.Mesh( new THREE.LatheGeometry( points, 20 ), material );
object.position.set( -400, 0, -200 );

object.position.set( 0, 0, 0 );
object.scale.multiplyScalar( 5 );
Smgr.scene.add( object );

//트랙볼 카메라 컨트롤러 생성
var tbcc = Smgr.addTBCameraController(
    {
        Smgr : Smgr,
        center : new THREE.Vector3(0,0,0),
        radius : 700
    }
);
//new THREE.Vector3(THREE.Math.degToRad(25),THREE.Math.degToRad(-45),0)
tbcc.setRotation(THREE.Math.degToRad(25),0,0)
    .apply();

Smgr.updateAll();
