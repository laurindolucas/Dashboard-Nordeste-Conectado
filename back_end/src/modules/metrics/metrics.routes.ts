import { Router } from "express";
import { getEscolasRuraisLabInternet, getMediaComputadoresPorAluno, getTotalEscolasNordeste, getTotalEscolasNordesteRural, getDetalhesInfraRural, getDetalhesInternetBandaLarga, getListaEscolas } from "./metrics.controller";
import { authMiddleware } from "../../middlewares/auth";


const router = Router();

router.get("/escolas-rurais-lab-internet", getEscolasRuraisLabInternet);
router.get("/media-computadores-aluno", getMediaComputadoresPorAluno);
router.get("/total-escolas-nordeste", getTotalEscolasNordeste);
router.get("/total-escolas-nordeste-rural", getTotalEscolasNordesteRural);
router.get("/detalhes-infra-rural", getDetalhesInfraRural);
router.get("/detalhes-internet-bandaLarga", getDetalhesInternetBandaLarga);
router.get("/lista-escola", getListaEscolas);

export default router;
