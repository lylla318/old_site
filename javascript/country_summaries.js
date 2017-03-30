/* Get the instance data from the json file. */
var initializedGraph = false;

queue()
	.defer(d3.csv, "data/instance-data.csv")
	.awaitAll(function(error, results){ 
		var data = parseData(results);
        $(document).ready(function() {
            //document.getElementById('country').value = 'Iran';
             $("#country").chosen().change(function(){
                if(!initializedGraph) { 
                    initializeGraph1(); 
                    displayGender();
                    initializeGraph2(); 
                    initializedGraph = true;
                }
            });
        });
	}); 

jQuery(document).ready(function(){
	jQuery(".chosen").chosen({max_selected_options: 3});
});

var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Democratic Republic of the Congo", "Cook Islands", "Costa Rica", "Ivory Coast", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Vatican", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Lao", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Serbia", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "UAE", "United Kingdom", "USA", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"];
var threatNumbers = {"Afghanistan":1,"Albania":0,"Algeria":6,"American Samoa":0,"Andorra":0,"Angola":2,"Anguilla":0,"Antarctica":0,"Antigua and Barbuda":0,"Argentina":0,"Armenia":0,"Aruba":0,"Australia":0,"Austria":0,"Azerbaijan":26,"Bahamas":0,"Bahrain":40,"Bangladesh":26,"Barbados":0,"Belarus":1,"Belgium":0,"Belize":0,"Benin":0,"Bermuda":0,"Bhutan":0,"Bolivia":0,"Bosnia and Herzegowina":0,"Botswana":0,"Bouvet Island":0,"Brazil":1,"British Indian Ocean Territory":0,"Brunei Darussalam":0,"Bulgaria":0,"Burkina Faso":0,"Burundi":0,"Cambodia":1,"Cameroon":1,"Canada":0,"Cape Verde":0,"Cayman Islands":0,"Central African Republic":0,"Chad":2,"Chile":0,"China":54,"Christmas Island":0,"Cocos (Keeling) Islands":0,"Colombia":2,"Comoros":0,"Democratic Republic of the Congo":0,"Cook Islands":0,"Costa Rica":0,"Ivory Coast":3,"Croatia":2,"Cuba":9,"Cyprus":0,"Czech Republic":0,"Denmark":0,"Djibouti":0,"Dominica":0,"Dominican Republic":0,"East Timor":0,"Ecuador":8,"Egypt":78,"El Salvador":0,"Equatorial Guinea":0,"Eritrea":0,"Estonia":0,"Ethiopia":72,"Falkland Islands (Malvinas)":0,"Faroe Islands":0,"Fiji":0,"Finland":0,"France":0,"France Metropolitan":0,"French Guiana":0,"French Polynesia":0,"French Southern Territories":0,"Gabon":0,"Gambia":5,"Georgia":0,"Germany":2,"Ghana":1,"Gibraltar":0,"Greece":1,"Greenland":0,"Grenada":0,"Guadeloupe":0,"Guam":0,"Guatemala":0,"Guinea":0,"Guinea-Bissau":1,"Guyana":0,"Haiti":0,"Heard and Mc Donald Islands":0,"Vatican":0,"Honduras":0,"Hong Kong":0,"Hungary":2,"Iceland":0,"India":10,"Indonesia":1,"Iran":68,"Iraq":1,"Ireland":0,"Israel":1,"Italy":0,"Jamaica":0,"Japan":0,"Jordan":7,"Kazakhstan":5,"Kenya":2,"Kiribati":0,"North Korea":0,"South Korea":3,"Kuwait":14,"Kyrgyzstan":0,"Lao":0,"Latvia":0,"Lebanon":11,"Lesotho":0,"Liberia":0,"Libya":0,"Liechtenstein":0,"Lithuania":0,"Luxembourg":0,"Macau":0,"Macedonia":7,"Madagascar":0,"Malawi":0,"Malaysia":8,"Maldives":2,"Mali":0,"Malta":0,"Marshall Islands":0,"Martinique":0,"Mauritania":2,"Mauritius":0,"Mayotte":0,"Mexico":12,"Micronesia":0,"Moldova":1,"Monaco":1,"Mongolia":0,"Montserrat":0,"Morocco":40,"Mozambique":0,"Myanmar":4,"Namibia":0,"Nauru":0,"Nepal":4,"Netherlands":0,"Netherlands Antilles":0,"New Caledonia":0,"New Zealand":0,"Nicaragua":0,"Niger":0,"Nigeria":2,"Niue":0,"Norfolk Island":0,"Northern Mariana Islands":0,"Norway":0,"Oman":10,"Pakistan":2,"Palau":0,"Palestine":5,"Panama":0,"Papua New Guinea":0,"Paraguay":0,"Peru":1,"Philippines":3,"Pitcairn":0,"Poland":0,"Portugal":0,"Puerto Rico":0,"Qatar":3,"Reunion":0,"Romania":0,"Russia":30,"Rwanda":0,"Saint Kitts and Nevis":0,"Saint Lucia":0,"Saint Vincent and the Grenadines":0,"Samoa":0,"San Marino":0,"Sao Tome and Principe":0,"Saudi Arabia":26,"Senegal":0,"Seychelles":0,"Sierra Leone":0,"Serbia":3,"Singapore":2,"Slovakia":0,"Slovenia":0,"Solomon Islands":0,"Somalia":0,"South Africa":0,"South Georgia and the South Sandwich Islands":0,"Spain":2,"Sri Lanka":0,"St. Helena":0,"St. Pierre and Miquelon":0,"Sudan":3,"Suriname":0,"Svalbard and Jan Mayen Islands":0,"Swaziland":0,"Sweden":0,"Switzerland":0,"Syria":51,"Taiwan":2,"Tajikistan":2,"Tanzania":8,"Thailand":14,"Togo":0,"Tokelau":0,"Tonga":0,"Trinidad and Tobago":0,"Tunisia":22,"Turkey":7,"Turkmenistan":0,"Turks and Caicos Islands":0,"Tuvalu":0,"Uganda":1,"Ukraine":3,"UAE":15,"United Kingdom":4,"USA":7,"United States Minor Outlying Islands":0,"Uruguay":0,"Uzbekistan":1,"Vanuatu":0,"Venezuela":26,"Vietnam":36,"Wallis and Futuna Islands":0,"Western Sahara":0,"Yemen":3,"Yugoslavia":0,"Zambia":4,"Zimbabwe":0};
var threatTypes = {"Afghanistan":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Albania":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Algeria":{"judicial":5,"intimidation":1,"interference":1,"physical":0},"American Samoa":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Andorra":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Angola":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Anguilla":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Antarctica":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Antigua and Barbuda":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Argentina":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Armenia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Aruba":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Australia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Austria":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Azerbaijan":{"judicial":25,"intimidation":9,"interference":0,"physical":0},"Bahamas":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bahrain":{"judicial":36,"intimidation":3,"interference":4,"physical":0},"Bangladesh":{"judicial":10,"intimidation":6,"interference":3,"physical":0},"Barbados":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Belarus":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Belgium":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Belize":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Benin":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bermuda":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bhutan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bolivia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bosnia and Herzegowina":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Botswana":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bouvet Island":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Brazil":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"British Indian Ocean Territory":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Brunei Darussalam":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Bulgaria":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Burkina Faso":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Burundi":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Cambodia":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Cameroon":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Canada":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Cape Verde":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Cayman Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Central African Republic":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Chad":{"judicial":2,"intimidation":0,"interference":0,"physical":0},"Chile":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"China":{"judicial":33,"intimidation":15,"interference":17,"physical":0},"Christmas Island":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Cocos (Keeling) Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Colombia":{"judicial":2,"intimidation":0,"interference":0,"physical":0},"Comoros":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Democratic Republic of the Congo":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Cook Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Costa Rica":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Ivory Coast":{"judicial":3,"intimidation":0,"interference":3,"physical":0},"Croatia":{"judicial":2,"intimidation":2,"interference":2,"physical":0},"Cuba":{"judicial":8,"intimidation":0,"interference":0,"physical":0},"Cyprus":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Czech Republic":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Denmark":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Djibouti":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Dominica":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Dominican Republic":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"East Timor":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Ecuador":{"judicial":3,"intimidation":0,"interference":5,"physical":0},"Egypt":{"judicial":68,"intimidation":16,"interference":21,"physical":0},"El Salvador":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Equatorial Guinea":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Eritrea":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Estonia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Ethiopia":{"judicial":63,"intimidation":9,"interference":13,"physical":0},"Falkland Islands (Malvinas)":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Faroe Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Fiji":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Finland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"France":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"France Metropolitan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"French Guiana":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"French Polynesia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"French Southern Territories":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Gabon":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Gambia":{"judicial":5,"intimidation":1,"interference":0,"physical":0},"Georgia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Germany":{"judicial":2,"intimidation":0,"interference":0,"physical":0},"Ghana":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Gibraltar":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Greece":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Greenland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Grenada":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Guadeloupe":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Guam":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Guatemala":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Guinea":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Guinea-Bissau":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Guyana":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Haiti":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Heard and Mc Donald Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Vatican":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Honduras":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Hong Kong":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Hungary":{"judicial":1,"intimidation":0,"interference":1,"physical":0},"Iceland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"India":{"judicial":3,"intimidation":6,"interference":6,"physical":0},"Indonesia":{"judicial":1,"intimidation":0,"interference":1,"physical":0},"Iran":{"judicial":56,"intimidation":23,"interference":23,"physical":0},"Iraq":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Ireland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Israel":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Italy":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Jamaica":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Japan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Jordan":{"judicial":6,"intimidation":1,"interference":0,"physical":0},"Kazakhstan":{"judicial":5,"intimidation":0,"interference":0,"physical":0},"Kenya":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Kiribati":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"North Korea":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"South Korea":{"judicial":3,"intimidation":1,"interference":1,"physical":0},"Kuwait":{"judicial":11,"intimidation":3,"interference":1,"physical":0},"Kyrgyzstan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Lao":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Latvia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Lebanon":{"judicial":9,"intimidation":2,"interference":1,"physical":0},"Lesotho":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Liberia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Libya":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Liechtenstein":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Lithuania":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Luxembourg":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Macau":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Macedonia":{"judicial":1,"intimidation":4,"interference":1,"physical":0},"Madagascar":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Malawi":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Malaysia":{"judicial":3,"intimidation":3,"interference":4,"physical":0},"Maldives":{"judicial":0,"intimidation":2,"interference":0,"physical":0},"Mali":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Malta":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Marshall Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Martinique":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Mauritania":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Mauritius":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Mayotte":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Mexico":{"judicial":6,"intimidation":5,"interference":3,"physical":0},"Micronesia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Moldova":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Monaco":{"judicial":1,"intimidation":1,"interference":1,"physical":0},"Mongolia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Montserrat":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Morocco":{"judicial":37,"intimidation":12,"interference":12,"physical":0},"Mozambique":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Myanmar":{"judicial":3,"intimidation":1,"interference":1,"physical":0},"Namibia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Nauru":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Nepal":{"judicial":3,"intimidation":1,"interference":0,"physical":0},"Netherlands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Netherlands Antilles":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"New Caledonia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"New Zealand":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Nicaragua":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Niger":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Nigeria":{"judicial":2,"intimidation":0,"interference":0,"physical":0},"Niue":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Norfolk Island":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Northern Mariana Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Norway":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Oman":{"judicial":10,"intimidation":1,"interference":1,"physical":0},"Pakistan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Palau":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Palestine":{"judicial":5,"intimidation":1,"interference":2,"physical":0},"Panama":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Papua New Guinea":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Paraguay":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Peru":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Philippines":{"judicial":3,"intimidation":1,"interference":1,"physical":0},"Pitcairn":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Poland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Portugal":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Puerto Rico":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Qatar":{"judicial":3,"intimidation":0,"interference":0,"physical":0},"Reunion":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Romania":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Russia":{"judicial":25,"intimidation":5,"interference":7,"physical":0},"Rwanda":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Saint Kitts and Nevis":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Saint Lucia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Saint Vincent and the Grenadines":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Samoa":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"San Marino":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Sao Tome and Principe":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Saudi Arabia":{"judicial":24,"intimidation":6,"interference":7,"physical":0},"Senegal":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Seychelles":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Sierra Leone":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Serbia":{"judicial":3,"intimidation":2,"interference":1,"physical":0},"Singapore":{"judicial":1,"intimidation":0,"interference":1,"physical":0},"Slovakia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Slovenia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Solomon Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Somalia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"South Africa":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"South Georgia and the South Sandwich Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Spain":{"judicial":2,"intimidation":0,"interference":0,"physical":0},"Sri Lanka":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"St. Helena":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"St. Pierre and Miquelon":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Sudan":{"judicial":2,"intimidation":1,"interference":0,"physical":0},"Suriname":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Svalbard and Jan Mayen Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Swaziland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Sweden":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Switzerland":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Syria":{"judicial":40,"intimidation":15,"interference":9,"physical":0},"Taiwan":{"judicial":0,"intimidation":2,"interference":0,"physical":0},"Tajikistan":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Tanzania":{"judicial":8,"intimidation":0,"interference":0,"physical":0},"Thailand":{"judicial":12,"intimidation":5,"interference":2,"physical":0},"Togo":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Tokelau":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Tonga":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Trinidad and Tobago":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Tunisia":{"judicial":20,"intimidation":10,"interference":11,"physical":0},"Turkey":{"judicial":3,"intimidation":4,"interference":1,"physical":0},"Turkmenistan":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Turks and Caicos Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Tuvalu":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Uganda":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Ukraine":{"judicial":2,"intimidation":2,"interference":2,"physical":0},"UAE":{"judicial":13,"intimidation":2,"interference":1,"physical":0},"United Kingdom":{"judicial":4,"intimidation":1,"interference":1,"physical":0},"USA":{"judicial":3,"intimidation":2,"interference":3,"physical":0},"United States Minor Outlying Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Uruguay":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Uzbekistan":{"judicial":1,"intimidation":0,"interference":0,"physical":0},"Vanuatu":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Venezuela":{"judicial":24,"intimidation":10,"interference":6,"physical":0},"Vietnam":{"judicial":33,"intimidation":5,"interference":2,"physical":0},"Wallis and Futuna Islands":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Western Sahara":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Yemen":{"judicial":1,"intimidation":2,"interference":2,"physical":0},"Yugoslavia":{"judicial":0,"intimidation":0,"interference":0,"physical":0},"Zambia":{"judicial":3,"intimidation":2,"interference":3,"physical":0},"Zimbabwe":{"judicial":0,"intimidation":0,"interference":0,"physical":0}};
var counts =  {"Afghanistan":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["pardoned"],"targeted_content":[""],"threat_source":[""],"threat_source_cat":["state authority"]},"Albania":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Algeria":{"intimidation":1,"interference":1,"physical":0,"judicial":5,"p_status":["detained","free","free","restricted activity","imprisoned","on trial"],"targeted_content":["social media platform [facebook]","social media platform [facebook]","blog (individual)","social media platform [facebook]","social media platform [facebook]","-"],"threat_source":["algerian government","algerian government","-","algerian government","algerian government","algerian government"],"threat_source_cat":["state authority","state authority","private individual","state authority","state authority","state authority"]},"American Samoa":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Andorra":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Angola":{"intimidation":0,"interference":0,"physical":1,"judicial":1,"p_status":["-","-"],"targeted_content":["online news report","online news report"],"threat_source":["angola government","police"],"threat_source_cat":["state authority","state authority"]},"Anguilla":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Antarctica":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Antigua and Barbuda":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Argentina":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Armenia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Aruba":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Australia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Austria":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Azerbaijan":{"intimidation":9,"interference":0,"physical":4,"judicial":25,"p_status":["imprisoned","awaiting trial","disappeared","free","imprisoned","awaiting trial","imprisoned","awaiting trial","imprisoned","free","free","-","awaiting trial","free","free","imprisoned","other","imprisoned","imprisoned","imprisoned","imprisoned","free","imprisoned","imprisoned","free","imprisoned"],"targeted_content":["social media platform [facebook]","-","social media platform [facebook]","-","blog (individual)","social media platform [youtube]","social media platform [facebook]","social media platform [youtube]","social media platform [facebook]","-","-","social media platform [facebook]","blog (individual)","blog (individual)","-","social media platform [facebook]","-","-","-","-","social media platform [facebook]","-","social media platform [facebook]","social media platform [youtube]","-","social media platform [facebook]"],"threat_source":["azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","local police","-","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government","azerbaijan government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Bahamas":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bahrain":{"intimidation":1,"interference":2,"physical":6,"judicial":36,"p_status":["imprisoned","-","-","detained","imprisoned","imprisoned","free","","imprisoned","awaiting trial","free","detained","-","-","detained","","-","free","-","imprisoned","imprisoned","-","free","detained","free","detained","detained","-","detained","free","free","free","-","imprisoned","imprisoned","other","detained","imprisoned","-","-"],"targeted_content":["-","social media platform [twitter]","social media platform [twitter]","-","blog (individual)","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","-","social media platform [twitter]","social media platform [twitter]","-","blog (individual)","social media platform [twitter]","blog (individual)","blog (individual)","blog (individual)","blog (individual)","social media platform [twitter]","-","-","-","-","social media platform [twitter]","social media platform [twitter]","blog (individual)","blog (individual)","-","social media platform [twitter]","social media platform [twitter]","-","-","messaging service [whatsapp]","-","-","social media platform [twitter]","social media platform [twitter]"],"threat_source":["bahrain government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","","bahraini government","bahraini government","bahraini government","bahraini police/ bahraini government","bahraini government","bahraini government","bahraini police/ bahraini government","","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","the interior ministry_�_s anti-corruption and economic and electronic security section (this info came from source article)","bahraini government","bahraini government","bahraini government","bahraini government","syrian government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government","bahraini government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Bangladesh":{"intimidation":6,"interference":3,"physical":18,"judicial":10,"p_status":["unknown","killed","unknown","-","killed","killed","imprisoned","killed","killed","killed","free","detained","killed","free","free","free","exiled","killed","-","other","-","imprisoned","killed","-","other","on trial"],"targeted_content":["-","blog (group), social media platform [facebook]","-","","-","social media platform [facebook]","-","-","blog (individual)","-","blog (individual)","-","other","-","-","-","blog (individual)","-","blog (individual)","-","blog (individual)","-","-","blog (individual)","-","social media platform [facebook]"],"threat_source":["non-state actor","non-state actor","non-state actor","","non-state actor","non-state actor","political party","non-state actor","non-state actor","non-state actor","state authority","state authority","non-state actor","non-state actor","state authority","non-state actor","state authority","non-state actor","state authority","non-state actor","state authority","political party","non-state actor","state authority","non-state actor","state authority"],"threat_source_cat":["u.s. federal bureau of investigation","-","-","","-","-","-","-","-","-","-","-","","-","-","-","-","-","-","-","-","-","-","-","-","-"]},"Barbados":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Belarus":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["-"],"targeted_content":["blog (individual)"],"threat_source":["kgb"],"threat_source_cat":["state authority"]},"Belgium":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Belize":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Benin":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bermuda":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bhutan":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bolivia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bosnia and Herzegowina":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Botswana":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bouvet Island":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Brazil":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["imprisoned"],"targeted_content":["-"],"threat_source":["brazilian police"],"threat_source_cat":["state authority"]},"British Indian Ocean Territory":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Brunei Darussalam":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Bulgaria":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Burkina Faso":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Burundi":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Cambodia":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["detained"],"targeted_content":["social media platform [facebook]"],"threat_source":["ministry of posts and telecommunication"],"threat_source_cat":["state authority"]},"Cameroon":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["-"],"targeted_content":["blog (individual)"],"threat_source":["cameroon government"],"threat_source_cat":["state authority"]},"Canada":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Cape Verde":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Cayman Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Central African Republic":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Chad":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["-","-"],"targeted_content":["blog (individual)","blog (individual)"],"threat_source":["security forces","chad government"],"threat_source_cat":["state authority","state authority"]},"Chile":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"China":{"intimidation":13,"interference":15,"physical":7,"judicial":33,"p_status":["disappeared","-","imprisoned","other","on trial","imprisoned","other","restricted activity","restricted activity","unknown","-","disappeared","-","free","imprisoned","-","detained","restricted activity","disappeared","restricted activity","free","free","disappeared","disappeared","imprisoned","-","unknown","imprisoned","-","-","detained","free","free","free","detained","unknown","","","-","detained","-","restricted activity","-","free","-","restricted activity","detained","-","-","-","detained","imprisoned","detained","-"],"targeted_content":["blog (group)","blog (individual)","-","social media platform [facebook]","social media platform [sina weibo]","blog (individual)","social media platform [twitter]","-","blog (individual)","social media platform [facebook]","social media platform [facebook]","blog (group)","-","messaging service [qq group]","-","post on web-based repository or hosting service [deutsche welle]","post on web-based repository or hosting service [tianya]","-","blog (group)","blog (individual)","social media platform [facebook]","social media platform [facebook]","blog (group)","blog (group)","blog (individual)","-","-","-","-","-","-","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [qq]","blog","social media platform [twitter]","social media platform [twitter]","social media platform [sina weibo]","-","social media platform [facebook]","-","social media platform [twitter]","-","-","-","social media platform [facebook]","social media platform [sina weibo], social media platform [tencent]","-","-","blog (individual)","social media platform [sina weibo]"],"threat_source":["chinese government","chinese government","chinese government","chinese police","chinese government","chinese government","chinese government","chinese government","-","chinese government","chinese government","chinese government","shanghai government","chinese government","chinese government","the communist party","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","chinese government","shanghai government","shanghai government","shanghai government","chinese government","chinese government","chinese government","chinese government","chinese government","","","50 cent party","chinese government","chinese government","university_�_s communist party committee","police","-","the communist party","chinese government","chinese government","-","chinese online volunteer army","chinese government","chinese government","beijing court","chinese government","chinese government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","para-statal","state authority","state authority","para-statal","state authority","-","state authority","state authority","state authority","-","non-state actor","state authority","state authority","state authority","state authority","state authority"]},"Christmas Island":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Cocos (Keeling) Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Colombia":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["free","other"],"targeted_content":["post on web-based repository or hosting service [scribd]","social media platform [twitter]"],"threat_source":["colombian government","cristina plazas"],"threat_source_cat":["state authority","state authority"]},"Comoros":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Democratic Republic of the Congo":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Cook Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Costa Rica":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Ivory Coast":{"intimidation":0,"interference":3,"physical":0,"judicial":3,"p_status":["detained","detained","detained"],"targeted_content":["digital activism","digital activism","digital activism"],"threat_source":["ivorian police","ivorian police","ivorian police"],"threat_source_cat":["state authority","state authority","state authority"]},"Croatia":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["","released"],"targeted_content":["facebook","blog (individual)"],"threat_source":["",""],"threat_source_cat":["state authority","state authority"]},"Cuba":{"intimidation":0,"interference":0,"physical":0,"judicial":8,"p_status":["free","free","free","-","free","free","free","free","-"],"targeted_content":["-","blog (individual)","blog (individual)","blog (individual)","online news report","-","blog (group)","blog (individual)","-"],"threat_source":["cuban government","-","cuban government","cuban government","cuban government","cuban government","cuban government","cuban government","cubava monitoring group"],"threat_source_cat":["state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","para-statal"]},"Cyprus":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Czech Republic":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Denmark":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Djibouti":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Dominica":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Dominican Republic":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"East Timor":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Ecuador":{"intimidation":0,"interference":5,"physical":0,"judicial":3,"p_status":["free","-","-","free","awaiting trial","-","-","-"],"targeted_content":["original art or images","-","-","social media platform [twitter]","social media platform [twitter]","blog (individual)","-","-"],"threat_source":["-","juan carlos vascones, ceo of the ecuadorian company ximah digital","juan carlos vascones, ceo of the ecuadorian company ximah digital","paula rodas, an official of the national institute of cultural heritage","-","ecu�_dor government","juan carlos vascones, ceo of the ecuadorian company ximah digital","juan carlos vascones, ceo of the ecuadorian company ximah digital"],"threat_source_cat":["para-statal","para-statal","para-statal","state authority","political party","state authority","para-statal","para-statal"]},"Egypt":{"intimidation":11,"interference":16,"physical":2,"judicial":68,"p_status":["free","imprisoned, other [hunger strike]","free","detained","imprisoned","detained","detained","detained","detained","detained","detained","detained","free","imprisoned","other [temporary release]","detained","detained","detained","detained","released","detained","free","detained","detained","detained","imprisoned","imprisoned","-","-","detained","on trial","-","released","imprisoned","imprisoned","","imprisoned","-","imprisoned","other","detained","free","-","","detained","detained","imprisoned","free","free","imprisoned","imprisoned","detained","on trial","imprisoned","imprisoned","detained","imprisoned","imprisoned","imprisoned","imprisoned","released","detained","detained","imprisoned","suspended sentence","released","detained","-","awaiting trial","imprisoned","imprisoned","suspended sentence","suspended sentence","imprisoned","awaiting trial","awaiting trial","free","awaiting trial"],"targeted_content":["-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","-","blog (individual)","blog (individual)","-","-","-","-","-","online news report","social media platform [facebook]","blog (individual)","-","social media platform [facebook]","blog (group)","blog (individual)","-","-","social media platform (facebook)","-","blog (individual)","-","-","-","blog (group)","original art or images","blog (individual)","-","-","-","blog (individual)","blog (individual)","-","-","blog (group)","blog (individual)","-","blog (individual)","-","-","social media platform [facebook]","social media platform [facebook]","-","blog (individual)","-","-","blog (individual)","-","facebook","blog (individual)","blog (individual)","blog (individual)","blog (individual)","-","-","-","-","-","-","social media platform [facebook]","-"],"threat_source":["ahmed maher aglan, ashraf aglan","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","high court","egyptian government","egyptian government","-","egyptian government","egyptian government","egyptian government","","egyptian government","egyptian government","","egyptian government","-","egyptian government","egyptian government","egyptian police","egyptian government","_��artistic products_�� department of the state police","","egyptian government","egyptian government","egyptian government","egyptian special forces","egyptian special forces","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","cairo appeals court","egyptian government","egyptian government","egyptian government","state security officers","egyptian police","egyptian government","egyptian government","egyptian government","","egyptian special forces","","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government","egyptian government"],"threat_source_cat":["private individual","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"El Salvador":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Equatorial Guinea":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Eritrea":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Estonia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Ethiopia":{"intimidation":9,"interference":13,"physical":2,"judicial":63,"p_status":["imprisoned","imprisoned","imprisoned","other","other","detained","on trial","on trial","on trial","on trial","free","on trial","other","detained","on trial","on trial","on trial","free","detained","on trial","on trial","on trial","on trial","free","detained","on trial","on trial","on trial","on trial","free","detained","on trial","on trial","on trial","detained","on trial","on trial","on trial","on trial","free","detained","on trial","on trial","on trial","on trial","free","imprisoned","imprisoned","imprisoned","free","imprisoned","free","imprisoned","other","detained","other","detained","free","detained","on trial","on trial","on trial","on trial","free","detained","on trial","on trial","on trial","on trial","free","on trial","on trial"],"targeted_content":["-","-","-","-","-","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","-","-","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","-","-","blog (individual)","-","-","-","-","-","-","-","-","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","blog (group)","-","-"],"threat_source":["ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","state authority","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government","ethiopian government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Falkland Islands (Malvinas)":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Faroe Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Fiji":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Finland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"France":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"France Metropolitan":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"French Guiana":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"French Polynesia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"French Southern Territories":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Gabon":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Gambia":{"intimidation":1,"interference":0,"physical":1,"judicial":5,"p_status":["exiled","-","detained","free","unknown"],"targeted_content":["online news report","online news report","-","-","-"],"threat_source":["gambia government","gambia's national intelligence agency","gambia government","national intelligence agency","national intelligence agency"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority"]},"Georgia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Germany":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["other","other"],"targeted_content":["-","-"],"threat_source":["federal attorney general","federal attorney general"],"threat_source_cat":["state authority","state authority"]},"Ghana":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["free"],"targeted_content":["social media platform [facebook]"],"threat_source":["dominic ayine"],"threat_source_cat":["state authority"]},"Gibraltar":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Greece":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["free"],"targeted_content":["online news report"],"threat_source":["greek government"],"threat_source_cat":["state authority"]},"Greenland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Grenada":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Guadeloupe":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Guam":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Guatemala":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Guinea":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Guinea-Bissau":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["free"],"targeted_content":["blog (individual)"],"threat_source":["guinea-bissau government"],"threat_source_cat":["state authority"]},"Guyana":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Haiti":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Heard and Mc Donald Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Vatican":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Honduras":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Hong Kong":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Hungary":{"intimidation":0,"interference":1,"physical":0,"judicial":1,"p_status":["other","-"],"targeted_content":["-","social media platform [facebook]"],"threat_source":["hungarian government","local government"],"threat_source_cat":["state authority","state authority"]},"Iceland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"India":{"intimidation":5,"interference":5,"physical":0,"judicial":3,"p_status":["free","-","released","other","other","other","other","other","free","-"],"targeted_content":["post on web-based repository or hosting service [github]","-","email","-","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","-","social media platform [facebook]","social media platform [facebook]"],"threat_source":["flash networks, airtel","flash networks,","cyber police station","facebook","-","facebook","facebook","-","facebook","indian government"],"threat_source_cat":["corporate","corporate","state authority","corporate","non-state actor","corporate","corporate","non-state actor","corporate","state authority"]},"Indonesia":{"intimidation":0,"interference":1,"physical":0,"judicial":1,"p_status":["detained"],"targeted_content":["social media platform [facebook], social media platform [youtube]"],"threat_source":["-"],"threat_source_cat":["-"]},"Iran":{"intimidation":9,"interference":9,"physical":8,"judicial":56,"p_status":["released","released on bail","free","imprisoned","released","sentenced to execution","imprisoned","sentenced to execution","imprisoned","free","imprisoned","imprisoned","released","detained","unknown","imprisoned","imprisoned","-","sentenced to execution","-","imprisoned","unknown","free","free","free","released","free","other","imprisoned","imprisoned","other","imprisoned","released","","deceased in prison","","on trial","unknown","imprisoned","unknown","imprisoned","released","unknown","imprisoned","","imprisoned","detained","imprisoned","imprisoned","free","imprisoned","","detained","disappeared","imprisoned","detained","","imprisoned","free","imprisoned","unknown","unknown","unknown","unknown","imprisoned","released","-","imprisoned"],"targeted_content":["blog (individual)","blog (individual)","-","-","blog (individual)","original art or images","social media platform [facebook]","-","-","-","-","-","blog (individual)","blog (group)","blog (group)","blog (group)","-","online news report","original art or images","blog (individual)","-","-","blog (individual)","blog (individual)","sms","website","blog (group)","-","code, software product","software product","software product","-","blog","blog","blog","blog","blog (individual)","blog (group)","blog (group)","blog (group)","blog (group)","blog (individual)","blog (group)","blog (group)","blog (individual)","-","-","social media platform [twitter]","social media platform [flickr], social media platform [picasa]","-","-","blog (individual)","blog (individual)","-","social media platform [facebook]","-","social media platform [u24]","-","social media gesture [youtube]","social media gesture [youtube]","social media platform [facebook]","social media platform [facebook]","-","blog (group)","blog (group)","blog","social media platform [twitter]","blog (individual)"],"threat_source":["","","iranian government","iranian government","","iranian government","iranian government","iranian government","iranian government","iranian government","iranian government","iranian government","","iranian government","iranian government","iran's revolutionary guard","iranian government","iran's revolutionaru guard","iranian government","bureau for environmental protection","iranian government","iranian police","iranian government","iranian government","-","","iranian government","iranian prison guards","iranian government","iranian government","iranian government","iranian government","","","","","iranian government","iranian government","iran's revolutionary guard","iranian government","iran's revolutionary guard","","iranian government","iran's revolutionary guard","","iranian government","iranian government","iranian government","iranian government","iranian government","iranian government","","iranian government","-","iranian government","iranian government","","-","iranian government","iran","iranian government","iranian government","-","iranian government","iran's revolutionary guard","","iranian government","iranian government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","non-state actor","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","state authority"]},"Iraq":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":[""],"targeted_content":["blog"],"threat_source":[""],"threat_source_cat":["unknown assailants"]},"Ireland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Israel":{"intimidation":0,"interference":0,"physical":1,"judicial":0,"p_status":["arrested"],"targeted_content":["facebook"],"threat_source":[""],"threat_source_cat":["state authority"]},"Italy":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Jamaica":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Japan":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Jordan":{"intimidation":1,"interference":0,"physical":1,"judicial":6,"p_status":["imprisoned","-","-","imprisoned","detained","restricted activity","free"],"targeted_content":["-","online news report","online news report","-","-","-","social media platform [facebook]"],"threat_source":["jordanian state security court","jordan government","jordan government","jordan government","state security court","airport security/police","son of a former senior official"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","para-statal","state authority"]},"Kazakhstan":{"intimidation":0,"interference":0,"physical":0,"judicial":5,"p_status":["imprisoned","detained","free","imprisoned","imprisoned"],"targeted_content":["-","social media platform [youtube]","post on web-based repository or hosting service [scihub]","-","-"],"threat_source":["kazakhstan government","kazakh government","elsevier","kazakhstan government","kazakhstan government"],"threat_source_cat":["state authority","state authority","corporate","state authority","state authority"]},"Kenya":{"intimidation":1,"interference":1,"physical":1,"judicial":1,"p_status":["disappeared","free"],"targeted_content":["blog (group)","blog (individual), social media platform [twitter]"],"threat_source":["-","directorate of criminal investigations (dci)"],"threat_source_cat":["unknown","state authority"]},"Kiribati":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"North Korea":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"South Korea":{"intimidation":0,"interference":0,"physical":0,"judicial":3,"p_status":["released","on trial","unknown"],"targeted_content":["daum agora bulletin board","social media platform [twitter]","blog (individual)"],"threat_source":["","south korean government","south korean government"],"threat_source_cat":["state authority","state authority","state authority"]},"Kuwait":{"intimidation":2,"interference":0,"physical":0,"judicial":11,"p_status":["imprisoned","released","imprisoned","-","imprisoned","imprisoned","free","imprisoned","imprisoned","on trial","imprisoned","imprisoned","on trial","-"],"targeted_content":["social media platform [twitter]","blog (individual)","social media platform [twitter]","-","-","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [youtube]","-","social media platform [twitter]","social media platform [twitter]"],"threat_source":["state security police","","kuwait government","kuwait government","kuwait government","state security police","kuwait government","kuwait government","kuwait government","kuwait government","kuwait government","kuwait government","kuwait government","kuwait government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Kyrgyzstan":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Lao":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Latvia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Lebanon":{"intimidation":1,"interference":0,"physical":0,"judicial":9,"p_status":["free","free","free","free","free","other","free","imprisoned","free","other","-"],"targeted_content":["social media platform [facebook]","social media platform [facebook]","blog (individual)","blog (individual)","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]"],"threat_source":["lebanese government","-","lebanese government","lebanese government","-","lebanese anti-cybercrime bureau","military","lebanese government","-","lebanese anti-cybercrime bureau","lebanese government"],"threat_source_cat":["state authority","-","state authority","state authority","-","state authority","state authority","state authority","-","state authority","state authority"]},"Lesotho":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Liberia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Libya":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Liechtenstein":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Lithuania":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Luxembourg":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Macau":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Macedonia":{"intimidation":4,"interference":1,"physical":0,"judicial":1,"p_status":["-","-","-","-","-","imprisoned","-"],"targeted_content":["-","-","-","-","-","-","-"],"threat_source":["interpol","macedonian government","macedonian government","macedonian government","macedonia national security services","macedonian government","-"],"threat_source_cat":["non-state actor","state authority","state authority","state authority","state authority","state authority","-"]},"Madagascar":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Malawi":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Malaysia":{"intimidation":2,"interference":3,"physical":0,"judicial":3,"p_status":["free","-","-","released","-","-","-","on trial"],"targeted_content":["blog (individual)","original art or images","non-original art or images","blog (individual)","-","-","blog (group)","non-original art or images"],"threat_source":["sultan ismail","police cyber investigation center","-","","-","malaysian government","malaysia's communications and multimedia commission","malaysian government"],"threat_source_cat":["state authority","state authority","-","state authority","-","state authority","non-state actor","state authority"]},"Maldives":{"intimidation":2,"interference":0,"physical":1,"judicial":0,"p_status":["disappeared","free"],"targeted_content":["post on web-based repository or hosting service [minivan news], social media platform [twitter]","blog (individual)"],"threat_source":["-","-"],"threat_source_cat":["unknown","para-statal"]},"Mali":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Malta":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Marshall Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Martinique":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Mauritania":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":["free","sentenced to execution"],"targeted_content":["-","-"],"threat_source":["-","mauritania government"],"threat_source_cat":["-","state authority"]},"Mauritius":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Mayotte":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Mexico":{"intimidation":3,"interference":1,"physical":5,"judicial":4,"p_status":["detained","on trial","killed","killed","detained","on trial","","killed","released","-","killed","free"],"targeted_content":["digital activism","social media platform [twitter]","-","-","original art or images","social media platform [facebook]","blog/twitter","-","website","social media platform [twitter], social media platform [facebook]","-","blog (individual)"],"threat_source":["chiapas police","mexican government","-","criminal gang","mexican government","mexican government","a member of the mexican governmen","-","","unidentified drug organization","criminal gang","unknown"],"threat_source_cat":["state authority","state authority","unknown","non-state actor","state authority","state authority","","unknown","unknown","non-state actor","non-state actor","unknown"]},"Micronesia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Moldova":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["released"],"targeted_content":["blog (individual)"],"threat_source":[""],"threat_source_cat":["state authority"]},"Monaco":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["released"],"targeted_content":["satirical website"],"threat_source":[""],"threat_source_cat":["state authority"]},"Mongolia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Montserrat":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Morocco":{"intimidation":9,"interference":9,"physical":1,"judicial":37,"p_status":["restricted activity","awaiting trial","detained","imprisoned","on trial","restricted activity","on trial","detained","on trial","other","imprisoned","imprisoned","on trial","","awaiting trial","released","imprisoned","detained","imprisoned","awaiting trial","free","imprisoned","awaiting trial","imprisoned","imprisoned","imprisoned","imprisoned","imprisoned","awaiting trial","imprisoned","awaiting trial","-","free","restricted activity","detained","-","other","released","-","-"],"targeted_content":["digital activism","digital activism","commenting on sites","online news report","online news report","online news report","social media platform [facebook]","-","social media gesture [youtube]","blog (group)","-","online news report","online news report","online website","digital activism","blog (individual)","-","social media platform [youtube]","post on web-based repository or hosting service [youtube]","blog (individual)","blog (individual)","-","digital activism","blog (group)","post on web-based repository [hibapress.com]","post on web-based repository [hibapress.com]","online news report","-","digital activism","-","digital activism","-","social media platform [facebook]","digital activism","-","-","blog (group)","blog (individual)","blog (individual)","-"],"threat_source":["moroccan government","moroccan government","moroccan government","moroccan government","moroccan government","moroccan government","moroccan government","morrocan government","moroccan government","moroccan government","moroccan government","moroccan government","moroccan government","","conseil superieur de la defense nationale & morocco's judicial police","","moroccan government","moroccan government","moroccan government","-","moroccan government","moroccan government","conseil superieur de la defense nationale & morocco's judicial police","moroccan government","moroccan government","moroccan government","moroccan government","moroccan government","conseil superieur de la defense nationale & morocco's judicial police","moroccan government","conseil superieur de la defense nationale & morocco's judicial police","moroccan government","moroccan government","interior ministry","moroccan government","moroccan government","moroccan government","","moroccan government","moroccan government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Mozambique":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Myanmar":{"intimidation":0,"interference":0,"physical":1,"judicial":3,"p_status":["released","-","killed","awaiting trial"],"targeted_content":["blog (individual)","-","-","social media platform [facebook]"],"threat_source":["","-","military junta","lt. col. kyaw htin of the southwest command in pathein"],"threat_source_cat":["state authority","-","state authority","state authority"]},"Namibia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Nauru":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Nepal":{"intimidation":1,"interference":0,"physical":1,"judicial":3,"p_status":["free","free","free","-"],"targeted_content":["online news report","online news report","online news report","online news report"],"threat_source":["nepal government","nepal government","nepal government","-"],"threat_source_cat":["state authority","state authority","state authority","non-state actor"]},"Netherlands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Netherlands Antilles":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"New Caledonia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"New Zealand":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Nicaragua":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Niger":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Nigeria":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["-","free"],"targeted_content":["social media platform [twitter]","social media platform [twitter]"],"threat_source":["nigerian police","nigerian government"],"threat_source_cat":["state authority","state authority"]},"Niue":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Norfolk Island":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Northern Mariana Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Norway":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Oman":{"intimidation":0,"interference":0,"physical":1,"judicial":10,"p_status":["free","free","free","free","free","free","","on trial","detained","-"],"targeted_content":["-","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","-","social media platform [facebook]","blog (individual)","-","socia media platform [twitter], blog (individual)","blog (individual)"],"threat_source":["internal security service","internal security service","internal security service","internal security service","oman government","internal security service","","u.a.e. government","oman government","oman government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Pakistan":{"intimidation":0,"interference":0,"physical":1,"judicial":0,"p_status":["killed","-"],"targeted_content":["-","blog (individual)"],"threat_source":["-","taliban"],"threat_source_cat":["non-state actor","non-state actor"]},"Palau":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Palestine":{"intimidation":0,"interference":1,"physical":1,"judicial":5,"p_status":["","imprisoned","unknown","awaiting trial","on trial"],"targeted_content":["blog (individual)","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]","social media platform [facebook]"],"threat_source":["","israeli government","palestinian government","palestinian authorities","palestinian officials"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority"]},"Panama":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Papua New Guinea":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Paraguay":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Peru":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["suspended sentence"],"targeted_content":["blog (individual)"],"threat_source":["jorge mufarech nemy"],"threat_source_cat":["private individual"]},"Philippines":{"intimidation":0,"interference":0,"physical":0,"judicial":3,"p_status":["-","free","released"],"targeted_content":["blog (individual)","social media platform [facebook]","blog (individual)"],"threat_source":["esperanza cabral","philippino government","national bureau of investigation"],"threat_source_cat":["state authority","state authority","state authority"]},"Pitcairn":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Poland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Portugal":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Puerto Rico":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Qatar":{"intimidation":0,"interference":0,"physical":1,"judicial":3,"p_status":["imprisoned","imprisoned","on trial"],"targeted_content":["social media platform [facebook]","blog (individual)","blog (individual)"],"threat_source":["qatar government","qatar government","qatar government"],"threat_source_cat":["state authority","state authority","state authority"]},"Reunion":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Romania":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Russia":{"intimidation":3,"interference":4,"physical":2,"judicial":22,"p_status":["free","free","detained","-","imprisoned","unknown","-","","free","-","","imprisoned","on trial","imprisoned","other","imprisoned","-","free, restricted activity","restricted activity","other","exiled","on trial","-","imprisoned","-","imprisoned","suspended sentence","free","","-"],"targeted_content":["social media platform [facebook]","social media platform [vkontakte]","-","social media platform [facebook]","blog (group)","social media platform [whatsapp]","-","blog (livejournal)","social media platform [facebook], social media platform [vkontakte], social media platform [youtube]","blog (group)","blog (livejournal)","blog (individual)","blog (individual)","-","blog (group)","social media platform [vkontakte]","-","-","-","blog (individual)","blog (individual)","blog (individual)","-","social media platform [vkontakte], social media platform [youtube]","social media platform [youtube], social media platform [vkontakte]","social media platform [vkontakte], social media platform [youtube]","-","social media platform [vkontakte]","blog (individual)","-"],"threat_source":["russian government","russian government","fsb","-","police","ramzan kadyrov (region's leader)","russian government","militia","russian government","russian government","moscow region election committee","-","russian government","russian government","-","russian government","fsb","russian government","fsb","kemerovo court","russian government","aman tuleev","russian government","russian government","russian government","russian government","leninsky district court of kemerovo","russian government","","fsb"],"threat_source_cat":["state authority","state authority","state authority","corporate","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Rwanda":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Saint Kitts and Nevis":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Saint Lucia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Saint Vincent and the Grenadines":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Samoa":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"San Marino":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Sao Tome and Principe":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Saudi Arabia":{"intimidation":4,"interference":5,"physical":4,"judicial":23,"p_status":["imprisoned","-","imprisoned","imprisoned, restricted activity","on trial","imprisoned","imprisoned","imprisoned","restricted activity","on trial","imprisoned, restricted activity","-","released","","imprisoned","imprisoned","imprisoned","-","free","imprisoned","imprisoned","imprisoned","sentenced to execution","-","unknown","imprisoned"],"targeted_content":["social media platform [twitter]","social media gesture [youtube]","social media gesture [youtube]","blog (group)","-","social media platform [twitter]","-","online news report","social media platform [twitter]","-","blog (group)","-","blog","blog","social media platform [twitter]","blog (group)","blog (group)","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","blog (group)","blog (individual)","-","-","social media platform [youtube]","social media platform [twitter]"],"threat_source":["saudi arabian government","saudi arabian government","saudi arabian government","saudia arabia government","saudi arabian government","saudi arabian government","saudi arabia's specialized criminal court","saudi arabia government","saudia arabia government","saudi arabian government","saudia arabia government","saudia arabia government","hisba apparatus","security forces","saudi arabian government","saudi arabia government","saudia arabia government","saudi arabia government","saudi arabia government","saudi arabia's counter-terrorism court, known as the specialised criminal court (scc)","saudia arabia government","saudi arabia government","saudi arabian government","saudi arabian government","al sunoor united group","information crimes prevention unit"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","corporate","state authority"]},"Senegal":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Seychelles":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Sierra Leone":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Serbia":{"intimidation":2,"interference":1,"physical":0,"judicial":3,"p_status":["unknown","unknown","awaiting trial"],"targeted_content":["social media platform [facebook]","-","-"],"threat_source":["serbian government","serbian police","serbian government"],"threat_source_cat":["state authority","state authority","state authority"]},"Singapore":{"intimidation":0,"interference":1,"physical":1,"judicial":1,"p_status":["free","detained"],"targeted_content":["social media platform [facebook]","social media platform [facebook]"],"threat_source":["singapore government","singaporian government"],"threat_source_cat":["state authority","state authority"]},"Slovakia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Slovenia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Solomon Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Somalia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"South Africa":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"South Georgia and the South Sandwich Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Spain":{"intimidation":0,"interference":0,"physical":0,"judicial":2,"p_status":["free","free"],"targeted_content":["social media platform [youtube]","social media platform [youtube]"],"threat_source":["spanish government","spanish government"],"threat_source_cat":["state authority","state authority"]},"Sri Lanka":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"St. Helena":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"St. Pierre and Miquelon":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Sudan":{"intimidation":1,"interference":0,"physical":0,"judicial":2,"p_status":["detained","detained","free"],"targeted_content":["online news report","-","-"],"threat_source":["saudi security agency","sudan government","-"],"threat_source_cat":["state authority","state authority","-"]},"Suriname":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Svalbard and Jan Mayen Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Swaziland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Sweden":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Switzerland":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Syria":{"intimidation":10,"interference":4,"physical":14,"judicial":39,"p_status":["detained","-","","released","released","free","detained","unknown","released","","detained","detained","detained","unknown","detained","disappeared","killed","detained","awaiting trial","free","unknown","killed","free","detained","detained","detained","-","killed","free","awaiting trial","disappeared","unknown","released","detained","detained","","-","unknown","disappeared","detained","detained","detained","killed","-","detained","detained","detained","detained","detained","unknown","imprisoned"],"targeted_content":["-","-","online news website","blog (individual)","-","blog (individual)","-","-","blog (individual)","discussion forum","-","-","-","-","-","blog (individual)","original art or images","-","-","blog (group)","-","blog (group)","-","-","-","-","online news report","original art or images","-","-","-","-","blog","-","-","blog (individual)","-","-","code, blog (group)","-","-","-","-","online news report","-","-","-","-","-","-","-"],"threat_source":["syrian government","cyber army of the caliph, isis","","security forces","saudi arabian government","-","syrian government","syrian government","","","syrian government","syrian government","syrian government","unidentified masked gunmen","syrian government","syrian government","security forces","syrian government","syrian government","cyber army of the khilafah","unidentified masked gunmen","isis","syrian government","syrian government","syrian government","syrian government","masked gunmen /pro govt militia","isis","syrian government","syrian government","syrian government","unidentified masked gunmen","criminal security forces","syrian government","syrian government","","-","military branch 215, interrogation division branch 248","syrian government","syrian government","syrian government","syrian government","syrian military intelligence","syrian government","syrian government","syrian government","syrian government","syrian government","syrian government","unidentified masked gunmen","syrian government"],"threat_source_cat":["state authority","non-state actor","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","state authority","non-state actor","unknown","non-state actor","state authority","state authority","state authority","state authority","para-statal","para-statal","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","-","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","unknown","state authority"]},"Taiwan":{"intimidation":2,"interference":0,"physical":0,"judicial":0,"p_status":["-","-"],"targeted_content":["social media platform [facebook]","social media platform [facebook]"],"threat_source":["mainland chinese tolls","50 cent party"],"threat_source_cat":["non-state actor","non-state actor"]},"Tajikistan":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["disappeared","free"],"targeted_content":["blog (group)","-"],"threat_source":["tajikistan government","tajikistan governmetn"],"threat_source_cat":["state authority","state authority"]},"Tanzania":{"intimidation":0,"interference":0,"physical":0,"judicial":8,"p_status":["imprisoned","awaiting trial","released on bail","awaiting trial","awaiting trial","awaiting trial","awaiting trial","awaiting trial"],"targeted_content":["social media platform [facebook]","social media platform [facebook]","messaging service [whatsapp]","social media platform [facebook]","messaging service [whatsapp]","messaging service [whatsapp]","messaging service [whatsapp]","messaging service [whatsapp]"],"threat_source":["","tanzania government","tanzania government","tanzania government","tanzania government","tanzania government","tanzania government","tanzania government"],"threat_source_cat":["","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Thailand":{"intimidation":5,"interference":2,"physical":0,"judicial":12,"p_status":["awaiting trial","on trial","on trial","free","exiled","imprisoned","on trial","-","awaiting trial","other","detained","detained","free","-"],"targeted_content":["online news report","blog (group)","-","-","online news report","social media platform [facebook]","social media platform [facebook]","-","online news report","sms","post on web-based repository or hosting service [prachatai], post on web-based repository or hosting service [samesky]","-","post on web-based repository or hosting service [unidentified]","digital activism"],"threat_source":["royal thai navy","thai government","thai government","thailand government","thai government","thai government","thai government","thai government","royal thai navy","thai government","thai government","thai government","thai government","military junta, teachers"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Togo":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Tokelau":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Tonga":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Trinidad and Tobago":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Tunisia":{"intimidation":3,"interference":3,"physical":4,"judicial":16,"p_status":["detained","unknown","imprisoned","","released","","","-","-","free","","","released","detained","on trial","released","detained","awaiting trial","imprisoned","detained","free","free"],"targeted_content":["-","-","-","discussion forum","social media platform","online website","blog (individual)","-","-","-","blog (individual)","website","website","original art or images","-","social media platform","-","social media platform [facebook]","-","social media platform [facebook]","blog (individual)","blog (individual)"],"threat_source":["police","tunisia government","tunisia government","","","","","tunisia government","tunisia government","-","","","","tunisian government","tunisia government","","tunisian government","tunisia government","-","judge sofiane selliti","tunisia government","tunisia government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","unknown","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Turkey":{"intimidation":4,"interference":1,"physical":5,"judicial":3,"p_status":["free","unknown","free","killed","killed","-","detained"],"targeted_content":["social media platform [twitter]","-","-","original art or images","original art or images","social media platform [twitter]","-"],"threat_source":["turkey government","gang affiliated to turkey's ruling party","-","isis","isis","turkish court","turkish police"],"threat_source_cat":["state authority","non-state actor","non-state actor","non-state actor","non-state actor","state authority","state authority"]},"Turkmenistan":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Turks and Caicos Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Tuvalu":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Uganda":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["imprisoned"],"targeted_content":["social media platform [facebook]"],"threat_source":["uganda government"],"threat_source_cat":["state authority"]},"Ukraine":{"intimidation":1,"interference":1,"physical":1,"judicial":1,"p_status":["","-","free"],"targeted_content":["blog (livejournal)","social media platform [facebook]","social media platform [vkontakte]"],"threat_source":["","masked men","municipal court in sumy, north-eastern ukraine"],"threat_source_cat":["state authority","state authority","state authority"]},"UAE":{"intimidation":1,"interference":0,"physical":0,"judicial":13,"p_status":["detained","imprisoned","imprisoned","detained","imprisoned","released","unknown","exiled","imprisoned","-","other","imprisoned","imprisoned","free","free"],"targeted_content":["online petition","social media platform [facebook]","social media platform [twitter]","social media platform [twitter]","-","discussion forum","social media platform [twitter]","-","-","social media platform [facebook]","-","-","-","original art or images","-"],"threat_source":["uae government","uae government","uae government","dubai government","uae government","","uae government","uae government","uae government","uae government","uae government","uae government","uae government","-","dubai government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","-","state authority"]},"United Kingdom":{"intimidation":0,"interference":0,"physical":0,"judicial":4,"p_status":["imprisoned","released","imprisoned","unknown"],"targeted_content":["social media platform [facebook]","twitter","social media platform [facebook]","messaging service [#dbe1e7berry messenger]"],"threat_source":["british government","","british government","essex police"],"threat_source_cat":["state authority","state authority","state authority","state authority"]},"USA":{"intimidation":2,"interference":3,"physical":0,"judicial":3,"p_status":["free","unknown","detained","-","-","restricted activity","other"],"targeted_content":["-","-","post on web-based repository or hosting service [project pm chat room]","social media platform [facebook]","social media platform [facebook]","digital activism","blog (individual)"],"threat_source":["-","american government","american government","american government","social media users, facebook","american government","butler university"],"threat_source_cat":["-","state authority","state authority","state authority","non-state actor","state authority","other"]},"United States Minor Outlying Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Uruguay":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Uzbekistan":{"intimidation":0,"interference":0,"physical":0,"judicial":1,"p_status":["-"],"targeted_content":["original art or images"],"threat_source":["uzbekistan government"],"threat_source_cat":["state authority"]},"Vanuatu":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Venezuela":{"intimidation":10,"interference":6,"physical":1,"judicial":24,"p_status":["free","free","detained","other","suspended sentence","unknown","detained","detained","imprisoned","unknown","detained","imprisoned","unknown","-","free","detained","unknown","-","free","-","-","detained","-","other","detained","unknown"],"targeted_content":["-","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","-","-","-","social media platform [twitter]","social media platform [twitter]","-","social media platform [twitter]","social media platform [twitter]","-","social media platform [twitter]","-","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [twitter]","social media platform [facebook]","social media platform [twitter]","social media platform [twitter]","-"],"threat_source":["national intelligence","sebin","venezuelan government","sebin","(sebin) bolivarian national intelligence service","n33 (hackers)","national intelligence","venezuelan government","sebin","national intelligence","sebin","sebin","national intelligence","sebin","national intelligence","venezuelan government","sebin","scientific penal and criminal investigation corps (cicpc)","sebin","intelligence officers","venezuelan government","sebin","interior and justice ministry","national intelligence","sebin","national intelligence"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","non-state actor","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Vietnam":{"intimidation":5,"interference":2,"physical":6,"judicial":33,"p_status":["free","free","imprisoned","imprisoned","-","detained","imprisoned","imprisoned","imprisoned","imprisoned","imprisoned","imprisoned","imprisoned","imprisoned","detained","imprisoned","free","imprisoned","imprisoned","imprisoned","imprisoned","-","imprisoned","free","free","imprisoned","awaiting trial","awaiting trial","awaiting trial","imprisoned","imprisoned","imprisoned","on trial","-","imprisoned","-"],"targeted_content":["-","-","","-","blog (individual)","-","-","-","-","-","blog (individual)","-","blog (individual)","-","blog (individual)","blog (individual)","-","blog (individual)","non-original art or images","-","-","blog (individual)","-","-","-","-","-","-","-","-","-","blog (individual)","-","-","-","blog (individual)"],"threat_source":["vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","ho chi minh city court","vietnamese government","ho chi minh city court","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","vietnamese government","ho chi minh city court","vietnamese government","opinion shapers... government online army","vietnamese government","vietnamese government"],"threat_source_cat":["state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority","state authority"]},"Wallis and Futuna Islands":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Western Sahara":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Yemen":{"intimidation":1,"interference":1,"physical":3,"judicial":0,"p_status":["arrested","disappeared","-"],"targeted_content":["website","-","-"],"threat_source":["","houthi rebels","yemeni military police"],"threat_source_cat":["state authority","non-state actor","state authority"]},"Yugoslavia":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]},"Zambia":{"intimidation":2,"interference":3,"physical":1,"judicial":3,"p_status":["free","detained","awaiting trial","detained"],"targeted_content":["-","-","-","-"],"threat_source":["municipal police department, drug enforcement commission, anti-corruption commission and zambia security and intelligence services","zambia government","kazimu sata, son of the president","municipal police department, drug enforcement commission, anti-corruption commission and zambia security and intelligence services"],"threat_source_cat":["state authority","state authority","state authority","state authority"]},"Zimbabwe":{"intimidation":0,"interference":0,"physical":0,"judicial":0,"p_status":[],"targeted_content":[],"threat_source":[],"threat_source_cat":[]}};
var stats = {},
    previousCountries = [],
    barColors = ["#DE8642", "#874C62", "#AF473C"],
    threatColors = ["#DE8642", "#874C62", "#AF473C", "#6C648B"],
    colorMap = {},
    rebuild = jQuery.Event("mouseout"),
    availableColors = barColors;


function parseData (results) {
	var data = results[0];
	
	for(var i=0 ; i < countries.length ; i++) {
		stats[countries[i]] = [];
	}

	for(var i=0 ; i < data.length ; i++) {
		var location = (data[i].country).trim();
		if(location in stats) {
			stats[location].push(data[i]);
		}
	}

	return stats;
}


function initializeGraph1() {	
	var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 660 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    country = $("#country").val()[0],
    countryData = stats[country]
    blockWidth = 30,
    blockHeight = 15;



	var yrs = [{"05": 0}, {"06": 0}, {"07": 0},{"08": 0}, {"09": 0}, {"10": 0}, {"11": 0}, {"12": 0}, {"13": 0}, {"14": 0}, {"15": 0}, {"16": 0}];

	var x = d3.scaleTime()
		.range([0, width-100])
		.domain([new Date('2005'), new Date('2016')]);

    var tickArr = x.ticks(yrs.length),
        tickDistance = x(tickArr[tickArr.length - 1]) - x(tickArr[tickArr.length - 2]);

	var svg = d3.select("#graph1").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    	.attr("transform","translate(" + (margin.left / 3) + "," + margin.top + ")");

    svg.append("g")
    	.attr("class", "axisBottom")
      	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x));

    colorMap[country] = availableColors.pop();

    var z = svg.append("g").attr("transform", "translate(" + (-110) + "," + margin.top + ")");

    var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) { 
      	return "Name: " + d.name 
      	+ "<br>" + "Nationality: " + d.country  
      	+ "<br>" + "Date: " + d.date  
      	+ "<br>" + "Threat Source: " + d.threat_source 
      	+ "<br>" + "Status: " + d.status; 
      });

    svg.call(tool_tip);

    var legend = z.selectAll(".legend")
        .data([country])
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { 
            return "translate(0," + i * 20 + ")"; })
          .style("font", "10px sans-serif");

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .attr("class", "d3-tip")
          .attr("fill", colorMap[country]);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .attr("class", "legend-text")
          .style("color", "white")
          .text(function(d) { return d; });

    if(countryData.length > 0) {

    for (var i=0 ; i < countryData.length ; i++) {
    	var date = countryData[i].date;
    	var year = date;
    	if (date.indexOf("/") != -1) {
    		year = date.slice(date.lastIndexOf("/")+1);
    	}
    	if (year.length == 4) { year = year.slice(2); }

    	var y = parseInt(year);

    	countryData[i]["id"] = "id" + i;
    	
    	svg.append("rect")
    		.data([countryData[i]])
            .attr("x", (tickDistance * (y - 5)) - (blockWidth/2) )
            .attr("y", (415 - (blockHeight * yrs[y-5][year])) - 5)
            .attr("width", blockWidth)
            .attr("height", blockHeight)
            .attr("class", "instanceRect")
            .style("fill", colorMap[country])
            .style("padding-bottom", "5px")
            .style("stroke", "#ddd")
            .style("opacity", "0.9")
            .style("border", "2px solid #ddd");

        yrs[y-5][year] += 1;
    	
    }

    for(key in yrs) {
        if(yrs[key] > 20) {
            d3.select(".instanceRect").attr("height", (blockHeight/3))
        }
    }

    svg.selectAll(".instanceRect")
      .attr("class", "rect")
      .on("mouseover", tool_tip.show)
      .on("mouseout", tool_tip.hide);

    $("#country").chosen().change(function(){
        $(".d3-tip").css("visibility", "hidden");
        updateGraph1();
    });

    function updateGraph1() {

    	svg.selectAll("rect").remove();

        svg.selectAll(".legend").remove();

    	var country = $("#country").val();

    	var yrs = [{"05": 0}, {"06": 0}, {"07": 0},{"08": 0}, {"09": 0}, {"10": 0}, {"11": 0}, {"12": 0}, {"13": 0}, {"14": 0}, {"15": 0}, {"16": 0}];

		if (country) {
			var countryData = [];

            for (var key in colorMap){
                if(!contains(country, key)) {
                    availableColors.push(colorMap[key]);
                    delete colorMap[key];
                }
            }

			for (var i=0 ; i < country.length ; i++) {

                if(!contains(Object.keys(colorMap), country[i])) {
                    colorMap[country[i]] = availableColors.pop();
                }

				for (var k=0 ; k < (stats[country[i].trim()]).length ; k++) {
					countryData.push(stats[(country[i]).trim()][k]);
				}
			}

			var tool_tip = d3.tip()
		      .attr("class", "d3-tip")
		      .offset([-8, 0])
		      .html(function(d) { 
		      	return "Name: " + d.name 
		      	+ "<br>" + "Nationality: " + d.country  
		      	+ "<br>" + "Date: " + d.date  
		      	+ "<br>" + "Threat Source: " + d.threat_source 
		      	+ "<br>" + "Status: " + d.status;
		      });

	    	svg.call(tool_tip);

                var legend = z.selectAll(".legend")
                .data(function(){
                    var legendBoxes = [];
                    for(var i = 0 ; i < country.length ; i++) { legendBoxes.push(country[i]); }
                    return legendBoxes;
                })
                .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function(d, i) { 
                    return "translate(0," + i * 20 + ")"; })
                  .style("font", "10px sans-serif");

                legend.append("rect")
                  .attr("x", width - 18)
                  .attr("width", 18)
                  .attr("height", 18)
                  .attr("fill", function(d){ return colorMap[d]; });

                legend.append("text")
                  .attr("x", width - 24)
                  .attr("y", 9)
                  .attr("dy", ".35em")
                  .attr("text-anchor", "end")
                  .attr("class", "legend-text")
                  .style("fill", "#0A0A0A")
                  .text(function(d) { return d; });

            if(countryData.length > 0) {
	    	
	    	for (var i=0 ; i < countryData.length ; i++) {
		    	var date = countryData[i].date;
		    	var year = date;
		    	var loc = (countryData[i].country).trim();

		    	if (date.indexOf("/") != -1) {
		    		year = date.slice(date.lastIndexOf("/")+1);
		    	}
		    	if (year.length == 4) { year = year.slice(2); }

		    	var y = parseInt(year);

		    	countryData[i]["id"] = "id" + i;

		    	if(y >= 5) {

                svg.append("rect")
                    .data([countryData[i]])
                    .attr("x", (tickDistance * (y - 5)) - (blockWidth/2) )
                    .attr("y", (415 - (blockHeight * yrs[y-5][year])) - 5)
                    .attr("width", blockWidth)
                    .attr("height", blockHeight)
                    .attr("class", "instanceRect")
                    .style("fill", function(){
                        return colorMap[loc];
                    })
                    .style("padding-bottom", "5px")
                    .style("stroke", "#ddd")
                    .style("opacity", "0.9")
                    .style("border", "2px solid #ddd");
		    	
		        yrs[y-5][year] += 1;

		    	}
	    	}
            for(key in yrs) {
                if(yrs[key] > 20) {
                    svg.selectAll(".instanceRect").attr("height", (blockHeight/3))
                }
            }
            }

	    	svg.selectAll("rect")
	    		.attr("class", "rect")
		    	.on("mouseover", tool_tip.show)
	      		.on("mouseout", tool_tip.hide);
	    }
    }
    }
}

