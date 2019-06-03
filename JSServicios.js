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
    lista.push("");
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

function AgregarServicios() {
    var table = document.getElementById("tablaServicios");
    var idx = table.rows.length - 1;
    var row = table.insertRow(idx);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = '<input class="form-control" id = "Serv' + idx + '"/>';
    cell2.innerHTML = '<input class="form-control" id="nro_servicios_' + idx + '" onkeyup=";validarNumero(id);Calcular_Ingreso_Manufactura();"/>';
    cell3.innerHTML = '<input class="form-control" id="pventa_' + idx + '" onkeyup="validarNumero(id);Calcular_Ingreso_Manufactura();"/>';
    cell4.innerHTML = '<div id="ingreso_mensual_' + idx + '">';
}
function EliminarServicios() {
    var table = document.getElementById("tablaServicios")
    var idx = table.rows.length - 2
    if (table.rows.length > 3) {
        table.deleteRow(idx);
        Calcular_Ingreso_Manufactura();
    }
}
function Calcular_Ingreso_Mensual(idx) {
    var nro_servicios = convNro(document.getElementById("nro_servicios_" + idx).value);
    var pventa = convNro(document.getElementById("pventa_" + idx).value);
    var ingreso_mensual = pventa * nro_servicios;
    document.getElementById("ingreso_mensual_" + idx).innerHTML = Number(ingreso_mensual).toLocaleString('en');
    document.getElementById("ingreso_mensual_" + idx).value = ingreso_mensual;
    return convNro(ingreso_mensual);
}
function Calcular_Ingreso_Total() {
    var table = document.getElementById("tablaServicios");
    var filas = table.rows.length - 1;
    var Ingreso_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        Ingreso_Total += Calcular_Ingreso_Mensual(idx);
    }
    
    document.getElementById("Ingreso_Total").innerHTML = Number(Ingreso_Total).toLocaleString('en');
    document.getElementById("Ingreso_Total").value = Ingreso_Total;

    Calcular_Promedio_Ventas();
    var prom = Number(document.getElementById('ingreso_mes_promedio').value);
    
    document.getElementById("Ventas_Total").innerHTML = Number(Ingreso_Total+prom).toLocaleString('en');
    document.getElementById("Ventas_Total").value = Ingreso_Total+prom;

    document.getElementById("egp_ventas").innerHTML = Number(Ingreso_Total+prom).toLocaleString('en');
    document.getElementById("egp_ventas").value = Ingreso_Total+prom;
}
function Calcular_Informalidad() {
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
function Calcular_Margen_Utilidad_Bruta() {
    Calcular_Ingreso_Total();
    Calcular_Costo_Venta();
    var margen_utilidad_bruta = 0
    var ventas = convNro(document.getElementById("Ventas_Total").value);
    var costo = convNro(document.getElementById("total_costo_venta").value);
    if (ventas != 0) {
        margen_utilidad_bruta = 1 - (costo / ventas);
    }
    margen_utilidad_bruta = margen_utilidad_bruta * 100;
    document.getElementById("margen_bruto").innerHTML = Number(margen_utilidad_bruta).toFixed() + "%";
    document.getElementById("margen_bruto").value = Number(margen_utilidad_bruta).toFixed();
    var margen_bruto_referencial = convNro(document.getElementById("margen_bruto_referencial").value);
    var egp_costoven = 0;
    if (margen_utilidad_bruta > margen_bruto_referencial) {
        egp_costoven = (100 - margen_bruto_referencial) * ventas / 100;
    } else {
        egp_costoven = (100 - margen_utilidad_bruta) * ventas / 100;
    }
    document.getElementById("egp_costoven").innerHTML = Number(Number(egp_costoven).toFixed()).toLocaleString('en');
    ;
    document.getElementById("egp_costoven").value = Number(egp_costoven).toFixed();
}
function Calcular_Promedio_Ventas() {
    var cont = 0;

    var mes1 = document.getElementById("ingreso_mes_1").value;
    var mes2 = document.getElementById("ingreso_mes_2").value;
    var mes3 = document.getElementById("ingreso_mes_3").value;

    if (mes1 != "") {
        cont = cont + 1;
    }

    if (mes2 != "") {
        cont = cont + 1;
    }

    if (mes3 != "") {
        cont = cont + 1;
    }
    mes1 = convNro(mes1);
    mes2 = convNro(mes2);
    mes3 = convNro(mes3);

    var promedio = 0;
    if (cont != 0) {
        promedio = (mes1 + mes2 + mes3) / cont;
    }
    promedio = Number(promedio).toFixed(0);
    promedio = Number(promedio);

    document.getElementById("ingreso_mes_promedio").value = promedio;
    document.getElementById("ingreso_mes_promedio").innerHTML = Number(promedio).toLocaleString('en');
    promedio = promedio * 0.5;
    document.getElementById("costo_venta_compras").value = promedio;
    document.getElementById("costo_venta_compras").innerHTML = Number(promedio).toLocaleString('en');
    
    var val = convNro(promedio)/convNro(document.getElementById('Ingreso_Total').value);
    var advertido = document.getElementById('advertido').value;
    if(val>0.3 && advertido == "0"){
        alert("Estos ingresos superan el % limite de las ventas: Llenar Formato de Comercio");
        document.getElementById('advertido').value= "1";
    }
    if(val<0.3){
        document.getElementById('advertido').value= "0";
    }

}
function Calcular_Ingreso_Manufactura() {
    Calcular_Ingreso_Total();
    Calcular_Promedio_Ventas();
    Calcular_Informalidad();
    Calcular_Margen_Utilidad_Bruta();
    Calcular_EGP();
}
function Calcular_Costo_Venta() {
    var costo1 = convNro(document.getElementById("costo_venta_op").value);
    var costo2 = convNro(document.getElementById("costo_venta_gastos").value);
    var costo3 = convNro(document.getElementById("costo_venta_compras").value);

    document.getElementById("total_costo_venta").innerHTML = Number(costo1 + costo2 + costo3).toLocaleString('en');
    document.getElementById("total_costo_venta").value = Number(costo1 + costo2 + costo3);



}
function Calcular_Planilla_Operarios() {
    var num = convNro(document.getElementById("num_planilla_op").value);
    var sueldo = convNro(document.getElementById("sueldo_planilla_op").value);
    if (num > 0 && sueldo > 0) {
        document.getElementById("total_planilla_op").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("total_planilla_op").value = Number(num * sueldo);
        document.getElementById("costo_venta_op").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("costo_venta_op").value = Number(num * sueldo);
    } else {
        document.getElementById("total_planilla_op").innerHTML = "";
        document.getElementById("total_planilla_op").value = 0;
        document.getElementById("costo_venta_op").innerHTML = "";
        document.getElementById("costo_venta_op").value = 0;
    }
}
function Calcular_Planilla_Administrativos() {
    var num = convNro(document.getElementById("num_planilla_adm").value);
    var sueldo = convNro(document.getElementById("sueldo_planilla_adm").value);
    if (num > 0 && sueldo > 0) {
        document.getElementById("total_planilla_adm").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("total_planilla_adm").value = Number(num * sueldo);
        document.getElementById("gastop_comercio_1").innerHTML = Number(num * sueldo).toLocaleString('en');
        document.getElementById("gastop_comercio_1").value = Number(num * sueldo);
    } else {
        document.getElementById("total_planilla_adm").innerHTML = "";
        document.getElementById("total_planilla_adm").value = 0;
        document.getElementById("gastop_comercio_1").innerHTML = "";
        document.getElementById("gastop_comercio_1").value = 0;
    }
}
function Calcular_Planilla() {
    Calcular_Planilla_Operarios();
    Calcular_Planilla_Administrativos();
}

function calcular_gastop_comercio() {
    Calcular_Planilla();
    var gastop1 = convNro(document.getElementById("gastop_comercio_1").value);
    var gastop2 = convNro(document.getElementById("gastop_comercio_2").value);
    var gastop3 = convNro(document.getElementById("gastop_comercio_3").value);
    var gastop4 = convNro(document.getElementById("gastop_comercio_4").value);
    var gastop5 = convNro(document.getElementById("gastop_comercio_5").value);
    var gastop6 = convNro(document.getElementById("gastop_comercio_6").value);
    var gastop7 = convNro(document.getElementById("gastop_comercio_7").value);
    var gastop8 = convNro(document.getElementById("gastop_comercio_8").value);
    document.getElementById("total_gastop_comercio").innerHTML = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5 + gastop6 + gastop7 + gastop8).toLocaleString('en');
    document.getElementById("total_gastop_comercio").value = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5 + gastop6 + gastop7 + gastop8);
    document.getElementById("egp_gastop").innerHTML = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5 + gastop6 + gastop7 + gastop8).toLocaleString('en');
    document.getElementById("egp_gastop").value = Number(gastop1 + gastop2 + gastop3 + gastop4 + gastop5 + gastop6 + gastop7 + gastop8);
    Calcular_EGP();
}
function calcular_gastopersonal() {
    var gasto1 = convNro(document.getElementById("miembros").value) * 360;
    var gasto2 = convNro(document.getElementById("alquiler").value);
    var gasto3 = convNro(document.getElementById("deuda_personal").value);
    var gasto4 = convNro(document.getElementById("otros_personal").value);

    document.getElementById("gastos_implicitos").innerHTML = Number(gasto1).toLocaleString('en');
    document.getElementById("total_gastpersonal").innerHTML = Number(gasto1 + gasto2 + gasto3 + gasto4).toLocaleString('en');
    document.getElementById("gastos_implicitos").value = Number(gasto1);
    document.getElementById("total_gastpersonal").value = Number(gasto1 + gasto2 + gasto3 + gasto4);
    document.getElementById("egp_gastfam").innerHTML = Number(gasto1 + gasto2 + gasto3 + gasto4).toLocaleString('en');
    document.getElementById("egp_gastfam").value = Number(gasto1 + gasto2 + gasto3 + gasto4);
    Calcular_EGP();
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
    Calcular_BG();
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
    var oficinas = document.getElementById('oficinas').value;
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
            razonSocial == "" || ruc == 0 || ubicacion == "" || aExp == "" || nroPtosVta == "" ||
            actividad == "" || actEspecifica == "" || buro == "" || nroEnt == "" || edadRL == "") {
        alert("Falta completar todos los datos del cliente")
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
    lista.push(document.getElementById("ingreso_mes_1").value);
    lista.push(document.getElementById("ingreso_mes_2").value);
    lista.push(document.getElementById("ingreso_mes_3").value);
    lista.push(document.getElementById("ingreso_mes_promedio").value);

    lista.push(document.getElementById("Ventas_Total").value);
    lista.push(document.getElementById("margen_bruto").value);
    lista.push(document.getElementById("margen_bruto_referencial").value);
    lista.push(document.getElementById("declarado").value);
    lista.push(document.getElementById("informalidad").value);

    var table = document.getElementById("tablaServicios");
    var total = table.rows.length-2;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i +1;
        var Serv = document.getElementById("Serv"+idx).value;
        lista.push(Serv);
        var nro_servicios = convNro(document.getElementById("nro_servicios_"+idx).value);
        lista.push(nro_servicios);
        var pventa = convNro(document.getElementById("pventa_"+idx).value);
        lista.push(pventa);

        var ingreso_mensual = convNro(document.getElementById("ingreso_mensual_"+idx).value);
        lista.push(ingreso_mensual);
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

    lista.push(document.getElementById("num_planilla_op").value);
    lista.push(document.getElementById("sueldo_planilla_op").value);
    lista.push(document.getElementById("total_planilla_op").value);

    lista.push(document.getElementById("num_planilla_adm").value);
    lista.push(document.getElementById("sueldo_planilla_adm").value);
    lista.push(document.getElementById("total_planilla_adm").value);

    lista.push(document.getElementById("costo_venta_op").value);
    lista.push(document.getElementById("costo_venta_gastos").value);
    lista.push(document.getElementById("costo_venta_compras").value);
    lista.push(document.getElementById("total_costo_venta").value);

    lista.push(document.getElementById("gastop_comercio_1").value);
    lista.push(document.getElementById("gastop_comercio_2").value);
    lista.push(document.getElementById("gastop_comercio_3").value);
    lista.push(document.getElementById("gastop_comercio_4").value);
    lista.push(document.getElementById("gastop_comercio_5").value);
    lista.push(document.getElementById("gastop_comercio_6").value);
    lista.push(document.getElementById("gastop_comercio_7").value);
    lista.push(document.getElementById("gastop_comercio_8").value);
    lista.push(document.getElementById("total_gastop_comercio").value);


    return lista;
}   
function CompletarIngresos(lista) {
    var cantidad = lista[0];
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 0; i < cantidad; i++) {
        AgregarServicios();
    }
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        document.getElementById(codigo).value = data[i];
        document.getElementById(codigo).innerHTML = data[i];
    }
    Calcular_Ingreso_Manufactura();
}
function CompletarEgresos(lista) {
    var codigos = lista[0];
    var data = lista[1];
    for (var i = 0; i < codigos.length; i++) {
        document.getElementById(codigos[i]).value = data[i];
        document.getElementById(codigos[i]).innerHTML = data[i];
    }
    calcular_gastop_comercio();
    Calcular_Costo_Venta();
}
