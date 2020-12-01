function getDatosCliente1() {
   var lista = [];
    var regimen = document.getElementById('regimen').value;
    lista.push(regimen);
    var rvgl = (document.getElementById('rvgl').value);
    lista.push(rvgl);
    var analista = document.getElementById('analista').value;
    lista.push(analista);
    var fechaVisita = document.getElementById('fechaVisita').value;
    lista.push(fechaVisita);
    var oficinas = document.getElementById('oficina').value;
    lista.push(oficinas);
    var tipoCliente = document.getElementById('tipoCliente').value;
    lista.push(tipoCliente);
    var razonSocial = document.getElementById('razonSocial').value;
    lista.push(razonSocial);
    var ruc = (document.getElementById('ruc').value);
    lista.push(ruc);
    var ubicacion = document.getElementById('ubicacion').value;
    lista.push(ubicacion);
    var aExp = (document.getElementById('aExp').value);
    lista.push(aExp);
    var nroPtosVta = (document.getElementById('nroPtosVta').value);
    lista.push(nroPtosVta);
    var nroAlmacenes = (document.getElementById('nroAlmacenes').value);
    lista.push(nroAlmacenes);
    lista.push("");
    var actividad = document.getElementById('actividad').value;
    lista.push(actividad);
    var actEspecifica = document.getElementById('actEspecifica').value;
    lista.push(actEspecifica);
    var buro = document.getElementById('buro').value;
    lista.push(buro);
    var nroEnt = (document.getElementById('nroEnt').value);
    lista.push(nroEnt);
    var edadRL = (document.getElementById('edadRL').value);
    lista.push(edadRL);
    if (edadRL < 18) {
        alert("El representante legal debe ser mayor de edad");
    return null;
    }
    return lista;
}
function getDatosCliente() {
    var lista = [];
    var regimen = document.getElementById('regimen').value;
    lista.push(regimen);
    var rvgl = (document.getElementById('rvgl').value);
    lista.push(rvgl);
    var analista = document.getElementById('analista').value;
    lista.push(analista);
    var fechaVisita = document.getElementById('fechaVisita').value;
    lista.push(fechaVisita);
    var oficinas = document.getElementById('oficina').value;
    lista.push(oficinas);
    var tipoCliente = document.getElementById('tipoCliente').value;
    lista.push(tipoCliente);
    var razonSocial = document.getElementById('razonSocial').value;
    lista.push(razonSocial);
    var ruc = (document.getElementById('ruc').value);
    lista.push(ruc);
    var ubicacion = document.getElementById('ubicacion').value;
    lista.push(ubicacion);
    var aExp = (document.getElementById('aExp').value);
    lista.push(aExp);
    var nroPtosVta = (document.getElementById('nroPtosVta').value);
    lista.push(nroPtosVta);
    var nroAlmacenes = (document.getElementById('nroAlmacenes').value);
    lista.push(nroAlmacenes);
    lista.push("");
    var actividad = document.getElementById('actividad').value;
    lista.push(actividad);
    var actEspecifica = document.getElementById('actEspecifica').value;
    lista.push(actEspecifica);
    var buro = document.getElementById('buro').value;
    lista.push(buro);
    var nroEnt = (document.getElementById('nroEnt').value);
    lista.push(nroEnt);
    var edadRL = (document.getElementById('edadRL').value);
    lista.push(edadRL);
    if (regimen == "" || rvgl == 0 || fechaVisita == "" || oficinas == "" || tipoCliente == "" ||
        razonSocial == "" || ruc == 0 || ubicacion == "" || aExp == "" || nroPtosVta == "" || nroAlmacenes == "" ||
        actividad == "" || actEspecifica == "" || buro == "" || nroEnt == "" || edadRL == "") {
        alert("Falta completar todos los datos del cliente");
        return null;
    }
    if (edadRL < 18) {
        alert("El representante legal debe ser mayor de edad");
        return null;
    }
    return lista;
}
function getIngresos(){
    var lista = [];
    lista.push(document.getElementById("util_bruta_Total").value);
    lista.push(document.getElementById("ventas_x_prod_Total").value);
    lista.push(document.getElementById("Ventas_Total").value);
    lista.push(document.getElementById("margen_bruto").value);
    lista.push(document.getElementById("margen_bruto_referencial").value);
    lista.push(document.getElementById("declarado").value);
    lista.push(document.getElementById("informalidad").value);

    var table = document.getElementById("tablaProductos");
    var total = table.rows.length-2;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i +1;
        var Prod = document.getElementById("Prod"+idx).value;
        lista.push(Prod);
        var unidades_vendidas = convNro(document.getElementById("unidades_vendidas_"+idx).value);
        lista.push(unidades_vendidas);
        var unidades_x_presentacion = document.getElementById("unidades_x_presentacion_"+idx).value;
        lista.push(unidades_x_presentacion);

        var pcompra = convNro(document.getElementById("pcompra_"+idx).value);
        lista.push(pcompra);
        var pventa = convNro(document.getElementById("pventa_"+idx).value);
        lista.push(pventa);
        var util_bruta = convNro(document.getElementById("util_bruta_"+idx).value);
        lista.push(util_bruta);
        var ventas_x_prod = convNro(document.getElementById("ventas_x_prod_"+idx).value);
        lista.push(ventas_x_prod);
    }
    
    return lista;   
}
function getEgresos(){
    var lista = [];
    
    lista.push(document.getElementById("miembros").value);
        lista.push(document.getElementById("gastos_implicitos").value);
        lista.push(document.getElementById("alquiler").value);
        lista.push(document.getElementById("deuda_personal").value);
        lista.push(document.getElementById("otros_personal").value);
        lista.push(document.getElementById("total_gastpersonal").value);

        lista.push(document.getElementById("planilla").value);
        lista.push(document.getElementById("num_planilla_comercio").value);
        lista.push(document.getElementById("sueldo_planilla_comercio").value);
        lista.push(document.getElementById("total_planilla_comercio").value);
        lista.push(document.getElementById("gastop_comercio_1").value);
        lista.push(document.getElementById("gastop_comercio_2").value);
        lista.push(document.getElementById("gastop_comercio_3").value);
        lista.push(document.getElementById("gastop_comercio_4").value);
        lista.push(document.getElementById("gastop_comercio_5").value);
        lista.push(document.getElementById("total_gastop_comercio").value);
    
    return lista;
}
function AgregarProducto() {
    var table = document.getElementById("tablaProductos");
    var idx = table.rows.length - 1;
    if(idx < 11){
        var row = table.insertRow(idx);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = '<input class="form-control" id = "Prod' + idx + '"/>';
        cell2.innerHTML = '<input class="form-control" id="unidades_vendidas_' + idx + '" onkeyup=";validarNumero(id);calcular_ingresos_comercio();"/>';
        cell3.innerHTML = '<select class="form-control" id="unidades_x_presentacion_' + idx + '">' +
                '<option value="0"></option>' +
                '<option value="Galones">Galones</option>' +
                '<option value="Kilos">Kilos</option>' +
                '<option value="Litros">Litros</option>' +
                '<option value="Metros">Metros</option>' +
                '<option value="Pies">Pies</option>' +
                '<option value="Rollos">Rollos</option>' +
                '<option value="Sacos">Sacos</option>' +
                '<option value="Otros">Otros</option>' +
                '</select>';
        cell4.innerHTML = '<input class="form-control" id="pcompra_' + idx + '" onkeyup="validarNumero(id);calcular_ingresos_comercio();"/>';
        cell5.innerHTML = '<input class="form-control" id="pventa_' + idx + '" onkeyup="validarNumero(id);calcular_ingresos_comercio();"/>';
        cell6.innerHTML = '<div id="util_bruta_' + idx + '">';
        cell7.innerHTML = '<div id="ventas_x_prod_' + idx + '">';
    }else{
        alert("Máximo permitido 10 productos");
    }
}
function EliminarProducto() {
    var table = document.getElementById("tablaProductos")
    var idx = table.rows.length - 2
    if (table.rows.length > 3) {
        table.deleteRow(idx);
        calcular_ingresos_comercio();
    }
}
function calcular_ventas_prod(idx) {
    var unidades_vendidas = convNro(document.getElementById("unidades_vendidas_" + idx).value);
    var pventa = convNro(document.getElementById("pventa_" + idx).value);
    var ventas_x_prod = pventa * unidades_vendidas;
    document.getElementById("ventas_x_prod_" + idx).innerHTML = Number(ventas_x_prod).toLocaleString('en');
    document.getElementById("ventas_x_prod_" + idx).value = ventas_x_prod;
    calcular_ventas_prod_Total();
}
function calcular_ventas_prod_Total() {
    var table = document.getElementById("tablaProductos");
    var filas = table.rows.length - 1;
    var ventas_x_prod_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        var unidades_vendidas = convNro(document.getElementById("unidades_vendidas_" + idx).value);
        var pventa = convNro(document.getElementById("pventa_" + idx).value);
        var ventas_x_prod = pventa * unidades_vendidas;
        ventas_x_prod_Total += ventas_x_prod;
    }
    document.getElementById("Ventas_Total").innerHTML = Number(ventas_x_prod_Total).toLocaleString('en');
    document.getElementById("Ventas_Total").value = ventas_x_prod_Total;
    document.getElementById("ventas_x_prod_Total").innerHTML = Number(ventas_x_prod_Total).toLocaleString('en');
    document.getElementById("ventas_x_prod_Total").value = ventas_x_prod_Total;

    document.getElementById("egp_ventas").innerHTML = Number(ventas_x_prod_Total).toLocaleString('en');
    document.getElementById("egp_ventas").value = ventas_x_prod_Total;
}
function calcular_util_bruta(idx) {
    var pcompra = convNro(document.getElementById("pcompra_" + idx).value);
    var pventa = convNro(document.getElementById("pventa_" + idx).value);
    var util_bruta = 0;
    if (pventa != 0) {
        util_bruta = 1 - pcompra / pventa;
    }
    document.getElementById("util_bruta_" + idx).innerHTML = Number(util_bruta).toLocaleString('en');
    document.getElementById("util_bruta_" + idx).value = util_bruta;
    calcular_util_bruta_Total();
}
function calcular_util_bruta_Total() {
    var table = document.getElementById("tablaProductos");
    var filas = table.rows.length - 1;
    var util_bruta_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        var pcompra = convNro(document.getElementById("pcompra_" + idx).value);
        var pventa = convNro(document.getElementById("pventa_" + idx).value);
        var util_bruta = 0;
        if (pventa != 0) {
            util_bruta = 1 - pcompra / pventa;
        }
        util_bruta_Total += util_bruta;
    }
    document.getElementById("util_bruta_Total").innerHTML = Number(util_bruta_Total).toLocaleString('en');
    document.getElementById("util_bruta_Total").value = util_bruta_Total;
}
function calcular_informalidad() {
    var declarado = convNro(document.getElementById("declarado").value);
    var real = convNro(document.getElementById("Ventas_Total").value);
    if (real > 0) {
        var informalidad = Number((1 - declarado / real) * 100).toFixed();
        document.getElementById("informalidad").innerHTML = informalidad + "%";
        document.getElementById("informalidad").value = informalidad;
    } else {
        document.getElementById("informalidad").innerHTML = "";
    }
    var egp_impuestos = declarado * 0.015;
    document.getElementById("egp_impuestos").value = egp_impuestos;
    egp_impuestos = Number(egp_impuestos).toFixed(0);
    document.getElementById("egp_impuestos").innerHTML = Number(egp_impuestos).toLocaleString('en');
}



