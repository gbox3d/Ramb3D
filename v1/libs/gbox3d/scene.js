/*
 *
 * 씬그라프 관련 모듈
 *
 */

gbox3d.sceneNode = function(nodeSelector, parent) {

    if (typeof(nodeSelector) == 'string') {
        this.m_Node = $(nodeSelector);

    }
    else {
        this.m_Node = nodeSelector;
    }

    this.m_Transform = new gbox3d.core.Matrix4(true);

    if (parent != null) {
        this.m_Node.appendTo(parent);
    }

}

//현재상태에서 회전값에 rot만큼 변화주기
gbox3d.sceneNode.prototype.rotate = function(rot) {

    var node = this.m_Node;
    var prevTrn = node.css('-webkit-transform');
    //console.log(prevTrn);
    //console.log(node[0].style.webkitTransform);

    var strTrfm;
    if (prevTrn == 'none') {
        strTrfm = 'translate3d(0px,0px,0px)';
    } else {
        strTrfm = this.m_Transform.fromCss3String(prevTrn).multiply((new gbox3d.core.Matrix4(true)).setRotationDegrees(rot)).toCss3String();
    }
    //console.log(strTrfm);
    node.css('-webkit-transform', strTrfm);

    return this;
}

//현재상태에서 회전값에 trn만큼 이동하기
gbox3d.sceneNode.prototype.translate = function(trn) {
    //gbox3d_rotate(this.m_Node,rot);

    var node = this.m_Node;
    var prevTrn = node.css('-webkit-transform');
    var strTrfm;

    if (prevTrn == 'none') {
        strTrfm = 'translate3d(0px,0px,0px)';
        this.m_Transform.fromCss3String(strTrfm);
    } else {
        this.m_Transform.fromCss3String(prevTrn);
        strTrfm = this.m_Transform.fromCss3String(prevTrn).multiply((new gbox3d.core.Matrix4(true)).setTranslation(trn)).toCss3String();
    }

    //회전 시킨방향벡터구하기
    //var _trn = this.m_Transform.getRotatedVect(trn.getNomalized());

    node.css('-webkit-transform', strTrfm);

    return this;
}

//지정된값으로 바꿔주기
gbox3d.sceneNode.prototype.setTranslation = function(trn) {
    //gbox3d_rotate(this.m_Node,rot);

    var node = this.m_Node;
    var prevTrn = node.css('-webkit-transform');

    var strTrfm;
    if (prevTrn == 'none') {
        strTrfm = this.m_Transform.setTranslation(trn).toCss3String();
    } else {
        strTrfm = this.m_Transform.fromCss3String(prevTrn).setTranslation(trn).toCss3String();
    }
    //console.log(strTrfm);

    node.css('-webkit-transform', strTrfm);
    return this;

}

//지정한 값으로 회전시키기
gbox3d.sceneNode.prototype.setRotation = function(rot) {

    var node = this.m_Node;
    var prevTrn = node.css('-webkit-transform');

    var strTrfm;
    if (prevTrn == 'none') {
        strTrfm = this.m_Transform.setRotationDegrees(rot).toCss3String();

    } else {
        strTrfm = this.m_Transform.fromCss3String(prevTrn).setRotationDegrees(rot).toCss3String();
    }

    //console.log(strTrfm);

    node.css('-webkit-transform', strTrfm);
    return this;
}

//file_name 3디 오브잭트 파일명
//id 로드된 아이디값
//complete 로딩이 끝난후 콜백함수 인자로 textStatus가 success가 반홥 되면 로딩성공 그이외의 값이면 실패
//두번째 인자로 node값은 새로 로딩한 노드 객체를 넘겨준다.
gbox3d.sceneNode.prototype.load = function(file_name, id, complete) {

    var newNode;

    var super_self = this;

    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: file_name,
        success: function(data, textStatus, jqXHR) {
            console.log('success');
            //console.log(data);
            //console.log(textStatus);
            //console.log(jqXHR);

            var _node;

            if (id != null && id != '') {
                _node = $(data).attr('id', id).appendTo(super_self.m_Node);
            }
            else {
                $(data).removeAttr('id', id)
                _node = $(data).appendTo(super_self.m_Node);
            }

            newNode = new gbox3d.sceneNode(_node);

        },
        complete: function(jqXHR, textStatus) {
            console.log('complete');
            if (complete != undefined) {
                complete(textStatus, newNode);
            }

        },
        error: function(qXHR, textStatus, errorThrown) {
            console.log('error');

        }
    });

}

gbox3d.sceneNode.prototype.update = function() {

    this.m_Node.css('-webkit-transform', this.m_Transform.toString());
}

gbox3d.sceneNode.prototype.addFlyStraightAnimation = function(destPoint, time, endCallBack) {

    //var node = this;
    this.m_endCallBack = endCallBack;

    $(this.m_Node).css('-webkit-transition', '-webkit-transform ' + time + 's');
    this.setTranslation(destPoint);

    $(this.m_Node).on('webkitTransitionEnd', this.m_endCallBack);
    
    return this;
}

