/*
|---------------------------------------------------------------------
|	smoke v2.0
|	Copyright 2013-2014 Alfredo Barron.
|	http://alfredobarron.com/smoke
|---------------------------------------------------------------------
*/

(function($) {


/*
|---------------------------------------------------------------------
|   Validate all inputs
|---------------------------------------------------------------------
*/
$.fn.smkValidate = function() {

	// Se inicializan las variables globales
	var self = '';
	var father = '';
	var result = false;

	// Se crea el mensaje de error para los input vacíos
	var textEmpty = 'Campo requerido';
	// Se crea el mensaje de error para el input email
	var textEmail = 'Ingresa una cuenta de correo valida';
	// Se crea el mensaje de error para el input number
	var textNumber = 'Solo se admiten números';
	// Se crea el mensaje de error para el input alphanumeric
	var textAlphanumeric = 'Solo se admiten números y/o letras';
	// Se crea el mensaje de error para el input currency
	var textCurrency = 'Ingresa una cantidad monetaria valida';
	// Se crea el mensaje de error para el input select
	var textSelect = 'Es necesario que selecciones una opción';
	// Se crea el mensaje de error para el input checkbox
	var textCheckbox = 'Es necesario que selecciones una opción';

	// Se recorren todos los inputs del formulario
	$(':input', this).each(function(k,v) {

		if($(v).attr('type') != 'button'){
			// Se obtiene el objeto input
			self = $(v);
			// Se obtiene el elemento padre
			father = $(v).parents('.form-group');
			// Se obtiene el name
			var name = $(v).attr('name');
			// Se obtiene el value
			var value = $(v).val();
			// Se obtiene el type
			var type = $(v).attr('type');
			// Se obtiene el type smk
			var smkType = $(v).attr('smk-type');
			// Se obtiene el tag
			var tag = v.tagName.toLowerCase();
			// Se obtiene el requerido
			var required = $(v).attr('required');
			// Se obtiene el mensaje de error
			//var smkText = $(v).attr('smk-text');
			// Se obtiene el nivel de la fuerza de la contraseña 1, 2, 3
			var smkStrongPass = $(v).attr('smk-strongPass');
			// Se obtiene el valor de longitud menor aceptada
			var minlength = $(v).attr('minlength');
			// Se obtiene el valor de longitud mayor aceptada
			var maxlength = $(v).attr('maxlength');

			// Se crea el mensaje de error para longitud de caracteres
			var textLength = 'El numero de caracteres debe ser igual a <b>' + maxlength + '</b>';
			// Se crea el mensaje de error para rango de caracteres
			var textRange = 'El numero de caracteres debe ser mayor a <b>' + (minlength-1) + '</b> y menor a <b>' + (parseInt(maxlength)+1) + '</b>';

			// Se remueve el mensaje de error
			$.smkRemoveError(self);

			// Se validan los INPUTS que son requeridos
			if (required === 'required' && (type === 'text' || tag === 'textarea' || type === 'password' || type === 'email')) {
				// Se valida que el value del input no este vació
				if (value === '') {
					// Se agrega el mensaje de error
					result =  $.smkAddError(self, textEmpty);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input EMAIL
			if (required === 'required' && type === 'email') {
				//Se crea la expresión regular para el input mail
				var emailRegex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
				// Se valida que el value del input cumpla con la expresión regular
				if (!emailRegex.test(value)) {
					// Se agrega el mensaje de error
					result =  $.smkAddError(self, textEmail);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input PASSWORD
			if (required === 'required' && type === 'password') {
				var strongPassRegex = '';
				var textPass = '';
				// Se obtiene el nivel de fuerza de la contraseña
				switch (smkStrongPass) {
					case ('weak'):// Debe contener al menos 4 caracteres
						strongPassRegex = /^(?=.*[a-z0-9])\w{6,}$/;
						textPass = 'Mínimo 6 caracteres';
					break;
					case ('medium'):// Debe contener al menos 6 caracteres y un numero
						strongPassRegex = /^(?=.*\d)(?=.*[a-z])\w{6,}$/;
						textPass = 'Mínimo 6 caracteres y un numero';
					break;
					case ('strong'):// Debe contener al menos 6 caracteres, un numero y una mayúscula
						strongPassRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
						textPass = 'Mínimo 6 caracteres un numero y una mayúscula';
					break;
					default:// Debe contener al menos 4 caracteres
						strongPassRegex = /^(?=.*[a-z0-9])\w{4,}$/;
						textPass = 'Mínimo 4 caracteres';
				}
				// Se valida que el value del input cumpla con la expresión regular
				if (!strongPassRegex.test(value)) {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textPass);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input SELECT
			if (required === 'required' && tag === 'select') {
				// Se valida que el value del select no este vació
				if (value === '') {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textSelect);
					return false;
				} else {
					result = true;
				}
			}

			// Se validan los input RADIO y/o CHECKBOX
			if (required === 'required' && type === 'radio' || type === 'checkbox') {
				var check = $("input[name=" + name + "]:checked").val();
				//var check = self.is(':checked');
				// Se valida que el value del input este ckecked
				if (check === undefined) {
				//if (check === false) {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textCheckbox);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input NUMBER
			if (smkType === 'number') {
				// Se crea la expresión regular para el input number
				var numberRegex = /^([0-9])*$/;
				// Se valida que el value del input cumpla con la expresión regular
				if (!numberRegex.test(value)) {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textNumber);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input ALPHANUMERIC
			if (smkType === 'alphanumeric') {
				// Se crea la expresión regular para el input alphanumeric
				var alphanumericRegex = /^[a-z0-9]+$/i;
				// Se valida que el value del input cumpla con la expresión regular
				if (!alphanumericRegex.test(value)) {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textAlphanumeric);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input CURRENCY
			if (smkType === 'currency') {
				// Se crea la expresión regular para el input currency con $ al inicio
				//var currencyRegex = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/;
				// Se crea la expresión regular para el input currency
				var currencyRegex = /^(?:\d+|\d{1,3}(?:,\d{3})*)(?:\.\d{1,2}){0,1}$/;
				// Se valida que el value del input cumpla con la expresión regular
				if (!currencyRegex.test(value)) {
					// Se agrega el mensaje de error
					result = $.smkAddError(self, textCurrency);
					return false;
				} else {
					result = true;
				}
			}

			// Se valida el input longitud o rango de caracteres MINLENGTH o MAXLENGTH
			if ((typeof(minlength) !== 'undefined' || typeof(maxlength) !== 'undefined')) {
				// Si contiene ambos y son iguales
				if (minlength === maxlength) {
					if ((value.length != minlength) && (value.length != maxlength)) {
						// Se agrega el mensaje de error
						result = $.smkAddError(self, textLength);
						return false;
					} else {
						result = true;
					}
				// Si contiene ambos y son diferentes
				} else if (minlength !== maxlength) {
					if ((value.length < minlength) || (value.length > maxlength)) {
						// Se agrega el mensaje de error
						result = $.smkAddError(self, textRange);
						return false;
					} else {
						result = true;
					}
				}
			}
			/*
			|---------------------------------------------------------------------
			|	FALTAN INPUTS POR VALIDAR
			|---------------------------------------------------------------------
			*/
		}
	});

	// Si se teclea algo en el input se remueven los mensajes de error
	$(self).keyup(function() {
		// Se valida que el value del input no este vació
		if (self.val() !== '') {
			// Se remueve el mensaje de error
			$.smkRemoveError(self);
		}
	});
	// Si cambia el input select se remueven los mensajes de error
	$(self).change(function() {
		// Se valida que el value del input no este vació
		if (self.val() !== '') {
			// Se remueve el mensaje de error
			$.smkRemoveError(self);
		}
	});
	//Se retorna el resultado
	return result;
};
/*
|---------------------------------------------------------------------
|	Usage
|	if($('#form').smkValidate()){}
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Validate Equal passwords
|---------------------------------------------------------------------
*/
$.smkEqualPass = function(password, repassword) {

	// Se crea el mensaje de error para el input repassword
	var textEqualPass = 'Las contraseñas no coinciden';

	if($(password).val() !== undefined){
		password = $(password).val();
	}else{
		password = password;
	}

	// Si los password son diferentes se retorna false
	if (password !== $(repassword).val()) {
		// Se agrega el mensaje de error
		return $.smkAddError($(repassword), textEqualPass);
	// Si los passwords son iguales se retorna true
	} else {
		return true;
	}

	// Si se teclea algo en el input se remueven los mensajes de error
	$(repassword).keyup(function() {
		if ($(this).val() !== '') {
			// Se remueve el mensaje de error
			$.smkRemoveError( $(repassword) );
		}
	});
};
/*
|---------------------------------------------------------------------
|   Usage
|   if($.smkEqualPass('#form #password', '#form #repassword')){}
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Clear form
|---------------------------------------------------------------------
*/
$.fn.smkClear = function(options) {
	// Variables default
	var settings = $.extend({
		noClear: ''
	}, options);
	// Se eliminan los espacios en blanco de la variable settings.noClear
	var noClearSinEspacios = settings.noClear.replace(/\s/g, '');
	// Se quiebra la variable noClearSinEspacios para obtener sus valores y se agregan en el array noClear
	var noClear = noClearSinEspacios.split(',');
	// Se recorren todos los inputs del form
	return $(':input', this).each(function() {
		//Se obtiene el type y el tag del input
		var type = this.type;
		var tag = this.tagName.toLowerCase();
		//Si el tag trae el valor 'input' se sustituye por el valor type
		if (tag == 'input') {
			tag = type;
		}
		//Si el type o el tag del input no existen en el array noClean se limpia
		if ($.inArray(type, noClear) < 0 && $.inArray(tag, noClear) < 0) {
			//Se compara el type y se limpia
			switch (type) {
			case 'text':
			case 'password':
			case 'email':
			case 'number':
			case 'hidden':
				this.value = '';
				break;
			case 'checkbox':
			case 'radio':
				this.checked = false;
				break;
			}
			//Se compara el tag y se limpia
			switch (tag) {
			case 'textarea':
				this.value = '';
				break;
			case 'select':
				this.selectedIndex = -1;
				break;
			}
			/*
			|---------------------------------------------------------------------
			|	FALTAN INPUTS POR LIMPIAR
			|---------------------------------------------------------------------
			*/		}
	});
	//$(this)[0].reset();
};
/*
|---------------------------------------------------------------------
|   Usage
|	$('#form').smkClear({noClear: 'email,radio,...'});
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Se crea el método que agrega el mensaje de error
|---------------------------------------------------------------------
*/
$.smkAddError = function (obj, text)
{
	// Se obtiene el elemento padre
	var parent = $(obj).parents('.form-group');
	// Se obtiene el type
	var type = $(obj).attr('type');
	// Se obtiene el tag
	var tag = $(obj).prop('tagName').toLowerCase();
	// Se obtiene el mensaje de error
	var smkText = $(obj).attr('smk-text');

	// Si el input no contiene mensaje de error se asigna uno
	if (smkText === '' || smkText === undefined) {
		smkText = text;
	}

	// Se type es indefinido se asigna el nombre del tag
	if(type === undefined){
		type = tag;
	}

	// Se crea el template del mensaje de error
	var icon = '<span class="glyphicon glyphicon-remove-sign form-control-feedback smk-error-icon"></span>';
	var msj = '<span class="smk-error-text">' + smkText + '</span>';

	if(type == 'select'){
		// Se agrega la clase de error
		parent.addClass('has-feedback has-error smk-' + type);
		// Se agrega el icono y el mensaje de error
		parent.append(icon + msj);
	} else if(type == 'checkbox'){
		// Se agrega la clase de error
		parent.addClass('has-feedback has-error smk-' + type);
		// Se agrega el icono y el mensaje de error
		parent.children().append(msj);
	}else if(type == 'radio'){
		// Se agrega la clase de error
		parent.addClass('has-feedback has-error smk-' + type);
		// Se agrega el icono y el mensaje de error
		parent.append(msj);
	}else{
		// Se agrega la clase de error
		parent.addClass('has-feedback has-error');
		// Se agrega el icono y el mensaje de error
		parent.append(icon + msj);
	}
	// Se posiciona el focus en el input
	obj.focus();
	// Se retorna false
	return false;
};
/*
|---------------------------------------------------------------------
|   Se crea el método que remueve el mensaje de error
|---------------------------------------------------------------------
*/
$.smkRemoveError = function(obj)
{
	// Se obtiene el elemento padre
	var parent = $(obj).parents('.form-group');
	// Se remueven el icono y el mensaje de error
	parent.find('.smk-error-text, .smk-error-icon').remove();
	// Se remueve la clase de error
	parent.removeClass('has-error has-feedback');
	// Se retorna false
	return false;
};






/*
|---------------------------------------------------------------------
|   Alerts
|---------------------------------------------------------------------
*/
var smkAlertInizialize = 0;
// Se crea la funcion smkAlert
$.smkAlert = function(options) {

	// Variables default
	var settings = $.extend({
		text: 'Hello World',
		type: 'warning',
		icon: 'glyphicon-exclamation-sign',
		time: 5,
		permanent: false
	}, options);

	smkAlertInizialize++;

	// Se compara el tipo de alerta y se asigna la clase
	switch (settings.type) {
	case 'warning':
		settings.type = 'alert-warning';
		settings.icon = 'glyphicon-exclamation-sign';
		break;
	case 'success':
		settings.type = 'alert-success';
		settings.icon = 'glyphicon-ok-sign';
		break;
	case 'danger':
		settings.type = 'alert-danger';
		settings.icon = 'glyphicon-remove-sign';
		break;
	case 'info':
		settings.type = 'alert-info';
		settings.icon = 'glyphicon-info-sign';
		break;
	}

	// Se agrega el contenedor de las alertas en el body
	if(smkAlertInizialize == 1){
		$('body').append('<div class="smk-alert-content"></div>');
	}
	// Se crea la alerta en el contenedor
	var obj = $('<div class="alert alert-dismissable ' + settings.type + ' smk-alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="glyphicon ' + settings.icon + '"></span>' + settings.text + '</div>');

	$('.smk-alert-content').prepend(obj);

	// Se aplica la animación de entrada a la alerta
	obj.animate({
		opacity: '1',
		marginTop:'20px',

	}, 300);

	// Si el mensaje no es permanente
	if(settings.permanent === false){
		var timer = 0;
		// Si se posiciona el cursor en la alerta se restablece el TimeOut
		$(obj).mouseenter(function(){
			clearTimeout(timer);
		// Si sale el cursor de la alerta se ejecuta el método smkAlertHide
		}).mouseleave(function(){
			smkAlertHide();
		});

		smkAlertHide();
	}

	// Se crea el método que elimina la alerta del contenedor
	function smkAlertHide(){
		timer = setTimeout(function() {
			obj.animate({
				opacity: '0',
				marginLeft: '100px',
				marginRight: '-100px'
			}, 300, function() {
				obj.remove();
			});
		}, (settings.time * 1000) );
	}

};
/*
|---------------------------------------------------------------------
|   Usage
|   $.smkAlert({ text: 'Hello world', type: 'success', time: 5 });
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Confirmation
|---------------------------------------------------------------------
*/
$.smkConfirmation = function(text, callback) {
	// Se agrega el panel de confirmacion en el body
	$('body').append('<div class="smk-confirmation-back"><div class="panel panel-default smk-confirmation"><div class="panel-body"><br>' + text + '<br><br></div><div class="panel-footer text-right"><a class="btn btn-default btn-sm smk-cancel" href="#" >Cancel</a> <a class="btn btn-primary btn-sm smk-accept" href="#">Accept</a></div></div></div>');
	// Se aplica la animacion de entrada del panel de confirmacion
	$('.smk-confirmation').animate({
		top: "-5px",
		opacity: '1'
	}, 400);
	// Si se presiona el boton .smk-cancel se retorna false
	$('.smk-cancel').click(function(e) {
		e.preventDefault();
		smkConfirmationHide();
		callback(false);
	});
	// Si se presiona el boton .smk-accept se retorna true
	$('.smk-accept').click(function(e) {
		e.preventDefault();
		smkConfirmationHide();
		callback(true);
	});
	// Se remueve el panel de confirmacion del body
	function smkConfirmationHide(){
		$('.smk-confirmation-back').fadeOut(200, function() {
			$('.smk-confirmation-back').remove();
		});
		$('.smk-confirmation').animate({
			top: "-500px",
			opacity: '0'
		}, 400, function() {
			$('.smk-confirmation').remove();
		});
	}
};
/*
|---------------------------------------------------------------------
|   Usage
|   $.smkConfirmation('are you sure?', function(e){if(e){
|	  // Code here
|   }});
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Currency
|---------------------------------------------------------------------
*/
$.smkCurrency = function(number, prefix) {
	var num = number.replace(',', '');
	if(num !== ''&& !isNaN(num)){
		num = Math.round(parseFloat(num) * Math.pow(10, 2)) / Math.pow(10, 2);
		prefix = prefix || '';
		num += '';
		var splitStr = num.split('.');
		var splitLeft = splitStr[0];
		var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '.00';
		splitRight = splitRight + '00';
		splitRight = splitRight.substr(0, 3);
		var regx = /(\d+)(\d{3})/;
		while (regx.test(splitLeft)) {
			splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
		}
		return prefix + splitLeft + splitRight;
	}else{
		return 0;
	}
};
/*
|---------------------------------------------------------------------
|   Usage
|	var currency = $.smkCurrency(10000, '$');
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   GetURL
|---------------------------------------------------------------------
*/
$.smkGetURL = function(folder) {
	//Se obtiene el protocolo http o https
	var protocol = $(location).attr('protocol');
	//Se obtiene el nombre del servidor o dominio
	var hostname = $(location).attr('hostname');
	//Se obtiene la o las subcarpetas
	var pathname = $(location).attr('pathname');
	//Se explota el pathname para obtener todos sus elementos separados por /
	pathname = pathname.split('/');
	//Se obtiene el ultimo elemento
	var last = pathname.pop();
	//Si el ultimo elemento no esta vacio
	if (last !== '') {
		//Se explota el ultimo elemento
		file = last.split('.');
		//Si el ultimo elemento no es un archivo
		if (file.length < 2) {
			//Se agrega el ultimo elemento
			pathname.push(last);
		}
	}
	//Se dejan unicamente el numero de folders que se obtienen de la variable folders
	pathname = pathname.slice(0, folder + 1);
	//Se unen los elementos de el pathname separados por /
	pathname = pathname.join('/');
	//Se unen los elementos que forman la url
	var url = protocol + '//' + hostname + pathname;
	//Se retorna la url
	return url;
};
/*
|---------------------------------------------------------------------
|   Usage
|	var url = $.smkGetURL(1);
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   Date
|---------------------------------------------------------------------
*/
$.smkDate = function(options) {
	//Variables default
	var settings = $.extend({
		date: new Date(),
		format: 'yyyymmdd hhmmss',
		lang: 'en',
		separatorDate: '-',
		separatorTime: ':'
	}, options);

	var date = new Date(settings.date);

	var monthNames = [];

	//Se obtiene el dia
	var dd = date.getDate();
	//Se obtiene el mes
	var mm = date.getMonth() + 1; //January is 0!
	//Se obtiene el año
	var yyyy = date.getFullYear();
	//Se obtiene el año 2 digitos
	var yy = yyyy.toString().substring(2);

	//Se obtiene la hora
	var hh = date.getHours();
	//Se obtienen los minutos
	var mi = date.getMinutes();
	//Se obtienen los segundos
	var ss = date.getSeconds();

	//Si el dia es menor que 10 se agrega 0 al inicio
	if (dd < 10) {
		dd = '0' + dd;
	}
	//Si el mes es menor que 10 se agrega 0 al inicio
	if (mm < 10) {
		mm = '0' + mm;
	}

	//Si los minutos son menor que 10 se agrega 0 al inicio
	if (mi < 10) {
		mi = '0' + mi;
	}
	//Si los segundos son menor que 10 se agrega 0 al inicio
	if (ss < 10) {
		ss = '0' + ss;
	}

	//Se muestran los meses segun el lenguaje
	if (settings.lang == 'es') {

		if (settings.format == 'yyyyMdd' || settings.format == 'yyMdd' || settings.format == 'ddMyyyy' | settings.format == 'ddMyy') {
			monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
		} else {
			monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		}
	} else {
		if (settings.format == 'yyyyMdd' || settings.format == 'yyMdd' || settings.format == 'ddMyyyy' | settings.format == 'ddMyy') {
			monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		} else {
			monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		}
	}

	//Se construye el formato para base de datos 0000-00-00 00:00:00
	//Se retorna la fecha formateada
	switch (settings.format) {
	case "yyyymmdd hhmmss":
		return yyyy + settings.separatorDate + mm + settings.separatorDate + dd + ' ' + hh + settings.separatorTime + mi + settings.separatorTime + ss;
	case "yyyymmdd":
		return yyyy + settings.separatorDate + mm + settings.separatorDate + dd;
	case "yyyyMMdd":
		return yyyy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
	case "yyyyMdd":
		return yyyy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
	case "yymmdd":
		return yy + settings.separatorDate + mm + settings.separatorDate + dd;
	case "yyMMdd":
		return yy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
	case "yyMdd":
		return yy + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + dd;
	case "ddmmyyyy":
		return dd + settings.separatorDate + mm + settings.separatorDate + yyyy;
	case "ddMMyyyy":
		return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yyyy;
	case "ddMyyyy":
		return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yyyy;
	case "ddmmyy":
		return dd + settings.separatorDate + mm + settings.separatorDate + yy;
	case "ddMMyy":
		return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yy;
	case "ddMyy":
		return dd + settings.separatorDate + monthNames[date.getMonth()] + settings.separatorDate + yy;
	}
};
/*
|---------------------------------------------------------------------
|   Usage
|	var today = $.smkDate({date:new Date(), format:'yyyymmdd', lang: 'es', separatorDate:'-', separatorTime:':'});
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   DateDiff
|---------------------------------------------------------------------
*/
$.smkDateDiff = function(options) {
	//Variables default
	var settings = $.extend({
		fromDate: new Date(),
		toDate: new Date(),
		interval: 'days'
	}, options);
	var second = 1000,
		minute = second * 60,
		hour = minute * 60,
		day = hour * 24,
		week = day * 7;
	var fromDate = new Date(settings.fromDate);
	var toDate = new Date(settings.toDate);
	var timediff = toDate - fromDate;
	if (isNaN(timediff)) return NaN;
	switch (settings.interval) {
		case "years":
			return toDate.getFullYear() - fromDate.getFullYear();
		case "months":
			return ((toDate.getFullYear() * 12 + toDate.getMonth()) - (fromDate.getFullYear() * 12 + fromDate.getMonth()));
		case "weeks":
			return Math.floor(timediff / week);
		case "days":
			return Math.floor(timediff / day);
		case "hours":
			return Math.floor(timediff / hour);
		case "minutes":
			return Math.floor(timediff / minute);
		case "seconds":
			return Math.floor(timediff / second);
		default:
			return undefined;
	}
};
/*
|---------------------------------------------------------------------
|   Usage
|	var dif = $.smkDateDiff({fromDate:'01/01/2013 12:00:00', toDate:'12/31/2014 12:30:00', interval:'days'});
|---------------------------------------------------------------------
*/






/*
|---------------------------------------------------------------------
|   SmokeScrolling
|---------------------------------------------------------------------
*/
$.smkScrolling = function(options) {
	//Variables default
	var settings = $.extend({
		speed: 1000
	}, options);
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, settings.speed);
				return false;
			}
		}
	});
};
/*
|---------------------------------------------------------------------
|   Usage
|	$.smkScrolling({speed:1000});
|---------------------------------------------------------------------
*/


})(jQuery);