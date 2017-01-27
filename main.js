require.config({
	shim:{
		jqcity:{
			deps:['jquery','cityadd']
		}
	},
	paths:{
		"jquery":"./lib/jquery",
		"jqcity":"./lib/city/jquery.city",
		"cityadd":"./lib/city/address"
	}
})


require(['jquery','pay','paycar','cityadd','jqcity'],function($,pay,PayCar){
	
		new pay({//选择商品时加减的逻辑
			boxEvent:$('.inner-dareil-ecommend')
			//绑定触发事件的容器
		});

		var payCar = new PayCar({//购物车的逻辑
			container:$('#shoplist'),//容器
			boxEvent:'.shop-span',//绑定触发事件的容器
			totalPrice:$('#pay-price')//插入结算结果的容器
		});
		
		$('body').on('order',function(event,value,id,name,price){
			//触发加减商品事件，开始渲染购物车 
			payCar.changeProducts(value,id,name,price)
		});

		$('.shopcar').on('changeValue',function(e,value,id,name,price){
			//触发购物车内加减事件，及时渲染页面中的商品保持一致
			var dataId='div[data-id="'+id+'"]';
			console.log(dataId)
			$(dataId).find('.count').val(value);
		});

		$(document).ready(function(){ 
			//购物车的点击开启和关闭的切换效果
			$('.shopcar').click(function(event){
				if(event.target!=this){
				return;
				}
			$(this).toggleClass("shopcar22");
				}); 
			$('body').on('click','#close',function(){
				$('.shopcar').toggleClass("shopcar22");
			})
		});
	
		var selectedCity = '';


		$('.address').click(function(){
			$('#mask-city').show(100);
			$('.city-box').show(100);
		})

		$("#city").city();

		$('.city-box').on('click','#cancle-close',function(){
			$('#mask-city').hide(100);
			$('.city-box').hide(100);
		});
		$('body').on('selectedCity', function(e, city){
			selectedCity = city;
		});

		$('.city-box').on('click','#confirm',function(event){
			if(selectedCity){
				$('.address').html(selectedCity);
			}
			
			$('#mask-city').hide(100);
			$('.city-box').hide(100);
		})

		
});