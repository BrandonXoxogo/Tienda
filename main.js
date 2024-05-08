var productos=["Coca","Doritos","Frizz","Oreo","Top-tops"];
var precios=[15,16,30,50,10];

var selecProductos=document.getElementById("productos")
var imgProductos=document.getElementById("imgProducto")
var precioProducto=document.getElementById("precio")
var inputCantidad=document.getElementById("cantidad")
var agregarCarrito=document.getElementById("agregar")
let divCarrito=document.getElementById("producto")

var carrito=new Array();

var posProducto=-1;
var cantidadProducto=0;

const cargarProductos=()=>{
    let optionProductos="";
    productos.forEach((producto)=>{
        optionProductos+=`<option value="${producto}">${producto.toUpperCase()}</option>`
    })
    selecProductos.innerHTML=optionProductos;
    cargarPrecio();
}



selecProductos.onchange=()=>{
    cargarPrecio();
    
}
const cargarPrecio=()=>{
    imgProductos.src=`img/${selecProductos.value.toLowerCase()}.jpg`;
    precioProducto.innerHTML=`$ ${precios[selecProductos.selectedIndex]}`;
    posProducto=selecProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value
    cantidadProducto=parseInt(inputCantidad.value)
}

agregarCarrito.onclick=()=>{
    cantidadProducto=parseInt(inputCantidad.value)
    posProducto=selecProductos.selectedIndex
    if (checarItem(posProducto,cantidadProducto)){
        imprimirTabla();
    }else{
        let item=new Array()
        item.push(posProducto)
        item.push(cantidadProducto)
        carrito.push(item)
        imprimirTabla()
    }
}

const checarItem=(pos,cant)=>{
    let x=false
    carrito.forEach(item=>{
        if(item[0]==pos){
            item[1]+=cant
            x=true
        }
    })
    return x
}

const imprimirTabla=()=>{
    let total=0
    let tabla=`<table class="table w-100 m-auto">
    <tr>
    <td>Producto:</td>
    <td>Precio</td>
    <td>Cantidad</td>
    <td>Importe</td>
    <td>DEl</td>
    </tr>
    `
    let vindex=0
    carrito.forEach(item=>{
        tabla+=`
        <tr>
    <td>${productos[item[0]]}</td>
    <td>$ ${precios[item[0]]}.00</td>
    <td>${item[1]}</td>
    <td>${(precios[item[0]]*item[1])}</td>
    <td><button class="btn btn-outline-danger" onclick="elimiarProducto(${vindex})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
  </svg></button></td>
    </tr>`
    vindex++;
    total+=(precios[item[0]]*item[1])
    })
    tabla+=`
    <tr>
    <td><h3>Total:</h3></td>
    <td><h3>$${total}.00</h3></td>
    <td><button class="btn btn-outline-info" onclick="pagarProducto(${total})">Pagar</button></td>
    </tr>
    </table>`
    divCarrito.innerHTML=tabla
    
}

const pagarProducto=(total)=>{

    var cantidad=parseFloat(prompt("ingresa el monto:"));
    var cambio=cantidad-total;
    
    if(cantidad>total){
    Swal.fire({
        title: "Pago realizado",
        html:`Total de pago: ${total} <br>Cambio: ${cambio}`,
        icon: "success"
      });
    }else if(cantidad<total){
        Swal.fire({
            title: "No se puede realizar el pago",
            html:"Porque su monto no puede pagar el producto" ,
            icon: "error"
          });
    }
}

const elimiarProducto=(vindex)=>{
    Swal.fire({
        title: "Seguro que quieres borrarlo?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Se borro", "", "success");
          carrito.splice(vindex,1)
          imprimirTabla()
        } else if (result.isDenied) {
          Swal.fire("Se cancelo", "", "error");
        }
      });

}

const  verProductos=()=>{
    let listaProducto=document.getElementById("listaProductos")
    let tabla=`<table class="table w-100 m-auto">
    <tr>
    <td>Producto:</td>
    <td>Precio:</td>
    <td>DEl</td>
    </tr>`
    let index=0
    productos.forEach(item=>{
        tabla+=`  
        <tr>
        <td>${item}</td>
        <td>$ ${precios[index]}.00</td>
        <td><button class="btn btn-outline-danger" onclick="eProducto(${index})" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
      </svg></button></td>
        </tr>`
        index++
    })
    listaProducto.innerHTML=tabla
}
const addProducto=()=>{
    let nombre =document.getElementById(`nombreProducto`).value
    let precio=document.getElementById(`pProducto`).value
    productos.push(nombre)
    precios.push(precio)
    verProductos()
    limpiarForm()
}

const limpiarForm=()=>{
    document.getElementById(`nombreProducto`).value=""
   document.getElementById(`pProducto`).value=""
}

const eProducto=(index)=>{
    Swal.fire({
        title: "Seguro que quieres borrarlo?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Se borro", "", "success");
          productos.splice(index,1)
          precios.splice(index,1)
          verProductos()
        } else if (result.isDenied) {
          Swal.fire("Se cancelo", "", "error");
        }
      });

}
 const guardar=()=>{
    document.getElementById(`nombreProducto`).value=""
   document.getElementById(`pProducto`).value=""
   cargarProductos();
   cargarPrecio();
 }