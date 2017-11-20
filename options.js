// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
//设置页面刷新时load已保存的信息。



function restore_options() {
  chrome.storage.sync.get({
  	is_hand: false,
  	is_hand0:false,
  	is_ctrl:false,
    city: '28',
	visatype:'1',
	info_type:'zhao',
	info_list:{},
	vip_info:{}
  }, function(items) {
    //document.getElementById('color').value = items.favoriteColor;
	$('#is_hand').find("option[value="+Number( items.is_hand )+"]").prop('selected', true);
	$('#is_hand0').prop('checked', items.is_hand0?"checked":"");
	$('#is_ctrl').prop('checked', items.is_ctrl?"checked":"");
	$('#city').find("option[value="+items.city+"]").prop('selected', true);
	$('#visatype>option').eq(items.visatype-1).prop('selected', true);
	var info_type = items.info_type;
	$('#info_type').find("option[value="+ info_type +"]").prop('selected', true);
	var info = items['info_list'][info_type];
	restore_info(info);
	if( items.vip_info.u ){
		var v = items.vip_info;
		$('#vip_u').val( v.u );
		$('#vip_p').val( v.p );
		//可用测试护照号： == \u53ef\u7528\u6d4b\u8bd5\u62a4\u7167\u53f7\uff1a
		$('#test_list').html('\u53ef\u7528\u6d4b\u8bd5\u62a4\u7167\u53f7\uff1a'+v.test_list);
	}
  });
}
function restore_info(info){
	var _info = {
		birth_day:'',
		passport_startday:'',
		passport_day:'',
		passportNo:'',
		title:1,
		Fname:'',
		Lname:'',
		AreaNo:'',
		phoneNo:'',
		telephoneNo:'',
		reg_mail:'',
		reg_pwd:'',
		mail:'',
		contry_apply:46,
		contry_of_birth:46,

		address_street:'',
		address_suburb:'',
		address_city:'',
		address_country:46,

		id_type:3,
		id_number:'',
		id_start_date:'',
		id_end_date:'',

		expect_go_date:'',
		been_in_date:'',


	};
	if( info ){
		for( var i in info ){
			if( typeof info[i] !== 'undefined' ){
				_info[i] = info[i];
			}
		}
	}
	$('#birth_day').val( _info['birth_day'] );
	$('#passport_startday').val( _info['passport_startday'] );
	$('#passport_day').val( _info['passport_day'] );
	$('#passportNo').val( _info['passportNo'] );
	$('#title').find('option[value=' + _info['title'] + ']').prop('selected', true);
	$('#Fname').val( _info['Fname'] );
	$('#Lname').val( _info['Lname'] );
	$('#AreaNo').val( _info['AreaNo'] );
	$('#phoneNo').val( _info['phoneNo'] );
	$('#telephoneNo').val( _info['telephoneNo'] );
	$('#mail').val( _info['mail'] );
	$('#reg_mail').val( _info['reg_mail'] );
	$('#reg_pwd').val( _info['reg_pwd'] );

	$('#contry_apply').val( _info['contry_apply'] );	
	$('#contry_of_birth').val( _info['contry_of_birth'] );	
	$('#address_street').val( _info['address_street'] );
	$('#address_suburb').val( _info['address_suburb'] );
	$('#address_city').val( _info['address_city'] );
	$('#address_country').val( _info['address_country'] );

	$('#id_type').val( _info['id_type'] );
	$('#id_number').val( _info['id_number'] );
	$('#id_start_date').val( _info['id_start_date'] );
	$('#id_end_date').val( _info['id_end_date'] );

	$('#expect_go_date').val( _info['expect_go_date'] );
	$('#been_in_date').val( _info['been_in_date'] );


}

