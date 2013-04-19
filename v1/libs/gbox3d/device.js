
/*
 * 
 * 일리히트에서 디바이스가 하는 역활을 하도록 만들고있음
 * irrlicht css3 device ?!
 * 
 * 
 */



gbox3d.device = function(width, height, persp) {

    var canvasSelector = '#rambo-canvas';
    var viewportSelector = '#rambo-canvas  > .viewport';

    this.setProjectionDist = function(perspDist, perspectiveOrigin) {

        this.m_Persp = perspDist;

        var PerspDist = (new gbox3d.core.Vect3d(0, 0, this.m_Persp));
        //var perspMat = new gbox3d.core.Matrix4(true);
        this.m_projMatrix.setTranslation(PerspDist);

        $(canvasSelector).css('-webkit-perspective', perspDist + 'px');

        if (perspectiveOrigin != undefined)
        {
            $(canvasSelector).css('-webkit-perspective-origin', perspectiveOrigin);
        }
    }

    this.getTransform = function(type) {

        var result;

        switch (type) {
            case 'projection':

                result = {
                    Matrix: this.m_projMatrix,
                    Css: $(canvasSelector).css('-webkit-perspective'),
                    perspDist: this.m_Persp,
                    perspOrigin: $(canvasSelector).css('-webkit-perspective-origin')
                };



                break;

            case 'view':

                result = {
                    Matrix: this.m_viewMatrix,
                    Css: this.m_viewPortObj.css('-webkit-transform')
                };
                break;

            default:
                break;
        }

        return result;

    }

    this.m_viewMatrix = new gbox3d.core.Matrix4(true);
    this.m_projMatrix = new gbox3d.core.Matrix4(true);
    this.m_vCamPos = new gbox3d.core.Vect3d();
    this.m_vLookAt = new gbox3d.core.Vect3d();

    this.m_viewPortObj = $(viewportSelector);


    if (width.height == undefined) {
        $('#rambo-canvas, #rambo-canvas > .viewport').css('width', width + 'px');
        $('#rambo-canvas, #rambo-canvas > .viewport').css('height', height + 'px');
        $('#rambo-canvas > .viewport > .origin').css('-webkit-transform', 'translate3d(' + width / 2 + 'px,' + height / 2 + 'px,0px)');

        //this.m_viewPortObj = $('#rambo-canvas  > .viewport');
        this.m_viewSize = {width: width, height: height};


        if (persp != undefined) {
            this.setProjectionDist(persp);
        }
    }
    else {
        var param = width;


        $('#rambo-canvas, #rambo-canvas > .viewport').css('width', param.width + 'px');
        $('#rambo-canvas, #rambo-canvas > .viewport').css('height', param.height + 'px');
        $('#rambo-canvas > .viewport > .origin').css('-webkit-transform', 'translate3d(' + param.width / 2 + 'px,' + param.height / 2 + 'px,0px)');

        this.m_viewSize = {width: param.width, height: param.height};



        if (param.persp != undefined) {
            //this.m_Persp = persp; //퍼스펙티브 변수(실제 화면과 카메라와의 거리)
            //this.setTransform('projection',param.persp);
            this.setProjectionDist(param.persp);
        }

        if (param.backgroundColor != undefined) {
            $(canvasSelector).css('background-color', param.backgroundColor);
        }
    }

   
    /*
     * 시스템 인벤트 초기화
     * 
     */

    $('#rambo-canvas').on('click', function(event) {

        $($(event.target).parents('.gbox3d-node-objroot:eq(0)')).trigger('pick-click');

    });
}