function calcular_Margen_Utilidad_Bruta() {
    var table = document.getElementById("tablaProductos");
    var filas = table.rows.length - 1;
    var margen_utilidad_bruta = 0
    for (var idx = 1; idx < filas; idx++) {
        var pcompra = convNro(document.getElementById("pcompra_" + idx).value);
        var unidades_vendidas = convNro(document.getElementById("unidades_vendidas_" + idx).value);
        margen_utilidad_bruta += pcompra * unidades_vendidas;
    }
    var Ventas_Total = convNro(document.getElementById("Ventas_Total").value);
    if (Ventas_Total != 0) {
        margen_utilidad_bruta = (1 - (convNro(margen_utilidad_bruta) / Ventas_Total)) * 100;
        document.getElementById("margen_bruto").innerHTML = Number(margen_utilidad_bruta).toFixed() + "%";
        document.getElementById("margen_bruto").value = Number(margen_utilidad_bruta).toFixed();
    }
    var margen_bruto_referencial = convNro(document.getElementById("margen_bruto_referencial").value);
    var egp_costoven = 0;
    if (margen_utilidad_bruta > margen_bruto_referencial) {
        egp_costoven = (100 - margen_bruto_referencial) * Ventas_Total / 100;
    } else {
        egp_costoven = (100 - margen_utilidad_bruta) * Ventas_Total / 100;
    }
    document.getElementById("egp_costoven").innerHTML = Number(Number(egp_costoven).toFixed()).toLocaleString('en');

    document.getElementById("egp_costoven").value = Number(egp_costoven).toFixed();
}