// Saves options to chrome.storage
function save_options() {
  //var color = document.getElementById('color').value;
  var is_hand = !!Number($('#is_hand').val());
  var city = $('#city').val();
  var visatype = $('#visatype').val();
  var info_type = $('#info_type').val();
  var birth_day = $('#birth_day').val();
  var passport_startday = $('#passport_startday').val();
  var passport_day = $('#passport_day').val();
  var passportNo = $('#passportNo').val();
  var title = $('#title').val();
  var Fname = $('#Fname').val().trim().toUpperCase();
  var Lname = $('#Lname').val().trim().toUpperCase();
  var AreaNo = $('#AreaNo').val().trim() || '086';
  var phoneNo = $('#phoneNo').val().trim();
  var telephoneNo = $('#telephoneNo').val().trim();
  var mail = $('#mail').val().trim();
  var reg_mail = $('#reg_mail').val().trim();
  var reg_pwd = $('#reg_pwd').val();
  
  var contry_apply = $('#contry_apply').val();
  var contry_of_birth = $('#contry_of_birth').val();

  var address_street = $('#address_street').val();
  var address_suburb = $('#address_suburb').val();
  var address_city = $('#address_city').val();
  var address_country = $('#address_country').val();

  var id_type = $('#id_type').val();
  var id_number = $('#id_number').val();
  var id_start_date = $('#id_start_date').val();
  var id_end_date = $('#id_end_date').val();

  var expect_go_date = $('#expect_go_date').val();
  var been_in_date = $('#been_in_date').val();


  var all_info = {
  	is_hand: is_hand,
  	//is_hand0: is_hand0,
  	//is_ctrl: is_ctrl,
    city: city,
	visatype:visatype,
	info_type:info_type,
	info_list:{}
  };
  //从缓存中取出原先的设置
  chrome.storage.sync.get({
  	is_hand: !!1,
    city: '28',
	visatype:'1',
	info_type:'zhao',
	info_list:{},
	vip_info:{}
	//try_time:-1
  }, function(cfg) {
		all_info['info_list'] = cfg['info_list'] || {};
		//用当前页面的设置覆盖原先的设置
		all_info['info_list'][info_type] = {
			birth_day:birth_day,
			passport_startday:passport_startday,
			passport_day:passport_day,
			passportNo:passportNo,
			title:title,
			Fname:Fname,
			Lname:Lname,
			AreaNo:AreaNo,
			phoneNo:phoneNo,
			telephoneNo:telephoneNo,
			reg_mail:reg_mail,
			reg_pwd:reg_pwd,
			mail:mail,

			contry_apply:contry_apply,
			contry_of_birth:contry_of_birth,
	
			address_street:address_street,
			address_suburb:address_suburb,
			address_city:address_city,
			address_country:address_country,

			id_type:id_type,
			id_number:id_number,
			id_start_date:id_start_date,
			id_end_date:id_end_date,

			expect_go_date:expect_go_date,
			been_in_date:been_in_date,


		};
		//存储最新设置
		chrome.storage.sync.set(all_info, function() {
			// Update status to let user know options were saved.
			var status = document.getElementById('status');
			status.textContent = '保存成功！';
			setTimeout(function() {
				status.textContent = '';
			}, 750);
		});
  });
}
function random_char( type ){
	type = type || 0;//0数字，1小写字母，2大写字母
	var rand = Math.floor(Math.random()*1000);
	if( type == 0 ){
		return String.fromCharCode( rand%10 + 48);
	}
	if( type == 1 ){
		return String.fromCharCode( rand%26 + 97);
	}
	return String.fromCharCode( rand%26 + 65);
}
function random_zh(){
	var f_arr = ['B','P','M', 'F','D','T', 'N','L','G','K','H','J','Q','X','Z','C','S','ZH','CH','SH'];
	var l_arr = ['A', 'IA', 'UA', 'O', 'UO', 'E', 'IE', 'UE', 'AI', 'UAI', 'EI', 
				 'UEI', 'AO', 'IAO','OU', 'IOU', 'AN','IAN', 'UAN', 'VAN', 'EN',
				 'IN', 'UEN', 'VN', 'ANG', 'IANG', 'UANG', 'ENG', 'ING', 'UENG', 'ONG', 'IONG'];
	var rand = Math.floor(Math.random()*100000);
	return f_arr[ rand%f_arr.length ]+l_arr[rand%l_arr.length];
}

function random_date(type){
	var d_arr = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28"];
	var m_arr = ["01","02","03","04","05","06","07","08","09","10","11","12"];
	if(type==='birth'){
		var y_arr = ["1980","1981",	"1982",	"1983",	"1984",	"1985",	"1986",	"1987",	"1988",	"1989",	"1990",	"1991",	"1992",	"1993"];	
	}else if(type==='olddate'){
		var y_arr = ["2006","2007",	"2008",	"2009",	"2010",	"2011",	"2012",	"2013",	"2014",	"2015",	"2016"];	
	}else if(type==='newdate'){
		var y_arr = ["2019","2020",	"2021",	"2022",	"2023",	"2024",	"2025",	"2026",	"2027",	"2028",	"2029"];
	}
	var rand = Math.floor(Math.random()*100000);
	return d_arr[ rand%d_arr.length ]+'/'+m_arr[rand%m_arr.length]+'/'+y_arr[rand%y_arr.length];;
}