gbox3d.device.prototype.setTransform = function(type, param)
{
    var matResult = new gbox3d.core.Matrix4(true);

    switch (type) {

        case 'view-matrix': //뷰설정
            //뷰포트에 직접 변환을 적용한다.
            param.copyTo(this.m_viewMatrix);
            //console.log(this.m_viewMatrix.toCss3String());

            break;

        case 'view':

            this.m_vCamPos = param.eye;
            this.m_vLookAt = param.target;
            this.m_viewMatrix.buildCameraLookAtMatrixLH_CSS3(
                    param.eye, param.target, param.up
                    );

            //console.log(this.m_viewMatrix.toCss3String());
            //matResult = this.m_projMatrix.multiply(this.m_viewMatrix); //pT * (viewMat)
            //console.log(this.m_viewMatrix.toCss3String());
            //this.m_viewPortObj.css('-webkit-transform', this.m_viewMatrix.toCss3String());

            break;

        case 'view-persp':

            this.m_vCamPos = param.eye;
            var vEyePos = param.eye;
            var vEyeRot = param.eyeRot;

            var vMat = new gbox3d.core.Matrix4(true); //뷰메트릭스
            var rMat = new gbox3d.core.Matrix4(true);
            var tMat = new gbox3d.core.Matrix4(true);

            this.setProjectionDist(param.perspDist);

            // var PerspDist = (new gbox3d.core.Vect3d(0,0,this.m_Persp));
            // var perspMat = new gbox3d.core.Matrix4(true);
            // perspMat.setTranslation(PerspDist);
            rMat.setRotationDegrees(vEyeRot)
            tMat.setTranslation(new gbox3d.core.Vect3d(-vEyePos.X, -vEyePos.Y, -vEyePos.Z));

            vMat = rMat.multiply(tMat);

            vMat.copyTo(this.m_viewMatrix);

            //vMat = perspMat.multiply(vMat); //pT * (viewMat)
            //this.m_viewPortObj.css('-webkit-transform', this.m_viewMatrix.toCss3String());
            //this.m_viewPortObj.css('-webkit-transform', vMat.toCss3String());

            break;

        case 'projection': //투영설정

            this.setProjectionDist(param.perspDist);

            // this.m_Persp = param.perspective;
            // $('#rambo-canvas').css('-webkit-perspective',param.perspective + 'px');
// 		
            // if(param.perspectiveOrigin != undefined)
            // {
            // $('#rambo-canvas').css('-webkit-perspective',param.perspectiveOrigin);
            // }



            break;
    }

    //결합법칙 적용
    // viewMat  = R * T
    // pT * (viewMat)	
    matResult = this.m_projMatrix.multiply(this.m_viewMatrix);
    this.m_viewPortObj.css('-webkit-transform', matResult.toCss3String());

    return this;
}


//////////////////////
//////////////////////



////////////////////////////////////////////////////////////////////////
///////////어플리캐이션 샘플
////////////////////////////////////////////////////////////////////////


gbox3d.device.prototype.InitSampleApp_t1 = function() {

    var vEye = new gbox3d.core.Vect3d();
    var vRot = new gbox3d.core.Vect3d();

    //슈퍼 샐프 만들기
    var super_self = this;

    (update = function() {

        var rMat = new gbox3d.core.Matrix4(true);
        var _vEye = new gbox3d.core.Vect3d();

        vRot.X = $('#control-pannel-t1 div input:eq(0)').val();
        vRot.Y = $('#control-pannel-t1 div input:eq(1)').val();
        vEye.Z = $('#control-pannel-t1 div input:eq(2)').val();

        rMat.setRotationDegrees(vRot);
        rMat.rotateVect2(_vEye, vEye);

        super_self.setTransform('view', {
            eye: _vEye,
            target: new gbox3d.core.Vect3d(0, 0, 0),
            up: new gbox3d.core.Vect3d(0, 1, 0)
        }
        );
        //super_self.m_viewMatrix.buildCameraLookAtMatrixLH_CSS3(_vEye, new gbox3d.core.Vect3d(0, 0, 0), new gbox3d.core.Vect3d(0, 1, 0));
        //뷰포트에 직접 변환을 적용한다.
        //super_self.m_viewPortObj.css('-webkit-transform', super_self.m_viewMatrix.toCss3String());
    })();

    $('#control-pannel-t1 div input').bind('change', function(event) {
        $(this).next().text($(this).val());
        update();
    });

    return this;
}


gbox3d.device.prototype.InitSampleApp_t2 = function(targetObj) {
    var tMat = new gbox3d.core.Matrix4(true);
    var rMat = new gbox3d.core.Matrix4(true);
    var vRot = new gbox3d.core.Vect3d(0, 0, 0);
    var vTrn = new gbox3d.core.Vect3d(0, 0, 0);

    if (targetObj == undefined) {
        targetObj = $('#cube');
    }

    (update = function() {

        vTrn.X = $('#control-pannel-t2 div input:eq(0)').val();
        vTrn.Y = $('#control-pannel-t2 div input:eq(1)').val();
        vTrn.Z = $('#control-pannel-t2 div input:eq(2)').val();

        tMat.setTranslation(vTrn);
        rMat.setRotationDegrees(vRot);

        var result = tMat.multiply(rMat);

        targetObj.css('-webkit-transform', result.toCss3String());

    })();

    $('#control-pannel-t2 div input').bind('change', function(event) {
        $(this).next().text($(this).val());
        update();
    });
}

