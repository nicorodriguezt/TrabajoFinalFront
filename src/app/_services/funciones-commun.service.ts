export function PonerMayuscula(palabra) {
  return palabra = palabra[0].toUpperCase() + palabra.substr(1).toLowerCase();
}

export function deleteNulls(objeto) {
  Object.entries(objeto).forEach(x => {
    if (x[1] == null) {
      delete objeto[x[0]];
    }
  });
  return objeto;
}
