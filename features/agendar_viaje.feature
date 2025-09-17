# language: es
Característica: Agendar un viaje con filtro de precios

  Esquema del escenario: Completar el checkout con diferentes datos de usuario
    Dado que el usuario abre la página de reservas
    Cuando ingresa las fechas de partida "<partida>" y regreso "<regreso>" para <adultos> adultos y <ninos> niños
    Y el usuario hace click en SELECT DESTINATION
    Y el usuario hace click en LOAD MORE
    Y el usuario filtra los destinos por precio "<precio>"
    Y el usuario selecciona el destino "<destino>"
    Y llena los datos del checkout con nombre "<name>", email "<email>", ssn "<ssn>", y teléfono "<phone>"
    Y el usuario aplica el código promocional "<promo>"
    Y el usuario acepta los términos y condiciones
    Y el usuario presiona el botón PAY NOW
    Entonces se debe mostrar la lista de destinos disponibles

    Ejemplos:
      | partida | regreso | adultos | ninos | precio | destino     | name          | email          | ssn         | phone        | promo     |
      | 20      | 25      | 2       | 1     | 1000   | Tayabamba   | Jhoan Marquez | jhoan@test.com | 123-12-1234 | +34612345678 | PROMO2025 |
      | 15      | 28      | 1       | 2     | 1500   | Babahoyo    | Maria Lopez   | maria@test.com | 321-45-6789 | +34698765432 | PROMO2026 |


