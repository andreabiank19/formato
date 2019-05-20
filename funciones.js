function Inicializar() {
    var today = new Date();
    var t = today.toISOString().substring(0, 10);

    document.getElementById("dictamen").value = "";

    document.getElementById("fechaVisita").value = t;
    document.getElementById("fechaVisita").innerHTML = t;
}
function EnviarCalculadora(){
    /*var regimen = document.getElementById('regimen').value;
    if(regimen == "Reg General"){
        alert("Ha indicado que el cliente es Régimen General. \n Debería ir a la calculadora. Gracias");
        document.getElementById("validado").style.display = 'none';
        document.getElementById("btn_grabar").style.display = 'none';
        document.getElementById("btn_Calculadora").style.display = '';
        document.getElementById("boton_finalizar").style.display = 'none';
        document.getElementById("boton_inicio").style.display = '';
    }else{
        document.getElementById("validado").style.display = '';
        document.getElementById("btn_grabar").style.display = '';
        document.getElementById("btn_Calculadora").style.display = 'none';
        document.getElementById("boton_finalizar").style.display = '';
        document.getElementById("boton_inicio").style.display = 'none';
    }*/
}
function Validar(lista){
    //En la condicion debería aparecer que también se excluyan los del campo excluido lista[6]
    if(lista[0] !=0){
        document.getElementById("validado").style.display = '';
        document.getElementById("btn_grabar").style.display = '';
        document.getElementById("boton_finalizar").style.display = '';
        document.getElementById("boton_inicio").style.display = 'none';

        document.getElementById("regimen").disabled = false;
        document.getElementById("rvgl").disabled = false;
        document.getElementById("razonSocial").disabled = false;
        document.getElementById("ubicacion").disabled = false;
        document.getElementById("nroPtosVta").disabled = false;
        document.getElementById("nroAlmacenes").disabled = false;
        document.getElementById("actividad").disabled = false;
        document.getElementById("actEspecifica").disabled = false;
        document.getElementById("nroPtosVta").disabled = false;
        document.getElementById("nroTalleres").disabled = false;

        document.getElementById("edadRL").disabled = false;

        document.getElementById("nroEnt").disabled = false;
        document.getElementById("buro").disabled = false;
        document.getElementById("aExp").disabled = false;
        document.getElementById("tipoCliente").disabled = false;
        document.getElementById("oficina").disabled = false;

        document.getElementById("idFila").value = lista[0];
        document.getElementById("buro").value = "G" +lista[1];
        document.getElementById("tipoCliente").value = lista[2];
        document.getElementById("nroEnt").value = lista[3];
        document.getElementById("razonSocial").value = lista[4];
        document.getElementById("ubicacion").value = lista[5];
        
        document.getElementById("finalizado").value = lista[20];

        var deudas = lista[7];
        
        if(lista[8] != "Por Iniciar"){
            var datos = lista[9];
            var dc = datos[0];
            CompletarGeneral(dc);
            //Propuesta de Financiamiento
            var lp = datos[1];
            CompletarLP(lp);
            var cp = datos[2];
            CompletarCP(cp);
            var patInm = datos[3];
            CompletarPI(patInm);
            var patVeh = datos[4];
            CompletarPVM(patVeh);
            var ing = datos[5];
            CompletarIngresos(ing);
            var egr = datos[6];
            CompletarEgresos(egr);
            
        }
        
        CompletarCronograma(deudas);
        calcular_valor_declarado_Total();
        Calcular_Valor_Bien_Total();
        Calcular_EEFF();
        document.getElementById("tipoCampana").value = lista[10];
        if(lista[8] == "Completado"){
            var tipoCampana = document.getElementById('tipoCampana').value;
            
            var dictamen = document.getElementById('dictamen').value;
            document.getElementById('resultado').style.display = '';
            document.getElementById('resultado').innerHTML = "El cliente: " + dictamen;
            
            var bloqueo = document.getElementById("bloqueo");
            bloqueo.disabled = true;
        }else{
            document.getElementById("nroEnt").disabled = true;
            document.getElementById("buro").disabled = true;
            document.getElementById("tipoCliente").disabled = true;
            document.getElementById("ruc").disabled = true;
        }
        document.getElementById("carga").style.display = 'none';
    }else{
        alert("Los clientes deben ser evaluados por conducto regular. Por favor enviar documentación completa según checklist");
        //alert("El cliente no se encuentra en la base de campañas");
        document.getElementById("carga").style.display = 'none';
    }
}
function InicializarActividad(actividad){
    actividadG = actividad[0];
    excluido = actividad[1];
    document.getElementById("actividad").disabled = false;
    document.getElementById("actividad").options[0] = new Option("");
    for (i = 0; i < actividadG.length; i++) {
        document.getElementById("actividad").options[i + 1] = new Option(actividadG[i], actividadG[i]);
    }
    document.getElementById("actividad").disabled = true;
}
function InicializarOficinas(oficina){
    oficinas = oficina;
    document.getElementById("oficina").disabled = false;
    document.getElementById("oficina").options[0] = new Option("");
    for (i = 0; i < oficina.length; i++) {
        document.getElementById("oficina").options[i + 1] = new Option(oficina[i], oficina[i]);
    }
    document.getElementById("oficina").disabled = true;
}
function Cargar(){
    document.getElementById("carga").style.display = '';
}
function Dictaminar(){
    var dictamen = "";
    if(EvaluarFiltros2()){
        dictamen = "Califica";
    }else{
        dictamen = "No califica";
        dictamen = EvaluarFiltros0();
    }
    document.getElementById("dictamen").value = dictamen;
    return dictamen;
}

