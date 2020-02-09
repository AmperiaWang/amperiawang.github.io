var NotiVerse = function(){
	var _this = this;
	this._jquery = null;
	this._db = null;
	this._reader = null;
	this._editor = null;
	this._supportDownload = (function(){
		try {
			return !!new Blob;
		} catch (e) {
			return false;
		}
	})();
	this._currentUserName = null;
	this._currentPath = 0;
	this._allTags = ['light-blue','blue','purple','magenta','pink','red','orange','yellow','lime','light-green','green','cyan'];
	this._config = {
		prefix: 'notiverse_',
		downloadTemplate: '<!DOCTYPE html><html><head><title>{{title}}</title></head><body><h2 class="notiverse-title">{{title}}</h2>{{content}}</body></html>'
	};
	this._getLocalStorageArr = function(key){
		var string = localStorage.getItem(_this._config.prefix + key);
		if(!string){
			return [];
		}else{
			var tempArr = JSON.parse(string);
			if(!tempArr || !tempArr.length){
				return [];
			}else{
				return tempArr;
			}
		}
	};
	this._encodeHTML = function(html){
		var temp = document.createElement("div");
		(temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	};
	this._decodeHTML = function(text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	};
	this._encodeUserName = function(userName){
		return window.btoa(encodeURIComponent(userName)).replace('+','-').replace('=','_');
	};
	this._dispUserName = function(userName){
		_this._currentUserName = userName;
		var userNamesContainer = document.getElementsByClassName('notiverse-user-name'), userPanelOpener = document.getElementById('notiverse-user-panel');
		for(var r in userNamesContainer){
			if(typeof userNamesContainer[r] == 'object') userNamesContainer[r].innerHTML = userName;
		}
		if(userPanelOpener) userPanelOpener.setAttribute('title',userName);
	};
	this._createUser = function(){
		var isValidName = false, newName;
		while(!isValidName){
			newName = prompt('输入用户名：');
			if(newName && newName.match(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/)){
				isValidName = true;
			}else{
				alert('此用户名不合法，请重新输入。');
			}
		}
		var userNames = _this._getLocalStorageArr("usernames");
		userNames.push(newName);
		localStorage.setItem(_this._config.prefix + "usernames", JSON.stringify(userNames));
		return newName;
	};
	this._deleteUser = function(userName){
		var userNames = _this._getLocalStorageArr("usernames"), newUserNames = [], isIn = false;
		for(var u in userNames){
			if(userNames[u] == userName){
				isIn = true;
			}else{
				newUserNames.push(userNames[u]);
			}
		}
		if(!isIn){
			alert('该用户不存在。');
			return;
		}
		userName = _this._encodeUserName(userName);
		var req = indexedDB.deleteDatabase(_this._config.prefix + "database_" + userName);
		req.onsuccess = function () {
			console.log("Deleted database successfully");
			alert('删除成功。');
			localStorage.removeItem(_this._config.prefix + _this._encodeUserName(_this._currentUserName) + "_history");
			localStorage.setItem(_this._config.prefix + "usernames", JSON.stringify(newUserNames));
			_this._currentUserName = null;
			location.reload(true);
		};
		req.onerror = function () {
			alert('删除失败。');
			console.log("Couldn't delete database");
		};
		req.onblocked = function () {
			alert('删除操作被拒绝。');
			console.log("Couldn't delete database due to the operation being blocked");
		};
	};
	this._getDomContentByPath = function(path){
		return document.getElementById("notiverse-" + path);
	};
	this._getDate = function(){
		return new Date().getTime();
	};
	this._getHistory = function(){
		return _this._getLocalStorageArr(_this._encodeUserName(_this._currentUserName) + "_history");
	};
	this._setHistory = function(id){
		var prevHistory = _this._getHistory(), location = prevHistory.indexOf(id);
		if(location>0){
			var temp = prevHistory[0];
			prevHistory[0] = prevHistory[location];
			prevHistory[location] = temp;
		}else if(location<0){
			if(prevHistory.length>4) prevHistory.pop();
			prevHistory.unshift(id);
		}
		localStorage.setItem(_this._config.prefix + _this._encodeUserName(_this._currentUserName) + "_history", JSON.stringify(prevHistory));
	};
	this._getEditorValue = function(){
		var title, content;
		if(_this._jquery){
			title = $('#editor-title input').val();
		}else{
			title = document.querySelectorAll('#editor-title input')[0].value;
		}
		content = _this._editor.getContent();
		return {
			title: title,
			content: content
		};
	};
	this._setTitle = function(title){
		if(!title){
			alert('请输入正确的标题。');
		}
		if(this._jquery){
			$('title').html(title);
		}else{
			document.getElementsByTagName('title')[0].innerText = title;
		}
	};
	this._updateBreadCrumb = function(text){
		var container = document.getElementsByClassName('notiverse-breadcrumb');
		for(var i in container){
			if(typeof container[i] == 'object') container[i].innerHTML = text;
		}
	};
	this._setToolBar = function(items){
		items = items || {};
		var itemHTML = '';
		for(var p in items){
			itemHTML = itemHTML + '<div class="notiverse-toolbar-item themed-face-hover" data-action="'+p+'"><i class="fa fa-'+items[p]['icon']+'" title="'+items[p]['title']+'"></i></div>';
		}
		if(_this._jquery){
			$('#notiverse-toolbar').html(itemHTML);
			$('.notiverse-toolbar-item').each(function(){
				var action = $(this).attr('data-action');
				if(items[action]) $(this).click(function(){
					items[action]['func']();
				});
			});
		}else{
			var toolBar = document.getElementById('notiverse-toolbar');
			toolBar.innerHTML(itemHTML);
			var itemsDOM = document.querySelectorAll('.notiverse-toolbar-item');
			for(var p in itemsDOM){
				if(typeof itemsDOM[p] != 'object') continue;
				var action = itemsDOM[p].getAttribute('data-action');
				if(items[action]) itemsDOM[p].addEventListener('click',function(){
					items[action]['func']();
				});
			}
		}
	};
	this._saveContent = function(id, info){
		if(!info){
			alert('您的信息提交有误，请再次确认后提交。');
			return;
		}
		if(!info['title'] || info.title.length<=0){
			alert('标题不能为空。');
			return;
		}
		if(!info['content'] || info.content.length<=0){
			alert('内容不能为空。');
			return;
		}
		id = parseInt(id);
		if(id>0){
			_this._db.menu.where('id').equals(id).modify({
				title: info['title'],
				date_modified: _this._getDate()
			}).then(function(r){
				_this._db.contents.where('related_to').equals(id).modify({
					content: info['content']
				}).then(function(r){
					alert('修改成功。');
					if(_this._jquery){
						$('#editor-title input').val('');
					}else{
						document.querySelectorAll('#editor-title input')[0].value = '';
					}
					_this._editor.setContent('');
					_this._showMenu(_this._currentPath);
					_this._openReader(id);
				}).catch(function(e){
					alert("Error: " + (e.stack || e));
				});
			}).catch(function(e){
				alert("Error: " + (e.stack || e));
			});
		}else{
			var data = {
				is_leaf: 1,
				parent_node: parseInt(_this._currentPath),
				title: info['title'],
				tags: null,
				date_created: _this._getDate(),
				date_modified: _this._getDate()
			}
			_this._db.menu.add(data).then(function(lastInsertID){
				_this._db.contents.add({
					related_to: lastInsertID,
					content: info['content']
				}).then(function() {
					alert('存储成功！');
					_this._showMenu(_this._currentPath);
					_this._openReader(lastInsertID);
				}).catch(function (e) {
					alert("Error: " + (e.stack || e));
				});
			}).catch(function (e) {
				alert("Error: " + (e.stack || e));
			});
		}
	};
	this._saveTags = function(id, tag){
		id = parseInt(id);
		_this._db.menu.filter(function(item){
			return item.parent_node == id && item.is_leaf == 0;
		}).toArray().then(function(v){
			for(let k in v){
				_this._saveTags(v[k]['id'], tag);
			}
			_this._db.menu.filter(function(item){
				return item.id == id && item.is_leaf == 0;
			}).toArray().then(function(w){
				for(let l in w){
					_this._db.menu.where('id').equals(w[l]['id']).modify({
						tags: tag.trim()
					});
				}
			});
		});
	};
	this._switchTag = function(id, self){
		var picker = self.getElementsByTagName('div')[0], currentTags = picker.getAttribute('class').trim().split(' '), currentTag = 'light-blue', newTags = [];
		for(var ct in currentTags){
			if(_this._allTags.indexOf(currentTags[ct])>-1){
				currentTag = currentTags[ct];
			}else{
				newTags.push(currentTags[ct]);
			}
		}
		var nextTag = _this._allTags[(_this._allTags.indexOf(currentTag) + 1) % _this._allTags.length];
		_this._saveTags(id, nextTag);
		newTags.push(nextTag);
		picker.setAttribute('class', newTags.join(' '));
	};
	this._saveFolder = function(name){
		if(!name || !name.length){
			alert('分支名有误。');
			return;
		}
		_this._db.menu.where('id').equals(_this._currentPath).toArray().then(function(r){
			if(_this._currentPath>0 && !r.length) return;
			var data = {
				is_leaf: 0,
				parent_node: parseInt(_this._currentPath),
				title: name,
				tags: r.length>0?r[0]['tags']:null,
				date_created: _this._getDate(),
				date_modified: _this._getDate()
			}
			_this._db.menu.add(data).then(function() {
				alert('存储成功！');
				_this._showMenu(_this._currentPath);
			}).catch(function (e) {
				alert("Error: " + (e.stack || e));
			});
		});
	};
	this._traversingDelete = function(id){
		id = parseInt(id);
		_this._db.menu.filter(function(item){
			return item.parent_node == id && item.is_leaf == 0;
		}).toArray().then(function(v){
			for(let k in v){
				_this._traversingDelete(v[k]['id']);
			}
			_this._db.menu.filter(function(item){
				return item.parent_node == id && item.is_leaf == 1;
			}).toArray().then(function(w){
				for(let l in w){
					_this._db.contents.where('related_to').equals(w[l]['id']).delete().then(function(){
						_this._db.menu.where('id').equals(w[l]['id']).delete().then(function(){
						});
					});
				}
				_this._db.menu.where('id').equals(id).delete().then(function(res){
					_this._db.contents.where('related_to').equals(id).delete().then(function(){
						_this._showMenu(_this._currentPath);
						console.log('已成功删除。');
					});
				});
			});
		});
	};
	this._deleteItem = function(id){
		id = parseInt(id);
		if(confirm('您确定要删除吗？')){
			_this._traversingDelete(id);
			alert('删除成功。');
		}
	};
	this._renderMenuList = function(res){
		var menu = '';
		for(let k in res){
			menu = menu + '<div class="notiverse-menu-item" data-type="'+(res[k]['is_leaf']>0?'file':'folder')+'" data-action="open" data-id="'+res[k]['id']+'"><div class="toolbar">';
			if(res[k]['is_leaf']==0) menu = menu + '<div class="menu-item-action" data-action="switch-color" title="'+'切换分支颜色'+'"><div class="round '+(res[k]['tags'] || 'light-blue')+'" style="width: 0.6rem;height:0.6rem;margin:0.2rem;vertical-align:middle;"></div></div>';
			menu = menu + '<div class="menu-item-action" data-action="delete" title="'+'删除'+'"><i class="fa fa-trash red-face"></i></div></div><div class="main"><i class="fa fa-'+(res[k]['is_leaf']>0?'file-text':'book')+'"></i> '+res[k]['title']+'</div></div>';
		}
		return menu;
	};
	this._search = function(word){
		if(word.trim().length == 0){
			return _this._showMenu(_this._currentPath);
		}
		const parameters = word.trim().split(' ');
		_this._db.menu.filter(function(p){
			if(!p.title) return false;
			var m = true;
			for(var r in parameters){
				m = m && (parameters[r]=='' || p.title.indexOf(parameters[r])>-1);
			}
			return m;
		}).toArray().then(function(u){
			var IDsExist = [];
			for(var i in u){
				IDsExist.push(u[i]['id']);
			}
			_this._db.contents.filter(function(p){
				if(!p.content) return false;
				var m = true;
				for(var r in parameters){
					m = m && (parameters[r]=='' || p.content.indexOf(parameters[r])>-1);
				}
				return m;
			}).toArray().then(function(v){
				var IDs = [];
				for(var j in v){
					IDs.push(v[j]['related_to']);
				}
				_this._db.menu.where('id').anyOf(IDs).toArray().then(function(w){
					let res = u, container = _this._getDomContentByPath('menu'), menu = '';
					for(var l in w){
						if(IDsExist.indexOf(w[l]['id'])==-1) res.push(w[l]);
					}
					menu = menu + _this._renderMenuList(res);
					container.innerHTML = menu;
					_this._bindMenuItem();
				});
			});
		});
	};
	this._dispMenuItem = function(id, prevID){
		_this._currentPath = parseInt(id);
		prevID = parseInt(prevID || 0);
		_this._db.menu.where('parent_node').equals(id).toArray().then(function(res){
			let container = _this._getDomContentByPath('menu'), menu = '';
			if(id>0) menu = menu + '<div class="notiverse-menu-item" data-type="folder" data-action="open" data-id="'+prevID+'"><div class="main"><i class="fa fa-folder-open"></i> '+'返回上一级'+'</div></div>';
			menu = menu + _this._renderMenuList(res);
			menu = menu + '<div class="notiverse-menu-item" data-type="file" data-action="create" data-id="'+id+'"><div class="main"><i class="fa fa-file-text-o"></i> '+'新建笔记'+'</div></div><div class="notiverse-menu-item" data-type="folder" data-action="create" data-id="'+id+'"><div class="main"><i class="fa fa-plus-square-o"></i> '+'新建分支'+'</div></div>';
			container.innerHTML = menu;
			_this._bindMenuItem();
		});
	};
	this._bindMenuItem = function(){
		if(_this._jquery){
			$('.notiverse-menu-item').each(function(){
				var targetType = $(this).attr('data-type');
				var targetID = parseInt($(this).attr('data-id'));
				switch($(this).attr('data-action')){
					case 'open':
					switch(targetType){
						case 'file':
						$(this).find('.main').click(function(){
							_this._openReader(targetID);
						});
						break;
						case 'folder':
						$(this).find('.main').click(function(){
							_this._showMenu(targetID);
						});
						break;
					}
					break;
					case 'create':
					switch(targetType){
						case 'file':
						$(this).find('.main').click(function(){
							_this._openEditor();
						});
						break;
						case 'folder':
						$(this).find('.main').click(function(){
							var title = prompt('输入分支名：');
							if(title) _this._saveFolder(title);
						});
						break;
					}
					break;
				}
				$(this).find('.menu-item-action').each(function(){
					switch($(this).attr('data-action')){
						case 'delete':
						$(this).click(function(){
							_this._deleteItem(targetID);
						})
						break;
						case 'switch-color':
						$(this).click(function(){
							_this._switchTag(targetID, this);
						})
						break;
					}
				});
			});
		}else{
			let menuItems = document.querySelectorAll(".notiverse-menu-item"), targetType, targetID;
			for(let r in menuItems){
				if(typeof menuItems[r] != 'object') continue;
				targetType = menuItems[r].getAttribute('data-type');
				targetID = parseInt(menuItems[r].getAttribute('data-id'));
				switch(menuItems[r].getAttribute('data-action')){
					case 'open':
					switch(targetType){
						case 'file':
						menuItems[r].querySelectorAll(".main")[0].addEventListener('click',function(){
							_this._openReader(targetID);
						});
						break;
						case 'folder':
						menuItems[r].querySelectorAll(".main")[0].addEventListener('click',function(){
							_this._showMenu(targetID);
						});
						break;
					}
					break;
					case 'create':
					switch(targetType){
						case 'file':
						menuItems[r].querySelectorAll(".main")[0].addEventListener('click',function(){
							_this._openEditor();
						});
						break;
						case 'folder':
						menuItems[r].querySelectorAll(".main")[0].addEventListener('click',function(){
							var title = prompt('输入分支名：');
							if(title) _this._saveFolder(title);
						});
						break;
					}
					break;
				}
				let menuItemActions = menuItems[r].getElementsByClassName('menu-item-action');
				for(var u in menuItemActions){
					if(typeof menuItemActions[u] != 'object') continue;
					switch(menuItemActions[u].getAttribute('data-action')){
						case 'delete':
						menuItemActions[u].addEventListener('click',function(){
							_this._deleteItem(targetID);
						});
						break;
						case 'switch-color':
						menuItemActions[u].addEventListener('click',function(){
							_this._switchTag(targetID, this);
						});
						break;
					}
				}
			}
		}
	};
	this._showMenu = function(id){
		if(id>0){
			_this._db.menu.where('id').equals(id).toArray().then(function(res){
				if(res.length){
					_this._updateBreadCrumb(res[0]['title']);
					_this._dispMenuItem(id,res[0]['parent_node']);
					var tag = '';
					if(res[0]['tags'].length) tag = res[0]['tags'];
					_this._setTheme(tag);
				}
			});
		}else{
			_this._updateBreadCrumb('');
			_this._dispMenuItem(id);
			_this._setTheme();
		}
	}
	this._switchInterface = function(interface){
		if(this._jquery){
			$('#notiverse-body-part').children().each(function(){
				$(this).removeClass('active');
			});
			$('#notiverse-'+interface).addClass('active');
		}else{
			var interfaces = _this._getDomContentByPath('body-part').children, reader = _this._getDomContentByPath(interface), classList;
			for(var k in interfaces){
				if(typeof interfaces[k] != 'object') continue;
				classList = interfaces[k].getAttribute("class");
				interfaces[k].setAttribute("class",classList.replace('active','').trim());
			}
			classList = reader.getAttribute("class");
			reader.setAttribute("class",classList + " active");
		}
	};
	this._getContent = function(id, indexFunction, contentFunction){
		_this._db.menu.where('id').equals(id).toArray().then(function(u){
			indexFunction(u);
		});
		_this._db.contents.where('related_to').equals(id).toArray().then(function(v){
			contentFunction(v);
		});
	};
	this._getColor = function(parentNode, tagFunction){
		if(parentNode<=0) tagFunction('');
		_this._db.menu.where('id').equals(parentNode).toArray().then(function(p){
			if(!p.length){
				tagFunction('');
			}else{
				tagFunction(p[0]['tags']);
			}
		});
	};
	this._getColorHex = function(color){
		var colorSet = {"red":["#ea6476","#ea001f"],"orange":["#ea9564","#ea5600"],"yellow":["#ead864","#eacb00"],"lime":["#b9ea64","#94ea00"],"light-green":["#76ea64","#1fea00"],"green":["#64ea95","#00ea56"],"cyan":["#64ead8","#00eacb"],"light-blue":["#64b9ea","#0094ea"],"blue":["#6476ea","#001fea"],"purple":["#9564ea","#5600ea"],"magenta":["#d864ea","#cb00ea"],"pink":["#ea64b9","#ea0094"]},
		colorTemp = colorSet[color] || colorSet["light-blue"];
		return colorTemp;
	};
	this._setTheme = function(color){
		var colorArr = _this._getColorHex(color), styleSelector = document.getElementById('theme-style');
		if(!styleSelector){
			styleSelector = document.createElement('style');
			styleSelector.setAttribute('id','theme-style');
			document.getElementsByTagName('head')[0].appendChild(styleSelector);
		}
		var colorTemplate = '.themed-back{background-color:{{0}} !important;} .themed-face{color:{{1}} !important;border-color:{{1}} !important;} .themed-face-hover:hover{color:{{1}} !important;border-color:{{1}} !important;} table tr:first-child{border-color:{{1}};}';
		styleSelector.innerHTML = colorTemplate.replace(/{{([^}]*)}}/g,function(a,b){return colorArr[parseInt(b)]});
	};
	this._download = function(id){
		if(id<0 || !_this._supportDownload) return;
		_this._db.menu.where('id').equals(id).toArray().then(function(p){
			if(!p.length) return;
			var main = p[0];
			if(main['is_leaf'] == 1){
				_this._db.contents.where('related_to').equals(id).toArray().then(function(v){
					if(!v.length) return;
					var data = {
						title: main['title'],
						content: v[0]['content']
					},text = _this._config.downloadTemplate.replace(/{{([^}]+)}}/g,function(a,b){
						return data[b] || '';
					});
					var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
					saveAs(blob, main['title'] + ".html");
				});
			}else{
				_this._db.menu.where('parent_node').equals(id).toArray().then(function(r){
					for(var j in r){
						_this._download(r[j]['id']);
					}
				});
			}
		});
	};
	this._openWelcome = function(){
		var history = _this._getHistory();
		if(history.length){
			_this._db.menu.where('id').anyOf(history).toArray().then(function(r){
				_this._displayHistory(r);
			});
		}else{
			_this._displayHistory();
		}
		_this._switchInterface('welcome');
	};
	this._displayHistory = function(arr){
		arr = arr || [];
		text = '<div class="notiverse-history-item" data-action="new" title="'+'新建笔记'+'"><div><i class="fa fa-file-text-o"></i></div><div class="title">'+'新建笔记'+'</div></div>';
		for(var k in arr){
			text = text + '<div class="notiverse-history-item" data-action="open" data-id="'+arr[k]['id']+'" data-parent-node="'+arr[k]['parent_node']+'" title="'+arr[k]['title']+'"><div><i class="fa fa-file-text"></i></div><div class="title">'+arr[k]['title']+'</div></div>';
		}
		document.getElementById('notiverse-history-row').innerHTML = text;
		var buttons = document.querySelectorAll('.notiverse-history-item');
		for(var k in buttons){
			if(typeof buttons[k] != 'object') continue;
			var targetAction = buttons[k].getAttribute("data-action"),targetID = parseInt(buttons[k].getAttribute('data-id')),parentNode = parseInt(buttons[k].getAttribute('data-parent-node'));
			switch(targetAction){
				case 'open':
				buttons[k].addEventListener('click',function(){
					_this._showMenu(parentNode);
					_this._openReader(targetID);
				});
				break;
				case 'new':
				buttons[k].addEventListener('click',function(){
					_this._openEditor();
				});
			}
		}
	};
	this._openReader = function(id){
		id = parseInt(id);
		if(id>0){
			_this._getContent(id, function(u){
				var parentNode = 0;
				for(let m in u){
					if(u[m]['is_leaf'] == 0) continue;
					if(_this._jquery){
						$('#reader-title').text(u[m]['title']);
					}else{
						document.getElementById('reader-title').innerText = u[m]['title'];
					}
					parentNode = u[m]['parent_node'];
					_this._setTitle(u[m]['title'] + ' - NotiVerse');
				}
				_this._getColor(parentNode, function(tag){
					_this._setTheme(tag);
				});
			},function(v){
				if(!_this._reader) return;
				for(let m in v){
					_this._reader.innerHTML = v[m]['content'];
				}
				var images = _this._reader.querySelectorAll('img');
				for(var jr in images){
					images[jr].removeAttribute('width').removeAttribute('height');
				}
			});
		}
		_this._switchInterface('reader');
		_this._setHistory(id);
		var toolbarFunctions = {
			'edit':{
				icon: 'edit',
				title: '编辑',
				func: function(){
					_this._openEditor(id);
				}
			}
		};
		if(_this._supportDownload) toolbarFunctions['download'] = {
			icon: 'download',
			title: '下载',
			func: function(){
				_this._download(id);
			}
		}
		_this._setToolBar(toolbarFunctions);
	};
	this._openEditor = function(id){
		if(!_this._editor) return;
		id = parseInt(id);
		if(id>0){
			_this._getContent(id, function(u){
				var parentNode = 0;
				for(let m in u){
					if(u[m]['is_leaf'] == 0) continue;
					if(_this._jquery){
						$('#editor-title input').val(u[m]['title']);
					}else{
						document.querySelectorAll('#editor-title input')[0].value = u[m]['title'];
					}
					parentNode = u[m]['parent_node'];
					_this._setTitle('编辑：' + u[m]['title'] + ' - NotiVerse');
					_this._updateBreadCrumb('编辑：' + u[m]['title']);
				}
				_this._getColor(parentNode, function(tag){
					_this._setTheme(tag);
				});
			},function(v){
				if(!_this._editor) return;
				for(let m in v){
					_this._editor.setContent(v[m]['content']);
				}
			});
		}else{
			id=0;
			_this._setTitle('新建笔记'+' - NotiVerse');
			_this._updateBreadCrumb('新建一篇笔记');
		}
		_this._switchInterface('editor');
		var toolbarFunctions = {
			'save':{
				icon: 'hdd-o',
				title: '保存',
				func: function(){
					_this._saveContent(id,_this._getEditorValue());
				}
			}
		};
		if(id>0){
			toolbarFunctions['return'] = {
				icon: 'minus-square-o',
				title: '直接离开',
				func: function(){
					_this._openReader(id);
				}
			};
		}else{
			toolbarFunctions['upload'] = {
				icon: 'upload',
				title: '上传文档',
				func: function(){
					document.getElementById('editor-uploader').click();
				}
			};
		}
		_this._setToolBar(toolbarFunctions);
	};
	this._initDB = function(userName){
		_this._dispUserName(userName);
		userName = _this._encodeUserName(userName);
		if(!window.indexedDB){
			alert('您的浏览器不支持IndexedDB，请更换浏览器以操作。');
			throw "Your browser does not support IndexedDB. Please change a browser to retry.";
		}
		_this._db = new Dexie(_this._config.prefix + "database_" + userName);
		_this._db.version(1).stores({
			menu: "++id,is_leaf,parent_node,title,tags,date_created,date_modified",
			contents: "++id,related_to,content",
			tags: "++id,tag_name,color",
			favorites: "++id,favorite_id,log"
		});
		var searchBar = document.getElementById('notiverse-search-input'),
		searchButton = document.getElementById('notiverse-search-button');
		if(searchBar){
			searchBar.addEventListener('keydown',function(e){
				if(e.keyCode == 13) _this._search(searchBar.value);
			});
		}
		if(searchButton){
			searchButton.addEventListener('click',function(){
				_this._search(searchBar.value);
			});
		} 
		console.log('Database is succefully initialized.');
	};
	this._initTinymce = function(){
		if(!window.tinymce){
			alert('Tinymce未成功加载，请刷新页面重试。');
			throw "Tinymce is failed to include.";
		}
		tinymce.init({
			selector: '#document',
			language:'zh_CN',
			language_url : '/notiverse/resources/zh_CN.js',
			external_plugins: {'mathjax': '/notiverse/resources/mathjax/plugin.min.js'},
			plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave mathjax',
			toolbar: 'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | table image media charmap mathjax emoticons hr pagebreak print preview',
			height: 650,
			min_height: 400,
			fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
			font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif',
			autosave_ask_before_unload: false,
			contextmenu: false,
			toolbar_drawer : false,
			content_css: '/notiverse/resources/main.css',
			color_map: ["#ea6476","red-backcolor","#ea001f","red-forecolor","#ea9564","orange-backcolor","#ea5600","orange-forecolor","#ead864","yellow-backcolor","#eacb00","yellow-forecolor","#b9ea64","lime-backcolor","#94ea00","lime-forecolor","#76ea64","light-green-backcolor","#1fea00","light-green-forecolor","#64ea95","green-backcolor","#00ea56","green-forecolor","#64ead8","cyan-backcolor","#00eacb","cyan-forecolor","#64b9ea","light-blue-backcolor","#0094ea","light-blue-forecolor","#6476ea","blue-backcolor","#001fea","blue-forecolor","#9564ea","purple-backcolor","#5600ea","purple-forecolor","#d864ea","magenta-backcolor","#cb00ea","magenta-forecolor","#ea64b9","pink-backcolor","#ea0094","pink-forecolor"],
			images_upload_handler: function(blobInfo, success, failure){
				var reader = new FileReader();
				reader.onloadend = function(){
					success(reader.result);
				}
				if(blobInfo){
					reader.readAsDataURL(blobInfo.blob());
				}else{
					failure('图像上传失败。');
				}
			},
			mathjax: {
				lib: '/notiverse/resources/mathjax/es5/tex-mml-chtml.js'
			},
			init_instance_callback: function(editor){
				_this._editor = editor;
				document.getElementById('editor-uploader').addEventListener('change',function(){
					if(!this.files.length) return;
					var f = this.files[0], name = f.name, namesArr = name.split('.'), type = namesArr[namesArr.length-1], reader = new FileReader();
					console.log(type);
					switch(type){
						case 'docx':
						reader.onload = function(){
							var arrBuf = this.result;
							mammoth.convertToHtml({arrayBuffer:arrBuf}).then(function(result){
								editor.setContent(result.value);
								console.log(result.messages);
							}).done();
						}
						reader.readAsArrayBuffer(f);
						break;
						case 'txt':
						reader.onload = function(){
							var text = this.result;
							editor.setContent('<p>' + _this._encodeHTML(text).replace('\n','</p><p>') + '</p>');
						}
						reader.readAsText(f);
						break;
						case 'html':
						reader.onload = function(){
							var text = this.result;
							_this.replace(/<body[^>]*>([\s\S]*)<\/body>/,function(a,b){
								b.replace(/<[^>]*class="notiverse-title"[^>]*>([^>]*)?<\/[^>]*>/,function(c,d){
									if(d) document.querySelectorAll('#editor-title input')[0].value = d;
									return '';
								});
								editor.setContent(b);
							});
						}
						reader.readAsText(f);
						break;
						default:
						alert('不支持的文件类型。');
						break;
					}
				});
				console.log("Tinymce is succefully initialized with ID:" + editor.id);
			}
		});
};
this._init = function(){
	if(window.jQuery) this._jquery = window.jQuery;
	var _userNames = _this._getLocalStorageArr("usernames"), _userName;
	if(!_userNames || !_userNames.length){
		_userName = this._createUser();
	}else{
		_userName = _userNames[0];
	}
	this._reader = document.getElementById('reader-main');
	this._initDB(_userName);
	this._initTinymce();
	this._openWelcome();
	this._showMenu(0);
};
this._init();
};