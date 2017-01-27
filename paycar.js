define(['jquery'],function($){
	function PayCar(opt){
		this.container=opt.container;
		this.boxEvent=opt.boxEvent;
		this.products= [];
		
		this.totalPrice=opt.totalPrice;
		var products = localStorage.getItem('products');
		
		if(products){
			this.products = JSON.parse(products);
			this.render();
		}
	}

	PayCar.prototype.changeProducts = function(value,id,name,price){

		var products = this.products;
		var str='';
		var flag= false;
		var index;
		var total=0;

		if(products.length == 0){
			products.push({
					id:id,
					name:name,
					value:value,
					price:price,
					totalPrice:value*price
				});
		}else{
			for(var i=0;i<products.length;i++){
				if(products[i].id == id){
					flag = true;
					index= i;
					
				}
			}
			if(flag){
				products[index].value = value;
				products[index].totalPrice = value*price;
			}else{	
				products.push({
					id:id,
					name:name,
					value:value,
					price:price,
					totalPrice:value*price
				});

			}
			
		}
		
		this.render();
		
	}

	PayCar.prototype.render = function(){

		var products = this.products;
		var str='';
		
		var total=0;
		
		for(var i=0;i<products.length;i++){
			if(products[i].value==0){
				continue;
			}else{
				total += products[i].totalPrice;
				
				str +='<div class="shop-span" data-name="'+products[i].name+'" data-value="'+products[i].value+'" data-price="'+products[i].price+'"  data-id="'+products[i].id+'"><span>'+products[i].name+'</span><span>￥'+products[i].price*products[i].value+'</span><span class="count-box"><span class="count-sub">-</span><input type="text" value="'+products[i].value+'" class="count"><span class="count-add">+</span></span></div>';
			}
		}
		str +='<span class="close" id="close">关闭</span>'; 

		this.container.html(str);
		
		this.totalPrice.html(total);
		
		this._dd();
		
		localStorage.setItem('products', JSON.stringify(this.products));
	}

	PayCar.prototype._dd = function(){
		
		
		var self= this;

		$(self.boxEvent).on('click','.count-sub',function(event){//外层代理容器绑定事件（-逻辑）

			var gataTar = event.delegateTarget;//触发事件的绑定元素就是（self.boxEvent）
			
			var val = $(gataTar).find('.count').val();//input里的数量
			
			if(val == 0){
				$(gataTar).css('display','none');
				
				return;
			}else if(val > 0){

				$(this).css('background','#000');
				$(gataTar).find('.count').val(--val);

				$(gataTar).attr('data-value',val);
				
				if(val==0){
				$(gataTar).css('display','none');
				}
					var value=$(gataTar).attr('data-value');
					var id = $(gataTar).attr('data-id');
					var name = $(gataTar).attr('data-name');
					var price = $(gataTar).attr('data-price');
					$('body').trigger('order',[value,id,name,price]);
					$('.shopcar').trigger('changeValue',[value,id,name,price]);
				
			}
		});


		$(self.boxEvent).on('click','.count-add',function(event){//外层代理容器绑定事件（+逻辑）
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
			$('.shopcar').trigger('changeValue',[value,id,name,price]);
			
		});

		
		$(self.boxEvent).on('change','.count',function(event){//外层代理容器绑定事件(input输入逻辑)
			var gataTar = event.delegateTarget;//触发事件的绑定元素就是（self.boxEvent）
			
			var val = $(gataTar).find('.count').val();//input里的数量
			
			//$(gataTar).find('.count').val(++val);
			value =$(gataTar).attr('data-value',val);
		
			var value=$(gataTar).attr('data-value');
			var id = $(gataTar).attr('data-id');
			var name = $(gataTar).attr('data-name');
			var price = $(gataTar).attr('data-price');

			$('body').trigger('order',[value,id,name,price]);
			$('.shopcar').trigger('changeValue',[value,id,name,price]);
		});
	}


	return PayCar;


})

//$('body').on('order',function(value,id,name,price){
			/*
			var products = [
				{
					id:1,
					name: '芒果',
					count: 1,
					price: 53
				},
				{
					id:2,
					name: '芒果',
					count: 1,
					price: 53
				}
			];
			*/
	//	})