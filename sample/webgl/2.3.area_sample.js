/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 8. 20.
 * Time: 오후 12:24
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


var dataset = [ [30,20],[60,30],[30,40],[70,10],[80,10],[45,30],[30,40],[20,50],[40,35],[20,35]];


var material =  new THREE.MeshLambertMaterial(
    {
        color: '#ff0000',
        emissive : '#880000',
        shading: THREE.FlatShading,
        transparent: true,
        opacity : 0.8
    });



//지오 메트리 객체 만들기
var geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
var object = new THREE.Mesh(
    geometry,
    material
);


for(var i=0;i<dataset.length;i++) {

    geometry.vertices[i].y = dataset[i][0] - 50;
}

//지오메트리를 다이나믹하게노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();


Smgr.scene.add(object);

////////////////
//
geometry = new THREE.PlaneGeometry(256,50,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
object = new THREE.Mesh(
    geometry,
    material

);
for(var i=0;i<dataset.length;i++) {

    var dep = (dataset[i][0] - 50);

    geometry.vertices[i].z = dep;
    geometry.vertices[i+dataset.length].z = dep;
}

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationX( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

Smgr.scene.add(object);

////////////////////
//측면

geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,0,-50);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(180));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

for(var i=0;i<dataset.length;i++) {

    geometry.vertices[(dataset.length-1) - i].y = dataset[i][0] - 50;
}

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material

);
Smgr.scene.add(object);

///////////////////
//정면

//console.log(dataset[dataset.length-1][0]);
geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[0].y = dataset[dataset.length-1][0] - 50;
geometry.vertices[1].y = dataset[dataset.length-1][0] - 50;

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

///////////////////
//후면

//console.log(dataset[dataset.length-1][0]);
geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[0].y = dataset[0][0] - 50;
geometry.vertices[1].y = dataset[0][0] - 50;

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(-128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

///////////////////
//밑면

geometry = new THREE.PlaneGeometry(256,50);
var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,-50,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationX( THREE.Math.degToRad(90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

////////////////////////////////////////////////////////
///두번째 영역
//////////////////////////

var material =  new THREE.MeshLambertMaterial(
    {
        color: '#00ff00',
        emissive: '#008800', //암흑 컬러
        shading: THREE.FlatShading,
        transparent: true,
        opacity : 0.8
    });



//지오 메트리 객체 만들기
var geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
var object = new THREE.Mesh(
    geometry,
    material
);


for(var i=0;i<dataset.length;i++) {

    geometry.vertices[ i].y = (dataset[i][0]+dataset[i][1]) - 50;
    geometry.vertices[(dataset.length ) + i].y = dataset[i][0] - 50;
}

//지오메트리를 다이나믹하게노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();


Smgr.scene.add(object);

////////////
//측면
geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,0,-50);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(180));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

for(var i=0;i<dataset.length;i++) {

    geometry.vertices[(dataset.length-1) - i].y = (dataset[i][0]+dataset[i][1]) - 50;
    geometry.vertices[(dataset.length) + ((dataset.length-1) - i)].y = dataset[i][0] - 50;
}

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material

);
Smgr.scene.add(object);


//////////
//윗면
geometry = new THREE.PlaneGeometry(256,50,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
object = new THREE.Mesh(
    geometry,
    material

);
for(var i=0;i<dataset.length;i++) {

    var dep = (dataset[i][0] + dataset[i][1] - 50);

    geometry.vertices[i].z = dep;
    geometry.vertices[i+dataset.length].z = dep;
}

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationX( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

Smgr.scene.add(object);

/////////////////////
///전면
geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[0].y = dataset[dataset.length-1][0] + dataset[dataset.length-1][1] - 50;
geometry.vertices[1].y = dataset[dataset.length-1][0] + dataset[dataset.length-1][1] - 50;

geometry.vertices[2].y = dataset[dataset.length-1][0] - 50;
geometry.vertices[3].y = dataset[dataset.length-1][0] - 50;


var mat1 = new THREE.Matrix4();
mat1.makeTranslation(128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

/////////////////////
///후면
geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[0].y = dataset[0][0]+ dataset[0][1] - 50;
geometry.vertices[1].y = dataset[0][0]+ dataset[0][1] - 50;
geometry.vertices[2].y = dataset[0][0] - 50;
geometry.vertices[3].y = dataset[0][0] - 50;

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(-128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

/////////////////////


////////////////////////////////////////////////////////
///세번째 영역
//////////////////////////

//우측
var material =  new THREE.MeshLambertMaterial(
    {
        color: '#0000ff',
        emissive: '#0000ff', //암흑 컬러
        shading: THREE.FlatShading,
        transparent: true,
        opacity : 0.8
    });

//지오 메트리 객체 만들기
var geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
var object = new THREE.Mesh(
    geometry,
    material
);


for(var i=0;i<dataset.length;i++) {

    //geometry.vertices[ i].y = (dataset[i][0]+dataset[i][1]) - 50;
    geometry.vertices[(dataset.length ) + i].y = (dataset[i][0]+dataset[i][1]) - 50;
}

//지오메트리를 다이나믹하게노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();


Smgr.scene.add(object);

//////////////////////
//좌측
///////////////////////
geometry = new THREE.PlaneGeometry(256,100,dataset.length-1);

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,0,-50);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(180));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

for(var i=0;i<dataset.length;i++) {

//    geometry.vertices[(dataset.length-1) - i].y = (dataset[i][0]+dataset[i][1]) - 50;
    geometry.vertices[(dataset.length) + ((dataset.length-1) - i)].y = (dataset[i][0]+dataset[i][1]) - 50;//dataset[i][0] - 50;
}

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material

);
Smgr.scene.add(object);
///////////////////////////
///상단

geometry = new THREE.PlaneGeometry(256,50,dataset.length-1);


//메쉬 오브잭트 만들기 , 지오메트리와 메트리얼로 메쉬 객체를 만든다.
object = new THREE.Mesh(
    geometry,
    material

);

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(0,50,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationX( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

Smgr.scene.add(object);

////////////////////////////
//전면

geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[2].y = dataset[dataset.length-1][0] + dataset[dataset.length-1][1] - 50;
geometry.vertices[3].y = dataset[dataset.length-1][0] + dataset[dataset.length-1][1] - 50;


var mat1 = new THREE.Matrix4();
mat1.makeTranslation(128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);

///////////////////////////
///후면

geometry = new THREE.PlaneGeometry(50,100);

geometry.vertices[2].y = dataset[0][0]+ dataset[0][1] - 50;
geometry.vertices[3].y = dataset[0][0]+ dataset[0][1] - 50;

var mat1 = new THREE.Matrix4();
mat1.makeTranslation(-128,0,-25);
var mat2 = new THREE.Matrix4();
mat2.makeRotationY( THREE.Math.degToRad(-90));
mat1.multiply(mat2);
geometry.applyMatrix(mat1);

//노멀벡터 재설정
geometry.dynamic = true;
geometry.computeFaceNormals();
geometry.computeVertexNormals();

object = new THREE.Mesh(
    geometry,
    material
);
Smgr.scene.add(object);
////////////////////////////

//조명 추가
Smgr.addAmbientLight();
Smgr.addDirectionalLight();

//트랙볼 카메라 컨트롤러 생성
var tbcc = Smgr.addTBCameraController(
    {
        Smgr : Smgr,
        center : new THREE.Vector3(0,0,0),
        radius : 700
    }
);
//new THREE.Vector3(THREE.Math.degToRad(25),THREE.Math.degToRad(-45),0)
tbcc.setRotation(THREE.Math.degToRad(0),0,0)
    .apply();

Smgr.updateAll();