function EvaluarFiltros0(){
    var tipoCampana = document.getElementById('tipoCampana').value;
    var ventas = convNro(document.getElementById('egp_ventas').value);
    var egp_uneta = convNro(document.getElementById('egp_uneta').value);
    if(tipoCampana == "Aprobado"){
        if(ventas >= 30000){
            if(egp_uneta > 0){
                return "Califica"
            }
        }
    }
    return "No califica"
}
function EvaluarFiltros1(){
    var estado = true;
    var nroEntidades = convNro(document.getElementById('nroEnt').value);
    var cobertura = convNro(document.getElementById('CoberturaDeuda').value);
    var tipoCliente = document.getElementById('tipoCliente').value;
    if(cobertura > 1.4){
        if(tipoCliente == "PJ" && nroEntidades >=6){
            estado = false;
        }else if(tipoCliente == "PNN" && nroEntidades >= 5){
            estado = false;
        }
    }
    if(cobertura == 1.4){
        if(tipoCliente == "PJ" && nroEntidades >=4){
            estado = false;
        }else if(tipoCliente == "PNN" && nroEntidades >= 3){
            estado = false;
        }
    }
    if(cobertura < 1.4){
        estado = false;
    }
    return estado
}
function EvaluarFiltros2(){
    var estado = false;
    var ventas = convNro(document.getElementById('egp_ventas').value);
    var egp_uneta = convNro(document.getElementById('egp_uneta').value);
    var buro = document.getElementById('buro').value;
    var tipoCliente = document.getElementById('tipoCliente').value;
    var edadRL = convNro(document.getElementById('edadRL').value);
    var antiguedad = convNro(document.getElementById('aExp').value);
    var declarado = convNro(document.getElementById("informalidad").value)/100;
    if (ventas >= 30000) {
        if (egp_uneta > 0) {
            if ((tipoCliente == 'PJ' && (buro == 'G1' || buro == 'G2' || buro == 'G3' || buro == 'G4' || buro == 'G5' || buro == 'NB' || buro == 'GNB')) || (tipoCliente == 'PNN' && (buro == 'G1' || buro == 'G2' || buro == 'G3' || buro == 'G4' || buro == 'G5' || buro == 'NB' || buro == 'GNB'))) {
                if (edadRL >= 25) {
                    if ((tipoCliente == 'PJ' && antiguedad >= 1) || (tipoCliente == 'PNN' && antiguedad >= 2)) {
                        if(declarado < 0.92){
                            estado = true;
                        }
                    }
                }
            }
        }
    }
    if(estado){
        estado = EvaluarFiltros1();
    }


    return estado;
}
function Calcular_EEFF(){
    Calcular_BG();
    Calcular_EGP();
    Calcular_Ratios();
}
function Calcular_Ratios() {

    var TPC = convNro(document.getElementById("total_pasivo_cte").value);
    var TAC = convNro(document.getElementById("total_activo_cte").value);
    var bg_5 = convNro(document.getElementById("bg_5").value);
    var egp_costoven = convNro(document.getElementById("egp_costoven").value);
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);
    var bg_3 = convNro(document.getElementById("bg_3").value);
    var bg_17 = convNro(document.getElementById("bg_17").value);
    var bg_19 = convNro(document.getElementById("bg_19").value);
    var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
    var egp_uneta = convNro(document.getElementById("egp_uneta").value);

    var LiquidezCTE = TAC / TPC;
    if (TPC == 0) {
        LiquidezCTE = 0;
    }
    var CapitalTrabajo = TAC - TPC;

    var DiasExistencias = ((bg_5 * 365) / (egp_costoven * 12));
    if (egp_costoven == 0) {
        DiasExistencias = 0;
    }
    var DiasCobro = ((bg_3 * 365) / (egp_ventas * 12));
    if (egp_ventas == 0) {
        DiasCobro = 0;
    }
    var DiasPago = ((bg_17 * 360) / (egp_costoven * 12));
    if (egp_costoven == 0) {
        DiasPago = 0;
    }
    var CicloNegocio = DiasExistencias + DiasCobro - DiasPago;

    var cuotas = convNro(Calcular_Cuotas_LP_Total());
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }
    var suma1 = 0;
    suma1 = convNro(cuotas) + convNro(PA_S5);
    var payback = 0;
    if ((egp_uneta + suma1) != 0) {
        payback = (bg_19 / (egp_uneta + suma1));
    }

    var CoberturaDeuda = 0;

    if (egp_gastfinan != 0) {
        CoberturaDeuda = (egp_uneta + egp_gastfinan) / egp_gastfinan;
    }else{

    }


    document.getElementById("LiquidezCTE").innerHTML = Number(LiquidezCTE).toFixed(2);
    document.getElementById("CapitalTrabajo").innerHTML = Number(Number(CapitalTrabajo).toFixed(2)).toLocaleString('en');
    document.getElementById("DiasExistencias").innerHTML = Number(DiasExistencias).toFixed(2);
    document.getElementById("DiasCobro").innerHTML = Number(DiasCobro).toFixed(2);
    document.getElementById("DiasPago").innerHTML = Number(DiasPago).toFixed(2);
    document.getElementById("CicloNegocio").innerHTML = Number(CicloNegocio).toFixed(2);
    document.getElementById("PayBack").innerHTML = Number(payback).toFixed(2);
    document.getElementById("CoberturaDeuda").innerHTML = Number(CoberturaDeuda).toFixed(2);


    document.getElementById("LiquidezCTE").value = Number(LiquidezCTE);
    document.getElementById("CapitalTrabajo").value = Number(CapitalTrabajo);
    document.getElementById("DiasExistencias").value = Number(DiasExistencias);
    document.getElementById("DiasCobro").value = Number(DiasCobro);
    document.getElementById("DiasPago").value = Number(DiasPago);
    document.getElementById("CicloNegocio").value = Number(CicloNegocio);
    document.getElementById("PayBack").value = Number(payback);
    document.getElementById("CoberturaDeuda").value = Number(CoberturaDeuda);
}
function calcTime(offset) {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}
function convNro(nroComas) {
    var arreglo = String(nroComas).split(",");
    var sinComas = arreglo.join("");
    if (isNaN(sinComas)) {
        return 0;
    }
    return Number(sinComas);
}
function validarNumero(id) {
    if (document.getElementById(id).value != "") {
        var conComas = document.getElementById(id).value;

        var texto = conComas.split(",");
        var sinComas = texto.join("");
        var n = sinComas.indexOf(".");
        var siguiente = "";
        if (Number(n) != -1) {
            siguiente = sinComas.charAt(n + 1);
        }
        if (sinComas.length > 15) {
            alert("Excedio la cantidad permitida de dígitos");
            document.getElementById(id).value = "";
        } else {
            if (isNaN(sinComas)) {
                alert("Ingrese un número válido");
                document.getElementById(id).value = "";
            } else {
                var nuevo = Number(sinComas).toLocaleString('en');
                if (Number(n) == -1) {
                    document.getElementById(id).value = nuevo;
                    document.getElementById(id).setAttribute('value', nuevo);
                } else {
                    if (siguiente == "") {
                        document.getElementById(id).value = nuevo + ".";
                        document.getElementById(id).setAttribute('value', nuevo + ".");
                    } else {
                        document.getElementById(id).value = nuevo;
                        document.getElementById(id).setAttribute('value', nuevo);
                    }

                }
            }
        }
    }
}
function Agregar_Financimiento_LP() {
    var vIndex = [];
    vIndex.push("Inicio");
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var total = idx;
    var i = 1;
    while (i <= total) {
        vIndex.push(document.getElementById("Tipo_Prod_LP_" + i).selectedIndex);
        i = i + 1;
    }

    i = 1;
    idx += 1;
    var financiamiento = '<div class="col-xs-12" id = "Largo_Plazo_' + idx + '" style="height:547px;">' +
            '<h1>Largo Plazo</h1>' +
            '<h3>(' + idx + '° Financiamiento)</h3>' +
            '<table class="table table-hover">' +
            ' <tr><th colspan="3" class="cabezera">Propuesta de financiamiento Largo Plazo</th></tr>' +
            ' <tr>' +
            '   <td>Tipo de producto</td>' +
            '   <td colspan="2">' +
            '     <select class="form-control" id="Tipo_Prod_LP_' + idx + '" onchange="Calcular_Propuestas_LP();">' +
            '       <option value="0"></option>' +
            '       <option value="Leasing Mobiliario">Leasing Mobiliario</option>' +
            '       <option value="Leasing Inmobiliario">Leasing Inmobiliario</option>' +
            '       <!--<option value="Préstamo para adquisición de inmueble">Préstamo para adquisición de inmueble</option>' +
            '       <option value="Préstamo para adquisición de bienes muebles">Préstamo para adquisición de bienes muebles</option>' +
            '       --><option value="Subrogación de deuda">Subrogación de deuda</option><!--' +
            '       <option value="Otro">Otro</option>-->' +
            '     </select>' +
            '   </td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Precio Venta</td>' +
            '   <td><input min="0"  class="form-control" id="Precio_Venta_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();Calcular_EEFF();"/></td>' +
            '   <td>100%</td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td style="width:40%;">Importe de Financiamiento</td>' +
            '   <td><input  min="0"  class="form-control" id="Finan_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();Calcular_EEFF();" /></td>' +
            '   <td><div id="Porc_LP_1_1"></div></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Cuota Inicial</td><td><div id="Cuota_Inicial_LP_' + idx + '"></div></td><td><div id="Porc_LP_1_2"></div></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Tasa anual</td><td><div><input style = "width:24.5%; display:inline"  min="0"  id="TEA_LP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_LP();"/><b>&nbsp;%</b></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Tasa mensual</td><td><div id="TEM_LP_' + idx + '"></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Cuota</td><td><div id="Cuota_LP_' + idx + '"></div></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Plazo (Meses)</td><td><input  min="0"  class="form-control" id="Plazo_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP()"/></td><td></td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td>Gtia para Prop:</td><td><input  min="0"  class="form-control" id="GTIA_LP_' + idx + '" onkeyup="validarNumero(id);Calcular_Propuestas_LP();"/></td><td></td>' +
            ' </tr>' +
            '</table>' +
            '<input type="hidden" id="Cuota_LP_' + idx + '_hidden" name="Cuota_LP_' + idx + '_hidden">' +
            '</div>';



    document.getElementById("Financimiento_LP").innerHTML += financiamiento;
    document.getElementById("cant_finan_LP").value = idx;

    while (i <= total) {
        document.getElementById("Tipo_Prod_LP_" + i).selectedIndex = vIndex[i];
        i = i + 1;
    }
}
function Agregar_Financimiento_CP() {
    var vIndex = [];
    vIndex.push("Inicio");
    var idx = Number(document.getElementById("cant_finan_CP").value);
    var total = idx;
    var i = 1;
    while (i <= total) {
        vIndex.push(document.getElementById("Tipo_Prod_CP_" + i).selectedIndex);
        i = i + 1;
    }

    i = 1;
    idx += 1;
    var financiamiento = '<div class="col-xs-12" id = "Corto_Plazo_' + idx + '" style="height:547px;">' +
                         '   <h1>Corto Plazo</h1>' +
                         '   <h3>(' + idx + '° Financiamiento)</h3>' +
                         '   <table class="table table-hover">' +
                         '     <tr><th colspan="2" class="cabezera">Propuesta de financiamiento Corto Plazo</th></tr>' +
                         '     <tr>' +
                         '       <td>Tipo de producto</td>' +
                         '       <td>' +
                         '         <select class="form-control" id="Tipo_Prod_CP_' + idx + '" onchange="Calcular_Propuestas_CP();">' +
                         '           <option value=""></option>' +
                         '           <option value="Financiamiento de Importación">Financiamiento de Importación</option>' +
                         '           <option value="Financiamiento de Exportación">Financiamiento de Exportación</option>' +
                         '           <option value="Préstamo para capital de trabajo">Préstamo para capital de trabajo</option>' +
                         '           <option value="Línea Préstamo para capital de trabajo">Línea Préstamo para capital de trabajo</option>' +
                         '           <option value="Tarjeta capital de trabajo">Tarjeta capital de trabajo</option>' +
                         '           <!--<option value="Descuento de letra/factura negociable">Descuento de letra/factura negociable</option>' +
                         '           <option value="Tarjeta Empresarial">Tarjeta empresarial</option>' +
                         '           <option value="Préstamo para adquisición de bienes muebles pequeños">Préstamo para adquisición de bienes muebles pequeños</option>' +
                         '           --><option value="Subrogación de deuda">Subrogación de deuda</option><!--' +
                         '           <option value="Incremento de línea de TKT">Incremento de línea de TKT</option>' +
                         '           <option value="Incremento de línea de T/C">Incremento de línea de T/C empresarial</option>' +
                         '           <option value="Otro">Otro</option>-->' +
                         '         </select>' +
                         '       </td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td style="width:40%;">Importe de Financiamiento</td>' +
                         '       <td><input  min="0"  id="Finan_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP();Calcular_EEFF();"/></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Tasa anual</td>' +
                         '       <td><div><input style="width:20%; display:inline;"  min="0"  id="TEA_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP();"/> <b>%</b></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Tasa mensual</td>' +
                         '       <td><div id="TEM_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Cuota</td>' +
                         '       <td><div id="Cuota_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Plazo (Meses)</td>' +
                         '       <td><input min="0" id="Plazo_CP_' + idx + '" class="form-control" onkeyup="validarNumero(id);Calcular_Propuestas_CP();VerificarPlazo('+"'Tipo_Prod_CP_" + idx + "'"+',this.id);"/></td>' +
                         '     </tr>' +
                         '     <tr>' +
                         '       <td>Gastos finan. 1°cuota</td>' +
                         '       <td><div id="GastFin_CP_' + idx + '"></div></td>' +
                         '     </tr>' +
                         '   </table>' +
                         '   <input type="hidden" id="GastFin_CP_' + idx + '_hidden" name="GastFin_CP_' + idx + '_hidden"/>' +
                         '   <input type="hidden" id="Cuota_CP_' + idx + '_hidden" name="Cuota_CP_' + idx + '_hidden">' +
                         ' </div>';




    document.getElementById("Financimiento_CP").innerHTML += financiamiento;
    document.getElementById("cant_finan_CP").value = idx;


    while (i <= total) {
        document.getElementById("Tipo_Prod_CP_" + i).selectedIndex = vIndex[i]
        i = i + 1;
    }
    Calcular_Propuestas_CP();
}
function VerificarPlazo(idProducto,idPlazo){
    var plazo = Number(document.getElementById(idPlazo).value);
    var producto = document.getElementById(idProducto).value;
    if(plazo > 24 && producto == "Tarjeta capital de trabajo"){
        alert("El plazo máximo de TKT es de 24 meses");
        document.getElementById(idPlazo).value = 24;
    }
}
function Eliminar_Financimiento_LP() {
    var idx = document.getElementById("cant_finan_LP").value;
    if (idx > 0) {
        var padre = document.getElementById("Financimiento_LP");
        var hijo = document.getElementById("Largo_Plazo_" + idx);
        var oldChild = padre.removeChild(hijo);
        document.getElementById("cant_finan_LP").value = idx - 1;
    }
}
function Eliminar_Financimiento_CP() {
    var idx = document.getElementById("cant_finan_CP").value;
    if (idx > 0) {
        var padre = document.getElementById("Financimiento_CP");
        var hijo = document.getElementById("Corto_Plazo_" + idx);
        var oldChild = padre.removeChild(hijo);
        document.getElementById("cant_finan_CP").value = idx - 1;
    }
}
function Calcular_Propuestas_LP() {
    var idx = document.getElementById("cant_finan_LP").value;


    for (var i = 1; i <= idx; i++) {
        var Tipo_Prod = document.getElementById("Tipo_Prod_LP_" + i).value;
        document.getElementById("Tipo_Prod_LP_" + i).setAttribute('value', Tipo_Prod);
        var vIndex = document.getElementById("Tipo_Prod_LP_" + i).selectedIndex;
        document.getElementById("Tipo_Prod_LP_" + i).setAttribute('selectedIndex', vIndex);

        Calcular_Cuota_Inicial_LP(i);
        Calcular_Porcentajes_LP(i);
        Calcular_Tasa_Mensual_LP(i);
        Calcular_Cuota_LP(i);
    }
    Calcular_EGP();
}
function Calcular_Cuota_Inicial_LP(idx) {
    var Tipo_Prod = document.getElementById("Tipo_Prod_LP_" + idx).value;
    if (Tipo_Prod != "Subrogación de deuda") {
        var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + idx).value);
        var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
        var Cuota_Inicial = Precio_Venta - Finan_LP;
        if (Precio_Venta > Finan_LP) {
            document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = Number(Cuota_Inicial).toLocaleString('en');
            document.getElementById("Cuota_Inicial_LP_" + idx).value = Cuota_Inicial;
        } else {
            document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = "";
            document.getElementById("Cuota_Inicial_LP_" + idx).value = 0;
        }
    } else {
        document.getElementById("Cuota_Inicial_LP_" + idx).innerHTML = "";
        document.getElementById("Cuota_Inicial_LP_" + idx).value = 0;
    }
}
function Calcular_Porcentajes_LP(idx) {
    var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + idx).value);
    var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
    var Cuota_Inicial = convNro(document.getElementById("Cuota_Inicial_LP_" + idx).value);
    var Porc_Finan = Finan_LP / Precio_Venta * 100;
    var Porc_Cuota = Cuota_Inicial / Precio_Venta * 100;

    if (Precio_Venta > Finan_LP) {
        document.getElementById("Porc_LP_1_1").innerHTML = Number(Porc_Finan).toFixed(0) + "%";
        document.getElementById("Porc_LP_1_1").value = Porc_Finan;

        document.getElementById("Porc_LP_1_2").innerHTML = Number(Porc_Cuota).toFixed(0) + "%";
        document.getElementById("Porc_LP_1_2").value = Porc_Cuota;
    } else {
        document.getElementById("Porc_LP_1_1").innerHTML = "";
        document.getElementById("Porc_LP_1_1").value = 0;
        document.getElementById("Porc_LP_1_2").innerHTML = "";
        document.getElementById("Porc_LP_1_2").value = 0;
    }
}
function Calcular_Tasa_Mensual_LP(idx) {
    var TEA_LP = convNro(document.getElementById("TEA_LP_" + idx).value);

    if (TEA_LP > 0) {
        var TEM_LP = ((Math.pow(1 + TEA_LP / 100, 1 / 12) - 1) * 100);

        document.getElementById("TEM_LP_" + idx).innerHTML = Number(TEM_LP).toFixed(2) + "%";
        document.getElementById("TEM_LP_" + idx).value = Number(TEM_LP).toFixed(2) + "%";
    } else {
        document.getElementById("TEM_LP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuota_LP(idx) {
    var Plazo_LP = convNro(document.getElementById("Plazo_LP_" + idx).value);
    var Finan_LP = convNro(document.getElementById("Finan_LP_" + idx).value);
    var TEA_LP = convNro(document.getElementById("TEA_LP_" + idx).value);

    if (Plazo_LP > 0 && Finan_LP > 0 && TEA_LP > 0) {

        var TEM_LP = Math.pow(1 + TEA_LP / 100, 1 / 12) - 1;
        document.getElementById("Cuota_LP_" + idx).innerHTML = Number((Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))).toFixed()).toLocaleString('en');
        document.getElementById("Cuota_LP_" + idx).value = Number((Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))).toFixed());
        document.getElementById("Cuota_LP_" + idx + "_hidden").value = Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP));
        document.getElementById("Cuota_LP_" + idx + "_hidden").setAttribute('value', (Finan_LP / ((1 - Math.pow(1 + TEM_LP, -Plazo_LP)) / (TEM_LP))));

    } else {
        document.getElementById("Cuota_LP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuotas_LP_Total() {
    var idx = document.getElementById("cant_finan_LP").value;
    var total = 0;
    for (var i = 1; i <= idx; i++) {
        total = total + convNro(document.getElementById("Cuota_LP_" + idx).value);
    }
    return total;
}
function Calcular_Propuestas_CP() {
    var idx = document.getElementById("cant_finan_CP").value;

    for (var i = 1; i <= idx; i++) {
        var Tipo_Prod = document.getElementById("Tipo_Prod_CP_" + i).value;
        document.getElementById("Tipo_Prod_CP_" + i).setAttribute('value', Tipo_Prod);
        var vIndex = document.getElementById("Tipo_Prod_CP_" + i).selectedIndex;
        document.getElementById("Tipo_Prod_CP_" + i).setAttribute('selectedIndex', vIndex);

        Calcular_Tasa_Mensual_CP(i);
        Calcular_Cuota_CP(i);
        Calcular_GastFin_CP(i);
    }
    Calcular_EGP();
}
function Calcular_Tasa_Mensual_CP(idx) {
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);
    if (TEA_CP > 0) {
        var TEM_CP = ((Math.pow(1 + TEA_CP / 100, 1 / 12) - 1) * 100);
        document.getElementById("TEM_CP_" + idx).innerHTML = Number(TEM_CP).toFixed(2) + "%";
        document.getElementById("TEM_CP_" + idx).value = Number(TEM_CP).toFixed(2) + "%";
    } else {
        document.getElementById("TEM_CP_" + idx).innerHTML = "";
    }
}
function Calcular_Cuota_CP(idx) {
    var Plazo_CP = convNro(document.getElementById("Plazo_CP_" + idx).value);
    var Finan_CP = convNro(document.getElementById("Finan_CP_" + idx).value);
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);

    if (Plazo_CP > 0 && Finan_CP > 0 && TEA_CP > 0) {

        var TEM_CP = Math.pow(1 + TEA_CP / 100, 1 / 12) - 1;
        document.getElementById("Cuota_CP_" + idx).innerHTML = Number((Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))).toFixed()).toLocaleString('en');
        document.getElementById("Cuota_CP_" + idx).value = Number((Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))).toFixed());
        document.getElementById("Cuota_CP_" + idx + "_hidden").value = Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP));
        document.getElementById("Cuota_CP_" + idx + "_hidden").setAttribute('value', (Finan_CP / ((1 - Math.pow(1 + TEM_CP, -Plazo_CP)) / (TEM_CP))));
    } else {
        document.getElementById("Cuota_CP_" + idx).innerHTML = "";
        document.getElementById("Cuota_CP_" + idx + "_hidden").setAttribute('value', 0);
    }
}
function Calcular_GastFin_CP(idx) {
    var Finan_CP = convNro(document.getElementById("Finan_CP_" + idx).value);
    var TEA_CP = convNro(document.getElementById("TEA_CP_" + idx).value);
    if (Finan_CP > 0 && TEA_CP > 0) {

        var GastFin_CP = Finan_CP * (Math.pow(1 + TEA_CP / 100, 1 / 12) - 1);

        document.getElementById("GastFin_CP_" + idx).innerHTML = Number(GastFin_CP.toFixed()).toLocaleString('en');
        document.getElementById("GastFin_CP_" + idx).value = GastFin_CP.toFixed();

        document.getElementById("GastFin_CP_" + idx + "_hidden").value = GastFin_CP;
        document.getElementById("GastFin_CP_" + idx + "_hidden").setAttribute('value', GastFin_CP);
        return convNro(GastFin_CP);
    } else {
        document.getElementById("GastFin_CP_" + idx).innerHTML = "";
        document.getElementById("GastFin_CP_" + idx + "_hidden").value = 0;
        document.getElementById("GastFin_CP_" + idx + "_hidden").setAttribute('value', '');
        return 0;
    }
}
function Calcular_Valor_Bien(idx) {
    var Veh_Maq = document.getElementById("Veh_Maq_" + idx).value;
    var Valor_Nuevo = convNro(document.getElementById("Valor_Nuevo_" + idx).value);
    var Antiguedad = convNro(document.getElementById("Antiguedad_" + idx).value);
    var Factor = 0;
    var Valor_Bien = 0;
    if (Veh_Maq != 0 && Valor_Nuevo > 0 && Antiguedad > 0) {
        if (Veh_Maq == "Vehiculo") {
            switch (true) {
                case (0 < Antiguedad && Antiguedad < 3):
                    Factor = 1;
                    break;
                case (2 < Antiguedad && Antiguedad < 5):
                    Factor = 0.8;
                    break;
                case (4 < Antiguedad && Antiguedad < 7):
                    Factor = 0.6;
                    break;
                case (6 < Antiguedad && Antiguedad < 9):
                    Factor = 0.4;
                    break;
                case (8 < Antiguedad):
                    Factor = 0.2;
                    break;
            }
        } else if (Veh_Maq == "Maquinaria") {
            switch (true) {
                case (0 < Antiguedad && Antiguedad < 5):
                    Factor = 1;
                    break;
                case (4 < Antiguedad && Antiguedad < 10):
                    Factor = 0.7;
                    break;
                case (9 < Antiguedad && Antiguedad < 15):
                    Factor = 0.5;
                    break;
                case (14 < Antiguedad):
                    Factor = 0.3;
                    break;
            }
        }
        Valor_Bien = Valor_Nuevo * Factor;
        document.getElementById("Valor_Bien_" + idx).innerHTML = Number(Valor_Bien).toLocaleString('en');
        document.getElementById("Valor_Bien_" + idx).value = Valor_Bien;
    } else {
        document.getElementById("Valor_Bien_" + idx).innerHTML = '';
        document.getElementById("Valor_Bien_" + idx).value = '';
    }
    return Valor_Bien;
}
function Calcular_Valor_Bien_Total() {
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var filas = table.rows.length - 1;
    var Valor_Bien_Total = 0;
    for (var idx = 1; idx < filas; idx++) {
        Valor_Bien_Total += Calcular_Valor_Bien(idx);
    }

    document.getElementById("Valor_Bien_Total").innerHTML = Number(Valor_Bien_Total).toLocaleString('en');
    document.getElementById("Valor_Bien_Total").value = Valor_Bien_Total;

    document.getElementById("bg_14").innerHTML = Number(Valor_Bien_Total).toLocaleString('en');
    document.getElementById("bg_14").value = Valor_Bien_Total;
    Calcular_BG();
}
function AgregarPatrimonio1() {

    var table = document.getElementById("tablaPatrimonioInmueble");
    var idx = table.rows.length - 1;
    var row = table.insertRow(idx);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = '<input class="form-control" id = "Ubic_' + idx + '"/>';
    cell2.innerHTML = '<input class="form-control" id="Propietario_' + idx + '"/>';
    cell3.innerHTML = '<input class="form-control" id="Uso_' + idx + '"/>';
    cell4.innerHTML = '<select class="form-control" id="Realizable_' + idx + '" onchange="calcular_valor_evaluado_Total();">' +
            '<option value="0"></option>' +
            '<option value="Si">Si</option>' +
            '<option value="No">No</option>' +
            '</select>';
    //calcular_util_bruta('+"'"+idx+"'"+');
    cell5.innerHTML = '<input class="form-control" id="Metraje_' + idx + '" onkeyup="validarNumero(id);calcular_valor_declarado_Total();"/>';
    cell6.innerHTML = '<input class="form-control" id="Precio_' + idx + '" onkeyup="validarNumero(id);calcular_valor_declarado_Total();"/>';
    cell7.innerHTML = '<div id="Val_Inm_Dec_' + idx + '">';
    cell8.innerHTML = '<div id="Val_Inm_Eva_' + idx + '">';
}
function EliminarPatrimonio1() {
    var table = document.getElementById("tablaPatrimonioInmueble");
    var idx = table.rows.length - 2;
    if (table.rows.length > 3) {
        table.deleteRow(idx);
        calcular_valor_declarado_Total();
    }
}
function AgregarPatrimonio2() {

    var table = document.getElementById("tablaPatrimonioVehiculos");
    var idx = table.rows.length - 1;
    var row = table.insertRow(idx);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = '<select class="form-control" id="Veh_Maq_' + idx + '" onchange="Calcular_Valor_Bien_Total();">' +
            '<option value="0"></option>' +
            '<option value="Vehiculo">Vehiculo</option>' +
            '<option value="Maquinaria">Maquinaria</option>' +
            '</select>';
    //calcular_util_bruta('+"'"+idx+"'"+');
    cell2.innerHTML = '<input class="form-control" id="Placa_' + idx + '"/>';
    cell3.innerHTML = '<input class="form-control" id="Valor_Nuevo_' + idx + '" onkeyup="validarNumero(id);Calcular_Valor_Bien_Total();"/>';
    cell4.innerHTML = '<input class="form-control" id="Antiguedad_' + idx + '" onkeyup="validarNumero(id);Calcular_Valor_Bien_Total();"/>';
    cell5.innerHTML = '<div id="Valor_Bien_' + idx + '">';
}
function EliminarPatrimonio2() {
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var idx = table.rows.length - 2;
    if (table.rows.length > 3) {
        table.deleteRow(idx);
    }
}
function getGastosPersonales(){
    var lista = [];
    lista.push(document.getElementById("miembros").value);
    lista.push(document.getElementById("gastos_implicitos").value);
    lista.push(document.getElementById("alquiler").value);
    lista.push(document.getElementById("deuda_personal").value);
    lista.push(document.getElementById("otros_personal").value);
    lista.push(document.getElementById("total_gastpersonal").value);
    return lista;
}
/******************************************************************/
function getFinanciamientoLP(){
    var cant_finan_LP = convNro(document.getElementById("cant_finan_LP").value);
    var listaFinanLP = [];
    listaFinanLP.push(cant_finan_LP);
    for(var i=0; i<cant_finan_LP;i++){
        var idx = i + 1;
        var Tipo_Prod_LP = document.getElementById("Tipo_Prod_LP_"+idx).value;
        listaFinanLP.push(Tipo_Prod_LP);
        var Precio_Venta = convNro(document.getElementById("Precio_Venta_"+idx).value);
        listaFinanLP.push(Precio_Venta);
        var Finan_LP = convNro(document.getElementById("Finan_LP_"+idx).value);
        listaFinanLP.push(Finan_LP);
        var Cuota_Inicial_LP = convNro(document.getElementById("Cuota_Inicial_LP_"+idx).value);
        listaFinanLP.push(Cuota_Inicial_LP);
        var TEA_LP = convNro(document.getElementById("TEA_LP_"+idx).value);
        listaFinanLP.push(TEA_LP);
        var TEM_LP = convNro(document.getElementById("TEM_LP_"+idx).value);
        listaFinanLP.push(TEM_LP);
        var Cuota_LP = convNro(document.getElementById("Cuota_LP_"+idx).value);
        listaFinanLP.push(Cuota_LP);
        var Plazo_LP = convNro(document.getElementById("Plazo_LP_"+idx).value);
        listaFinanLP.push(Plazo_LP);
        var GTIA_LP = convNro(document.getElementById("GTIA_LP_"+idx).value);
        listaFinanLP.push(GTIA_LP);
    }
    return listaFinanLP;
}
function getFinanciamientoCP(){
    var cant_finan_CP = convNro(document.getElementById("cant_finan_CP").value);
    var listaFinanCP = [];
    listaFinanCP.push(cant_finan_CP);
    for(var i=0; i<cant_finan_CP;i++){
        var idx = i + 1;
        var Tipo_Prod_CP = document.getElementById("Tipo_Prod_CP_"+idx).value;
        listaFinanCP.push(Tipo_Prod_CP);
        var Finan_CP = convNro(document.getElementById("Finan_CP_"+idx).value);
        listaFinanCP.push(Finan_CP);
        var TEA_CP = convNro(document.getElementById("TEA_CP_"+idx).value);
        listaFinanCP.push(TEA_CP);
        var TEM_CP = convNro(document.getElementById("TEM_CP_"+idx).value);
        listaFinanCP.push(TEM_CP);
        var Cuota_CP = convNro(document.getElementById("Cuota_CP_"+idx).value);
        listaFinanCP.push(Cuota_CP);
        var Plazo_CP = convNro(document.getElementById("Plazo_CP_"+idx).value);
        listaFinanCP.push(Plazo_CP);
        var GastFin_CP = convNro(document.getElementById("GastFin_CP_"+idx).value);
        listaFinanCP.push(GastFin_CP);
        
    }
    return listaFinanCP;
}
function getPatrimonioInmueble(){
    var listaPat = [];
    var table = document.getElementById("tablaPatrimonioInmueble");
    var total = table.rows.length-2;
    listaPat.push(total);
    for (var i = 0; i< total; i++){
        var idx = i +1;
        var Ubic = document.getElementById("Ubic_"+idx).value;
        listaPat.push(Ubic);
        var Propietario = document.getElementById("Propietario_"+idx).value;
        listaPat.push(Propietario);
        var Uso = document.getElementById("Uso_"+idx).value;
        listaPat.push(Uso);
        var Realizable = document.getElementById("Realizable_"+idx).value;
        listaPat.push(Realizable);
        var Metraje = convNro(document.getElementById("Metraje_"+idx).value);
        listaPat.push(Metraje);
        var Precio = convNro(document.getElementById("Precio_"+idx).value);
        listaPat.push(Precio);
        var Val_Inm_Dec = convNro(document.getElementById("Val_Inm_Dec_"+idx).value);
        listaPat.push(Val_Inm_Dec);
        var Val_Inm_Eva = convNro(document.getElementById("Val_Inm_Eva_"+idx).value);
        listaPat.push(Val_Inm_Eva);
    }
    return listaPat;
}
function getPatrimonioVehMaq() {
    var listaPat = [];
    var table = document.getElementById("tablaPatrimonioVehiculos");
    var total = table.rows.length - 2;
    listaPat.push(total);
    for (var i = 0; i< total; i++){
        var idx = i +1;
        var Veh_Maq = document.getElementById("Veh_Maq_"+idx).value;
        listaPat.push(Veh_Maq);
        var Placa = document.getElementById("Placa_"+idx).value;
        listaPat.push(Placa);
        var Valor_Nuevo = convNro(document.getElementById("Valor_Nuevo_"+idx).value);
        listaPat.push(Valor_Nuevo);
        var Antiguedad = convNro(document.getElementById("Antiguedad_"+idx).value);
        listaPat.push(Antiguedad);
        var Valor_Bien = convNro(document.getElementById("Valor_Bien_"+idx).value);
        listaPat.push(Valor_Bien);
    }
    return listaPat;
}
function getBalanceGeneral() {
    Calcular_Porcentajes_BG();
    var lista = [];
    var bg_1 = convNro(document.getElementById('bg_1').value);
    lista.push(bg_1);
    //var bg_porc_1 = document.getElementById('bg_porc_1').value;
    //lista.push(bg_porc_1);
    var bg_2 = convNro(document.getElementById('bg_2').value);
    lista.push(bg_2);
    //var bg_porc_2 = document.getElementById('bg_porc_2').value;
    //lista.push(bg_porc_2);
    var bg_3 = convNro(document.getElementById('bg_3').value);
    lista.push(bg_3);
    //var bg_porc_3 = (document.getElementById('bg_porc_3').value);
    //lista.push(bg_porc_3);
    var bg_4 = convNro(document.getElementById('bg_4').value);
    lista.push(bg_4);
    //var bg_porc_4 = (document.getElementById('bg_porc_4').value);
    //lista.push(bg_porc_4);
    var bg_5 = convNro(document.getElementById('bg_5').value);
    lista.push(bg_5);
    //var bg_porc_5 = (document.getElementById('bg_porc_5').value);
    //lista.push(bg_porc_5);
    var bg_6 = convNro(document.getElementById('bg_6').value);
    lista.push(bg_6);
    //var bg_porc_6 = (document.getElementById('bg_porc_6').value);
    //lista.push(bg_porc_6);
    var bg_7 = convNro(document.getElementById('bg_7').value);
    lista.push(bg_7);
    //var bg_porc_7 = (document.getElementById('bg_porc_7').value);
    //lista.push(bg_porc_7);
    var bg_8 = convNro(document.getElementById('bg_8').value);
    lista.push(bg_8);
    //var bg_porc_8 = (document.getElementById('bg_porc_8').value);
    //lista.push(bg_porc_8);
    var bg_9 = convNro(document.getElementById('bg_9').value);
    lista.push(bg_9);
    //var bg_porc_9 = (document.getElementById('bg_porc_9').value);
    //lista.push(bg_porc_9);
    var bg_10 = convNro(document.getElementById('bg_10').value);
    lista.push(bg_10);
    //var bg_porc_10 = (document.getElementById('bg_porc_10').value);
    //lista.push(bg_porc_10);
    var bg_11 = convNro(document.getElementById('bg_11').value);
    lista.push(bg_11);
    //var bg_porc_11 = (document.getElementById('bg_porc_11').value);
    //lista.push(bg_porc_11);

    var total_activo_cte = convNro(document.getElementById('total_activo_cte').value);
    lista.push(total_activo_cte);
    //var total_activo_cte_porc = (document.getElementById('total_activo_cte_porc').value);
    ////lista.push(total_activo_cte_porc);

    var bg_12 = convNro(document.getElementById('bg_12').value);
    lista.push(bg_12);
    //var bg_porc_12 = (document.getElementById('bg_porc_12').value);
    //lista.push(bg_porc_12);
    var bg_13 = convNro(document.getElementById('bg_13').value);
    lista.push(bg_13);
    //var bg_porc_13 = (document.getElementById('bg_porc_13').value);
    //lista.push(bg_porc_13 );
    var bg_14 = convNro(document.getElementById('bg_14').value);
    lista.push(bg_14);
    //var bg_porc_14 = (document.getElementById('bg_porc_14').value);
    //lista.push(bg_porc_14);
    var bg_15 = convNro(document.getElementById('bg_15').value);
    lista.push(bg_15);
    //var bg_porc_15 = (document.getElementById('bg_porc_15').value);
    //lista.push(bg_porc_15);

    var total_activo_no_cte = convNro(document.getElementById('total_activo_no_cte').value);
    lista.push(total_activo_no_cte);
    //var total_activo_no_cte_porc = (document.getElementById('total_activo_no_cte_porc').value);
    ////lista.push(total_activo_no_cte_porc);

    var total_activo = convNro(document.getElementById('total_activo').value);
    lista.push(total_activo);

    var bg_16 = convNro(document.getElementById('bg_16').value);
    lista.push(bg_16);
    //var bg_porc_16 = (document.getElementById('bg_porc_16').value);
    //lista.push(bg_porc_16);
    var bg_17 = convNro(document.getElementById('bg_17').value);
    lista.push(bg_17);
    //var bg_porc_17 = (document.getElementById('bg_porc_17').value);
    //lista.push(bg_porc_17);
    var bg_18 = convNro(document.getElementById('bg_18').value);
    lista.push(bg_18);
    //var bg_porc_18 = (document.getElementById('bg_porc_18').value);
    //lista.push(bg_porc_18);

    var total_pasivo_cte = convNro(document.getElementById('total_pasivo_cte').value);
    lista.push(total_pasivo_cte);
    //var total_pasivo_cte_porc = (document.getElementById('total_pasivo_cte_porc').value);
    ////lista.push(total_pasivo_cte_porc);

    var bg_19 = convNro(document.getElementById('bg_19').value);
    lista.push(bg_19);
    //var bg_porc_19 = (document.getElementById('bg_porc_19').value);
    //lista.push(bg_porc_19);
    var bg_20 = convNro(document.getElementById('bg_20').value);
    lista.push(bg_20);
    //var bg_porc_20 = (document.getElementById('bg_porc_20').value);
    //lista.push(bg_porc_20);
    var bg_21 = convNro(document.getElementById('bg_21').value);
    lista.push(bg_21);
    //var bg_porc_21 = (document.getElementById('bg_porc_21').value);
    //lista.push(bg_porc_21);

    var total_pasivo_no_cte = convNro(document.getElementById('total_pasivo_no_cte').value);
    lista.push(total_pasivo_no_cte);
    //var total_pasivo_no_cte_porc = (document.getElementById('total_pasivo_no_cte_porc').value);
    ////lista.push(total_pasivo_no_cte_porc);

    var total_pasivo = convNro(document.getElementById('total_pasivo').value);
    lista.push(total_pasivo);
    //var total_pasivo_porc = (document.getElementById('total_pasivo_porc').value);
    ////lista.push(total_pasivo_porc);

    var patrimonio = convNro(document.getElementById('patrimonio').value);
    lista.push(patrimonio);
    //var patrimonio_porc = (document.getElementById('patrimonio_porc').value);
    //lista.push(patrimonio_porc);

    var pasivo_patrimonio = convNro(document.getElementById('pasivo_patrimonio').value);
    lista.push(pasivo_patrimonio);


    return lista;
}
function getEstadoResultados() {
    var lista = [];
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);
    lista.push(egp_ventas);
    var egp_costoven = convNro(document.getElementById("egp_costoven").value);
    lista.push(egp_costoven);
    var egp_costoven_p = document.getElementById("egp_costoven_p").value;
    //lista.push(egp_costoven_p);
    var egp_gastop = convNro(document.getElementById("egp_gastop").value);
    lista.push(egp_gastop);
    var egp_gastop_p = convNro(document.getElementById("egp_gastop_p").value);
    //lista.push(egp_gastop_p);
    var egp_uoperativa = egp_ventas - egp_costoven - egp_gastop;
    lista.push(egp_uoperativa);
    var egp_uoperativa_p = document.getElementById("egp_uoperativa_p").value;
    //lista.push(egp_uoperativa_p);
    var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
    lista.push(egp_gastfinan);
    var egp_gastfinan_p = document.getElementById("egp_gastfinan_p").value;
    //lista.push(egp_gastfinan_p);
    var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
    lista.push(egp_gastfam);
    var egp_gastfam_p = document.getElementById("egp_gastfam_p").value;
    //lista.push(egp_gastfam_p);
    var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
    lista.push(egp_otrosing);
    var egp_otrosing_p = document.getElementById("egp_otrosing_p").value;
    //lista.push(egp_otrosing_p);
    var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
    lista.push(egp_impuestos);
    var egp_impuestos_p = convNro(document.getElementById("egp_impuestos_p").value);
    //lista.push(egp_impuestos_p);
    var egp_uneta = egp_uoperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
    lista.push(egp_uneta);
    var egp_uneta_p = convNro(document.getElementById("egp_uneta_p").value);
    //lista.push(egp_uneta_p);
    var espOtrosIng = document.getElementById("espOtrosIng").value;
    lista.push(espOtrosIng);
    return lista;
}
function getCanalizacion() {
    var lista = [];
    var AnteriorIngresos = convNro(document.getElementById("AnteriorIngresos").value);
    lista.push(AnteriorIngresos);
    var AnteriorSMA = convNro(document.getElementById("AnteriorSMA").value);
    lista.push(AnteriorSMA);
    var EnCursoIngresos = convNro(document.getElementById("EnCursoIngresos").value);
    lista.push(EnCursoIngresos);
    var EnCursoSMA = convNro(document.getElementById("EnCursoSMA").value);
    lista.push(EnCursoSMA);
    return lista;
}
function getRatios() {
    var lista = [];
    var LiquidezCTE = convNro(document.getElementById("LiquidezCTE").value);
    LiquidezCTE = Number(LiquidezCTE).toFixed(2);
    lista.push(LiquidezCTE);
    var CapitalTrabajo = convNro(document.getElementById("CapitalTrabajo").value);
    CapitalTrabajo = Number(CapitalTrabajo).toFixed(2);
    lista.push(CapitalTrabajo);
    var DiasExistencias = convNro(document.getElementById("DiasExistencias").value);
    DiasExistencias = Number(DiasExistencias).toFixed(2);
    lista.push(DiasExistencias);
    var DiasCobro = convNro(document.getElementById("DiasCobro").value);
    DiasCobro = Number(DiasCobro).toFixed(2);
    lista.push(DiasCobro);
    var DiasPago = convNro(document.getElementById("DiasPago").value);
    DiasPago = Number(DiasPago).toFixed(2);
    lista.push(DiasPago);
    var CicloNegocio = convNro(document.getElementById("CicloNegocio").value);
    CicloNegocio = Number(CicloNegocio).toFixed(2);
    lista.push(CicloNegocio);
    var PayBack = convNro(document.getElementById("PayBack").value);
    PayBack = Number(PayBack).toFixed(2);
    lista.push(PayBack);
    var CoberturaDeuda = convNro(document.getElementById("CoberturaDeuda").value);
    CoberturaDeuda = Number(CoberturaDeuda).toFixed(2);
    lista.push(CoberturaDeuda);
    return lista;
}
/*******************************************************************/
function Calcular_BG() {
    Calcular_Activos();
    Calcular_Pasivos();
    Calcular_Patrimonio();
    Calcular_Porcentajes_BG();
}
function Calcular_Activos() {
    var actCorrientes = Calcular_Activos_Corrientes();
    var actNoCorrientes = Calcular_Activos_No_Corrientes();
    var total_activo = actCorrientes + actNoCorrientes;
    document.getElementById("total_activo").value = total_activo;
    document.getElementById("total_activo").innerHTML = Number(total_activo).toLocaleString('en');
    return convNro(total_activo);
}
function Calcular_Activos_Corrientes() {
    var bg_1 = convNro(document.getElementById("bg_1").value);
    var bg_2 = convNro(document.getElementById("bg_2").value);
    var bg_3 = convNro(document.getElementById("bg_3").value);
    var bg_4 = convNro(document.getElementById("bg_4").value);
    var bg_5 = Calcular_Inventarios();
    var actCorrientes = bg_1 + bg_2 + bg_3 + bg_4 + bg_5;
    document.getElementById("total_activo_cte").value = actCorrientes;
    document.getElementById("total_activo_cte").innerHTML = Number(actCorrientes).toLocaleString('en');
    return convNro(actCorrientes);
}
function Calcular_Inventarios() {
    var bg_6 = Calcular_Activos_CP();
    var bg_7 = convNro(document.getElementById("bg_7").value);
    var bg_8 = convNro(document.getElementById("bg_8").value);
    var bg_9 = convNro(document.getElementById("bg_9").value);
    var bg_10 = convNro(document.getElementById("bg_10").value);
    var bg_11 = Calcular_Linea_No_Utilizada();
    var inventarios = bg_6 + bg_7 + bg_8 + bg_9 + bg_10 + bg_11;
    document.getElementById("bg_5").value = inventarios;
    document.getElementById("bg_5").innerHTML = Number(inventarios).toLocaleString('en');
    return convNro(inventarios);
}
function Calcular_Activos_CP() {
    var idx = Number(document.getElementById("cant_finan_CP").value);
    var bg_6 = 0;
    for (var i = 0; i < idx; i++) {
        var Prod_CP = document.getElementById("Tipo_Prod_CP_" + (i + 1)).value;
        var Finan_CP = 0;
        if(Prod_CP != "Subrogación de deuda"){
            Finan_CP = convNro(document.getElementById("Finan_CP_" + (i + 1)).value);
        }
        bg_6 = bg_6 + Finan_CP;
    }
    document.getElementById("bg_6").value = bg_6;
    document.getElementById("bg_6").innerHTML = Number(bg_6).toLocaleString('en');
    return convNro(bg_6);
}
function Calcular_Linea_No_Utilizada() {
    var bg_11 = 0;

    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;

    var S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        bg_11 = bg_11 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value) - convNro(document.getElementById("LTC_Linea_Utilizada_" + idx).value);
    }

    document.getElementById("bg_11").value = bg_11;
    document.getElementById("bg_11").innerHTML = Number(bg_11).toLocaleString('en');

    return convNro(bg_11);
}
function Calcular_Activos_No_Corrientes() {
    var bg_12 = Calcular_Activos_LP();
    var bg_13 = convNro(document.getElementById("bg_13").value);
    var bg_14 = convNro(document.getElementById("bg_14").value);
    var bg_15 = convNro(document.getElementById("bg_15").value);
    var actNoCorrientes = bg_12 + bg_13 + bg_14 + bg_15;
    document.getElementById("total_activo_no_cte").value = actNoCorrientes;
    document.getElementById("total_activo_no_cte").innerHTML = Number(actNoCorrientes).toLocaleString('en');
    return convNro(actNoCorrientes);
}
function Calcular_Activos_LP() {
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var actLP = 0;
    for (var i = 0; i < idx; i++) {
        var Precio_Venta = convNro(document.getElementById("Precio_Venta_" + (i + 1)).value);
        actLP = actLP + Precio_Venta;
    }
    // for (var i = 0; i < idx; i++) {
    //     var Prod_LP = document.getElementById("Tipo_Prod_LP_" + (i + 1)).value;
    //     var Precio_Venta = 0;
    //     if(Prod_LP != "Subrogación de deuda"){
    //         Precio_Venta = convNro(document.getElementById("Precio_Venta_" + (i + 1)).value);
    //     }
    //     actLP = actLP + Precio_Venta;
    // }
    document.getElementById("bg_12").value = actLP;
    document.getElementById("bg_12").innerHTML = Number(actLP).toLocaleString('en');
    return convNro(actLP);
}
function Calcular_Pasivos() {
    var pasCorrientes = Calcular_Pasivos_Corrientes();
    var pasNoCorrientes = Calcular_Pasivos_No_Corrientes();
    var total_pasivo = pasCorrientes + pasNoCorrientes;
    document.getElementById("total_pasivo").value = total_pasivo;
    document.getElementById("total_pasivo").innerHTML = Number(total_pasivo).toLocaleString('en');
    return convNro(total_pasivo);
}
function Calcular_Pasivos_Corrientes() {
    var bg_16 = Calcular_Deuda_Financiera_CP();
    var bg_17 = convNro(document.getElementById("bg_17").value);
    var bg_18 = convNro(document.getElementById("bg_18").value);
    var total_pasivo_cte = bg_16 + bg_17 + bg_18;
    document.getElementById("total_pasivo_cte").value = total_pasivo_cte;
    document.getElementById("total_pasivo_cte").innerHTML = Number(total_pasivo_cte).toLocaleString('en');
    return convNro(total_pasivo_cte);
}
function Calcular_Deuda_Financiera_CP() {
    var suma_cp = Calcular_Activos_CP();

    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);
    }

    S1 = LTC_S1 + PCCT_S1;

    var S2 = 0;
    var PC_S2 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S2 = PC_S2 + convNro(document.getElementById("PC_Monto_" + idx).value);
    }

    var pasCP = convNro(S1) + convNro(PC_S2) + convNro(suma_cp);
    document.getElementById("bg_16").value = pasCP;
    document.getElementById("bg_16").innerHTML = Number(pasCP).toLocaleString('en');
    return convNro(pasCP);
}
function Calcular_Pasivos_No_Corrientes() {
    var bg_19 = Calcular_Deuda_Financiera_LP();
    var bg_20 = convNro(document.getElementById("bg_20").value);
    var bg_21 = convNro(document.getElementById("bg_21").value);
    var total_pasivo_cte = bg_19 + bg_20 + bg_21;
    document.getElementById("total_pasivo_no_cte").value = total_pasivo_cte;
    document.getElementById("total_pasivo_no_cte").innerHTML = Number(total_pasivo_cte).toLocaleString('en');
    return convNro(total_pasivo_cte);
}
function Calcular_Pasivos_LP() {
    var idx = Number(document.getElementById("cant_finan_LP").value);
    var pasLP = 0;
    for (var i = 0; i < idx; i++) {
        var Finan_LP = convNro(document.getElementById("Finan_LP_" + (i + 1)).value);
        pasLP = pasLP + Finan_LP;
    }

    return convNro(pasLP);
}
function Calcular_Deuda_Financiera_LP() {
    var suma_lp = Calcular_Pasivos_LP();
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S4 = 0;
    var M1 = 0;
    var M2 = 0; 
    if(PA_filas >0){
        M1 = convNro(document.getElementById("PA_Mes_Actual_0").value);
        M2 = convNro(document.getElementById("PA_Mes_Anterior_0").value);
    }
    // for (var idx = 0; idx < PA_filas; idx++) {
    //     PA_S4 = PA_S4 + convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    // }
    
    var PA_DIFF = convNro(document.getElementById("PA_DIFF").value);

    if(PA_DIFF > 0){
        
        if(M1 == 0 && M2 == 0){
            PA_S4 = PA_DIFF;
        }else if(M2 > M1){
            PA_S4 = M1 + PA_DIFF;
        }
    }else{
        PA_S4 = M1;
    }
    var pasLP = convNro(suma_lp) + convNro(PA_S4);

    document.getElementById("bg_19").value = pasLP;
    document.getElementById("bg_19").innerHTML = Number(pasLP).toLocaleString('en');
    return convNro(pasLP);
}
function Calcular_Patrimonio() {
    var activos = Calcular_Activos();
    var pasivos = Calcular_Pasivos();
    var patrimonio = activos - pasivos;
    document.getElementById("patrimonio").value = patrimonio;
    document.getElementById("patrimonio").innerHTML = Number(patrimonio).toLocaleString('en');
    document.getElementById("pasivo_patrimonio").value = activos;
    document.getElementById("pasivo_patrimonio").innerHTML = Number(activos).toLocaleString('en');
    return convNro(patrimonio);
}
function Calcular_Porcentajes_BG() {
    var total_activos = Calcular_Activos();

    if (total_activos != 0) {
        var bg_1 = convNro(document.getElementById("bg_1").value);
        document.getElementById("bg_porc_1").value = Number(100 * bg_1 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_1").innerHTML = Number(100 * bg_1 / total_activos).toFixed(0) + "%";
        var bg_2 = convNro(document.getElementById("bg_2").value);
        document.getElementById("bg_porc_2").value = Number(100 * bg_2 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_2").innerHTML = Number(100 * bg_2 / total_activos).toFixed(0) + "%";
        var bg_3 = convNro(document.getElementById("bg_3").value);
        document.getElementById("bg_porc_3").value = Number(100 * bg_3 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_3").innerHTML = Number(100 * bg_3 / total_activos).toFixed(0) + "%";
        var bg_4 = convNro(document.getElementById("bg_4").value);
        document.getElementById("bg_porc_4").value = Number(100 * bg_4 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_4").innerHTML = Number(100 * bg_4 / total_activos).toFixed(0) + "%";
        var bg_5 = convNro(document.getElementById("bg_5").value);
        document.getElementById("bg_porc_5").value = Number(100 * bg_5 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_5").innerHTML = Number(100 * bg_5 / total_activos).toFixed(0) + "%";
        var bg_6 = convNro(document.getElementById("bg_6").value);
        document.getElementById("bg_porc_6").value = Number(100 * bg_6 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_6").innerHTML = Number(100 * bg_6 / total_activos).toFixed(0) + "%";
        var bg_7 = convNro(document.getElementById("bg_7").value);
        document.getElementById("bg_porc_7").value = Number(100 * bg_7 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_7").innerHTML = Number(100 * bg_7 / total_activos).toFixed(0) + "%";
        var bg_8 = convNro(document.getElementById("bg_8").value);
        document.getElementById("bg_porc_8").value = Number(100 * bg_8 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_8").innerHTML = Number(100 * bg_8 / total_activos).toFixed(0) + "%";
        var bg_9 = convNro(document.getElementById("bg_9").value);
        document.getElementById("bg_porc_9").value = Number(100 * bg_9 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_9").innerHTML = Number(100 * bg_9 / total_activos).toFixed(0) + "%";
        var bg_10 = convNro(document.getElementById("bg_10").value);
        document.getElementById("bg_porc_10").value = Number(100 * bg_10 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_10").innerHTML = Number(100 * bg_10 / total_activos).toFixed(0) + "%";
        var bg_11 = convNro(document.getElementById("bg_11").value);
        document.getElementById("bg_porc_11").value = Number(100 * bg_11 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_11").innerHTML = Number(100 * bg_11 / total_activos).toFixed(0) + "%";
        var total_activo_cte = convNro(document.getElementById("total_activo_cte").value);
        document.getElementById("total_activo_cte_porc").value = Number(100 * total_activo_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_activo_cte_porc").innerHTML = Number(100 * total_activo_cte / total_activos).toFixed(0) + "%";

        var bg_12 = convNro(document.getElementById("bg_12").value);
        document.getElementById("bg_porc_12").value = Number(100 * bg_12 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_12").innerHTML = Number(100 * bg_12 / total_activos).toFixed(0) + "%";
        var bg_13 = convNro(document.getElementById("bg_13").value);
        document.getElementById("bg_porc_13").value = Number(100 * bg_13 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_13").innerHTML = Number(100 * bg_13 / total_activos).toFixed(0) + "%";
        var bg_14 = convNro(document.getElementById("bg_14").value);
        document.getElementById("bg_porc_14").value = Number(100 * bg_14 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_14").innerHTML = Number(100 * bg_14 / total_activos).toFixed(0) + "%";
        var bg_15 = convNro(document.getElementById("bg_15").value);
        document.getElementById("bg_porc_15").value = Number(100 * bg_15 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_15").innerHTML = Number(100 * bg_15 / total_activos).toFixed(0) + "%";
        var total_activo_no_cte = convNro(document.getElementById("total_activo_no_cte").value);
        document.getElementById("total_activo_no_cte_porc").value = Number(100 * total_activo_no_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_activo_no_cte_porc").innerHTML = Number(100 * total_activo_no_cte / total_activos).toFixed(0) + "%";

        var bg_16 = convNro(document.getElementById("bg_16").value);
        document.getElementById("bg_porc_16").value = Number(100 * bg_16 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_16").innerHTML = Number(100 * bg_16 / total_activos).toFixed(0) + "%";
        var bg_17 = convNro(document.getElementById("bg_17").value);
        document.getElementById("bg_porc_17").value = Number(100 * bg_17 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_17").innerHTML = Number(100 * bg_17 / total_activos).toFixed(0) + "%";
        var bg_18 = convNro(document.getElementById("bg_18").value);
        document.getElementById("bg_porc_18").value = Number(100 * bg_18 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_18").innerHTML = Number(100 * bg_18 / total_activos).toFixed(0) + "%";
        var total_pasivo_cte = convNro(document.getElementById("total_pasivo_cte").value);
        document.getElementById("total_pasivo_cte_porc").value = Number(100 * total_pasivo_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_cte_porc").innerHTML = Number(100 * total_pasivo_cte / total_activos).toFixed(0) + "%";

        var bg_19 = convNro(document.getElementById("bg_19").value);
        document.getElementById("bg_porc_19").value = Number(100 * bg_19 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_19").innerHTML = Number(100 * bg_19 / total_activos).toFixed(0) + "%";
        var bg_20 = convNro(document.getElementById("bg_20").value);
        document.getElementById("bg_porc_20").value = Number(100 * bg_20 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_20").innerHTML = Number(100 * bg_20 / total_activos).toFixed(0) + "%";
        var bg_21 = convNro(document.getElementById("bg_21").value);
        document.getElementById("bg_porc_21").value = Number(100 * bg_21 / total_activos).toFixed(0) + "%";
        document.getElementById("bg_porc_21").innerHTML = Number(100 * bg_21 / total_activos).toFixed(0) + "%";
        var total_pasivo_no_cte = document.getElementById("total_pasivo_no_cte").value;
        document.getElementById("total_pasivo_no_cte_porc").value = Number(100 * total_pasivo_no_cte / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_no_cte_porc").innerHTML = Number(100 * total_pasivo_no_cte / total_activos).toFixed(0) + "%";

        var total_pasivo = convNro(document.getElementById("total_pasivo").value);
        document.getElementById("total_pasivo_porc").value = Number(100 * total_pasivo / total_activos).toFixed(0) + "%";
        document.getElementById("total_pasivo_porc").innerHTML = Number(100 * total_pasivo / total_activos).toFixed(0) + "%";
        var patrimonio = convNro(document.getElementById("patrimonio").value);
        document.getElementById("patrimonio_porc").value = Number(100 * patrimonio / total_activos).toFixed(0) + "%";
        document.getElementById("patrimonio_porc").innerHTML = Number(100 * patrimonio / total_activos).toFixed(0) + "%";
    } else {
        document.getElementById("bg_porc_1").innerHTML = "";
        document.getElementById("bg_porc_2").innerHTML = "";
        document.getElementById("bg_porc_3").innerHTML = "";
        document.getElementById("bg_porc_4").innerHTML = "";
        document.getElementById("bg_porc_5").innerHTML = "";
        document.getElementById("bg_porc_6").innerHTML = "";
        document.getElementById("bg_porc_7").innerHTML = "";
        document.getElementById("bg_porc_8").innerHTML = "";
        document.getElementById("bg_porc_9").innerHTML = "";
        document.getElementById("bg_porc_10").innerHTML = "";
        document.getElementById("bg_porc_11").innerHTML = "";
        document.getElementById("total_activo_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_12").innerHTML = "";
        document.getElementById("bg_porc_13").innerHTML = "";
        document.getElementById("bg_porc_14").innerHTML = "";
        document.getElementById("bg_porc_15").innerHTML = "";
        document.getElementById("total_activo_no_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_16").innerHTML = "";
        document.getElementById("bg_porc_17").innerHTML = "";
        document.getElementById("bg_porc_18").innerHTML = "";
        document.getElementById("total_pasivo_cte_porc").innerHTML = "";

        document.getElementById("bg_porc_19").innerHTML = "";
        document.getElementById("bg_porc_20").innerHTML = "";
        document.getElementById("bg_porc_21").innerHTML = "";
        document.getElementById("total_pasivo_no_cte_porc").innerHTML = "";

        document.getElementById("total_pasivo_porc").innerHTML = "";
        document.getElementById("patrimonio_porc").innerHTML = "";

    }
}
/********************************************************************/
function Calcular_EGP() {
    var ventas = convNro(document.getElementById("egp_ventas").value);
    var costo = convNro(document.getElementById("egp_costoven").value);
    var gOperativo = convNro(document.getElementById("egp_gastop").value);
    var uOperativa = ventas - costo - gOperativo;
    document.getElementById("egp_uoperativa").innerHTML = Number(uOperativa).toLocaleString('en');
    document.getElementById("egp_uoperativa").value = uOperativa;
    var egp_gastfinan = Calcular_Gastos_Financieros();
    var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
    var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
    var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
    var egp_uneta = uOperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
    if(egp_uneta <0){
        document.getElementById("alertaUt").style.display = '';
    }else{
        document.getElementById("alertaUt").style.display = 'none';
    }
    document.getElementById("egp_uneta").value = egp_uneta;
    document.getElementById("egp_uneta").innerHTML = Number(Number(egp_uneta).toFixed(0)).toLocaleString('en');
    Calcular_Porcentajes_EGP();
}
function Calcular_Gastos_Financieros() {
    var egp_gastfinan = 0;
    var suma1 = 0;

    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }

    var cuotas = Calcular_Cuotas_LP_Total();
    suma1 = convNro(cuotas) + convNro(PA_S5);
    var suma2 = 0;
    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Costo_Financiero_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Costo_Financiero_" + idx).value);
    }

    S1 = LTC_S1 + PCCT_S1;

    var S2 = 0;
    var PC_S2 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S2 = PC_S2 + convNro(document.getElementById("PC_Costo_Financiero_" + idx).value);
    }

    var i1 = convNro(S1) + convNro(PC_S2);

    var i2 = 0;

    var idx = document.getElementById("cant_finan_CP").value;
    for (var i = 1; i <= idx; i++) {
        i2 = i2 + Calcular_GastFin_CP(i);
    }



    suma2 = i1 + i2;
    egp_gastfinan = suma1 + suma2;
    document.getElementById("egp_gastfinan").value = egp_gastfinan;
    egp_gastfinan = Number(egp_gastfinan).toFixed(0);
    document.getElementById("egp_gastfinan").innerHTML = Number(egp_gastfinan).toLocaleString('en');
    return convNro(egp_gastfinan);
}
function Calcular_Porcentajes_EGP() {
    var egp_ventas = convNro(document.getElementById("egp_ventas").value);

    if (egp_ventas != 0) {
        document.getElementById("egp_ventas_p").value = "100%";
        document.getElementById("egp_ventas_p").innerHTML = "100%";
        var egp_costoven = convNro(document.getElementById("egp_costoven").value);
        var egp_costoven_p = egp_costoven * 100 / egp_ventas;
        document.getElementById("egp_costoven_p").value = Number(egp_costoven_p).toFixed(0) + "%";
        document.getElementById("egp_costoven_p").innerHTML = Number(egp_costoven_p).toFixed(0) + "%";
        var egp_gastop = convNro(document.getElementById("egp_gastop").value);
        var egp_gastop_p = egp_costoven * 100 / egp_ventas;
        document.getElementById("egp_gastop_p").value = Number(egp_gastop_p).toFixed(0) + "%";
        document.getElementById("egp_gastop_p").innerHTML = Number(egp_gastop_p).toFixed(0) + "%";
        var egp_uoperativa = egp_ventas - egp_costoven - egp_gastop;
        var egp_uoperativa_p = egp_uoperativa * 100 / egp_ventas;
        document.getElementById("egp_uoperativa_p").value = Number(egp_uoperativa_p).toFixed(0) + "%";
        document.getElementById("egp_uoperativa_p").innerHTML = Number(egp_uoperativa_p).toFixed(0) + "%";
        var egp_gastfinan = convNro(document.getElementById("egp_gastfinan").value);
        var egp_gastfinan_p = egp_gastfinan * 100 / egp_ventas;
        document.getElementById("egp_gastfinan_p").value = Number(egp_gastfinan_p).toFixed(0) + "%";
        document.getElementById("egp_gastfinan_p").innerHTML = Number(egp_gastfinan_p).toFixed(0) + "%";
        var egp_gastfam = convNro(document.getElementById("egp_gastfam").value);
        var egp_gastfam_p = egp_gastfam * 100 / egp_ventas;
        document.getElementById("egp_gastfam_p").value = Number(egp_gastfam_p).toFixed(0) + "%";
        document.getElementById("egp_gastfam_p").innerHTML = Number(egp_gastfam_p).toFixed(0) + "%";
        var egp_otrosing = convNro(document.getElementById("egp_otrosing").value);
        var egp_otrosing_p = egp_otrosing * 100 / egp_ventas;
        document.getElementById("egp_otrosing_p").value = Number(egp_otrosing_p).toFixed(0) + "%";
        document.getElementById("egp_otrosing_p").innerHTML = Number(egp_otrosing_p).toFixed(0) + "%";
        var egp_impuestos = convNro(document.getElementById("egp_impuestos").value);
        var egp_impuestos_p = egp_impuestos * 100 / egp_ventas;
        document.getElementById("egp_impuestos_p").value = Number(egp_impuestos_p).toFixed(0) + "%";
        document.getElementById("egp_impuestos_p").innerHTML = Number(egp_impuestos_p).toFixed(0) + "%";
        var egp_uneta = egp_uoperativa - egp_gastfinan - egp_gastfam + egp_otrosing - egp_impuestos;
        var egp_uneta_p = egp_uneta * 100 / egp_ventas;
        document.getElementById("egp_uneta_p").value = Number(egp_uneta_p).toFixed(0) + "%";
        document.getElementById("egp_uneta_p").innerHTML = Number(egp_uneta_p).toFixed(0) + "%";
    } else {
        document.getElementById("egp_ventas_p").innerHTML = "";
        document.getElementById("egp_costoven_p").innerHTML = "";
        document.getElementById("egp_gastop_p").innerHTML = "";
        document.getElementById("egp_uoperativa_p").innerHTML = "";
        document.getElementById("egp_gastfinan_p").innerHTML = "";
        document.getElementById("egp_gastfam_p").innerHTML = "";
        document.getElementById("egp_otrosing_p").innerHTML = "";
        document.getElementById("egp_impuestos_p").innerHTML = "";
        document.getElementById("egp_uneta_p").innerHTML = "";
    }
}
/********************************************************************/
var TEALTC = 0.3401;
var TEAPCCT = 0.2362;
var TEAPC = 0.2362;
var TEAPA = 0.2133;
var TEAPPLibre = 0.2556;
var TEAPPVehicular = 0.1048;
var TEAPPHipotecario = 0.0894;
var TEATC = 0.4650;

function retornarTEM(TEA) {
    var TEA = Math.pow((1 + TEA), (1 / 12)) - 1 + 0.0015;
    return Number(TEA).toFixed(10);
}
function Calcular_Cuota_Pagar(tasa, plazo, deuda) {
    tasa = Number(tasa);
    plazo = Number(plazo);
    deuda = Number(deuda);
    var p1 = 1 + tasa;
    var p2 = Math.pow(p1, -plazo);
    var p3 = 1 - p2;
    var p4 = p3 / tasa;
    var p5 = deuda / p4;
    p5 = convNro(p5);
    return Number(p5).toFixed(2);
}
function CalcularNroCuotas(Mes_Anterior, TEM, Cuota, Mes_Actual) {
    if (Mes_Anterior > Mes_Actual) {
        Mes_Anterior = Number(Mes_Anterior);
        TEM = Number(TEM);
        Cuota = Number(Cuota);
        Mes_Actual = Number(Mes_Actual);
        var cantCuotas = 0;
        var saldo = Mes_Anterior;
        if (Cuota > 0) {
            while (saldo > 0) {
                Mes_Anterior = saldo;
                var interes = Mes_Anterior * TEM;
                var amorCap = Cuota - interes;
                saldo = Mes_Anterior - amorCap;
                cantCuotas = cantCuotas + 1;
            }
        }
        return cantCuotas - 1;
    }
    return 0;
}
function EliminarLineaTarjeta() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Linea_Tarjeta_Total();
}
function AgregarLineaTarjeta() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var TEM = retornarTEM(TEALTC);
    TEM = Number(TEM).toFixed(4);
    cell1.innerHTML = '<div><input class="form-control" type="text" id="LTC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="LTC_Linea_Utilizada_' + idx + '" onkeyup="validarNumero(id);"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="LTC_Linea_Total_' + idx + '" onkeyup="validarNumero(id);Calcular_Linea_Tarjeta_Total()"/></div>';
    var cell4 = '<div style="display:none" id="LTC_TEA_' + idx + '">' + TEALTC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="LTC_TEM_' + idx + '">' + TEM * 100 + '%</div>';
    cell6.innerHTML = cell4 + '<div id="LTC_Costo_Financiero_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="LTC_Costo_Aprox_Pagar_' + idx + '"></div>';
}
function Calcular_Linea_Tarjeta(idx) {
    var LTC_Linea_Utilizada = convNro(document.getElementById("LTC_Linea_Utilizada_" + idx).value);
    var LTC_Linea_Total = convNro(document.getElementById("LTC_Linea_Total_" + idx).value);

    var TEM = retornarTEM(TEALTC);

    var LTC_Costo_Financiero = LTC_Linea_Total * TEM;
    LTC_Costo_Financiero = Number(LTC_Costo_Financiero).toFixed(2);

    var LTC_Costo_Aprox_Pagar = Calcular_Cuota_Pagar(TEM, 24, LTC_Linea_Total);
    LTC_Costo_Aprox_Pagar = Number(LTC_Costo_Aprox_Pagar).toFixed(2);

    document.getElementById("LTC_Costo_Financiero_" + idx).innerHTML = Number(LTC_Costo_Financiero).toLocaleString('en');
    document.getElementById("LTC_Costo_Financiero_" + idx).value = LTC_Costo_Financiero;
    document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).innerHTML = Number(LTC_Costo_Aprox_Pagar).toLocaleString('en');
    document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).value = LTC_Costo_Aprox_Pagar;
}
function Calcular_Linea_Tarjeta_Total() {
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Linea_Tarjeta(idx);
    }
    Calcular_Resumen();
    Calcular_Linea_No_Utilizada();
}
function EliminarPrestamoComercial() {
    var table = document.getElementById("tablaPrestamoComercial");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Comercial_Total();
}
function AgregarPrestamoComercial() {
    var table = document.getElementById("tablaPrestamoComercial");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);

    var TEM = retornarTEM(TEAPCCT);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PCCT_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    var cell4 = '<div style="display:none" id="PCCT_TEA_' + idx + '">' + TEAPCCT * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PCCT_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + '<div id="PCCT_Amort_Capital_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PCCT_Costo_Financiero_' + idx + '"></div>';
    cell8.innerHTML = '<div id="PCCT_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PCCT_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Comercial(idx) {
    var PCCT_Mes_Anterior = convNro(document.getElementById("PCCT_Mes_Anterior_" + idx).value);
    var PCCT_Mes_Actual = convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);

    var PCCT_Amort_Capital = PCCT_Mes_Anterior - PCCT_Mes_Actual;
    document.getElementById("PCCT_Amort_Capital_" + idx).innerHTML = Number(PCCT_Amort_Capital).toLocaleString('en');
    document.getElementById("PCCT_Amort_Capital_" + idx).value = PCCT_Amort_Capital;

    var TEM = retornarTEM(TEAPCCT);
    var PCCT_Costo_Financiero = PCCT_Mes_Anterior * TEM;
    PCCT_Costo_Financiero = Number(PCCT_Costo_Financiero).toFixed(0);
    document.getElementById("PCCT_Costo_Financiero_" + idx).innerHTML = Number(PCCT_Costo_Financiero).toLocaleString('en');
    document.getElementById("PCCT_Costo_Financiero_" + idx).value = PCCT_Costo_Financiero;
    PCCT_Amort_Capital = Number(PCCT_Amort_Capital);
    PCCT_Costo_Financiero = Number(PCCT_Costo_Financiero);
    var PCCT_Cuota_Pagar_Aprox = PCCT_Amort_Capital + PCCT_Costo_Financiero;
    PCCT_Cuota_Pagar_Aprox = Number(PCCT_Cuota_Pagar_Aprox).toFixed(0);
    document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PCCT_Cuota_Pagar_Aprox).toLocaleString('en');
    document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).value = PCCT_Cuota_Pagar_Aprox;

    var PCCT_Nro_Cuota = CalcularNroCuotas(PCCT_Mes_Anterior, TEM, PCCT_Cuota_Pagar_Aprox, PCCT_Mes_Actual);
    document.getElementById("PCCT_Nro_Cuota_" + idx).innerHTML = Number(PCCT_Nro_Cuota).toLocaleString('en');
    document.getElementById("PCCT_Nro_Cuota_" + idx).value = PCCT_Nro_Cuota;
}
function Calcular_Prestamo_Comercial_Total() {
    var table = document.getElementById("tablaPrestamoComercial");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Comercial(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoCancelable() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Cancelable_Total();
}
function AgregarPrestamoCancelable() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);

    var TEM = retornarTEM(TEAPC);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PC_Monto_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Cancelable_Total();"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PC_Periodo_' + idx + '" onkeyup="validarNumero(id);"/></div>';
    var cell4 = '<div style="display:none" id="PC_TEA_' + idx + '">' + TEAPC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PC_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + cell5 + '<div id="PC_Costo_Financiero_' + idx + '"></div>';
}
function Calcular_Prestamo_Cancelable(idx) {
    var PC_Monto = convNro(document.getElementById("PC_Monto_" + idx).value);

    var TEM = retornarTEM(TEAPC);

    var PC_Costo_Financiero = PC_Monto * TEM;
    PC_Costo_Financiero = Number(PC_Costo_Financiero).toFixed(2);
    document.getElementById("PC_Costo_Financiero_" + idx).innerHTML = Number(PC_Costo_Financiero).toLocaleString('en');
    document.getElementById("PC_Costo_Financiero_" + idx).value = PC_Costo_Financiero;
}
function Calcular_Prestamo_Cancelable_Total() {
    var table = document.getElementById("tablaPrestamoCancelable");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Cancelable(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoAdquisicion() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Adquisicion_Total();
}
function AgregarPrestamoAdquisicion() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);

    var TEM = retornarTEM(TEAPA);
    TEM = Number(TEM).toFixed(4);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PA_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="PA_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Adquisicion_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PA_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Adquisicion_Total()"/></div>';
    var cell4 = '<div style="display:none" id="PA_TEA_' + idx + '">' + TEAPA * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="PA_TEM_' + idx + '">' + Number(TEM * 100).toFixed(2) + '%</div>';
    cell6.innerHTML = cell4 + '<div id="PA_Amort_Capital_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PA_Costo_Financiero_' + idx + '"></div>';
    cell8.innerHTML = '<div id="PA_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PA_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Adquisicion(idx) {
    var PA_Mes_Anterior = convNro(document.getElementById("PA_Mes_Anterior_" + idx).value);
    var PA_Mes_Actual = convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    var PA_DIFF = convNro(document.getElementById("PA_DIFF").value);

    var PA_Amort_Capital = PA_Mes_Anterior - PA_Mes_Actual;
    document.getElementById("PA_Amort_Capital_" + idx).innerHTML = Number(PA_Amort_Capital).toLocaleString('en');
    document.getElementById("PA_Amort_Capital_" + idx).value = PA_Amort_Capital;

    var TEM = retornarTEM(TEAPA);
    var PA_Costo_Financiero = PA_Mes_Anterior * TEM;
    PA_Costo_Financiero = Number(PA_Costo_Financiero).toFixed(0);
    document.getElementById("PA_Costo_Financiero_" + idx).innerHTML = Number(PA_Costo_Financiero).toLocaleString('en');
    document.getElementById("PA_Costo_Financiero_" + idx).value = PA_Costo_Financiero;
    PA_Amort_Capital = convNro(PA_Amort_Capital);
    PA_Costo_Financiero = convNro(PA_Costo_Financiero);

    var PA = convNro(Calcular_Cuota_Pagar(TEM, 72, Number(PA_DIFF)));
    var PA_Cuota_Pagar_Aprox = PA_Amort_Capital + PA_Costo_Financiero + PA;
    PA_Cuota_Pagar_Aprox = Number(PA_Cuota_Pagar_Aprox).toFixed(0);
    document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PA_Cuota_Pagar_Aprox).toLocaleString('en');
    document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value = PA_Cuota_Pagar_Aprox;

    var PA_Nro_Cuota = CalcularNroCuotas(PA_Mes_Anterior, TEM, PA_Cuota_Pagar_Aprox, PA_Mes_Actual);
    document.getElementById("PA_Nro_Cuota_" + idx).innerHTML = Number(PA_Nro_Cuota).toLocaleString('en');
    document.getElementById("PA_Nro_Cuota_" + idx).value = PA_Nro_Cuota;
}
function Calcular_Prestamo_Adquisicion_Total() {
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Adquisicion(idx);
    }
    Calcular_Resumen();
}
function EliminarPrestamoPersonal() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Prestamo_Personal_Total();
}
function AgregarPrestamoPersonal() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    //var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(4);
    var cell8 = row.insertCell(5);
    var cell9 = row.insertCell(6);
    var cell10 = row.insertCell(7);

    cell1.innerHTML = '<div><input class="form-control" type="text" id="PP_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><select class="form-control" id="PP_Producto_' + idx + '" onchange = "Calcular_Prestamo_Personal_Total();"/><option value = "0"></option> <option value = "1">Vehicular</option> <option value = "2">Hipotecario</option> <option value = "3">Libre Disponibilidad</option> </select> </div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Comercial_Total()"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Anterior_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    cell4.innerHTML = '<div><input class="form-control" type="text" id="PP_Mes_Actual_' + idx + '" onkeyup="validarNumero(id);Calcular_Prestamo_Personal_Total()"/></div>';
    var cell5 = '<div style="display:none" id="PP_TEA_' + idx + '"></div>';
    var cell6 = '<div style="display:none" id="PP_TEM_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="PP_Amort_Capital_' + idx + '"></div>';
    cell8.innerHTML = cell6 + '<div id="PP_Costo_Financiero_' + idx + '"></div>';
    cell9.innerHTML = '<div id="PP_Cuota_Pagar_Aprox_' + idx + '"></div>';
    cell10.innerHTML = '<div id="PP_Nro_Cuota_' + idx + '"></div>';
}
function Calcular_Prestamo_Personal(idx) {
    var producto = document.getElementById("PP_Producto_" + idx).value;
    if (producto != 0) {
        var TEA = 0;
        var PP_DIFF = 0;
        
        if (producto == 1) {
            TEA = TEAPPVehicular;
        } else if (producto == 2) {
            TEA = TEAPPHipotecario;
        } else if (producto == 3) {
            TEA = TEAPPLibre;
        }
        var TEM = retornarTEM(TEA);
        if (producto == 1) {
            PP_DIFF = Calcular_Cuota_Pagar(TEM,48,Number(PP_V_DIFF));
        } else if (producto == 2) {
            PP_DIFF = Calcular_Cuota_Pagar(TEM,240,Number(PP_H_DIFF));
        } else if (producto == 3) {
            PP_DIFF = Calcular_Cuota_Pagar(TEM,36,Number(PP_LD_DIFF));
        }


        document.getElementById("PP_TEM_" + idx).value = TEM;
        document.getElementById("PP_TEM_" + idx).innerHTML = Number(TEM * 100).toFixed(2) + "%";

        document.getElementById("PP_TEA_" + idx).value = TEA;
        document.getElementById("PP_TEA_" + idx).innerHTML = Number(TEA * 100).toFixed(2) + "%";

        var PP_Mes_Anterior = convNro(document.getElementById("PP_Mes_Anterior_" + idx).value);
        var PP_Mes_Actual = convNro(document.getElementById("PP_Mes_Actual_" + idx).value);

        var PP_Amort_Capital = PP_Mes_Anterior - PP_Mes_Actual;
        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = Number(PP_Amort_Capital).toLocaleString('en');
        document.getElementById("PP_Amort_Capital_" + idx).value = PP_Amort_Capital;

        TEM = Number(TEM);

        var PP_Costo_Financiero = PP_Mes_Anterior * TEM;
        PP_Costo_Financiero = Number(PP_Costo_Financiero).toFixed(0);
        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = Number(PP_Costo_Financiero).toLocaleString('en');
        document.getElementById("PP_Costo_Financiero_" + idx).value = PP_Costo_Financiero;
        PP_Amort_Capital = Number(PP_Amort_Capital);
        PP_Costo_Financiero = Number(PP_Costo_Financiero);
        var PP_Cuota_Pagar_Aprox = convNro(PP_Amort_Capital) + convNro(PP_Costo_Financiero) + convNro(PP_DIFF);
        PP_Cuota_Pagar_Aprox = Number(PP_Cuota_Pagar_Aprox).toFixed(0);
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = Number(PP_Cuota_Pagar_Aprox).toLocaleString('en');
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = PP_Cuota_Pagar_Aprox;

        var PP_Nro_Cuota = CalcularNroCuotas(PP_Mes_Anterior, TEM, PP_Cuota_Pagar_Aprox, PP_Mes_Actual);
        document.getElementById("PP_Nro_Cuota_" + idx).innerHTML = Number(PP_Nro_Cuota).toLocaleString('en');
        document.getElementById("PP_Nro_Cuota_" + idx).value = PP_Nro_Cuota;

    } else {
        document.getElementById("PP_TEM_" + idx).value = 0;
        document.getElementById("PP_TEM_" + idx).innerHTML = "";

        document.getElementById("PP_TEA_" + idx).value = 0;
        document.getElementById("PP_TEA_" + idx).innerHTML = "";

        document.getElementById("PP_Amort_Capital_" + idx).innerHTML = "";
        document.getElementById("PP_Amort_Capital_" + idx).value = 0;

        document.getElementById("PP_Costo_Financiero_" + idx).innerHTML = "";
        document.getElementById("PP_Costo_Financiero_" + idx).value = 0;

        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).innerHTML = "";
        document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value = 0;
    }
}
function Calcular_Prestamo_Personal_Total() {
    var table = document.getElementById("tablaPrestamoPersonal");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Prestamo_Personal(idx);
    }
    Calcular_Resumen();
}
function EliminarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length - 1;
    if (table.rows.length > 1) {
        table.deleteRow(idx);
    }
    Calcular_Tarjeta_Consumo_Total();
}
function AgregarTarjetaConsumo() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var idx = table.rows.length;
    var row = table.insertRow(idx);
    idx = idx - 1;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //var cell4 = row.insertCell(3);
    //var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(3);
    var cell7 = row.insertCell(4);
    var TEM = retornarTEM(TEATC);
    TEM = Number(TEM).toFixed(4);
    cell1.innerHTML = '<div><input class="form-control" type="text" id="TC_Banco_' + idx + '"/></div>';
    cell2.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Utilizada_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    cell3.innerHTML = '<div><input class="form-control" type="text" id="TC_Linea_Total_' + idx + '" onkeyup="validarNumero(id);Calcular_Tarjeta_Consumo_Total();"/></div>';
    var cell4 = '<div style="display:none" id="TC_TEA_' + idx + '">' + TEATC * 100 + '%</div>';
    var cell5 = '<div style="display:none" id="TC_TEM_' + idx + '">' + TEM * 100 + '%</div>';
    cell6.innerHTML = cell4 + '<div id="TC_Costo_Financiero_' + idx + '"></div>';
    cell7.innerHTML = cell5 + '<div id="TC_Costo_Aprox_Pagar_' + idx + '"></div>';
}
function Calcular_Tarjeta_Consumo(idx) {
    var TC_Linea_Utilizada = convNro(document.getElementById("TC_Linea_Utilizada_" + idx).value);
    var TC_Linea_Total = convNro(document.getElementById("TC_Linea_Total_" + idx).value);

    var TEM = retornarTEM(TEATC);

    var TC_Costo_Financiero = (TC_Linea_Utilizada * TEM) + ((TC_Linea_Total - TC_Linea_Utilizada) * TEM * 0.36);
    TC_Costo_Financiero = Number(TC_Costo_Financiero).toFixed(0);

    var TC_Costo_Aprox_Pagar = 0;
    if (TC_Linea_Total != 0) {
        var p1 = Calcular_Cuota_Pagar(TEM, 36, TC_Linea_Utilizada);
        var p2 = Calcular_Cuota_Pagar(TEM, 36, (TC_Linea_Total - TC_Linea_Utilizada)) * 0.36;
        p1 = Number(p1);
        p2 = Number(p2);
        TC_Costo_Financiero = Number(TC_Costo_Financiero);
        var p3 = p1 + p2 + TC_Costo_Financiero;

        TC_Costo_Aprox_Pagar = Number(p3).toFixed(0);

    }


    document.getElementById("TC_Costo_Financiero_" + idx).innerHTML = Number(TC_Costo_Financiero).toLocaleString('en');
    document.getElementById("TC_Costo_Financiero_" + idx).value = TC_Costo_Financiero;
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).innerHTML = Number(TC_Costo_Aprox_Pagar).toLocaleString('en');
    document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value = TC_Costo_Aprox_Pagar;
}
function Calcular_Tarjeta_Consumo_Total() {
    var table = document.getElementById("tablaTarjetaConsumo");
    var filas = table.rows.length - 1;

    for (var idx = 0; idx < filas; idx++) {
        Calcular_Tarjeta_Consumo(idx);
    }
    Calcular_Resumen();
}
function Calcular_Resumen() {
    var LTC_table = document.getElementById("tablaLineaTarjetaCapital");
    var LTC_filas = LTC_table.rows.length - 1;
    var PCCT_table = document.getElementById("tablaPrestamoComercial");
    var PCCT_filas = PCCT_table.rows.length - 1;
    var PC_table = document.getElementById("tablaPrestamoCancelable");
    var PC_filas = PC_table.rows.length - 1;
    var PA_table = document.getElementById("tablaPrestamoAdquisicion");
    var PA_filas = PA_table.rows.length - 1;
    var TC_table = document.getElementById("tablaTarjetaConsumo");
    var TC_filas = TC_table.rows.length - 1;
    var PP_table = document.getElementById("tablaPrestamoPersonal");
    var PP_filas = PP_table.rows.length - 1;

    var S1 = 0;
    var LTC_S1 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S1 = LTC_S1 + convNro(document.getElementById("LTC_Linea_Total_" + idx).value);
    }
    var PCCT_S1 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S1 = PCCT_S1 + convNro(document.getElementById("PCCT_Mes_Actual_" + idx).value);
    }
    var PC_S1 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S1 = PC_S1 + convNro(document.getElementById("PC_Monto_" + idx).value);
    }
    S1 = LTC_S1 + PCCT_S1 + PC_S1;

    var S2 = 0;
    var PA_S2 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S2 = PA_S2 + convNro(document.getElementById("PA_Mes_Actual_" + idx).value);
    }
    S2 = PA_S2;

    var S3 = 0;
    var TC_S3 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S3 = TC_S3 + convNro(document.getElementById("TC_Linea_Total_" + idx).value);
    }

    var PP_S3 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S3 = PP_S3 + convNro(document.getElementById("PP_Mes_Actual_" + idx).value);
    }
    S3 = TC_S3 + PP_S3;



    var S4 = 0;
    var LTC_S4 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S4 = LTC_S4 + convNro(document.getElementById("LTC_Costo_Aprox_Pagar_" + idx).value);
    }

    var PCCT_S4 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S4 = PCCT_S4 + convNro(document.getElementById("PCCT_Cuota_Pagar_Aprox_" + idx).value);
    }
    S4 = LTC_S4 + PCCT_S4;

    var S5 = 0;
    var PA_S5 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S5 = PA_S5 + convNro(document.getElementById("PA_Cuota_Pagar_Aprox_" + idx).value);
    }
    S5 = PA_S5;

    var S6 = 0;
    var TC_S6 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S6 = TC_S6 + convNro(document.getElementById("TC_Costo_Aprox_Pagar_" + idx).value);
    }
    var PP_S6 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S6 = PP_S6 + convNro(document.getElementById("PP_Cuota_Pagar_Aprox_" + idx).value);
    }

    S6 = convNro(TC_S6) + convNro(PP_S6);

    var S7 = 0;
    var LTC_S7 = 0;
    for (var idx = 0; idx < LTC_filas; idx++) {
        LTC_S7 = LTC_S7 + convNro(document.getElementById("LTC_Costo_Financiero_" + idx).value);
    }

    var PCCT_S7 = 0;
    for (var idx = 0; idx < PCCT_filas; idx++) {
        PCCT_S7 = PCCT_S7 + convNro(document.getElementById("PCCT_Costo_Financiero_" + idx).value);
    }
    
    var PC_S7 = 0;
    for (var idx = 0; idx < PC_filas; idx++) {
        PC_S7 = PC_S7 + convNro(document.getElementById("PC_Costo_Financiero_" + idx).value);
    }
    S7 = LTC_S7 + PCCT_S7 + PC_S7;

    var S8 = 0;
    var PA_S8 = 0;
    for (var idx = 0; idx < PA_filas; idx++) {
        PA_S8 = PA_S8 + convNro(document.getElementById("PA_Costo_Financiero_" + idx).value);
    }
    S8 = PA_S8;

    var S9 = 0;
    var TC_S9 = 0;
    for (var idx = 0; idx < TC_filas; idx++) {
        TC_S9 = TC_S9 + convNro(document.getElementById("TC_Costo_Financiero_" + idx).value);
    }

    var PP_S9 = 0;
    for (var idx = 0; idx < PP_filas; idx++) {
        PP_S9 = PP_S9 + convNro(document.getElementById("PP_Costo_Financiero_" + idx).value);
    }
    S9 = TC_S9 + PP_S9;

    document.getElementById("S1").value = S1;
    document.getElementById("S1").innerHTML = Number(Number(S1).toFixed(0)).toLocaleString('en');
    document.getElementById("S2").value = S2;
    document.getElementById("S2").innerHTML = Number(Number(S2).toFixed(0)).toLocaleString('en');
    document.getElementById("S3").value = S3;
    document.getElementById("S3").innerHTML = Number(Number(S3).toFixed(0)).toLocaleString('en');

    document.getElementById("S4").value = S4;
    document.getElementById("S4").innerHTML = Number(Number(S4).toFixed(0)).toLocaleString('en');
    document.getElementById("S5").value = S5;
    document.getElementById("S5").innerHTML = Number(Number(S5).toFixed(0)).toLocaleString('en');
    document.getElementById("S6").value = S6;
    document.getElementById("S6").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');

    document.getElementById("S7").value = S7;
    document.getElementById("S7").innerHTML = Number(Number(S7).toFixed(0)).toLocaleString('en');
    document.getElementById("S8").value = S8;
    document.getElementById("S8").innerHTML = Number(Number(S8).toFixed(0)).toLocaleString('en');
    document.getElementById("S9").value = S9;
    document.getElementById("S9").innerHTML = Number(Number(S9).toFixed(0)).toLocaleString('en');


    document.getElementById("deuda_personal").value = S6;
    document.getElementById("deuda_personal").innerHTML = Number(Number(S6).toFixed(0)).toLocaleString('en');
    calcular_gastopersonal();
    Calcular_EEFF();
}
/******************************************************************/
function getLTC(){
    var lista = [];
    var table = document.getElementById("tablaLineaTarjetaCapital");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("LTC_Banco_"+idx).value);
        lista.push(convNro(document.getElementById("LTC_Linea_Utilizada_"+idx).value));
        lista.push(convNro(document.getElementById("LTC_Linea_Total_"+idx).value));
        lista.push(convNro(document.getElementById("LTC_Costo_Financiero_"+idx).value));
        lista.push(convNro(document.getElementById("LTC_Costo_Aprox_Pagar_"+idx).value));
    }
    return lista;
}
function getPCCT(){
    var lista = [];
    var table = document.getElementById("tablaPrestamoComercial");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("PCCT_Banco_"+idx).value);
        lista.push(convNro(document.getElementById("PCCT_Mes_Anterior_"+idx).value));
        lista.push(convNro(document.getElementById("PCCT_Mes_Actual_"+idx).value));
        lista.push(convNro(document.getElementById("PCCT_Amort_Capital_"+idx).value));
        lista.push(convNro(document.getElementById("PCCT_Costo_Financiero_"+idx).value));
        lista.push(convNro(document.getElementById("PCCT_Cuota_Pagar_Aprox_"+idx).value));
        lista.push(convNro(document.getElementById("PCCT_Nro_Cuota_"+idx).value));
    }
    return lista;
}
function getPC(){
    var lista = [];
    var table = document.getElementById("tablaPrestamoCancelable");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("PC_Banco_"+idx).value);
        lista.push(convNro(document.getElementById("PC_Monto_"+idx).value));
        lista.push(convNro(document.getElementById("PC_Periodo_"+idx).value));
        lista.push(convNro(document.getElementById("PC_Costo_Financiero_"+idx).value));
    }
    return lista;
}
function getPA(){
    var lista = [];
    var table = document.getElementById("tablaPrestamoAdquisicion");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("PA_Banco_"+idx).value);
        lista.push(convNro(document.getElementById("PA_Mes_Anterior_"+idx).value));
        lista.push(convNro(document.getElementById("PA_Mes_Actual_"+idx).value));
        lista.push(convNro(document.getElementById("PA_Amort_Capital_"+idx).value));
        lista.push(convNro(document.getElementById("PA_Costo_Financiero_"+idx).value));
        lista.push(convNro(document.getElementById("PA_Cuota_Pagar_Aprox_"+idx).value));
        lista.push(convNro(document.getElementById("PA_Nro_Cuota_"+idx).value));
    }
    return lista;
}
function getPP(){
    var lista = [];
    var table = document.getElementById("tablaPrestamoPersonal");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("PP_Banco_"+idx).value);
        lista.push(document.getElementById("PP_Producto_"+idx).value);
        lista.push(convNro(document.getElementById("PP_Mes_Anterior_"+idx).value));
        lista.push(convNro(document.getElementById("PP_Mes_Actual_"+idx).value));
        lista.push(convNro(document.getElementById("PP_Amort_Capital_"+idx).value));
        lista.push(convNro(document.getElementById("PP_Costo_Financiero_"+idx).value));
        lista.push(convNro(document.getElementById("PP_Cuota_Pagar_Aprox_"+idx).value));
        lista.push(convNro(document.getElementById("PP_Nro_Cuota_"+idx).value));
    }
    return lista;
}
function getTC(){
    var lista = [];
    var table = document.getElementById("tablaTarjetaConsumo");
    var total = table.rows.length-1;
    lista.push(total);
    for (var i = 0; i< total; i++){
        var idx = i;
        lista.push(document.getElementById("TC_Banco_"+idx).value);
        lista.push(convNro(document.getElementById("TC_Linea_Utilizada_"+idx).value));
        lista.push(convNro(document.getElementById("TC_Linea_Total_"+idx).value));
        lista.push(convNro(document.getElementById("TC_Costo_Financiero_"+idx).value));
        lista.push(convNro(document.getElementById("TC_Costo_Aprox_Pagar_"+idx).value));
    }
    return lista;
}
function getResumen(){
    var lista = [];

    lista.push(document.getElementById("S1").value);
    lista.push(document.getElementById("S2").value);
    lista.push(document.getElementById("S3").value);
    
    lista.push(document.getElementById("S4").value);
    lista.push(document.getElementById("S5").value);
    lista.push(document.getElementById("S6").value);
    
    lista.push(document.getElementById("S7").value);
    lista.push(document.getElementById("S8").value);
    lista.push(document.getElementById("S9").value);
    lista.push(document.getElementById("comentario").value);
    

    return lista;
}
/*******************************************************************/
function CompletarCronograma(datos){
    
    AgregarLineaTarjeta();
    AgregarPrestamoCancelable();
    AgregarPrestamoAdquisicion();
    AgregarPrestamoPersonal();
    AgregarPrestamoPersonal();
    AgregarPrestamoPersonal();
    AgregarTarjetaConsumo();

    document.getElementById("PA_DIFF").value = datos[13];
    document.getElementById("PP_LD_DIFF").value = datos[14];
    document.getElementById("PP_H_DIFF").value = datos[15];
    document.getElementById("PP_V_DIFF").value = datos[16];
    
    D_TKT = datos[1];
    document.getElementById("LTC_Linea_Total_0").value = D_TKT;
    document.getElementById("LTC_Linea_Total_0").innerHTML = convNro(D_TKT).toLocaleString('en');

    D_PC = datos[2];
    document.getElementById("PC_Monto_0").value = D_PC;
    document.getElementById("PC_Monto_0").innerHTML = convNro(D_PC).toLocaleString('en');

    D_LP_M2 = datos[3];
    document.getElementById("PA_Mes_Anterior_0").value = D_LP_M2;
    document.getElementById("PA_Mes_Anterior_0").innerHTML = convNro(D_LP_M2).toLocaleString('en');
    D_LP_M1 = datos[4];
    document.getElementById("PA_Mes_Actual_0").value = D_LP_M1;
    document.getElementById("PA_Mes_Actual_0").innerHTML = convNro(D_LP_M1).toLocaleString('en');
    
    document.getElementById("PP_Producto_0").selectedIndex = "1";
    D_VEHI_M2 = datos[5];
    document.getElementById("PP_Mes_Anterior_0").value = D_VEHI_M2;
    document.getElementById("PP_Mes_Anterior_0").innerHTML = convNro(D_VEHI_M2).toLocaleString('en');
    D_VEHI_M1 = datos[6];
    document.getElementById("PP_Mes_Actual_0").value = D_VEHI_M1;
    document.getElementById("PP_Mes_Actual_0").innerHTML = convNro(D_VEHI_M1).toLocaleString('en');

    document.getElementById("PP_Producto_1").selectedIndex = "2";
    D_HIP_M2 = datos[7];
    document.getElementById("PP_Mes_Anterior_1").value = D_HIP_M2;
    document.getElementById("PP_Mes_Anterior_1").innerHTML = convNro(D_HIP_M2).toLocaleString('en');
    D_HIP_M1 = datos[8];
    document.getElementById("PP_Mes_Actual_1").value = D_HIP_M1;
    document.getElementById("PP_Mes_Actual_1").innerHTML = convNro(D_HIP_M1).toLocaleString('en');

    document.getElementById("PP_Producto_2").selectedIndex = "3";
    D_P_M2 = datos[9];
    document.getElementById("PP_Mes_Anterior_2").value = D_P_M2;
    document.getElementById("PP_Mes_Anterior_2").innerHTML = convNro(D_P_M2).toLocaleString('en');
    D_P_M1 = datos[10];
    document.getElementById("PP_Mes_Actual_2").value = D_P_M1;
    document.getElementById("PP_Mes_Actual_2").innerHTML = convNro(D_P_M1).toLocaleString('en');

    D_TUSADA = datos[11];
    document.getElementById("TC_Linea_Utilizada_0").value = D_TUSADA;
    document.getElementById("TC_Linea_Utilizada_0").innerHTML = convNro(D_TUSADA).toLocaleString('en');
    D_NOUSADA = datos[12];
    var TC_LT_0 = convNro(D_TUSADA)+convNro(D_NOUSADA);
    document.getElementById("TC_Linea_Total_0").value = convNro(TC_LT_0);
    document.getElementById("TC_Linea_Total_0").innerHTML = convNro(TC_LT_0).toLocaleString('en');

    Calcular_Linea_Tarjeta_Total();
    Calcular_Prestamo_Cancelable_Total();
    Calcular_Prestamo_Adquisicion_Total();
    Calcular_Prestamo_Personal_Total();
    Calcular_Tarjeta_Consumo_Total();
}
/******************************************************************/