function random_str( length, type ){
	type = type || 0;
	var str = '';
	for( var i=0; i<length; i++ ){
		str += String( random_char( type ) );
	}
	return str;
}
function auto_gen(){
	$('#passportNo').val( 'E98'+random_str(6) );
	$('#passport_startday').val(random_date('olddate'));
	$('#passport_day').val(random_date('newdate'));
	$('#birth_day').val(random_date('birth'));
	$('#title option').prop('selected', false).eq( random_char() % 2 ).prop('selected', true);
	$('#Fname').val( random_zh() + (random_char(0)%2?random_zh():'')  );
	$('#Lname').val( random_zh() );
	$('#AreaNo').val('086');
	$('#phoneNo').val(String( random_str(8, 0) ));
	$('#telephoneNo').val('1'+String( random_str(10, 0) ));
	$('#mail').val( String(Number(random_str(9)))+'@qq.com' );
	$('#id_number').val(String( random_str(18, 0) ));	
	$('#id_start_date').val(random_date('olddate'));
	$('#id_end_date').val(random_date('newdate'));	
	$('#address_street').val( 'Room '+random_str(4, 0)+',No.' +random_str(3, 0)+' '+random_zh()+random_zh() +' street');
	$('#address_suburb').val( random_zh()+random_zh() );
	$('#address_city').val( random_zh()+random_zh() );
	$('#expect_go_date').val( '01/01/2018' );

};

var save_notice_mobile = function(){
	var notice_mobile = $('#notice_mobile').val();
	if( !/^[0-9]{11}$/.test(notice_mobile) ){
		open_dialog('手机号码格式错误！');
		return;
	}
	$.ajax({
		url:'http://www.naoqianbao.net/WHV_catcher_serv/save_notice_mobile.php',
		type:'POST',
		dataType:'json',
		//headers:{u:u, p:p},
		data:{
			notice_mobile:notice_mobile
		},
		success :function(data){
			if( data.s == 0 ){
				open_dialog('手机号码提交成功！');
			}else if( data.s == 1 ){
				open_dialog('您的手机号码已成功记录，无需重复提交！');
			}
		},
		error:function(d,s,x){
			if( d.status == 401 ){
				open_dialog('');
				//chrome.storage.sync.set({vip_info:{}});
				return;
			}else{
				return;
			}
		}
	});
}


var open_dialog = function( str_info ){
	if( str_info ){
		$("#dialog").children('p').html(str_info);
	}
	$("#dialog").dialog({
		modal: true,
		buttons : [{
				autofocus : true,
				text : "OK",
				click : function () {
					$(this).dialog("close");
				}
			}
		]
	});
}

//展示一个简单的气泡提示框，参数为html
showToolTip = function( content_html, option, position ){
	option = option || null;
	content_html = content_html || '';
	var id = $('.tooltip_wrapper', window.top.document).length + 1;
	$('body', window.top.document).append('<div id="tooltip_wrapper_'+id+'" class="tooltip_wrapper" style="width:1px;height:1px;display:block;position:fixed;left:250px;top:100px;z-index:1000000009" title="123"></div>');
	var $tooltip_wrapper = $('#tooltip_wrapper_'+id, window.top.document);
	$tooltip_wrapper.tooltip({
		content:content_html,
		hide:{delay:true,duration:5000},
		show:{delay:false,duration:0}
	}).tooltip('widget');
	$tooltip_wrapper.tooltip('option', 'content', content_html);
	if( option && /^[0-9]+$/.test( option ) ){
		//默认数字参数为气泡保留时间(毫秒)
		$tooltip_wrapper.tooltip('option', 'hide', {delay:true, duration:option});
	}else if( option && typeof( option ) == 'object' ){
		$tooltip_wrapper.tooltip('option', option);
	}else{//如果没有设置，使用默认
		$tooltip_wrapper.tooltip('option', {hide:{delay:true,duration:5000},show:{delay:false,duration:0}});
	}
	if( position && typeof(position) == 'object' ){
		//参数示例： {top:'100px',bottom:'100px', left:'100px', right:'100px' }
		//将默认属性置为auto，方便重新定位
		$tooltip_wrapper.css('left', 'auto').css('right', 'auto').css('top', 'auto').css('bottom', 'auto');
		for( var i in position ){
			$tooltip_wrapper.css(i, position[i]);
		}
	}else if( position && typeof(position) == 'string' ){
		//string表示一个ID或者Jquery选择规则
		var p = $(position).offset();
		$tooltip_wrapper.css('left', 'auto').css('right', 'auto').css('top', 'auto').css('bottom', 'auto');
		$tooltip_wrapper.css('top', p.top+'px');
		$tooltip_wrapper.css('left', p.left+'px');
	}else{//如果没有设置，使用默认
		$tooltip_wrapper.css({left:'250px', top:'100px'});
	}
	//模拟鼠标移入隐藏层促发气泡展示
	$tooltip_wrapper.trigger('mouseover');
	//设置尽可能大的z-index，避免被遮挡
	$('.ui-tooltip').css('z-index', '100000000')
	//模拟鼠标移出隐藏层促发气泡消失
	$tooltip_wrapper.trigger('mouseleave');
}

