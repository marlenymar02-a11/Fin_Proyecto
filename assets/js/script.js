let carrito = [];
let totalItems = 0;
let productoSeleccionado = "";
let pasoActual = 0;
window.pagoConfirmado = false;

/* PRODUCTOS */
function abrirModal(producto) {
  productoSeleccionado = producto;
  productoModal.innerText = producto;
  monto.value = 5;
  modal.style.display = "block";
}

function cerrarModal() {
  modal.style.display = "none";
  monto.value = 5; // reinicia valor
}

/* CARRITO */
function agregarCarrito() {
  let valorMonto = parseFloat(document.getElementById("monto").value);
  if (valorMonto < 5) { alert("El monto mínimo es S/5"); return; }
  carrito.push({ producto: productoSeleccionado, monto: valorMonto });
  totalItems++;
  document.getElementById("cartCount").innerText = totalItems;
  cerrarModal();
  actualizarCheckout();
}

/* CHECKOUT */
function abrirCheckout() { 
  tienda.style.display = "none"; 
  checkout.style.display = "block"; 
  actualizarCheckout(); 
}

function volverTienda() { checkout.style.display = "none"; tienda.style.display = "block"; }

function siguientePaso() {
  if (pasoActual === 2 && !window.pagoConfirmado && !document.querySelector('input[name="pago"]:checked')) {
    alert("Debe seleccionar un método de pago antes de continuar.");
    return;
  }
  if (pasoActual < 3) pasoActual++;
  actualizarCheckout();
}

function actualizarCheckout() {
  document.querySelectorAll(".step").forEach((s, i) => s.classList.toggle("active", i === pasoActual));
  document.querySelectorAll(".content").forEach((c, i) => c.classList.toggle("active", i === pasoActual));

  let checkoutCarrito = document.getElementById("checkoutCarrito");
  checkoutCarrito.innerHTML = "";

  let total = 0;
  carrito.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.producto} - S/ ${item.monto.toFixed(2)}`;
    checkoutCarrito.appendChild(li);
    total += item.monto;
  });

  document.getElementById("totalPago").innerText = total.toFixed(2);
}

/* ENVÍO */
function toggleDireccion() {
  direccionBox.style.display = tipoEnvio.value === "delivery" ? "block" : "none";
}

/* PAGO */
function pagar(tipo) {
  if (tipo === "Yape" || tipo === "Plin") {
    tituloPago.innerText = `Pago con ${tipo}`;
    pagoModal.style.display = "block";
  } else if (tipo === "Contraentrega") {
    pagoConfirmado = true;
    siguientePaso();
    mostrarGracias();
  }
}

function confirmarPago() {
  pagoModal.style.display = "none";
  pagoConfirmado = true;
  siguientePaso();
  mostrarGracias();
}

/* FINAL */
function mostrarGracias() {
  graciasModal.style.display = "block";
}

function volverInicio() {
  carrito = [];
  totalItems = 0;
  pasoActual = 0;
  pagoConfirmado = false;
  location.reload();
}