function displayGender() {	
	var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 960 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
	
	var country = $("#country").val()[0];

	previousCountries = $("#country").val();

	var countryData = stats[country];

	var svg = d3.select("#gender-info").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom);

    function updateGender() {
    	return null;
    }
}

function initializeGraph2() {	
	var margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = 660 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

	var countryList = $("#country").val(),
        country,
        countryCounts,
        percentPerPixel,
        totalThreats,
        pixelsPerThreat,
        intimX, interX, judX, physX;

    var x = d3.scaleLinear()
        .domain([100, 0])
        .range([width-height, 0]);

    var svg = d3.select("#graph2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", 600 + margin.top + margin.bottom)
    .append("g")
        .attr("transform","translate(" + (margin.left + margin.right) + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "axisBottom")
        .attr("transform", "translate(0," + margin.top + ")")
        .call(d3.axisBottom(x));

    var z = svg.append("g").attr("transform", "translate(" + (-120) + "," + margin.top + ")");
    var t = svg.append("g").attr("transform", "translate(0," + margin.top + ")");

    var legend = z.selectAll(".legend")
        .data(["Intimidation", "Interference", "Judicial", "Physical"])
        .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) { 
                return "translate(0," + i * 20 + ")"; })
            .style("font", "10px sans-serif");

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", function(d){
                if(d == "Intimidation") { return threatColors[0] ;}
                else if(d == "Interference") { return threatColors[1] ;}
                else if(d == "Judicial") { return threatColors[2] ;}
                else { return threatColors[3] ;}
            });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("class", "legend-text")
            .style("color", "white")
            .text(function(d) { return d; });

    $("#threat-type").show();

    for (var i = 0 ; i < countryList.length ; i++) {
    
        country = countryList[i];

        countryData = stats[country];

        if(countryData.length > 0) {

    	countryCounts = counts[country];

        percentPerPixel = (width-height) / 100; 

        totalThreats = counts[country].intimidation + counts[country].interference + counts[country].judicial + counts[country].physical;

        pixelsPerThreat = (width-height) / totalThreats;

        intimX = counts[country].intimidation * pixelsPerThreat;
        interX = counts[country].interference * pixelsPerThreat;
        judX = (counts[country].judicial * pixelsPerThreat);
        physX = (counts[country].physical * pixelsPerThreat);

        intimPercent = ( (counts[country].intimidation / totalThreats) * 100).toFixed(2) ;
        interPercent = ( (counts[country].interference / totalThreats) * 100).toFixed(2) ;
        judPercent = ( (counts[country].judicial / totalThreats) * 100).toFixed(2) ;
        physPercent = ( (counts[country].physical / totalThreats) * 100).toFixed(2) ;

        intimPercent = intimPercent + "% (" + counts[country].intimidation + ") intimidation threats";
        interPercent = interPercent + "% (" + counts[country].interference + ") interference threats";
        judPercent = judPercent + "% (" + counts[country].judicial + ") judicial threats";
        physPercent = physPercent + "% (" + counts[country].physical + ") physical threats";

        svg.append("rect")
            .data([intimPercent])
            .attr("x", 0 )
            .attr("y", 100)
            .attr("width", intimX)
            .attr("height", 50)
            .attr("class","threat-rect")
            .style("fill", threatColors[0])
            .style("padding-bottom", "5px")
            .style("stroke", "#ddd")
            .style("border", "2px solid #ddd");

        
        svg.append("rect")
            .data([interPercent]) 
            .attr("x", intimX)
            .attr("y", 100)
            .attr("width", interX)
            .attr("height", 50)
            .attr("class","threat-rect")
            .style("fill", threatColors[1])
            .style("padding-bottom", "5px")
            .style("stroke", "#ddd")
            .style("border", "2px solid #ddd");

        svg.append("rect")
            .data([judPercent])
            .attr("x", intimX+interX )
            .attr("y", 100)
            .attr("width", judX)
            .attr("height", 50)
            .attr("class","threat-rect")
            .style("fill", threatColors[2])
            .style("padding-bottom", "5px")
            .style("stroke", "#ddd")
            .style("border", "2px solid #ddd");

        svg.append("rect")
            .data([physPercent])
            .attr("x", intimX + interX + judX )
            .attr("y", 100)
            .attr("width", physX)
            .attr("height", 50)
            .attr("class","threat-rect")
            .style("fill", threatColors[3])
            .style("padding-bottom", "5px")
            .style("stroke", "#ddd")
            .style("border", "2px solid #ddd"); 

        svg.append("text")
            .attr("x", 0)
            .attr("y", ((i+1) * 100) - 5)
            .attr("class", "threat-country")
            .text(country)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "#080808");

        }

    }

    var tool_tip = d3.tip()
      .attr("class", "d3-tip")
      .attr("id", "tip")
      .offset([-8, 0])
      .html(function(d) { return d; });

    svg.call(tool_tip);

    
    svg.selectAll(".threat-rect")
      .on("mouseover", tool_tip.show)
      .on("mouseout", tool_tip.hide);

    $("#country").chosen().change(function(){
        updateGraph2();
    });

    function updateGraph2() {

        var countryList = $("#country").val();

        svg.selectAll(".threat-rect").remove();

        svg.selectAll(".d3-tip").remove();

        svg.selectAll(".threat-country").remove();

        if(countryList) {

        for (var i = 0 ; i < countryList.length ; i++) {
    
            country = countryList[i];

            if((stats[country]).length > 0) {
 
            countryCounts = counts[country];

            percentPerPixel = (width-height) / 100;

            totalThreats = counts[country].intimidation + counts[country].interference + counts[country].judicial + counts[country].physical;

            pixelsPerThreat = (width-height) / totalThreats;

            intimX = counts[country].intimidation * pixelsPerThreat;
            interX = counts[country].interference * pixelsPerThreat;
            judX = (counts[country].judicial * pixelsPerThreat);
            physX = (counts[country].physical * pixelsPerThreat);

            intimPercent = ( (counts[country].intimidation / totalThreats) * 100).toFixed(2) ;
            interPercent = ( (counts[country].interference / totalThreats) * 100).toFixed(2) ;
            judPercent = ( (counts[country].judicial / totalThreats) * 100).toFixed(2) ;
            physPercent = ( (counts[country].physical / totalThreats) * 100).toFixed(2) ;

            intimPercent = intimPercent + "% (" + counts[country].intimidation + ") intimidation threats";
            interPercent = interPercent + "% (" + counts[country].interference + ") interference threats";
            judPercent = judPercent + "% (" + counts[country].judicial + ") judicial threats";
            physPercent = physPercent + "% (" + counts[country].physical + ") physical threats";

            svg.append("rect")
                .data([intimPercent])
                .attr("x", 0 )
                .attr("y", ((i+1) * 100))
                .attr("width", intimX)
                .attr("height", 50)
                .attr("class","threat-rect")
                .style("fill", threatColors[0])
                .style("padding-bottom", "5px")
                .style("stroke", "#ddd")
                .attr('stroke-width', '3');

            svg.append("rect")
                .data([interPercent])
                .attr("x", intimX)
                .attr("y", ((i+1) * 100))
                .attr("width", interX)
                .attr("height", 50)
                .attr("class","threat-rect")
                .style("fill", threatColors[1])
                .style("padding-bottom", "5px")
                .style("stroke", "#ddd")
                .attr('stroke-width', '3');

            svg.append("rect")
                .data([judPercent])
                .attr("x", intimX+interX )
                .attr("y", ((i+1) * 100))
                .attr("width", judX)
                .attr("height", 50)
                .attr("class","threat-rect")
                .style("fill", threatColors[2])
                .style("padding-bottom", "5px")
                .style("stroke", "#ddd")
                .attr('stroke-width', '3');

            svg.append("rect")
                .data([physPercent])
                .attr("x", intimX + interX + judX )
                .attr("y", ((i+1) * 100))
                .attr("width", physX)
                .attr("height", 50)
                .attr("class","threat-rect")
                .style("fill", threatColors[3])
                .style("padding-bottom", "5px")
                .style("stroke", "#ddd")
                .attr('stroke-width', '3');

            svg.append("text")
                .attr("x", 0)
                .attr("y", ((i+1) * 100) - 5)
                .attr("class", "threat-country")
                .text(country)
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", "#080808");
            }

        }
        }

        var tool_tip = d3.tip()
          .attr("class", "d3-tip")
          .offset([-8, 0])
          .html(function(d) { return d; });

        svg.call(tool_tip);

        svg.selectAll(".threat-rect")
          .on("mouseover", tool_tip.show)
          .on("mouseout", tool_tip.hide);

    }
}


