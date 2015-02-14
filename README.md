Ramb3d framework for three.js
========

html5 web 3d framework

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/3r7O31YLBe8/0.jpg)](http://www.youtube.com/watch?v=3r7O31YLBe8)


[project page](http://gbox3d.github.io/Ramb3D/)

three.js이용해서 만든 웹3D 실시간 랜더러개발프레임웍입니다.

다음은 간단한 코드 예제입니다. 
SceneManager의 Setup에 초기화 코드가 들어갑니다.
이런식으로 이객체를 어플리캐이션 프레임웍으로도 사용할수있습니다.

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title> object sample </title>

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=no">

    <script src='../libs/jquery-2.0.3.min.js'></script>

    <script src='../libs/threejs/three.js'></script>
    <script src="../libs/threejs/js/controls/OrbitControls.js"></script>
    <script src='../libs/threejs/CSS3DRenderer.js'></script>
    <script src="../libs/ramb3d/core.js"></script>

</head>
<body style="margin: 0px;" >

<script>

    var Smgr = new ramb3d.scene.SceneManager({
        camera : {
            fov : 45,
            far : 5000,
            near : 1,
            position : new THREE.Vector3(0, 3, 10),
            lookat : new THREE.Vector3()

        },
        renderer : {
            type : 'webgl',
            clear : {
                color : 0x000000,
                alpha : 1
            }

        },
        setup : function() {

            //3디오브잭트용 리소스 생성
            var geometry = new THREE.CubeGeometry(1,1,1);
            var material = new THREE.MeshBasicMaterial(
                    {
                        color: 0x00ff00
                    }
            );
            var texture = THREE.ImageUtils.loadTexture( '../res/RTS_Crate.png');
            texture.anisotropy = this.renderer.getMaxAnisotropy();
            var material2 = new THREE.MeshBasicMaterial(
                    {
                        map : texture
                    }
            );

            //메쉬오브잭트 만들기
            var node = new THREE.Mesh(geometry, material);
            this.scene.add(node);

            var node = new THREE.Mesh(geometry, material2);
            node.position.set(1,0,-1);
            node.rotation.set(0,THREE.Math.degToRad(45),0);
            this.scene.add(node);


            //카메라의 현재 위치 기준으로 시작한다.
            var controls = new THREE.OrbitControls( this.camera );
            controls.target = new THREE.Vector3( 0, 0, 0 ); //바라보는 위치
            controls.update();

            //그리드헬퍼
            var helper =  new THREE.GridHelper( 50, 1 );
            helper.setColors(0x00ff00,0xff0000);
            this.scene.add(helper);

        },
        event : {
            onWindowResize : function() {
                this.updateAll({
                    resize : {
                        width :  window.innerWidth,
                        height : window.innerHeight
                    }
                });
            },
            onUpdate : function(event) {


                this.updateAll();
            },
            onMouseMove : function(event) {

                //원점 기준으로 마우스 포잍어 변경하기
                var mx = ( event.offsetX / this.window_size.width ) * 2 - 1;
                var my = - ( event.offsetY / this.window_size.height ) * 2 + 1;
            },
            onKeyDown : function(event) {

                console.log(event);

            }
        }
    });






</script>

</body>
</html>


```