function calcular_ingresos_comercio() {
    var table = document.getElementById("tablaProductos");
    var filas = table.rows.length - 1;
    for (var idx = 1; idx < filas; idx++) {
        calcular_util_bruta(idx);
        calcular_ventas_prod(idx)
    }
    calcular_informalidad();
    calcular_Margen_Utilidad_Bruta();
    Calcular_EEFF();
}
function calcular_planilla_comercio() {
    var num = convNro(document.getElementById("num_planilla_comercio").value);
    var sueldo = convNro(document.getElementById("sueldo_planilla_comercio").value);
    if (num > 0 && sueldo > 0) {
        document.getElementById("total_planilla_comercio").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("total_planilla_comercio").value = Number(num * sueldo);
        document.getElementById("gastop_comercio_1").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("gastop_comercio_1").value = Number(num * sueldo);
    } else {
        document.getElementById("total_planilla_comercio").innerHTML = "";
        document.getElementById("total_planilla_comercio").value = 0;
        document.getElementById("gastop_comercio_1").innerHTML = "";
        document.getElementById("gastop_comercio_1").value = 0;
    }
}

function calcular_gastop_comercio() {
    calcular_planilla_comercio();
    var gastop1 = convNro(document.getElementById("gastop_comercio_1").value);
    var gastop2 = convNro(document.getElementById("gastop_comercio_2").value);
    var gastop3 = convNro(document.getElementById("gastop_comercio_3").value);
    var gastop4 = convNro(document.getElementById("gastop_comercio_4").value);
    var gastop5 = convNro(document.getElementById("gastop_comercio_5").value);
    document.getElementById("total_gastop_comercio").innerHTML = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5).toLocaleString('en');
    document.getElementById("total_gastop_comercio").value = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5);
    document.getElementById("egp_gastop").innerHTML = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5).toLocaleString('en');
    document.getElementById("egp_gastop").value = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5);
    
   var gasto_familiar_provisional=convNro(document.getElementById("total_gastpersonal").value)-convNro(document.getElementById("egp_gastop").value)*0.70;

  if(gasto_familiar_provisional<0){
     document.getElementById("egp_gastfam").value=0;document.getElementById("egp_gastfam").innerHTML=0;
  }else{
     document.getElementById("egp_gastfam").value=Number(Math.round(convNro(gasto_familiar_provisional))).toLocaleString('en');
     document.getElementById("egp_gastfam").innerHTML=Number(convNro(Math.round(gasto_familiar_provisional))).toLocaleString('en');

  }
  
   
    Calcular_EEFF();
}
function calcular_gastopersonal() {
    var gasto1 = convNro(document.getElementById("miembros").value) * 700;
    var gasto2 = convNro(document.getElementById("alquiler").value);
    var gasto3 = convNro(document.getElementById("deuda_personal").value);
    var gasto4 = convNro(document.getElementById("otros_personal").value);

    document.getElementById("gastos_implicitos").innerHTML = Number(gasto1).toLocaleString('en');
    document.getElementById("total_gastpersonal").innerHTML = Number(gasto1 + gasto2 + gasto3 + gasto4).toLocaleString('en');
    document.getElementById("gastos_implicitos").value = Number(gasto1);
    document.getElementById("total_gastpersonal").value = Number(gasto1 + gasto2 + gasto3 + gasto4);

    var gasto_familiar_provisional=convNro(document.getElementById("total_gastpersonal").value)-convNro(document.getElementById("egp_gastop").value)*0.70;

     if(gasto_familiar_provisional<0){
        document.getElementById("egp_gastfam").value=0;document.getElementById("egp_gastfam").innerHTML=0;
     }else{
     document.getElementById("egp_gastfam").value=Number(Math.round(convNro(gasto_familiar_provisional))).toLocaleString('en');
     document.getElementById("egp_gastfam").innerHTML=Number(convNro(Math.round(gasto_familiar_provisional))).toLocaleString('en');

     }
   
   
    Calcular_EEFF();
}


