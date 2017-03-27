//download by http://www.codefans.net
	(function($) {
		$.suggest = function(input, options) {
			var $input = $(input).attr("autocomplete", "off");
			var $results;

			var timeout = false;		// hold timeout ID for suggestion results to appear
			var prevLength = 0;			// last recorded length of $input.val()
			var cache = [];				// cache MRU list
			var cacheSize = 0;			// size of cache in chars (bytes?);
			var parameter = options.parameter;
			var pageTotal = 1;
			var numberTotal = 1;
			var is_hide = true;
			var equip_type = options.type;
			var is_equip = false;
			var tips_title = '中文/拼音';
			console.log(is_equip);
			switch (equip_type){
				case "suggest" :
					tips_title = '中文/拼音';
					is_equip = false;
					break;
				case "equip" :
					tips_title = '地址/设备号';
					is_equip = true;
					break;
				case "train" :
					tips_title = '培训名称';
					is_equip = true;
					break;
			}
			if($.trim($input.val())=='' || $.trim($input.val())==tips_title) $input.attr('placeholder', tips_title).css('color','#666');
			if( ! options.attachObject )
				options.attachObject = $(document.createElement("ul")).appendTo('body');

			$results = $(options.attachObject);
			$results.addClass(options.resultsClass);
			$results.unbind();
			$input.unbind();
			resetPosition();
			$(window)
				.load(resetPosition)		// just in case user is changing size of page while loading
				.resize(resetPosition);

			$input.blur(function() {
				console.log('blur');
				var is_empty = $results.find('ul').length == 0 ? 1 : 0;
				if(is_empty){
					setTimeout(function() {
						$results.hide()

					}, 200);
					is_hide = true;
				}
				/*
				selectCurrentResult();

				if(!is_hide){
					setTimeout(function() { $results.hide() }, 200);
					is_hide = true;
				}
				*/

			});




			$input.focus(function(){
				//console.log('focus');
				is_hide = false;
				$results.show();
				if($.trim($(this).val()) == tips_title){
					$(this).val('').css('color','#000');
				}
				if($.trim($(this).val())==''){
					displayItems('');//显示热门城市列表
					parameter.keyword = '';
				}
			});
			$input.click(function(){
				//console.log('$inputclick');
				//console.log(parameter.keyword);
				$results.show();
				//var q=$.trim($(this).val());

				if(parameter.keyword == ''){
					displayItems('');
				}

				//$(this).select();
			});

			// help IE users if possible
			try {
				$results.bgiframe();
			} catch(e) { }

		/*
			$input.keyup(processKey).bind('input propertychange', function() {
				console.log($(this).val());
				setTimeout(function() { console.log('您输入的内容是：' +  $input.val()); }, 1000);
			});*/

			$input.bind('input propertychange', processKey);

			//$input.keyup(processKey);

			$results.on('click', '.ac-result-footer', function(){
				console.log(parameter);
				if(parameter.pageNow == pageTotal)
					return;
				parameter.pageNow ++;
				$results.show();

				getTeacherList();
			});
				/*.mouseenter(function(){
				is_hide = true;
			}).mouseleave(function(){
				if(is_hide){
					setTimeout(function() { $results.hide() }, 200);
					//is_hide = false;
				}
			});*/

			//add by jisen 2017/02/14
			$results.on('click', '.ac-close', function(){
				console.log('close window');
				is_hide = true;
				$results.hide();
						//selectCurrentResult();
			});


			function resetPosition() {
				// requires jquery.dimension plugin
				var offset = $input.offset();
				$results.css({
					top: 40  + 'px',
					left: 0
				});
			}


			function processKey(e) {
				///console.log('processKey');
				///console.log($.trim($input.val()));

				// handling up/down/escape requires results to be visible
				// handling enter/tab requires that AND a result to be selected
				if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
					(/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {
					//console.log('selectCurrentResult1111');
		            if (e.preventDefault)
		                e.preventDefault();
					if (e.stopPropagation)
		                e.stopPropagation();

	                e.cancelBubble = true;
	                e.returnValue = false;
					///console.log('selectCurrentResult11111111111111111111');
					switch(e.keyCode) {

						case 38: // up
							prevResult();
							break;

						case 40: // down
							nextResult();
							break;
						case 13: // return  enter
							//console.log('selectCurrentResult');
							selectCurrentResult();
							break;

						case 27: //	escape
							$results.hide();
							break;

					}

				} else if ( $.trim($input.val()) != parameter.keyword){
					console.log('timeouta');
					$input.attr('rel',0);
					if (timeout)
						clearTimeout(timeout);
					timeout = setTimeout(suggest, options.delay);
					prevLength = $input.val().length;

				}


			}

			function suggest() {
				var q = $.trim($input.val());
				//console.log(q);
				//console.log(parameter.keyword);
				if(q == ''){
					//console.log('qq');
					displayItems('');
					parameter.keyword = '';
				}else{
					parameter.pageNow = 1;
					parameter.keyword = q;
					getTeacherList();
				}


				//console.log('suggest');
			}
			function displayItems(data) {
				//console.log(data);
				var $results_header = '';
				var $results_data = '';
				var $results_footer = '';
				var footer_key = '设备';
				//var items = $.trim($input.val());
				var items = parameter.keyword;
				var page_start = parameter.pageSize *(parameter.pageNow-1) - 0 + 1;
				if(items == ''){
					$results_header = '<div class="gray ac-result-tip">' +
						'<span class="ac-tips">请输入' + tips_title + '进行查询</span>' +
						'<span class="ac-loading">加载中...</span>' +
						'</div>' ;
				}else{
					if(data === ''){
						$results_header = '<div class="gray ac-result-tip">' +
							'<span class="ac-tips">请输入' + tips_title + '进行查询</span>' +
							'<span class="ac-loading">加载中...</span>' +
							'</div>' ;
					}else{
						if(!data.length){
							$results_header = '<div class="gray ac-result-tip">对不起，找不到：' + items + '</div>';
						}else{

							switch (equip_type){
								case "suggest" :
									$results_header ='<div class="gray ac-result-tip ac-result-tip-border">' +
										'<span class="ac-tips">共查询到<em>' + numberTotal + '</em>条关于 "<em>' + items + '</em>" 的数据</span>' +
										'<span class="ac-loading">加载中...</span>' +
										'<span class="ac-close">+</span>' +
										'</div>' +
										'<div class="ac-result-header">' +
										'<strong class="first">排序</strong>' +
										'<strong>姓名</strong>' +
										'<strong>工号</strong>' +
										'<strong>组织结构</strong>' +
										'</div>';
									if(parameter.pageNow == 1 ){
										$results_data = '<ul>';
										for(var h in data){
											$results_data +='<li rel="' + data[h].teacherId + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span>'+data[h].teacherName+'</span>' +
												'<span>'+data[h].teacherCode+'</span>' +
													//(options.source[h].address ? '<span>'+options.source[h].address+'</span>' : '') +
												'<span>'+data[h].groupName+'</span></a></li>';
											//<li rel="'+options.source[h][0]+'"><a href="#'+h+'"><span>'+options.source[h][2]+'</span>'+options.source[h][1]+'</a></li>
										}
										$results_data +='</ul>';
									}else{
										for(var h in data){
											$results_data +='<li rel="' + data[h].teacherId + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span>'+data[h].teacherName+'</span>' +
												'<span>'+data[h].teacherCode+'</span>' +
													//(options.source[h].address ? '<span>'+options.source[h].address+'</span>' : '') +
												'<span>'+data[h].groupName+'</span></a></li>';
											//<li rel="'+options.source[h][0]+'"><a href="#'+h+'"><span>'+options.source[h][2]+'</span>'+options.source[h][1]+'</a></li>
										}
									}
									footer_key = '人员';
									break;
								case "equip":
									$results_header ='<div class="gray ac-result-tip ac-result-tip-border">' +
										'<span class="ac-tips">共查询到<em>' + numberTotal + '</em>条关于 "<em>' + items + '</em>" 的数据</span>' +
										'<span class="ac-loading">加载中...</span>' +
										'<span class="ac-close">+</span>' +
										'</div>' +
										'<div class="ac-result-header">' +
										'<strong class="first">排序</strong>' +
										'<strong class="text_center">设备号</strong>' +
										'<strong>设备名称</strong>' +
										'</div>';
									if(parameter.pageNow == 1 ){
										$results_data = '<ul>';
										for(var h in data){
											$results_data +='<li rel="' + data[h].id + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span class="text_center">'+data[h].ainemoId+'</span>' +
												'<span>'+data[h].name+'</span></a></li>';
										}
										$results_data +='</ul>';
									}else{
										for(var h in data){
											$results_data +='<li rel="' + data[h].id + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span class="text_center">'+data[h].ainemoId+'</span>' +
												'<span>'+data[h].name+'</span></a></li>';
										}
									}
									footer_key = '设备';
									break;
								case "train" :
									$results_header ='<div class="gray ac-result-tip ac-result-tip-border">' +
										'<span class="ac-tips">共查询到<em>' + numberTotal + '</em>条关于 "<em>' + items + '</em>" 的数据</span>' +
										'<span class="ac-loading">加载中...</span>' +
										'<span class="ac-close">+</span>' +
										'</div>' +
										'<div class="ac-result-header">' +
										'<strong class="first">排序</strong>' +
										'<strong>培训名称</strong>' +
										'<strong>培训地点</strong>' +
										'<strong>创建者</strong>' +
										'</div>';
									if(parameter.pageNow == 1 ){
										$results_data = '<ul>';
										for(var h in data){
											$results_data +='<li rel="' + data[h].id + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span title="培训名称: '+data[h].title+'">'+data[h].title+'</span>' +
												'<span title="培训地点: '+data[h].address+'">'+data[h].address+'</span>' +
												'<span>'+data[h].creator+'</span>' +
												'</a></li>';
										}
										$results_data +='</ul>';
									}else{
										for(var h in data){
											$results_data +='<li rel="' + data[h].id + '">' +
												'<a href="#'+h+'">' +
												'<span class="first">'+ (page_start - 0 + parseInt(h)) +'</span>' +
												'<span>'+data[h].title+'</span>' +
												'<span>'+data[h].address+'</span>' +
												'<span>'+data[h].creator+'</span>' +
												'</a></li>';
										}
									}
									footer_key = '培训项目';
									break;
							}

							console.log(equip_type)
							if(parameter.pageNow == pageTotal){
								$results_footer = '<div class="ac-result-footer"><span>没有更多关于 "' + items + '"的' + footer_key + '了</span> </div>'
							}else{
								$results_footer = '<div class="ac-result-footer"><span>加载更多关于 "' + items + '"的' + footer_key + '</span> </div>'
							}
						}
					}

				}
				if(parameter.pageNow == 1 ){
					$results.html($results_header + $results_data + $results_footer).show();
				}else{
					$results.find('ul').append($results_data);
					$results.find('.ac-result-footer').replaceWith($results_footer);
					$results.show();
				}

				$results.children('ul').children('li:first-child').addClass(options.selectClass);

				$results.children('ul')
					.children('li')
					.mouseover(function() {
					//	$results.children('ul').children('li').removeClass(options.selectClass);
						//$(this).addClass(options.selectClass);
					})
					.click(function(e) {
						e.preventDefault();
						e.stopPropagation();
						//add by jisen 2017/02/14
						$results.children('ul').children('li').removeClass(options.selectClass);
						$(this).addClass(options.selectClass);
						selectCurrentResult();
						//console.log('selectCurrentResult click')
					});
				$results.find('.ac-tips').show();
				$results.find('.ac-loading').hide();
			}

			function getCurrentResult() {

				if (!$results.is(':visible'))
					return false;

				var $currentResult = $results.children('ul').children('li.' + options.selectClass);
				if (!$currentResult.length)
					$currentResult = false;

				return $currentResult;

			}

			function selectCurrentResult() {
				var tag_index = is_equip ? 2 : 1;
				var callbacks = options.callback;
				$currentResult = getCurrentResult();
				if ($currentResult) {
                    $input.val($currentResult.children('a').children('span').eq(tag_index).html());
                    $input.attr('rel',$currentResult.attr('rel'));
					$results.hide();
					//console.log('selectCurrentResult callbacks');
					(callbacks && typeof callbacks == 'function') && callbacks();
					if( $(options.dataContainer) ) {
						$(options.dataContainer).val($currentResult.attr('rel'));
					}

					if (options.onSelect) {
						options.onSelect.apply($input[0]);
					}
				}

			}

			function nextResult() {

				$currentResult = getCurrentResult();

				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.next()
							.addClass(options.selectClass);
				else
					$results.children('ul').children('li:first-child').addClass(options.selectClass);

			}

			function prevResult() {

				$currentResult = getCurrentResult();

				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.prev()
							.addClass(options.selectClass);
				else
					$results.children('ul').children('li:last-child').addClass(options.selectClass);

			}
			//获取人员信息
			function getTeacherList(){
				$results.find('.ac-tips').hide();
				$results.find('.ac-loading').show();
				$.ajax({
					type: "post",
					dataType: 'json',
					data : {json: JSON.stringify(parameter)},
					url: options.url,
					success: function(data){
						pageTotal = data.pageTotal;
						numberTotal = data.numberTotal;
						displayItems(data.beanList);
					},
					error: function (er) {
						//console.log(er);
					}
				});
			}

		};
		//人员查询
		$.fn.suggest = function(options) {
			if (!options && !options.url && options.url == '')
				return;

			options = options || {};
			options.url = options.url || [];
			options.parameter = options.parameter || [];
			options.delay = options.delay || 0;
			options.type = 'suggest';
			options.resultsClass = options.resultsClass || 'ac-results';
			options.selectClass = options.selectClass || 'ac_over';
			options.matchClass = options.matchClass || 'ac_match';
			options.minchars = options.minchars || 1;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.dataDelimiter = options.dataDelimiter || '\t';
			options.dataContainer = options.dataContainer || '#SuggestResult';
			options.attachObject = options.attachObject || null;
			console.log('new start');

			new $.suggest(this, options);




			return this;

		};

		//设备查询
		$.fn.equipList = function(options) {
			if (!options && !options.url && options.url == '')
				return;

			options = options || {};
			options.url = options.url || [];
			options.parameter = options.parameter || [];
			options.delay = options.delay || 0;
			options.type = 'equip';
			options.resultsClass = options.resultsClass || 'ac-results';
			options.selectClass = options.selectClass || 'ac_over';
			options.matchClass = options.matchClass || 'ac_match';
			options.minchars = options.minchars || 1;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.dataDelimiter = options.dataDelimiter || '\t';
			options.dataContainer = options.dataContainer || '#SuggestResult';
			options.attachObject = options.attachObject || null;
			console.log('new start equipList');

			new $.suggest(this, options);

			return this;

		};
		//培训项目查询
		$.fn.trainName = function(options) {
			if (!options && !options.url && options.url == '')
				return;

			options = options || {};
			options.url = options.url || [];
			options.parameter = options.parameter || [];
			options.delay = options.delay || 0;
			options.type = 'train';
			options.callback =  options.callback || null;
			options.resultsClass = options.resultsClass || 'ac-results';
			options.selectClass = options.selectClass || 'ac_over';
			options.matchClass = options.matchClass || 'ac_match';
			options.minchars = options.minchars || 1;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.dataDelimiter = options.dataDelimiter || '\t';
			options.dataContainer = options.dataContainer || '#SuggestResult';
			options.attachObject = options.attachObject || null;
			console.log('new start trainName');

			new $.suggest(this, options);

			return this;

		};

	})(jQuery);