// $('#FamilyName_Value').val( info['Fname'] );
$('input[id*=familyName],input[name*=familyName],input[id*=FamilyName],input[name*=FamilyName]').val(info['Fname'] );
// $('#Given1_Value').val( info['Lname'] );
$('input[id*=Given1],input[id*=given1]').val( info['Lname'] );
// if(info['title']==='1'){$('#Gender_Value').find('option[value=M]').prop('selected', true);}
if(info['title']==='1'){$('select[id*=gender],select[id*=Gender]').find('option[value=M]').prop('selected', true);}
// if(info['title']==='2'){$('#Gender_Value').find('option[value=F]').prop('selected', true);}
if(info['title']==='2'){$('select[id*=gender],select[id*=Gender]').find('option[value=F]').prop('selected', true);}
// $('#DateOfBirth_Value_Day').find('option[value='+info['birth_day'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfBirth_Value_Month').find('option[value='+info['birth_day'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfBirth_Value_Year').find('option[value='+info['birth_day'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
$('input[id*=dateOfBirth],input[id*=DateOfBirth]').val( info['birth_day'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['birth_day'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['birth_day'].substr(6,4).replace(/\b(0+)/gi,""));
// $('#CountryOfBirthId_Value').find('option[value='+info['contry_of_birth']+']').prop('selected', true);
$('select[id*=CountryOfBirthId],select[id*=countryOfBirthId]').find('option[value='+info['contry_of_birth']+']').prop('selected', true);
// $('#PassportNumber_Value').val(info['passportNo']);
$('input[id*=PassportNumber],input[name*=PassportNumber],input[id*=passportNumber],input[name*=passportNumber]').val(info['passportNo']);
// $('#PassportNumberConfirm_Value').val(info['passportNo']);
// $('input[id*=PassportNumberConfirm],input[name*=PassportNumberConfirm],input[id*=passportNumberConfirm],input[name*=passportNumberConfirm]').val(info['passportNo']);
// $('#CountryId_Value').find('option[value='+info['contry_apply']+']').prop('selected', true);
$('select[id*=CountryId],select[name*=CountryId],select[id*=countryId],select[name*=countryId]').find('option[value='+info['contry_apply']+']').prop('selected', true);
// $('#DateOfExpiry_Value_Day').find('option[value='+info['passport_day'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfExpiry_Value_Month').find('option[value='+info['passport_day'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#DateOfExpiry_Value_Year').find('option[value='+info['passport_day'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
$('input[id*=DateOfExpiry],input[name*=DateOfExpiry],input[id*=dateOfExpiry],input[name*=dateOfExpiry],input[id*=PassportExpiry],input[name*=PassportExpiry],input[id*=passportExpiry],input[name*=passportExpiry]').val( info['passport_day'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['passport_day'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['passport_day'].substr(6,4).replace(/\b(0+)/gi,""));
// $('#Answers_IdentificationTypeId_Value')
$('select[id*=IdentificationType],select[name*=IdentificationType],select[id*=identificationType],select[name*=identificationType]').find('option[value='+info['id_type']+']').prop('selected', true);
$('select[id*=OtherIdentification],select[name*=OtherIdentification],select[id*=otherIdentification],select[name*=otherIdentification]').find('option[value='+info['id_type']+']').prop('selected', true);
// $('#Answers_ReferenceNumber_Value').val( info['id_number'] );
$('input[id*=ReferenceNumber],input[name*=ReferenceNumber],input[id*=referenceNumber],input[name*=referenceNumber]').val(info['id_number']);
// $('#Answers_DateOfIssue_Value_Day').find('option[value='+info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_DateOfIssue_Value_Month').find('option[value='+info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_DateOfIssue_Value_Year').find('option[value='+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
$('input[id*=DateOfIssue],input[name*=DateOfIssue],input[id*=dateOfIssue],input[name*=dateOfIssue]').val(info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,""));
$('input[id*=IssueDate],input[name*=IssueDate],input[id*=issueDate],input[name*=issueDate]').val(info['id_start_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_start_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_start_date'].substr(6,4).replace(/\b(0+)/gi,""));
// $('#Answers_ExpiryDate_Value_Day').find('option[value='+info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_ExpiryDate_Value_Month').find('option[value='+info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,"")+']').prop('selected', true);
// $('#Answers_ExpiryDate_Value_ear').find('option[value='+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,"")+']').prop('selected', true);
$('input[id*=ExpiryDate],input[name*=ExpiryDate],input[id*=expiryDate],input[name*=expiryDate]').val( info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,""));
$('input[id*=OtherExpiryDate],input[name*=OtherExpiryDate],input[id*=otherExpiryDate],input[name*=otherExpiryDate]').val( info['id_end_date'].substr(0,2).replace(/\b(0+)/gi,"")+' '+montheng[parseInt(parseInt(info['id_end_date'].substr(3,2).replace(/\b(0+)/gi,""))-1)]+', '+info['id_end_date'].substr(6,4).replace(/\b(0+)/gi,""));
//
// //requirements
// $('#QualificationRelevantToOccupation_Value').find('option[value=1]').prop('selected', true);
$('select[id*=Qualification],select[id*=qualification]').find('option[value=1]').prop('selected', true);
// $('#HasFundsToStay_Value').find('option[value=Yes]').prop('selected', true);
$('select[id*=Funds],select[id*=funds]').find('option[value=Yes]').prop('selected', true);
//
// //health

if($('select').length>6){
    $('select').each(function(item){
        $(item).find('option[value=No]').prop('selected', true);
    });
}

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
$('input[id*=EmailAddress],input[name*=EmailAddress],input[id*=emailAddress],input[name*=emailAddress]').val( info['mail']);
// $('#EmailAddressConfirm_Value').val( info['mail'] );
// $('input[id*=EmailAddressConfirm_Value],input[name*=EmailAddressConfirm_Value],input[id*=emailAddressConfirm_Value],input[name*=emailAddressConfirm_Value]').val( info['mail']);
// $('#HasAgent_Value').find('option[value=No]').prop('selected', true);
$('select[id*=Agent],select[name*=Agent],select[id*=agent],select[name*=agent]').find('option[value=No]').prop('selected', true);
// $('#Address1_Value').val( info['address_street'] );
$('input[id*=Address1],input[name*=Address1],input[id*=address1],input[name*=address1]').val( info['address_street'] );
// $('#City_Value').val( info['address_city'] );
$('input[id*=City],input[name*=City],input[id*=city],input[name*=city]').val( info['address_city']);
// $('#CountryId_Value').find('option[value='+info['address_country']+']').prop('selected', true);
$('select[id*=CountryId],select[name*=CountryId],select[id*=countryId],select[name*=countryId]').find('option[value='+info['address_country']+']').prop('selected', true);