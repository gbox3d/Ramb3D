/*
 * 
@author : 도플광어 gbox3d

v 0.1

it need jquery 1.7.1 version
 *
 *
 *
 *
 */

gbox3d.io = {};

gbox3d.io.joytouch = function(event_target,param) {
	
	var m_start = new gbox3d.core.Vect2d(0, 0);
	var m_end = new gbox3d.core.Vect2d(0, 0);
	this.m_angle = 0;
	this.m_dist = 0;
	var m_touched = false;
	
	this.touchMoveHandler = function (e) {
		e.preventDefault();
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		
		this.MoveHandler(touch);
	};
	
	this.touchStartHandler = function (e) {
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		this.StartHandler(touch);
		//$('h1').text('touchStart:' + touch.pageX + "ypos:" + touch.pageY );
	
	}
	
	this.touchEndHandler = function (e) {
		var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
		this.UpHandler(touch);
		//$('h1').text('touchEnd:' + touch.pageX + "ypos:" + touch.pageY );
	}

	
	
	this.StartHandler = function(evt) {
		m_start.set(evt.pageX, evt.pageY);
		m_touched = true;
	};
	
	this.MoveHandler = function(evt) {

		if(m_touched == true) {
			m_end.set(evt.pageX, evt.pageY);

			// end-start( end 로 향하는 방향벡터 구하기.)
			//var diff_vec = m_start.sub(m_end);
			var diff_vec = m_end.sub(m_start);
			this.m_dist = diff_vec.getDistance();
			this.m_angle = diff_vec.getAngle();
		}
				
		//console.log(this.m_angle);
	};
	
	this.UpHandler = function(evt) {
		m_touched = false;
		m_start.set(evt.pageX, evt.pageY);
		m_end.set(evt.pageX, evt.pageY);
		this.m_dist = 0;
	};
	

	//event_target.bind();
	//var obj = this;
	
	(function(obj) {
		if (param == 'touch') {
			event_target.bind('touchmove', function(evt){obj.touchMoveHandler(evt)});
			event_target.bind('touchstart', function(evt){obj.touchStartHandler(evt)});
			event_target.bind('touchend', function(evt){obj.touchEndHandler(evt)});
		} else if (param = 'mouse') {
			event_target.bind('mousemove', function(evt) {obj.MoveHandler(evt)});
			event_target.bind('mousedown', function(evt) {obj.StartHandler(evt)});
			event_target.bind('mouseup', function(evt) {obj.UpHandler(evt)});		}
	})(this); 
	
	
}

/*
gbox3d.io.joytouch.prototype.m_start = null;
gbox3d.io.joytouch.prototype.m_end = null;
gbox3d.io.joytouch.prototype.m_angle = 0;

gbox3d.io.joytouch.prototype.StartHandler = function(evt) {
	this.m_start.set(evt.pageX, evt.pageY);
}
gbox3d.io.joytouch.prototype.MoveHandler = function(evt) {

	this.m_end.set(evt.pageX, evt.pageY)

	var diff_vec = this.m_end.sub(this.m_start);
	this.m_angle = diff_vec.getAngle();
	
	//console.log(this.m_angle);
}

*/