var mydatepicker = function(query){
    $(query).datepicker({
		altFormat: "dd/mm/yy",
		//appendText: "(YYYY-MM-DD)",
		buttonImage:'',
		changeMonth:true,
		changeYear :true,
		closeText :'X',
		constrainInput:true,
        yearRange:'c-50:c+50',
		dateFormat: "dd/mm/yy",
		dayNames:["日", "一", "二", "三", "四", "五", "六"],
		dayNamesMin:["日", "一", "二", "三", "四", "五", "六"],
		dayNamesShort:["日", "一", "二", "三", "四", "五", "六"],
		firstDay:1,
		gotoCurrent:true,
		//minDate:1,
		monthNames:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthNamesShort :["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
		selectOtherMonths :true,
		shortYearCutoff:'2'
    });
}
// document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click', save_options);
$(document).ready(function(){
    mydatepicker("#birth_day");
    mydatepicker("#passport_startday");
	mydatepicker("#passport_day");
    mydatepicker("#id_start_date");
	mydatepicker("#id_end_date");	
	mydatepicker("#expect_go_date");
	mydatepicker("#been_in_date");	
	g.option_tabs = $('#tabs').tabs({active:1});
	$('#save').click( function(){
		save_options();
	} );
	$('#notice_mobile_btn').click(function(){
		save_notice_mobile();
	});
	restore_options();
	//可存储8组信息
	$('#info_type').change(function(){
		var info_type = $('#info_type').val();
		chrome.storage.sync.get({
			is_hand : false,
			city: '28',
			visatype:'1',
			info_type:'zhao',
			info_list:{}
		}, function(items) {
			restore_info(items['info_list'][info_type]);
		});
		
	});
	//$('#is_hand').change(function(){ on_is_hand_change.call(this) });
	$('.auto_gen').click(auto_gen);
	//$('#right_submit').click( vip_save );
}).keydown(function(e){
	var keyCode = (e.keyCode || e.charCode || e.which);
	if( keyCode == 83 && e.ctrlKey ){//ctrl+s
		e.preventDefault();
		save_options();
	}
});
$(function(){
	$('#submit0').click(function(){
	debugger;
		var id = $('#number').val();
		var url1 = "https://onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/Personal1.aspx?ApplicationId="+id+"&IndividualType=Primary&IndividualIndex=1";
		var url2 = "https://onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/Personal2.aspx?ApplicationId="+id+"&IndividualType=Primary&IndividualIndex=1";
		var url3 = "https://onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/Medical1.aspx?ApplicationId="+id+"&IndividualType=Primary&IndividualIndex=1";
		var url4 = "https://onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/Character.aspx?ApplicationId="+id+"&IndividualType=Primary&IndividualIndex=1";
		var url5 = "https://onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/WorkingHolidaySpecific.aspx?ApplicationId="+id+"&IndividualType=Primary&IndividualIndex=1";
		var url6 = "https://onlineservices.immigration.govt.nz/WORKINGHOLIDAY/Application/Submit.aspx?ApplicationId="+id;
		//var url7 = "https://onlineservices.immigration.govt.nz/SILVERFERN/Questionnaire/Details/PersonalDetails/"+id;

		$('#url1').html('PersonalDetail:<a href='+url1+' target="_blank"">'+url1+'</a>');
		$('#url2').html('Identification&nbsp;:<a href='+url2+' target="_blank"">'+url2+'</a>');
		$('#url3').html('Health&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<a href='+url3+' target="_blank"">'+url3+'</a>');
		$('#url4').html('Character&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<a href='+url4+' target="_blank"">'+url4+'</a>');
		$('#url5').html('Specific&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<a href='+url5+' target="_blank"">'+url5+'</a>');
		$('#url6').html('Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<a href='+url6+' target="_blank"">'+url6+'</a>');
		//$('#url7').html('--(附)SFV填写:<a href='+url7+' target="_blank"">'+url7+'</a>');		
		
		$('#url1').css("display","block");
		$('#url2').css("display","block");
		$('#url3').css("display","block");
		$('#url4').css("display","block");
		$('#url5').css("display","block");
		$('#url6').css("display","block");
		//$('#url7').css("display","block");

	});
})