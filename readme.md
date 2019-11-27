Si te tiene instalado node 12.13 o superior es posible que ocurra un error al ejecutar el compilador-

Se debe ingresar a `...\karim-temple\node_modules\metro-config\src\defaults\blacklist.js`
Buscar el siguente string `/node_modules[/\\]react[/\\]dist[/\\].*/,`
Sustituirlo por `/node_modules[\/\\]react[\/\\]dist[\/\\].*/,`