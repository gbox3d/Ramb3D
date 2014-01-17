/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 19.
 * Time: 오후 6:25
 * To change this template use File | Settings | File Templates.
 */


var rendererType = 'webgl';

var Smgr = new ramb3d.scene.SceneManager({
    camera : {
        fov : 45,
        far : 5000,
        near : 1,
        position : new THREE.Vector3(0, 300, 500),
        lookat : new THREE.Vector3()

    },
    renderer : {
        type : rendererType
    }
});

var plane = ramb3d.util.createPlane({
    name : 'hello-plane',
    width : 128,
    height : 128,
    color : 'red',
    matrial : new THREE.MeshPhongMaterial({
        // light
        specular: '#a9fcff',
        // intermediate
        color: '#ff0000',
        // dark
        emissive: '#000000', //암흑 컬러
        shininess: 256
    }),
    render_type : rendererType
});

Smgr.scene.add(plane);


//조명 추가
Smgr.addAmbientLight();
Smgr.addDirectionalLight();


Smgr.updateAll();

//이벤트처리
(function(control_obj,Smgr) {

    var canvas_dom = Smgr.renderer.domElement;
    canvas_dom.addEventListener( 'mousedown', onDocumentMouseDown, false );

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize() {

        //renderer.setSize( window.innerWidth, window.innerHeight );
        //renderer.render( scene, camera );

        Smgr.camera.aspect = window.innerWidth / window.innerHeight;
        Smgr.camera.updateProjectionMatrix();

        Smgr.updateAll({
            resize : {
                width :  window.innerWidth,
                height : window.innerHeight
            }
        });

    }

    function onDocumentMouseDown( event ) {

        event.preventDefault();

        canvas_dom.addEventListener( 'mousemove', onDocumentMouseMove, false );
        canvas_dom.addEventListener( 'mouseup', onDocumentMouseUp, false );

    }

    function onDocumentMouseMove( event ) {

        var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        control_obj.rotation.y += movementX * 0.01;
        control_obj.rotation.x -= movementY * 0.01;

        Smgr.updateAll();

    }

    function onDocumentMouseUp( event ) {

        canvas_dom.removeEventListener( 'mousemove', onDocumentMouseMove );
        canvas_dom.removeEventListener( 'mouseup', onDocumentMouseUp );
    }

})(plane,Smgr);