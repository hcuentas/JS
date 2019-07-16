var calculador = {

    x: "0", //número en pantalla
xi: 1, //iniciar número en pantalla: 1=si; 0=no;
coma: 0, //estado coma decimal 0=no, 1=si;
ni: 0, //número oculto o en espera.
op: "no", //operación en curso; "no" =  sin operación.


num0: document.getElementById("0"),
num1: document.getElementById("1"),
num2: document.getElementById("2"),
num3: document.getElementById("3"),
num4: document.getElementById("4"),
num5: document.getElementById("5"),
num6: document.getElementById("6"),
num7: document.getElementById("7"),
num8: document.getElementById("8"),
num9: document.getElementById("9"),
punto: document.getElementById("punto"),
igual: document.getElementById("igual"),

dividido: document.getElementById("dividido"),
por: document.getElementById("por"),
menos: document.getElementById("menos"),
mas: document.getElementById("mas"),

    on: document.getElementById("on"),
    signo: document.getElementById("sign"),
    pantalla: document.getElementById("display"),
    init: function () {

        this.on.addEventListener("click", function () {
            //aqui el codigo cuando se le de click
            borradoTotal();
        }
        );

        this.signo.addEventListener("click", function () {
            //aqui el codigo cuando se le de click
            opuest();
        });

        this.num0.addEventListener("click", function () {
            numero("0");
        });
        this.num1.addEventListener("click", function () {
            numero("1");
        });
        this.num2.addEventListener("click", function () {
            numero("2");
        });
        this.num3.addEventListener("click", function () {
            numero("3");
        });
        this.num4.addEventListener("click", function () {
            numero("4");
        });
        this.num5.addEventListener("click", function () {
            numero("5");
        });
        this.num6.addEventListener("click", function () {
            numero("6");
        });
        this.num7.addEventListener("click", function () {
            numero("7");
        });
        this.num8.addEventListener("click", function () {
            numero("8");
        });
        this.num9.addEventListener("click", function () {
            numero("9");
        });
        this.punto.addEventListener("click", function () {
            numero(".");
        });


        this.igual.addEventListener("click", function () {
            igualar();
        });

        this.dividido.addEventListener("click", function () {
            operar('/');
        });
        this.por.addEventListener("click", function () {
            operar('*');
        });
        this.menos.addEventListener("click", function () {
            operar('-');
        });
        this.mas.addEventListener("click", function () {
            operar('+');
        });


        document.onkeydown = teclado;

        //mostrar número en pantalla según se va escribiendo:
        function numero(xx) { //recoge el número pulsado en el argumento.
            if (calculador.x == "0" || calculador.xi == 1) {	// inicializar un número, 
                calculador.pantalla.textContent = xx; //mostrar en pantalla
                calculador.x = xx; //guardar número
                if (xx == ".") { //si escribimos una coma al principio del número
                    calculador.pantalla.textContent = "0."; //escribimos 0.
                    calculador.x = xx; //guardar número
                    calculador.coma = 1; //cambiar estado de la coma
                }
            }
            else { //continuar escribiendo un número
                if (xx == "." && calculador.coma == 0) { //si escribimos una coma decimal pòr primera vez
                    calculador.pantalla.textContent += xx;
                    calculador.x += xx;
                    calculador.coma = 1; //cambiar el estado de la coma  
                }
                    //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
                else if (xx == "." && calculador.coma == 1) { }
                    //Resto de casos: escribir un número del 0 al 9: 	 
                else {
                    calculador.pantalla.textContent += xx;
                    calculador.x += xx
                }
            }
            calculador.xi = 0 //el número está iniciado y podemos ampliarlo.
        }
        function operar(s) {
            igualar() //si hay operaciones pendientes se realizan primero
            calculador.ni = calculador.x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
            calculador.op = s; //guardamos tipo de operación.
            calculador.xi = 1; //inicializar pantalla.
        }
        function igualar() {
            if (calculador.op == "no") { //no hay ninguna operación pendiente.
                calculador.pantalla.textContent = calculador.x;	//mostramos el mismo número	
            }
            else { //con operación pendiente resolvemos
                sl = calculador.ni + calculador.op + calculador.x; // escribimos la operación en una cadena
                sol = eval(sl) //convertimos la cadena a código y resolvemos
                calculador.pantalla.textContent = sol //mostramos la soludión
                calculador.x = sol; //guardamos la solución
                calculador.op = "no"; //ya no hayn operaciones pendientes
                calculador.xi = 1; //se puede reiniciar la pantalla.
            }
        }
        function opuest() {
            nx = Number(calculador.x); //convertir en número
            nx = -nx; //cambiar de signo
            calculador.x = String(nx); //volver a convertir a cadena
            calculador.pantalla.textContent = calculador.x; //mostrar en pantalla.
        }
        function borradoTotal() {
            calculador.pantalla.textContent = 0; //poner pantalla a 0
            calculador.x = "0"; //reiniciar número en pantalla
            calculador.coma = 0; //reiniciar estado coma decimal 
            calculador.ni = 0 //indicador de número oculto a 0;
            calculador.op = "no" //borrar operación en curso.
        }

        function teclado(elEvento) {
            evento = elEvento || window.event;
            k = evento.keyCode; //número de código de la tecla.
            //teclas númericas del teclado alfamunérico
            if (k > 47 && k < 58) {
                p = k - 48; //buscar número a mostrar.
                p = String(p) //convertir a cadena para poder añádir en pantalla.
                numero(p); //enviar para mostrar en pantalla
            }
            //Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
            if (k > 95 && k < 106) {
                p = k - 96;
                p = String(p);
                numero(p);
            }
            if (k == 110 || k == 190) { numero(".") } //teclas de coma decimal
            if (k == 106) { operar('*') } //tecla multiplicación
            if (k == 107) { operar('+') } //tecla suma
            if (k == 109) { operar('-') } //tecla resta
            if (k == 111) { operar('/') } //tecla división
            if (k == 32 || k == 13) { igualar() } //Tecla igual: intro o barra espaciadora
            if (k == 46) { borradoTotal() } //Tecla borrado total: "supr"
        }

        //esta seria la pantalla de la calculadora
        calculador.pantalla.textContent = "0"
    }
}

calculador.init();

