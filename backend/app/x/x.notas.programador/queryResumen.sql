--SELECT a.*, b.nombre user_nombre, p.nombre pais_nombre from transacciones a
--INNER JOIN user b USING (login_user)
--LEFT JOIN pais p ON a.origen_codpais = p.codigo
--AND a.destino_codpais = p.codigo
--LIMIT 1

WITH paises AS (select * from pais),

SELECT b.nombre user_nombre, p.nombre origen_pais_nombre, p1.nombre destino_pais_nombre, a.*
FROM transacciones a
INNER JOIN user b USING (login_user)
LEFT JOIN pais p ON a.origen_codpais = p.codigo
LEFT JOIN (select * from pais) p1 ON a.destino_codpais = p1.codigo
LIMIT 1


//transaccion resumen
$sql = "SELECT b.nombre user_nombre, p.nombre origen_pais_nombre, p1.nombre destino_pais_nombre, a.*\n"
    . "FROM transacciones a\n"
    . "INNER JOIN user b USING (login_user)\n"
    . "LEFT JOIN pais p ON a.origen_codpais = p.codigo\n"
    . "LEFT JOIN (select * from pais) p1 ON a.destino_codpais = p1.codigo\n"
    . "WHERE a.id = \n" . $id
    . "LIMIT 1";
