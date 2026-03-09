export const ageCalculator = (birth) => {
  const nacimiento = new Date(birth + 'T00:00:00');
  const hoy = new Date();

  let años = hoy.getFullYear() - nacimiento.getFullYear();
  let meses = hoy.getMonth() - nacimiento.getMonth();
  let dias = hoy.getDate() - nacimiento.getDate();

  if (dias < 0) {
    const ultimoDiaDelMesAnterior = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      0
    ).getDate();
    dias += ultimoDiaDelMesAnterior;
    meses--;
  }

  if (meses < 0) {
    meses += 12;
    años--;
  }

  return { años, meses, días: dias };
};
