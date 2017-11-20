$('select').each(function(){


    $(this).find('option[value=No]').prop('selected','true');


    $(this).find('option').each(function(item){
        var optionName = $(item).text();

        if(optionName.indexOf("Bachelor degree")>-1){
            $(item).prop('selected','true');
        }

        if(optionName.indexOf("Not Applicable")>-1){
            $(item).prop('selected','true');
        }

        // if(optionName.indexOf("Bachelor degree")>-1){
        //     $(item).prop('selected','true');
        // }

    });



})



$('')





$("td,span,div").filter(function(index){
    var flag = false;
    var dom = $(this);

    // if(dom.text().replace(/ /g,'')=='Passport Number'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('Passport Number');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Please re-enter Passport Number'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('Please re-enter Passport Number');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Passport Expiry Date'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('22 October, 1987');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Identification Type'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=3]').prop('selected', true);
    // }
    //
    //
    // if(dom.text().replace(/ /g,'')=='Expiry Date of Document(Where applicable)'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('22 October, 1987');
    // }
    //
    //
    // //Family name (as in passport)
    //
    // if(dom.text().replace(/ /g,'')=='Family name (as in passport)'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('Family name (as in passport)');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Gender'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=F]').prop('selected', true);
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Date of birth'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('22 October, 1987');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Country of birth'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=46]').prop('selected', true);
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Street Name'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('Street Name');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Suburb'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('Suburb');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='City'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('City');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Country'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=46]').prop('selected', true);
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Email address(this address will be used to contact you about this application).'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('input').val('28474608@qq.com');
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Are you represented by an immigration adviser?'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=No]').prop('selected', true);
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Do you have a Visa or MasterCard card available for payment?'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=Yes]').prop('selected', true);
    // }
    //
    // if(dom.text().replace(/ /g,'')=='Do you have sufficient funds available for your stay in New Zealand?'.replace(/ /g,'')){
    //     flag = true;
    //     dom.next().find('select').find('option[value=Yes]').prop('selected', true);
    // }

    return flag;
}).effect("highlight",{},200000);

