# language: es
Característica: Agendar un viaje aplicando filtros avanzados de Launch y Planet Color

  Esquema del escenario: Checkout con filtros y validación de términos
    Dado que el usuario abre la página de reservas
    Cuando ingresa las fechas de partida "<partida>" y regreso "<regreso>" para <adultos> adultos y <ninos> niños
    Y el usuario hace click en SELECT DESTINATION
    Y el usuario hace click en LOAD MORE
    Y el usuario filtra los destinos por Launch "<launch>"
    Y el usuario filtra los destinos por Planet Color "<planetColor>"
    Y el usuario selecciona el destino "<destino>"
    Y llena los datos del checkout con nombre "<name>", email "<email>", ssn "<ssn>", y teléfono "<phone>"
    Y el usuario carga el archivo "<archivo>"
    Y el usuario aplica el código promocional "<promo>"
    Y NO acepta los términos y condiciones
    Y el usuario presiona el botón PAY NOW
    Entonces se debe mostrar el modal con título "<tituloError>" y mensaje "<mensajeError>"

    Ejemplos:
    | partida | regreso | adultos | ninos | launch     | planetColor | destino   | name          | email          | ssn        | phone        | archivo           | promo    | tituloError   |   mensajeError |      
    | 20      | 25      | 2       | 1     | Madan      | Green        | Madan | Jhoan Márquez | jhoan@test.com | 123-12-1234 | +34612345678 | tests/resources/seguro.pdf | PROMO2025 | Terms and Conditions | You must agree to the terms and conditions to complete your purchase. |
    | 22      | 26      | 1       | 3     | Shenji     | Red         | Shenji      | Maria Lopez   | maria@test.com | 321-45-6789 | +34612345678 | tests/resources/seguro.pdf | PROMO2026 | Terms and Conditions | You must agree to the terms and conditions to complete your purchase. |