function InformacionGrabar() {
    var listaTodo = [];
    var lista = [];
    var DC = getDatosCliente1();
    if (DC != null) {
        lista.push(DC);
        var BG = getBalanceGeneral();
        lista.push(BG);
        var ER = getEstadoResultados();
        lista.push(ER);
        var C = getCanalizacion();
        lista.push(C);
        var R = getRatios();
        lista.push(R);
        Dictaminar();
        var dictamen = document.getElementById("dictamen").value;
        lista.push(dictamen);
        listaTodo.push(lista);
        listaTodo.push(getFinanciamientoLP());
        listaTodo.push(getFinanciamientoCP());
        listaTodo.push(getIngresos());
        listaTodo.push(getEgresos());
        listaTodo.push(getPatrimonioInmueble());
        listaTodo.push(getPatrimonioVehMaq());
        alert("Se grabaron los datos ingresados");
        return listaTodo;
    }
}
function InformacionFinalizar() {
    var listaTodo = [];
    var lista = [];
    var DC = getDatosCliente1();
    if (DC != null) {
        lista.push(DC);
        var BG = getBalanceGeneral();
        lista.push(BG);
        var ER = getEstadoResultados();
        lista.push(ER);
        var C = getCanalizacion();
        lista.push(C);
        var R = getRatios();
        lista.push(R);
        Dictaminar();
        var dictamen = document.getElementById("dictamen").value;
        lista.push(dictamen);
        listaTodo.push(lista);
        listaTodo.push(getFinanciamientoLP());
        listaTodo.push(getFinanciamientoCP());
        listaTodo.push(getIngresos());
        listaTodo.push(getEgresos());
        listaTodo.push(getPatrimonioInmueble());
        listaTodo.push(getPatrimonioVehMaq());
        var tipoCampana = document.getElementById('tipoCampana').value;
        alert(dictamen);
        return listaTodo;
    }else{
        return null;
    }
}

