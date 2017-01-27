define(['jquery'],function($){
	function Pay(opt){
		this.boxEvent = opt.boxEvent;//外层代理容器
		this.count= opt.count;//input数量的input dom
		this._dd();

	}

	Pay.prototype._dd = function(){
		var self= this;
		self.boxEvent.on('click','.count-sub',function(event){//外层代理容器绑定事件（-逻辑）
			var gataTar = event.delegateTarget;//触发事件的绑定元素就是（self.boxEvent）
			
			var val = $(gataTar).find('.count').val();//input里的数量
			
			if(val == 0){
				$(this).css('background','#ddd');
				
				return;
			}else if(val > 0){

				$(this).css('background','#000');
				$(gataTar).find('.count').val(--val);
				$(gataTar).attr('data-value',val);
				var value=$(gataTar).attr('data-value');
				var id = $(gataTar).attr('data-id');
				var name = $(gataTar).attr('data-name');
				var price = $(gataTar).attr('data-price');
				$('body').trigger('order',[value,id,name,price]);
			}
		});


		self.boxEvent.on('click','.count-add',function(event){//外层代理容器绑定事件（+逻辑）
			var gataTar = event.delegateTarget;//触发事件的绑定元素就是（self.boxEvent）
			
			var val = $(gataTar).find('.count').val();//input里的数量
			

			$('.count-sub').css('background','#000');

			$(gataTar).find('.count').val(++val);
			$(gataTar).attr('data-value',val);

			var value=$(gataTar).attr('data-value');
			var id = $(gataTar).attr('data-id');
			var name = $(gataTar).attr('data-name');
			var price = $(gataTar).attr('data-price');

			$('body').trigger('order',[value,id,name,price]);
		
			
		});

		
		// self.boxEvent.on('change','.count',function(event){//外层代理容器绑定事件(input输入逻辑)
		// 	var gataTar = event.delegateTarget;//触发事件的绑定元素就是（self.boxEvent）
			
		// 	var val = $(gataTar).find('.count').val();//input里的数量
			
			
		// 	value =$(gataTar).attr('data-value',val);
		
		// 	var value=$(gataTar).attr('data-value');
		// 	var id = $(gataTar).attr('data-id');
		// 	var name = $(gataTar).attr('data-name');
		// 	var price = $(gataTar).attr('data-price');

		// 	$('body').trigger('order',[value,id,name,price]);
			
		// });
	}

	
	return Pay; 
})//