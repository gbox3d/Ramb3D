/**
 * Created with JetBrains WebStorm.
 * User: gbox3d
 * Date: 13. 4. 3.
 * Time: 오후 10:03
 * To change this template use File | Settings | File Templates.
 */


THREE.CSS3DObject = function ( param ) {

    THREE.Object3D.call( this );



    if(param.element != undefined) {

        this.initElement(param.element);

    }
    else if(param.url != undefined) {

        var that = this;

        (function (file_name, id, complete) {

            $.ajax({
                type: 'GET',
                dataType: 'html',
                url: file_name,
                success: function(data, textStatus, jqXHR) {

                    that.initElement($(data)[0]);

                },
                complete: function(jqXHR, textStatus) {
                    //console.log('complete');
                    if (complete != undefined) {
                        complete(textStatus, that);
                    }

                },
                error: function(qXHR, textStatus, errorThrown) {
                    console.log('error');

                }
            });

        })(param.url,param.id,param.complete);

    }
    else {

        this.initElement(param)
    }


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

    return this;

}

THREE.CSS3DObject.prototype.updateCSS = function() {
    //css3 스타일 스트링 업데이트
    var element = this.element;

    var style = this.matrix.toCSSMatrix();

    element.style.WebkitTransform = style;
    element.style.MozTransform = style;
    element.style.oTransform = style;
    element.style.transform = style;

    return this;

}

THREE.CSS3DObject.prototype.add = function(object) {

    THREE.Object3D.prototype.add.call(this,object);

    this.element.appendChild(object.element);


    return this;
}

THREE.CSS3DObject.prototype.initElement = function(element) {
    this.element = element;
    this.element.style.position = "absolute";
    this.element.style.WebkitTransformStyle = 'preserve-3d';
    this.element.style.MozTransformStyle = 'preserve-3d';
    this.element.style.oTransformStyle = 'preserve-3d';
    this.element.style.transformStyle = 'preserve-3d';
}




//gbox3d fatch end
//////////////////