gbox3d.sceneNode.prototype.On = function(eventName,callBack) {
    $(this.m_Node).on(eventName, function(event) {
        callBack(event);
    });
    
    return this;
}



/////////////////////////////////////////////
///////카메라 씬노드////////////////////////////
/////////////////////////////////////////////

gbox3d.cameraSceneNode = function(device) {
    //this.m_Node = $(nodeSector);
    this.m_Transform = new gbox3d.core.Matrix4(true);

    this.m_vPos = new gbox3d.core.Vect3d();
    this.m_vRot = new gbox3d.core.Vect3d();
    this.m_vTarget = new gbox3d.core.Vect3d();
    this.m_vUp = new gbox3d.core.Vect3d(0, 1, 0);

    if (device != undefined)
    {
        var r = device.getTransform('projection');
        this.m_PerspDist = r.perspDist;
    }
    else {
        this.m_PerspDist = 700;
    }


    this.m_ViewMatrix = new gbox3d.core.Matrix4(true);
    this.m_ProjectionMatrix = new gbox3d.core.Matrix4(true);

    //$('#rambo-canvas').css('-webkit-perspective');

}

gbox3d.cameraSceneNode.prototype.update = function(device, action) {

    if (action == undefined) {

        var rMat = new gbox3d.core.Matrix4(true);
        var tMat = new gbox3d.core.Matrix4(true);


        //뷰변환은 T*R*S
        //월드 변환은 S*R*T	
        rMat.setRotationDegrees(this.m_vRot);
        tMat.setTranslation(this.m_vPos.clone().multiplyThisWithScalReturnMe(-1));  //(viewMat) * prjectionMat

        this.m_ViewMatrix = rMat.multiply(tMat); //T*R

        device.setTransform('view-persp',
                {
                    eye: this.m_vPos,
                    eyeRot: this.m_vRot,
                    perspDist: this.m_PerspDist

                }
        );

    }
    else {
        switch (action)
        {
            case 'view-matrix':

                device.setTransform('view-matrix', this.m_ViewMatrix);

                break;

            case 'view-target':

                device.setTransform('view', {
                    eye: this.m_vPos,
                    target: this.m_vTarget,
                    up: this.m_vUp
                }
                );

                this.m_ViewMatrix = device.m_viewMatrix;

                break;

            case 'proj-only':
                break;

            default :
                console.log('unknown update action type');
                break;
        }
    }

    //this.m_Node.css('-webkit-transform', this.m_ViewMatrix.toCss3String());
    //this.m_Node.parents('#rambo-canvas').css('-webkit-perspective',this.m_PerspDist + 'px');
    //device.setTransform('view-matrix',this.m_ViewMatrix);
    //device.setTransform('projection',{perspective:this.m_PerspDist});

    return this;
}

gbox3d.cameraSceneNode.prototype.setPosition = function(pos) {

    //console.log(pos.toString());

    this.m_vPos.setTo(pos);
    return this;
}

gbox3d.cameraSceneNode.prototype.setRotation = function(rot) {

    this.m_vRot.setTo(rot);
    return this;
}


gbox3d.cameraSceneNode.prototype.setTarget = function(target)
{
    this.m_vTarget.setTo(target)
    return this;

}

gbox3d.cameraSceneNode.prototype.setUpVector = function(vUp)
{
    this.m_vUp.setTo(vUp)
    return this;

}

gbox3d.cameraSceneNode.prototype.rotate = function(rot) {

    var rMat = new gbox3d.core.Matrix4(true);
    rMat.setRotationDegrees(rot);

    this.m_ViewMatrix = rMat.multiply(this.m_ViewMatrix);
    //각도값 재설정
    this.m_vRot = this.m_ViewMatrix.getRotationDegrees();

    return this;
}

gbox3d.cameraSceneNode.prototype.translate = function(trn) {

    var tMat = new gbox3d.core.Matrix4(true);

    tMat.m00 = this.m_ViewMatrix.m00;
    tMat.m01 = this.m_ViewMatrix.m04;
    tMat.m02 = this.m_ViewMatrix.m08;


    tMat.m04 = this.m_ViewMatrix.m01;
    tMat.m05 = this.m_ViewMatrix.m05;
    tMat.m06 = this.m_ViewMatrix.m09;


    tMat.m08 = this.m_ViewMatrix.m02;
    tMat.m09 = this.m_ViewMatrix.m06;
    tMat.m10 = this.m_ViewMatrix.m10;

    var _trn = tMat.rotateVect(trn.getNormalized());

    _trn.multiplyThisWithScal(trn.getLength() * -1);

    this.m_vTarget.addToThis(_trn);
    this.m_vPos.addToThis(_trn);

    return this;

}



gbox3d.cameraSceneNode.prototype.setProjection = function(data) {

    this.m_PerspDist = data.perspDist;
    this.m_ProjectionMatrix.setTranslation(new gbox3d.core.Vect3d(0, 0, data.perspDist));

    //device.setTransform('projection',{perspective:this.m_PerspDist});
    //console.log(this.m_Node.parent().attr('id'));

    return this;
}







