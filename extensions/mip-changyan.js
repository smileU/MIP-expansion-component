define("mip-changyan", ["require", "zepto", "customElement"], function(t) {
	function n() {
		var e = this.element;
		var appid = e.getAttribute("appid"),
		conf = e.getAttribute("conf"),
		a = i(e);
		var width = window.innerWidth || document.documentElement.clientWidth; 
		if (width < 960) {
            window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>');
        }
        else {
            var loadJs = function (srcStr, fn) {
                var htmlTag = document.getElementsByTagName('head')[0] || document.head || document.documentElement;
                var scriptTag = document.createElement('script');
                scriptTag.setAttribute('type', 'text/javascript');
                scriptTag.setAttribute('charset', 'UTF-8');
                scriptTag.setAttribute('src', srcStr);
                if (typeof fn === 'function') {
                    if (window.attachEvent) {
                        scriptTag.onreadystatechange = function () {
                            var e = scriptTag.readyState;
                            if (e === 'loaded' || e === 'complete') {
                                scriptTag.onreadystatechange = null;
                                fn();
                            }
                        };
                    }
					else {
                        scriptTag.onload = fn;
                    }
                }
                htmlTag.appendChild(scriptTag);
            };
            loadJs('http://changyan.sohu.com/upload/changyan.js', function () {
                window.changyan.api.config({
                    appid: appid,
                    conf: conf
                });
            });
        }
	}
	var i = t("zepto"),
	s = t("customElement").create();
	return s.prototype.init = function() {
		this.createdCallback = n
	},s 
});
require(["mip-changyan"], function(t) {
    MIP.registerMipElement("mip-changyan", t);   
});