function calcular_valor_declarado(idx) {
    var Metraje = convNro(document.getElementById("Metraje_" + idx).value);
    var Precio = convNro(document.getElementById("Precio_" + idx).value);
    var Val_Inm_Dec = Metraje * Precio;
    document.getElementById("Val_Inm_Dec_" + idx).innerHTML = Number(Val_Inm_Dec).toLocaleString('en');
    document.getElementById("Val_Inm_Dec_" + idx).value = Val_Inm_Dec;
    return convNro(Val_Inm_Dec);
}
function calcular_valor_declarado_Total() {
    var table = document.getElementById("tablaPatrimonioInmueble");
    var filas = table.rows.length - 1;
    var Val_Inm_Dec_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        Val_Inm_Dec_Total += calcular_valor_declarado(idx);
    }
    document.getElementById("Val_Inm_Dec_Total").innerHTML = Number(Val_Inm_Dec_Total).toLocaleString('en');
    document.getElementById("Val_Inm_Dec_Total").value = Val_Inm_Dec_Total;
    calcular_valor_evaluado_Total();
}
function calcular_valor_evaluado(idx) {
    var Realizable = document.getElementById("Realizable_" + idx).value
    var factor = 0;
    if (Realizable == "Si") {
        factor = 0.75;
    } else if (Realizable == "No") {
        factor = 0.5;
    }
    var Val_Inm_Dec = convNro(document.getElementById("Val_Inm_Dec_" + idx).value);
    var Val_Inm_Eva = Val_Inm_Dec * factor;
    document.getElementById("Val_Inm_Eva_" + idx).innerHTML = Number(Val_Inm_Eva).toLocaleString('en');
    document.getElementById("Val_Inm_Eva_" + idx).value = Val_Inm_Eva;
    if (factor == 0) {
        document.getElementById("Val_Inm_Eva_" + idx).innerHTML = Number(Val_Inm_Eva).toLocaleString('en');
        document.getElementById("Val_Inm_Eva_" + idx).value = Val_Inm_Eva;
    }
    return convNro(Val_Inm_Eva);
}
function calcular_valor_evaluado_Total() {
    var table = document.getElementById("tablaPatrimonioInmueble");
    var filas = table.rows.length - 1;
    var Val_Inm_Eva_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        Val_Inm_Eva_Total += calcular_valor_evaluado(idx);
    }
    document.getElementById("Val_Inm_Eva_Total").innerHTML = Number(Val_Inm_Eva_Total).toLocaleString('en');
    document.getElementById("Val_Inm_Eva_Total").value = Val_Inm_Eva_Total;

    document.getElementById("bg_13").innerHTML = Number(Val_Inm_Eva_Total).toLocaleString('en');
    document.getElementById("bg_13").value = Val_Inm_Eva_Total;
    Calcular_EEFF();
}

