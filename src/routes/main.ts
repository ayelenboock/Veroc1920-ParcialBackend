//Router central, importa todos los routers y los exporta para index.mjs

import {Router} from "express";
import categoriasRoutes from "./categoriasRoutes.js"
import companiasEnvioRoutes from "./companiasEnvioRoutes.js"
import clientesRoutes from "./clientesRoutes.js"
import empleadosRoutes from "./empleadosRoutes.js"
import pedidosRoutes from "./pedidosRoutes.js"
import productosRoutes from "./productosRoutes.js"
import proveedoresRoutes from "./proveedoresRoutes.js"
import ciudadesRoutes from "./ciudadesRoutes.js"
import informesRoutes from "./informesRoutes.js"

const router = Router();

router.use("/api/categorias", categoriasRoutes);
router.use("/api/companias", companiasEnvioRoutes);
router.use("/api/clientes", clientesRoutes);
router.use("/api/empleados", empleadosRoutes);
router.use("/api/pedidos", pedidosRoutes);
router.use("/api/productos", productosRoutes);
router.use("/api/proveedores", proveedoresRoutes);
router.use("/api/ciudades", ciudadesRoutes);
router.use("/api/informes", informesRoutes);
export default router;