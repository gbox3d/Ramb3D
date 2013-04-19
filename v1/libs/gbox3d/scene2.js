/*
 *
 * 씬그라프 관련 모듈
 *
 */

//gbox3d.sceneNode = function(nodeSelector, parent) {
//
//    if (typeof(nodeSelector) == 'string') {
//        this.m_Node = $(nodeSelector);
//
//    }
//    else {
//        this.m_Node = nodeSelector;
//    }
//
//    this.m_Transform = new gbox3d.core.Matrix4(true);
//
//    if (parent != null) {
//        this.m_Node.appendTo(parent);
//    }
//
//}

gbox3d.sceneNode2 = Backbone.Model.extend({
    inittialize: function() {

    },
    defaults: {
        Node: null,
        Transform: new gbox3d.core.Matrix4(true)
    },
    rorate: function(rot) {
        var node = this.get('Node');
        //var transform = this.get('Transform');
        var prevTrn = node.css('-webkit-transform');
        //console.log(prevTrn);
        //console.log(node[0].style.webkitTransform);

        var strTrfm;
        if (prevTrn == 'none') {
            strTrfm = 'translate3d(0px,0px,0px)';
        } else {
            strTrfm = this.attribute.Transform.fromCss3String(prevTrn).multiply((new gbox3d.core.Matrix4(true)).setRotationDegrees(rot)).toCss3String();
        }
        //console.log(strTrfm);
        node.css('-webkit-transform', strTrfm);

        return this;
    },
    translate: function(trn) {
        var node = this.attribute.Node;
        var prevTrn = node.css('-webkit-transform');
        var strTrfm;

        if (prevTrn == 'none') {
            strTrfm = 'translate3d(0px,0px,0px)';
            this.attributes.Transform.fromCss3String(strTrfm);
        } else {
            this.attribute.Transform.fromCss3String(prevTrn);
            strTrfm = this.attribute.Transform.fromCss3String(prevTrn).multiply((new gbox3d.core.Matrix4(true)).setTranslation(trn)).toCss3String();
        }

        //회전 시킨방향벡터구하기
        //var _trn = this.m_Transform.getRotatedVect(trn.getNomalized());

        node.css('-webkit-transform', strTrfm);

        return this;

    },
    //지정된값으로 바꿔주기
    setTranslation: function(trn) {
        //gbox3d_rotate(this.m_Node,rot);

        var node = this.attributes.Node;
        var prevTrn = node.css('-webkit-transform');

        var strTrfm;
        if (prevTrn == 'none') {
            strTrfm = this.attributes.Transform.setTranslation(trn).toCss3String();
        } else {
            strTrfm = this.attributes.Transform.fromCss3String(prevTrn).setTranslation(trn).toCss3String();
        }
        //console.log(strTrfm);

        node.css('-webkit-transform', strTrfm);
        return this;


    },
//지정한 값으로 회전시키기
    setRotation: function(rot) {

        var node = this.attribute.Transform.Node;
        var prevTrn = node.css('-webkit-transform');

        var strTrfm;
        if (prevTrn == 'none') {
            strTrfm = this.attribute.Transform.setRotationDegrees(rot).toCss3String();

        } else {
            strTrfm = this.attribute.Transform.fromCss3String(prevTrn).setRotationDegrees(rot).toCss3String();
        }

        //console.log(strTrfm);

        node.css('-webkit-transform', strTrfm);
        return this;
    }
});