function CompletarIngresos(lista) {
    var cantidad = lista[0];
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 1; i < cantidad; i++) {
        AgregarProducto();
    }
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("unidades_x_presentacion_") != -1) {
            var index = 0;
            if (dato == "Galones") {
                index = 1;
            } else if (dato == "Kilos") {
                index = 2;
            } else if (dato == "Litros") {
                index = 3;
            } else if (dato == "Metros") {
                index = 4;
            } else if (dato == "Pies") {
                index = 5;
            } else if (dato == "Rollos") {
                index = 6;
            } else if (dato == "Sacos") {
                index = 7;
            } else if (dato == "Otros") {
                index = 8;
            }
            document.getElementById(codigo).selectedIndex = index;
        } else if (codigo.indexOf("util_bruta_") != -1) {
            document.getElementById(codigo).value = Number(data[i]).toFixed(2);
            document.getElementById(codigo).innerHTML = Number(data[i]).toFixed(2);
        } else {
            document.getElementById(codigo).value = data[i];
            document.getElementById(codigo).innerHTML = data[i];
        }
    }
    calcular_ingresos_comercio();
}
function CompletarEgresos(lista) {
    var codigos = lista[0];
    var data = lista[1];
    for (var i = 0; i < codigos.length; i++) {
        document.getElementById(codigos[i]).value = data[i];
        document.getElementById(codigos[i]).innerHTML = data[i];
    }
    calcular_gastop_comercio();
}
