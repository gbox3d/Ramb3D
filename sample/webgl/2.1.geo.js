/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 20.
 * Time: 오전 10:35
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


//지오 메트리 객체 만들기
var geometry = new THREE.Geometry();

//버텍스 생성
geometry.vertices.push( new THREE.Vector3( -128,  128, 0 ) );
geometry.vertices.push( new THREE.Vector3( -128, -128, 0 ) );
geometry.vertices.push( new THREE.Vector3(  128, -128, 0 ) );

//면 설정
geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

//구형 바운더리 영역 계산하기 , Box 형식도 있음
geometry.computeBoundingSphere();


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
var object = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
        color: '#ff0000'
    })
);


Smgr.scene.add(object);


//조명 추가

Smgr.addAmbientLight();
Smgr.addDirectionalLight();

Smgr.updateAll();

