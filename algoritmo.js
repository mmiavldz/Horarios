function generarCombinaciones(materias){
  const soluciones=[];
  function backtrack(actual,resto){
    if(resto.length===0){soluciones.push([...actual]);return}
    const [m,...otros]=resto;
    if(!conflicto(m,actual)){
      actual.push(m);
      backtrack(actual,otros);
      actual.pop();
    }
    backtrack(actual,otros);
  }
  backtrack([],materias);
  return soluciones;
}

function conflicto(m,lista){
  return lista.some(x=>x.dias.some(d=>m.dias.includes(d)) && !(m.fin<=x.inicio || m.inicio>=x.fin));
}