function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

truncateDecimals = function (number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};



/*
function parseData (results) {
	var data = results[0];
	
	for(var i=0 ; i < countries.length ; i++) {
		//stats[countries[i]] = {"judicial":0, "intimidation":0, "interference":0, "physical":0};
		stats[countries[i]] = [];
	}
	for(var i=0 ; i < data.length ; i++) {
		var location = (data[i].country).trim();
		if(location in stats) {
			if((data[i].judicial).trim() != "-") { stats[location].judicial += 1; }
			if(data[i].physical) { if((data[i].physical).trim() != "-") { stats[location].physical += 1; } }
			if((data[i].interference).trim() != "-") { stats[location].interference += 1; }
			if((data[i].intimidation).trim() != "-") { stats[location].intimidation += 1; }
		}
	}

	for(var i=0 ; i < data.length ; i++) {
		var location = (data[i].country).trim();
		if(location in stats) {
			stats[location].push(data[i]);
		}
	}

	var parsed = JSON.stringify(stats);
	return stats;

	//document.getElementById('threat-number').innerHTML += parsed;
} */




/*function generateCounts(results) {
    var data = results[0];

    for(var i=0 ; i < countries.length ; i++) {
        counts[countries[i]] = {"intimidation":0, "interference":0, "physical":0, "judicial":0, 
        "p_status":[], "targeted_content":[], "threat_source":[], "threat_source_cat":[]};
    }

    for(var i=0 ; i < data.length ; i++) {
        var location = (data[i].country).trim();
        if(location in counts) {
            if((data[i].intimidation).trim() != "" && (data[i].intimidation).trim() != "-") counts[location].intimidation ++ ;
            if((data[i].interference).trim() != "" && (data[i].interference).trim() != "-") counts[location].interference ++ ;
            if((data[i].judicial).trim() != "" && (data[i].judicial.trim()) != "-") counts[location].judicial ++ ;
            if((data[i].physical).trim() != "" && (data[i].physical.trim()) != "-") counts[location].physical ++ ;

            counts[location].p_status.push((data[i].status).trim());
            counts[location].targeted_content.push((data[i].targeted_content).trim());
            counts[location].threat_source.push((data[i].threat_source).trim());
            counts[location].threat_source_cat.push((data[i].threat_source_cat).trim());

        }
    }

    var parsed = JSON.stringify(counts);
    document.getElementById('threat-counts').innerHTML += parsed;
    return stats;


    barColors = ["#0F9FB4", "#0FB493", "#152737", ],
    threatColors = ["#152737", "#0F9FB4", "#0FB493", "#C9E1C1"],

}*/


