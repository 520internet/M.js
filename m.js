
/**
 * JavaScript Document
 * @如果你优化、修复、补充了任何希望你可以发送邮件至 webmaster@520internet.com
 * 以下部分代码片段来源于网络！你可以自由复制拷贝使用！
 * https://github.com/520internet/m.js
 **/
(function(window){
	"use strict";
	var M = {
		debug : function(){
			console.log(M.client.userAgent);
			console.log(M.url.href);
			console.log(M.url.referrer);
			console.log(new Date());
			console.log(window.location);
			console.log(window.navigator);
		},

		/**
		 * 加载外部 javascript 脚本，主要针对存在依赖的方法 *M* 此处未测试
		 * @param string filepath, 文件路径;
		 * @param object config, 配置;
		 	async 异步加载;
		 	cache 是否缓存;
			onload 载入完成回调函数;
			onerror 载入出错回调函数;
		 * @return null;
		 **/
		requirejs : function(filepath, config){
			var head = document.getElementsByTagName('head')[0],
				script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = config.async ? 'async' : '';
			script.src = config.cache ? filepath+'?r='+Math.random() : filepath;
			head.appendChild(script);
		},

		/**
		 * 选择器
		 * @param string id, DOM ID;
		 * @return object;
		 **/
		getBy : {
			lastUpdate : '2016-8-10 03:09:49',
			id : function(id){
				return document.getElementById(id);
			},
			name : function(name){
				return document.getElementsByName(name);
			},
			tag : function(tag){
				return document.getElementsByTagName(tag);
			},
			className : function(className){
				return document.getElementsByClassName(className);
			}
		},

		// 客户端
		client : {
			lastUpdate : '2016-04-21 22:58:47',
			userAgent : navigator.userAgent.toLowerCase(),

			/**
			 * 设备
			 * @return object, {'tag': '小写标签', 'name': '名称'};
			 **/
			device : function(){
				// arguments
				var device = { 'tag': 'other', 'name': 'Other' },
					userAgent = M.client.userAgent;

				if (userAgent.indexOf('windows') != -1){
					device = { 'tag': 'pc', 'name': 'PC' };
				} else if(userAgent.indexOf('ipad') != -1) {
					device = { 'tag': 'ipad', 'name': 'iPad' };
				} else if(userAgent.indexOf('macintosh') != -1) {
					device = { 'tag': 'mac', 'name': 'Mac' };
				} else if(userAgent.indexOf('ipod touch') != -1) {
					device = { 'tag': 'ipod touch', 'name': 'iPod Touch' };
				} else if(userAgent.indexOf('iphone') != -1) {
					device = { 'tag': 'iphone', 'name': 'iPhone' };
				} else if(userAgent.indexOf('mobile') != -1) {
					device = { 'tag': 'mobile', 'name': 'Mobile' };
				}
				return device;
			},

			// 系统
			system : {
				/**
				 * 类型
				 * @return string;
				 **/
				type : function(){
					var type = 'other',
						userAgent = M.client.userAgent;

					if (userAgent.indexOf('windows') != -1){
						type = 'windows';
					} else if(userAgent.indexOf('mac os') != -1) {
						if (userAgent.indexOf('macintosh') != -1){
							type = 'macos';
						} else {
							type = 'ios';
						}
					} else if(userAgent.indexOf('android') != -1) {
						type = 'android';
					}
					return type;
				},

				/**
				 * 位
				 * @return string;
				 **/
				bit : function(){
					var bit = '32',
						userAgent = M.client.userAgent;
					if (userAgent.indexOf('wow64') != -1 || userAgent.indexOf('x86_64') != -1 || userAgent.indexOf('win64') != -1 || userAgent.indexOf('x64') != -1){
						bit = '64';
					}
					return bit;
				},

				/**
				 * 系统名称
				 * @return object, {'tag': '小写标签', 'name': '名称'};
				 **/
				name : function(){
					/**
					 * 还有 Win32 | Windows95 | Windows 97 | Windows 98 | Windows Me | Windows XP | Windows7 | Windows8 | Windows NT | Windows Server 2000 | Windows Server 2003 | Windows Server 2008 | Windows Server 2012
					 * FreeBSD | CentOS | RedHat | Ubuntu | Fedora
					 **/
					var system = {'tag': 'other', 'name': 'Other'},
						userAgent = M.client.userAgent;
					if (userAgent.indexOf('windows nt 10') != -1){
						system = {'tag': 'win10', 'name': 'Windows 10'};
					} else if (userAgent.indexOf('windows nt 6.2') != -1){
						system = {'tag': 'win8', 'name': 'Windows 8'};
					} else if(userAgent.indexOf('windows nt 6.1') != -1) {
						system = {'tag': 'win7', 'name': 'Windows 7'};
					} else if(userAgent.indexOf('windows nt 5.1') != -1) {
						system = {'tag': 'winxp', 'name': 'Windows XP'};
					} else if(userAgent.indexOf('mac os') != -1) {
						if (userAgent.indexOf('macintosh') != -1){
							system = {'tag': 'macos', 'name': 'Mac OS'};
						} else {
							system = {'tag': 'ios', 'name': 'IOS'};
						}
					} else if(userAgent.indexOf('android') != -1) {
						system = {'tag': 'android', 'name': 'Android'};
					}
					return system;
				}
			},

			// 浏览器
			browser : {
				lastUpdate : '2016-4-24 14:21:09',

				// 浏览器语言
				language : {
					lastUpdate : '2016-4-14 23:50:49',
					language : navigator.browserLanguage ? navigator.browserLanguage : navigator.language,
					name : function(){
            var _this = this;
						var name = this.language.toLowerCase().split('-');
						return name[0];
					},
					country : function(){

					},
					redirect : function(language){
						return false;
					},
				},

				// IE(Trident)\Chrome(Webkit)\FireFox(Gecko)\Safari(Webkit)\Opera(Blink)
				/**
				 * 名称
				 * @return object, {tag:'小写标签', name:'名称', version:'版本'}
				 **/
				name : function(){
					var userAgent = M.client.userAgent,
						browser = {tag: 'other', name: 'Other', version: 'unknown'},
						versionArr = [],
						version = '',
						iePattern = /(msie.|edge|trident.*rv:)/,
						chromePattern = /(chrome|crios)/,
						firefoxPattern = /(firefox)/,
						safariPattern = /(safari)/,
						operaPattern = /(opr|opera|opios)/;
					// 此处可以优化
					if (iePattern.test(userAgent)){
						if (userAgent.indexOf('msie') != '-1'){
							versionArr = userAgent.match(/(msie)+.(\d+)/g);
							version = versionArr[0].replace('msie ', '').toString();
						} else if(userAgent.indexOf('rv:') != '-1') {
							versionArr = userAgent.match(/([rv:])+(\d+)/g);
							version = versionArr[0].replace('rv:', '').toString();
						} else if(userAgent.indexOf('edge') != '-1') {
							versionArr = userAgent.match(/(edge)+.(\d+)/g);
							version = versionArr[0].replace('edge\/', '').toString();
						}
						browser = {'tag': 'ie', 'name': 'Internet Exploere', 'version': version};
					} else if(operaPattern.test(userAgent)){
						if (versionArr = userAgent.match(/(version)+.(\d+)/g)){
							version = versionArr[0].replace('version\/', '').toString();
						} else if(versionArr = userAgent.match(/(opios)+.(\d+)/g)){
							version = versionArr[0].replace('opios\/', '').toString();
						}
						browser = {'tag': 'opera', 'name': 'Opera', 'version': version};
					} else if(chromePattern.test(userAgent)){
						if (versionArr = userAgent.match(/(chrome)+.(\d+)/g)){
							version = versionArr[0].replace('chrome\/', '').toString();
						} else if(versionArr = userAgent.match(/(crios)+.(\d+)/g)){
							version = versionArr[0].replace('crios\/', '').toString();
						}
						browser = {'tag': 'chrome', 'name': 'Chrome', 'version': version};
					} else if(firefoxPattern.test(userAgent)){
						versionArr = userAgent.match(/(firefox)+.(\d+)/g);
						version = versionArr[0].replace('firefox\/', '').toString();
						browser = {'tag': 'firefox', 'name': 'Firefox', 'version': version};
					} else if(safariPattern.test(userAgent)){
						versionArr = userAgent.match(/(version)+.(\d+)/g);
						version = versionArr[0].replace('version\/', '').toString();
						browser = {'tag': 'safari', 'name': 'Safari', 'version': version};
					}
					return browser;
				},

				// 头信息
				header : function(){
					var req = new XMLHttpRequest();
					req.open('GET', document.location, false);
					req.send(null);
					var head = req.getAllResponseHeaders().toLowerCase();
					return head;
				}
			},
		},

		// 正则
		regexp : {
			lastupdate : '2016-4-28 01:16:32',

			/**
			 * IP验证
			 * @param string ip;
			 * @return boolean;
			 **/
			ip : function(ip){
				/**
				 * 最简洁的IP判断正则表达式
				 * 25[0-5]						250-255
				 * 2[0-4]\d						200-249
				 * [01]?\d\d?					000-199(0-9 \d)(10-99 \d\d)(100-99 1\d\d)
				 * ($|(?!\.$)\.)				结束 或者 不以.结束的加上.
				 * (?!^0{1,3}(\.0{1,3}){3}$)	排除 0.0.0.0 /^(?!^0{1,3}(\.0{1,3}){3}$)((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/
				 * (?!^255(\.255){3}$)			排除 255.255.255.255
				 */
				return !!ip.match(/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/);
			},

			/**
			 * 域名验证
			 * @param string domain;
			 * @return boolean;
			 **/
			domain : function(domain){
				return false;
			},

			/**
			 * 邮箱验证
			 * @param string email;
			 * @return boolean;
			 **/
			email : function(email){
				var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
				if (emailPattern.test(email)){
					return true;
				}
				return false;
			},

			/**
			 * 浮点验证
			 * @param string number;
			 * @return boolean;
			 **/
			floatNumber : function(number){
				return false;
			},

			/**
			 * 日期格式验证
			 * @param string date; yyyy-MM-dd
			 * @return boolean;
			 **/
			datetime : function(datetime){
				if (datetime.type == 'datetime'){

				} else if(datetime.type == 'date') {

				} else if(datetime.type == 'time'){

				}
				return false;
			}

		},

		/**
		 * URL
		 **/
		url : {
			lastUpdate : '2016-4-14 23:50:41',

			/**
			 * URL
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b'
			 **/
			href : window.location.href,

			/**
			 * 来自页
			 * @return string; 'http://www.xxx.com/xxx/xxx.html'
			 **/
			referrer : document.referrer,

			/**
			 * URL 中的域名
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' //return 'www.xxx.com'
			 **/
			domain : function(url){
				var domain;
				if (!url){
					domain = window.document.location.host;
				} else {
					domain = url.match(/([\w-]+)(:\/\/)([\w.-]+)/i);
					if (domain !== null) domain = domain[3];
				}
				if(domain !== null) return domain.toString();
				return null;
			},

			/**
			 * URL 中的端口
			 * @param string url;
			 * @return string; 'http://www.xxx.com:8080/xxx/xxx.html?a=1#b' //return '8080'
			 **/
			port : function(url){
				var port, urlArr;
				if (!url){
					port = window.document.location.port;
				} else {
					urlArr = url.match(/([\w-]+)(:\/\/)([\w.-]+):(\d+)/i);
					if (urlArr !== null) port = urlArr[4];
				}
				if (port !== null && port !== '' && port !== undefined) return port.toString();
				return null;
			},

			/**
			 * URL 中的目录路径
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' //return '/xxx/'
			 **/
			dirPath : function(url){
				var filePath, dirPath, fileName;
				filePath = this.filePath(url);
				if (!url){
					dirPath = filePath.substring(0, filePath.lastIndexOf('/'))+'/';
				} else {
					fileName = filePath.match(/[\w.-]*$/i);
					dirPath = filePath.replace(this.domain(url), '');
					dirPath = dirPath.replace(':'+this.port(url), '');
					dirPath = dirPath.replace(fileName, '');
				}
				return dirPath.toString();
			},

			/**
			 * URL 中的文件路径
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' //return '/xxx/xxx.html'
			 **/
			filePath : function(url){
				var filePath;
				if (!url){
					filePath = window.document.location.pathname;
					filePath = filePath.replace(/\/{2,}/g, '/');
				} else {
					filePath = url.replace(this.domain(url), '');
					filePath = filePath.replace(/^\w+:\/\//i ,'');
					filePath = filePath.replace(/(\?+)([^\?+])*$/, '');
					filePath = filePath.replace(/(\#+)([^\#+])*$/, '');
				}
				return filePath.toString();
			},

			/**
			 * URL 中的文件名
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' //return 'xxx.html'
			 **/
			fileName : function(url){
				var filePath, fileName;
				if (!url) url = this.href;
				filePath = this.filePath(url);
				fileName = filePath.match(/[\w.-]*$/i);
				return fileName.toString();
			},

			/**
			 * 查询参数
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' //return 'a=1#b'
			 **/
			query : function(url){
				var query = '';
				if (!url){
					query = this.query(this.href);
					if (query === null) return '';
				} else {
					query = url.match(/[?].*$/i);
					if (query !== null) query = query[0].substring(1).toString().replace(/#.*/, '');
				}
				return query;
			},

			/**
			 * URL 锚
			 * @param string url;
			 * @return string; 'http://www.xxx.com/xxx/xxx.html?a=1#b' // return 'b'
			 **/
			fragment : function(url){
				var fragment;
				if (!url) url = this.href;
				fragment = url.match(/#.*/);
				if (fragment !== null) fragment = fragment[0].substring(1);
				return fragment;
			},

			/**
			 * URL 参数值
			 * @param string key, GET 参数键;
			 * @param string url, URL 地址如果为空则为当前地址;
			 * @return string or array, 如果 key 为空则输出所有;
			 **/
			parameter : function(key, url){
				if (!url) url = this.href;
				var queryString = this.query(url),
					singleQueryKey = '',
					singleQueryValue = '',
					returnValue = '',
					singleQueryArr = [],
					returnValueArr = [];
				if (queryString !== null){
					if (queryString.length > 1){
						var queryList = queryString.split('&');
						for(var i=0; i<queryList.length; i++){
							singleQueryArr = queryList[i].split('=');
							singleQueryKey = singleQueryArr[0];
							singleQueryValue = singleQueryArr[1] ? singleQueryArr[1].replace(/#.*/, '') : '';
							if (singleQueryKey === key && singleQueryArr.length === 2){
								returnValue = singleQueryValue;
							}
							returnValueArr[singleQueryKey] = singleQueryValue;
						}
					}
					if (key){
						return returnValue;
					} else {
						return returnValueArr;
					}
				}
			},

			/**
			 * 解析指定 URL 并返回各部分信息
			 * @param string url;
			 * @return object;
			 **/
			parseUrl : function(url){
				var domain, port, filePath, dirPath, fileName, query, fragment;
				if (!url) url = this.href;
				domain = this.domain(url);
				port = this.port(url);
				filePath = this.filePath(url);
				dirPath = this.dirPath(url);
				fileName = this.fileName(url);
				query = this.query(url);
				fragment = this.fragment(url);
				return {'domain': domain, 'port': port, 'filePath': filePath, 'dirPath': dirPath, 'fileName': fileName, 'query': query, 'fragment': fragment};
			},
		},

		// 检查
		check : {
			lastUpdate : '2016-4-26 20:37:57',

			/**
			 * 验证字符串长度
			 * @param string string;
			 * @param int minLen;
			 * @param int maxLen;
			 * @return array, 1小于，2大于;
			 **/
			length : function(string, minLen, maxLen){
				if (string.length < minLen){
					return [false, 1];
				} else if(string.length > maxLen) {
					return [false, 2];
				}
				return true;
			},

			/**
			 * 类型检查
			 * @param string type, string | array | object | number | null | undefined | boolean;
			 * @param mixed value;
			 * @return boolean;
			 **/
			type : function(type, value){
				var valueType = Object.prototype.toString.call(value).toLocaleLowerCase();
				if (type != valueType.substring(8, valueType.length-1)){
					return false;
				}
				return true;
			},

			/**
			 * IP ipv4\v6 验证
			 * @param object ip, {type: 'v4', address: '127.0.0.1'};
			 * @return boolean;
			 **/
			ip : function(ip){
				if (ip.type == 'v4'){
					var ipArr = ip.split('.');
					if (ipArr.length != 4){
						return false;
					}
					for(var i in ipArr){
						if (!this.number(ipArr[i]) || ipArr[i] > 255){
							return false;
						}
					}
					return true;
				} else if (ip.type == 'v6'){

				}
			},

			/**
			 * 验证电话号码
			 * @param string number;
			 **/
			phone : function(number){
				return false;
			},

			/**
			 * 字母
			 * @param string letter;
			 * @return boolean;
			 **/
			letter : function(letter){
				var letterPattern = /[^a-zA-Z]/;
				if (letterPattern.test(letter)){
					return false;
				}
				return true;
			},

			/**
			 * 数字,正整数
			 * @param string number;
			 * @return boolean;
			 **/
			number : function(number){
				var numberPattern = /[^0-9]/;
				if (numberPattern.test(number)){
					return false;
				}
				return true;
			},

			/**
			 * 验证是否包含 HTML 标签 *M* 需要增加
			 * @param string string;
			 * @return boolean;
			 **/
			containHtml : function(string){
				return true;
			},

			/**
			 * 验证邮箱格式是否正确
			 * @param string email;
			 * @return boolean;
			 **/
			email : function(email){
				if (this.empty(email)) return false;
				var start = email.indexOf('@');
				if (start === '-1') return false;
				var domain = email.substr(start+1);
				if (!this.domain(domain)) return false;
				var name = email.substr(0, start);
				var namePattern = /^([\w])+([\w-.]?)+$/i;
				if (!namePattern.test(name)) return false;
				return true;
			},

			/**
			 * 验证域名格式
			 * @param string domain;
			 * @return boolean;
			 **/
			domain : function(domain){
				// *M* 不够详细
				var domainPattern = /^(([a-z0-9]+-?)*[a-z0-9]+\.)+([a-z]{2,})+$/i;
				return domainPattern.test(domain);
			},

			/**
			 * 验证 URL 格式是否正确
			 * @param string url;
			 * @return boolean;
			 **/
			url : function(type, url){
				// *M* 此处还可以再增加其他协议的验证
				var urlPattern;
				if (type === 'http'){
					urlPattern = /^http?:\/\/([a-z0-9-]+\.)+[a-z0-9-]+([a-z0-9-./?%&=]*)?$/i;
				} else if(type === 'https') {
					urlPattern = /^https?:\/\/([a-z0-9-]+\.)+[a-z0-9-]+([a-z0-9-./?%&=]*)?$/i;
				}

				if (!urlPattern.test(url)) return false;
				return true;
			},

			/**
			 * 验证文件是否为图像后缀名 *M* 未测试
			 * @param string fileName; 文件名
			 * @return boolean;
			 **/
			image : function(fileName){
				// *M* 此处还需要增加图片文件后缀
				var imagePattern = /jpeg|jpg|bmp|gif|png|svg/i;
				if (!imagePattern.test(fileName)) return false;
				return true;
			},

			/**
			 * 验证值是否为空
			 * @param val string; 需要验证的字符串
			 * @return boolean;
			 **/
			empty : function(val){
				if (val !== null && val !== 0 && val === 'undefined') val = val.replace(/[ ]/g, '');
				if (val === '' || val === 'undefined' || val === null) return true;
				return false;
			}
		},

		cookie : {
			lastUpdate : '2016-4-22 02:03:09',
			enabled : navigator.cookieEnabled,
			expireTime : 30*24*60*60*1000,

			/**
			 * 设置 COOKIE
			 * @param string cName, COOKIE 名称;
			 * @param string cValue, COOKIE 值;
			 * @param string cPath, 作用路径;
			 * @param string cDomain, 作用域;
			 * @param int cExpireTime, 有效期以秒为单位;
			 * @return boolean;
			 **/
			set : function(cName, cValue, cPath, cDomain, cExpireTime){
				if (!this.enabled) return false;
				var value = cName+'='+escape(cValue)+'; ',
					date = new Date(),
					expireTime = cExpireTime ? cExpireTime : this.expireTime,
					path,
					domain;
				date.setTime(date.getTime()+expireTime);
				path = cPath ? 'path='+cPath+';' : '';
				domain = cDomain ? 'domain='+cDomain+';' : '';
				document.cookie = value+path+domain+'expires='+date.toGMTString();
				return true;
			},

			/**
			 * 获取指定 COOKIE 的值
			 * @param string cName; COOKIE 键名
			 * @return string;
			 **/
			get : function(cName){
				if (!this.enabled) return false;
				var temp, cookieArr = document.cookie.split('; ');
				for(var i=0;i<cookieArr.length;i++){
					temp = cookieArr[i].split('=');
					if(temp[0] == cName) return unescape(temp[1]);
				}
			},

			/**
			 * 获取所有 COOKIE 并以数组方式返回
			 * @return array;
			 **/
			getAll : function(){
				if (!this.enabled) return false;
				var cookieArr = document.cookie.split('; '),
					reCookieArr = [];
				for(var i=0; i<cookieArr.length; i++){
					var temp = cookieArr[i].split('=');
					reCookieArr[temp[0]] = unescape(temp[1]);
				}
				return reCookieArr;
			},

			/**
			 * 删除 COOKIE
			 * @param string cName; COOKIE 键名
			 * @return boolean;
			 **/
			remove : function(cName){
				if (!this.enabled) return false;
				var date = new Date();
				date.setTime(date.getTime()-10000);
				document.cookie = cName+'=0; expires='+date.toGMTString();
				return true;
			}
		},

		datetime : {
			lastUpdate : '2016-5-9 17:36:33',

			/** *M* 还需要详细修改
			 * 获取客户端当前日期或时间戳
			 * @param string type; 'datetime','datetimes','date','time'
			 * @param int timestamp; 如果传入 'timestamp' 时间戳则转换该时间戳为指定的格式的日期时间;
			 * @return string;
			 **/
			get : function(type, timestamp){
				var dateObj, datetime, month, y, m, d, h, i, s, mi;
				if (timestamp){
					dateObj = new Date(parseInt(timestamp)*1000);
				} else {
					dateObj = new Date();
				}
				month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
				y = dateObj.getFullYear();
				m = dateObj.getMonth()+1;
				m = m < 10 ? '0'+m : m;
				d = dateObj.getDate();
				d = d < 10 ? '0'+d : d;
				h = dateObj.getHours();
				h = h < 10 ? '0'+h : h;
				i = dateObj.getMinutes();
				i = i < 10 ? '0'+i : i;
				s = dateObj.getSeconds();
				s = s < 10 ? '0'+s : s;
				mi = dateObj.getMilliseconds();
				mi = mi < 100 ? mi < 10 ? '00'+mi : '0'+mi  :  mi;
				switch(type){
					case 'datetime':
						datetime = y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
						break;
					case 'datetimes':
						datetime = y+'-'+m+'-'+d+' '+h+':'+i+':'+s+' '+mi;
						break;
					case 'date':
						datetime = y+'-'+m+'-'+d;
						break;
					case 'dates':
						datetime = month[Number((m-1))]+'. '+d+', '+y;
						break;
					case 'month':
						datetime = m;
						break;
					case 'day':
						datetime = d;
						break;
					case 'week':
						datetime = "周" + "日一二三四五六".split("")[new Date().getDay()];
						break;
					case 'time':
						datetime = h+':'+i+':'+s;
						break;
					case 'hour':
						datetime = h;
						break;
					case 'timestamp':
						datetime = this.transformDatetimeToTimestamp(this.get('datetime'));
						break;
					case 'milliscond':
						datetime = mi;
						break;
				}
				return datetime;
			},

			/**
			 * 返回格林威治时间和本地时间之间的时差
			 * @param string type; 小时、分、秒 h | i | s
			 * @return int;
			 **/
			timeDifference : function(type){
				var dateObj = new Date(),
					time;
				switch(type){
					case 'h':
						time = 0-dateObj.getTimezoneOffset()/60;
						break;
					case 'i':
						time = 0-dateObj.getTimezoneOffset();
						break;
					case 's':
						time = 0-dateObj.getTimezoneOffset()*60;
						break;
					default :
						time = false;
						break;
				}
				if (time > 0){
					return '+'+time;
				} else {
					return time;
				}
			},

			/**
			 * 转换当前或指定日期为 UTC 协调世界时
			 * @param string type, 需要转换为 UTC 日期时间的类型;
			 * @param string datetime, 2020-10-10 12:30:15;
			 * @return mixed;
			 **/
			transformCurrentDatetimeToUtc : function(type, datetime){
				if (!datetime) datetime = M.datetime.get('datetime');
				var timestamp = M.datetime.get('timestamp', datetime)-(M.datetime.timeDifference('s'));
				if (type === 'timestamp'){
					return timestamp;
				} else {
					var dateObj = new Date(parseInt(timestamp)*1000);
					var y = dateObj.getFullYear();
					var m = dateObj.getMonth()+1;
					m = m < 10 ? '0'+m : m;
					var d = dateObj.getDate();
					d = d < 10 ? '0'+d : d;
					var h = dateObj.getHours();
					h = h < 10 ? '0'+h : h;
					var i = dateObj.getMinutes();
					i = i < 10 ? '0'+i : i;
					var s = dateObj.getSeconds();
					s = s < 10 ? '0'+s : s;
					return y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
				}
			},

			/**
			 * 转换日期为时间戳
			 * @param string datetime; 需要转换日期时间
			 * @return int;
			 **/
			transformDatetimeToTimestamp : function(datetime){
				var dateObj = new Date();
				if (datetime){
					dateObj.setFullYear(datetime.substring(0, 4));
					dateObj.setMonth(datetime.substring(5, 7)-1);
					dateObj.setDate(datetime.substring(8, 10));
					dateObj.setHours(datetime.substring(11, 13));
					dateObj.setMinutes(datetime.substring(14, 16));
					dateObj.setSeconds(datetime.substring(17, 19));
					return Date.parse(dateObj)/1000;
				} else {
					return Math.floor(dateObj.getTime()/1000);
				}
			},

			/**
			 * 返回到期日期 "天,小时,分,秒,毫秒" *M* 此处还可优化
			 * @param int expireDatetime; 到期日期
			 * @return array;
			 **/
			countdown : function(expireDatetime){
				var currentDateObj = new Date(),
					currentTime = this.get('timestamp'),
					expireTime = this.transformDatetimeToTimestamp(expireDatetime),
					overTime = expireTime-currentTime,
					datetime,
					loop;
				if (overTime > 0){
					var d = Math.floor(overTime/(24*60*60)),
						h = Math.floor(overTime/(60*60)%24),
						i = Math.floor(overTime/60%60),
						s = Math.floor(overTime%60),
						mi = 999-currentDateObj.getMilliseconds();
					if (mi < 10){
						 mi = '00'+mi;
					} else if(mi < 100) {
						mi = '0'+mi;
					}
					datetime = [d, h, i, s, mi];
					loop = setTimeout(M.datetime.countdown(expireDatetime));
				} else {
					datetime = ['0', '0', '0', '0', '000'];
					clearTimeout(loop);
				}
			},

			/**
			 * 按开始日期的时间戳以及设定的循环周期限制循环返回倒计时时间 *M* 此处还可优化
			 * @param int startTimestamp; 开始日期时间戳
			 * @param int intervalDay; 循环天数
			 * @return array;
			 **/
			cycleCountdown : function(startTimestamp, intervalDay){
				var intervalTimestamp = intervalDay*24*60*60,
					dateObj = new Date(),
					time = dateObj.getTime().toString().substring(0, 10),
					remainingTime;
				for(i=1;;i++){
					remainingTime = (startTimestamp+intervalTimestamp*i)-time;
					if (remainingTime > 0) break;
				}
				var d = Math.floor(remainingTime/(24*60*60));
				var h = Math.floor(remainingTime/(60*60)%24);
				var i = Math.floor(remainingTime/60%60);
				var s = Math.floor(remainingTime%60);
				var mi = 999-dateObj.getMilliseconds();
				if (mi < 10){
					 mi = '00'+mi;
				} else if(mi < 100) {
					mi = '0'+mi;
				}
				return [d, h, i, s, mi];
			},
		},

		notice : {
			lastUpdate : '2016-4-25 00:44:34',

			/**
			 * 载入等待
			 **/
			loading : function(text){
				return false;
				/*
				var html;
				var content = text ? text : 'Loading......';
				html = '<div style=""><div>'+content+'</div><div style=""></div></div>';
				*/
			},

			/**
			 * 消息提示
			 * @param string title, 标题;
			 * @param string text, 内容;
			 * @param int time, 倒计时自动关闭时间;
			 * @param function confirmFunc, 确认回调函数;
			 * @return null;
			 **/
			message : function(content, confirmFunc){
				return false;
				/*
				var html;
				html = '<div></div>';
				*/
			},

			/**
			 * 确认消息提示
			 * @param object text, 确认提示框的文字内容;
			 * @param int time, 倒计时自动关闭时间;
			 * @param function confirmFunc, 确认回调函数;
			 * @param function cancelFunc, 取消回调函数;
			 * @return null;
			 **/
			confirms : function(text, time, confirmFunc, cancelFunc){
				return false;
				/*
				var html = '<div id="confirmsLayer">';
				html += '<div>'+text.title+'</div>';
				html += '<div>'+text.content+'</div>';
				html += '<div><a href="#none">'+text.confirmButton+'</a><a>'+text.cancelButton+'</a></div>';
				html += '</div>';
				document.body.innerHTML = html;
				if (time){
					setTimeout(function(){
						document.getElementById('confirmsLayer').style.display = 'none';
					}, time);
				}
				*/
			},
		},

		string : {
			lastUpdate : '2016-4-14 23:51:19',

			/**
			 * 去除空格
			 * @param string str;
			 * @return string;
			 **/
			lTrim : function(str){
				return str.replace(/(^\s*)/g, '');
			},
			rTrim : function(str){
				return str.replace(/(\s*$)/g, '');
			},
			// ES 后期版本已经增加该方法
			trim : function(str){
				str = this.lTrim(str);
				return this.rTrim(str);
			},
			html2Escape : function(html){
				return html.replace(/[<>&"]/g,function(c){return {'<':'<','>':'>','&':'&','"':'"'}[c];});
 			},
			escape2Html : function(str){
				var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
				return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
			},
			// 转义字符防止 XSS
			securityFiltering : function(value){
				var result = value.replace(/[<>]/g, function(c){return {'<':'<','>':'>','"':'"','&':'&'}[c];});
				return result;
			},
			/**
			 * 补零
			 * @param string num; 需要补零的数字
			 * @param int len; 补零的长度位
			 * @return string;
			 **/
			zeroize : function(int, len){
				var str = int.toString();
				var strLen = str.length;
				if (strLen < len){
					for(var i=0; i<(len-strLen); i++){
						str = '0'+str;
					}
				}
				return str;
			},
		},

		file : {
			lastUpdate : '2016-4-14 23:51:23',

			/**
			 * 获取文件扩展名
			 * @param string name; 文件名
			 * @return string, 小写后缀名;
			 **/
			ext : function(name){
				var ext, extArr;
				extArr = name.split('.');
				ext = extArr[extArr.length-1];
				ext = ext.toLocaleLowerCase();
				return ext;
			},
		},

		/**
		 * 编码
		 **/
		encode : {
			lastUpdate : '2016-4-27 21:51:01',
			// 加载 http://www.520internet.com/res/js/base64.js
			base64 : function(action, string){
				if (typeof Base64 === 'object'){
					if (action === 'encode'){
						return Base64.encode(string);
					} else if(action === 'decode') {
						return Base64.decode(string);
					} else {
						return false;
					}
				} else {
					return false;
				}
			},

			unicode : function(string){
				var testValue = string,
					value = '';
				for(var i=0; i<testValue.length; i++){
					value += '&#'+testValue.charCodeAt(i)+';';
				}
				return value;
			}
		},

		/**
		 * 加密
		 **/
		encryption : {
			lastUpdate : '2016-4-26 23:37:40',
			// 加载 http://www.520internet.com/res/js/md5.js
			/**
			 * MD5
			 * @param sting srting;
			 * @return string;
			 **/
			md5 : function(string){
				if (typeof hex_md5 === 'function'){
					return hex_md5(string);
				}
				return false;
			},
		},

		/**
		 * 翻译与转换
		 **/
		translate : {
			lastUpdate : '2017-12-30 17:05:40',
			// 汉语转拼音
			pinyin : function(text){
				// 依赖 js/plugs/dictionary.js

				var cc = text, str = '', str2, s;
				for(var i=0; i<cc.length; i++){
					if (dictionary.indexOf(cc.charAt(i)) != -1 && cc.charCodeAt(i) > 200){
						s = 1;
						while(dictionary.charAt(dictionary.indexOf(cc.charAt(i))+s) != ","){
							str += dictionary.charAt(dictionary.indexOf(cc.charAt(i))+s);
							s++;
						}
						str += ' ';
					} else {
						str += cc.charAt(i);
					}
				}
				return str;
			}
		},

    /**
     * 色彩
     **/
    color : {
    	lastUpdate : '2016-11-17 14:44:05',
      /**
       * 通过色彩名称返回Hue色调
       **/
      getHueFromText: function(text){
        var h = '';
      	switch(text){
      		case '红':
      			var r = M.other.genRandom(0, 100);
      			if (r >= 50){
      				h = M.other.genRandom(0, 30);
      			} else {
      				h = M.other.genRandom(330, 359);
      			}
      			break;
      		case '黄':
      			h = M.other.genRandom(30, 90);
      			break;
      		case '绿':
      			h = M.other.genRandom(90, 150);
      			break;
      		case '青':
      			h = M.other.genRandom(150, 210);
      			break;
      		case '蓝':
      			h = M.other.genRandom(210, 270);
      			break;
      		case '紫':
      			h = M.other.genRandom(270, 330);
      			break;
      	}
      	return h;
      },
      /**
       * 通过HSV、HSL色相环转换色彩名称
       */
      colorName: function(hsv){
      	var colorName = [],
          h = hsv[0] ? hsv[0] : 0,
          s = hsv[1] ? hsv[1] : 0,
          v = hsv[2] ? hsv[2] : 0;

        colorName['depth'] =  v >= 60 ? '浅' : '深';
        colorName['brightness'] = v >= 50 ? '明亮' : '深暗';

      	if (v == 0) {
      		colorName['main'] = '黑';
      		colorName['sub'] = '黑';
      	} else if(s == 0 && v == 100) {
      		colorName['main'] = '白';
      		colorName['sub'] = '白';
      	} else if(s == 0) {
      		colorName['main'] = '灰';
          colorName['sub'] = '灰';
      	} else if ( h <= 30 ) {
      		colorName['main'] = '红';
      		if (h <= 10){
      		    colorName['sub'] = '红';
      		} else if (h <= 20){
      			colorName['sub'] = '橘红';
      		} else {
      			colorName['sub'] = '橙';
      		}
      	} else if ( h > 30 && h <= 90 ) {
      		colorName['main'] = '黄';
      		if (h < 40){
      		    colorName['sub'] = '橙';
      		} else if ( h < 50){
      			colorName['sub'] = '橘黄';
      		} else if( h > 70 ) {
      			colorName['sub'] = '绿黄';
      		} else {
      			colorName['sub'] = '黄';
      		}
      	} else if ( h > 90 && h <= 150 ) {
      		colorName['main'] = '绿';
      		if ( h < 110){
      			colorName['sub'] = '黄绿';
      		} else if( h > 130 ) {
      			colorName['sub'] = '青绿';
      		} else {
      			colorName['sub'] = '绿';
      		}
      	} else if ( h > 150 && h <= 210 ) {
      		colorName['main'] = '青';
      		if ( h < 170){
      			colorName['sub'] = '绿青';
      		} else if(h > 190) {
      			colorName['sub'] = '蓝青';
      		} else {
      			colorName['sub'] = '青';
      		}
      	} else if ( h > 210 && h <= 270 ) {
      		// 220 - 260
      		colorName['main'] = '蓝';
      		if ( h < 230){
      			colorName['sub'] = '青蓝';
      		} else if(h > 250) {
      			colorName['sub'] = '紫蓝';
      		} else {
      			colorName['sub'] = '蓝';
      		}
      	} else if ( h < 330 ) {
      		colorName['main'] = '紫';
      		if ( h < 290){
      			colorName['sub'] = '蓝紫';
      		} else if(h > 310){
      			colorName['sub'] = '红紫';
      		} else {
      			colorName['sub'] = '紫';
      		}
      	} else {
      		colorName['main'] = '红';
      		if ( h < 350){
      			colorName['sub'] = '紫红';
      		} else {
      			colorName['sub'] = '红';
      		}
      	}
      	// 增加灰色
      	if (colorName['main'] != '黑' && colorName['main'] != '白' && colorName['main'] != '灰'){
      		if (s < 10){
          	    colorName['sub'] = '灰'+colorName['sub'];
          	}
      	}
      	return colorName;
      },

    	/**
    	 * HEX 转 RGB
    	 * @param string hex, #fff;
    	 * @return array;
    	 **/
    	hex2rbg : function(hex){
    		hex = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex;
    		var r = parseInt(hex.substring(0, 2), 16);
    		var g = parseInt(hex.substring(2, 4), 16);
    		var b = parseInt(hex.substring(4, 6), 16);
    		return [r, g ,b];
    	},
      /**
       * RGB 转 RYB
       * @param arry rgb, [255,255,255];
       * @return array;
       **/
      rgb2ryb: function(rgb){
        var r = rgb[0],
        g = rgb[1],
        b = rgb[2];

        var w = Math.min(r, g, b);
        r -= w;
        g -= w;
        b -= w;

        var mg = Math.max(r, g, b);

        // Get the yellow out of the red+green.
        var y = Math.min(r, g);
        r -= y;
        g -= y;

        // If this unfortunate conversion combines blue and green, then cut each in
        // half to preserve the value's maximum range.
        if (b && g) {
          b /= 2.0;
          g /= 2.0;
        }

        // Redistribute the remaining green.
        y += g;
        b += g;

        // Normalize to values.
        var my = Math.max(r, y, b),
          n = '';
        if (my) {
          n = mg/my;
          r *= n;
          y *= n;
          b *= n;
        }

        // Add the white back in.
        r += w;
        y += w;
        b += w;

        // And return back the ryb typed accordingly.
        return [255-r, 255-y, 255-b];
      },
    	/**
    	 * HEX 转 CMYK;
    	 * @param string hex, #fff;
    	 * @return array;
    	 **/
    	hex2cmyk : function(hex) {
    		var computedC = 0;
    		var computedM = 0;
    		var computedY = 0;
    		var computedK = 0;

    		hex = (hex.charAt(0)==="#") ? hex.substring(1,7) : hex;

    		if (hex.length !== 6) {
    			alert ('HEX 长度无效!');
    			return;
    		}
    		if (/[0-9a-f]{6}/i.test(hex) !== true) {
    			alert ('无效的的 HEX 数字!');
    			return;
    		}

    		var r = parseInt(hex.substring(0,2),16);
    		var g = parseInt(hex.substring(2,4),16);
    		var b = parseInt(hex.substring(4,6),16);

    		// BLACK
    		if (r===0 && g===0 && b===0) {
    			computedK = 1;
    			return [0,0,0,1];
    		}

    		computedC = 1 - (r/255);
    		computedM = 1 - (g/255);
    		computedY = 1 - (b/255);

    		var minCMY = Math.min(computedC,Math.min(computedM,computedY));

    		computedC = (computedC - minCMY) / (1 - minCMY) ;
    		computedM = (computedM - minCMY) / (1 - minCMY) ;
    		computedY = (computedY - minCMY) / (1 - minCMY) ;
    		computedK = minCMY;

    		return [computedC,computedM,computedY,computedK];
    	},

    	/**
    	 * HEX 转 HSL;
    	 * @param string hex, #fff;
    	 * @return array;
    	 **/
    	hex2hsl : function(hex) {
    	},

    	/**
    	 * HEX 转 HSV(B);
    	 * @param string hex, #fff;
    	 * @return array;
    	 **/
    	hex2hsv : function(hex) {
        var rgb = this.hex2rbg(hex);
        return this.rgb2hsv(rgb);
    	},

    	/**
    	 * Hex 转 XYZ
    	 **/
    	hex2xyz : function(){
    	},

    	/**
    	 * RGB 转 HSV
    	 * @param array rgb, [r,g,b]
    	 * @return array [h,s,v]
    	 **/
    	rgb2hsv: function ( rgb ) {
    		var r = rgb[ 0 ],
    			g = rgb[ 1 ],
    			b = rgb[ 2 ],
    			min = Math.min( r, g, b ),
    			max = Math.max( r, g, b ),
    			delta = max - min,
    			h, s, v;
    		if ( max === 0 ) {
    			s = 0;
    		} else {
    			s = ( delta / max * 100 );
    		}
    		if ( max === min ) {
    			h = 0;
    		} else if ( r === max ) {
    			h = ( g - b ) / delta;
    		} else if ( g === max ) {
    			h = 2 + ( b - r ) / delta;
    		} else if ( b === max ) {
    			h = 4 + ( r - g ) / delta;
    		}
    		h = Math.min( h * 60, 360 );
    		if ( h < 0 ) {
    			h += 360;
    		}
    		v = ( ( max / 255 ) * 1000 ) / 10;
    		return [ h, s, v ];
    	},
      hsv2hex: function(hsv){
        var rgb = this.hsv2rgb(hsv);
        return this.rgb2hex(rgb);
      },
    	/**
    	 * HSV 转 RGB
    	 * @param int hue;
    	 * @param int saturation;
    	 * @param int value;
    	 * @return array rgb [r,g,b];
    	 **/
    	hsv2rgb : function(hsv){
        var h = hsv[0],
            s = hsv[1],
            v = hsv[2];
    		h = h / 60;
    		s = s / 100;
    		v = v / 100;
    		var hi = Math.floor(h) % 6;

    		var f = h - Math.floor(h);
    		var p = 255 * v * (1 - s);
    		var q = 255 * v * (1 - (s * f));
    		var t = 255 * v * (1 - (s * (1 - f)));
    		v *= 255;

    		switch(hi) {
    			case 0:
    				return [v, t, p];
    			case 1:
    				return [q, v, p];
    			case 2:
    				return [p, v, t];
    			case 3:
    				return [p, q, v];
    			case 4:
    				return [t, p, v];
    			case 5:
    				return [v, p, q];
    		}
    	},

    	/**
    	 * RGB 转 HEX
    	 * @param int r;
    	 * @param int g;
    	 * @param int b;
    	 **/
    	rgb2hex : function(rgb){
        var r = rgb[0],
          g = rgb[1],
          b = rgb[2];
    		var r = (r<0 ? 0 : (r>255 ? 255 : r)).toString(16),
    		g = (g<0 ? 0 : (g>255 ? 255 : g)).toString(16),
    		b = (b<0 ? 0 : (b>255 ? 255 : b)).toString(16);
    		var color = (r.length < 2 ? '0' : '')+r;
    		color += (g.length < 2 ? '0' : '')+g;
    		color += (b.length < 2 ? '0' : '')+b;
    		return color.toUpperCase();
    	}
    },

		/**
		 * 音视频
		 **/
		media : {
			lastUpdate : '2017-12-30 17:06:40',
			audio : {
				// 播放
				aPlay : function(){

				},
				// 停止
				aStop : function(){

				},
				// 初始化
				aInit : function(){

				}
			},

			video : {
				// 播放
				aPlay : function(){

				},
				// 停止
				aStop : function(){

				},
				// 初始化
				aInit : function(){

				}
			}
		},

		/**
		 * 利用Localstorage进行缓存
		 **/
		cache : {
			lastUpdate : '2017-12-30 17:05:40',
      get : function(){
      },
      set : function(){
      },
      clear : function(){
      }
		},

		/**
		 * HTML5 localstorage 本地存储
		 **/
		storage: {
			lastUpdate : '2017-12-30 13:51:27',

			test : function(){
				if (!window.localStorage){
					return false;
				}
				return true;
			},

			length : localStorage.length,
			set : function(name, value){
				value = M.string.securityFiltering(value);
				return window.localStorage.setItem(name, value);
			},
			get : function(name){
				return window.localStorage.getItem(name);
			},
			clear : function(){
				return window.localStorage.clear();
			},
			remove : function(name){
				return window.localStorage.removeItem(name);
			},
			key : function(){
				return window.localStorage.key();
			},
		},

		/**
		 * 其它
		 **/
		other : {
			lastUpdate : '2016-4-14 23:51:27',

			/**
			 * 倒计时并重定向
			 * @param string url; e.g.'http://www.xxx.com'
			 * @param int ms; 1000ms = 1s
			 * @return null;
			 **/
			countdownRedirect : function(url, ms){
				setTimeout(function(){window.location.href=url;}, ms);
				return;
			},

			/**
			 * 文件名后缀
			 * @param string filename, 文件名;
			 * @return string ext;
			 **/
			fileExt : function(filename){
				var extArr = filename.split('.');
				var ext = extArr[extArr.length-1];
				ext = ext.toLocaleLowerCase();
				return ext;
			},

			/**
			 * 补零
			 * @param string or number;
			 * @param number len;
			 * @return string;
			 **/
			zeroize : function(num, len){
				var str = num.toString();
				var strLen = str.length;
				if (strLen < len){
					for(var i=0; i<(len-strLen); i++){
						str = '0'+str;
					}
				}
				return str;
			},

			/**
			 * 倒计时重定向并显示时间
			 * @param string url; e.g 'http://www.xxx.com'
			 * @param int time;
			 **/
			countdownRedirectAndDisplayTime : function(url, time){
				if (time === 0){
					window.location = url;
					return;
				}
				var t = document.getElementById('time');
				t.innerHTML = time;
				time -= 1;
				// *M* 倒计时函数这里还可以修改暂时可以使用即可
				setTimeout(function(){
					M.other.countdownRedirectAndDisplayTime(url, time);
				}, 1000);
			},

			/**
			 * 循环执行
			 * @param object func;
			 * @param int ms; 1000ms = 1s
			 * @return null;
			 **/
			loopRun : function(func, time){
				setTimeout(func, time);
			},

			/**
			 * 弹出新窗口并重定向当前页
			 * @param string openUrl;
			 * @param string redirectUrl;
			 * @return null;
			 **/
			openWindowAndRedirect : function(openUrl, redirectUrl){
				window.open(openUrl, 'openWindow', '');
				window.location.href = redirectUrl;
				return;
			},

			/**
			 * 转换存储容量单位
			 * @param int size; Byte
			 * @return string;
			 **/
			conversionSize : function(size){
				var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
				for (var i=0; size>=1024 && i<5; i++){
					size /= 1024;
				}
				size = Math.round(size*100);
				size /= 100;
				return size+' '+units[i];
			},

			/**
			 * 生成指定范围内随机数
			 * @param int lowerValue; 最小值
			 * @param int upperValue; 最大值
			 * @return int;
			 **/
			genRandom : function(lowerValue, upperValue){
				var choices = upperValue-lowerValue+1;
				return Math.floor(Math.random()*choices+lowerValue);
			},

			/**
			 * 刷新验证码
			 * @param string id; 验证码 DOM ID
			 * @param string captchaUrl; 验证码图片 URL
			 * @return null;
			 **/
			refreshCaptcha : function(id, captchaUrl){
				var randoms = Math.random();
				document.getElementById(id).src = captchaUrl+'&r='+randoms;
			},

			/**
			 * 创建随机密码
			 * @param int grade; 密码强度等级 1|2|3
			 * @param int length; 密码长度
			 * @return mixed;
			 **/
			genPassword : function(grade, length){
				var characterSet,
					letter = 'aAbBcCdDeEfFgGhHiIjJkKmlMLnNoOpPqQrRsStTuUvVwWxXyYzZ',
					number = '0123456789',
					symbol = '!@#$%^&*() -_=+{}[]|\/:;<>?,.\'"',
					password = '';
				grade = grade > 0 && grade <= 3 ? grade : 3;
				length = length > 0 ? length : 12;
				for(var i=0; i<length; i++){
					if (i === 0){
						if (grade > 1){
							characterSet = letter;
						} else {
							characterSet = number;
						}
					} else {
						if (grade === 3){
							characterSet = letter+number+symbol;
						} else if(grade === 2) {
							characterSet = letter+number;
						} else {
							characterSet = '0'+number;
						}
					}
					password += characterSet.substr((this.genRandom(1, characterSet.length)-1), 1);
				}
				return password;
			},

			/**
			 * 检查密码强度,长度,数字,小写字母,大写字母,符号
			 * @param string password; 密码;
			 * @return int; 强度等级由小到大,5级最高
			 **/
			passwordStrength : function(password){
				var strength = 0,
					passwordPattern;
				if (password.length >= 8) strength += 1;
				passwordPattern = /[0-9]/;
				if (passwordPattern.test(password)) strength += 1;
				passwordPattern = /[a-z]/;
				if (passwordPattern.test(password)) strength += 1;
				passwordPattern = /[A-Z]/;
				if (passwordPattern.test(password)) strength += 1;
				passwordPattern = /[^a-z0-9]/i;
				if (passwordPattern.test(password)) strength += 1;
				return strength;
			},

			/**
			 * 图片预加载，与 CSS Sprites 不冲突
			 * @param array image; ['./1.jpg', '2.png', '3.gif']
			 * @return null;
			 **/
			onloadImage : function(image){
				document.body.innerHTML = document.body.innerHTML += '<div id="loadImage" style="width: 0px; height: 0px; overflow: hidden;"></div>';
				for (var i=0; i<image.length; i++){
					document.getElementById("loadImage").innerHTML = document.getElementById("loadImage").innerHTML +='<img src="'+image[i]+'" width="0" height="0">';
				}
			},
		}
	};

	window.M = M;
})(window);

(function(window){
	"use strict";
	var M_2_0 = {
	};
	window.M_2_0 = M_2_0;
})(window);

/**
 * 你可以在此基础上进行补充或增加新版本，然后按照版本号加载多版本以实现扩展或多版本兼容。
 * @example
	M.getBy.id('a');
	Mjs(1.0).getBy.id('a');
 **/
function Mjs(ver){
	ver = ver ? ver.toString().replace('.', '_') : '';
	if (typeof window['M_'+ver] == 'object'){
		return window['M_'+ver];
	} else {
		return M;
	}
}

console.log('https://github.com/520internet/m.js');
