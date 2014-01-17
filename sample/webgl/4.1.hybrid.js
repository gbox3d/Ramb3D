
/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 30.
 * Time: 오후 4:02
 * To change this template use File | Settings | File Templates.
 */



    /*

    씬메니져를 두개 만들어서 하이브리드 시키는 방법

     */


var camera_value = {
    fov : 45,
    far : 5000,
    near : 1,
    position : new THREE.Vector3(0, 0, 500),
    lookat : new THREE.Vector3()

};

var Smgr_webgl = new ramb3d.scene.SceneManager({
    camera : camera_value,
    renderer : {
        container : document.querySelector('#chart-main-window .container-webgl'),
        type : 'webgl'
    },
    window_size : {
        width : 640,
        height: 480
    }
});

//var camera = Smgr_webgl.camera;


var Smgr_css = new ramb3d.scene.SceneManager({
    camera : camera_value,
    renderer : {
        container : document.querySelector('#chart-main-window .container-css3d'),
        type : 'css3'
    },
    window_size : {
        width : 640,
        height: 480
    }
});

Smgr_css.camera = Smgr_webgl.camera;


var plane = ramb3d.util.createPlane({
    name : 'hello-plane',
    width : 128,
    height : 128,
    color : 'red',
    render_type : 'webgl'
});

Smgr_webgl.scene.add(plane);


var object = ramb3d.util.createPlane({
    name : 'hello-plane',
    width : 128,
    height : 128,
    texture : '../res/park.jpg',
    render_type : 'css3'
});

object.position.x = 128;
Smgr_css.scene.add(object);


//트랙볼 카메라 컨트롤러 생성
var tbcc = Smgr_webgl.addTBCameraController(
    {
        Smgr : Smgr_webgl,
        subSmgr : Smgr_css,
        center : new THREE.Vector3(0,0,0),
        radius : 1700
    }
);

tbcc.setRotation(THREE.Math.degToRad(-25),0,0)
    .apply();

Smgr_webgl.updateAll();
Smgr_css.updateAll();


/*
//게임 루프
requestAnimationFrame(
    function loop() {

        Smgr_webgl.updateAll();
        Smgr_css.updateAll();

        requestAnimationFrame(loop);

    }

);
*/