function CompletarGeneral(lista) {
    var codigos = lista[0];
    var data = lista[1];
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("regimen") != -1) {
            var index = 0;
            if (dato == "Reg General") {
                index = 1;
            } else if (dato == "RMT") {
                index = 2;
            } else if (dato == "RER") {
                index = 3;
            } else if (dato == "RUS") {
                index = 4;
            }
            
            document.getElementById(codigo).selectedIndex = index;
        } else if (codigo.indexOf("oficina") != -1) {
            var index = 0;
            index = oficinas.indexOf(dato);
            index = index +1;
            document.getElementById(codigo).selectedIndex = index;
        } else if (codigo.indexOf("actividad") != -1) {
            var index = 0;
            index = actividadG.indexOf(dato);
            index = index +1;
            document.getElementById(codigo).selectedIndex = index;
        } else if (codigo.indexOf("egp_uneta") != -1 || codigo.indexOf("egp_gastfinan") != -1) {
            document.getElementById(codigo).value = convNro(dato).toLocaleString('en');
            document.getElementById(codigo).innerHTML = convNro(dato).toLocaleString('en');
        } else {
            document.getElementById(codigo).value = dato;
            document.getElementById(codigo).innerHTML = dato;
        }
    }
    document.getElementById("analista").disabled = true;
}
function CompletarLP(lista) {
    var cantidad = lista[0];
    for (var i = 0; i < cantidad; i++) {
        Agregar_Financimiento_LP();
    }
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 0; i < codigos.length; i++) {
        //document.getElementById(codigos[i]).value = data[i];
        //document.getElementById(codigos[i]).innerHTML = data[i];
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("Tipo_Prod_LP_") != -1) {
            var index = 0;
            if (dato == "Leasing Mobiliario") {
                index = 1;
            } else if (dato == "Leasing Inmobiliario") {
                index = 2;
            } else if (dato == "Subrogación de deuda") {
                index = 3;
            }document.getElementById(codigo).selectedIndex = index;
        } else {
            document.getElementById(codigo).value = data[i];
            document.getElementById(codigo).innerHTML = data[i];
        }
    }
    Calcular_Propuestas_LP();
}
function CompletarCP(lista) {
    var cantidad = lista[0];

    for (var i = 0; i < cantidad; i++) {
        Agregar_Financimiento_CP();
    }
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("Tipo_Prod_CP_") != -1) {
            var index = 0;
            if (dato == "Financiamiento de Importación") {
                index = 1;
            } else if (dato == "Financiamiento de Exportación") {
                index = 2;
            } else if (dato == "Préstamo para capital de trabajo") {
                index = 3;
            } else if (dato == "Línea Préstamo para capital de trabajo") {
                index = 4;
                //index = 1;
            } else if (dato == "Tarjeta capital de trabajo") {
                index = 5;
                //index = 1;
            } else if (dato == "Descuento de letra/factura negociable") {
                index = 6;
            } else if (dato == "Tarjeta Empresarial") {
                index = 7;
            } else if (dato == "Préstamo para adquisición de bienes muebles pequeños") {
                index = 8;
            } else if (dato == "Subrogación de deuda") {
                index = 6;
            } else if (dato == "Incremento de línea de TKT") {
                index = 7;
            } else if (dato == "Incremento de línea de T/C") {
                index = 8;
            } else if (dato == "Otro") {
                index = 12;
            }document.getElementById(codigo).selectedIndex = index;
        } else {
            document.getElementById(codigo).value = data[i];
            document.getElementById(codigo).innerHTML = data[i];
        }
    }
    Calcular_Propuestas_CP();
}
function CompletarPI(lista) {
    var cantidad = lista[0];
    for (var i = 1; i < cantidad; i++) {
        AgregarPatrimonio1();
    }
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("Realizable_") != -1) {
            var index = 0;
            if (dato == "Si") {
                index = 1;
            } else if (dato == "No") {
                index = 2;
            }
            document.getElementById(codigo).selectedIndex = index;
        } else {
            document.getElementById(codigo).value = data[i];
            document.getElementById(codigo).innerHTML = data[i];
        }
    }
}
function CompletarPVM(lista) {
    var cantidad = lista[0];
    for (var i = 1; i < cantidad; i++) {
        AgregarPatrimonio2();
    }
    var codigos = lista[1];
    var data = lista[2];
    for (var i = 0; i < codigos.length; i++) {
        var codigo = codigos[i];
        var dato = data[i];
        if (codigo.indexOf("Veh_Maq_") != -1) {
            var index = 0;
            if (dato == "Vehiculo") {
                index = 1;
            } else if (dato == "Maquinaria") {
                index = 2;
            }
            document.getElementById(codigo).selectedIndex = index;
        } else {
            document.getElementById(codigo).value = data[i];
            document.getElementById(codigo).innerHTML = data[i];
        }
    }
}
function Descargar(){
    document.getElementById("seccion_datos_cliente").style.display = '';
    document.getElementById("seccion_propuesta").style.display = '';
    document.getElementById("seccion_ingresos").style.display = '';
    document.getElementById("seccion_egresos").style.display = '';
    document.getElementById("seccion_patrimonio").style.display = '';
    document.getElementById("seccion_estados").style.display = '';
    document.getElementById('resultado').style.display = '';
    window.print();
    document.getElementById("seccion_propuesta").style.display = 'none';
    document.getElementById("seccion_ingresos").style.display = 'none';
    document.getElementById("seccion_egresos").style.display = 'none';
    document.getElementById("seccion_patrimonio").style.display = 'none';
    document.getElementById("seccion_estados").style.display = 'none';
}
/*******************************************************************/
function AlertaInformalidad(){
    var declarado = convNro(document.getElementById("informalidad").value)/100;
    var tipoCampana = document.getElementById('tipoCampana').value;
    if(declarado > 0.95 && tipoCampana != "Aprobado"){
        document.getElementById("alertaInf").style.display = 'none';
        alert("No califica por alta informalidad, por favor envía la propuesta por circuito regular")
    }else{
        document.getElementById("alertaInf").style.display = 'none';
    }
}
