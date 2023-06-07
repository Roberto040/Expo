var estudiantes = [];
var promedioMayor = 0;
var estudiantesPromedioMayor = [];

function agregarEstudiante() {
    var nombre = document.getElementById("nombre").value;
    var identificacion = document.getElementById("identificacion").value;
    var nota1 = parseFloat(document.getElementById("nota1").value);
    var nota2 = parseFloat(document.getElementById("nota2").value);
    var nota3 = parseFloat(document.getElementById("nota3").value);
    var promedio = ((nota1 + nota2 + nota3) / 3).toFixed(1);

    var estado = "";
    var clase = "";

    if (promedio < 3.5) {
        estado = "Reprobado";
        clase = "table-danger";
    } else {
        estado = "Aprobado";
        clase = "table-success";
    }

    var estudiante = {
        nombre: nombre,
        identificacion: identificacion,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        promedio: promedio,
        estado: estado,
        clase: clase
    };

    estudiantes.push(estudiante); // agregar estudiante al arreglo
    actualizarTabla(); // actualizar la tabla
    limpiarCampos();
}

function actualizarTabla() {
    var tablaEstudiantes = document.getElementById('tabla-estudiantes').getElementsByTagName('tbody')[0];
    tablaEstudiantes.innerHTML = ""; // Limpiar contenido de la tabla
    var numAprobados = 0;
    var numReprobados = 0;
    var promedioMayor = 0;
    var estudiantesPromedioMayor = [];

    // iterar sobre el arreglo de estudiantes para crear las filas de la tabla
    for (var i = 0; i < estudiantes.length; i++) {
        var estudiante = estudiantes[i];

        // crear una nueva fila en la tabla
        var fila = document.createElement("tr");

        // agregar las celdas con los datos del estudiante a la fila
        var celdaNombre = document.createElement("td");
        celdaNombre.innerHTML = estudiante.nombre;
        fila.appendChild(celdaNombre);

        var celdaIdentificacion = document.createElement("td");
        celdaIdentificacion.innerHTML = estudiante.identificacion;
        fila.appendChild(celdaIdentificacion);

        var celdaNota1 = document.createElement("td");
        celdaNota1.innerHTML = estudiante.nota1;
        fila.appendChild(celdaNota1);

        var celdaNota2 = document.createElement("td");
        celdaNota2.innerHTML = estudiante.nota2;
        fila.appendChild(celdaNota2);

        var celdaNota3 = document.createElement("td");
        celdaNota3.innerHTML = estudiante.nota3;
        fila.appendChild(celdaNota3);

        var celdaPromedio = document.createElement("td");
        celdaPromedio.innerHTML = estudiante.promedio;
        fila.appendChild(celdaPromedio);

        // eliminar
        var celdaAcciones = document.createElement("td");
        var botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = "Eliminar";
        botonEliminar.setAttribute("data-id", i);
        botonEliminar.addEventListener("click", function() {
            var id = this.getAttribute("data-id");
            eliminarEstudiante(id); // Pasar el índice del estudiante a eliminar
        });
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        fila.className = estudiante.clase; // asignar la clase correspondiente a la fila
        tablaEstudiantes.appendChild(fila); // agregar la fila tabla 
         // actualizar el conteo de estudiantes aprobados y reprobados
    if (estudiante.estado === "Aprobado") {
      numAprobados++;
  } else {
      numReprobados++;
  }

  // buscar el estudiante con el promedio más alto
  if (estudiante.promedio > promedioMayor) {
      promedioMayor = estudiante.promedio;
      estudiantesPromedioMayor = [estudiante.nombre]; // reiniciar la lista de estudiantes con promedio más alto
  } else if (estudiante.promedio === promedioMayor) {
      estudiantesPromedioMayor.push(estudiante.nombre); // agregar otro estudiante con el mismo promedio más alto
  }
}

// actualizar la información de los estudiantes aprobados, reprobados y con el promedio más alto
document.getElementById("num-aprobados").innerHTML = numAprobados;
document.getElementById("num-reprobados").innerHTML = numReprobados;
document.getElementById("estudiante-promedio-mayor").innerHTML = estudiantesPromedioMayor.join(", ");
document.getElementById("promedio-mayor").innerHTML = promedioMayor;
}

function limpiarCampos() {
document.getElementById("nombre").value = "";
document.getElementById("identificacion").value = "";
document.getElementById("nota1").value = "";
document.getElementById("nota2").value = "";
document.getElementById("nota3").value = "";
}

function eliminarEstudiante(id) {
estudiantes.splice(id, 1); // Eliminar al estudiante del arreglo
actualizarTabla(); // Actualizar la tabla
}