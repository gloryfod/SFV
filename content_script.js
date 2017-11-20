//监听background发送的消息

var def_func = function (level) {
    //如果当前页面在新官网的以下页面： http://www.vfsglobal.com/Australia/China/schedule_an_appointment.html
    //var start_url = 'https://www.visaservices.org.in/DIAC-China-Appointment/AppScheduling/AppWelcome.aspx?p=Gta39GFZnstZVCxNVy83zTlkvzrXE95fkjmft28XjNg%3d';
    //var start_url = 'https://visaservicesonline.vfsglobal.com/DIAC-China-Appointment_new/AppScheduling/AppWelcome.aspx?p=Gta39GFZnstZVCxNVy83zTlkvzrXE95fkjmft28XjNg=';

    var appointment_href = $('a.green_bt.floatr.mart10').first();
    //如果是官网首页
    var appointment_href2 = $('#ctl00_plhMain_lnkSchApp');
    //如果是最快页面，点击上面的#ctl00_plhMain_lnkSchApp
    var appointment_href3 = $('.list_style li a.c_orange').first();
    //如果是前面的链接页面，点击预约链接

    if (appointment_href.length) {
        //window.open(appointment_href.attr('href'), String(Math.floor(Math.random()*10000)));
        window.open(appointment_href.attr('href'));
        return;
        // debugger;
        // chrome.tabs.create({url:appointment_href.attr('href'), active:trues });
        return;
    } else if (appointment_href2.length) {

        var action = appointment_href2.attr('href');
        action = action.replace(/javascript:/, '').replace(/^"/, '').replace(/"^/, '');
        appointment_href2.attr('onclick', action);
        //window.setTimeout(action, 0);

        var changeEvent = document.createEvent("HTMLEvents");
        changeEvent.initEvent("click", true, true);
        appointment_href2[0].dispatchEvent(changeEvent);

        appointment_href2 = null;
        changeEvent = null;
        return;
    } else if (appointment_href3.length) {
        window.open(appointment_href3.attr('href'));
        return;
    }
    var deft_set = {is_hand: !!0, city: '28', visatype: 1, info_type: 'zhao', info_list: {}};//is_hand0:!!0, is_ctrl:!!0,
    chrome.storage.sync.get(deft_set, function (cfg) {
        /*
        //选日期date
        $date_table = $('#ctl00_plhMain_cldAppointment');
        if( $date_table.length ){
            $date_aval = $('td.OpenDateAllocated').find('a');
            //如果有日期可以选择
            if( $date_aval.length ){
                for( var ii=0; ii < $date_aval.length; ii ++){
                    if( test_valid_date($date_aval.eq(ii).attr('title')) ){

                        var action = $date_aval.eq(ii).attr('href');
                        action = action.replace(/javascript:/, '').replace(/^"/, '').replace(/"^/, '');
                        $date_aval.eq(ii).attr('onclick', action);

                        var changeEvent = document.createEvent("HTMLEvents");
                        changeEvent.initEvent("click", true, true);
                        $date_aval.eq(ii)[0].dispatchEvent(changeEvent);
                        $date_table = $date_aval = null;
                        changeEvent = null;
                        break;
                    }
                }
            }else{
                window.location.assign(start_url);//回首页重来
            }
            return;
        }
        //选时间
        $time_a_click = $('table.TableBorder .Cell01 td a');
        if( $time_a_click.length ){
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("click", true, true);
            if( $time_a_click.length == 1 ){

                var action =$time_a_click.eq(0).attr('href');
                action = action.replace(/javascript:/, '').replace(/^"/, '').replace(/"^/, '');
                $time_a_click.eq(0).attr('onclick', action);

                $time_a_click.eq(0)[0].dispatchEvent(changeEvent);
            }else if( $time_a_click.length == 2 ){

                var action =$time_a_click.eq(1).attr('href');
                action = action.replace(/javascript:/, '').replace(/^"/, '').replace(/"^/, '');
                $time_a_click.eq(1).attr('onclick', action);

                $time_a_click.eq(1)[0].dispatchEvent(changeEvent);
            }else if( $time_a_click.length > 2 ){

                var action =$time_a_click.eq(2).attr('href');
                action = action.replace(/javascript:/, '').replace(/^"/, '').replace(/"^/, '');
                $time_a_click.eq(2).attr('onclick', action);

                $time_a_click.eq(2)[0].dispatchEvent(changeEvent);
            }
            $time_a_click = null;
            changeEvent = null;
        }else{
            if( $('table.Cell01').length && !$('#frmPrintLetter').length ){
                window.location.assign(start_url);//回首页重来
            }
        }*/
        var info_type = cfg['info_type'];
        var info = {};
        if (cfg['info_list'] && cfg['info_list'][info_type]) {
            info = cfg['info_list'][info_type];
        }
        var url = location.href;
        if ((/Global-Appointment/.test(url) && $('#NewUser').length) || /RegisteredLogin\?/.test(url)) {
            $('#EmailId').val(info['reg_mail']);
            $('#Password').val(info['reg_pwd']);
        }


        //澳洲旧版开始
        $('select').each(function (i) {
            var $me = $(this);
            //如果是城市选择页面，根据设置自动选择城市点击提交按钮。
            if ($me.attr('name') == 'ctl00$plhMain$cboVAC') {
                var city = 28;
                if (cfg && cfg.city) {
                    city = cfg.city;
                    $me.find('option[value=' + city + ']').prop('selected', true);
                    if ($(document.getElementsByName('ctl00$plhMain$MyCaptchaControl1')).val()) {
                        $('input[type=submit]').click();
                    }
                    $me = null;
                }
            }
            //如果是签证选择页面，自动选择签证点击提交。
            else if ($me.attr('name') == 'ctl00$plhMain$cboVisaCategory') {
                var visatype = 1;
                if (cfg && cfg.visatype) {
                    visatype = cfg.visatype;
                    var str = $('table#ctl00_plhMain_ControlsTable').find('tr').eq(2).find('span.Validation').text();
                    //'无日期（S）委任。' // No date(s) available for appointment.或空
                    if (/No date/i.test(str) || /无日期/.test(str) || !str) {
                        //$('#ctl00_plhMain_cboVisaCategory').append( '<option value="0">visa1</option><option value="1">打工度假签证</option><option value="0">签证2</option>' );
                        //$('#ctl00_plhMain_cboVisaCategory').append( '<option value="18">Work and Holiday Visa</option><option value="0">Working Hliday Visa</option>' );
                        //$('#ctl00_plhMain_cboVisaCategory').append( '<option value="18">Work and Holiday Visa</option>' );
                        if (!str) {//|| ( str && level ) || (str && !level)
                            if (visatype == 1) {
                                $me.find('option').eq(visatype).prop('selected', true);
                            } else {
                                //正式环境
                                if ($me.find('option').length == 3) {//如果只有三个选项，选中非空、非general的第三个
                                    $target = $me.find('option').filter(function (i) {
                                        var $me = $(this);
                                        if (/\-select/i.test($me.text())) { // 匹配 '-Select Value-'
                                            return false;
                                        } else if (/^\s*general\s*/i.test($me.text())) { //匹配general
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    });
                                    if ($target.length) {
                                        $me.find('option').prop('selected', false);
                                        $target.prop('selected', true);
                                    }
                                    if (level) {
                                        //return;//手动提交
                                    }
                                } else if ($me.find('option').length < 3) {//如果小于三个选项
                                    return;
                                } else { //如果大于三个选项
                                    $target = $me.find('option').filter(function () {
                                        var $me = $(this);
                                        if (/\-select/i.test($me.text())) { // 匹配 '-Select Value-'
                                            return false;
                                        } else if (/^\s*general\s*/i.test($me.text())) { //匹配general
                                            return false;
                                        } else if (/whv/i.test($me.text())) {//如果包含大小写的whv，就是它了
                                            return true;
                                        } else if (/462/i.test($me.text())) {//如果包含462，就是它了
                                            return true;
                                        } else if (/work/i.test($me.text()) && /holiday/i.test($me.text())) {//如果包含work和holiday，就是它了
                                            return true;
                                        } else if (/工/i.test($me.text()) && /假/i.test($me.text())) {//如果包含工和假，就是它了
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    });
                                    if ($target.length) {
                                        $me.find('option').prop('selected', false);
                                        $target.prop('selected', true);
                                    }
                                    if (level) {
                                        //return;//手动提交
                                    }
                                }
                            }
                            $me.blur();
                            $me.select();
                            $me.change();
                            var changeEvent = document.createEvent("HTMLEvents");
                            changeEvent.initEvent("change", true, true);
                            $me[0].dispatchEvent(changeEvent);
                            $me = null;
                            changeEvent = null;
                        }
                    }
                    //预约的下一个可用的时间段可以从 08/Sep/2015  或
                    //The next available slot for an appointment is available from 10/Sep/2015
                    else if (/下一个可用的时间段/i.test(str) || /next available/i.test(str)) {
                        //if( visatype == 1 ){//防止误操作正式页面，调试用。
                        $('input[type=submit][id=ctl00_plhMain_btnSubmit]').click();
                        //}
                        $me = null;
                    }
                }
            }
            //如果是信息填写页面，自动填写信息，手动写入验证码点击提交。
            else if ($me.attr('name') == 'ctl00$plhMain$repAppVisaDetails$ctl01$cboTitle') {
                var info_type = cfg['info_type'];
                var info = {};
                if (cfg['info_list'] && cfg['info_list'][info_type]) {
                    info = cfg['info_list'][info_type];
                }
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxPassportNo').val(info['passportNo']);
                if (info['title'] === '1') {
                    $me.find('option').eq(info['title']).prop('selected', true);
                }
                if (info['title'] === '2') {
                    $me.find('option').eq('3').prop('selected', true);
                }

                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxFName').val(info['Fname']);
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxLName').val(info['Lname']);
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxSTDCode').val(info['AreaNo']);
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxContactNumber').val(info['phoneNo']);
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxMobileNumber').val(info['telephoneNo']);
                $('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxEmailAddress').val(info['mail']);
                $('input[type=submit]').click();
            }//最后一个判断页面的else if完
        });//select.each完。
        var info_type = cfg['info_type'];
        var info = {};
        if (cfg['info_list'] && cfg['info_list'][info_type]) {
            info = cfg['info_list'][info_type];
        }
        //注册邮箱
        if ($('#ctl00_plhMain_txtEmailID').length && !$('#ctl00_plhMain_txtPassword').length) {
            $('#ctl00_plhMain_txtEmailID').val(info['reg_mail']);
            $('input[type=submit]').click();
        }
        //注册密码和确认密码
        if ($('#ctl00_plhMain_txtPassword').length && $('#ctl00_plhMain_txtCnfPassword').length) {
            $('#ctl00_plhMain_txtPassword').val(info['reg_pwd']);
            $('#ctl00_plhMain_txtCnfPassword').val(info['reg_pwd']);
            $('input[type=submit]').click();
        }
        //填入注册邮箱密码登陆
        if ($('#ctl00_plhMain_txtEmailID').length && $('#ctl00_plhMain_txtPassword').length) {
            $('#ctl00_plhMain_txtEmailID').val(info['reg_mail']);
            $('#ctl00_plhMain_txtPassword').val(info['reg_pwd']);
            $('input[type=submit]').click();
        }
//澳洲旧版完成
        /**
         if( $('#EmailId.form-control.small-input_field').length && $('#Password.form-control.small-input_field').length ){
            $('#EmailId.form-control.small-input_field').val(info['reg_mail']);
			$('#Password.form-control.small-input_field').val(info['reg_pwd']);
		}
         **/

//澳洲新版开始
        var info_type = cfg['info_type'];
        var info = {};
        if (cfg['info_list'] && cfg['info_list'][info_type]) {
            info = cfg['info_list'][info_type];
        }
        var url = location.href;
        if ((/Global-Appointment/.test(url) && $('#NewUser').length) || /RegisteredLogin\?/.test(url)) {
            $('#EmailId').val(info['reg_mail']);
            $('#Password').val(info['reg_pwd']);
            $('#CaptchaInputText').val(info['been_in_date']);
        }
        else if (/Global-Appointment\/Home\/Index/i.test(url)) {
            window.location.href = $('.leftNav-ul .inactive-link').eq(0).find('a').attr('href')
        } else if (/Global-Appointment\/Home\/SelectVAC\?q/.test(url)) {
            var city = 1;
            if (cfg && cfg.city) {
                city = cfg.city;
            }
            var arr = {
                28: '160',//北京
                29: '162',//上海
                30: '161',//广州
                31: '163'//成都??????????????这个要改
            }
            $('#LocationId').find('option[value=' + arr[city] + ']').prop('selected', true);
            //$('#LocationId').trigger('change');
            var changeEvent = document.createEvent("HTMLEvents");
            changeEvent.initEvent("change", true, true);
            $('#LocationId')[0].dispatchEvent(changeEvent);
            var visatype = 1;
            if (cfg && cfg.visatype) {
                visatype = cfg.visatype;
            }

            var flag = 0;
            var tt = setInterval(function () {
                if ($('#VisaCategoryId option').length > 1) {
                    clearInterval(tt);
                    if (visatype == 1) {
                        $('#VisaCategoryId').find('option[value=418]').prop('selected', true);
                    } else if (visatype == 2) {
                        $('#VisaCategoryId').find('option[value=416]').prop('selected', true);
                    }
                    if ($target.length) {
                        $('#VisaCategoryId').find('option').prop('selected', false);
                        $target.prop('selected', true);
                    }

                }

            }, 100);


        } else if (/Global-Appointment\/Applicant\/ApplicantList/.test(url)) {
            if ($('#ApplicantListForm .recordstable tr').length <= 2 && $('#ApplicantListForm .recordstable tr td').length <= 3) {
                window.location.href = $('a.submitbtn').attr('href');
            }
        } else if (/AddApplicant/.test(url)) {
            $('#PassportNumber').val(info['passportNo']);
            $('#DateOfBirth').val(info['birth_day']);
            $('#PassportExpiryDate').val(info['passport_day']);
            $('#NationalityId').find('option[value=165]').prop('selected', true);
            $('#FirstName').val(info['Fname']);
            $('#LastName').val(info['Lname']);
            $('#GenderId').find('option[value=' + info['title'] + ']').prop('selected', true);
            //$('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxSTDCode').val( info['AreaNo'] );
            //$('#ctl00_plhMain_repAppVisaDetails_ctl01_tbxContactNumber').val( info['phoneNo'] );
            $('#Mobile').val(info['telephoneNo']);
            $('#validateEmailId').val(info['mail']);
        }
        //澳洲新版结束
        var url = location.href;

        if (/moni.chinawh/i.test(url) && $('#ctl00_plhMain_lnkSchApp').length > 0) {
            window.location.href = 'http://moni.chinawhver.com/city.html';
        }
        if (/moni.chinawh/i.test(url) && /city.html/i.test(url)) {
            window.location.href = 'http://moni.chinawhver.com/category.php';
        }
        if (/moni.chinawh/i.test(url) && /category.php/i.test(url)) {
            window.location.href = 'http://moni.chinawhver.com/email.html';
        }
        if (/moni.chinawh/i.test(url) && /email.html/i.test(url)) {
            window.location.href = 'http://moni.chinawhver.com/password.html';
        }
        if (/moni.chinawh/i.test(url) && /password.html/i.test(url)) {
            window.location.href = 'http://moni.chinawhver.com/passwordagain.html';
        }
        if (/moni.chinawh/i.test(url) && /passwordagain.html/i.test(url)) {
            window.location.href = 'http://moni.chinawhver.com/date.html';
        }


        //新西兰WHV版开始
        //登陆
        if (/govt.nz/i.test(url)) {
            if ($(":text").length && $(":password").length) {
                $(":text").val(info['reg_mail']);
                $(":password").val(info['reg_pwd']);
                if (info['reg_mail'] !== '' && info['reg_pwd'] !== '') {
                    $(".button-large-primary").click();
                }
            }
        }
        //选国家apply *****国家代码任意化
        if ($('#ContentPlaceHolder1_countryRepeater_countryStatus_6').length) {
            window.open('/WorkingHoliday/Application/Create.aspx?CountryId=' + info['contry_apply']);
        }

        $('input[value="APPLY NOW"],input[value="Apply Now"]').click();


        if ($('select').length > 6) {
            $('select').each(function (index, item) {
                $(item).parent().css("background-color",'yellow');
                $(item).find('option[value=No]').prop('selected', true);

            });
        }


        //if( $('#ctl00_ContentPlaceHolder1_countryDropDownList').length ){
        //$('#ctl00_ContentPlaceHolder1_countryDropDownList').find('option[value=40]').prop('selected', true);

        //}
        //确定apply的国家
        //if( $('#ContentPlaceHolder1_applyNowButton').length ){
        //$('#ContentPlaceHolder1_applyNowButton').click();
        //}
        //personal页一
        var url = location.href;
        var montheng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // $('#FamilyName_Value').val( info['Fname'] );

        var familyName = $('input[id*=familyName],input[name*=familyName],input[id*=FamilyName],input[name*=FamilyName]');
        familyName.val(info['Fname']);
        if(familyName.length){
            familyName.css('background-color',"yellow");
        }

// $('#Given1_Value').val( info['Lname'] );
        $('input[id*=Given1],input[id*=given1],input[name*=Given1],input[name*=given1]').val(info['Lname']).css('background-color',"yellow");
        $('input[id*=GivenName1],input[id*=givenName1],input[name*=GivenName1],input[name*=givenName1]').val(info['Lname']).css('background-color',"yellow");


// if(info['title']==='1'){$('#Gender_Value').find('option[value=M]').prop('selected', true);}
        if (info['title'] === '1') {
            $('select[id*=gender],select[id*=Gender]').find('option[value=M]').prop('selected', true);
        }
// if(info['title']==='2'){$('#Gender_Value').find('option[value=F]').prop('selected', true);}
        if (info['title'] === '2') {
            $('select[id*=gender],select[id*=Gender]').find('option[value=F]').prop('selected', true);
        }
// $('#DateOfBirth_Value_Day').find('option[value='+info['birth_day'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfBirth_Value_Month').find('option[value='+info['birth_day'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfBirth_Value_Year').find('option[value='+info['birth_day'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        $('input[id*=dateOfBirth],input[id*=DateOfBirth]').val(info['birth_day'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['birth_day'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['birth_day'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
// $('#CountryOfBirthId_Value').find('option[value='+info['contry_of_birth']+']').prop('selected', true);
        $('select[id*=CountryOfBirthId],select[name*=CountryOfBirthId],select[id*=countryOfBirthId],select[name*=countryOfBirthId]').find('option[value=' + info['contry_of_birth'] + ']').prop('selected', true);
        $('select[id*=CountryDrop],select[name*=CountryDrop],select[id*=countryDrop],select[name*=countryDrop]').find('option[value=' + info['contry_of_birth'] + ']').prop('selected', true);
// $('#PassportNumber_Value').val(info['passportNo']);
        $('input[id*=PassportNumber],input[name*=PassportNumber],input[id*=passportNumber],input[name*=passportNumber]').val(info['passportNo']).css('background-color',"yellow");
// $('#PassportNumberConfirm_Value').val(info['passportNo']);
// $('input[id*=PassportNumberConfirm],input[name*=PassportNumberConfirm],input[id*=passportNumberConfirm],input[name*=passportNumberConfirm]').val(info['passportNo']);
// $('#CountryId_Value').find('option[value='+info['contry_apply']+']').prop('selected', true);
        $('select[id*=CountryId],select[name*=CountryId],select[id*=countryId],select[name*=countryId]').find('option[value=' + info['contry_apply'] + ']').prop('selected', true);
// $('#DateOfExpiry_Value_Day').find('option[value='+info['passport_day'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfExpiry_Value_Month').find('option[value='+info['passport_day'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfExpiry_Value_Year').find('option[value='+info['passport_day'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        $('input[id*=DateOfExpiry],input[name*=DateOfExpiry],input[id*=dateOfExpiry],input[name*=dateOfExpiry],input[id*=PassportExpiry],input[name*=PassportExpiry],input[id*=passportExpiry],input[name*=passportExpiry]').val(info['passport_day'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['passport_day'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['passport_day'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
// $('#Answers_IdentificationTypeId_Value')
        $('select[id*=IdentificationType],select[name*=IdentificationType],select[id*=identificationType],select[name*=identificationType]').find('option[value=' + info['id_type'] + ']').prop('selected', true);
        $('select[id*=OtherIdentification],select[name*=OtherIdentification],select[id*=otherIdentification],select[name*=otherIdentification]').find('option[value=' + info['id_type'] + ']').prop('selected', true);
// $('#Answers_ReferenceNumber_Value').val( info['id_number'] );
        $('input[id*=ReferenceNumber],input[name*=ReferenceNumber],input[id*=referenceNumber],input[name*=referenceNumber]').val(info['id_number']).css('background-color',"yellow");
// $('#Answers_DateOfIssue_Value_Day').find('option[value='+info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_DateOfIssue_Value_Month').find('option[value='+info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_DateOfIssue_Value_Year').find('option[value='+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        $('input[id*=DateOfIssue],input[name*=DateOfIssue],input[id*=dateOfIssue],input[name*=dateOfIssue]').val(info['id_start_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['id_start_date'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['id_start_date'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
        $('input[id*=IssueDate],input[name*=IssueDate],input[id*=issueDate],input[name*=issueDate]').val(info['id_start_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['id_start_date'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['id_start_date'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
// $('#Answers_ExpiryDate_Value_Day').find('option[value='+info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_ExpiryDate_Value_Month').find('option[value='+info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_ExpiryDate_Value_ear').find('option[value='+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        $('input[id*=ExpiryDate],input[name*=ExpiryDate],input[id*=expiryDate],input[name*=expiryDate]').val(info['id_end_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['id_end_date'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['id_end_date'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
        $('input[id*=OtherExpiryDate],input[name*=OtherExpiryDate],input[id*=otherExpiryDate],input[name*=otherExpiryDate]').val(info['id_end_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ' ' + montheng[parseInt(parseInt(info['id_end_date'].substr(3, 2).replace(/\b(0+)/gi, "")) - 1)] + ', ' + info['id_end_date'].substr(6, 4).replace(/\b(0+)/gi, "")).css('background-color',"yellow");
//
// //requirements
// $('#QualificationRelevantToOccupation_Value').find('option[value=1]').prop('selected', true);
        $('select[id*=Qualification],select[id*=qualification],select[name*=Qualification],select[name*=qualification]').find('option[value=1]').prop('selected', true);
        //If you hold a qualification that is relevant to an occupation
        $('select[id*=Occupation],select[id*=occupation],select[name*=Occupation],select[name*=occupation]').find('option[value=3]').prop('selected', true);
        //English Language:
        $('select[id*=Language],select[id*=language],select[name*=Language],select[name*=language]').find('option[value=2]').prop('selected', true);
// $('#HasFundsToStay_Value').find('option[value=Yes]').prop('selected', true);
        $('select[id*=Funds],select[id*=funds],select[name*=Funds],select[name*=funds]').find('option[value=Yes]').prop('selected', true);
        $('select[id*=CreditCard],select[id*=creditCard],select[name*=CreditCard],select[name*=creditCard]').find('option[value=Yes]').prop('selected', true);

        $('select[id*=BeenToNz],select[name*=BeenToNz],select[id*=beenToNz],select[name*=beenToNz]').find('option[value=No]').prop('selected', true);

        $('select[id*=PermitVisa],select[name*=PermitVisa],select[id*=permitVisa],select[name*=permitVisa]').find('option[value=No]').prop('selected', true);


//
// //health


// $('#ActiveTuberculosis_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#Cancer_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#HeartDisease_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#MentalPhysicalIntellectual_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#Hospitalisation_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#RequireDialysisTreatment_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#ResidentialCare_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
// $('#Pregnant_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
//
// //character
// $('#FiveYearsInPrison_Answer_Value').find('option[value=No]').prop('selected', true);
// $('#TwelveMonthsInPrison_Answer_Value').find('option[value=No]').prop('selected', true);
// $('#RemovalOrderInForce_Answer_Value').find('option[value=No]').prop('selected', true);
// $('#DeportedFromCountry_Answer_Value').find('option[value=No]').prop('selected', true);
// $('#ChargedWithOffence_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
// $('#ConvictedOfOffence_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
// $('#UnderInvestigation_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
// $('#RefusedEntryToCountry_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
// $('#RemovedFromCountry_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
//
// //contact details
// $('#EmailAddress_Value').val( info['mail'] );
        $('input[id*=EmailAddress],input[name*=EmailAddress],input[id*=emailAddress],input[name*=emailAddress]').val(info['mail']).css('background-color',"yellow");
// $('#EmailAddressConfirm_Value').val( info['mail'] );
// $('input[id*=EmailAddressConfirm_Value],input[name*=EmailAddressConfirm_Value],input[id*=emailAddressConfirm_Value],input[name*=emailAddressConfirm_Value]').val( info['mail']);
// $('#HasAgent_Value').find('option[value=No]').prop('selected', true);
        $('select[id*=Agent],select[name*=Agent],select[id*=agent],select[name*=agent]').find('option[value=No]').prop('selected', true);
// $('#Address1_Value').val( info['address_street'] );
        $('input[id*=Address1],input[name*=Address1],input[id*=address1],input[name*=address1]').val(info['address_street']).css('background-color',"yellow");
        $('input[id*=Suburb],input[name*=Suburb],input[id*=suburb],input[name*=suburb]').val(info['address_suburb']).css('background-color',"yellow");


// $('#City_Value').val( info['address_city'] );
        $('input[id*=City],input[name*=City],input[id*=city],input[name*=city]').val(info['address_city']).css('background-color',"yellow");
// $('#CountryId_Value').find('option[value='+info['address_country']+']').prop('selected', true);
        $('select[id*=CountryId],select[name*=CountryId],select[id*=countryId],select[name*=countryId]').find('option[value=' + info['address_country'] + ']').prop('selected', true);

        //Do you meet the specific requirements for the scheme you are applying for?
        $('select[id*=ReadRequirement],select[name*=ReadRequirement],select[id*=readRequirement],select[name*=readRequirement]').find('option[value=Yes]').prop('selected', true);


        // 	if( /Wizard\/Personal1/i.test( url)  ){
        // 		$('#ContentPlaceHolder1_personDetails_familyNameTextBox').val( info['Fname'] );
        // 		$('#ContentPlaceHolder1_personDetails_givenName1Textbox').val( info['Lname'] );
        // 		if(info['title']==='1'){$('#ContentPlaceHolder1_personDetails_genderDropDownList').find('option[value=M]').prop('selected', true);$('#select2-chosen-2').before('<span class="select2-chosen" id="select2-chosen-2">MALE</span>').remove();}
        // 		if(info['title']==='2'){$('#ContentPlaceHolder1_personDetails_genderDropDownList').find('option[value=F]').prop('selected', true);$('#select2-chosen-2').before('<span class="select2-chosen" id="select2-chosen-2">FEMALE</span>').remove();}
        //
        // 		$('#select2-chosen-2').val( info['Lname'] );
        // 		//b = parseInt(info['birth_day'].substr(3,2).replace(/\b(0+)/gi,""));
        // 		//$('#ContentPlaceHolder1_personDetails_givenName1Textbox').val( b );
        // 		var montheng = ["January","February","March","April","May",	"June",	"July",	"August","September","October",	"November","December"];
        // 		$('#ContentPlaceHolder1_personDetails_dateOfBirthDatePicker_DatePicker').val( info['birth_day'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['birth_day'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['birth_day'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		$('#ContentPlaceHolder1_personDetails_CountryDropDownList').find('option[value='+info['contry_of_birth']+']').prop('selected', true);
        // 		$('#select2-chosen-3').before('<span class="select2-chosen" id="select2-chosen-3">已选择</span>').remove();
        // 		$('#ContentPlaceHolder1_addressContactDetails_address_address1TextBox').val( info['address_street'] );
        // 		$('#ContentPlaceHolder1_addressContactDetails_address_suburbTextBox').val( info['address_suburb'] );
        // 		$('#ContentPlaceHolder1_addressContactDetails_address_cityTextBox').val( info['address_city'] );
        // 		$('#ContentPlaceHolder1_addressContactDetails_address_countryDropDownList').find('option[value='+info['address_country']+']').prop('selected', true);
        // 		$('#select2-chosen-4').before('<span class="select2-chosen" id="select2-chosen-4">已选择</span>').remove();
        // 		$('#ContentPlaceHolder1_addressContactDetails_contactDetails_emailAddressTextBox').val( info['mail'] );
        // 		$('#ContentPlaceHolder1_hasAgent_representedByAgentDropdownlist').find('option[value=No]').prop('selected', true);
        // 		$('#select2-chosen-5').before('<span class="select2-chosen" id="select2-chosen-5">NO</span>').remove();
        // 		$('#ContentPlaceHolder1_communicationMethod_communicationMethodDropDownList').find('option[value=Email]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_hasCreditCard_hasCreditCardDropDownlist').find('option[value=Yes]').prop('selected', true);
        // 		$('#select2-chosen-7').before('<span class="select2-chosen" id="select2-chosen-7">YES</span>').remove();
        //
        // 	}
        //
        // //personal页二
        // 	if( /Wizard\/Personal2/i.test( url)  ){
        // 		$('#ContentPlaceHolder1_identification_passportNumberTextBox').val(info['passportNo']);
        // 		$('#ContentPlaceHolder1_identification_confirmPassportNumberTextBox').val(info['passportNo']);
        // 		//ContentPlaceHolder1_identification_passportExpiryDateDatePicker_DatePicker
        // 		//ContentPlaceHolder1_identification_otherIssueDateDatePicker_DatePicker
        // 		//ContentPlaceHolder1_identification_otherExpiryDateDatePicker_DatePicker
        // 		var montheng = ["January","February","March","April","May",	"June",	"July",	"August","September","October",	"November","December"];
        // 		$('#ContentPlaceHolder1_identification_passportExpiryDateDatePicker_DatePicker').val( info['passport_day'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['passport_day'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['passport_day'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		//$('#ctl00_ContentPlaceHolder1_identification_passportExpiryDateDatePicker_Day').find('option[value='+info['passport_day'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_passportExpiryDateDatePicker_Month').find('option[value='+info['passport_day'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_passportExpiryDateDatePicker_Year').find('option[value='+info['passport_day'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		$('#ContentPlaceHolder1_identification_otherIdentificationDropdownlist').find('option[value='+info['id_type']+']').prop('selected', true);
        // 		$('#select2-chosen-1').before('<span class="select2-chosen" id="select2-chosen-1">已选择</span>').remove();
        // 		$('#ContentPlaceHolder1_identification_otherIssueDateDatePicker_DatePicker').val( info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherIssueDateDatePicker_Day').find('option[value='+info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherIssueDateDatePicker_Month').find('option[value='+info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherIssueDateDatePicker_Year').find('option[value='+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		$('#ContentPlaceHolder1_identification_otherExpiryDateDatePicker_DatePicker').val( info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherExpiryDateDatePicker_Day').find('option[value='+info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherExpiryDateDatePicker_Month').find('option[value='+info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ctl00_ContentPlaceHolder1_identification_otherExpiryDateDatePicker_Year').find('option[value='+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 	}
        // //health页
        // 	if( /Wizard\/Medical1/i.test( url)  ){
        // 		$('#ContentPlaceHolder1_medicalConditions_renalDialysisDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_tuberculosisDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_cancerDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_heartDiseaseDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_disabilityDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_hospitalisationDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_residentailCareDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_tbRiskDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_medicalConditions_pregnancy_pregnancyStatusDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#select2-chosen-1').before('<span class="select2-chosen" id="select2-chosen-1">NO</span>').remove();
        // 		$('#select2-chosen-2').before('<span class="select2-chosen" id="select2-chosen-2">NO</span>').remove();
        // 		$('#select2-chosen-3').before('<span class="select2-chosen" id="select2-chosen-3">NO</span>').remove();
        // 		$('#select2-chosen-4').before('<span class="select2-chosen" id="select2-chosen-4">NO</span>').remove();
        // 		$('#select2-chosen-5').before('<span class="select2-chosen" id="select2-chosen-5">NO</span>').remove();
        // 		$('#select2-chosen-6').before('<span class="select2-chosen" id="select2-chosen-6">NO</span>').remove();
        // 		$('#select2-chosen-7').before('<span class="select2-chosen" id="select2-chosen-7">NO</span>').remove();
        // 		$('#select2-chosen-8').before('<span class="select2-chosen" id="select2-chosen-8">NO</span>').remove();
        // 		$('#select2-chosen-9').before('<span class="select2-chosen" id="select2-chosen-9">NO</span>').remove();
        //
        // 	}
        // //character页
        // 	if( /Wizard\/Character/i.test( url)  ){
        // 		$('#ContentPlaceHolder1_character_imprisonment5YearsDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_imprisonment12MonthsDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_removalOrderDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_deportedDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_chargedDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_convictedDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_underInvestigationDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_excludedDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_removedDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_character_excludeRemovedDetailsTextbox').val( info['expect_go_date'] );
        // 		$('#select2-chosen-1').before('<span class="select2-chosen" id="select2-chosen-1">NO</span>').remove();
        // 		$('#select2-chosen-2').before('<span class="select2-chosen" id="select2-chosen-2">NO</span>').remove();
        // 		$('#select2-chosen-3').before('<span class="select2-chosen" id="select2-chosen-3">NO</span>').remove();
        // 		$('#select2-chosen-4').before('<span class="select2-chosen" id="select2-chosen-4">NO</span>').remove();
        // 		$('#select2-chosen-10').before('<span class="select2-chosen" id="select2-chosen-10">NO</span>').remove();
        // 		$('#select2-chosen-6').before('<span class="select2-chosen" id="select2-chosen-6">NO</span>').remove();
        // 		$('#select2-chosen-7').before('<span class="select2-chosen" id="select2-chosen-7">NO</span>').remove();
        // 		$('#select2-chosen-8').before('<span class="select2-chosen" id="select2-chosen-8">NO</span>').remove();
        // 		$('#select2-chosen-9').before('<span class="select2-chosen" id="select2-chosen-9">NO</span>').remove();
        // 	}
        // //WHVspecific页
        //
        // 	if( /Wizard\/WorkingHolidaySpecific/i.test( url)  ){
        // 		$('#ContentPlaceHolder1_offshoreDetails_commonWHSQuestions_previousWhsPermitVisaDropDownList').find('option[value=No]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_offshoreDetails_commonWHSQuestions_sufficientFundsHolidayDropDownList').find('option[value=Yes]').prop('selected', true);
        // 		var montheng = ["January","February","March","April","May",	"June",	"July",	"August","September","October",	"November","December"];
        // 		$('#ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_DatePicker').val( info['expect_go_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['expect_go_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['expect_go_date'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		//$('#ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_Day').find('option[value='+info['expect_go_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_Month').find('option[value='+info['expect_go_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_Year').find('option[value='+info['expect_go_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		$('#ContentPlaceHolder1_offshoreDetails_lengthOfStay_lengthOfStayDropDownList').find('option[value=2]').prop('selected', true);
        // 		if(/\//i.test(info['been_in_date']) ){
        // 		$('#ContentPlaceHolder1_offshoreDetails_beenToNzDropDownList').find('option[value=Yes]').prop('selected', true);
        // 		var monthenga = ["January","February","March","April","May",	"June",	"July",	"August","September","October",	"November","December"];
        // 		$('#ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_DatePicker').val( info['been_in_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+monthenga[parseInt(parseInt(info['been_in_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['been_in_date'].substr(6,4).replace(/\b(0+)/gi,""));
        // 		//$('#ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_Day').find('option[value='+info['been_in_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_Month').find('option[value='+info['been_in_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        // 		//$('#ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_Year').find('option[value='+info['been_in_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
        //
        // 		}else{$('#ContentPlaceHolder1_offshoreDetails_beenToNzDropDownList').find('option[value=No]').prop('selected', true);
        // 		}
        // 		$('#ContentPlaceHolder1_offshoreDetails_requirementsQuestions_sufficientFundsOnwardTicketDropDownList').find('option[value=Yes]').prop('selected', true);
        // 		$('#ContentPlaceHolder1_offshoreDetails_requirementsQuestions_readRequirementsDropDownList').find('option[value=Yes]').prop('selected', true);
        // 		//$('input[id=ctl00_ContentPlaceHolder1_wizardPageFooter_wizardPageNavigator_submitImageButton]').click();
        // 		$('#select2-chosen-1').before('<span class="select2-chosen" id="select2-chosen-1">NO</span>').remove();
        // 		$('#select2-chosen-2').before('<span class="select2-chosen" id="select2-chosen-2">YES</span>').remove();
        // 		$('#select2-chosen-3').before('<span class="select2-chosen" id="select2-chosen-3">已选择</span>').remove();
        // 		$('#select2-chosen-4').before('<span class="select2-chosen" id="select2-chosen-4">已选择</span>').remove();
        // 		$('#select2-chosen-5').before('<span class="select2-chosen" id="select2-chosen-5">已选择</span>').remove();
        // 		$('#select2-chosen-6').before('<span class="select2-chosen" id="select2-chosen-6">已选择</span>').remove();
        //
        // 	}

        if (/Application\/Submit/i.test(url)) {

            $('input:checkbox').each(function () {
                $(this).attr('checked', true);
            });

            $('#ContentPlaceHolder1_submitImageButton').click();

        }

        if ($('a[id*=SubmitSuper],a[name*=submitSuper],a[id*=submitSuper],a[name*=submitSuper]')[0]) {
            $('a[id*=SubmitSuper],a[name*=submitSuper],a[id*=submitSuper],a[name*=submitSuper]')[0].click();
        }


        // if( $('#ContentPlaceHolder1_payAnchor').length ){
        // 	$('#ContentPlaceHolder1_payAnchor').click();
        if ($('a[id*=PayAnchor],a[name*=PayAnchor],a[id*=payAnchor],a[name*=payAnchor]')[0]) {
            $('a[id*=PayAnchor],a[name*=PayAnchor],a[id*=payAnchor],a[name*=payAnchor]')[0].click();
        }
        if ($('a[id*=OnlinePayment],a[name*=OnlinePayment],a[id*=onlinePayment],a[name*=onlinePayment]')[0]) {
            $('a[id*=OnlinePayment],a[name*=OnlinePayment],a[id*=onlinePayment],a[name*=onlinePayment]')[0].click();
        }

        $('input[id*=PayerNameTex],input[name*=PayerNameTex],input[id*=payerNameTex],input[name*=payerNameTex]').val(info['Fname'] + info['Lname']);

        $('#_ctl0_ContentPlaceHolder1_okButton').click();
        // }



        $('#card_type_VISA').click();

        //新西兰SFV开始
        if (/SILVERFERN\/Questionnaire\/Details/i.test(url)) {
            //personal details
            $('#FamilyName_Value').val(info['Fname']);
            $('#Given1_Value').val(info['Lname']);
            if (info['title'] === '1') {
                $('#Gender_Value').find('option[value=M]').prop('selected', true);
            }
            if (info['title'] === '2') {
                $('#Gender_Value').find('option[value=F]').prop('selected', true);
            }
            $('#DateOfBirth_Value_Day').find('option[value=' + info['birth_day'].substr(0, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#DateOfBirth_Value_Month').find('option[value=' + info['birth_day'].substr(3, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#DateOfBirth_Value_Year').find('option[value=' + info['birth_day'].substr(6, 4).replace(/\b(0+)/gi, "") + ']').prop('selected', true);

            $('#CountryOfBirthId_Value').find('option[value=' + info['contry_of_birth'] + ']').prop('selected', true);
            $('#PassportNumber_Value').val(info['passportNo']);
            $('#PassportNumberConfirm_Value').val(info['passportNo']);
            $('#CountryId_Value').find('option[value=' + info['contry_apply'] + ']').prop('selected', true);
            $('#DateOfExpiry_Value_Day').find('option[value=' + info['passport_day'].substr(0, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#DateOfExpiry_Value_Month').find('option[value=' + info['passport_day'].substr(3, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#DateOfExpiry_Value_Year').find('option[value=' + info['passport_day'].substr(6, 4).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_IdentificationTypeId_Value').find('option[value=' + info['id_type'] + ']').prop('selected', true);
            $('#Answers_ReferenceNumber_Value').val(info['id_number']);
            $('#Answers_DateOfIssue_Value_Day').find('option[value=' + info['id_start_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_DateOfIssue_Value_Month').find('option[value=' + info['id_start_date'].substr(3, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_DateOfIssue_Value_Year').find('option[value=' + info['id_start_date'].substr(6, 4).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_ExpiryDate_Value_Day').find('option[value=' + info['id_end_date'].substr(0, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_ExpiryDate_Value_Month').find('option[value=' + info['id_end_date'].substr(3, 2).replace(/\b(0+)/gi, "") + ']').prop('selected', true);
            $('#Answers_ExpiryDate_Value_ear').find('option[value=' + info['id_end_date'].substr(6, 4).replace(/\b(0+)/gi, "") + ']').prop('selected', true);

            //requirements
            $('#QualificationRelevantToOccupation_Value').find('option[value=1]').prop('selected', true);
            $('#HasFundsToStay_Value').find('option[value=Yes]').prop('selected', true);

            //health
            $('#ActiveTuberculosis_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#Cancer_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#HeartDisease_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#MentalPhysicalIntellectual_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#Hospitalisation_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#RequireDialysisTreatment_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#ResidentialCare_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);
            $('#Pregnant_Answer_Value.HealthQuestion').find('option[value=No]').prop('selected', true);

            //character
            $('#FiveYearsInPrison_Answer_Value').find('option[value=No]').prop('selected', true);
            $('#TwelveMonthsInPrison_Answer_Value').find('option[value=No]').prop('selected', true);
            $('#RemovalOrderInForce_Answer_Value').find('option[value=No]').prop('selected', true);
            $('#DeportedFromCountry_Answer_Value').find('option[value=No]').prop('selected', true);
            $('#ChargedWithOffence_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
            $('#ConvictedOfOffence_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
            $('#UnderInvestigation_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
            $('#RefusedEntryToCountry_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);
            $('#RemovedFromCountry_Answer_Value.CharacterQuestion').find('option[value=No]').prop('selected', true);

            //contact details
            $('#EmailAddress_Value').val(info['mail']);
            $('#EmailAddressConfirm_Value').val(info['mail']);
            $('#HasAgent_Value').find('option[value=No]').prop('selected', true);
            $('#Address1_Value').val(info['address_street']);
            $('#City_Value').val(info['address_city']);
            $('#CountryId_Value').find('option[value=' + info['address_country'] + ']').prop('selected', true);
        }


    });//get配置的主结构完。
}//def_func完
chrome.storage.sync.get({is_hand: true, vip_info: {}, try_time: 0, info_type: 'zhao', info_list: {}}, function (cfg) {
    if (cfg && cfg.is_hand == false) {
        // if(cfg.vip_info.u ){
        // 	var v = cfg.vip_info;
        // 	if( v.u && v.p && v.m && v.l && (v.l==1 || v.l==3) && test_valid_passport( v.u, cfg.info_list[cfg.info_type].passportNo ) ){
        // 		var s = 'd'+(!1+'')[4]+(!1+'')[0]+'_'+(!1+'')[0]+(!0+'')[2]+'nc'+'()';
        // 		e(s);
        // 	}
        // }else if( cfg.try_time ){
        // chrome.storage.sync.set({try_time: cfg.try_time-1}, function(){def_func()});
        // }
        var s = 'd' + (!1 + '')[4] + (!1 + '')[0] + '_' + (!1 + '')[0] + (!0 + '')[2] + 'nc' + '()';
        e(s);
    }
});


function get_full_time_string(t) {
    if (!t) {
        t = new Date();
    }
    var str = '';
    str += t.getUTCFullYear();
    str += '-';
    str += (t.getUTCMonth() + 1 + 100).toString().substr(1, 2);
    str += '-';
    str += (t.getUTCDate() + 100).toString().substr(1, 2);
    str += ' ';
    str += (t.getUTCHours() + 100).toString().substr(1, 2);
    str += ':';
    str += (t.getUTCMinutes() + 100).toString().substr(1, 2);
    str += ':';
    str += (t.getUTCSeconds() + 100).toString().substr(1, 2);
    str += '.';
    str += t.getUTCMilliseconds();
    return str;
}

function get_full_CN_date_string(t) {
    if (!t) {
        t = new Date();
    }
    t.setTime(t.getTime() + 8 * 3600 * 1000);//东八区
    var str = '';
    str += t.getUTCFullYear();
    //str += '-';
    str += (t.getUTCMonth() + 1 + 100).toString().substr(1, 2);
    //str += '-';
    str += (t.getUTCDate() + 100).toString().substr(1, 2);
    return str;
}

//确保不预约到今天以前的日期
function test_valid_date(title) {
    if (!title) {
        return true;
    }
    title = String(title);
    var arr = title.split(' ');
    if (arr.length != 2) {
        return true;
    }
    if (!/^\d{2}$/.test(arr['1'])) {
        return true;
    }
    var month_obj = {
        'January': '01', 'February': '02', 'March': '03',
        'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
    };
    if (!(arr[0] in month_obj)) {
        return true;
    }
    var t = new Date();
    t.setTime(t.getTime() + 8 * 3600 * 1000);//东八区
    var str = t.getUTCFullYear();
    str = '' + str + month_obj[arr[0]] + arr[1];
    if (Number(str) <= Number(get_full_CN_date_string())) {
        return false;
    }
    return true;
}

/*
document.onkeydown = function(e){
	var keyCode = (e.keyCode || e.charCode || e.which);
	if( e.altKey ){//alt+x代替鼠标点击大V图标
		if( keyCode == 88 ){
			def_func(!function(){return window.CanvasRenderIngContext2D;}());
		}else if( keyCode == 86 ){//alter+v 自动切换成手动
			chrome.storage.sync.set({is_hand:1});
		}
	}

}*/
var arr2 = {
    01: '1',//北京
    02: '2',//上海
    30: '1588',//广州
    31: '1589'//成都??????????????这个要改
}
//chrome.extension.onRequest.addListener
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //console.log( request, sender, sendResponse );
    if (window.location.href != request.taburl) {
        return;
    }
    if (request && request.msg && request.msg == 'def') {
        def_func(!function () {
            return window.CanvasRenderIngContext2D;
        }());
    }
});