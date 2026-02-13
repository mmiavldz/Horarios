const frases=['Tú puedes Mia ✨','Esto ya es nivel pro 🌸','Seguí así, estás brillando 💕','Programar también es arte 💻'];
mensaje.innerText=frases[Math.floor(Math.random()*frases.length)];

const colores=['var(--rosa-1)','var(--rosa-2)','var(--rosa-3)','var(--rosa-4)'];
let colorIndex=0;let opcionActual='A';
const data=JSON.parse(localStorage.getItem('horarios'))||{A:[],B:[],C:[],D:[]};

const horas=[];for(let h=8;h<=22;h++){horas.push(`${String(h).padStart(2,'0')}:00`);horas.push(`${String(h).padStart(2,'0')}:30`)}
horas.forEach(h=>{const r=document.createElement('tr');r.innerHTML=`<td>${h}</td><td></td><td></td><td></td><td></td><td></td>`;horario.appendChild(r)})

function timeToIndex(t){const[a,b]=t.split(':').map(Number);return(a-8)*2+(b===30?1:0)}

let diasSeleccionados=[];
diasInput.onclick=()=>popupDias.style.display='flex';
popupDias.innerHTML=`<div class='popup-content'>
<label><input type='checkbox' value='1'>Lunes</label>
<label><input type='checkbox' value='2'>Martes</label>
<label><input type='checkbox' value='3'>Miércoles</label>
<label><input type='checkbox' value='4'>Jueves</label>
<label><input type='checkbox' value='5'>Viernes</label>
<button onclick='confirmarDias()'>Aceptar</button></div>`;

function confirmarDias(){
  diasSeleccionados=[...popupDias.querySelectorAll('input:checked')].map(d=>Number(d.value));
  const nombres=['','Lunes','Martes','Miércoles','Jueves','Viernes'];
  diasInput.value=diasSeleccionados.map(d=>nombres[d]).join(', ');
  popupDias.style.display='none';
}

function setOpcion(o){opcionActual=o;document.querySelectorAll('.bloque').forEach(b=>b.remove());data[o].forEach(dibujar)}

function agregarMateria(){
  const m={materia:materia.value,inicio:inicio.value,fin:fin.value,profe:profe.value,modalidad:modalidad.value,dias:diasSeleccionados,color:colores[colorIndex++%colores.length]};
  data[opcionActual].push(m);localStorage.setItem('horarios',JSON.stringify(data));dibujar(m);
}

function dibujar(m){
  const fi=timeToIndex(m.inicio)+1;const ff=timeToIndex(m.fin)+1;const h=(ff-fi)*30;
  m.dias.forEach(d=>{
    const c=horario.rows[fi].cells[d];
    const b=document.createElement('div');b.className='bloque';b.style.height=h+'px';b.style.background=m.color;
    b.innerHTML=`<strong>${m.materia}</strong><br>${m.profe}`;b.onclick=()=>b.remove();c.appendChild(b);
  })
}

function modoAlgoritmo(){
  const todas=data[opcionActual];
  const soluciones=generarCombinaciones(todas);
  alert(`🤖 Se generaron ${soluciones.length} combinaciones posibles sin superposición`);
}

function exportarPDF(){
  const{jsPDF}=window.jspdf;const pdf=new jsPDF();pdf.text(`Horario opción ${opcionActual}`,10,10);let y=20;
  data[opcionActual].forEach(m=>{pdf.text(`${m.materia} ${m.inicio}-${m.fin}`,10,y);y+=8});
  pdf.save('horario.pdf');
}
